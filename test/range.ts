import { expect } from 'chai';
import { range } from '../src';

describe('Test Range API', () => {
    describe('default case', () => {
        it('increase number 1', () => {
            const iter = range(0, 5, 1);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: true });
        });

        it('increase number 2', () => {
            const iter = range(0, 5, 2);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: true });
        });

        it('increase number 5', () => {
            const iter = range(0, 5, 4);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: true });
        });

        it('decrease number 1', () => {
            const iter = range(5, 0, -1);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 4, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 2, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: true });
        });

        it('decrease number 2', () => {
            const iter = range(5, 0, -2);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 3, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: true });
        });

        it('decrease number 5', () => {
            const iter = range(5, 0, -4);
            expect(iter.next()).to.deep.equal({ value: 5, done: false });
            expect(iter.next()).to.deep.equal({ value: 1, done: true });
        });
    });

    describe('edge case', () => {
        // todo define exception cases
        it('Over step the range', () => {
            const iter = range(0, 1, 2);
        });
    });
});
