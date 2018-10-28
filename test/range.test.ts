import { expect } from 'chai';
import { range } from '../src';

describe('Test Range API', () => {
    describe('Default case: Step is number type', () => {
        it('increase number 1', () => {
            const iter = range(0, 5, 1);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('increase number 2', () => {
            const iter = range(0, 5, 2);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('increase number 5', () => {
            const iter = range(0, 5, 4);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('decrease number 1', () => {
            const iter = range(5, 0, -1);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('decrease number 2', () => {
            const iter = range(5, 0, -2);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('decrease number 5', () => {
            const iter = range(5, 0, -4);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });
    });

    describe('Default case: Step is Function type', () => {
        it('increase number 1', () => {
            const iter = range(0, 5, (x: number) => x + 1);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('decrease number 1', () => {
            const iter = range(5, 0, (x: number) => x - 1);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });

        it('square x^2', () => {
            const iter = range(2, 64, (x: number) => x * x);
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 16, done: false });
            expect(iter.next()).to.deep.equal({ value: undefined, done: true });
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => range('a', 2, 3).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => range(1, 'b', 3).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => range(1, 2, '1').next()).to.throw(
                'Input parameter type is wrong.'
            );
        });

        it('start === end', () => {
            expect(() => range(1, 1, 3).next()).to.throw(
                'The start and end parameter is same.'
            );
        });
    });
});
