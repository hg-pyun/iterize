function* range(start: number, end: number, step: number | Function): any {
    if (start === end) {
        throw new Error('The start and end parameter is same.');
    } else if (typeof start !== 'number' || typeof end !== 'number') {
        throw new Error('Input parameter type is wrong.');
    } else if (typeof step !== 'number' && typeof step !== 'function') {
        throw new Error('Step type is wrong.');
    }

    let current = start;
    let checker;
    let next: any = step;

    if (typeof step === 'number') {
        next = (value: number) => {
            return value + step;
        };
    }

    if (start < end) {
        checker = (value: number) => {
            return next(value) < end;
        };
    } else {
        checker = (value: number) => {
            return next(value) > end;
        };
    }

    while (checker(current)) {
        yield current;
        current = next(current);
    }

    return current;
}

export default range;
