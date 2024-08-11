import {
    logout
}
from './auth.js'

const API_BASE_URL = 'http://localhost:8080';

//Function to deal with errors in requests or unauthorized requests
function responseHandler(response) {
    console.log(response);
    if (response.error){
        alert(response.error);
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

export async function createDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
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

export async function deleteDirectory(path, token) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return responseHandler(await response.json());
}


// File APIs


export async function getFileContent(path, token, base64 = false) {
    let url = API_BASE_URL

    if (base64){
        url += '?format=base64'
    }

    const response = await fetch(`${url}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${token}`
        },
        
    });

    return responseHandler(response.body);
}


export async function uploadFile(file, path, token) {
    const formData = new FormData();
    formData.append('newFile', file);

    const response = await fetch(`${API_BASE_URL}${path}${file.name}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`
        },
        body: formData
    });
    return responseHandler(await response.json());
}

async function deleteFile(path, token) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return responseHandler(await response.json());
}