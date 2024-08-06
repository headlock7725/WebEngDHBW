async function requestToken(username, password) {
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            username: username,
            password: password
        })
    });
    return response.json();
}

async function login(username, password) {
    const result = await requestToken(username, password);
    if (result.token) {
        localStorage.setItem('authToken', result.token);
        return true;
    } else {
        console.error('Authentication failed');
        return false;
    }
}

function logout() {
    localStorage.removeItem('authToken');
    // Additional logout logic if needed
}

export function loginValidator(){
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const loginContainer = document.getElementById('login-container');
    const mainContent = document.getElementById('main-content');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const success = await login(username, password);
        if (success) {
            loginContainer.style.display = 'none';
            mainContent.style.display = 'block';
        } else {
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.style.display = 'block';
        }
    });

    // Check if the user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
        loginContainer.style.display = 'none';
        mainContent.style.display = 'block';
    }
}