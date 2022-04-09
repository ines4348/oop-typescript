import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

const MESSAGE_WELCOME_INPUT = 'Enter float numbers separated by spaces: '
const MESSAGE_INVALID_INPUT = 'Invalid value in input. String should be contains numbers with decimal separator is point.'

main()

function main(): void {// учесть кейс 2...5 и 5.5.7
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question(MESSAGE_WELCOME_INPUT, (answer: string) => {
        if (answer && isContainsOnlyNumbers(answer)) {
            const arrayNumbers: number[] = convertStringToArray(answer)
            multiplyEachItemByMinimum(arrayNumbers)
            printArray(arrayNumbers)
        } else {
            printError(MESSAGE_INVALID_INPUT)
        }

        readLineInterface.close()
    })
}

function printError(error: string) {
    console.log(error)
}

function isContainsOnlyNumbers(inputString: string): boolean {
    return !inputString.match(/[^0-9\.\-\s]/)
}

function convertStringToArray(inputString: string): number[] {
    const arrayStrings: string[] = inputString.split(' ')
    return fillFloatArray(arrayStrings)//объединть
}

function fillFloatArray(arrayStrings: string[]): number[] {
    const arrayNumbers: number[] = []
    arrayStrings.forEach((str: string) => {//map
        arrayNumbers.push(parseFloat(str))
    })
    return arrayNumbers
}

function multiplyEachItemByMinimum(arrayNumbers: number[]): number[] { //разделить
    const minimumNumber = Math.min(...arrayNumbers)
    return arrayNumbers.map((item: number) => item * minimumNumber)
}

function printArray(arrayNumbers: number[]): void {
    console.log(arrayNumbers.sort())
}

export {
    main,
    isContainsOnlyNumbers,
    convertStringToArray,
    fillFloatArray,
    multiplyEachItemByMinimum,
}