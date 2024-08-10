import {
    logout
}
from './auth.js'

const API_BASE_URL = 'http://localhost:8080';

//Function to deal with errors in requests or unauthorized requests
function responseHandler(response) {
    console.log(response);
    if (response.error){
        if (response.error.includes("auth")){
            logout();
        }
    }
    return response
}

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

    return responseHandler(await response.json());
}

export async function deleteToken(token) {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`,
        }
    });
    return responseHandler(await response.json());
}


//Directory APIs


export async function fetchDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return responseHandler(await response.json());
}

async function createDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            type: 'dir'
        })
    });
    return responseHandler(await response.json());
}

async function deleteDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return responseHandler(await response.json());
}