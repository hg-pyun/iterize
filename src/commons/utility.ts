import { CloneableIterator } from './Iterators';
function isCloneableIterator(value: any): value is CloneableIterator {
    return value.clone !== undefined;
}

export { isCloneableIterator };
