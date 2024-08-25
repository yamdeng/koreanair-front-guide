@REM @echo off

@REM 변수모음
set projectdir=C:\Project\koreanair-front-guide
set sourcedir=C:\Project\koreanair-front-guide\dist
set destinationdir=C:\Project\serve\front-admin

@REM 1.git clone 된 project로 cmd 이동시키고 git pull
cd %projectdir%
git pull

@REM 2.yarn build로 빌드 실행
call yarn build:admin-pass

@REM 3.파일 copy
xcopy %sourcedir% %destinationdir% /Y /E /I

@REM 4.목적지 폴더로 cmd 이동
cd %destinationdir%

@REM 5.기존 프로그램 종류후 재실행
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8082') do (
    taskkill /PID %%a /F
)

serve -l 8082