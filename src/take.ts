import { ArgumentError } from './commons/ErrorModels';
import { isIterator } from './commons/utility';
function* take(
    count: number,
    iter: IterableIterator<any>
): IterableIterator<any> {
    if (validateInputTypes(count, iter)) {
        throw new ArgumentError('Please check arguments type.');
    }

    let index = 0;
    while (index++ < count) {
        yield iter.next().value;
    }

    return;
}

function validateInputTypes(count:number, iter: any) {
    return typeof count !== 'number' || !isIterator(iter)
}

export default take;
