function* repeat(item: number | string): Generator {
    if (typeof item !== 'number' && typeof item !== 'string') {
        throw new Error('Input parameter type is wrong.');
    }

    while (true) {
        yield item;
    }
}

export default repeat;
