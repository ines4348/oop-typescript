echo off

REM Путь к тестируемой комманде передается через первый аргумент коммандной строки
SET MyProgram="%~1"

REM Защита от запуска без агрумента, задающего путь к программе
if %MyProgram%=="" (
echo Please specify path to programm
exit /B 1
)

REM Запуск без параметра
call ts-node %MyProgram%>"%TEMP%\output.txt" || goto err
fc runWithArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 1 passed successfully

REM На вход дан пустой файл
call ts-node %MyProgram% matrixEmpty.txt>"%TEMP%\output.txt" || goto err
fc invalidMatrixSize.txt "%TEMP%\output.txt" > nul || goto err
echo Test 2 passed successfully

REM Инвертировать матрицу
call ts-node %MyProgram% matrix.txt>"%TEMP%\output.txt" || goto err
fc successfullyTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 3 passed successfully

REM Параметром передан несуществующий файл
call ts-node %MyProgram% missing.txt>"%TEMP%\output.txt" || goto err
fc missingFile.txt "%TEMP%\output.txt" > nul || goto err
echo Test 4 passed successfully

REM Запуск c тремя параметрами
call ts-node %MyProgram% matrix.txt matrixChar.txt>"%TEMP%\output.txt" || goto err
fc runWithArgvTest.txt "%TEMP%\output.txt" > nul || goto err
echo Test 5 passed successfully

REM Определитель равен 0
call ts-node %MyProgram% matrixZeroDeterminant.txt>"%TEMP%\output.txt" || goto err
fc determinant0.txt "%TEMP%\output.txt" > nul || goto err
echo Test 6 passed successfully

REM На вход дан файл с текстовыми символами
call ts-node %MyProgram% matrixChar.txt>"%TEMP%\output.txt" || goto err
fc invalidMatrixData.txt "%TEMP%\output.txt" > nul || goto err
echo Test 7 passed successfully

REM На вход дан файл с неполной матрицей
call ts-node %MyProgram% matrix2x2.txt>"%TEMP%\output.txt" || goto err
fc invalidMatrixSize.txt "%TEMP%\output.txt" > nul || goto err
echo Test 8 passed successfully

REM Все тесты прошли успешно
echo All tests passed successfully

REM Tests ok
exit /B 0

REM Tests failed
:err
echo Test failed
exit /B 1