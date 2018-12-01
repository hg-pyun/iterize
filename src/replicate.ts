import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator } from './commons/utility';

function replicate(count: number, item: number | string | IterableProtocol) {
    if (
        typeof count !== 'number' ||
        (typeof item !== 'number' &&
            typeof item !== 'string' &&
            !isIterator(item))
    ) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (count < 1) {
        throw new ArgumentError('Replicate count must be larger than 1.');
    }

    let iterator: any = item;
    if (!isIterator(item)) {
        iterator = new PrimitiveIterator(item);
    }

    return new RepeatIterator(iterator, count);
}

export default replicate;
