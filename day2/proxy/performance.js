const mathOperations = {
    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        if (n > 2) {
            return this.factorial(n - 1)
        }
    },
    pow(base, exponent) {
        if (exponent === 0) {
            return 1
        }
        if (exponent === 1) {
            return base;
        }
        return base * this.pow(base, exponent - 1);
    },
    fibonacci(n) {
        if(n === 1) {
            return 0;
        }
        if (n === 2) {
            return 1;
        }
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
    }
}

// fibonaci(10) => 'fibonaci:10'
// pow(2, 6) => 'pow:2,6'
// pow(2, 6) => 'pow:2,6'

// '${nazwaFunkcji}:${args.join(",")'

const config = {
    cacheResults: new Map,
    get(target, prop) {
        if (typeof target[prop] === "function") {
            return (...args) => {
                const uniqueKey = `${prop}:${args.join(",")}`;
                if (this.cacheResults.has(uniqueKey)) {
                    return this.cacheResults.get(uniqueKey);
                }
                const result = target[prop](...args);
                this.cacheResults.set(uniqueKey, result);
            }
        }
        return target[prop];
    }
}
const mathOperationsProxy = new Proxy(mathOperations, config);

mathOperationsProxy.fibonacci(10);
mathOperationsProxy.fibonacci(5);
mathOperationsProxy.fibonacci(10); // CACHE
mathOperationsProxy.pow(2, 5);
mathOperationsProxy.pow(2, 5); // CACHE