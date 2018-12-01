import { assert, expect } from 'chai';
import { replicate, range } from '../src';
import { iterResult, iterDone } from './utility';

describe('Test Replicate API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = replicate(5, 0);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('string type', () => {
            const iter = replicate(5, 'a');
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('function Type', () => {
            const iter = replicate(5, ()=>{ return 1;});

            // Check iter.next().value equals function.
            for (let i = 0; i < 5; i++) {
                assert.isFunction(iter.next().value);
            }
        });

        it('iterator type', () => {
            const rangeIterator = range(1, 5, 1);
            const iter = replicate(2, rangeIterator);

            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(3));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterResult(1));
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(3));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterDone());
        });
    });

    describe('Default case: Compatibility with language specifications', () => {
        it('for - of(default)', () => {
            for (let n of replicate(5, 0)) {
                expect(n).equal(0);
            }
        });

        it('for - of(generator)', () => {
            const tobe = [1, 2, 3, 4, 1, 2, 3, 4];
            const result = [];
            const rangeIterator = range(1, 5, 1);
            for (let n of replicate(2, rangeIterator)) {
                result.push(n);
            }
            expect(result).to.deep.equal(tobe);
        });

        it('[...iterator]', () => {
            let str = [...replicate(5, 'a')];
            expect(str).to.deep.equal(['a', 'a', 'a', 'a', 'a']);
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => replicate(5, ['a']).next()).to.throw();
            // @ts-ignore
            expect(() => replicate('a', 10).next()).to.throw();
        });
    });
});
