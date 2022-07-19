import {describe} from 'mocha'
import {CMyList} from '../../src/lab7/CMyList'
import {expect} from 'chai'

describe('CMyList for string', () => {
    let cMyList: CMyList<string>

    it('element should be added to end of null list', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test')
        expect(cMyList.getHead()).equal('test')
    })

    it('element should be added to end of not null list', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test')
        cMyList.push('test2')
        expect(cMyList.getTail()).equal('test2')
    })

    it('element should be added to begin of null list', () => {
        cMyList = new CMyList<string>()
        cMyList.unshift('test')
        expect(cMyList.getHead()).equal('test')
    })

    it('element should be added to begin of not null list', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test')
        cMyList.unshift('test2')
        expect(cMyList.getHead()).equal('test2')
    })

    it('iterate should return element  one by one by reverse', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        const iterator = cMyList.getBegin()

        let i = 0
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(`test${i++}`)
            iterator.prev()
        }
    })

    it('reverse iterate should return element one by one by reverse', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        const iterator = cMyList.getEnd()

        let i = 2
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(`test${i--}`)
            iterator.next()
        }
    })

    it('iterate should return element one by one by reverse of null array', () => {
        cMyList = new CMyList<string>()

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(null)
            iterator.next()
        }
    })

    it('reverse iterate should return element one by one by reverse of null array', () => {
        cMyList = new CMyList<string>()

        const iterator = cMyList.getEnd()
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(null)
            iterator.prev()
        }
    })

    it('getLength should be return for not null array', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        expect(cMyList.getLength()).equal(3)
    })

    it('getLength should be return for null array', () => {
        cMyList = new CMyList<string>()

        expect(cMyList.getLength()).equal(0)
    })

    it('element should be delete', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            if (cMyList.getElement(iterator) === 'test1') {
                cMyList.deleteElement(iterator)
                expect(cMyList.getHead()).equal('test0')
            }
            iterator.next()
        }
    })

    it('single element should be delete', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            if (cMyList.getElement(iterator) === 'test0') {
                cMyList.deleteElement(iterator)
                expect(cMyList.getLength()).equal(0)
            }
            iterator.next()
        }
    })

    it('element should be added after element', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            if (cMyList.getElement(iterator) === 'test0') {
                cMyList.insertAfterElement(iterator, 'test')
                expect(cMyList.getElement(iterator)).equal('test')
            }
            iterator.next()
        }
    })

    it('element should be shifted', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        cMyList.shift()

        expect(cMyList.getLength()).equal(2)
        expect(cMyList.getHead()).equal('test1')
    })

    it('element should be shifted from null', () => {
        cMyList = new CMyList<string>()

        cMyList.shift()

        expect(cMyList.getLength()).equal(0)
        expect(cMyList.getHead()).equal(null)
    })

    it('element should be popped', () => {
        cMyList = new CMyList<string>()
        cMyList.push('test0')
        cMyList.push('test1')
        cMyList.push('test2')

        cMyList.pop()

        expect(cMyList.getLength()).equal(2)
        expect(cMyList.getTail()).equal('test1')
    })

    it('element should be shifted from null', () => {
        cMyList = new CMyList<string>()

        cMyList.shift()

        expect(cMyList.getLength()).equal(0)
        expect(cMyList.getTail()).equal(null)
    })
})

describe('CMyList for number', () => {
    let cMyList: CMyList<number>

    it('element should be added to end of null list', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        expect(cMyList.getHead()).equal(0)
    })

    it('element should be added to end of not null list', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        expect(cMyList.getHead()).equal(0)
        expect(cMyList.getTail()).equal(1)
    })

    it('element should be added to begin of null list', () => {
        cMyList = new CMyList<number>()
        cMyList.unshift(0)
        expect(cMyList.getHead()).equal(0)
    })

    it('element should be added to begin of not null list', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.unshift(1)
        expect(cMyList.getHead()).equal(1)
    })

    it('iterate should return element  one by one by reverse', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        cMyList.push(2)

        const iterator = cMyList.getBegin()

        let i = 0
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(i++)
            iterator.prev()
        }
    })

    it('reverse iterate should return element one by one by reverse', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        cMyList.push(2)

        const iterator = cMyList.getEnd()

        let i = 2
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(`test${i--}`)
            iterator.next()
        }
    })

    it('iterate should return element one by one by reverse of null array', () => {
        cMyList = new CMyList<number>()

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(null)
            iterator.next()
        }
    })

    it('reverse iterate should return element one by one by reverse of null array', () => {
        cMyList = new CMyList<number>()

        const iterator = cMyList.getEnd()
        while (iterator.valid()) {
            expect(cMyList.getElement(iterator)).equal(null)
            iterator.prev()
        }
    })

    it('getLength should be return for not null array', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        cMyList.push(2)

        expect(cMyList.getLength()).equal(3)
    })

    it('getLength should be return for null array', () => {
        cMyList = new CMyList<number>()

        expect(cMyList.getLength()).equal(0)
    })

    it('element should be delete', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        cMyList.push(2)

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            if (cMyList.getElement(iterator) === 1) {
                cMyList.deleteElement(iterator)
                expect(cMyList.getElement(iterator)).equal(2)
            }
            iterator.next()
        }

        expect(cMyList.getLength()).equal(2)
    })

    it('single element should be delete', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)

        const iterator = cMyList.getBegin()
        cMyList.deleteElement(iterator)

        expect(cMyList.getLength()).equal(0)
    })

    it('element shouldn\'t be added after null element', () => {
        cMyList = new CMyList<number>()

        const iterator = cMyList.getBegin()
        cMyList.insertAfterElement(iterator, 0)

        expect(cMyList.getLength()).equal(0)
    })

    it('element should be added after element', () => {
        cMyList = new CMyList<number>()
        cMyList.push(0)
        cMyList.push(1)
        cMyList.push(2)

        const iterator = cMyList.getBegin()
        while (iterator.valid()) {
            if (cMyList.getElement(iterator) === 1) {
                cMyList.insertAfterElement(iterator, 4)
                expect(cMyList.getElement(iterator)).equal(4)
            }
            iterator.next()
        }
    })
})