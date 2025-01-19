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
    constructor(age, name) {
        this.#person = new Person(age, name);
    }

    setAge(age) {
        if (age > 0 && age < 120) {
            this.#person.setAge(age);
        } else {
            throw new Error("Enter value from the desired range");
        }
    }

    setName(name) {
        if (/^[a-zA-Z]{3,}$/.test(name)) {
            this.#person.setName(name);
        } else {
            throw new Error("Name should conain at least three characters (not numbers)");
        }
    }

    present() {
        this.#person.present();
    }
}

const joseph = new PersonProxy(43, "Joseph");
joseph.present();
joseph.present();
joseph.present();
joseph.setName("Przemek");
joseph.setName("Karina");
joseph.setAge(50);
