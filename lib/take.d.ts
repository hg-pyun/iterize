import { IterableProtocol } from './commons/types';
declare function take(predicate: number | Function, iter: IterableProtocol): IterableIterator<any>;
export default take;
