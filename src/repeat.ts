import { InputTypeError } from './commons/ErrorModels';
import {
    CloneableIterator,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isCloneableIterator } from './commons/utility';

function repeat(item: number | string | CloneableIterator): CloneableIterator {
    if (
        typeof item !== 'number' &&
        typeof item !== 'string' &&
        !isCloneableIterator(item)
    ) {
        throw new InputTypeError();
    }

    let iterable: CloneableIterator;
    if (typeof item === 'number' || typeof item === 'string') {
        iterable = new PrimitiveIterator(item);
    } else {
        iterable = item;
    }
    return new RepeatIterator(iterable, -1);
}

export default repeat;
