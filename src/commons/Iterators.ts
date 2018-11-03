import { IllegalIteratorBehaviorError } from './ErrorModels';

interface IterableProtocol extends IterableIterator<any> {
    // this method should clone the initial state of iterator
    clone(): IterableProtocol;
}

class PrimitiveIterator implements IterableProtocol {
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
            return { value: undefined, done: true };
        }
        this.done = true;
        return { value: this.value, done: false };
    }

    public clone(): IterableProtocol {
        return new PrimitiveIterator(this.value);
    }
}

class ArrayIterator implements IterableProtocol {
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

    public clone(): IterableProtocol {
        return new ArrayIterator(this.arr);
    }
}

class RepeatIterator implements IterableProtocol {
    static FOREVER: number = -1;

    iterator: IterableProtocol;
    repeatLimit: number;
    repeatCount: number = 1;

    constructor(iterator: IterableProtocol, repeatLimit: number) {
        this.iterator = iterator;
        this.repeatLimit = repeatLimit;
    }

    [Symbol.iterator]() {
        return this;
    }

    public next(value?: any): IteratorResult<any> {
        let next: IteratorResult<any> = this.iterator.next();
        if (!next.done) {
            return next;
        }

        if (
            this.repeatLimit !== RepeatIterator.FOREVER &&
            !(this.repeatCount < this.repeatLimit)
        ) {
            return { value: undefined, done: true };
        }

        this.iterator = this.iterator.clone();
        next = this.iterator.next();
        if (next.done) {
            throw new IllegalIteratorBehaviorError(
                'iterator should iterable more than once'
            );
        }
        this.repeatCount++;
        return next;
    }

    public clone(): IterableProtocol {
        return new RepeatIterator(this.iterator, this.repeatLimit);
    }
}

class RangeIterator implements IterableProtocol {
    start: number;
    end: number;
    step: Function;

    current: number;

    constructor(start: number, end: number, step: Function) {
        this.start = start;
        this.end = end;
        this.step = step;
        this.current = start;
    }

    [Symbol.iterator]() {
        return this;
    }

    public next(value?: any): IteratorResult<any> {
        if (this.hasNext()) {
            let value = this.current;
            this.current = this.step(this.current);
            return { value: value, done: false };
        }
        return { value: undefined, done: true };
    }

    hasNext() {
        if (this.start < this.end) {
            return this.current < this.end;
        } else {
            return this.current > this.end;
        }
    }

    public clone(): IterableProtocol {
        return new RangeIterator(this.start, this.end, this.step);
    }
}

export {
    IterableProtocol,
    PrimitiveIterator,
    ArrayIterator,
    RepeatIterator,
    RangeIterator,
};
