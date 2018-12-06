import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    ArrayIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator, isRepeatIterator } from './commons/utility';

function cycle(item: Array<any> | IterableProtocol): IterableProtocol {

    if (validateInputTypes(item)) {
        throw new ArgumentError('Please check arguments type.');
    }

    // todo refactoring
    if (Array.isArray(item) && (item as Array<any>).length === 0) {
        throw new ArgumentError('Array is empty.');
    }
    else if(isRepeatIterator(item as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: IterableProtocol;
    if (Array.isArray(item)) {
        iterator = new ArrayIterator(item);
    } else {
        iterator = item;
    }

    return new RepeatIterator(iterator, RepeatIterator.FOREVER);
}

function validateInputTypes(item: any) {
    return !Array.isArray(item) && !isIterator(item);
}

export default cycle;
