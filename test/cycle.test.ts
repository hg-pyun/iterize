import { expect } from 'chai';
import { range, cycle } from '../src';
import { iterResult } from './utility';

describe('Test Cycle API', () => {
    describe('Default case', () => {
        it('array type [0, 1, 2]', () => {
            const iter = cycle([0, 1, 2]);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
        });

        it("array type ['a', 'b', 'c']", () => {
            const iter = cycle(['a', 'b', 'c']);
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('b'));
            expect(iter.next()).to.deep.equal(iterResult('c'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('b'));
            expect(iter.next()).to.deep.equal(iterResult('c'));
        });

        it('generator type [0, 1, 2, 3, 4] ', () => {
            const rangeIterator = range(0, 5, 1);
            const iter = cycle(rangeIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(3));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
        });

        it('generator type [0, 2, 4] ', () => {
            const rangeIterator = range(0, 5, 2);
            const iter = cycle(rangeIterator);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterResult(0));
        });
    });

    describe('Default case: Compatibility with language specifications', () => {
        it('for - of (default)', () => {
            let count = 0;
            const tobe = [0, 1, 2, 0, 1, 2];
            const result = [];
            for (let n of cycle([0, 1, 2])) {
                if (count === 6) {
                    break;
                }
                result.push(n);
                count++;
            }
            expect(result).to.deep.equal(tobe);
        });

        it('for - of (generator)', () => {
            let count = 0;
            const tobe = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
            const result = [];
            const rangeIterator = range(0, 5, 1);
            for (let n of cycle(rangeIterator)) {
                if (count === 10) {
                    break;
                }
                result.push(n);
                count++;
            }
            expect(result).to.deep.equal(tobe);
        });
    });

    describe('Edge case', () => {
        it('empty parameter', () => {
            // @ts-ignore
            expect(() => cycle(1).next()).to.throw();
            // @ts-ignore
            expect(() => cycle('a').next()).to.throw();
            expect(() => cycle([]).next()).to.throw();
        });
    });
});
