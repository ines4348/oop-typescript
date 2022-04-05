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
    private engine: boolean
    private speed: number
    private gear: Gear
    private direction: Direction

    constructor() {
        this.engine = false
        this.speed = 0
        this.gear = Gear.NEUTRAL
        this.direction = Direction.STAND
    }

    public isTurnedOn(): boolean {
        return this.engine
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

    public engineOn(): boolean {
        this.engine = true
        return this.engine
    }

    public engineOff(): boolean {
        if (this.engine && this.gear === Gear.NEUTRAL && this.speed === 0 && this.direction === Direction.STAND) {
            this.engine = false
        }

        return !this.engine
    }

    public setGear(gear: number): boolean {
        if (this.isChangeGear(gear)) {
            this.gear = this.convertGearNumberToEnum(gear)
            return true
        }
        return false
    }

    public setSpeed(speed: number): boolean {
        if (this.isChangeSpeed(speed)) {
            this.setDirection({speed: speed})
            this.speed = speed
            return true
        }
        return false
    }

    private setDirection(options: {speed?: number, gear?: Gear}): void {
        if (options.gear === Gear.REVERSE) {
            this.direction = Direction.BACKWARD
            return
        }

        if (options.gear && options.gear > Gear.NEUTRAL) {
            this.direction = Direction.FORWARD
            return
        }

        if (options.speed === 0) {
            this.direction = Direction.STAND
            return
        }
    }

    private isChangeSpeed(speed: number): boolean {
        if (this.getGear() === Gear.NEUTRAL && (this.speed - speed) > 0) {
            return true
        }

        return this.isCorrespondsGearToSpeed(this.getGear(), speed)
    }

    private isChangeGear(gear: Gear): boolean {
        return this.isCorrespondsGearToSpeed(gear, this.getSpeed())
    }

    private convertGearNumberToEnum(gear: number): Gear {
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

    private isCorrespondsGearToSpeed(gear: Gear, speed: number) {
        switch (gear) {
            case Gear.NEUTRAL: {
                return true
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
}

export {
    Gear,
    Direction,
    Car,
}