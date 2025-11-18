import { Game } from "./Game.js";


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(ctx, canvas)
game.init();

// let fps = 60;
// let interval = 1000 / fps;
// let last = 0;
// let size = 1;
// let current = 0;

// const moveCircle = (timestamp) => {
//     if (timestamp - last >= interval) {
//         last = timestamp;

//         current -= size;
//         ctx.style["background-position-x"] = current + "px";
//     }

//     requestAnimationFrame(moveCircle);

// }

// ctx.addEventListener("click", (e) => {
//     requestAnimationFrame(moveCircle);
// })
