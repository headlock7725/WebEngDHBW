import{
    fetchDirectory
}
from './api.js'


export function renderUI(){
    resetUI();
    if (localStorage.currentDir){
        renderDirectoryView(localStorage.currentDir);
    }
    else{
        localStorage.setItem('currentDir', '/');
        renderDirectoryView('');
    }
}

function resetUI(){
    const dirList = document.getElementById("browser_dir_list");
    const resetButton = document.getElementById("return");
    const childrenToRemove = dirList.querySelectorAll('.browser_action:not(#return)');

    //replace return item to remove all event listeners
    const resetButtonClone = resetButton.cloneNode(true);
    resetButton.parentNode.replaceChild(resetButtonClone, resetButton);

    childrenToRemove.forEach(child => {
        console.log(child);
        dirList.removeChild(child.parentElement);
      });
}

function buildDirectoryElement(type, name){
    let iconFilename = 'document.png';

    if (type.includes('audio')){
        iconFilename = 'music-player.png';
    }
    else if (type === 'dir'){
        iconFilename = 'folder-icon.png';
    }
    else if (type.includes('image')){
        iconFilename = 'image.png';
    }
    else if (type.includes('video')){
        iconFilename = 'video-camera.png';
    }

    let hrefWrapper = document.createElement("a");
    hrefWrapper.href = '#';
    hrefWrapper.id = `${type}:${name}`;
    hrefWrapper.className = 'browser_action';

    let fileImage = document.createElement("img");

    fileImage.src = `./assets/icons/${iconFilename}`;
    fileImage.height = '15';
    fileImage.width = '15';

    let textWrapper = document.createElement("span");
    textWrapper.textContent = " " + name

    let newElement = document.createElement("li");

    hrefWrapper.appendChild(fileImage);
    hrefWrapper.appendChild(textWrapper);
    newElement.appendChild(hrefWrapper);

    return newElement;
}

async function renderDirectoryView(directory) {
    const files = await fetchDirectory(directory, localStorage.getItem("authToken"));
    const dirList = document.getElementById("browser_dir_list");

    files.forEach(file => {
        dirList.appendChild(buildDirectoryElement(file.Type, file.Name));
    });

    const dirs = Array.from(document.getElementsByClassName("browser_action"));

    dirs.forEach(browserItem => {

        console.log(browserItem)
        browserItem.addEventListener('click', function(event){
            event.preventDefault();
            let parentId = event.target.parentElement.id
            let folderData = parentId.split(':');
            console.log(folderData);

            if (folderData[0] == 'dir'){
                localStorage.setItem('currentDir', `${localStorage.currentDir}${folderData[1]}/`);
            }
            else if (folderData == 'return'){
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
            }
            
            renderUI();
        });
    });
}

function renderFileView(file) {
    // Render the file view
}