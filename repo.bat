@echo off

:: Set OMNI_REPO_ROOT early so `repo` bootstrapping can target the repository
:: root when writing out Python dependencies.
:: Use SETLOCAL and ENDLOCAL to constrain these variables to this batch file.
SETLOCAL
set OMNI_REPO_ROOT="%~dp0"

@REM if "%1" == "build" (
@REM     echo Checking if 'modified' folder exists in: %OMNI_REPO_ROOT%\modified
@REM     if exist "%OMNI_REPO_ROOT%\modified" (
@REM         echo 'modified' folder found. Checking contents of measure_markup...
@REM         dir "%OMNI_REPO_ROOT%\modified\measure_markup"
@REM         if exist "%OMNI_REPO_ROOT%\modified\measure_markup\*" (
@REM             echo Files found. Copying files...
@REM             copy /y "%OMNI_REPO_ROOT%\modified\measure_markup\*" "%OMNI_REPO_ROOT%\_build\windows-x86_64\release\extscache"
@REM             if %errorlevel% neq 0 (
@REM                 echo Error copying files.
@REM             ) else (
@REM                 echo Files copied to _build\extscache.
@REM             )
@REM         ) else (
@REM             echo No files found in 'modified\measure_markup'.
@REM         )
@REM     ) else (
@REM         echo No 'modified' folder found, skipping extension copy.
@REM     )
@REM )

call "%~dp0tools\packman\python.bat" "%~dp0tools\repoman\repoman.py" %*
if %errorlevel% neq 0 ( goto Error )

:Success
ENDLOCAL
exit /b 0

:Error
ENDLOCAL
exit /b %errorlevel%
