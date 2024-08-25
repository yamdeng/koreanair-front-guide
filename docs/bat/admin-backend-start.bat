@REM @echo off

@REM 변수모음
set projectdir=C:\Project\korean-backend

@REM 1.git clone 된 project로 cmd 이동시키고 git pull
cd %projectdir%
git pull

@REM 2.기존 프로그램 종류후 재실행
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8084') do (
    taskkill /PID %%a /F
)

gradlew :module-admin:bootRun --args='--spring.profiles.active=local'
