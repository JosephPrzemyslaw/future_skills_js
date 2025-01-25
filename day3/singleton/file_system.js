let fileNo = 512;
let minFileSize = 1024;
function FileSystemSingleton () {
    // this = {}
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

    FileSystemSingleton.instance = this;
}

const fg1 = new FileSystemSingleton;
const fg2 = new FileSystemSingleton;
const fg3 = new FileSystemSingleton;

console.log(fg1 === fg3);