//
// call stack
// 

let counter = 0;
(function test() {
    try {
        counter ++;
        test();
    } catch (err) {
        console.log("Failed for", counter);
    }
})()
