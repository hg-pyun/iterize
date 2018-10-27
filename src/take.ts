function* take(count: Number, iter: Generator): any {
    if (typeof count !== 'number') {
        throw new Error('Input parameter type is wrong.');
    }

    let index = 0;
    while (++index < count) {
        yield iter.next().value;
    }

    return iter.next();
}

export default take;
