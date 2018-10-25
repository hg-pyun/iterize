import { expect } from 'chai';
import { cycle } from '../src';

describe('Test Cycle API', () => {
    describe('default case', () => {
        it('Array [0, 1, 2]', () => {
            const iter = cycle([0, 1, 2]);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
        });
    });

    describe('edge case', () => {
        // todo define exception cases
        it('Over step the cycle', () => {});
    });
});
