import { expect } from 'chai';
import { take, cycle } from '../src';

describe('Test Take API', () => {
    describe('Default case', () => {
        it('cycle type', () => {
            const cycleGenerator = cycle([1, 2, 3]);
            const iter = take(5, cycleGenerator);
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => take(5, 5).next()).to.throw(
                'Input parameter type is wrong.'
            );

            const cycleGenerator = cycle([1, 2, 3]);
            // @ts-ignore
            expect(() => take('a', cycleGenerator).next()).to.throw(
                'Input parameter type is wrong.'
            );
        });
    });
});
