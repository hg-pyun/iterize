import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator } from './commons/utility';

function replicate(
    count: number,
    item: number | string | Function | IterableProtocol
) {
    if (typeof count !== 'number') {
        throw new ArgumentError('Count argument must be number type.');
    }

    if (count < 1) {
        throw new ArgumentError('Replicate count must be larger than 1.');
    }

    if (
        typeof item !== 'number' &&
        typeof item !== 'string' &&
        typeof item !== 'function' &&
        !isIterator(item)
    ) {
        throw new ArgumentError('Please check arguments type.');
    }

    let iterator: IterableProtocol;
    if (!isIterator(item)) {
        iterator = new PrimitiveIterator(item);
    } else {
        iterator = item;
    }

    return new RepeatIterator(iterator, count);
}

export default replicate;
