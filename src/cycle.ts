import { InputTypeError, ArrayEmptyError } from './commons/ErrorModels';
import { CloneableIterator, isCloneableIterator, ArrayIterator } from './base';
import { RepeatIterator } from './repeat';

function cycle(item: Array<any> | CloneableIterator): CloneableIterator {
    if (!Array.isArray(item) && !isCloneableIterator(item)) {
        throw new InputTypeError();
    }
    if (Array.isArray(item) && (item as Array<any>).length === 0) {
        throw new ArrayEmptyError();
    }

    let iterator: CloneableIterator;
    if (Array.isArray(item)) {
        iterator = new ArrayIterator(item);
    } else {
        iterator = item;
    }

    return new RepeatIterator(iterator, RepeatIterator.FOREVER);
}

export default cycle;
