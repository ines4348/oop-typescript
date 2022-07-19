import {CIterator} from './CIterator'

type TNode<T> = {
    element: T | null,
    prev: TNode<T> | null,
    next: TNode<T> | null,
}

//итератор вынести в отдельный объект, в списке хранить начало и конец списка
class CMyList<T> {
    private head: TNode<T> | null
    private tail: TNode<T> | null
    private length: number

    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    public getElement(iterator: CIterator<T>): T | null {
        return iterator.position?.element ?? null
    }

    public getHead(): T | null {
        return this.head?.element ?? null
    }

    public getTail(): T | null {
        return this.tail?.element ?? null
    }

    public getBegin(): CIterator<T> {
        return new CIterator(this.head)
    }

    public getEnd(): CIterator<T> {
        return new CIterator(this.tail)
    }

    public pop(): void {
        if (this.tail && this.tail.prev) {
            const prevElement: TNode<T> = this.tail.prev
            prevElement.next = null
            this.tail = prevElement

            if (this.length > 0) {
                this.length -= 1
            }
        }
    }

    public push(element: T): void {
        const addedElement: TNode<T> = {
            element: element,
            prev: this.tail,
            next: null,
        }

        if (this.tail) {
            this.tail.next = addedElement
        }

        if (!this.head) {
            this.head = addedElement
        }

        this.tail = addedElement
        this.length += 1
        //зачем возвращать список
    }

    public shift(): void {
        if (this.head && this.head.next) {
            const nextElement: TNode<T> = this.head.next
            nextElement.prev = null
            this.head = nextElement
        }

        if (this.length > 0) {
            this.length -= 1
        }
        //зачем возвращать список
    }

    public unshift(element: T): void {
        const addedElement: TNode<T> = {
            element: element,
            prev: null,
            next: this.head
        }

        if (this.head) {
            this.head.prev = addedElement
        }

        if (!this.tail) {
            this.tail = addedElement
        }

        this.head = addedElement
        this.length += 1
        //зачем возвращать список
    }

    //длина за константное время
    public getLength(): number {
        return this.length
    }

    public deleteElement(iterator: CIterator<T>): void {
        if (!iterator.position) {
            return
        }

        const prevElement: TNode<T> | null = iterator.position.prev
        const nextElement: TNode<T> | null = iterator.position.next

        if (prevElement) {
            prevElement.next = nextElement
        }

        if (nextElement) {
            nextElement.prev = prevElement
        }

        if (!prevElement && !nextElement) {
            this.head = null
            this.tail = null
        }

        iterator.position = nextElement
        //зачем возвращаить список
    }
    //переименовать в insert
    public insertAfterElement(iterator: CIterator<T>, element: T): void {
        if (!iterator.position) {
            return
        }

        const prevElement: TNode<T> | null = iterator.position
        const nextElement: TNode<T> | null = iterator.position.next
        const addedListElement: TNode<T> = {
            element: element,
            prev: prevElement,
            next: nextElement,
        }

        if (prevElement) {
            prevElement.next = addedListElement
        }

        if (nextElement) {
            nextElement.prev = addedListElement
        }
        iterator.position = addedListElement
    }
}

export {
    CMyList,
    TNode,
}