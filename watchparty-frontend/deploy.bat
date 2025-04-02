@echo off
REM Exit immediately if a command fails
setlocal enabledelayedexpansion

REM Build the project
npm run build || exit /b 1

REM Sync the build directory with the S3 bucket
aws s3 sync dist/ s3://watchpartyfrontend --delete || exit /b 1

echo Deployment completed successfully!