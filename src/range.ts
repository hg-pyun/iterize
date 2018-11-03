import { InputTypeError, IllegalArgumentError } from './commons/ErrorModels';
import { IterableProtocol, RangeIterator } from './commons/Iterators';

function range(
    start: number,
    end: number,
    step: number | Function
): IterableProtocol {
    if (start === end) {
        throw new IllegalArgumentError('The start and end parameter is same.');
    } else if (
        typeof start !== 'number' ||
        typeof end !== 'number' ||
        (typeof step !== 'number' && typeof step !== 'function')
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
