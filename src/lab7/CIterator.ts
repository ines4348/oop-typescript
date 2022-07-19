import {TNode} from './CMyList'

class CIterator<T> {
    //переименовать в node и приватный
    position: TNode<T> | null
//метод позволяющий получить значение и задать значение
    constructor(position: TNode<T> | null) {
        this.position = position
    }

    public next(): TNode<T> | null {
        this.position = this.position?.next ?? null
        return this.position
    }

    public prev(): TNode<T> | null {
        this.position = this.position?.prev ?? null
        return this.position
    }

    public valid(): boolean {
        return Boolean(this.position?.next)
    }
}

export {
    CIterator,
}