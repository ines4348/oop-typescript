import {readFile} from 'fs/promises'

const MESSAGE_CALL_APP_WITH_ARGUMENT = 'Call app with 1 argument: invert.ts <matrix file>'
const MESSAGE_NO_SUCH_FILE = 'No such file or directory'
const MESSAGE_INVALID_DATA = 'Wrong input data. The matrix must consist of numbers'
const MESSAGE_INVALID_MATRIX_SIZE = 'Matrix size should be 3 * 3'
const MESSAGE_DET_IS_NULL = 'Since the determinant of the matrix = 0, the matrix is degenerate and has no inverse'

const MATRIX_SIZE = 3

main(process.argv)

async function main(argv: string[]): Promise<void> {
    if (argv.length != 3) {
        printError(MESSAGE_CALL_APP_WITH_ARGUMENT)
        return
    }

    const content: string | null = await getFileContent(argv[2])

    if (!content && content != '') {
        printError(MESSAGE_NO_SUCH_FILE)
        return
    } else if (content === '') {
        printError(MESSAGE_INVALID_MATRIX_SIZE)
        return
    }

    const contentError: string | null = getContentError(content)
    if (contentError) {
        printError(contentError)
        return
    }

    const invert: number[][] | null = invertMatrix(copyFileContentToArray(content))
    if (invert) {
        printMatrix(invert)
    } else {
        printError(MESSAGE_DET_IS_NULL)
        return
    }
}

function printError(error: string) {
    console.log(error)
}

function getFileContent(path: string): Promise<string | null> {
    //заменить на .catch()
    return readFile(path, 'utf8')
        .then((value: string) => {
            return value
        })
        .catch((error: NodeJS.ErrnoException) => {
            return null
        })
}

function getContentError(fileContent: string): string | null {
    //разделить печать и проверку
    if (fileContent.length > 0 && fileContent.match(/[^0-9-,.\s\r\n\t]/)) {
        return MESSAGE_INVALID_DATA
    }

    const lineList: string[] = fileContent.split('\r\n', MATRIX_SIZE)

    if (lineList.length === 3) {
        for (const line of lineList) {
            const elementList: string[] = line.split('\t', MATRIX_SIZE)

            if (elementList.length != 3) {
                return MESSAGE_INVALID_MATRIX_SIZE
            }
        }
    } else {
        return MESSAGE_INVALID_MATRIX_SIZE
    }
    return null
}

function copyFileContentToArray(fileContent: string): number[][] {
    const lineList: string[] = fileContent.split('\r\n', MATRIX_SIZE)
    //переписать через map
    return lineList.map((line: string) => {
        const elementList: string[] = line.split('\t', MATRIX_SIZE)
        return elementList.map(parseFloat)
    })
}

function invertMatrix(matrix: number[][]): number[][] | null {
    //переименовать, норм имя
    const matrixDeterminant: number = getMatrixDeterminant(matrix, MATRIX_SIZE)
    if (matrixDeterminant === 0) {
        //добавить return null
        return null
    }
    const transposedMatrix: number[][] = getTransposedMatrix(matrix)
    return getInverseMatrix(transposedMatrix, matrixDeterminant)
}

function getTransposedMatrix(matrix: number[][]): number[][] {
    //map
    return matrix.map(
        (row: number[], i: number) => row.map(
            (element: number, j: number) => matrix[j][i]
        )
    )
}

function getInverseMatrix(transposedMatrix: number[][], detMatrix: number): number[][] {
    //вынести в отдельную функцию цикл
    //через map
    return transposedMatrix.map((row: number[], i: number) => {
        return row.map((element: number, j: number) => {
            return getMatrixCofactors(getMatrixMinor(transposedMatrix, i, j), i + j) / detMatrix
        })
    })
}

function getSmallerSquareMatrix(matrix: number[][], rowIndex: number, columnIndex: number): number[][] {
    const smallerSquareMatrix: number[][] = []

    matrix.forEach((matrixRow: number[], index: number) => {
        if (index != rowIndex) {
            const smallerSquareMatrixRow: number[] = matrixRow.slice()
            smallerSquareMatrixRow.splice(columnIndex, 1)
            smallerSquareMatrix.push(smallerSquareMatrixRow)
        }
    })
    return smallerSquareMatrix
}

function getMatrixCofactors(matrixMinor: number, exponent: number): number {
    return Math.pow(-1, (exponent % 2)) * matrixMinor
}

function getMatrixMinor(matrix: number[][], rowIndex: number, columnIndex: number): number {
    return getMatrixDeterminant(getSmallerSquareMatrix(matrix, rowIndex, columnIndex), 2)
}

//разделить на 2 функции
function printMatrix(matrix: number[][]): void {
    matrix.forEach((row: number[]) => {
        console.log(getMatrixFormattedRow(row))
    })
}

function getMatrixFormattedRow(matrixRow: number[]): string {
    return matrixRow
        .map((element: number) => element.toFixed(3))
        .join(' ')
}

//разделить на 2 функции
function getMatrixDeterminant(matrix: number[][], matrixSize: number): number {
    let detMatrix = 0

    switch (matrixSize) {
        case 2: {
            detMatrix = getMatrix2x2Determinant(matrix)
            break
        }
        case 3: {
            detMatrix = getMatrix3x3Determinant(matrix)
            break
        }
        default: {
            detMatrix += matrix[0][0]
        }
    }

    return detMatrix
}

function getMatrix3x3Determinant(matrix: number[][]): number {
    let detMatrix = 0

    detMatrix += matrix[0][0] * matrix[1][1] * matrix[2][2]
    detMatrix += matrix[0][1] * matrix[1][2] * matrix[2][0]
    detMatrix += matrix[0][2] * matrix[1][0] * matrix[2][1]
    detMatrix -= matrix[0][2] * matrix[1][1] * matrix[2][0]
    detMatrix -= matrix[0][0] * matrix[1][2] * matrix[2][1]
    detMatrix -= matrix[0][1] * matrix[1][0] * matrix[2][2]

    return detMatrix
}

function getMatrix2x2Determinant(matrix: number[][]): number {
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
}
