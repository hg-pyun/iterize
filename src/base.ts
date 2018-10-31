interface CloneableIterator extends IterableIterator<any> {
    // this method should clone the initial state of iterator
    clone(): CloneableIterator;
}

function isCloneableIterator(value: any): value is CloneableIterator {
    return value.clone !== undefined;
}

class PrimitiveIterator implements CloneableIterator {
    value: number | string;
    done: boolean = false;

    constructor(value: number | string) {
        this.value = value;
    }

    [Symbol.iterator]() {
        return this;
    }

    public next(value?: any): IteratorResult<any> {
        if (this.done) {
            return {value: undefined, done: true};
        }
        this.done = true;
        return {value: this.value, done: false};
    }

    public clone(): CloneableIterator {
        return new PrimitiveIterator(this.value);
    }
}

class ArrayIterator implements CloneableIterator {
    arr: Array<any>;

    arrIterator: Iterator<any>;

    // parameter array should be immutable
    constructor(arr: Array<any>) {
        this.arr = arr;
        this.arrIterator = arr[Symbol.iterator]();
    }

    [Symbol.iterator]() {
        return this;
    }

    public next(value?: any): IteratorResult<any> {
        return this.arrIterator.next();
    }

    public clone(): CloneableIterator {
        return new ArrayIterator(this.arr);
    }
}

export { CloneableIterator, PrimitiveIterator, ArrayIterator, isCloneableIterator };