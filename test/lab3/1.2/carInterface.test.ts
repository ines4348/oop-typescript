import {Car} from '../../../src/lab3/1.2/Car'
import {
    getCarInfo,
    executeCommand,
    changeGear,
    changeSpeed,
    isCorrectGear,
    isCorrectSpeed,
} from '../../../src/lab3/1.2/carInterface'
import {describe} from 'mocha'
import {expect} from 'chai'
import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'

describe('carInterface:', () => {
    let car: Car
    let readLineInterface: Interface

    describe('getCarInfo', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('', () => {
            expect(getCarInfo(car)).eql('Engine: turn off\n' +
                'Gear: neutral\n' +
                'Speed: 0\n' +
                'Direction: stand\n')
        })
    })

    describe('isCorrectGear', () => {
        it('gear should be -1', () => {
            expect(isCorrectGear('-1')).equal(true)
        })

        it('gear should be 5', () => {
            expect(isCorrectGear('5')).equal(true)
        })

        it('gear shouldn\'t be -2', () => {
            expect(isCorrectGear('-2')).equal(false)
        })

        it('gear shouldn\'t be 6', () => {
            expect(isCorrectGear('6')).equal(false)
        })

        it('gear shouldn\'t be 1.5', () => {
            expect(isCorrectGear('1.5')).equal(false)
        })

        it('gear shouldn\'t contains char', () => {
            expect(isCorrectGear(' 1a')).equal(false)
        })

        it('gear shouldn\'t contains double minus', () => {
            expect(isCorrectGear('--1')).equal(false)
        })

        it('gear shouldn\'t contains double minus', () => {
            expect(isCorrectGear('-1-')).equal(false)
        })

        it('gear shouldn\'t contains minus after number', () => {
            expect(isCorrectGear('1-1')).equal(false)
        })
    })

    describe('isCorrectSpeed', () => {
        it('speed should be 0', () => {
            expect(isCorrectSpeed('0')).equal(true)
        })

        it('speed should be 150', () => {
            expect(isCorrectSpeed('150')).equal(true)
        })

        it('speed should be 1.50', () => {
            expect(isCorrectSpeed('1.50')).equal(true)
        })

        it('speed shouldn\'t be -1', () => {
            expect(isCorrectSpeed('-1')).equal(false)
        })

        it('speed shouldn\'t be 151', () => {
            expect(isCorrectSpeed('151')).equal(false)
        })

        it('speed shouldn\'t contains char', () => {
            expect(isCorrectSpeed(' 1a')).equal(false)
        })

        it('speed shouldn\'t contains double point', () => {
            expect(isCorrectSpeed('1.1.')).equal(false)
        })

        it('speed shouldn\'t contains double point', () => {
            expect(isCorrectSpeed('1..1')).equal(false)
        })

        it('speed shouldn\'t contains double point', () => {
            expect(isCorrectSpeed('..1')).equal(false)
        })
    })

    describe('executeCommand', () => {
        beforeEach(() => {
            car = new Car()
            readLineInterface = createInterface({input, output})
        })

        it('command should be Info', () => {
            expect(executeCommand(readLineInterface, ['Info'], car)).not.equal('Wrong command.')
        })

        it('command should be EngineOn', () => {
            expect(executeCommand(readLineInterface, ['EngineOn'], car)).not.equal('Wrong command.')
        })

        it('command should be EngineOff', () => {
            expect(executeCommand(readLineInterface, ['EngineOff'], car)).not.equal('Wrong command.')
        })

        it('command should start on SetGear', () => {
            expect(executeCommand(readLineInterface, ['SetGear'], car)).not.equal('Wrong command.')
        })

        it('command should start on SetSpeed', () => {
            expect(executeCommand(readLineInterface, ['SetSpeed'], car)).not.equal('Wrong command.')
        })

        it('command should be Exit', () => {
            expect(executeCommand(readLineInterface, ['Exit'], car)).not.equal('Wrong command.')
        })

        it('command shouldn\'t be 123', () => {
            expect(executeCommand(readLineInterface, ['123'], car)).equal('Wrong command.')
        })
    })

    describe('changeGear', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('gear should change to 1 if speed === 0', () => {
            car.engineOn()
            expect(changeGear(['SetGear', '1'], car)).equal(undefined)
        })

        it('gear should change to 2 if speed === 0', () => {
            car.engineOn()
            expect(changeGear(['SetGear', '2'], car)).equal('Wrong gear.')
        })

        it('gear should change to 2 if speed === 20', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '20'], car)
            expect(changeGear(['SetGear', '2'], car)).equal(undefined)
        })
        it('gear shouldn\'t change to 2 if speed === 19', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '19'], car)
            expect(changeGear(['SetGear', '2'], car)).equal('Wrong gear.')
        })

        it('gear should change to 3 if speed === 30', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '30'], car)
            expect(changeGear(['SetGear', '3'], car)).equal(undefined)
        })
        it('gear shouldn\'t change to 3 if speed === 29', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '29'], car)
            expect(changeGear(['SetGear', '3'], car)).equal('Wrong gear.')
        })

        it('gear should change to 4 if speed === 40', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '30'], car)
            changeGear(['SetGear', '3'], car)
            changeSpeed(['SetSpeed', '40'], car)
            expect(changeGear(['SetGear', '4'], car)).equal(undefined)
        })
        it('gear shouldn\'t change to 4 if speed === 39', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '30'], car)
            changeGear(['SetGear', '2'], car)
            changeSpeed(['SetSpeed', '39'], car)
            expect(changeGear(['SetGear', '4'], car)).equal('Wrong gear.')
        })

        it('gear should change to 5 if speed === 50', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '30'], car)
            changeGear(['SetGear', '3'], car)
            changeSpeed(['SetSpeed', '50'], car)
            expect(changeGear(['SetGear', '5'], car)).equal(undefined)
        })
        it('gear shouldn\'t change to 5 if speed === 39', () => {
            car.engineOn()
            changeGear(['SetGear', '1'], car)
            changeSpeed(['SetSpeed', '30'], car)
            changeGear(['SetGear', '2'], car)
            changeSpeed(['SetSpeed', '39'], car)
            expect(changeGear(['SetGear', '5'], car)).equal('Wrong gear.')
        })
    })
})