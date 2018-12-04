import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import {isIterator, isRepeatIterator} from './commons/utility';

function repeat(item: number | string | IterableProtocol): IterableProtocol {
    if (validateInputTypes(item)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if(isRepeatIterator(item as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterable: IterableProtocol;
    if (typeof item === 'number' || typeof item === 'string') {
        iterable = new PrimitiveIterator(item);
    } else {
        iterable = item;
    }
    return new RepeatIterator(iterable, -1);
}

function validateInputTypes(item: any) {
    return typeof item !== 'number' && typeof item !== 'string' && !isIterator(item);
}

export default repeat;
