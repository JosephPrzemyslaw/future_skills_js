const pr1 = new Promise(res => setTimeout(() => res("done 1 "), 1000));
const pr2 = new Promise(res => setTimeout(() => res("done 2"), 3000));
Promise
    .all([pr1, pr2])
    .then(data => {
        debugger
    })
    .catch(err => {
        debugger
    });

