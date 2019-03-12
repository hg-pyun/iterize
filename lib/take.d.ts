import { IterableProtocol } from './commons/Iterators';
declare function take(predicate: number | Function, iter: IterableProtocol): IterableIterator<any>;
export default take;
