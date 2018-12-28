import {expect} from 'chai';
import {range, take, cycle, repeat} from '../src';
import {iterDone, iterResult} from './utility';

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
            const repeatIterator = repeat(0, 2);
            const iter = take(2, repeatIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterDone());
        });
    });

    describe('takewhile', () => {
        it('range type', () => {
            const rangeIterator = range(5);
            const iter = take((x: any) => x < 3, rangeIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('cycle type', () => {
            const cycleIterator = cycle([1, 2, 3]);
            const iter = take((x: any) => x === 1, cycleIterator);
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(1));
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

    describe('Edge case', () => {
        it('illegal input parameter', () => {
            // @ts-ignore
            expect(() => take(5, 5).next()).to.throw();

            // @ts-ignore
            expect(() => take('a', cycle([1, 2, 3])).next()).to.throw();
        });
    });
});
