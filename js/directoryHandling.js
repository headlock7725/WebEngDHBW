async function listDirectories(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return response.json();
}


async function createDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            type: 'dir'
        })
    });
    return response.json();
}

async function deleteDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`
        }
    });
    return response.json();
}

// Add more directory handling functions as needed