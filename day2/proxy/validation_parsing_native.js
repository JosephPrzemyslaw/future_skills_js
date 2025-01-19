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
    get(target, prop) {
        if (typeof target[prop] === "function") {
            return (...args) =>  {
                switch(prop) {
                    case "setAge":
                        const passsedAge = args[0];
                        if (passsedAge > 0 && passsedAge < 120) {
                            return target[prop](...args);
                        } else {
                            console.error("Age not set")
                        }
                        break;
                    case "setName":
                        const passsedName = args[0];
                        if (/^[a-zA-Z]{3,}$/.test(passsedName)) {
                            return target[prop](...args);
                        } else {
                            console.error("Name not set")   
                        }
                        break;
                    default:
                        return target[prop](...args);
                }
            }
        } else {
            return target[prop];
        }
    },
}


const joseph = new Person(43, "Joseph");
const josephProxy = new Proxy(joseph, config);
josephProxy.setAge(30);
josephProxy.present();
josephProxy.setAge(300);
josephProxy.present();
