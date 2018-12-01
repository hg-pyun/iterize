import { ArgumentError } from './commons/ErrorModels';
import { isIterator } from './commons/utility';
function* take(
    count: Number,
    iter: IterableIterator<any>
): IterableIterator<any> {
    if (typeof count !== 'number' || !isIterator(iter)) {
        throw new ArgumentError('Please check arguments type.');
    }

    let index = 0;
    while (index++ < count) {
        yield iter.next().value;
    }

    return;
}

export default take;
