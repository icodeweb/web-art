let img = new Image();
img.crossOrigin = "Anonymous";
img.src = "/Arrays from Pixel Art/small.png";

let scanPixelSize = 20;
let drawPixelSize = 20;
let colorData = [];
const imageInput = document.getElementById("imageInput");
const imageContainer = document.querySelector(".imageContainer");

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        img = new Image(); // 
        img.crossOrigin = "Anonymous";
        img.src = URL.createObjectURL(file);
        document.body.appendChild(img)
        img.onload = analyzeImage;
    }
});

// Analyze the image and generate color data
function analyzeImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    colorData = [];
    let scanLine = [];

    for (let y = 0; y < canvas.height; y += scanPixelSize) {
        for (let x = 0; x < canvas.width; x += scanPixelSize) {
            const pixelIndex = (y * canvas.width + x) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            const color = `rgb(${r}, ${g}, ${b})`;

            scanLine.push({
                x: x,
                y: y,
                color: color
            });
        }
        colorData.push(scanLine);
        scanLine = [];
    }
    renderImage();
}

// Render the image as a grid of colored squares
function renderImage() {
    imageContainer.innerHTML = "";

    colorData.forEach((lineArray) => {
        const lineElement = document.createElement("div");
        lineElement.classList.add("line");
        lineElement.style.display = "flex";

        lineArray.forEach((pixelObject) => {
            const pixelElement = document.createElement("div");
            pixelElement.style.width = `${drawPixelSize}px`;
            pixelElement.style.height = `${drawPixelSize}px`;
            pixelElement.classList.add("pixel");
            pixelElement.style.backgroundColor = pixelObject.color;

            pixelElement.addEventListener("mouseenter", () => {
                pixelElement.innerText = `${pixelObject.x}, ${pixelObject.y}`;
            });
            pixelElement.addEventListener("mouseleave", () => {
                pixelElement.innerText = "";
            });

            lineElement.appendChild(pixelElement);
        });

        imageContainer.appendChild(lineElement);
    });
}

// Handle scanPixelSize input changes
const scanPixelSizeInput = document.getElementById("scanPixelSize");
const drawPixelSizeInput = document.getElementById("drawPixelSize");
const scanPixelSizeValue = document.getElementById("scanPixelSizeValue");
const drawPixelSizeValue = document.getElementById("drawPixelSizeValue");

scanPixelSizeInput.addEventListener("input", (e) => {
    scanPixelSize = parseInt(e.target.value);
    scanPixelSizeValue.innerText = scanPixelSize;
    analyzeImage(); // Re-analyze 
});

drawPixelSizeInput.addEventListener("input", (e) => {
    drawPixelSize = parseInt(e.target.value);
    drawPixelSizeValue.innerText = drawPixelSize;
    renderImage(); // Re-render 
});

img.onload = analyzeImage;

// setInterval(() => {
// let pixels = document.querySelectorAll(".pixel")

//     console.log(pixels[Math.round(Math.random() * 336)]);
//     pixels[Math.round(Math.random() * 100)].style.width = "10px"
//     pixels[Math.round(Math.random() * 100)].style.height = "30px"
// }, 100)