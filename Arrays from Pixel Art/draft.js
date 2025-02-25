
// const img = new Image();
// img.crossOrigin = "Anonymous";
// img.src = "/Arrays from Pixel Art/small.png";

// const colorData = [];

// img.onload = function () {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // Define color mappings
//     const B = "0, 0, 0"; // Black
//     const W = "255, 255, 255"; // White
//     const R = "255, 0, 0"; // Red
//     const Y = "255, 255, 0"; // Yellow
//     const colorMap = {
//         [B]: "B",
//         [W]: "W",
//         [R]: "R",
//         [Y]: "Y"
//     };

//     const scanPixelSize = 20; // Size of each square to scan
//     const drawPixelSize = 20; // Size of each rendered pixel
//     let scanLine = [];

//     // Analyze the image and extract color data
//     for (let y = 0; y < canvas.height; y += scanPixelSize) {
//         for (let x = 0; x < canvas.width; x += scanPixelSize) {
//             const pixelIndex = (y * canvas.width + x) * 4;
//             const r = data[pixelIndex];
//             const g = data[pixelIndex + 1];
//             const b = data[pixelIndex + 2];
//             const color = `${r}, ${g}, ${b}`;

//             // Map the color to the predefined set (B, W, R, Y)
//             const colorCode = colorMap[color] || "B"; // Default to "B" if color not found

//             scanLine.push({
//                 x: x,
//                 y: y,
//                 color: colorCode // Store the color code instead of the RGB value
//             });
//         }
//         colorData.push(scanLine);
//         scanLine = [];
//     }

//     console.log(colorData); // Log the extracted color data with color codes

//     // Render the image as a grid of colored squares
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("imageContainer");
//     document.body.appendChild(imageContainer);

//     colorData.forEach((lineArray) => {
//         const lineElement = document.createElement("div");
//         lineElement.classList.add("line");
//         lineElement.style.display = "flex";

//         lineArray.forEach((pixelObject) => {
//             const pixelElement = document.createElement("div");
//             pixelElement.style.width = `${drawPixelSize}px`;
//             pixelElement.style.height = `${drawPixelSize}px`;
//             pixelElement.classList.add("pixel");

//             // Set the background color based on the color code
//             switch (pixelObject.color) {
//                 case "B":
//                     pixelElement.style.backgroundColor = "black";
//                     break;
//                 case "W":
//                     pixelElement.style.backgroundColor = "white";
//                     break;
//                 case "R":
//                     pixelElement.style.backgroundColor = "red";
//                     break;
//                 case "Y":
//                     pixelElement.style.backgroundColor = "yellow";
//                     break;
//                 default:
//                     pixelElement.style.backgroundColor = "black"; // Default to black
//             }

//             // Optional: Add event listeners for interactivity
//             pixelElement.addEventListener("mouseenter", () => {
//                 pixelElement.innerText = `${pixelObject.x}, ${pixelObject.y}`;
//             });
//             pixelElement.addEventListener("mouseleave", () => {
//                 pixelElement.innerText = "";
//             });

//             lineElement.appendChild(pixelElement);
//         });

//         imageContainer.appendChild(lineElement);
//     });
// };
// //
// the next code::
// How It Works

// Unique Color Detection:
// The Set object is used to collect all unique RGB values in the image.
// Dynamic Code Assignment:
// A counter (codeCounter) is used to generate unique codes (A, B, C, etc.) using String.fromCharCode.
// 2D Array Generation:
// The image is scanned in a grid-like fashion, and each square’s color is mapped to its corresponding code.
// Rendering:
// The image is rendered as a grid of colored squares using the mapped codes.
// Legend:
// A legend is displayed, showing the color codes and their corresponding RGB values.
// const img = new Image();
// img.crossOrigin = "Anonymous";
// img.src = "/Arrays from Pixel Art/download.png"; // Replace with your image path

// img.onload = function () {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // Step 1: Extract unique colors
//     const uniqueColors = new Set();
//     for (let i = 0; i < data.length; i += 4) {
//         const r = data[i];
//         const g = data[i + 1];
//         const b = data[i + 2];
//         const color = `${r}, ${g}, ${b}`;
//         uniqueColors.add(color);
//     }

//     // Step 2: Assign codes to colors
//     const colorMap = {};
//     let codeCounter = 0;
//     uniqueColors.forEach((color) => {
//         const code = String.fromCharCode(65 + codeCounter); // A, B, C, ...
//         colorMap[color] = code;
//         codeCounter++;
//     });

//     // Step 3: Generate the 2D array of color codes
//     const pixelArray = [];
//     const scanPixelSize = 20; // Size of each square to scan
//     for (let y = 0; y < canvas.height; y += scanPixelSize) {
//         const row = [];
//         for (let x = 0; x < canvas.width; x += scanPixelSize) {
//             const pixelIndex = (y * canvas.width + x) * 4;
//             const r = data[pixelIndex];
//             const g = data[pixelIndex + 1];
//             const b = data[pixelIndex + 2];
//             const color = `${r}, ${g}, ${b}`;
//             const code = colorMap[color];
//             row.push(code);
//         }
//         pixelArray.push(row);
//     }

//     console.log("Color Map:", colorMap);
//     console.log("Pixel Array:", pixelArray);

//     // Step 4: Render the image as a grid of colored squares
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("imageContainer");
//     document.body.appendChild(imageContainer);

//     const drawPixelSize = 20; // Size of each rendered pixel
//     pixelArray.forEach((row) => {
//         const rowElement = document.createElement("div");
//         rowElement.style.display = "flex";
//         row.forEach((code) => {
//             const pixelElement = document.createElement("div");
//             pixelElement.style.width = `${drawPixelSize}px`;
//             pixelElement.style.height = `${drawPixelSize}px`;
//             pixelElement.classList.add("pixel");

//             // Find the color for this code
//             const color = Object.keys(colorMap).find((key) => colorMap[key] === code);
//             pixelElement.style.backgroundColor = `rgb(${color})`;

//             rowElement.appendChild(pixelElement);
//         });
//         imageContainer.appendChild(rowElement);
//     });

//     // Step 5: Display a legend
//     const legend = document.createElement("div");
//     legend.classList.add("legend");
//     document.body.appendChild(legend);

//     Object.entries(colorMap).forEach(([color, code]) => {
//         const legendItem = document.createElement("div");
//         legendItem.style.display = "flex";
//         legendItem.style.alignItems = "center";
//         legendItem.style.marginBottom = "5px";

//         const colorBox = document.createElement("div");
//         colorBox.style.width = "20px";
//         colorBox.style.height = "20px";
//         colorBox.style.backgroundColor = `rgb(${color})`;
//         colorBox.style.marginRight = "10px";

//         const codeText = document.createElement("span");
//         codeText.innerText = `${code}: rgb(${color})`;

//         legendItem.appendChild(colorBox);
//         legendItem.appendChild(codeText);
//         legend.appendChild(legendItem);
//     });
// };









// the next code::
// Color Quantization:
// RGB values are rounded to the nearest multiple of quantizationStep (e.g., 64). This reduces the number of unique colors.
// Color Name Mapping:
// Quantized colors are mapped to the closest matching color name from a predefined list (colorNames).
// 2D Array Generation:
// The image is scanned in a grid-like fashion, and each square’s color is mapped to a human-readable name.
// Rendering:
// The image is rendered as a grid of colored squares using the mapped names.
// Legend:
// A legend is displayed, showing the color names and their corresponding RGB values.


// const img = new Image();
// img.crossOrigin = "Anonymous";
// img.src = "/Arrays from Pixel Art/small.png"; // Replace with your image path

// img.onload = function () {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     // Step 1: Quantize colors
//     const quantizationStep = 64; // Group colors into buckets of size 64
//     const quantizeColor = (r, g, b) => {
//         return [
//             Math.round(r / quantizationStep) * quantizationStep,
//             Math.round(g / quantizationStep) * quantizationStep,
//             Math.round(b / quantizationStep) * quantizationStep
//         ];
//     };

//     // Step 2: Map quantized colors to human-readable names
//     const colorNames = {
//         "0, 0, 0": "black",
//         "255, 255, 255": "white",
//         "255, 0, 0": "red",
//         "255, 255, 0": "yellow",
//         "0, 255, 0": "green",
//         "0, 0, 255": "blue",
//         "128, 128, 128": "gray",
//         "255, 165, 0": "orange"
//     };

//     // Step 3: Generate the 2D array of color names
//     const pixelArray = [];
//     const scanPixelSize = 10; // Size of each square to scan
//     for (let y = 0; y < canvas.height; y += scanPixelSize) {
//         const row = [];
//         for (let x = 0; x < canvas.width; x += scanPixelSize) {
//             const pixelIndex = (y * canvas.width + x) * 4;
//             const r = data[pixelIndex];
//             const g = data[pixelIndex + 1];
//             const b = data[pixelIndex + 2];
//             const quantizedColor = quantizeColor(r, g, b);
//             const colorKey = quantizedColor.join(", ");

//             // Find the closest color name
//             let closestColorName = "black"; // Default
//             let minDistance = Infinity;
//             for (const [key, name] of Object.entries(colorNames)) {
//                 const [qr, qg, qb] = key.split(", ").map(Number);
//                 const distance = Math.sqrt(
//                     Math.pow(qr - quantizedColor[0], 2) +
//                     Math.pow(qg - quantizedColor[1], 2) +
//                     Math.pow(qb - quantizedColor[2], 2)
//                 );
//                 if (distance < minDistance) {
//                     minDistance = distance;
//                     closestColorName = name;
//                 }
//             }

//             row.push(closestColorName);
//         }
//         pixelArray.push(row);
//     }

//     console.log("Pixel Array:", pixelArray);

//     // Step 4: Render the image as a grid of colored squares
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("imageContainer");
//     document.body.appendChild(imageContainer);

//     const drawPixelSize = 10; // Size of each rendered pixel
//     pixelArray.forEach((row) => {
//         const rowElement = document.createElement("div");
//         rowElement.style.display = "flex";
//         row.forEach((colorName) => {
//             const pixelElement = document.createElement("div");
//             pixelElement.style.width = `${drawPixelSize}px`;
//             pixelElement.style.height = `${drawPixelSize}px`;
//             pixelElement.classList.add("pixel");

//             // Set the background color based on the color name
//             const colorKey = Object.keys(colorNames).find(
//                 (key) => colorNames[key] === colorName
//             );
//             pixelElement.style.backgroundColor = `rgb(${colorKey})`;

//             rowElement.appendChild(pixelElement);
//         });
//         imageContainer.appendChild(rowElement);
//     });

//     // Step 5: Display a legend
//     const legend = document.createElement("div");
//     legend.classList.add("legend");
//     document.body.appendChild(legend);

//     Object.entries(colorNames).forEach(([color, name]) => {
//         const legendItem = document.createElement("div");
//         legendItem.style.display = "flex";
//         legendItem.style.alignItems = "center";
//         legendItem.style.marginBottom = "5px";

//         const colorBox = document.createElement("div");
//         colorBox.style.width = "20px";
//         colorBox.style.height = "20px";
//         colorBox.style.backgroundColor = `rgb(${color})`;
//         colorBox.style.marginRight = "10px";

//         const nameText = document.createElement("span");
//         nameText.innerText = `${name}: rgb(${color})`;

//         legendItem.appendChild(colorBox);
//         legendItem.appendChild(nameText);
//         legend.appendChild(legendItem);
//     });
// };








// Logs the frequency of each color
// const img = new Image();
// img.crossOrigin = "Anonymous"; // Enable cross-origin if needed
// img.src = "/Arrays from Pixel Art/small.png";

// img.onload = function () {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     const data = imageData.data;

//     const colorCounts = {};

//     for (let i = 0; i < data.length; i += 4) {
//         const r = data[i];
//         const g = data[i + 1];
//         const b = data[i + 2];
//         const color = `rgb(${r}, ${g}, ${b})`;

//         if (colorCounts[color]) {
//             colorCounts[color]++;
//         } else {
//             colorCounts[color] = 1;
//         }
//     }

//     console.log(colorCounts); 
// };
