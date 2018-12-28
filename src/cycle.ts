import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    ArrayIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator, isRepeatIterator } from './commons/utility';

function cycle (item: string | Array<any> | IterableProtocol): IterableProtocol {
    if (validateInputTypes(item)) {
        throw new ArgumentError('Please check arguments type.');
    }

    // todo refactoring
    if (Array.isArray(item) && (item as Array<any>).length === 0) {
        throw new ArgumentError('Array is empty.');
    } else if (isRepeatIterator(item as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: IterableProtocol;
    if (Array.isArray(item)) {
        iterator = new ArrayIterator(item);
    } else if (typeof item === 'string') {
        iterator = new ArrayIterator(item.split(''));
    } else {
        iterator = item;
    }

    return new RepeatIterator(iterator, RepeatIterator.FOREVER);
}

function validateInputTypes (item: any) {
    return typeof item !== 'string' && !Array.isArray(item) && !isIterator(item);
}

export default cycle;
