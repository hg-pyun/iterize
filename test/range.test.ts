import { expect } from 'chai';
import { range } from '../src';
import { iterResult, iterDone } from './utility';

function increaseTester(start: number, end: number, step: any, iter: any) {
    let stepFunc = step;
    if (typeof step === 'number') {
        stepFunc = function(value: number) {
            return step + value;
        };
    }

    let cIter;
    for (let i = start; i < end; i = stepFunc(cIter.value)) {
        cIter = iter.next();
        expect(cIter).to.deep.equal(iterResult(i));
    }
    cIter = iter.next();
    expect(cIter).to.deep.equal(iterDone());
}

function decreaseTester(start: number, end: number, step: any, iter: any) {
    let stepFunc = step;
    if (typeof step === 'number') {
        stepFunc = function(value: number) {
            return step + value;
        };
    }

    let cIter;
    for (let i = start; i > end; i = stepFunc(cIter.value)) {
        cIter = iter.next();
        expect(cIter).to.deep.equal(iterResult(i));
    }

    cIter = iter.next();
    expect(cIter).to.deep.equal(iterDone());
}

describe('Test Range API', () => {
    describe('Default case: Step is number type', () => {
        it('increase number', () => {
            const start = 0;
            const end = 5;
            const increaseNumberOne = range(start, end, 1);
            const increaseNumberTwo = range(start, end, 2);
            const increaseNumberFour = range(start, end, 4);
            increaseTester(start, end, 1, increaseNumberOne);
            increaseTester(start, end, 2, increaseNumberTwo);
            increaseTester(start, end, 4, increaseNumberFour);
        });

        it('decrease number ', () => {
            const start = 5;
            const end = 0;
            const decreaseNumberOne = range(start, end, -1);
            const decreaseNumberTwo = range(start, end, -2);
            const decreaseNumberFour = range(start, end, -4);
            decreaseTester(start, end, -1, decreaseNumberOne);
            decreaseTester(start, end, -2, decreaseNumberTwo);
            decreaseTester(start, end, -4, decreaseNumberFour);
        });
    });

    describe('Default case: Step is function type', () => {
        it('increase number', () => {
            const start = 0;
            const end = 5;
            const increaseNumberOne = range(start, end, (x: number) => x + 1);
            const increaseNumberTwo = range(start, end, (x: number) => x + 2);
            const increaseNumberFour = range(start, end, (x: number) => x + 4);
            increaseTester(start, end, (x: number) => x + 1, increaseNumberOne);
            increaseTester(start, end, (x: number) => x + 2, increaseNumberTwo);
            increaseTester(
                start,
                end,
                (x: number) => x + 4,
                increaseNumberFour
            );
        });

        it('decrease number', () => {
            const start = 5;
            const end = 0;
            const decreaseNumberOne = range(start, end, (x: number) => x - 1);
            const decreaseNumberTwo = range(start, end, (x: number) => x - 2);
            const decreaseNumberFour = range(start, end, (x: number) => x - 4);
            decreaseTester(start, end, (x: number) => x - 1, decreaseNumberOne);
            decreaseTester(start, end, (x: number) => x - 2, decreaseNumberTwo);
            decreaseTester(
                start,
                end,
                (x: number) => x - 4,
                decreaseNumberFour
            );
        });

        it('square x^2', () => {
            const iter = range(2, 64, (x: number) => x * x);
            expect(iter.next()).to.deep.equal(iterResult(2));
            expect(iter.next()).to.deep.equal(iterResult(4));
            expect(iter.next()).to.deep.equal(iterResult(16));
            expect(iter.next()).to.deep.equal(iterDone());
        });
    });

    describe('Default case: Compatibility with language specifications', () => {
        it('for - of', () => {
            let number = 0;
            for (let n of range(0, 2, 1)) {
                expect(n).equal(number++);
            }
            expect(number).equal(2);
        });

        it('[...iterator]', () => {
            let numbers = [...range(0, 2, 1)];
            expect(numbers).to.deep.equal([0, 1]);
        });
    });

    describe('Edge case', () => {
        it('incorrect input parameter', () => {
            // @ts-ignore
            expect(() => range('a', 2, 3).next()).to.throw();
            // @ts-ignore
            expect(() => range(1, 'b', 3).next()).to.throw();
            // @ts-ignore
            expect(() => range(1, 2, '1').next()).to.throw();
        });

        it('start === end', () => {
            expect(() => range(1, 1, 3).next()).to.throw();
        });
    });
});
