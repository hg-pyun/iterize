function* range(start: Number, end: Number, step: any): any {
    let index: any = start;

    if(index < end) {
        while(index < end) {
            if(index + step > end) {
                break;
            }

            yield index;
            index += step;
        }

        return index;
    }
    else {
        while(index > end) {
            if(index - step < end) {
                break;
            }

            yield index;
            index -= step;
        }

        return index;
    }
}

export default range;