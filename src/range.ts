import { InputTypeError } from './commons/ErrorModels';
import { CloneableIterator } from './base';

class RangeIterator implements CloneableIterator {
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
            return {value: value, done: false}
        }
        return {value: undefined, done: true};
    }

    hasNext() {
        if (this.start < this.end) {
            return this.current < this.end;
        } else {
            return this.current > this.end;
        }
    }

    public clone(): CloneableIterator {
        return new RangeIterator(this.start, this.end, this.step);
    }
}

function range(
    start: number,
    end: number,
    step: number | Function
): CloneableIterator {
    if (typeof start !== 'number' && typeof end !== 'number' && 
        (typeof step !== 'function' || typeof step !== 'number')) {
        throw new InputTypeError();    
    }

    let stepFunction: any = step;
    if (typeof step === 'number') {
        stepFunction = (value: number) => {
            return value + step;
        }
    }

    return new RangeIterator(start, end, stepFunction);
}

export default range;
