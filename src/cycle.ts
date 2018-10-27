function* cycle(arr: Array<any>): any {
    if (arr.length === 0) throw new Error('Array is Empty.');

    let index = 0;

    while (true) {
        yield arr[index++ % arr.length];
    }
}

export default cycle;
