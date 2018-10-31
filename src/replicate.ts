import { InputTypeError, IllegalArgumentError } from './commons/ErrorModels';
import {
    CloneableIterator,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isCloneableIterator } from './commons/utility';

function replicate(count: number, item: number | string | CloneableIterator) {
    if (
        typeof count !== 'number' ||
        (typeof item !== 'number' &&
            typeof item !== 'string' &&
            !isCloneableIterator(item))
    ) {
        throw new InputTypeError();
    }

    if (count < 1) {
        throw new IllegalArgumentError('replicate count must be larger than 1');
    }

    let iterator: any = item;
    if (!isCloneableIterator(item)) {
        iterator = new PrimitiveIterator(item);
    }

    return new RepeatIterator(iterator, count);
}

export default replicate;
