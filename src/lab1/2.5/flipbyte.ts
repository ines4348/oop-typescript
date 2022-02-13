const MESSAGE_CALL_APP_WITH_ARGUMENT = 'Usage: flipbyte.ts <integer 0..255>'
const MESSAGE_CALL_APP_WITH_NUMBER = 'The argument contains characters other than numbers. Usage: flipbyte.ts <integer 0..255>'
const MESSAGE_CALL_APP_WITH_CORRECT_NUMBER = 'Invalid argument value. Usage: flipbyte.ts <integer 0..255>'

const MAX = 255

flipByte(process.argv)

function flipByte(argv: string[]): void {
    if (argv.length === 3) {
        if (isCorrectArgument(argv[2])) {
            const result = flipNumberBytes(parseInt(argv[2]))
            console.log(result)
        }
    } else {
        console.log(MESSAGE_CALL_APP_WITH_ARGUMENT)
    }
}

function flipNumberBytes(num: number): number {
    // Четные и нечетные биты поменялись местами.
    num = ((num & 0x55) << 1) | ((num >> 1) & 0x55)
    // Биты "перетасовываются" группами по два.
    num = ((num & 0x33) << 2) | ((num >> 2) & 0x33)
    // Биты "перетасовываются" группами по четыре.
    num = ((num & 0x0F) << 4) | ((num >> 4) & 0x0F)

    return num
}

function isCorrectArgument(str: string): boolean {
    let isCorrect = true

    if (!str.match(/[^0-9]/)) {
        const argumentValue: number = parseInt(str)

        if (argumentValue > MAX) {
            isCorrect = false
            console.log(MESSAGE_CALL_APP_WITH_CORRECT_NUMBER)
        }
    } else {
        isCorrect = false
        console.log(MESSAGE_CALL_APP_WITH_NUMBER)
    }
    return isCorrect
}