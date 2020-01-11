export class StoppablePromise extends Promise {
    constructor(resolver) {
        let res;
        let rej;

        super((resolve, reject) => {
            res = resolve;
            rej = reject;

            resolver(resolve, reject);
        });

        this.resolve = res;
        this.reject = rej;
    }
}

// todo AsyncFunction and AsyncGeneratorFunction
