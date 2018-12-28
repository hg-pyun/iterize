import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    ArrayIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator, isRepeatIterator } from './commons/utility';

function cycle (seq: string | Array<any> | IterableProtocol): IterableProtocol {
    if (validateInputTypes(seq)) {
        throw new ArgumentError('Please check arguments type.');
    }

    // todo refactoring
    if (Array.isArray(seq) && (seq as Array<any>).length === 0) {
        throw new ArgumentError('Array is empty.');
    } else if (isRepeatIterator(seq as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: IterableProtocol;
    if (Array.isArray(seq)) {
        iterator = new ArrayIterator(seq);
    } else if (typeof seq === 'string') {
        iterator = new ArrayIterator(seq.split(''));
    } else {
        iterator = seq;
    }

    return new RepeatIterator(iterator, RepeatIterator.FOREVER);
}

function validateInputTypes (seq: any) {
    return typeof seq !== 'string' && !Array.isArray(seq) && !isIterator(seq);
}

export default cycle;
