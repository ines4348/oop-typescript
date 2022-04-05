import {
    isContainsOnlyNumbers,
    fillFloatArray,
    convertStringToArray,
    multiplyEachItemByMinimum,
} from '../../../src/lab2/1.1/vector'
import {expect} from 'chai'
import {describe} from 'mocha'
import {Readable} from 'stream'

describe('vector test', () => {
    describe('function isContainsOnlyNumbers got', () => {
        it('"1" and should be return true', () => {
            expect(isContainsOnlyNumbers('1')).equals(true)
        })

        it('"1 8 1" and should be return true', () => {
            expect(isContainsOnlyNumbers('1 8 1')).equals(true)
        })

        it('"1.8" and should be return true', () => {
            expect(isContainsOnlyNumbers('1.8')).equals(true)
        })

        it('"1,8" and should be return false', () => {
            expect(isContainsOnlyNumbers('1,8')).equals(false)
        })

        it('"string" and should be return false', () => {
            expect(isContainsOnlyNumbers('string')).equals(false)
        })

        it('"" and should be return false', () => {
            expect(isContainsOnlyNumbers('')).equals(true)
        })
    })

    describe('function convertStringToArray got', () => {
        it('"1" and should be return [1]', () => {
            expect(convertStringToArray('1')).eql([1])
        })

        it('"1.8 8 1.4" and should be return [1.8, 8, 1.4]', () => {
            expect(convertStringToArray('1.8 8 1.4')).eql([1.8, 8, 1.4])
        })

        it('"" and should be return [NaN]', () => {
            expect(convertStringToArray('')).eql([NaN])
        })
    })

    describe('function fillFloatArray got', () => {
        it('["1"] and should be return [1]', () => {
            expect(fillFloatArray(['1'])).eql([1])
        })

        it('["1.8", "8", "1.4"] and should be return [1.8, 8, 1.4]', () => {
            expect(fillFloatArray(['1.8', '8', '1.4'])).eql([1.8, 8, 1.4])
        })

        it('[] and should be return []', () => {
            expect(fillFloatArray([])).eql([])
        })
    })

    describe('function multiplyEachItemByMinimum got', () => {
        it('[2, 3, 4] and should be return [4, 6, 8]', () => {
            expect(multiplyEachItemByMinimum([2, 3, 4])).eql([4, 6, 8])
        })

        it('[2, 2, 4] and should be return [4, 4, 8]', () => {
            expect(multiplyEachItemByMinimum([2, 3, 4])).eql([4, 6, 8])
        })

        it('array with some string and should be return array with some number', () => {
            expect(multiplyEachItemByMinimum([])).eql([])
        })
    })
})