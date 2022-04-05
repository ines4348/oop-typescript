import {Car} from './Car'


class CarInterface {
    private car: Car

    constructor() {
        this.car = new Car()
    }

    public info() {
        console.log('Car info:')
        console.log('Engine: ', this.car.isTurnedOn())
        console.log('Speed: ', this.car.getSpeed())
        console.log('Gear: ', this.car.getGear())
        console.log('Direction: ', this.car.getDirection())
    }

    public engineOn() {
        this.car.engineOn()
    }

    public engineOff() {
        this.car.engineOff()
    }
}