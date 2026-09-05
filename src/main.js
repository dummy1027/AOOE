import { EscapeGame } from "./game.js";

const game = new EscapeGame(document.querySelector("#game-canvas"), document.querySelector("#game-status"));
document.querySelector("#restart-button").addEventListener("click", () => game.restart());
document.querySelector("#fullscreen-button").addEventListener("click", () => game.toggleFullscreen());
