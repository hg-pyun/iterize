import { ArgumentError } from './commons/ErrorModels';
import {
    IterableProtocol,
    PrimitiveIterator,
    RepeatIterator,
} from './commons/Iterators';
import {isIterator, isRepeatIterator} from './commons/utility';

function replicate(count: number, item: number | string | IterableProtocol) {
    if (validateInputTypes(count, item)) {
        throw new ArgumentError('Please check arguments type.');
    }

    if (validateCountNumber(count)) {
        throw new ArgumentError('Replicate count must be larger than 1.');
    }

    if(isRepeatIterator(item as IterableProtocol)) {
        throw new ArgumentError('Do not use infinite type iterator.');
    }

    let iterator: any = item;
    if (!isIterator(item)) {
        iterator = new PrimitiveIterator(item);
    }

    return new RepeatIterator(iterator, count);
}

function validateInputTypes(count:number, item: any) {
    return typeof count !== 'number' || (typeof item !== 'number' && typeof item !== 'string' && !isIterator(item));
}

function validateCountNumber(count:number) {
    return count < 1;
}


export default replicate;
