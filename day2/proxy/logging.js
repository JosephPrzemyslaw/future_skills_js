class Person {
    #age;
    #name;
    constructor(age, name) {
        this.#age = age;
        this.#name = name;
    }

    setAge(age) {
        this.#age = age;
    }

    setName(name) {
        this.#name = name;
    }

    present() {
        console.log(`My name is ${this.#name} and I am ${this.#age}`);
    }
}

class PersonProxy {
    #person;
    #funNameToCounter = new Map;
    constructor(age, name) {
        this.#person = new Person(age, name);
    }

    setAge(age) {
        this.#person.setAge(age);
        this.#updateFunNameToCounter("setAge");
        console.log(`Function setAge was called ${this.#funNameToCounter.get("setAge")} time(s)`);
    }

    setName(name) {
        this.#person.setName(name);
        this.#updateFunNameToCounter("setName");
        console.log(`Function setName was called ${this.#funNameToCounter.get("setName")} time(s)`);
    }

    present() {
        this.#person.present();
        this.#updateFunNameToCounter("present");
        console.log(`Function present was called ${this.#funNameToCounter.get("present")} time(s)`);
    }

    #updateFunNameToCounter(funName) {
        if (this.#funNameToCounter.has(funName)) {
            this.#funNameToCounter.set(funName, this.#funNameToCounter.get(funName) + 1);
        } else {
            this.#funNameToCounter.set(funName, 1);
        }
    }
}

const joseph = new PersonProxy(43, "Joseph");
joseph.present();
joseph.present();
joseph.present();
joseph.setName("Przemek");
joseph.setName("Karina");
joseph.setAge(50);
