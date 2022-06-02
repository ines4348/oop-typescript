import {stdin as input, stdout as output} from 'process'
import {createInterface, Interface} from 'node:readline'
import {Car, Direction, Gear} from '../../../src/lab3/1.2/Car'

const MESSAGE_WELCOME_INPUT = 'Start app. Help:\n' +
    'Info. Displays engine status, driving direction, speed and gear\n' +
    'EngineOn. Turns on the engine\n' +
    'EngineOff. Turns off the engine\n' +
    'SetGear < -1...5>. Activates the specified gear, specified by a number from -1 to 5.\n' +
    'SetSpeed <speed>. Sets the specified movement speed, given by a non-negative number.\n' +
    'Exit. To exit from app'
const ERROR_MESSAGE_TURN_OFF = 'Engine car can turned off at zero speed on neutral gear.'
const ERROR_MESSAGE_WRONG_GEAR = 'Select right gear: [-1..5].'
const ERROR_MESSAGE_WRONG_SPEED = 'Select right speed: [0..150].'
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

main()//CartController class и тестировать его вместо car
function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    printMessage(MESSAGE_WELCOME_INPUT)
    const car: Car = new Car()
    readLineInterface.on('line', (command: string) => {
        const commandArray: string[] = command.split(' ')
        const response: string | void = executeCommand(readLineInterface, commandArray, car)
        if (response) {
            printMessage(response)
        }
    })
}

function getCarInfo(car: Car): string {
    const engineStatus: string = car.isTurnedOn() ? MESSAGE_INFO_ENGINE_TURN_ON : MESSAGE_INFO_ENGINE_TURN_OFF
    const gearStatus: string = Gear[car.getGear()].toLowerCase()
    const speed: number = car.getSpeed()
    const direction: string = Direction[car.getDirection()].toLowerCase()
    return `${MESSAGE_INFO_ENGINE} ${engineStatus}\n` +
        `${MESSAGE_INFO_GEAR} ${gearStatus}\n` +
        `${MESSAGE_INFO_SPEED} ${speed}\n` +
        `${MESSAGE_INFO_DIRECTION} ${direction}\n`
}

function executeCommand(readLineInterface: Interface, commandArray: string[], car: Car): string | void {
    //TODO: лучше поместить обработку всех команд в один switch
    const command: string = commandArray[0]
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
        case SET_GEAR: {
            return changeGear(commandArray, car)
        }
        case SET_SPEED: {
            return changeSpeed(commandArray, car)
        }
        default: {
            return ERROR_MESSAGE_COMMAND
        }
    }
}

function changeGear(commandArray: string[], car: Car): string | void {
    //TODO: условия в конструкции можно инвертировать и будет меньшая вложенность
    if (commandArray.length != 2 ){
        return ERROR_MESSAGE_WRONG_GEAR
    }

    const gear: string = commandArray[1]
    if (!isCorrectGear(gear)) {
        return ERROR_MESSAGE_WRONG_GEAR
    }

    if (car.setGear(parseInt(gear))) {
        return
    }

    return ERROR_MESSAGE_NOT_CHANGE_GEAR
}

function changeSpeed(commandArray: string[], car: Car): string | void {
    if (commandArray.length != 2 ){
        return ERROR_MESSAGE_WRONG_SPEED
    }

    const speed: string = commandArray[1]
    if (!isCorrectSpeed(speed)) {
        return ERROR_MESSAGE_WRONG_SPEED
    }
    if (car.setSpeed(parseFloat(speed))) {
        return
    }

    return ERROR_MESSAGE_NOT_CHANGE_SPEED
}

function isCorrectGear(inputString: string): boolean {
    const isNotNumber: boolean = Boolean(inputString.match(/[^0-9\-]/))
    const foundMask: string[] | null = inputString.match(/(\-?\d?)/g)
    const isCorrectGear: boolean = (foundMask && foundMask.length > 2) ? false : true
    const isCorrectGearValue: boolean = (parseInt(inputString) >= -1 && parseInt(inputString) <= 5)
    return !isNotNumber && isCorrectGear && isCorrectGearValue
}

function isCorrectSpeed(inputString: string): boolean {
    //TODO: можно заменить на одну регулярку
    const isCorrectSpeed: boolean = Boolean(inputString.match(/^(\d\d?\d?\.?\d?)/))
    const isSomePoint: boolean = Boolean(inputString.replace('.', '').match(/\./g))
    const isCorrectSpeedValue: boolean = (parseInt(inputString) >= 0 && parseInt(inputString) <= 150)
    return isCorrectSpeed && !isSomePoint && isCorrectSpeedValue
}

function exit(readLineInterface: Interface): void {
    readLineInterface.close()
}

function printMessage(message: string): void {
    console.log(message)
}

export {
    getCarInfo,
    executeCommand,
    changeGear,
    changeSpeed,
    isCorrectGear,
    isCorrectSpeed,
}
