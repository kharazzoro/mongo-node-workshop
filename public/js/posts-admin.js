
var myButton = document.querySelector('#submitPost');
myButton.addEventListener('click', (event) => {
    event.preventDefault();
    const payload = {
        title: document.querySelector('#title').value,
        summary: document.querySelector('#summary').value,
        contents: document.querySelector('#contents').value,
        dateAdded: Date.now()
    };

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    fetch('/api/posts',  fetchOptions)
        .then((response) => response.json())
        .then((posts) => {
            alert('Post saved successfully');
            window.location.href = '/';
        }).catch(err => {
            console.error(err);
            alert('Error happened while trying to save');
        });

    return false;
});