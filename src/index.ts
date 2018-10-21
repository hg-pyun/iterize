function* range(start: Number, end: Number = Infinity, step: Number): any {
    let index: any;
    for (index = start; index < end; index += step) {
        yield index;
    }
    return index;
}

function* cycle(arr: Array<Number>): any {

}

function* take(count: Number, ): any {

}

function* repeat(): any {

}

function* replicate(): any {

}

export {
    range,
    cycle,
    take,
    repeat,
    replicate
}