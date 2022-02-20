echo off

REM Путь к тестируемой комманде передается через первый аргумент коммандной строки
SET MyProgram="%~1"

REM Защита от запуска без агрумента, задающего путь к программе
if %MyProgram%=="" (
echo Please specify path to programm
exit /B 1
)

REM Find "you" in 1.txt
call ts-node %MyProgram% file.txt "you">"%TEMP%\output.txt" || goto err
fc successfullyTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 1 passed successfully

REM Start without parameter
call ts-node %MyProgram%>"%TEMP%\output.txt" || goto err
fc runWithoutArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 2 passed successfully

REM Start with 1 parameter
call ts-node %MyProgram% file.txt>"%TEMP%\output.txt" || goto err
fc runWithoutArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 3 passed successfully

REM Text missing from file
call ts-node %MyProgram% file.txt "111111">"%TEMP%\output.txt" || goto err
fc textMissingFromFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 4 passed successfully

REM Find in empty file
call ts-node %MyProgram% empty.txt "111111">"%TEMP%\output.txt" || goto err
fc textMissingFromFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 5 passed successfully

REM Find in missing file
call ts-node %MyProgram% missing.txt "111111">"%TEMP%\output.txt" || goto err
fc missingFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 6 passed successfully

REM Все тесты прошли успешно
echo All tests passed successfully

REM Tests ok
exit /B 0

REM Tests failed
:err
echo Test failed
exit /B 1