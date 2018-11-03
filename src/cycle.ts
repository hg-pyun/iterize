import { InputTypeError, EmptyArrayError } from './commons/ErrorModels';
import {
    IterableProtocol,
    ArrayIterator,
    RepeatIterator,
} from './commons/Iterators';
import { isIterator } from './commons/utility';

function cycle(item: Array<any> | IterableProtocol): IterableProtocol {
    if (!Array.isArray(item) && !isIterator(item)) {
        throw new InputTypeError();
    }
    if (Array.isArray(item) && (item as Array<any>).length === 0) {
        throw new EmptyArrayError();
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
