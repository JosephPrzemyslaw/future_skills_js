//
// rewrite the below impl to use generator
//
const str = new String("Biuro Warszawa");

str[Symbol.iterator] = function* () {

    let counter = this.length;
    while(--counter >= 0) {
        yield this[counter];
    }
}

for(let char of str) {
    console.log(char);
}

