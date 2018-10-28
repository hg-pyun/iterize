import { InputTypeError } from './commons/ErrorModels';

function* repeat(item: number | string): IterableIterator<any> {
    if (typeof item !== 'number' && typeof item !== 'string') {
        throw new InputTypeError();
    }

    while (true) {
        yield item;
    }
}

export default repeat;
