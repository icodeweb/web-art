import DataPixels from "./DataPixels.js";
// 
// const R = "255, 0, 0, 255";
// const G = "0, 255, 0, 255";
// const B = "0, 0, 255, 255";
// const _ = "0, 0, 0, 0";

// const data =
//     [
//         [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R],
//         [G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G],
//         [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B],
//     ];

// const size = 20;

// const image = new DataPixels(data, size).image;

// document.body.appendChild(image);

///////////////////

// const R = "255, 0, 0, 255";      // Red
// const O = "255, 165, 0, 255";    // Orange
// const Y = "255, 255, 0, 255";    // Yellow
// const G = "0, 128, 0, 255";      // Green
// const B = "0, 0, 255, 255";      // Blue
// const I = "75, 0, 130, 255";     // Indigo
// const V = "238, 130, 238, 255";  // Violet
// const _ = "0, 0, 0, 0";          // Transparent

// const data = [
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R],
//     [R, O, Y, G, B, I, V, I, B, G, Y, O, R]
// ];

// const size = 20;

// const dp = new DataPixels(data, size);
// document.body.appendChild(dp.image);

///////////////////

function createMarioBrother(isMario = true) {

    const mainColor = (isMario) ? "255, 0, 0" : "0, 180, 0";

    const C = mainColor;        //Hat & Shirt
    const B = "100, 50, 0";     //Brown Hair & Boots
    const S = "255, 200, 150";  //Skin Tone
    const O = "0, 0, 255";      //Blue Overalls
    const Y = "255, 255, 0";    //Yellow Buckles       
    const W = "255, 255, 255";  //White Gloves
    const _ = "0, 0, 0, 0";     //Transparent (RGBA Format)

    return [[_, _, _, C, C, C, C, C, _, _, _, _],
    [_, _, C, C, C, C, C, C, C, C, C, _],
    [_, _, B, B, B, S, S, B, S, _, _, _],
    [_, B, S, B, S, S, S, B, S, S, S, _],
    [_, B, S, B, B, S, S, S, B, S, S, B],
    [_, B, B, S, S, S, S, B, B, B, B, _],
    [_, _, _, S, S, S, S, S, S, S, _, _],
    [_, _, C, C, O, C, C, C, C, _, _, _],
    [_, C, C, C, O, C, C, O, C, C, C, _],
    [C, C, C, C, O, O, O, O, C, C, C, C],
    [W, W, C, O, Y, O, O, Y, O, C, W, W],
    [W, W, W, O, O, O, O, O, O, W, W, W],
    [W, W, O, O, O, O, O, O, O, O, W, W],
    [_, _, O, O, O, _, _, O, O, O, _, _],
    [_, B, B, B, _, _, _, _, B, B, B, _],
    [B, B, B, B, _, _, _, _, B, B, B, B]];
}

/*
 * Create and append a Mario Brother canvas instance
 * 
 */
const pixelSize = 30;

const brother = new DataPixels(createMarioBrother(true), pixelSize).canvas;
brother.style.filter = "drop-shadow(0 10px 20px #000000)";

document.body.appendChild(brother);