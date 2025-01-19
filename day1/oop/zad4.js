// Zaproponuj konstruktor dzięki któremu będziesz mógł stworzyć obiekt typu Triangle
// Udostępnij funkcje getPerimeter oraz getArea


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

const tr1 = new Triangle(3, 4, 5);
const tr2 = new Triangle(6, 8, 10);
debugger