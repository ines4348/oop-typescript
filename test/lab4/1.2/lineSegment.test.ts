import {LineSegment} from '../../../src/lab4/1.2/LineSegment'
import {Point} from '../../../src/lab4/1.2/Point'
import {describe} from 'mocha'
import {expect} from 'chai'

describe('LineSegment', () => {
    let lineSegment: LineSegment
    let startPoint: Point
    let endPoint: Point
    let outlineColor: string

    describe('perimeter', () => {
        it('should be equal 10 with startPoint = (0,0) and endPoint = (10,0)', () => {
            startPoint = {
                x: 0,
                y: 0,
            }
            endPoint = {
                x: 10,
                y: 0,
            }
            outlineColor = '000000'
            lineSegment = new LineSegment(startPoint, endPoint, outlineColor)
            expect(lineSegment.getPerimeter()).equal(10)
        })

        it('should be equal 5 with startPoint = (0,4) and endPoint = (3,0)', () => {
            startPoint = {
                x: 0,
                y: 4,
            }
            endPoint = {
                x: 3,
                y: 0,
            }
            outlineColor = '000000'
            lineSegment = new LineSegment(startPoint, endPoint, outlineColor)
            expect(lineSegment.getPerimeter()).equal(5)
        })

        it('should be equal 0 with startPoint = (1,1) and endPoint  = (1,1)', () => {
            startPoint = {
                x: 1,
                y: 1,
            }
            endPoint = {
                x: 1,
                y: 1,
            }
            outlineColor = '000000'
            lineSegment = new LineSegment(startPoint, endPoint, outlineColor)
            expect(lineSegment.getPerimeter()).equal(0)
        })
    })

    describe('toString', () => {
        it('should be show info about shape type, left top point, endPoint, outline color', () => {
            startPoint = {
                x: 0,
                y: 0,
            }
            endPoint = {
                x: 10,
                y: 0,
            }
            outlineColor = '000000'
            lineSegment = new LineSegment(startPoint, endPoint, outlineColor)
            expect(lineSegment.toString()).equal(
                'line segment\n' +
                'start point: (0,0)\n' +
                'end point: (10,0)\n' +
                'perimeter: 10\n' +
                'outline color: 000000')
        })
    })
})