@echo off
REM 按需手动运行：Excel -> Data\cards.json。游戏运行时只读取 cards.json，不会自动调用本脚本。
setlocal
cd /d "%~dp0"

python -m pip install openpyxl -q
if errorlevel 1 (
  echo pip install openpyxl failed
  pause
  exit /b 1
)

python "%~dp0scripts\export_cards.py"
if errorlevel 1 (
  echo Export failed.
  pause
  exit /b 1
)

echo Done: Data\cards.json
pause
