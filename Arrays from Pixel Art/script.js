let img = new Image();
img.crossOrigin = "Anonymous";
img.src = "/Arrays from Pixel Art/evidence.jpg";
let scanPixelSize = 10;
let drawPixelSize = 20;
let colorData = [];
const scanPixelSizeInput = document.getElementById("scanPixelSize");
const drawPixelSizeInput = document.getElementById("drawPixelSize");
// 
const scanPixelSizeValue = document.getElementById("scanPixelSizeValue");
const drawPixelSizeValue = document.getElementById("drawPixelSizeValue");
// 
scanPixelSizeValue.innerText = scanPixelSize;
scanPixelSizeInput.setAttribute("value", `${scanPixelSize}`)
// 
drawPixelSizeValue.innerText = drawPixelSize;
drawPixelSizeInput.setAttribute("value", `${drawPixelSize}`)
// 

// toggleInputs
let inputsElement = document.querySelector(".inputs");
document.getElementById("toggleInputs").addEventListener("click", () => {
    inputsElement.classList.toggle("show");
});
// handle imageInput
const imageInput = document.getElementById("imageInput");
const imageContainer = document.querySelector(".imageContainer");
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = URL.createObjectURL(file);
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
    // console.log(data);

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
let xSpan = document.getElementById("x")
let ySpan = document.getElementById("y")
let cordinates = document.getElementById("cordinates")
imageContainer.addEventListener("mouseenter", (event) => {
    cordinates.style.display = `block`;
})
imageContainer.addEventListener("mousemove", (event) => {
    cordinates.style.left = `${event.clientX + 10}px`;
    cordinates.style.top = `${event.clientY + 10}px`;
});
imageContainer.addEventListener("mouseleave", (event) => {
    cordinates.style.display = `none`;
});

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
                xSpan.innerText = `${(pixelObject.x / scanPixelSize) + 1}`
                ySpan.innerText = `${(pixelObject.y / scanPixelSize) + 1}`
            });
            pixelElement.addEventListener("mouseleave", () => {
                pixelElement.innerText = "";
            });
            lineElement.appendChild(pixelElement);
        });

        imageContainer.appendChild(lineElement);
    });
    let pixels = document.querySelectorAll(".pixel")
    let pixelCountElemnt = document.getElementById("pixelCount")
    pixelCountElemnt.innerText = `this image is made of ${pixels.length} <div> elemnts`
}
img.onload = analyzeImage;

// Handle input changes
scanPixelSizeInput.addEventListener("input", (e) => {
    scanPixelSize = parseInt(e.target.value);
    scanPixelSizeValue.innerText = scanPixelSize;
    analyzeImage(); // Re-analyze 
});

drawPixelSizeInput.addEventListener("input", (e) => {
    drawPixelSize = parseInt(e.target.value);
    drawPixelSizeValue.innerText = drawPixelSize;
    renderImage();
});
// 
const pixelRotateInput = document.getElementById("pixelRotate");
const pixelRotateValue = document.getElementById("pixelRotateValue");
pixelRotateInput.addEventListener("input", (e) => {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => pixel.style.rotate = `${e.target.value}deg`);
    pixelRotateValue.innerText = `${e.target.value}deg`;
});
// 
const pixelRadiusInput = document.getElementById("pixelRadius");
const pixelRadiusValue = document.getElementById("pixelRadiusValue");
pixelRadiusInput.addEventListener("input", (e) => {
    let pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => pixel.style.borderRadius = `${e.target.value}%`);
    pixelRadiusValue.innerText = `${e.target.value}%`;
});
// 
const columnReverseInput = document.getElementById("columnReverse");
columnReverseInput.addEventListener("input", (e) => {
    imageContainer.classList.toggle("columnReverse");
});
const rowReverseInput = document.getElementById("rowReverse");
rowReverseInput.addEventListener("input", () => {
    let lines = document.querySelectorAll(".line");
    lines.forEach(line => line.classList.toggle("rowReverse"))
});
// 
const lineGapInput = document.getElementById("lineGap");
const lineGapValue = document.getElementById("lineGapValue");
lineGapInput.addEventListener("input", (e) => {
    imageContainer.style.gap = `${e.target.value}px`;
    lineGapValue.innerText = `${e.target.value}px`;
});
// 
const columnGapInput = document.getElementById("columnGap");
const columnGapValue = document.getElementById("columnGapValue");
columnGapInput.addEventListener("input", (e) => {
    document.querySelectorAll(".line").forEach(line => line.style.gap = `${e.target.value}px`)
    columnGapValue.innerText = `${e.target.value}px`;
});
//