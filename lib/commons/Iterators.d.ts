import { IterableProtocol } from './types';
export declare class PrimitiveIterator implements IterableProtocol {
    value: number | string | Function;
    done: boolean;
    constructor(value: number | string | Function);
    [Symbol.iterator](): this;
    next(value?: any): IteratorResult<any>;
    clone(): IterableProtocol;
}
export declare class ArrayIterator implements IterableProtocol {
    arr: Array<any>;
    arrIterator: Iterator<any>;
    constructor(arr: Array<any>);
    [Symbol.iterator](): this;
    next(value?: any): IteratorResult<any>;
    clone(): IterableProtocol;
}
export declare class RepeatIterator implements IterableProtocol {
    static FOREVER: number;
    iterator: IterableProtocol;
    repeatLimit: number;
    repeatCount: number;
    constructor(iterator: IterableProtocol, repeatLimit: number);
    [Symbol.iterator](): this;
    next(value?: any): IteratorResult<any>;
    clone(): IterableProtocol;
}
export declare class RangeIterator implements IterableProtocol {
    start: number;
    end: number;
    step: Function;
    current: number;
    constructor(start: number, end: number, step: Function);
    [Symbol.iterator](): this;
    next(value?: any): IteratorResult<any>;
    hasNext(): boolean;
    clone(): IterableProtocol;
}
