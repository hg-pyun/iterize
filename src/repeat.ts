import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator } from './commons/utility';

function repeat(
    item: number | string | Function | IterableProtocol
): IterableProtocol {
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
    return new RepeatIterator(iterator, -1);
}

export default repeat;
