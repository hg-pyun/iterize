class HelloIterize {
    private hello: string;

    constructor(){
        this.hello = 'Well begun is half done';
    }

    print(): void {
        console.log(this.hello);
        console.log('test babel');
    }
}

export {HelloIterize}