import { CloneableIterator } from './Iterators';

const generatorInstance = function*(): any {};
function isGenerator(param: any): boolean {
    return param.constructor === generatorInstance.prototype.constructor;
}

function isCloneableIterator(value: any): value is CloneableIterator {
    return value.clone !== undefined;
}

export { isGenerator, isCloneableIterator };
