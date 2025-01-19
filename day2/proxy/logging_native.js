class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;
    }

    setAge(age) {
        this.age = age;
    }

    setName(name) {
        this.name = name;
    }

    present() {
        console.log(`My name is ${this.name} and I am ${this.age}`);
    }
}

const config = {
    funNameToCounter: new Map,
    get(target, prop) {
        if (typeof target[prop] === "function") {
            const funName = prop;
            this.updateFunNameToCounter(funName);
            console.log(`Function ${funName} was called ${this.funNameToCounter.get(funName)} time(s)`);

            return (...args) => target[prop](...args);
        } else {
            return target[prop];
        }
    },
    updateFunNameToCounter(funName) {
        if (this.funNameToCounter.has(funName)) {
            this.funNameToCounter.set(funName, this.funNameToCounter.get(funName) + 1);
        } else {
            this.funNameToCounter.set(funName, 1);
        }
    }
}


const joseph = new Person(43, "Joseph");
const josephProxy = new Proxy(joseph, config);
josephProxy.setAge(30);
josephProxy.setAge(30);
josephProxy.present();
josephProxy.setAge(30);
josephProxy.setAge(30);
josephProxy.setAge(30);
josephProxy.present();
josephProxy.present();
josephProxy.age