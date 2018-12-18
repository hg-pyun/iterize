import { assert, expect } from 'chai';
import { repeat, cycle } from '../src';
import {iterDone, iterResult} from './utility';
import range from "../src/range";

describe('Test Repeat API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = repeat(0, 5);
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterResult(0));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('string type', () => {
            const iter = repeat('a', 5);
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterResult('a'));
            expect(iter.next()).to.deep.equal(iterDone());
        });

        it('function Type', () => {
            const iter = repeat(()=>{ return 1;}, 5);

            // Check iter.next().value equals function.
            for (let i = 0; i < 5; i++) {
                assert.isFunction(iter.next().value);
            }
        });

        it('iterator type', () => {
            const rangeIterator = range(1, 5, 1);
            const iter = repeat(rangeIterator, 2);

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
            for (let n of repeat(0, 5)) {
                expect(n).equal(0);
            }
        });

        it('for - of(iterator)', () => {
            const tobe = [1, 2, 3, 4, 1, 2, 3, 4];
            const result = [];
            const rangeIterator = range(1, 5, 1);
            for (let n of repeat(rangeIterator, 2)) {
                result.push(n);
            }
            expect(result).to.deep.equal(tobe);
        });

        it('[...iterator]', () => {
            let str = [...repeat('a', 5)];
            expect(str).to.deep.equal(['a', 'a', 'a', 'a', 'a']);
        });
    });


    describe('Edge case', () => {
        it('illegal input parameter', () => {
            // @ts-ignore
            expect(() => repeat(5, ['a']).next()).to.throw();
            // @ts-ignore
            expect(() => repeat(5, 'a').next()).to.throw();
            // @ts-ignore
            expect(() => repeat(5, undefined).next()).to.throw();
            // @ts-ignore
            expect(() => repeat(5, null).next()).to.throw();
        });

        it('illegal input repeatIterator', () => {
            expect(() => repeat(cycle([1, 2, 3]), 3)).to.throw();
            expect(() => repeat(repeat(1, 5), 3)).to.throw();
        });
    });
});
