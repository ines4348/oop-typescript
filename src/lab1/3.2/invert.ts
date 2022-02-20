import {readFile} from 'fs/promises'

const MESSAGE_CALL_APP_WITH_ARGUMENT = 'Call app with 1 argument: invert.ts <matrix file>'
const MESSAGE_NO_SUCH_FILE = 'No such file or directory'
const MESSAGE_SOME_ERROR = 'Some error'
const MESSAGE_INVALID_DATA = 'Wrong input data. The matrix must consist of numbers'
const MESSAGE_INVALID_MATRIX_SIZE = 'Matrix size should be 3 * 3'
const MESSAGE_DET_IS_NULL = 'Since the determinant of the matrix = 0, the matrix is degenerate and has no inverse'

const NO_SUCH_FILE = 'ENOENT'
const MATRIX_SIZE = 3

invert(process.argv)

async function invert(argv: string[]): Promise<void> {
    if (argv.length === 3) {
        const content = await getFileContent(argv[2])
        if ((content || content === '') && isContentValid(content)) {
            const invert: null | number[][] = invertMatrix(copyFileContentToArray(content))
            if (invert) {
                printMatrix(invert)
            }
        }
    } else {
        console.log(MESSAGE_CALL_APP_WITH_ARGUMENT)
    }
}

async function getFileContent(path: string): Promise<string> {
    try {
        return await readFile(path, 'utf8')
    } catch (err) {
        handleError(err)
    }
}

function handleError(err: NodeJS.ErrnoException): void {
    if (err) {
        if (err.code && err.code === NO_SUCH_FILE) {
            console.log(MESSAGE_NO_SUCH_FILE)
        } else {
            console.log(MESSAGE_SOME_ERROR)
        }
    }
}

function isContentValid(fileContent: string): boolean {
    if (fileContent.length > 0 && fileContent.match(/[^0-9-,.\s\r\n\t]/)) {
        console.log(MESSAGE_INVALID_DATA)
        return false
    }

    const lineList: string[] = fileContent.split('\r\n', MATRIX_SIZE)

    if (lineList.length === 3) {
        lineList.forEach((line: string, index: number) => {
            const elementList: string[] = line.split('\t', MATRIX_SIZE)

            if (elementList.length != 3) {
                console.log(MESSAGE_INVALID_MATRIX_SIZE)
                return false
            }
        })
    } else {
        console.log(MESSAGE_INVALID_MATRIX_SIZE)
        return false
    }

    return true
}

function copyFileContentToArray(fileContent: string): number[][] {
    const result: number[][] = []
    const lineList: string[] = fileContent.split('\r\n', MATRIX_SIZE)

    lineList.forEach((line: string, index: number) => {
        const elementList: string[] = line.split('\t', MATRIX_SIZE)
        const tempResult: number[] = []

        elementList.forEach((element: string) => {
            tempResult.push(parseFloat(element))
        })

        result.push(tempResult)
    })

    return result
}

function invertMatrix(matrix: number[][]): null | number[][] {
    const mainA = getDet(matrix, MATRIX_SIZE)
    if (mainA === 0) {
        console.log(MESSAGE_DET_IS_NULL)
    } else {
        return getInverseMatrix(matrix, mainA)
    }
}

function getTransposedMatrix(matrix: number[][]): number[][] {
    let transposedMatrix: number[][] = []

    for (let i = 0; i < 3; i++) {
        const row: number[] = []

        for (let j = 0; j < 3; j++) {
            row.push(matrix[j][i])
        }

        transposedMatrix.push(row)
    }

    return transposedMatrix
}

function getInverseMatrix(matrix: number[][], detMatrix: number): number[][] {
    const transposedMatrix: number[][] = getTransposedMatrix(matrix)
    const inverseMatrix: number[][] = []

    for (let i = 0; i < MATRIX_SIZE; i++) {
        const row: number[] = []

        for (let j = 0; j < MATRIX_SIZE; j++) {

            row.push(getAlgebraicAdditions(getMinor(transposedMatrix, i, j), i + j) / detMatrix)
        }
        inverseMatrix.push(row)
    }
    return inverseMatrix
}

function getMinor(matrix: number[][], indRow: number, indCol: number): number[][] {
    const minorMatrix: number[][] = []

    for (let i = 0; i < matrix.length; i++) {
        const row: number[] = []

        if (i != indRow) {
            for (let j = 0, kj = 0; j < matrix.length; j++) {
                if (j != indCol) {
                    row.push(matrix[i][j])
                }
            }
            minorMatrix.push(row)
        }
    }

    return minorMatrix
}

function getAlgebraicAdditions(matrix: number[][], exponent: number): number {
    return Math.pow(-1, (exponent % 2)) * getDet(matrix, 2)
}

function getDet(matrix: number[][], matrixSize: number) {
    let detMatrix = 0

    switch (matrixSize) {
        case 1: {
            detMatrix = matrix[0][0]
            break
        }
        case 2: {
            detMatrix = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
            break
        }
        default: {
            detMatrix += matrix[0][0] * matrix[1][1] * matrix[2][2]
            detMatrix += matrix[0][1] * matrix[1][2] * matrix[2][0]
            detMatrix += matrix[0][2] * matrix[1][0] * matrix[2][1]
            detMatrix -= matrix[0][2] * matrix[1][1] * matrix[2][0]
            detMatrix -= matrix[0][0] * matrix[1][2] * matrix[2][1]
            detMatrix -= matrix[0][1] * matrix[1][0] * matrix[2][2]
        }
    }

    return detMatrix
}

function printMatrix(matrix: number[][]) {
    for (let i = 0; i < matrix.length; i++) {
        let tempString = ''
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] > 0) {
                tempString += ' '
            }
            tempString += matrix[i][j].toFixed(3) + '  '
        }
        console.log(tempString.trimEnd())
    }
}
