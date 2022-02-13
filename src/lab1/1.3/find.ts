import {readFile} from 'fs/promises'

const NO_SUCH_FILE = 'ENOENT'
const MESSAGE_CALL_APP_WITH_ARGUMENTS = `Call app with 2 arguments <file name> <text to search>`
const MESSAGE_TEXT_NOT_FOUND = 'Text not found'
const MESSAGE_TEXT_FOUND_ON_FOLLOWING_LINES = 'Text found on the following lines:'
const MESSAGE_NO_SUCH_FILE = 'No such file or directory'
const MESSAGE_SOME_ERROR = 'Some error'

find(process.argv)

async function find(argv: string[]) {
    if (argv.length === 4) {
        const content = await getFileContent(argv[2])

        if (content) {
            const searchResult: number[] = findTextOccurrences(content, argv[3])
            printResult(searchResult)
        }
    } else {
        console.log(MESSAGE_CALL_APP_WITH_ARGUMENTS)
    }
}

async function getFileContent(path: string): Promise<string> {
    try {
        return await readFile(path, 'utf8')
    } catch (err) {
        handleError(err)
    }
}

function printResult(result: number[]): void {
    if (result.length > 0) {
        console.log(MESSAGE_TEXT_FOUND_ON_FOLLOWING_LINES)
        result.forEach((value: number) => console.log(value))
    } else {
        console.log(MESSAGE_TEXT_NOT_FOUND)
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

function findTextOccurrences(fileContent: string, textToSearch: string): number[] {
    const lineList: string[] = fileContent.split('\n')
    const result: number[] = []

    lineList.forEach((line, index) => {
        if (line.includes(textToSearch)) {
            result.push(index)
        }
    })

    return result
}