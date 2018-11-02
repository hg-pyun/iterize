import { expect } from 'chai';
import { repeat } from '../src';

describe('Test Repeat API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = repeat(0);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
        });

        it('string type', () => {
            const iter = repeat('a');
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => repeat(['a']).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => repeat(() => 1).next()).to.throw(
                'Input parameter type is wrong.'
            );
        });
    });

    describe('Default case: Compatability with language specifications', () => {
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
});
