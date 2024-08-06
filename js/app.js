import{
    loginValidator
}
from './auth.js'

// Check if user is logged in and show login page if not
document.addEventListener('DOMContentLoaded', () => {
    loginValidator();
});