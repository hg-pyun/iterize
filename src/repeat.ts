import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator, isRepeatIterator } from './commons/utility';

function repeat (
    seq: number | string | Function | IterableProtocol,
    count: number
): IterableProtocol {
    if (validateInputTypes(seq, count)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (validateCountNumber(count)) {
        throw new ArgumentError('Repeat count must be larger than 1.');
    }

    if (isRepeatIterator(seq as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: IterableProtocol;
    if (!isIterator(seq)) {
        iterator = new PrimitiveIterator(seq);
    } else {
        iterator = seq;
    }
    return new RepeatIterator(iterator, count);
}

function validateInputTypes (seq: any, count: number) {
    return (
        typeof count !== 'number' ||
        (typeof seq !== 'number' &&
            typeof seq !== 'string' &&
            typeof seq !== 'function' &&
            !isIterator(seq))
    );
}

function validateCountNumber (count: number) {
    return count < 1;
}

export default repeat;
