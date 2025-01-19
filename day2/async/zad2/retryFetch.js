
const url = "https://api.github.com/search/users?q=pol"
const wait = delay => new Promise(res => setTimeout(() => res(), delay));

async function retryFetch(url, options = {}, delay = 2000, attemptNo = 3) {
    for (let i = 0; i < attemptNo; i++) {
        try {
            return await fetch(url, options);
        } catch(err) {
            await wait(delay);
        }
    }
    throw new Error('retry fetch failed');
}

retryFetch(url)
    .then(response => response.json())
    .then(data => {
        debugger
    })
    .catch(err => {
        console.log(err.message);
    });
