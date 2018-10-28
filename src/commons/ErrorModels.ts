class ArrayEmptyError extends Error {
    constructor() {
        super('Array is Empty.');
        this.name = 'Array Error';
    }
}

class InputTypeError extends Error {
    constructor() {
        super('Input parameter type is wrong.');
        this.name = 'InputType Error';
    }
}

export { ArrayEmptyError, InputTypeError };
