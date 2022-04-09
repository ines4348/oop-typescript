import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {Car} from '../../../src/lab3/1.2/Car'

const MESSAGE_WELCOME_INPUT = 'Start app. Help:\n' +
    'Info. Displays engine status, driving direction, speed and gear\n' +
    'EngineOn. Turns on the engine\n' +
    'EngineOff. Turns off the engine\n' +
    'SetGear < -1...5>. Activates the specified gear, specified by a number from -1 to 5.\n' +
    'SetSpeed <speed>. Sets the specified movement speed, given by a non-negative number.\n' +
    'Exit. To exit from app'
const ERROR_MESSAGE_TURN_OFF = 'Engine car can turned off at zero speed on neutral gear.'
const ERROR_MESSAGE_WRONG_GEAR = 'Select right gear: [-1..5].'
const ERROR_MESSAGE_COMMAND = 'Wrong command.'
const ERROR_MESSAGE_NOT_CHANGE_GEAR = 'Wrong gear.'
const ERROR_MESSAGE_NOT_CHANGE_SPEED = 'Wrong speed.'
const MESSAGE_INFO_ENGINE = 'Engine:'
const MESSAGE_INFO_ENGINE_TURN_ON = 'turn on'
const MESSAGE_INFO_ENGINE_TURN_OFF = 'turn off'
const MESSAGE_INFO_GEAR = 'Gear:'
const MESSAGE_INFO_SPEED = 'Speed:'
const MESSAGE_INFO_DIRECTION = 'Direction:'
const INFO = 'Info'
const ENGINE_ON = 'EngineOn'
const ENGINE_OFF = 'EngineOff'
const SET_GEAR = 'SetGear'
const SET_SPEED = 'SetSpeed'
const EXIT = 'Exit'

main()

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    printMessage(MESSAGE_WELCOME_INPUT)
    readLineInterface.on('line', (command: string) => {
        const car: Car = new Car()
        const response: string | void = executeCommand(readLineInterface, command, car)
        if (response) {
            printMessage(response)
        }
    })
}

function getCarInfo(car: Car): string {
    const engineStatus: string = car.isTurnedOn() ? MESSAGE_INFO_ENGINE_TURN_ON : MESSAGE_INFO_ENGINE_TURN_OFF
    const gearStatus: string = convertGearNumberToString(car.getGear())
    const speed: number = car.getSpeed()
    const direction: string = convertDirectionNumberToString(car.getDirection())
    return `${MESSAGE_INFO_ENGINE} ${engineStatus}\n` +
        `${MESSAGE_INFO_GEAR} ${gearStatus}\n` +
        `${MESSAGE_INFO_SPEED} ${speed}\n` +
        `${MESSAGE_INFO_DIRECTION} ${direction}\n`
}

function executeCommand(readLineInterface: Interface, command: string, car: Car): string | void {
    switch (command) {
        case INFO: {
            return getCarInfo(car)
        }
        case EXIT: {
            return exit(readLineInterface)
        }
        case ENGINE_ON: {
            car.engineOn()
            return
        }
        case ENGINE_OFF: {
            if(car.engineOff()) {
                return
            }
            return ERROR_MESSAGE_TURN_OFF
        }
        default: {
            return changeCar(command, car)
        }
    }
}

function changeCar(command: string, car: Car): string | void {
    if (command.indexOf(SET_GEAR) === 0) {
        return changeGear(command, car)
    } else if (command.indexOf(SET_SPEED) === 0) {
        return changeSpeed(command, car)
    }
    return ERROR_MESSAGE_COMMAND
}

function changeGear(command: string, car: Car): string | void {
    const gear: string = command.replace(SET_GEAR, '')
    if (isCorrectGear(gear)) {
        if (car.setGear(parseInt(gear))) {
            return
        }
        return ERROR_MESSAGE_NOT_CHANGE_GEAR
    }
    return ERROR_MESSAGE_WRONG_GEAR
}

function changeSpeed(command: string, car: Car): string | void {
    const speed: string = command.replace(SET_SPEED, '')
    if (isCorrectSpeed(speed)) {
        if (car.setGear(parseFloat(speed))) {
            return
        }
        return ERROR_MESSAGE_NOT_CHANGE_SPEED
    }
    return ERROR_MESSAGE_WRONG_GEAR
}

function isCorrectGear(inputString: string): boolean {
    const isNumber: boolean = Boolean(inputString.match(/[^0-9\-\s]/))
    const isOnlyOneNumber: boolean = Boolean(inputString.match(/[\d+]/))
    const isOnlyOneMinus: boolean = Boolean(inputString.replaceAll(/\s/g, '').replaceAll(/\d/g, '').match(/[\-+]/))
    return !isNumber && !isOnlyOneNumber && !isOnlyOneMinus
}

function isCorrectSpeed(inputString: string): boolean {
    const isNumber: boolean = !inputString.match(/[^0-9\.\-\s]/)
    const isOnlyOneMinus: boolean = !inputString.replaceAll(/\s/g, '').replaceAll(/\d/g, '').replaceAll(/\./g, '').match(/[\-+]/)
    const isOnlyOnePoint: boolean = !inputString.replaceAll(/\s/g, '').replaceAll(/\d/g, '').replaceAll(/\-/g, '').match(/[\.+]/)
    return isNumber && isOnlyOneMinus && isOnlyOnePoint
}

function exit(readLineInterface: Interface): void {
    readLineInterface.close()
}

function convertGearNumberToString(gear: number): string {
    switch (gear) {
        case -1: {
            return 'reverse'
        }
        case 0: {
            return 'neutral'
        }
        case 1: {
            return 'first'
        }
        case 2: {
            return 'second'
        }
        case 3: {
            return 'third'
        }
        case 4: {
            return 'fourth'
        }
        case 5: {
            return 'fifth'
        }
        default: {
            return ''
        }
    }
}

function convertDirectionNumberToString(gear: number): string {
    switch (gear) {
        case -1: {
            return 'backward'
        }
        case 0: {
            return 'stand'
        }
        case 1: {
            return 'forward'
        }
        default: {
            return ''
        }
    }
}

function printMessage(message: string): void {
    console.log(message)
}
