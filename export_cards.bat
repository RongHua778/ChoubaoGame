@echo off
REM 按需手动运行：carddesign.xlsx -> Data\cards.json；round1decks.xlsx -> Data\Decks\Rounds\round_1\*.json
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
  echo Export cards failed.
  pause
  exit /b 1
)

python "%~dp0scripts\export_round1_decks.py"
if errorlevel 1 (
  echo Export round1 decks failed.
  pause
  exit /b 1
)

echo Done: Data\cards.json and Data\Decks\Rounds\round_1\
pause
