//
// Zmodyfikuj Person w taki sposób gdy ten zostanie zawołany bez new, zachowa się tak jak kod new Person.
// Innymi słowy poniższe kody mają być równorzędne
//
// joseph = Person(”Joseph”, 40);
// joseph = new Person(”Joseph”, 40);
//


function Person(age, name) {
    this.age = age;
    this.name = name;
}

function SafePerson(age, name) {
    if (!new.target) {
        return new SafePerson(age, name);
    }
    this.age = age;
    this.name = name;
}

joseph = new SafePerson("Joseph", 40);
// gosia = new joseph.constructor("Gosia", 30);
gosia = SafePerson("Gosia", 30);
debugger