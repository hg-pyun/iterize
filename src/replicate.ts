import { InputTypeError, IllegalArgumentError } from './commons/ErrorModels';
import {
    CloneableIterator,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';

function replicate(count: number, item: number | string) {
    if (
        typeof count !== 'number' ||
        (typeof item !== 'number' && typeof item !== 'string')
    ) {
        throw new InputTypeError();
    }

    if (count < 1) {
        throw new IllegalArgumentError('replicate count must be larger than 1');
    }

    let iterator: CloneableIterator = new PrimitiveIterator(item);

    return new RepeatIterator(iterator, count);
}

export default replicate;
