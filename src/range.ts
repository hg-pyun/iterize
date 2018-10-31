import { InputTypeError } from './commons/ErrorModels';
import { CloneableIterator, RangeIterator } from './commons/Iterators';

function range(
    start: number,
    end: number,
    step: number | Function
): CloneableIterator {
    if (
        typeof start !== 'number' &&
        typeof end !== 'number' &&
        (typeof step !== 'function' || typeof step !== 'number')
    ) {
        throw new InputTypeError();
    }

    let stepFunction: any = step;
    if (typeof step === 'number') {
        stepFunction = (value: number) => {
            return value + step;
        };
    }

    return new RangeIterator(start, end, stepFunction);
}

export default range;
