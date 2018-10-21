import {expect} from "chai";
import {range, take, cycle, replicate, repeat}from '../src/index';


describe('API', () => {
    it('range', () => {
        const iter = range(0, 5, 1);
        expect(iter.next()).to.deep.equal({value: 0, done: false});
        expect(iter.next()).to.deep.equal({value: 1, done: false});
        expect(iter.next()).to.deep.equal({value: 2, done: false});
        expect(iter.next()).to.deep.equal({value: 3, done: false});
        expect(iter.next()).to.deep.equal({value: 4, done: false});
        expect(iter.next()).to.deep.equal({value: 5, done: true});
    });
});