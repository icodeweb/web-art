import DataPixels from "./DataPixels.js";
const R = "255, 0, 0, 255";    //Red
const G = "0, 255, 0, 255";    //Green
const B = "0, 0, 255, 255";    //Blue
const _ = "0, 0, 0, 0";        //Transparent

const data =
    [
        [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R],
        [G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G],
        [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B],
    ];

const size = 20;

const image = new DataPixels(data, size).image;

document.body.appendChild(image);