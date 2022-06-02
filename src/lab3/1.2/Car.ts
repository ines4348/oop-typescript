enum Gear {
    REVERSE = -1,
    NEUTRAL,
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
}

enum Direction {
    BACKWARD = -1,
    STAND,
    FORWARD,
}

class Car {
    private isEngineOn: boolean //TODO: переименовать с использованием какого-нибудь глагола
    private speed: number
    private gear: Gear
    private direction: Direction

    constructor() {
        this.isEngineOn = false
        this.speed = 0
        this.gear = Gear.NEUTRAL
        this.direction = Direction.STAND
    }

    public isTurnedOn(): boolean {
        return this.isEngineOn
    }

    public getDirection(): Direction {
        return this.direction
    }

    public getSpeed(): number {
        return this.speed
    }

    public getGear(): Gear {
        return this.gear
    }

    public engineOn(): boolean {//TODO всегда return true
        this.isEngineOn = true
        return this.isEngineOn
    }

    public engineOff(): boolean {
        if (this.isEngineOn &&
            this.gear === Gear.NEUTRAL &&
            this.speed === 0 && //заменить на хранение скорости со знаком вместо Direction
            this.direction === Direction.STAND) {//TODO убрать Direction
            this.isEngineOn = false
        }

        return !this.isEngineOn
    }

    public setGear(gear: number): boolean {
        // doesGearCorrespondToDirection, gearCorrespondsToDirection (this.gearCorrespondsToDirection)
        // почему две функции вызывать по отдельности?
        if (this.canChangeGear(gear) && this.isCorrespondsGearToDirection(gear)) {
            this.gear = this.convertGearNumberToEnum(gear)
            return true
        }
        return false
    }

    public setSpeed(speed: number): boolean {
        if (this.isChangeSpeed(speed)) {//canChangeSpeed
            this.speed = speed
            this.changeDirection()
            return true
        }
        return false
    }

    private changeDirection(): void {//updateDirection
        if (this.gear === Gear.REVERSE && this.speed > 0) {
            this.direction = Direction.BACKWARD
            return
        }

        if (this.gear > Gear.NEUTRAL && this.speed > 0) {
            this.direction = Direction.FORWARD
            return
        }

        if (this.speed === 0) {
            this.direction = Direction.STAND
            return
        }
    }

    private isChangeSpeed(speed: number): boolean {
        if (this.gear === Gear.NEUTRAL && (this.speed - speed) <= 0) {//TODO: ипользовать единый подход для получения внутренниъ свойств класса
            return false
        }
        if (this.isSpeedAllowedForGear(this.gear, speed)) {
            return true
        }
        return false
    }

    private canChangeGear(gear: Gear): boolean {//TODO: переименовать с использованием can
        if (this.gear !== Gear.REVERSE && gear === Gear.REVERSE && this.speed === 0) {
            return true
        } else if (gear != Gear.REVERSE && this.isSpeedAllowedForGear(gear, this.speed)) {
            return true
        }
        return false
    }

    private convertGearNumberToEnum(gear: number): Gear {//массив для хранения значений
        switch (gear) {
            case -1: {
                return Gear.REVERSE
            }
            case 0: {
                return Gear.NEUTRAL
            }
            case 1: {
                return Gear.FIRST
            }
            case 2: {
                return Gear.SECOND
            }
            case 3: {
                return Gear.THIRD
            }
            case 4: {
                return Gear.FOURTH
            }
            case 5: {
                return Gear.FIFTH
            }
            default: {
                return Gear.NEUTRAL
            }
        }
    }

    //TODO: декомпозировать функцию на несколько, потому что сейчас в ней используются 4 параметра, а можно ограничится 3 в каждой из них
    private isSpeedAllowedForGear(gear: Gear, speed: number) {//TODO: isSpeedAllowedForGear
        switch (gear) {//массив для хранения значений скорость и передача
            case Gear.NEUTRAL: {
                return true
                break
            }
            case Gear.FIRST: {
                if (speed >= 0 && speed <= 30) {
                    return true
                }
                break
            }
            case Gear.SECOND: {
                if (speed >= 20 && speed <= 50) {
                    return true
                }
                break
            }
            case Gear.THIRD: {
                if (speed >= 30 && speed <= 60) {
                    return true
                }
                break
            }
            case Gear.FOURTH: {
                if (speed >= 40 && speed <= 90) {
                    return true
                }
                break
            }
            case Gear.FIFTH: {
                if (speed >= 50 && speed <= 150) {
                    return true
                }
                break
            }
            case Gear.REVERSE: {
                if (speed >= 0 && speed <= 20) {
                    return true
                }
                break
            }
        }

        return false
    }

    private isCorrespondsGearToDirection(gear: Gear): boolean {
        switch (this.getDirection()) {
            case Direction.STAND: {
                return true
            }
            case Direction.FORWARD: {
                if (gear != Gear.REVERSE) {
                    return true
                }
                break
            }
            case Direction.BACKWARD: {
                if (gear <= Gear.NEUTRAL) {
                    return true
                }
                break
            }
        }
        return false
    }
}

export {
    Gear,
    Direction,
    Car,
}