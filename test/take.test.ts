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

    describe('Default case: Compatability with language specifications', () => {
        it('for - of', () => {
            const cycleGenerator = cycle([1, 2, 3]);
            const tobe = [1, 2, 3, 1, 2];
            const result = [];
            for (let n of take(5, cycleGenerator)) {
                result.push(n);
            }
            expect(result).to.deep.equal(tobe);
        });

        it('[...iterator]', () => {
            const tobe = [1, 2, 3, 1, 2];
            const cycleGenerator = cycle([1, 2, 3]);
            let numbers = [...take(5, cycleGenerator)];
            expect(numbers).to.deep.equal(tobe);
        });
    });
});
