export interface IterableProtocol extends IterableIterator<any> {
    // this method should clone the initial state of iterator
    clone(): IterableProtocol;
}