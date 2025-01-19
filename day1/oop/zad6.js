//
// Przepisz kod Triangle przy użyciu class (nie używaj domknięć). Dodaj statyczną funkcję getType zwracającą “triangle”
//

function Triangle(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
}

Triangle.prototype.getPerimeter = function() {
    return this.a + this.b + this.c;
};

Triangle.prototype.getArea = function() {
    const p = this.getPerimeter() / 2;
    return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
};

// 
class Triangle_ {
    #a;
    #b;
    #c;
    constructor(a, b, c) {
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }
    getPerimeter() {
        return this.#a + this.#b + this.#c;
    }
    getArea () {
        const p = this.getPerimeter() / 2;
        return Math.sqrt(p * (p - this.#a) * (p - this.#b) * (p - this.#c));
    };
}

const tr1 = new Triangle_(3, 4, 5);
debugger