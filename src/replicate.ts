import { InputTypeError, IllegalArgumentError } from './commons/ErrorModels';
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
        throw new InputTypeError();
    }

    if (count < 1) {
        throw new IllegalArgumentError('replicate count must be larger than 1');
    }

    let iterator: any = item;
    if (!isIterator(item)) {
        iterator = new PrimitiveIterator(item);
    }

    return new RepeatIterator(iterator, count);
}

export default replicate;
