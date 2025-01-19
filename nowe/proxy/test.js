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
    },
}
const mathOperationsHandler = {
    cache: new Map,
    get(target, prop) {
        if (typeof target[prop] === "function") {
            return function(...args) {
                const cacheKey = `${prop}:${args.join(",")}`;
                if (mathOperationsHandler.cache.has(cacheKey)) {
                    console.log("cached");
                    return mathOperationsHandler.cache.get(cacheKey);
                }
                const funResult = target[prop](...args);
                mathOperationsHandler.cache.set(cacheKey, funResult);
                return funResult;
            }
        }
        return target[prop];
    }
};
const mapthOperationsProxy = new Proxy(mathOperations, mathOperationsHandler);

console.log(mapthOperationsProxy.fibonacci(10));
console.log(mapthOperationsProxy.fibonacci(20));
// class Person {
//     #age;
//     #name;
//     constructor(age, name) {
//         this.#age = age;
//         this.#name = name;
//     }
//     setAge(age) {
//         this.#age = age;
//     }
//     setName(name) {
//         this.#name = name;
//     }
//     present() {
//         console.log(`My name is ${this.#name} and I am ${this.#age}`);
//     }
// }

// const handler = {
//     mapper: {},
//     get(target, prop) {
//         if (typeof target[prop] === "function") {
//             this.mapper[prop] = this.mapper[prop] !== undefined ? this.mapper[prop] + 1 : 1;
//             return (...args) => {
//                 return target[prop].call(target, args);
//             }
//         }
//         return target[prop];
//     },
//     call(target, prop) {
//         debugger
//     }
// };

// p = new Proxy(new Person(43, "Joseph"), handler);
// p.setName//("Pol");
// debugger



async function produceFetchWithCacheObject(expirationTime) {
    const EXP_TIME = expirationTime;
    const cache = new Map;

    return {
        async get(url) {
            if (cache.has(url)) {
                const [result, time] = cache.get(url);
                if (Date.now() - time <= EXP_TIME) {
                    return Promise.resolve(result);
                }
            }

            const result = await fetch(url);
            cache.set(url, [result, Date.now()]);
            return result;
        },
        reset() {
            cache.clear();
        }
    }
}

const fetchWithCache = produceFetchWithCacheObject();
const result = await fetchWithCache(url); // not cached
const result2 = await fetchWithCache(url);
