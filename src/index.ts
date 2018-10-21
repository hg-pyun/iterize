function* range(start: Number, end: Number = Infinity, step: Number): any {
    let index: any = start;

    while(index < end) {
        if(index + step > end) {
            break;
        }

        yield index;
        index += step;
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