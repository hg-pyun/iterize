function* range(start: Number, end: Number, step: Number): any {
    let n = 0;
    for (let i:any = start; i < end; i += step) {
        n++;
        yield i;
    }
    return n;
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