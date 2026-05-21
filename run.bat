@echo off
setlocal EnableDelayedExpansion

REM ============================================================
REM  Bombie launcher
REM
REM  Usage:
REM    run.bat            -> install (if needed) + npm start
REM    run.bat install    -> install dependencies only
REM    run.bat build      -> production build (dist\)
REM    run.bat test       -> jest test suite
REM    run.bat lint       -> eslint over src
REM    run.bat analyze    -> bundle analyzer report
REM    run.bat clean      -> remove node_modules and dist
REM ============================================================

cd /d "%~dp0"

REM --- Sanity check: node + npm on PATH ---
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not on PATH.
  echo Install Node 18 or later from https://nodejs.org/ and re-run.
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not on PATH.
  exit /b 1
)

REM --- First-run: copy .env from .env.example if missing ---
if not exist ".env" (
  if exist ".env.example" (
    echo [setup] Creating .env from .env.example
    copy /Y ".env.example" ".env" >nul
  )
)

REM --- First-run: install deps if node_modules\.bin is absent (empty folder is not enough) ---
if not exist "node_modules\.bin\" (
  echo [setup] node_modules incomplete or missing, running npm install...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed. Scroll up for the npm error output.
    pause
    exit /b 1
  )
)

REM --- Dispatch on first arg ---
set "cmd=%~1"
if "%cmd%"=="" goto :start
if /I "%cmd%"=="start"   goto :start
if /I "%cmd%"=="install" goto :install
if /I "%cmd%"=="build"   goto :build
if /I "%cmd%"=="test"    goto :test
if /I "%cmd%"=="lint"    goto :lint
if /I "%cmd%"=="analyze" goto :analyze
if /I "%cmd%"=="clean"   goto :clean

echo [ERROR] Unknown command: %cmd%
echo Try: run.bat [start^|install^|build^|test^|lint^|analyze^|clean]
exit /b 1

:start
echo [run] Starting dev server on http://localhost:8080/ ...
call npm start
exit /b %errorlevel%

:install
echo [run] Installing dependencies ...
call npm install
exit /b %errorlevel%

:build
echo [run] Building production bundle ...
call npm run build
exit /b %errorlevel%

:test
echo [run] Running tests ...
call npm test
exit /b %errorlevel%

:lint
echo [run] Linting src/ ...
call npm run lint
exit /b %errorlevel%

:analyze
echo [run] Building with bundle analyzer ...
call npm run analyze
exit /b %errorlevel%

:clean
echo [run] Removing node_modules and dist ...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
echo [run] Clean done.
exit /b 0
