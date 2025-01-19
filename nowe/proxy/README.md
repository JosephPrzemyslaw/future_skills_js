# Zadanie [logging]
## Opis
Przygotuj klasę `PersonProxy` w celu logowania jak często funckje klasy `Proxy` są wołane.

```javascript
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
```

## Użycie
```javascript
const joseph = new PersonProxy(43, "Joseph");
joseph.setAge(40); // logs 1 invocation
joseph.setAge(30);  // logs 2 invocations
joseph.setAge(50);  // logs 3 invocations
joseph.setName("John"); // logs 1 invocation
```

<br>

# Zadanie [logging_native]
## Opis
Wykonaj powyższe zadanie korzystając z wbudowanego obiektu `Proxy`.

<br>

# Zadanie [time]
## Opis
Przygotuj klasę `PersonProxy` w celu mierzenia czasu wykonania funkcji klasy `Proxy`.

```javascript
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
```

## Użycie
```javascript
const joseph = new PersonProxy(43, "Joseph");
joseph.setAge(40); // loggs spent time
joseph.setAge(30);  // loggs spent time
joseph.setAge(50);  // loggs spent time
joseph.setName("John"); // loggs spent time
```

<br>

# Zadanie [time_native]
## Opis
Wykonaj powyższe zadanie korzystając z wbudowanego obiektu `Proxy`.

<br>

# Zadanie [validation_parsing]
## Opis
Przygotuj klasę `PersonProxy` działającą w imieniu klasy `Person`. Zaimplementuj walidację danych
- dla wieku -> <1; 120>
- dla imienia -> same litery, przynajmnije trzy znaki

Dokonaj parsowania danych tak aby wiek był ustawiany jako liczba.

```javascript
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
```

## Użycie
```javascript
const joseph = new PersonProxy(43, "Joseph");
joseph.setAge(40);
joseph.setAge("42");
joseph.setName("John");
```

<br>

# Zadanie [validation_parsing_native]
## Opis
Wykonaj powyższe zadanie korzystając z wbudowanego obiektu `Proxy`.

<br>

# Zadanie [performance]
## Opis
Zaimplementuj proxy dla klasy `Math` tak aby cachować wyniki obliczeń funkcji. Posłuż się natywnym obiektem `Proxy`.

```javascript
const mapthOperations = {
    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        if (n > 2) {
            return this.factorial(n - 1)
        }
    }
    pow(base, exponent) {
        if (exponent === 0) {
            return 1
        }
        if (exponent === 1) {
            return base;
        }
        return base * this.pow(base, exponent - 1);
    }

    fibonacci(n) {
        if(n === 1) {
            return 0;
        }
        if (n === 2) {
            return 1;
        }
        return this.fobonacci(n - 1) + this.fibonacci(n - 2);
    }
}
```

## Użycie
```javascript
mathOpsProxy.factorial(10); // not cached yet
mathOpsProxy.factorial(10); // already cached, result taken from cache
```

<br>

