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

export default range;