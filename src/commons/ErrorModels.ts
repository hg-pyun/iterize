class InputTypeError extends Error {
    constructor() {
        super('Input parameter type is wrong.');
        this.name = 'InputType Error';
    }
}

export { InputTypeError };
