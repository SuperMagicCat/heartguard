@echo off
cd /d "%~dp0"
title HeartGuard
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-game.ps1"
if errorlevel 1 (
  echo.
  echo Start failed. Keep this window open to read the error.
  pause
)
