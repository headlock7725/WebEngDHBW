const API_BASE_URL = 'http://localhost:8080';

export async function requestToken(username, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });
    return response.json();
}

export async function deleteToken(token) {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.json();
}

async function fetchDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`
        }
    });
    return response.json();
}

async function fetchFile(path, token, format = '') {
    const response = await fetch(`${API_BASE_URL}/${path}?format=${format}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`
        }
    });
    return response.json();
}

// Add more API functions as needed