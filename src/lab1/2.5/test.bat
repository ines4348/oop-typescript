echo off

REM Путь к тестируемой комманде передается через первый аргумент коммандной строки
SET MyProgram="%~1"

REM Защита от запуска без агрумента, задающего путь к программе
if %MyProgram%=="" (
echo Please specify path to programm
exit /B 1
)

REM Flipbyte for 6 = 96
call ts-node %MyProgram% "6">"%TEMP%\output.txt" || goto err
fc successfullyTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 1 passed successfully

REM Start without parameter
call ts-node %MyProgram%>"%TEMP%\output.txt" || goto err
fc runWithoutArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 2 passed successfully

REM Error for char
call ts-node %MyProgram% "123a">"%TEMP%\output.txt" || goto err
fc runWithCharTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 3 passed successfully

REM Error with a large number
call ts-node %MyProgram% "256">"%TEMP%\output.txt" || goto err
fc runWithLargeNumberTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 4 passed successfully

REM Все тесты прошли успешно
echo All tests passed successfully

REM Tests ok
exit /B 0

REM Tests failed
:err
echo Test failed
exit /B 1