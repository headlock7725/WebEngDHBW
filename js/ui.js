import{
    fetchDirectory,
    getFileContent
}
from './api.js'


export function renderUI(){
    resetUI();
    const pathElement = document.getElementById('currentDir');
    if (localStorage.currentDir){
        renderDirectoryView(localStorage.currentDir);

    }
    else{
        localStorage.setItem('currentDir', '/');
        renderDirectoryView('');
    }

    pathElement.textContent = `Pfad: ${localStorage.currentDir}`
}

function resetUI(){
    const viewer = document.getElementById("viewer");
    const dirList = document.getElementById("browser_dir_list");
    const resetButton = document.getElementById("return");
    const childrenToRemove = dirList.querySelectorAll('.browser_action:not(#return)');

    viewer.innerHTML = '';

    //replace return item to remove all event listeners
    const resetButtonClone = resetButton.cloneNode(true);
    resetButton.parentNode.replaceChild(resetButtonClone, resetButton);

    childrenToRemove.forEach(child => {
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
            else{
                renderFileView(folderData[1], folderData[0])
            }
            
            renderUI();
        });
    });
}

async function renderFileView(file, fileType) {
    const stream = await getFileContent(`${localStorage.currentDir}${file}`, localStorage.authToken);
    const viewer = document.getElementById("viewer");
    
    const responseStream = new Response(stream);
    const blob = await responseStream.blob();
    const objectURL = URL.createObjectURL(blob);

    if (fileType.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = objectURL;
        viewer.appendChild(img);
    } else if (fileType.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = objectURL;
        video.controls = true;
        viewer.appendChild(video);
    } else if (fileType.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.src = objectURL;
        audio.controls = true;
        viewer.appendChild(audio);
    } else if (fileType.startsWith('text/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const pre = document.createElement('pre');
            pre.textContent = e.target.result;
            viewer.appendChild(pre);
        };
        reader.readAsText(blob);
    } else {
        alert('Unsupported file type');
    }
}