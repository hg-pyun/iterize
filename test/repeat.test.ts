import { assert, expect } from 'chai';
import { repeat, cycle, replicate } from '../src';
import { iterResult } from './utility';

describe('Test Repeat API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = repeat(0);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
        });

        it('string type', () => {
            const iter = repeat('a');
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
        });

        it('function Type', () => {
            const iter = repeat(() => {
                return 1;
            });

            // Check iter.next().value equals function.
            for (let i = 0; i < 5; i++) {
                assert.isFunction(iter.next().value);
            }
        });
    });

    describe('Default case: Compatibility with language specifications', () => {
        it('for - of', () => {
            let count = 0;
            for (let n of repeat('a')) {
                if (count === 10) {
                    break;
                }
                expect(n).equal('a');
                count++;
            }
        });
    });

    describe('Edge case', () => {
        it('illegal input parameter', () => {
            // @ts-ignore
            expect(() => repeat(['a']).next()).to.throw();
        });

        it('illegal input repeatIterator', () => {
            expect(() => repeat(cycle([1, 2, 3])).next()).to.throw();
            expect(() => repeat(repeat(1)).next()).to.throw();
            expect(() => repeat(replicate(3, '1')).next()).to.throw();
        });
    });
});
