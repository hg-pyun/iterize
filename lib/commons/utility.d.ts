import { IterableProtocol } from './types';
declare function isIterator(value: any): value is IterableProtocol;
declare function isRepeatIterator(iterator: IterableProtocol): boolean;
export { isIterator, isRepeatIterator };
