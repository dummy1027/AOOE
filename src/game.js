const TILE_SIZE = 64;
const SPRITE_FOLDER = "images/";
const DIRECTIONS = {
  s: { x: 0, y: 1, sprite: "S" }, w: { x: 0, y: -1, sprite: "W" },
  d: { x: 1, y: 0, sprite: "D" }, a: { x: -1, y: 0, sprite: "A" },
};
const INITIAL_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 1, 2, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 3, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export class EscapeGame {
  constructor(container, statusElement) {
    this.container = container; this.statusElement = statusElement; this.resetState();
    this.sketch = new window.p5((p) => this.createSketch(p), container);
  }

  resetState() {
    this.map = INITIAL_MAP.map((row) => [...row]);
    this.player = { x: 1, y: 1, direction: "S", movingUntil: 0 };
    this.monster = { x: 7, y: 5, active: false };
    this.hasKey = false; this.ended = false;
    this.message = "방을 탐색하고 열쇠를 찾아 탈출하세요. (이동: WASD, 조사: E)";
  }

  restart() { this.resetState(); this.sketch?.loop(); this.updateStatus(); }

  createSketch(p) {
    this.sprites = { A: [], D: [], S: [], W: [] };
    const loadSprite = (name) => p.loadImage(`${SPRITE_FOLDER}${name}`, undefined, () => { this.spriteLoadFailed = true; });
    p.preload = () => Object.keys(this.sprites).forEach((direction) => {
      this.sprites[direction] = [1, 2, 3, 4].map((frame) => loadSprite(`${direction}${frame}.png`));
    });
    p.setup = () => { p.createCanvas(640, 480); p.frameRate(12); p.noSmooth(); p.textFont("sans-serif"); this.updateStatus(); };
    p.draw = () => this.draw(p);
    p.keyPressed = () => this.handleKey(p, p.key.toLowerCase());
  }

  draw(p) {
    p.background(10, 10, 14);
    const cameraX = p.width / 2 - (this.player.x * TILE_SIZE + TILE_SIZE / 2);
    const cameraY = p.height / 2 - (this.player.y * TILE_SIZE + TILE_SIZE / 2);
    p.push(); p.translate(cameraX, cameraY); this.drawMap(p); this.drawPlayer(p); this.drawMonster(p); p.pop();
    this.drawFlashlight(p); this.drawMessage(p);
  }

  drawMap(p) {
    const colors = { 0: [32, 32, 38], 1: [55, 45, 65], 2: [190, 150, 65], 3: [120, 60, 25], 4: [35, 140, 90] };
    this.map.forEach((row, y) => row.forEach((tile, x) => {
      p.fill(...colors[tile]); p.stroke(15, 15, 20); p.rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      if (tile === 2) { p.fill(255, 225, 125); p.noStroke(); p.circle(x * TILE_SIZE + 32, y * TILE_SIZE + 32, 16); }
      if (tile === 4) { p.fill(150, 245, 190); p.noStroke(); p.triangle(x * TILE_SIZE + 19, y * TILE_SIZE + 47, x * TILE_SIZE + 32, y * TILE_SIZE + 16, x * TILE_SIZE + 45, y * TILE_SIZE + 47); }
    }));
  }

  drawPlayer(p) {
    const frame = p.millis() < this.player.movingUntil ? Math.floor(p.frameCount / 3) % 4 : 0;
    const image = this.sprites[this.player.direction]?.[frame];
    const x = this.player.x * TILE_SIZE; const y = this.player.y * TILE_SIZE;
    if (image?.width > 1 && image?.height > 1) p.image(image, x, y, TILE_SIZE, TILE_SIZE);
    else { p.fill(230, 230, 240); p.noStroke(); p.circle(x + 32, y + 32, 40); p.fill(45, 35, 65); p.circle(x + 32, y + 31, 10); }
  }

  drawMonster(p) {
    if (!this.monster.active) return;
    p.fill(130, 80, 220); p.noStroke(); p.rect(this.monster.x * TILE_SIZE + 8, this.monster.y * TILE_SIZE + 8, 48, 48, 8);
    if (p.frameCount % 6 === 0) this.moveMonster();
    if (this.monster.x === this.player.x && this.monster.y === this.player.y) this.finish("괴물에게 붙잡혔습니다. GAME OVER");
  }

  moveMonster() {
    const dx = Math.sign(this.player.x - this.monster.x); const dy = Math.sign(this.player.y - this.monster.y);
    if (this.canEnter(this.monster.x + dx, this.monster.y)) this.monster.x += dx;
    else if (this.canEnter(this.monster.x, this.monster.y + dy)) this.monster.y += dy;
  }

  handleKey(p, key) {
    if (key === "r") { this.restart(); return false; }
    if (this.ended) return false;
    const direction = DIRECTIONS[key];
    if (direction) {
      this.player.direction = direction.sprite;
      const x = this.player.x + direction.x; const y = this.player.y + direction.y;
      if (this.canEnter(x, y)) {
        this.player.x = x; this.player.y = y; this.player.movingUntil = p.millis() + 320;
        if (this.map[y][x] === 4) this.finish("탈출 성공! R 키 또는 처음부터 버튼으로 다시 시작할 수 있습니다.");
      }
    } else if (key === "e") this.interact();
    this.updateStatus(); return false;
  }

  interact() {
    if (this.map[this.player.y][this.player.x] === 2) { this.hasKey = true; this.map[this.player.y][this.player.x] = 0; this.message = "빛나는 열쇠를 찾았습니다."; return; }
    const movement = Object.values(DIRECTIONS).find((item) => item.sprite === this.player.direction);
    const x = this.player.x + movement.x; const y = this.player.y + movement.y;
    if (this.map[y]?.[x] === 3) {
      if (this.hasKey) { this.map[y][x] = 0; this.monster.active = true; this.message = "문이 열렸습니다. 뒤에서 무언가가 따라옵니다..."; }
      else this.message = "문이 잠겨 있습니다. 열쇠가 필요합니다.";
    } else this.message = "조사할 수 있는 것이 없습니다.";
  }

  canEnter(x, y) { return this.map[y]?.[x] !== undefined && ![1, 3].includes(this.map[y][x]); }
  finish(message) { this.ended = true; this.message = message; this.updateStatus(); }
  updateStatus() { this.statusElement.textContent = `열쇠: ${this.hasKey ? "획득" : "없음"}${this.monster.active ? " · 추격 중" : ""}`; }
  drawFlashlight(p) {
    const context = p.drawingContext; context.save(); context.fillStyle = "rgba(0, 0, 0, 0.58)"; context.beginPath();
    context.rect(0, 0, p.width, p.height); context.arc(p.width / 2, p.height / 2, 160, 0, p.TWO_PI); context.fill("evenodd"); context.restore();
  }
  drawMessage(p) { p.fill(0, 0, 0, 190); p.noStroke(); p.rect(10, p.height - 46, p.width - 20, 36, 6); p.fill(255); p.textSize(14); p.textAlign(p.LEFT, p.CENTER); p.text(this.message, 20, p.height - 28, p.width - 40); }
}
