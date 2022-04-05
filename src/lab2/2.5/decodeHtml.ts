import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

type EncodeHtmlValue = {
    char: string,
    code: string
}

const MESSAGE_WELCOME_INPUT = 'Enter string to decode. Enter "exit" to close app.'
const MESSAGE_INVALID_INPUT = 'Invalid value in input. String shouldn\'t be empty.'
const MESSAGE_TO_OUTPUT = 'Decoded string: '
const EXIT = 'exit'
const htmlCodes: EncodeHtmlValue[] = [
    {
        char: '&',
        code: '&amp;'
    },
    {
        char: '"',
        code: '&quot;'
    },
    {
        char: `’`,
        code: '&apos;'
    },
    {
        char: '<',
        code: '&lt;'
    },
    {
        char: '>',
        code: '&gt;'
    }]

main()

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    printMessage(MESSAGE_WELCOME_INPUT)
    readLineInterface.on('line', (line: string) => {
        if (line === EXIT) {
            readLineInterface.close()
        } else if (line) {
            const decodedString: string = decode(line)
            printMessage(`${MESSAGE_TO_OUTPUT}${decodedString}`)
        } else {
            printMessage(MESSAGE_INVALID_INPUT)
        }
    })
}

function printMessage(message: string) {
    console.log(message)
}

function decode(inputString: string): string {
    let decodedString = inputString
    for (const htmlCode of htmlCodes) {
        decodedString = decodedString.replaceAll(htmlCode.code, htmlCode.char)
    }
    return decodedString
}

function encode(inputString: string): string {//дублирование и тесты
    let encodedString = ''
    for (const htmlCode of htmlCodes) {
        encodedString = inputString.replaceAll(htmlCode.char, htmlCode.code)
        inputString = encodedString
    }
    return inputString
}

export {
    decode,
    encode,
}