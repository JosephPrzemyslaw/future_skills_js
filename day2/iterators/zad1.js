//
// implment an iterator that every character is printed backwards
//

const str = new String("Biuro Warszawa");

str[Symbol.iterator] = function () {
    let charIndex = this.length;
    const that = this;

    return {
        next() {
            return {
                value: that[--charIndex],
                done: charIndex < 0,
            }
        }
    }
}

for(let char of str) {
    console.log(char);
}

