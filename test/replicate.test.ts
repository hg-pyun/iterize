import { expect } from 'chai';
import { replicate } from '../src';

describe('Test Replicate API', () => {
    describe('Default case', () => {
        it('number type', () => {
            const iter = replicate(5, 0);
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: false });
            expect(iter.next()).to.deep.equal({ value: 0, done: true });
        });

        it('string type', () => {
            const iter = replicate(5, 'a');
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: false });
            expect(iter.next()).to.deep.equal({ value: 'a', done: true });
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => replicate(5, ['a']).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => replicate(5, () => 1).next()).to.throw(
                'Input parameter type is wrong.'
            );
            // @ts-ignore
            expect(() => replicate('a', 10).next()).to.throw(
                'Input parameter type is wrong.'
            );
        });
    });
});
