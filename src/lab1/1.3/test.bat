echo off

REM Путь к тестируемой комманде передается через первый аргумент коммандной строки
SET MyProgram="%~1"

REM Защита от запуска без агрумента, задающего путь к программе
if %MyProgram%=="" (
echo Please specify path to programm
exit /B 1
)

REM Find "you" in 1.txt
node %MyProgram% file.txt "you">"%TEMP%\output.txt" || goto err
fc sucsessfullyTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 1 passed sucsessfully

REM Start without parameter
node %MyProgram%>"%TEMP%\output.txt" || goto err
fc runWithoutArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 2 passed sucsessfully

REM Start with 1 parameter
node %MyProgram% file.txt>"%TEMP%\output.txt" || goto err
fc runWithoutArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 3 passed sucsessfully

REM Text missing from file
node %MyProgram% file.txt "111111">"%TEMP%\output.txt" || goto err
fc textMissingFromFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 4 passed sucsessfully

REM Find in empty file
node %MyProgram% empty.txt "111111">"%TEMP%\output.txt" || goto err
fc textMissingFromFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 5 passed sucsessfully

REM Find in missing file
node %MyProgram% missing.txt "111111">"%TEMP%\output.txt" || goto err
fc missingFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 6 passed sucsessfully

REM Все тесты прошли успешно
echo All tests passed sucsessfully

REM Tests ok
exit /B 0

REM Tests failed
:err
echo Test failed
exit /B 1