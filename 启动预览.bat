@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "URL=http://127.0.0.1:5173"

where npm >nul 2>nul
if errorlevel 1 (
  echo [CardLoot] npm was not found. Please install Node.js first.
  pause
  exit /b 1
)

echo [CardLoot] Checking local preview server...
curl.exe --silent --fail --max-time 1 "%URL%" >nul 2>nul

if errorlevel 1 (
  echo [CardLoot] Starting local preview server on port 5173...
  start "CardLoot Preview Server" /D "%~dp0" cmd /k "npm run dev"
) else (
  echo [CardLoot] Preview server is already running.
)

echo [CardLoot] Waiting for server to become ready...
for /l %%i in (1,1,60) do (
  curl.exe --silent --fail --max-time 2 "%URL%" >nul 2>nul
  if not errorlevel 1 goto ready
  timeout /t 1 /nobreak >nul
)

echo [CardLoot] Server startup timed out. Check the "CardLoot Preview Server" window for errors.
pause
exit /b 1

:ready

echo [CardLoot] Opening browser: %URL%
start "" "%URL%"
exit /b 0
