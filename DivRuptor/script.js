let img = new Image();
img.crossOrigin = "Anonymous";
img.src = "evidence.jpg";
let scanPixelSize = 5;
let drawPixelSize = 5;
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
            pixelElement.innerText = "";
            lineElement.appendChild(pixelElement);
        });

        imageContainer.appendChild(lineElement);
    });
    let pixels = document.querySelectorAll(".pixel")
    let pixelCountElemnt = document.getElementById("pixelCount")
    pixelCountElemnt.innerText = `made of ${pixels.length} <div>`
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

// filters
let grayscaleInput = document.getElementById("grayscale");
let grayscaleValue = document.getElementById("grayscaleValue");
grayscaleInput.addEventListener("input", (e) => {
    grayscaleValue.innerText = `${e.target.value}`;
});
let brightnessInput = document.getElementById("brightness");
let brightnessValue = document.getElementById("brightnessValue");
brightnessInput.addEventListener("input", (e) => {
    brightnessValue.innerText = `${e.target.value}`;
});
let contrastInput = document.getElementById("contrast");
let contrastValue = document.getElementById("contrastValue");
contrastInput.addEventListener("input", (e) => {
    contrastValue.innerText = `${e.target.value}`;
});
let hueRotateInput = document.getElementById("hueRotate");
let hueRotateValue = document.getElementById("hueRotateValue");
hueRotateInput.addEventListener("input", (e) => {
    hueRotateValue.innerText = `${e.target.value}deg`;
});
let invertInput = document.getElementById("invert");
let invertValue = document.getElementById("invertValue");
invertInput.addEventListener("input", (e) => {
    invertValue.innerText = `${e.target.value}`;
});
let opacityInput = document.getElementById("opacity");
let opacityValue = document.getElementById("opacityValue");
opacityInput.addEventListener("input", (e) => {
    opacityValue.innerText = `${e.target.value}`;
});
let saturateInput = document.getElementById("saturate");
let saturateValue = document.getElementById("saturateValue");
saturateInput.addEventListener("input", (e) => {
    saturateValue.innerText = `${e.target.value}`;
});
let sepiaInput = document.getElementById("sepia");
let sepiaValue = document.getElementById("sepiaValue");
sepiaInput.addEventListener("input", (e) => {
    sepiaValue.innerText = `${e.target.value}`;
});


function updateFilter() {
    let filterString = `grayscale(${grayscaleInput.value}) brightness(${brightnessInput.value}) contrast(${contrastInput.value}) hue-rotate(${hueRotateInput.value}deg) invert(${invertInput.value}) opacity(${opacityInput.value}) saturate(${saturateInput.value}) sepia(${sepiaInput.value})`;
    console.log(filterString);
    imageContainer.style.filter = filterString;
}

let filterInputs = document.querySelectorAll(".filterInput");
filterInputs.forEach(filterInput => {
    filterInput.addEventListener("input", () => {
        updateFilter()
    })
})

function randomFilter() {
    // let randomNum1 = Math.random(1); let randomNum2 = Math.random(1); let randomNum3 = Math.random(1); let randomNum4 = Math.random(1); let randomNum5 = Math.random(1); let randomNum6 = Math.random(1); let randomNum7 = Math.random(1); let randomNum8 = Math.random(1.2);
    // let randomFilterString = `grayscale(${randomNum1}) brightness(${randomNum2}) contrast(${randomNum3}) hue-rotate(${randomNum4}deg) invert(${randomNum5}) opacity(${randomNum6}) saturate(${randomNum7}) sepia(${randomNum8})`;
    let randomNum = Math.random();
    let randomFilterString = `grayscale(${randomNum * .5}) brightness(${randomNum + 1}) contrast(1) hue-rotate(${randomNum * 360}deg) invert(0) opacity(1) saturate(${randomNum * 10}) sepia(${randomNum * .5})`;
    grayscaleInput.value = randomNum * .5;
    brightnessInput.value = randomNum + 1;
    contrastInput.value = 1;
    hueRotateInput.value = randomNum * 360;
    invertInput.value = 0;
    opacityInput.value = 1;
    saturateInput.value = randomNum * 10
    sepiaInput.value = randomNum * .5;
    grayscaleValue.innerText = grayscaleInput.value;
    brightnessValue.innerText = brightnessInput.value;
    contrastValue.innerText = contrastInput.value;
    hueRotateValue.innerText = hueRotateInput.value;
    invertValue.innerText = invertInput.value;
    opacityValue.innerText = opacityInput.value;
    saturateValue.innerText = saturateInput.value;
    sepiaValue.innerText = sepiaInput.value;
    imageContainer.style.filter = randomFilterString;
}

let randomFilterInterval;
let isRandomFilterRunning = false;

document.getElementById("toggleRandomFilter").addEventListener("click", () => {
    if (isRandomFilterRunning) {
        document.getElementById("toggleRandomFilter").innerText = "RandomFilter"
        clearInterval(randomFilterInterval);
    } else {
        document.getElementById("toggleRandomFilter").innerText = "stop"
        randomFilterInterval = setInterval(() => {
            randomFilter();
        }, 100);
    }
    isRandomFilterRunning = !isRandomFilterRunning;
});

document.body.addEventListener("click", event => {
    if (event.target.classList.contains("pixel")) {
        cordinates.style.backgroundColor = `${event.target.style.backgroundColor}`;
    }
});

function saveImage() {
    domtoimage.toBlob(document.getElementById('test'))
        .then(function (blob) {
            window.saveAs(blob, 'imageContainer.png');
        });
}

document.getElementById("saveImage").addEventListener("click", () => {
    saveImage()
})





setTimeout(() => {
    document.getElementById("credits").style.display = "none"
}, 3000)



