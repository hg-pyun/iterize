function* range(start: number, end: number, step: any): any {
    if (start === end) {
        throw new Error('The start and end parameter is same.');
    }

    let current = start;
    let checker;
    let next = step;

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
