import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import {isIterator, isRepeatIterator} from './commons/utility';

function repeat(
    item: number | string | Function | IterableProtocol,
    count: number
): IterableProtocol {
    if (validateInputTypes(item, count)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (validateCountNumber(count)) {
        throw new ArgumentError('Repeat count must be larger than 1.');
    }

    if (isRepeatIterator(item as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: IterableProtocol;
    if (!isIterator(item)) {
        iterator = new PrimitiveIterator(item);
    } else {
        iterator = item;
    }
    return new RepeatIterator(iterator, count);
}

function validateInputTypes(item: any, count: number) {
    return (
        typeof count !== 'number' ||
        (typeof item !== 'number' &&
            typeof item !== 'string' &&
            typeof item !== 'function' &&
            !isIterator(item))
    );
}

function validateCountNumber(count: number) {
    return count < 1;
}


export default repeat;
