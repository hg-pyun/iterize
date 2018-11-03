import { IterableProtocol } from './Iterators';
function isIterator(value: any): value is IterableProtocol {
    return value.next !== undefined && value.clone !== undefined;
}

export { isIterator };
