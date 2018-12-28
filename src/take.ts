import { ArgumentError } from './commons/ErrorModels';
import { isIterator } from './commons/utility';
import { IterableProtocol } from './commons/Iterators';

function * take (taker: number | Function, iter: IterableProtocol) {
    if (validateInputTypes(taker, iter)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (typeof taker === 'number') {
        let index = 0;
        while (index++ < taker) {
            yield iter.next().value;
        }
    } else {
        while (true) {
            const result = iter.next();

            if (result.done) {
                break;
            }

            if (taker(result.value)) {
                yield result.value;
            }
        }
    }
}

function validateInputTypes (taker: number | Function, iter: IterableProtocol) {
    return (
        (typeof taker !== 'number' && typeof taker !== 'function') ||
        !isIterator(iter)
    );
}

export default take;
