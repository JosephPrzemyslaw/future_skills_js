let controller;

document.getElementById('search').addEventListener('input', event => {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;
    fetch(`https://api.github.com/search/users?q=${event.target.value}`,{ signal })
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
});

