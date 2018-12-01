import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    ArrayIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator } from './commons/utility';

function cycle(item: Array<any> | IterableProtocol): IterableProtocol {
    if (!Array.isArray(item) && !isIterator(item)) {
        throw new ArgumentError('Please check arguments type.');
    }
    if (Array.isArray(item) && (item as Array<any>).length === 0) {
        throw new ArgumentError('Array is empty.');
    }

    let iterator: IterableProtocol;
    if (Array.isArray(item)) {
        iterator = new ArrayIterator(item);
    } else {
        iterator = item;
    }

    return new RepeatIterator(iterator, RepeatIterator.FOREVER);
}

export default cycle;
