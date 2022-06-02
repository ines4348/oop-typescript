import {Time} from '../../src/lab5/1.4/Time'
import {describe} from 'mocha'
import {expect} from 'chai'

describe('Time', () => {
    let time: Time

    it('should be throw exception by initialization with invalid hours = 88', () => {
        try {
            time = new Time(88, 0, 0)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be throw exception by initialization with invalid hours = 8.5', () => {
        try {
            time = new Time(8.5, 0, 0)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be throw exception by initialization with invalid minutes = 444', () => {
        try {
            time = new Time(12, 444, 0)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be throw exception by initialization with invalid minutes = 0.444', () => {
        try {
            time = new Time(12, 0.444, 0)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be throw exception by initialization with invalid seconds = 777', () => {
        try {
            time = new Time(12, 0, 777)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be throw exception by initialization with invalid seconds = 7.77', () => {
        try {
            time = new Time(12, 0, 7.77)
        } catch (error) {
            expect(error.message).equal('Wrong parameters')
        }
    })

    it('should be return 8 hours by initialization with 8 hours', () => {
        time = new Time(8, 8, 8)
        expect(time.getHours()).equal(8)
    })

    it('should be return 8 minutes by initialization with 8 minutes', () => {
        time = new Time(8, 8, 8)
        expect(time.getMinutes()).equal(8)
    })

    it('should be return 8 seconds by initialization with 8 seconds', () => {
        time = new Time(8, 8, 8)
        expect(time.getSeconds()).equal(8)
    })

    it('should be increment seconds and return old value', () => {
        time = new Time(8, 8, 8)
        const time2: Time = new Time(8, 8, 8)
        const timeAfterIncrement: Time = new Time(8, 8, 9)
        expect(time.postIncrement()).eql(time2)
        expect(time).eql(timeAfterIncrement)
    })

    it('should be increment seconds and return new value', () => {
        time = new Time(8, 8, 8)
        const time2: Time = new Time(8, 8, 9)
        expect(time.prefixIncrement()).eql(time2)
        expect(time).eql(time2)
    })

    it('should be decrement seconds and return old value', () => {
        time = new Time(8, 8, 8)
        const time2: Time = new Time(8, 8, 8)
        const timeAfterDecrement: Time = new Time(8, 8, 7)
        expect(time.postDecrement()).eql(time2)
        expect(time).eql(timeAfterDecrement)

    })

    it('should be decrement seconds and return new value', () => {
        time = new Time(8, 8, 8)
        const time2: Time = new Time(8, 8, 7)
        expect(time.prefixDecrement()).eql(time2)
        expect(time).eql(time2)

    })

    it('should be add up 14:30:25 and 3:18:44 and get 17:49:9', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const summa: Time = new Time(17, 49, 9)
        expect(Time.add(time, time2)).eql(summa)
        expect(time.getHours()).eql(14)
        expect(time.getMinutes()).eql(30)
        expect(time.getSeconds()).eql(25)
    })

    it('should be add up 23:59:59 + 0:0:01 = 0:0:0', () => {
        time = new Time(23, 59, 59)
        const time2: Time = new Time(0, 0, 1)
        const summa: Time = new Time(0, 0, 0)
        expect(Time.add(time, time2)).eql(summa)
        expect(time.getHours()).eql(23)
        expect(time.getMinutes()).eql(59)
        expect(time.getSeconds()).eql(59)
    })

    it('should be turn down 14:30:25 - 3:18:44 = 11:11:41', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const sub: Time = new Time(11, 11, 41)
        expect(Time.sub(time, time2)).eql(sub)
        expect(time.getHours()).eql(14)
        expect(time.getMinutes()).eql(30)
        expect(time.getSeconds()).eql(25)
    })

    it('should be turn down 0:0:0 - 0:0:1 = 23:59:59', () => {
        time = new Time(0, 0, 0)
        const time2: Time = new Time(0, 0, 1)
        const sub: Time = new Time(23, 59, 59)
        expect(Time.sub(time, time2)).eql(sub)
        expect(time.getHours()).eql(0)
        expect(time.getMinutes()).eql(0)
        expect(time.getSeconds()).eql(0)
    })

    it('should be multiply 14:30:25 and 3 and get 19:31:15', () => {
        time = new Time(14, 30, 25)
        const coefficient: number = 3
        const multiResult: Time = new Time(19, 31, 15)
        expect(Time.multi(time, coefficient)).eql(multiResult)
        expect(time.getHours()).eql(14)
        expect(time.getMinutes()).eql(30)
        expect(time.getSeconds()).eql(25)
    })

    it('should be throw exception by multi with invalid coefficient = 0.5', () => {
        time = new Time(23, 59, 58)
        const coefficient = 0.5
        try {
            Time.multi(time, coefficient)
        } catch (error) {
            expect(error.message).equal('Parameter must be integer')
        }
    })

    it('should be div 14:30:25 and 3 and get 4:50:25', () => {
        time = new Time(14, 30, 25)
        const divisor: number = 3
        const divResult: Time = new Time(4, 50, 8)
        expect(Time.div(time, divisor)).eql(divResult)
        expect(time.getHours()).eql(14)
        expect(time.getMinutes()).eql(30)
        expect(time.getSeconds()).eql(25)
    })

    it('should be throw exception by div with invalid coefficient = 0:0:0', () => {
        time = new Time(23, 59, 58)
        const divisor = new Time(0, 0, 0)
        try {
            Time.div(time, divisor)
        } catch (error) {
            expect(error.message).equal('Divisor must not be zero')
        }
    })

    it('should be throw exception by div with invalid coefficient = 0', () => {
        time = new Time(23, 59, 58)
        const coefficient = 0
        try {
            Time.multi(time, coefficient)
        } catch (error) {
            expect(error.message).equal('Parameter must be integer')
        }
    })

    it('should be throw exception by div with invalid coefficient = 0.5', () => {
        time = new Time(23, 59, 58)
        const coefficient = 0.5
        try {
            Time.multi(time, coefficient)
        } catch (error) {
            expect(error.message).equal('Parameter must be integer')
        }
    })

    it('should be add up with assignment 14:30:25 and 3:18:44 and get 17:49:9', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const addWithAssignment: Time = new Time(17, 49, 9)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('should be turn down with assignment 14:30:25 and 3:18:44 and get 11:11:41', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const subWithAssignment: Time = new Time(11, 11, 41)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('should be multiply with assignment 14:30:25 and 3 and get 19:31:15', () => {
        time = new Time(14, 30, 25)
        const coefficient: number = 3
        const multiWithAssignmentResult: Time = new Time(19, 31, 15)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('should be throw exception by multi  with assignment with invalid coefficient = 0.5', () => {
        time = new Time(23, 59, 58)
        const coefficient = 0.5
        try {
            time.multiWithAssignment(coefficient)
        } catch (error) {
            expect(error.message).equal('Parameter must be integer')
        }
    })

    it('should be div with assignment 23:59:58 on 0:0:2 = 11:58:59', () => {
        time = new Time(23, 59, 58)
        const divisor: Time = new Time(0, 0, 2)
        const divWithAssignmentResult: Time = new Time(11, 59, 59)
        expect(time.divWithAssignment(divisor)).eql(divWithAssignmentResult)
        expect(time).eql(divWithAssignmentResult)
    })

    it('should be div with assignment 23:59:58 on 2 = 11:58:59', () => {
        time = new Time(23, 59, 58)
        const divisor = 2
        const divWithAssignmentResult: Time = new Time(11, 59, 59)
        expect(time.divWithAssignment(divisor)).eql(divWithAssignmentResult)
        expect(time).eql(divWithAssignmentResult)
    })

    it('should be div with assignment 23:59:58 on 17 = 1:24:42', () => {
        time = new Time(23, 59, 58)
        const divisor = 17
        const divWithAssignmentResult: Time = new Time(1, 24, 42)
        Time.convertTimestampToTime(5082)
        expect(time.divWithAssignment(divisor)).eql(divWithAssignmentResult)
        expect(time).eql(divWithAssignmentResult)
    })

    it('should be throw exception by div with invalid divisor = 0:0:0', () => {
        time = new Time(23, 59, 58)
        const divisor: Time = new Time(0, 0, 0)
        try {
            time.divWithAssignment(divisor)
        } catch (error) {
            expect(error.message).equal('Divisor must not be zero')
        }
    })

    it('should be throw exception by div with invalid divisor = 0', () => {
        time = new Time(23, 59, 58)
        const divisor = 0
        try {
            time.divWithAssignment(divisor)
        } catch (error) {
            expect(error.message).equal('Divisor must not be zero')
        }
    })

    it('should be throw exception by div with invalid divisor = 0.5', () => {
        time = new Time(23, 59, 58)
        const divisor = 0.5
        try {
            time.divWithAssignment(divisor)
        } catch (error) {
            expect(error.message).equal('Parameter must be integer')
        }
    })

    it('should be equality with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.equal(time, time2)).equal(true)
    })

    it('shouldn\'t be equality with not equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(3, 59, 58)
        expect(Time.equal(time, time2)).equal(false)
    })

    it('shouldn\'t be equality with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.notEqual(time, time2)).equal(false)
    })

    it('should be not equality with not equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(3, 59, 58)
        expect(Time.notEqual(time, time2)).equal(true)
    })

    it('should be larger with more seconds ', () => {
        time = new Time(23, 59, 59)
        const time2 = new Time(23, 59, 58)
        expect(Time.isLarger(time, time2)).equal(true)
    })

    it('shouldn\'t be larger with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isLarger(time, time2)).equal(false)
    })

    it('should be not larger with less seconds ', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isNotLarger(time, time2)).equal(true)
    })

    it('should be not larger with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLarger(time, time2)).equal(true)
    })

    it('shouldn\'t be not larger with more seconds', () => {
        time = new Time(23, 59, 59)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLarger(time, time2)).equal(false)
    })

    it('should be less with less seconds ', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isLess(time, time2)).equal(true)
    })

    it('shouldn\'t be less with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isLess(time, time2)).equal(false)
    })

    it('should be not less with more seconds ', () => {
        time = new Time(23, 59, 59)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLess(time, time2)).equal(true)
    })

    it('should be not less with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLess(time, time2)).equal(true)
    })

    it('shouldn\'t be not less with less seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isNotLess(time, time2)).equal(false)
    })
})