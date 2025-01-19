
function debounce(cb, delay) {
    let timeoutId;
    return function (...args) { // konwersja na tablicę
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
         timeoutId = setTimeout(() => cb(...args), delay); // konwersję na parametry po przecinku
    }
}

const handleInputChange = event => {
    fetch(`https://api.github.com/search/users?q=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '';

            data.items.forEach(user => {
                const div = document.createElement('div');
                div.innerHTML = user.login;
                results.appendChild(div);
            });
        })
        .catch(err => console.error("Fetch canceled", err));
}
const handleInputChangeDebounced = debounce(handleInputChange, 500);

document.getElementById('search').addEventListener('input', handleInputChangeDebounced);
