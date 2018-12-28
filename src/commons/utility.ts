import {IterableProtocol, RepeatIterator} from './Iterators';

function isIterator(value: any): value is IterableProtocol {
    return value.next !== undefined && value.clone !== undefined;
}

function isRepeatIterator(iterator: IterableProtocol) {
    return iterator instanceof RepeatIterator;
}

export {isIterator, isRepeatIterator};
