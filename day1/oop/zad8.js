// 
// Zaimplementuj deep freeze dla obiektów
// 

class Hobby {
    constructor(...hobbies) {
        this.hobbies = hobbies;
    }
}

const joseph = {
    name: "Joseph",
    age: 40,
    contact: {
        street: "Poziomkowa",
        number: 5,
        phone: {
            home: "123456789",
            mobile: "987654321",
        },
    },
    fun: () => console.log("Hello"),
    hobby: new Hobby("fishing", "swimming"),
};

function deepFreeze(obj) {
    Object.freeze(obj); // shallow

    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            deepFreeze(obj[prop]); // recursive
        }
    })
}

deepFreeze(joseph);

joseph.contact.street = "Kwiatowa";
joseph.contact.phone = "000000000";
joseph.fun = () => console.log("Goodbye");
// joseph.hobby.hobbies.push("running");
joseph.hobby.hobbies[0] = "running";

console.log(joseph);
joseph.fun();
debugger