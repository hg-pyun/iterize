import { InputTypeError, ArrayEmptyError } from './commons/ErrorModels';
import * as utility from './commons/utility';

interface Indexable {
    [key: string]: any;
}

function* cycle(
    item: Array<any> | IterableIterator<any>
): IterableIterator<any> {
    const isArray: boolean = Array.isArray(item);
    const isGenerator: boolean = utility.isGenerator(item);
    let cycleItem: Indexable = item;

    if (!isArray && !isGenerator) {
        throw new InputTypeError();
    } else if (isArray && (item as Array<any>).length === 0) {
        throw new ArrayEmptyError();
    }

    if (isGenerator) {
        cycleItem = [...item];
    }

    let index = 0;
    while (true) {
        yield cycleItem[index++ % cycleItem.length];
    }
}

export default cycle;
