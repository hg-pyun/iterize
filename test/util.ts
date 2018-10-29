function done(value?: any) {
    return {value: value, done: true};
}

function notDone(value: any) {
    return {value: value, done: false};
}

function* rangeGenerator(end: number) {
    let current: number = 0;
    while (current < end) {
        yield current;
    }
}

export {
    done,
    notDone,
    rangeGenerator,
}