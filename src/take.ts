import { InputTypeError } from './commons/ErrorModels';
import { isGenerator } from './commons/utility';

function* take(
    count: Number,
    iter: IterableIterator<any>
): IterableIterator<any> {
    if (typeof count !== 'number' || !isGenerator(iter)) {
        throw new InputTypeError();
    }

    let index = 0;
    while (index++ < count) {
        yield iter.next().value;
    }

    return;
}

export default take;
