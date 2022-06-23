const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600
const SECONDS_IN_DAY = 86400

const ERROR_MESSAGE = 'Wrong parameters'
const ERROR_MESSAGE_NULL = 'Divisor must not be zero'
const ERROR_MESSAGE_NOT_INTEGER = 'Parameter must be integer'

class Time {
    private seconds: number

    constructor(hours: number, minutes: number, seconds: number = 0) {
        if (!Time.isValidParameters(hours, minutes, seconds)) {
            throw new Error(ERROR_MESSAGE)
        }
        this.seconds = Time.convertToTimestamp(hours, minutes, seconds)
    }

    public getHours(): number {
        return Time.hoursInTimestamp(this.seconds)
    }

    public getMinutes(): number {
        return Time.minutesInTimestamp(this.seconds)
    }

    public getSeconds(): number {
        return Time.secondsInTimestamp(this.seconds)
    }

    public postIncrement(): Time {
        const temporaryTime: Time = Time.convertTimestampToTime(this.seconds)
        this.seconds = Time.getCorrectSeconds(++this.seconds)
        return temporaryTime
    }

    public prefixIncrement(): Time {
        this.seconds = Time.getCorrectSeconds(++this.seconds)
        return this
    }

    public postDecrement(): Time {
        const temporaryTime: Time = Time.convertTimestampToTime(this.seconds)
        this.seconds = Time.getCorrectSeconds(--this.seconds)
        return temporaryTime
    }

    public prefixDecrement(): Time {
        this.seconds = Time.getCorrectSeconds(--this.seconds)
        return this
    }

    public addWithAssignment(time: Time): Time {
        const temporarySeconds = this.seconds + time.seconds
        this.seconds = Time.getCorrectSeconds(temporarySeconds)
        return this
    }

    public subWithAssignment(time: Time): Time {
        const temporarySeconds = this.seconds - time.seconds
        this.seconds = Time.getCorrectSeconds(temporarySeconds)
        return this
    }

    public multiWithAssignment(coefficient: number): Time {
        if (!Number.isInteger(coefficient)) {
            throw new Error(ERROR_MESSAGE_NOT_INTEGER)
        }

        let temporarySeconds: number
        temporarySeconds = this.seconds * coefficient

        this.seconds = Time.getCorrectSeconds(temporarySeconds)
        return this
    }

    public divWithAssignment(divisor: Time | number): Time {
        const temporaryTimestamp: number = Time.getDivResult(this, divisor)
        this.seconds = Math.trunc(Time.getCorrectSeconds(temporaryTimestamp))
        return this
    }

    public static convertTimestampToTime(timestamp: number): Time {
        return new Time(
            Time.hoursInTimestamp(timestamp),
            Time.minutesInTimestamp(timestamp),
            Time.secondsInTimestamp(timestamp),
        )
    }

    public static add(time1: Time, time2: Time): Time {
        const temporaryTimestamp: number = Time.getCorrectSeconds(time1.seconds + time2.seconds)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static sub(subtrahend: Time, residual: Time): Time {
        const temporaryTimestamp: number = Time.getCorrectSeconds(subtrahend.seconds - residual.seconds)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static multi(time: Time, coefficient: number): Time {
        if (!Number.isInteger(coefficient)) {
            throw new Error(ERROR_MESSAGE_NOT_INTEGER)
        }

        const temporaryTimestamp: number = Time.getCorrectSeconds(time.seconds * coefficient)
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static div(dividend: Time, divisor: Time | number): Time {
        //можно вынести одинаковый код
        let temporaryTimestamp: number = Time.getDivResult(dividend, divisor)
        temporaryTimestamp = Math.trunc(Time.getCorrectSeconds(temporaryTimestamp))
        return Time.convertTimestampToTime(temporaryTimestamp)
    }

    public static equal(time1: Time, time2: Time): boolean {
        return time1.seconds === time2.seconds
    }

    public static notEqual(time1: Time, time2: Time): boolean {
        return time1.seconds !== time2.seconds
    }

    public static isLarger(time1: Time, time2: Time): boolean {
        return time1.seconds > time2.seconds
    }

    public static isNotLarger(time1: Time, time2: Time): boolean {
        return time1.seconds <= time2.seconds
    }

    public static isLess(time1: Time, time2: Time): boolean {
        return time1.seconds < time2.seconds
    }

    public static isNotLess(time1: Time, time2: Time): boolean {
        return time1.seconds >= time2.seconds
    }

    private static getDivResult(dividend: Time, divisor: Time | number): number {
        let temporarySeconds: number
        if (typeof divisor === 'number') {
            if (divisor === 0) {
                throw new Error(ERROR_MESSAGE_NULL)
            }

            if (!Number.isInteger(divisor)) {
                throw new Error(ERROR_MESSAGE_NOT_INTEGER)
            }
            temporarySeconds = dividend.seconds / divisor
        } else {
            if (divisor.seconds === 0) {
                throw new Error(ERROR_MESSAGE_NULL)
            }
            temporarySeconds = dividend.seconds / divisor.seconds
        }
        return temporarySeconds
    }

    private static isValidParameters(hours: number, minutes: number, seconds: number): boolean {
        return Time.isValidHoursParameter(hours) && Time.isValidMinutesParameter(minutes) && Time.isValidSecondsParameter(seconds)
    }

    private static isValidHoursParameter(hours: number): boolean {
        return Number.isInteger(hours) && hours >= 0 && hours < 24

    }

    private static isValidMinutesParameter(minutes: number): boolean {
        return Number.isInteger(minutes) && minutes >= 0 && minutes < 60

    }

    private static isValidSecondsParameter(seconds: number): boolean {
        return Number.isInteger(seconds) && seconds >= 0 && seconds < 60

    }

    private static hoursInTimestamp(timestamp: number): number {
        return Math.trunc(timestamp / SECONDS_IN_HOUR)
    }

    private static minutesInTimestamp(timestamp: number): number {
        const hours: number = Time.hoursInTimestamp(timestamp)
        return Math.trunc((timestamp - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    }

    private static secondsInTimestamp(timestamp: number): number {
        const hours: number = Time.hoursInTimestamp(timestamp)
        const minutes: number = Time.minutesInTimestamp(timestamp)
        return timestamp - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    }

    private static convertToTimestamp(hours: number, minutes: number, seconds: number): number {
        return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
    }

    private static getCorrectSeconds(timestamp: number): number {
        const second = timestamp % SECONDS_IN_DAY

        if (second === SECONDS_IN_DAY) {
            return 0
        }

        if (second < 0) {
            return SECONDS_IN_DAY + second
        }

        return second
    }
}
//вынести повторяющийся код
export {
    Time,
}