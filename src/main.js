import { EscapeGame } from "./game.js";
const overlay = document.querySelector("#screen-overlay");
const jumpscareScreen = document.querySelector("#jumpscare-screen");
const screens = Object.fromEntries(["main", "pause", "gameover", "settings"].map((name) => [name, document.querySelector(`#${name}-screen`)]));
const game = new EscapeGame(document.querySelector("#game-canvas"), document.querySelector("#game-status"));
let previousScreen = "main", listeningFor = null;
function show(name) { Object.entries(screens).forEach(([screen, element]) => element.hidden = screen !== name); overlay.style.display = "grid"; if (name === "settings") renderSettings(); }
function hideOverlay() { overlay.style.display = "none"; }
function begin() { hideOverlay(); game.restart(); game.resume(); }
function openSettings(from) { previousScreen = from; game.pause(); show("settings"); }
function renderSettings() {
  const labels = {
  up: "위로 이동",
  left: "왼쪽 이동",
  down: "아래로 이동",
  right: "오른쪽 이동",
  interact: "상호작용",
  inventory: "인벤토리"
}, container = document.querySelector("#key-settings");
  container.replaceChildren(...Object.entries(labels).map(([action, label]) => { const row = document.createElement("div"), text = document.createElement("span"), button = document.createElement("button"); row.className = "key-setting"; text.textContent = label; button.textContent = listeningFor === action ? "키 입력..." : game.getBinding(action).toUpperCase(); button.addEventListener("click", () => { listeningFor = action; renderSettings(); }); row.append(text, button); return row; }));
  document.querySelector("#move-help").textContent = `${["up", "left", "down", "right"].map((a) => game.getBinding(a).toUpperCase()).join(" ")} 이동`;
  document.querySelector("#interact-help").textContent = `${game.getBinding("interact").toUpperCase()} 상호작용 / 문 열기`;
  document.querySelector("#inventory-help").textContent = `${game.getBinding("inventory").toUpperCase()} 인벤토리`;
}
document.querySelector("#start-button").onclick = begin; document.querySelector("#main-settings-button").onclick = () => openSettings("main"); document.querySelector("#resume-button").onclick = () => { hideOverlay(); game.resume(); }; document.querySelector("#restart-button").onclick = begin; document.querySelector("#pause-settings-button").onclick = () => openSettings("pause"); document.querySelector("#quit-button").onclick = () => { game.pause(); show("main"); }; document.querySelector("#gameover-restart-button").onclick = begin; document.querySelector("#gameover-quit-button").onclick = () => { game.pause(); show("main"); }; document.querySelector("#settings-back-button").onclick = () => { listeningFor = null; show(previousScreen); };
window.addEventListener("keydown", (event) => {
  // Capture phase makes this reliable even while p5 owns the focused canvas.
  if (listeningFor) {
    event.stopImmediatePropagation();
    if (event.key === "Escape") { listeningFor = null; renderSettings(); return; }
    event.preventDefault(); game.setBinding(listeningFor, event.key.toLowerCase()); listeningFor = null; renderSettings(); return;
  }
  if (event.key === "Escape") {
    event.preventDefault(); event.stopImmediatePropagation();
    if (overlay.style.display === "none") { game.pause(); show("pause"); }
    else if (!screens.pause.hidden) { hideOverlay(); game.resume(); }
  }
}, true);
game.onJumpscare = () => { jumpscareScreen.hidden = false; };
game.onGameOver = () => { jumpscareScreen.hidden = true; show("gameover"); };
show("main");
