import { InputTypeError, IllegalIteratorBehaviorError } from './commons/ErrorModels';
import { CloneableIterator, PrimitiveIterator, isCloneableIterator } from './base';

class RepeatIterator implements CloneableIterator {
    static FOREVER: number = -1;

    iterator: CloneableIterator;
    repeatLimit: number;
    repeatCount: number = 1;
    
    constructor(iterator: CloneableIterator, repeatLimit: number) {
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

        if (this.repeatLimit !== RepeatIterator.FOREVER
            && !(this.repeatCount < this.repeatLimit)) {
            return {value: undefined, done: true};
        }

        this.iterator = this.iterator.clone();
        next = this.iterator.next();
        if (next.done) {
            throw new IllegalIteratorBehaviorError('iterator should iterable more than once');
        }
        this.repeatCount++;
        return next;
    }

    public clone(): CloneableIterator {
        return new RepeatIterator(this.iterator, this.repeatLimit);
    }

}

function repeat(item: number | string | CloneableIterator): CloneableIterator {
    if (typeof item !== 'number' && typeof item !== 'string' && !isCloneableIterator(item)) {
        throw new InputTypeError();    
    }

    let iterable: CloneableIterator;
    if (typeof item === 'number' || typeof item === 'string') {
        iterable = new PrimitiveIterator(item);
    } else {
        iterable = item;
    }
    return new RepeatIterator(iterable, -1);
}

export { RepeatIterator };
export default repeat;
