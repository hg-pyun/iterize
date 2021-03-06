import { ArgumentError } from './commons/ErrorModels';
import { RangeIterator } from './commons/Iterators';
import { IterableProtocol } from './commons/types';

function range (
    start: number,
    end?: number,
    step?: number | Function,
): IterableProtocol {
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }

    if (typeof step === 'undefined') {
        if (start < end) {
            step = 1;
        } else {
            step = -1;
        }
    }

    if (validateSameRage(start, end)) {
        throw new ArgumentError('The range parameter is same.');
    } else if (validateInputTypes(start, end, step)) {
        throw new ArgumentError('Please check arguments type.');
    }

    let stepFunction: any = step;

    if (typeof step === 'number') {
        let stepValue: number = step;
        stepFunction = (value: number) => {
            return value + stepValue;
        };
    }
    return new RangeIterator(start, end, stepFunction);
}

function validateSameRage (start: number, end: number): boolean {
    return start === end;
}

function validateInputTypes (
    start: number,
    end?: number,
    step?: number | Function,
) {
    return (
        typeof start !== 'number' ||
        typeof end !== 'number' ||
        (typeof step !== 'number' && typeof step !== 'function')
    );
}

export default range;
