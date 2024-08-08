import{
    requestToken,
    deleteToken
}
from './api.js'

async function login(username, password) {
    const result = await requestToken(username, password);
    if (result.token) {
        localStorage.setItem('authToken', btoa(`${username}:${result.token}`));
        localStorage.setItem('authExpire', Date.now() + 600000);
        return true;
    } else {
        console.error('Authentication failed');
        return false;
    }
}

export async function logout() {
    await deleteToken(localStorage.getItem("authToken"));
    localStorage.removeItem('authToken');
    localStorage.removeItem('authExpire')
    location.reload();
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
    else{
        loginContainer.style.display = 'block';
        mainContent.style.display = 'none';
    }

    // check if token already expired:
    const expiration = localStorage.getItem('authExpire')
    if(expiration <= Date.now() && expiration != null){
        logout();
    }
}