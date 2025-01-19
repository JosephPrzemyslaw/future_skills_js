//
// implment an iterator that every word is printed not characters
//

const str = new String("Pies Kot");

str[Symbol.iterator] = function () {
    const words = this.split(" ");
    let wordIndex = 0;

    return {
        next() {
            return {
                value: words[wordIndex ++],
                done: wordIndex > words.length,
            }
        }
    }
}

for(let char of str) {
    console.log(char);
}

