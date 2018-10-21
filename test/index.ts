import {expect} from 'chai';
import {range, take, cycle, replicate, repeat} from '../src';


describe('API', () => {
    it('range increase number 1', () => {
        const iter = range(0, 5, 1);
        expect(iter.next()).to.deep.equal({value: 0, done: false});
        expect(iter.next()).to.deep.equal({value: 1, done: false});
        expect(iter.next()).to.deep.equal({value: 2, done: false});
        expect(iter.next()).to.deep.equal({value: 3, done: false});
        expect(iter.next()).to.deep.equal({value: 4, done: false});
        expect(iter.next()).to.deep.equal({value: 5, done: true});
    });

    it('range increase number 2', () => {
        const iter = range(0, 5, 2);
        expect(iter.next()).to.deep.equal({value: 0, done: false});
        expect(iter.next()).to.deep.equal({value: 2, done: false});
        expect(iter.next()).to.deep.equal({value: 4, done: true});
    });

    it('range increase number 5', () => {
        const iter = range(0, 5, 5);
        expect(iter.next()).to.deep.equal({value: 0, done: false});
        expect(iter.next()).to.deep.equal({value: 5, done: true});
    });
});