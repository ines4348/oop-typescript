import {Car} from '../../../src/lab3/1.2/Car'
import {describe} from 'mocha'
import {expect} from 'chai'

describe('Car:', () => {
    let car: Car

    describe('initialization tests.', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('Car should be created with turned off engine', () => {
            expect(car.isTurnedOn()).equal(false)
        })

        it('Car should be created with stand direction', () => {
            expect(car.getDirection()).equal(0)
        })

        it('Car should be created with neutral gear', () => {
            expect(car.getGear()).equal(0)
        })

        it('Car should be created with zero speed', () => {
            expect(car.getSpeed()).equal(0)
        })
    })

    describe('engine tests.', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('Car should turn on the engine', () => {
            car.engineOn()
            expect(car.isTurnedOn()).equal(true)
        })

        it('Car should turn off the engine', () => {
            car.engineOff()
            expect(car.isTurnedOn()).equal(false)
        })

        it('Car should turn off the engine, even if engine is already turned off', () => {
            car.engineOff()
            car.engineOff()
            expect(car.isTurnedOn()).equal(false)
        })

        it('Car shouldn\'t turn off the engine with not neutral gear', () => {
            car.engineOn()
            car.setGear(1)
            expect(car.isTurnedOn()).equal(true)
        })

        it('Car shouldn\'t turn off the engine with not zero speed', () => {
            car.engineOn()
            car.setSpeed(10)
            expect(car.isTurnedOn()).equal(true)
        })

        it('Car shouldn\'t turn off the engine with not stand direction', () => {
            car.engineOn()
            car.setDirection(1)
            expect(car.isTurnedOn()).equal(true)
        })
    })

    describe('speed tests.', () => {
        beforeEach(() => {
            car = new Car()
            car.engineOn()
        })

        it('Car on first gear should set speed = 0', () => {
            car.setGear(1)
            expect(car.setSpeed(0)).equal(true)
        })

        it('Car on first gear should set speed = 30', () => {
            car.setGear(1)
            expect(car.setSpeed(30)).equal(true)
        })

        it('Car on first gear shouldn\'t set speed = 31', () => {
            car.setGear(1)
            expect(car.setSpeed(31)).equal(false)
        })

        it('Car on second gear should set speed = 20', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            expect(car.setSpeed(20)).equal(true)
        })

        it('Car on second gear should set speed = 50', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            expect(car.setSpeed(50)).equal(true)
        })

        it('Car on second gear shouldn\'t set speed = 19', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            expect(car.setSpeed(19)).equal(false)
        })

        it('Car on second gear shouldn\'t set speed = 51', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            expect(car.setSpeed(51)).equal(false)
        })

        it('Car on third gear should set speed = 30', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.setSpeed(30)).equal(true)
        })

        it('Car on third gear should set speed = 60', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.setSpeed(60)).equal(true)
        })

        it('Car on third gear shouldn\'t set speed = 29', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.setSpeed(29)).equal(false)
        })

        it('Car on third gear shouldn\'t set speed = 61', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.setSpeed(61)).equal(false)
        })

        it('Car on fourth gear should set speed = 40', () => {
            car.setGear(4)
            expect(car.setSpeed(40)).equal(true)
        })

        it('Car on fourth gear should set speed = 90', () => {
            car.setGear(4)
            expect(car.setSpeed(90)).equal(true)
        })

        it('Car on fourth gear shouldn\'t set speed = 39', () => {
            car.setGear(4)
            expect(car.setSpeed(39)).equal(false)
        })

        it('Car on fourth gear shouldn\'t set speed = 91', () => {
            car.setGear(4)
            expect(car.setSpeed(91)).equal(false)
        })

        it('Car on fifth gear should set speed = 50', () => {
            car.setGear(5)
            expect(car.setSpeed(50)).equal(true)
        })

        it('Car on fifth gear should set speed = 150', () => {
            car.setGear(5)
            expect(car.setSpeed(150)).equal(true)
        })

        it('Car on fifth gear shouldn\'t set speed = 49', () => {
            car.setGear(5)
            expect(car.setSpeed(49)).equal(false)
        })

        it('Car on fifth gear shouldn\'t set speed = 151', () => {
            car.setGear(5)
            expect(car.setSpeed(151)).equal(false)
        })

        it('Car on reverse gear should set speed = 0', () => {
            car.setGear(-1)
            expect(car.setSpeed(0)).equal(true)
        })

        it('Car on reverse gear should set speed = 20', () => {
            car.setGear(-1)
            expect(car.setSpeed(20)).equal(true)
        })

        it('Car on reverse gear shouldn\'t set speed = 21', () => {
            car.setGear(-1)
            expect(car.setSpeed(21)).equal(false)
        })
    })

    describe('gear tests.', () => {
        beforeEach(() => {
            car = new Car()
            car.engineOn()
        })

        it('Car with speed = 0 should set first gear', () => {
            expect(car.setGear(1)).equal(true)
        })
    })
})