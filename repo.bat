@echo off

:: Set OMNI_REPO_ROOT early so `repo` bootstrapping can target the repository
:: root when writing out Python dependencies.
:: Use SETLOCAL and ENDLOCAL to constrain these variables to this batch file.
SETLOCAL
set OMNI_REPO_ROOT="%~dp0"

if "%1" == "build" (
    echo Checking if 'modified' folder exists in: %OMNI_REPO_ROOT%\modified
    if exist "%OMNI_REPO_ROOT%modified" (
        echo 'modified' folder found. Checking contents of measure_markup...
        dir "%OMNI_REPO_ROOT%modified\measure_markup"
        if exist "%OMNI_REPO_ROOT%modified\measure_markup\*" (
            echo Files found. Copying files...
            copy /y "%OMNI_REPO_ROOT%modified\measure_markup\*" "%OMNI_REPO_ROOT%_build\windows-x86_64\release\extscache"
            if %errorlevel% neq 0 (
                echo Error copying files.
            ) else (
                echo Files copied to _build\extscache.
            )
        ) else (
            echo No files found in 'modified\measure_markup'.
        )
    ) else (
        echo No 'modified' folder found, skipping extension copy.
    )
)

call "%~dp0tools\packman\python.bat" "%~dp0tools\repoman\repoman.py" %*
if %errorlevel% neq 0 ( goto Error )

:Success
ENDLOCAL
exit /b 0

:Error
ENDLOCAL
exit /b %errorlevel%
