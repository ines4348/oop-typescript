import {Car} from '../../../src/lab3/1.2/Car'
import {describe} from 'mocha'
import {expect} from 'chai'

describe('Car:', () => {
    let car: Car

    describe('initialization tests.', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('should have engine turned off', () => {
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
            expect(car.getGear()).equal(0)
            expect(car.getSpeed()).equal(0)
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
            car.engineOff()
            expect(car.isTurnedOn()).equal(true)
        })

        it('Car shouldn\'t turn off the engine with not zero speed', () => {
            car.engineOn()
            car.setGear(1)
            car.setSpeed(10)
            car.engineOff()
            expect(car.isTurnedOn()).equal(true)
        })

        it('Car shouldn\'t turn off the engine with not stand direction', () => {
            car.engineOn()
            car.setGear(1)
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
            expect(car.getGear()).equal(1)
            expect(car.setSpeed(0)).equal(true)
        })

        it('Car on first gear should set speed = 30', () => {
            car.setGear(1)
            expect(car.getGear()).equal(1)
            expect(car.setSpeed(30)).equal(true)
        })

        it('Car on first gear shouldn\'t set speed = 31', () => {
            car.setGear(1)
            expect(car.getGear()).equal(1)
            expect(car.setSpeed(31)).equal(false)
        })

        it('Car on second gear should set speed = 20', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            expect(car.getGear()).equal(2)
            expect(car.setSpeed(20)).equal(true)
        })

        it('Car on second gear should set speed = 50', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            expect(car.getGear()).equal(2)
            expect(car.setSpeed(50)).equal(true)
        })

        it('Car on second gear shouldn\'t set speed = 19', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            expect(car.getGear()).equal(2)
            expect(car.setSpeed(19)).equal(false)
        })

        it('Car on second gear shouldn\'t set speed = 51', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            expect(car.getGear()).equal(2)
            expect(car.setSpeed(51)).equal(false)
        })

        it('Car on third gear should set speed = 30', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.getGear()).equal(3)
            expect(car.setSpeed(30)).equal(true)
        })

        it('Car on third gear should set speed = 60', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.getGear()).equal(3)
            expect(car.setSpeed(60)).equal(true)
        })

        it('Car on third gear shouldn\'t set speed = 29', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.getGear()).equal(3)
            expect(car.setSpeed(29)).equal(false)
        })

        it('Car on third gear shouldn\'t set speed = 61', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            expect(car.getGear()).equal(3)
            expect(car.setSpeed(61)).equal(false)
        })

        it('Car on fourth gear should set speed = 40', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(49)
            car.setGear(4)
            expect(car.getGear()).equal(4)
            expect(car.setSpeed(40)).equal(true)
        })

        it('Car on fourth gear should set speed = 90', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(49)
            car.setGear(4)
            expect(car.getGear()).equal(4)
            expect(car.setSpeed(90)).equal(true)
        })

        it('Car on fourth gear shouldn\'t set speed = 39', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(49)
            car.setGear(4)
            expect(car.getGear()).equal(4)
            expect(car.setSpeed(39)).equal(false)
        })

        it('Car on fourth gear shouldn\'t set speed = 91', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(49)
            car.setGear(4)
            expect(car.getGear()).equal(4)
            expect(car.setSpeed(91)).equal(false)
        })

        it('Car on fifth gear should set speed = 50', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(59)
            car.setGear(5)
            expect(car.getGear()).equal(5)
            expect(car.setSpeed(50)).equal(true)
        })

        it('Car on fifth gear should set speed = 150', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(59)
            car.setGear(5)
            expect(car.getGear()).equal(5)
            expect(car.setSpeed(150)).equal(true)
        })

        it('Car on fifth gear shouldn\'t set speed = 49', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(59)
            car.setGear(5)
            expect(car.getGear()).equal(5)
            expect(car.setSpeed(49)).equal(false)
        })

        it('Car on fifth gear shouldn\'t set speed = 151', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(59)
            car.setGear(5)
            expect(car.getGear()).equal(5)
            expect(car.setSpeed(151)).equal(false)
        })

        it('Car on reverse gear should set speed = 0', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            expect(car.setSpeed(0)).equal(true)
        })

        it('Car on reverse gear should set speed = 20', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            expect(car.setSpeed(20)).equal(true)
        })

        it('Car on reverse gear shouldn\'t set speed = 21', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            expect(car.setSpeed(21)).equal(false)
        })

        it('Car on neutral gear should decrease speed', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(0)
            expect(car.getGear()).equal(0)
            expect(car.setSpeed(20)).equal(true)
        })

        it('Car on neutral gear shouldn\'t increase speed = 31', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(0)
            expect(car.getGear()).equal(0)
            expect(car.setSpeed(31)).equal(false)
        })
    })

    describe('gear tests.', () => {
        beforeEach(() => {
            car = new Car()
            car.engineOn()
        })

        it('Car with speed = 0 should set first gear', () => {
            expect(car.getSpeed()).equal(0)
            expect(car.setGear(1)).equal(true)
        })

        it('Car with speed = 30 should set first gear and downgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            expect(car.getSpeed()).equal(30)
            expect(car.setGear(1)).equal(true)
        })

        it('Car with speed = 31 shouldn\'t set first gear', () => {
            car.setGear(1)
            car.setSpeed(20)
            car.setGear(2)
            car.setSpeed(31)
            expect(car.getSpeed()).equal(31)
            expect(car.setGear(1)).equal(false)
        })

        it('Car with speed = 20 should set second gear and upgrade gear', () => {
            car.setGear(1)
            car.setSpeed(20)
            expect(car.getSpeed()).equal(20)
            expect(car.setGear(2)).equal(true)
        })

        it('Car with speed = 50 should set second gear and downgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(50)
            expect(car.getSpeed()).equal(50)
            expect(car.setGear(2)).equal(true)
        })

        it('Car with speed = 19 shouldn\'t set second gear', () => {
            car.setGear(1)
            car.setSpeed(19)
            expect(car.getSpeed()).equal(19)
            expect(car.setGear(2)).equal(false)
        })

        it('Car with speed = 51 shouldn\'t set second gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(51)
            expect(car.getSpeed()).equal(51)
            expect(car.setGear(2)).equal(false)
        })

        it('Car with speed = 30 should set third gear and upgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            expect(car.getSpeed()).equal(30)
            expect(car.setGear(3)).equal(true)
        })

        it('Car with speed = 60 should set third gear and downgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(50)
            car.setGear(5)
            car.setSpeed(60)
            expect(car.getSpeed()).equal(60)
            expect(car.setGear(3)).equal(true)
        })

        it('Car with speed = 29 shouldn\'t set third gear', () => {
            car.setGear(1)
            car.setSpeed(29)
            expect(car.getSpeed()).equal(29)
            expect(car.setGear(3)).equal(false)
        })

        it('Car with speed = 61 shouldn\'t set third gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(50)
            car.setGear(4)
            car.setSpeed(61)
            expect(car.getSpeed()).equal(61)
            expect(car.setGear(3)).equal(false)
        })

        it('Car with speed = 40 should set fourth gear and upgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(40)
            expect(car.getSpeed()).equal(40)
            expect(car.setGear(4)).equal(true)
        })

        it('Car with speed = 90 should set fourth gear and downgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(50)
            car.setGear(5)
            car.setSpeed(90)
            expect(car.getSpeed()).equal(90)
            expect(car.setGear(4)).equal(true)
        })

        it('Car with speed = 39 shouldn\'t set fourth gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(2)
            car.setSpeed(39)
            expect(car.getSpeed()).equal(39)
            expect(car.setGear(4)).equal(false)
        })

        it('Car with speed = 91 shouldn\'t set fourth gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(50)
            car.setGear(5)
            car.setSpeed(91)
            expect(car.getSpeed()).equal(91)
            expect(car.setGear(4)).equal(false)
        })

        it('Car with speed = 50 should set fifth gear and upgrade gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(50)
            expect(car.getSpeed()).equal(50)
            expect(car.setGear(5)).equal(true)
        })

        it('Car with speed = 49 shouldn\'t set fifth gear', () => {
            car.setGear(1)
            car.setSpeed(30)
            car.setGear(3)
            car.setSpeed(49)
            expect(car.getSpeed()).equal(49)
            expect(car.setGear(5)).equal(false)
        })

        it('Car with speed = 0 should set reverse gear', () => {
            expect(car.getSpeed()).equal(0)
            expect(car.setGear(-1)).equal(true)
        })

        it('Car with speed = 10 shouldn\'t set reverse gear', () => {
            car.setGear(1)
            car.setSpeed(10)
            expect(car.getSpeed()).equal(10)
            expect(car.setGear(-1)).equal(false)
        })

        it('Car should change gear from first to third', () => {
            car.setGear(1)
            expect(car.getGear()).equal(1)
            car.setSpeed(30)
            expect(car.setGear(3)).equal(true)
        })

        it('Car should change gear from reverse to first, if speed = 0', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            expect(car.getSpeed()).equal(0)
            expect(car.setGear(1)).equal(true)
        })

        it('Car shouldn\'t change gear from reverse to first, if speed > 0', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            car.setSpeed(10)
            expect(car.getSpeed()).equal(10)
            expect(car.setGear(1)).equal(false)
        })

        it('Car shouldn\'t change gear reverse - neutral - first, if speed > 0 on neutral', () => {
            car.setGear(-1)
            expect(car.getGear()).equal(-1)
            car.setSpeed(10)
            expect(car.getSpeed()).equal(10)
            car.setGear(0)
            expect(car.getGear()).equal(0)
            expect(car.setGear(1)).equal(false)
        })
    })

    describe('direction tests.', () => {
        beforeEach(() => {
            car = new Car()
            car.engineOn()
        })

        it('Car should move backward', () => {
            car.setGear(-1)
            car.setSpeed(10)
            expect(car.getDirection()).equal(-1)
        })

        it('Car should stand', () => {
            car.setGear(-1)
            car.setSpeed(10)
            car.setSpeed(0)
            expect(car.getDirection()).equal(0)
        })

        it('Car should move forward', () => {
            car.setGear(1)
            car.setSpeed(10)
            expect(car.getDirection()).equal(1)
        })
    })
})