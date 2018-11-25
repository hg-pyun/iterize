import { expect } from 'chai';
import { range, take, cycle } from '../src';
import { iterDone, iterResult } from './utility';
import repeat from '../src/repeat';
import replicate from '../src/replicate';

describe('Test Take API', () => {
    describe('Default case', () => {
        it('range type', () => {
            const rangeIterator = range(0, 5, 2);
            const iter = take(2, rangeIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('cycle type', () => {
            const cycleIterator = cycle([1, 2, 3]);
            const iter = take(5, cycleIterator);
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(3));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('repeat type', () => {
            const repeatIterator = repeat(0);
            const iter = take(2, repeatIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('replicate type', () => {
            const rangeIterator = range(0, 5, 2);
            const replicateIterator = replicate(2, rangeIterator);
            const iter = take(4, replicateIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterDone());
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => take(5, 5).next()).to.throw('Input parameter type is wrong.');

            const cycleIterator = cycle([1, 2, 3]);
            // @ts-ignore
            expect(() => take('a', cycleIterator).next()).to.throw('Input parameter type is wrong.');
        });
    });

    describe('Default case: Compatibility with language specifications', () => {
        it('for - of', () => {
            const cycleIterator = cycle([1, 2, 3]);
            const tobe = [1, 2, 3, 1, 2];
            const result = [];
            for (let n of take(5, cycleIterator)) {
                result.push(n);
            }
            expect(result).to.deep.equal(tobe);
        });

        it('[...iterator]', () => {
            const tobe = [1, 2, 3, 1, 2];
            const cycleIterator = cycle([1, 2, 3]);
            let numbers = [...take(5, cycleIterator)];
            expect(numbers).to.deep.equal(tobe);
        });
    });
});
