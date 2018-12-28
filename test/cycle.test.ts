import {assert, expect} from 'chai';
import {cycle, range} from '../src';
import {iterResult} from './utility';
import repeat from '../src/repeat';

describe('Test Cycle API', () => {
    describe('Default case', () => {

        it('string type', () => {
            const iter = cycle('ABCD');
            expect(iter.next()).to.deep.equal(iterResult('A'));
            expect(iter.next()).to.deep.equal(iterResult('B'));
            expect(iter.next()).to.deep.equal(iterResult('C'));
            expect(iter.next()).to.deep.equal(iterResult('D'));
            expect(iter.next()).to.deep.equal(iterResult('A'));
            expect(iter.next()).to.deep.equal(iterResult('B'));
        });

        it('array type (integer)', () => {
            const iter = cycle([0, 1, 2]);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
        });

        it("array type (string)", () => {
            const iter = cycle(['a', 'b', 'c']);
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('b'));
            expect(iter.next()).to.deep.equal(iterResult('c'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('b'));
            expect(iter.next()).to.deep.equal(iterResult('c'));
        });

        it('function Type', () => {
            const iter = cycle([
                () => {
                    return 1;
                },
                () => {
                    return 2;
                },
                () => {
                    return 3;
                },
            ]);

            // Check iter.next().value equals function.
            for (let i = 0; i < 5; i++) {
                assert.isFunction(iter.next().value);
            }
        });

        it('iterator type [0, 1, 2, 3, 4] ', () => {
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

        it('iterator type [0, 2, 4] ', () => {
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
        it('illegal input parameter', () => {
            // @ts-ignore
            expect(() => cycle(1).next()).to.throw();
            // @ts-ignore
            expect(() => cycle([]).next()).to.throw();
        });

        it('illegal input repeatIterator', () => {
            expect(() => cycle(cycle([1, 2, 3]))).to.throw();
            expect(() => cycle(repeat(1, 5))).to.throw();
        });
    });
});
