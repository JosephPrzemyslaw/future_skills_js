# Zadanie
## Opis
Poniższy kod stara się implementować singleton ale nie jest kompletny. Pokaż jak można utworzyć wiele obiektów People

```js
const People = {
    #names: [],
    #ages: [],
    add(person) {
        this.#names.push(person.name);
        this.#ages.push(person.age);
    },
    print() {
        for (let i = 0; i < names.length; i ++) {
            console.log(names[i], ages[i]);
        }
    }
};

export default new People;
```

<br>

# Zadanie
## Opis
Uzupełnij implementację tak aby konstruktor implementował `singleton`

```javascript
let fileNo = 512;
let minFileSize = 1024;
function FileSystemSingleton () {
    if(typeof FileSystemSingleton.instance === "object") {
        return FileSystemSingleton.instance;
    }
    this.getFileNo = function () {
        return fileNo;
    }
    this.setFileNo = function (newFileNo) {
        fileNo = newFileNo;
    }
    this.getMinFileSize = function () {
        return minFileSize;
    }
    this.setMinFileSize = function (newMinFileSize) {
        minFileSize = newMinFileSize;
    }
    // ...
    // Jaka jest brakująca linia ponizej ?
    // ???
}
```

<br>

# Zadanie [config]
## Opis
Uzupełnij implementację singletona

```javascript
let instance;

class Config {
    #cfg;
    constructor() {
        if (instance) {
            // ???
        }
        this.#setContent();
        // ???
    }
    #setContent() {
        // config can be download from Internet
        // or taken from a file system
        // it is hardcoded here for demo purposes
        this.#cfg = {
            memory: 1024 * 1024 * 10, // 10 MB
            standalone: true,
            ui: {
                homeScreen: {
                    numberOfIcons: 4,
                },
                goodbyeScreen: {
                    msg: "Thank you for using our services. See you soon !",
                },
            },
        };
    }
    getContent() {
        return this.#cfg;
    }
    //...
};
// ???
export default cfg;
```