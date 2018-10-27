function* replicate(count: number, item: number | string): Generator {
    if (
        typeof count !== 'number' ||
        (typeof item !== 'number' && typeof item !== 'string')
    ) {
        throw new Error('Input parameter type is wrong.');
    }

    let index = 0;

    while (++index < count) {
        yield item;
    }

    return item;
}

export default replicate;
