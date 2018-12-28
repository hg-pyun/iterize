import { ArgumentError } from './commons/ErrorModels';
import { isIterator } from './commons/utility';
import { IterableProtocol } from './commons/Iterators';

function * take (predicate: number | Function, iter: IterableProtocol) {
    if (validateInputTypes(predicate, iter)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (typeof predicate === 'number') {
        let index = 0;
        while (index++ < predicate) {
            yield iter.next().value;
        }
    } else {
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
}

function validateInputTypes (predicate: number | Function, iter: IterableProtocol) {
    return (
        (typeof predicate !== 'number' && typeof predicate !== 'function') ||
        !isIterator(iter)
    );
}

export default take;
