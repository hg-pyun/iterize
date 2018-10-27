import { expect } from 'chai';
import { cycle } from '../src';

describe('Test Cycle API', () => {
    describe('Default case', () => {
        it('Array [0, 1, 2]', () => {
            const iter = cycle([0, 1, 2]);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
        });

        it("Array ['a', 'b', 'c']", () => {
            const iter = cycle(['a', 'b', 'c']);
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'b', done: false });
            expect(iter.next()).to.deep.equal({ value: 'c', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'b', done: false });
            expect(iter.next()).to.deep.equal({ value: 'c', done: false });
        });
    });

    describe('Edge case', () => {
        it('Empty parameter', () => {
            expect(() => cycle([]).next()).to.throw('Array is Empty.');
        });
    });
});
