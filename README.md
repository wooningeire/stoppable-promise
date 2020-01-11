# stoppable-promise

JavaScript promises, except they can be stopped externally.

`index.js` exports two objects:
* **`StoppablePromise`**, a class that extends `Promise` and can be stopped prematurely by calling `resolve` or `reject` on the object.
* **`stoppableAsyncFunction`**, a function that takes an `AsyncFunction` and wraps it into a function that returns a `StoppablePromise` that resolves automatically when the AsyncFunction resolves.

## Samples

```js
(async () => {
    function wait(ms) {
        return new StoppablePromise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    {
        await wait(3000);
        console.log(1); // printed after 3 seconds
    }

    {
        const promise = wait(3000);
        promise.resolve();

        await promise;
        console.log(2); // printed ASAP
    }

    const f = stoppableAsyncFunction(async ms => {
        await wait(ms);
        return 3;
    });

    {
        console.log(await f(3000)); // prints "3" after 3 seconds
    }

    {
        const promise = f(3000);
        promise.resolve(4);

        console.log(await promise); // prints "4" ASAP
    }

    {
        const promise = f(10000);

        (async () => {
            await wait(3000);
            promise.resolve(5);
        })();

        console.log(await promise); // prints "5" after 3 seconds
    }
})();
```
