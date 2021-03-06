import {RepeatIterator} from './Iterators';
import { IterableProtocol } from './types';

function isIterator(value: any): value is IterableProtocol {
    return value.next !== undefined && value.clone !== undefined;
}

function isRepeatIterator(iterator: IterableProtocol) {
    return iterator instanceof RepeatIterator;
}

export {isIterator, isRepeatIterator};
