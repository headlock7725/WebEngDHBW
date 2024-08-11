import{
    loginValidator,
    logout
}
from './auth.js'

import{
  createDirectory,
  deleteDirectory,
  uploadFile
}
from './api.js'

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

  const popups = Array.from(document.getElementsByClassName('popups'));

  popups.forEach(child => {
    child.style.display = 'none';
  });
});

// Click Attachments
document.getElementById('logout-button').addEventListener('click', logout);
document.getElementById('add_diraction').addEventListener('click', function (event){
  let addDirPopup = document.getElementById('dir_popup');
  addDirPopup.style.display = 'block';
});

document.getElementById('upload_diraction').addEventListener('click', function (event){
  let upload_popup = document.getElementById('upload_popup');
  upload_popup.style.display = 'block';
});

document.getElementById('remove_diraction').addEventListener('click', function (event){
  deleteDirectory(localStorage.currentDir, localStorage.authToken);

  if (localStorage.currentDir != '/'){
    let path = localStorage.currentDir

    // Ensure the path ends with a slash
    if (path[path.length - 1] !== '/') {
        path += '/';
    }
    path = path.slice(0, -1); // remove last slash
    const lastSlashIndex = path.lastIndexOf('/');
    const newPath = path.substring(0, lastSlashIndex + 1);

    localStorage.setItem('currentDir', newPath);
}
});


//popupHandling
const add_dir_form = document.getElementById('add_dir_form');
const upload_form = document.getElementById('upload_form');

add_dir_form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dirname = document.getElementById('dirname').value.replace("/", '');
  console.log(dirname);
  createDirectory(`${localStorage.currentDir}${dirname}`, localStorage.authToken);
});

upload_form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const file = document.getElementById('upload_file').files[0];
  console.log(file);
  uploadFile(file, localStorage.currentDir, localStorage.authToken);
});