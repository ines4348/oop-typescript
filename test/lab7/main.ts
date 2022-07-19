function Fn() {
    return -1;
}

function G(n: Number) {
    console.log(n);
}

function handleRequest() {
    const fnResult: number = Fn()
    if (fnResult < 0) {
        throw new Error('Wrong result from Fn')
    }

    G(fnResult)
}

function main() {
    try {
        handleRequest()
    } catch (error) {
        console.log(error.message)
    }

}

main()

class Cat {
    // Must be always >= 0
    private energy = 42

    public getEnergy(): number {
        return this.energy
    }

    play() {
        if (this.energy < 10) {
            throw new Error('Cat don\'t can play')
        }
        this.energy -= 10
    }
}

class Person {
    private cat1: Cat
    private cat2: Cat
    private happiness: number = 0

    constructor(cat1: Cat, cat2: Cat) {
        this.cat1 = cat1
        this.cat2 = cat2
    }

    doHomeWork() {
        if (this.cat1.getEnergy() > 10 && this.cat2.getEnergy() > 10) {
            this.cat2.play()
            this.cat1.play()
            this.happiness += 10
        }
    }
}