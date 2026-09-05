import { EscapeGame } from "./game.js";

const game = new EscapeGame(document.querySelector("#game-canvas"), document.querySelector("#game-status"));
document.querySelector("#restart-button").addEventListener("click", () => game.restart());
