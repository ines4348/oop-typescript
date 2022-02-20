const MESSAGE_CALL_APP_WITH_ARGUMENT = 'Usage: flipbyte.ts <integer 0..255>'
const MESSAGE_CALL_APP_WITH_NUMBER = 'The argument contains characters other than numbers. Usage: flipbyte.ts <integer 0..255>'
const MESSAGE_CALL_APP_WITH_CORRECT_NUMBER = 'Invalid argument value. Usage: flipbyte.ts <integer 0..255>'

const MAX = 255

flipByte(process.argv)

function flipByte(argv: string[]): void {
    if (isCorrectArgument(argv)) {
        const result = flipNumberBytes(parseInt(argv[2]))
        console.log(result)
    }
}

function isCorrectArgument(argv: string[]): boolean {
    let isCorrect = true

    if (argv.length === 3) {
        if (!argv[2].match(/[^0-9]/)) {
            const argumentValue: number = parseInt(argv[2])

            if (argumentValue > MAX) {
                isCorrect = false
                console.log(MESSAGE_CALL_APP_WITH_CORRECT_NUMBER)
            }
        } else {
            isCorrect = false
            console.log(MESSAGE_CALL_APP_WITH_NUMBER)
        }
    } else {
        isCorrect = false
        console.log(MESSAGE_CALL_APP_WITH_ARGUMENT)
    }

    return isCorrect
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