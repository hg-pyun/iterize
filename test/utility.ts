export function iterResult(value: any) {
    return {
        value: value,
        done: false,
    };
}

export function iterDone() {
    return {
        value: undefined,
        done: true,
    };
}
