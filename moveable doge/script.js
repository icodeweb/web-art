const windowElement = document.getElementById('image');

let isDragging = false;
let offsetX, offsetY;

windowElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        windowElement.style.left = `${e.clientX - offsetX}px`;
        windowElement.style.top = `${e.clientY - offsetY}px`;
        console.log(e)

    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});