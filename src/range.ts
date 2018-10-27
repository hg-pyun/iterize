function* range(start: number, end: number, step: number): any {
    if (start === end) {
        throw new Error('The start and end parameter is same.');
    }

    let current = start;
    let finished: number;
    let checker: Function;

    let next = (value: number) => {
        return value + step;
    };

    if (start < end) {
        checker = (value: number) => {
            return value < finished;
        };
        finished = end - 1;
    } else {
        checker = (value: number) => {
            return value > finished;
        };
        finished = end + 1;
    }

    while (checker(current)) {
        yield current;
        current = next(current);
    }

    return current;
}

export default range;
