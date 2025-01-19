//
// zaimplementuj fs.readFile korzystając z Promise
//

import {readFile} from "fs";

function readFilePromise(filePath, encoding) {
    return new Promise((res, rej) => {
        const handleReadFile = (err, data) => {
            err ? rej(err.message) : res(data);
        }

        readFile(filePath, { encoding }, handleReadFile);
    });
}

readFilePromise("/Users/pmackowiak/Desktop/szkdfolenie/test.js", "utf-8")
    .then(console.log)
    .catch(console.error);
