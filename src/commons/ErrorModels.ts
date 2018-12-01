class ArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Argument Error';
    }
}

class BehaviorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'IteratorBehavior Error';
    }
}

export {
    ArgumentError,
    BehaviorError,
};
