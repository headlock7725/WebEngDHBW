async function uploadFile(file, path, token) {
    const formData = new FormData();
    formData.append('newFile', file);

    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`
        },
        body: formData
    });
    return response.json();
}

async function deleteFile(path, token) {
    const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${btoa(`admin:${token}`)}`
        }
    });
    return response.json();
}

// Add more file handling functions as needed