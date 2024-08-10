import{
    loginValidator,
    logout
}
from './auth.js'

import {
  renderUI
}
from './ui.js'

//Removes blinking login page on refresh
function showContent(){
    const content = document.getElementsByClassName('app');
    content.hidden.id = null;
}

if (document.readyState === 'complete') {
    showContent();
  } else {
    window.onload = showContent;
  }

// Check if user is logged in and show login page if not
document.addEventListener('DOMContentLoaded', () => {
    loginValidator();
    if (localStorage.authToken){
      renderUI();
    }
});

// Click Attachments
document.getElementById('logout-button').addEventListener('click', logout);