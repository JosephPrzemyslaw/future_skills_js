let instance;

class Config {
    #cfg;
    constructor() {
        if (instance) {
            console.log("Returned the already created instance");
            return instance;
        }
        this.#setContent();
        //..
        instance = this;
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

export default new Config;

// w innym pliku

// const cfg1 = new Config
// const cfg2 = new Config
// console.log(cfg1 === cfg2);