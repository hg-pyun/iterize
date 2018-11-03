class EmptyArrayError extends Error {
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

class IllegalArgumentError extends Error {
    constructor(message: string) {
        super('Argument is illegal\n' + message);
        this.name = 'IllegalArgument Error';
    }
}

class IllegalIteratorBehaviorError extends Error {
    constructor(message: string) {
        super('Behavior of iterator is illegal\n' + message);
        this.name = 'IllegalIteratorBehavior Error';
    }
}

export {
    EmptyArrayError,
    InputTypeError,
    IllegalArgumentError,
    IllegalIteratorBehaviorError,
};
