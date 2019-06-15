import { ArgumentError } from './commons/ErrorModels';
import { isIterator } from './commons/utility';
import { IterableProtocol } from './commons/types';

function * take (predicate: number, iter: IterableProtocol) {
    if (validateTakeInputTypes(predicate, iter)) {
        throw new ArgumentError('Please check arguments type.');
    }
    let index = 0;
    while (index++ < predicate) {
        yield iter.next().value;
    }
}

function * takeWhile(predicate: Function, iter: IterableProtocol) {
    if (validateTakeWhileInputTypes(predicate, iter)) {
        throw new ArgumentError('Please check arguments type.');
    }

    while (true) {
        const result = iter.next();

        if (result.done) {
            break;
        }

        if (predicate(result.value)) {
            yield result.value;
        }
    }
}

function validateTakeInputTypes (predicate: number | Function, iter: IterableProtocol) {
    return typeof predicate !== 'number' || !isIterator(iter);
}

function validateTakeWhileInputTypes (predicate: number | Function, iter: IterableProtocol) {
    return typeof predicate !== 'function' || !isIterator(iter);
}

export {take, takeWhile};
