import { InputTypeError } from './commons/ErrorModels';
import { isGenerator } from './commons/utility';

function* replicate(
    count: number,
    item: number | string | IterableIterator<any>
): IterableIterator<any> {
    if (
        typeof count !== 'number' ||
        (typeof item !== 'number' &&
            typeof item !== 'string' &&
            !isGenerator(item))
    ) {
        throw new InputTypeError();
    }

    if (isGenerator(item)) {
        let spreadItem = [...(item as IterableIterator<any>)];
        let iterItem: any[] = [];

        for (let i = 0; i < count; i++) {
            iterItem = iterItem.concat(spreadItem);
        }

        let index = 0;
        let length = iterItem.length;
        while (index < length) {
            yield iterItem[index++ % iterItem.length];
        }
    } else {
        let index = 0;
        while (index++ < count) {
            yield item;
        }
    }

    return;
}

export default replicate;
