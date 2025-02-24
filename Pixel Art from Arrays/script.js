// import DataPixels from "./DataPixels.js";

let B = "0, 0, 0";
let W = "255, 255, 255";
let R = "255, 0, 0";
let Y = "255, 255, 0";
const colorMap = {
    [B]: "B",
    [W]: "W",
    [R]: "R",
    [Y]: "Y"
};

let pixelArray =
    [
        [Y, Y, B, B, B, W, W, W, B, B, B, W, W, B, B, B, Y, Y, Y, Y, Y, Y, Y, Y],
        [Y, Y, B, B, W, W, W, W, W, B, W, W, W, W, B, B, B, Y, Y, B, Y, Y, B, Y],
        [Y, B, B, B, W, W, W, B, W, B, W, W, W, W, B, B, B, B, B, B, Y, B, B, Y],
        [Y, Y, B, B, W, W, W, W, W, B, W, B, W, W, B, B, Y, B, B, Y, Y, B, Y, Y],
        [Y, Y, B, B, W, W, W, W, W, B, W, W, W, W, B, B, B, Y, Y, Y, B, B, Y, Y],
        [Y, Y, B, B, B, W, W, W, B, B, B, W, W, B, B, B, B, B, B, B, B, Y, Y, Y],
        [Y, B, Y, B, B, B, B, B, B, B, B, B, B, B, B, B, Y, Y, B, Y, Y, B, B, Y],
        [Y, Y, B, Y, B, B, B, R, R, R, R, R, B, B, Y, B, B, B, Y, Y, B, B, Y, Y],
        [Y, Y, B, B, B, B, R, B, B, B, B, B, B, B, B, Y, Y, B, B, B, B, B, Y, Y],
        [Y, Y, Y, Y, B, B, R, R, B, R, R, R, B, B, B, B, Y, B, B, B, Y, B, B, Y],
        [Y, B, B, Y, B, B, B, R, R, B, R, R, R, B, B, B, Y, Y, Y, B, B, Y, B, Y],
        [Y, Y, B, B, B, B, B, B, B, B, R, R, R, R, B, B, B, B, Y, Y, B, Y, Y, Y],
        [B, Y, Y, Y, B, Y, Y, Y, B, B, R, R, R, R, B, B, B, B, Y, Y, B, Y, Y, Y],
        [Y, Y, B, B, Y, Y, B, Y, B, B, B, R, R, R, B, B, Y, Y, Y, Y, Y, Y, Y, Y],
    ];

let size = 30;
let displayColorX = false;

let imageContainer = document.createElement("div");
imageContainer.classList.add("imageContainer")
document.body.appendChild(imageContainer)

pixelArray.forEach((line, lineIndex) => {
    let lineContainer = document.createElement("div");
    lineContainer.classList.add("line");

    line.forEach((color, pixelIndex) => {
        let pixel = document.createElement("div");
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        pixel.classList.add("pixel");
        pixel.style.backgroundColor = `rgb(${color})`;
        lineContainer.appendChild(pixel);
        imageContainer.addEventListener("mouseenter", () => {
            displayColorX = true
            if (displayColorX) {
                pixel.innerText = colorMap[color];
            }
        })
        imageContainer.addEventListener("mouseleave", () => {
            displayColorX = true
            if (displayColorX) {
                pixel.innerText = "";
            }
        })
    });
    lineContainer.style.display = "flex";
    imageContainer.appendChild(lineContainer);
});

