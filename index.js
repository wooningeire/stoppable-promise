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

    static fromPromise(promise) {
        return new StoppablePromise((resolve, reject) => {
            promise.then(resolve, reject);
        });
    }
}

export function stoppableAsyncFunction(asyncFunction) {
    return function (...args) {
        return new StoppablePromise((resolve, reject) => {
            asyncFunction(...args).then(resolve, reject);
        });
    };
}

// todo AsyncGeneratorFunction
