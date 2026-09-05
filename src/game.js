const TILE_SIZE = 64;
const MOVE_FRAMES = 12;
const SPRITE_FRAMES = 4;
const MONSTER_MOVE_INTERVAL = 650;
const SPRITE_FOLDER = "images/";
const TILE = { FLOOR: 0, WALL: 1, KEY: 2, LOCKED_DOOR: 3, EXIT: 4, OPEN_DOOR: 5, STAIRS: 6 };
const DIRECTIONS = [
  { key: "w", x: 0, y: -1, sprite: "W" }, { key: "a", x: -1, y: 0, sprite: "A" },
  { key: "s", x: 0, y: 1, sprite: "S" }, { key: "d", x: 1, y: 0, sprite: "D" },
];

// 0: 길, 1: 벽, 2: 열쇠, 3: 잠긴 문, 4: 출구, 5: 열린 문, 6: 계단
const INITIAL_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 6, 6, 6, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 6, 6, 6, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 6, 6, 6, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 6, 6, 6, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 6, 6, 6, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 5, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 5, 1, 5, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 5, 1, 5, 1, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 3, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const SPAWN = { x: 2, y: 1 };
const KEY_POSITION = { x: 10, y: 3 };
const EXIT_POSITION = { x: 28, y: 28 };
const MONSTER_SPAWN = { x: 15, y: 12 };

export class EscapeGame {
  constructor(container, statusElement) {
    this.container = container; this.statusElement = statusElement; this.resetState();
    this.sketch = new window.p5((p) => this.createSketch(p), container);
  }

  resetState() {
    this.map = INITIAL_MAP.map((row) => [...row]);
    this.map[KEY_POSITION.y][KEY_POSITION.x] = TILE.KEY;
    this.map[EXIT_POSITION.y][EXIT_POSITION.x] = TILE.EXIT;
    this.player = this.createActor(SPAWN.x, SPAWN.y, "S");
    this.monster = { ...this.createActor(MONSTER_SPAWN.x, MONSTER_SPAWN.y, "S"), active: true, nextMoveAt: 1000 };
    this.inventory = [];
    this.heldDirections = new Set();
    this.ended = false;
    this.message = "열쇠를 찾아 잠긴 문을 열고 탈출하세요.";
  }

  restart() { this.resetState(); this.sketch?.loop(); this.updateStatus(); }
  toggleFullscreen() { this.sketch.fullscreen(!this.sketch.fullscreen()); }

  createSketch(p) {
    this.sprites = { A: [], D: [], S: [], W: [] };
    const loadSprite = (name) => p.loadImage(`${SPRITE_FOLDER}${name}`, undefined, () => { this.spriteLoadFailed = true; });
    p.preload = () => Object.keys(this.sprites).forEach((dir) => {
      this.sprites[dir] = Array.from({ length: SPRITE_FRAMES }, (_, index) => loadSprite(`${dir}${index + 1}.png`));
    });
    p.setup = () => { p.createCanvas(320, 320); p.frameRate(30); p.noSmooth(); p.textFont("sans-serif"); this.resizeCanvas(p); this.updateStatus(); };
    p.draw = () => this.draw(p);
    p.keyPressed = () => this.handleKey(p, p.key.toLowerCase());
    p.keyReleased = () => this.handleKeyReleased(p.key.toLowerCase());
    p.windowResized = () => this.resizeCanvas(p);
  }

  resizeCanvas(p) {
    const frame = this.container.parentElement;
    p.resizeCanvas(Math.max(frame.clientWidth, 320), Math.max(frame.clientHeight, 320));
  }

  draw(p) {
    this.processHeldMovement(p);
    const playerAnimation = this.updateActorAnimation(p, this.player);
    p.background(10, 10, 14);
    const cameraX = p.width / 2 - (playerAnimation.x * TILE_SIZE + TILE_SIZE / 2);
    const cameraY = p.height / 2 - (playerAnimation.y * TILE_SIZE + TILE_SIZE / 2);
    const lightX = cameraX + playerAnimation.x * TILE_SIZE + TILE_SIZE / 2;
    const lightY = cameraY + playerAnimation.y * TILE_SIZE + TILE_SIZE / 2;
    p.push(); p.translate(cameraX, cameraY); this.drawMap(p); this.drawPlayer(p, playerAnimation); this.drawMonster(p); p.pop();
    this.drawFlashlight(p, lightX, lightY); this.drawMessage(p);
  }

  drawMap(p) {
    const colors = { 0: [32, 32, 38], 1: [55, 45, 65], 2: [190, 150, 65], 3: [120, 60, 25], 4: [35, 140, 90], 5: [145, 97, 48], 6: [54, 105, 155] };
    this.map.forEach((row, y) => row.forEach((tile, x) => {
      const px = x * TILE_SIZE; const py = y * TILE_SIZE;
      p.fill(...colors[tile]); p.stroke(15, 15, 20); p.rect(px, py, TILE_SIZE, TILE_SIZE);
      if (tile === TILE.KEY) { p.fill(255, 225, 125); p.noStroke(); p.circle(px + 32, py + 32, 16); }
      if (tile === TILE.EXIT) { p.fill(150, 245, 190); p.noStroke(); p.triangle(px + 19, py + 47, px + 32, py + 16, px + 45, py + 47); }
      if (tile === TILE.STAIRS) { p.stroke(155, 205, 240); p.strokeWeight(3); for (let i = 0; i < 4; i++) p.line(px + 12, py + 16 + i * 11, px + 52, py + 16 + i * 11); p.strokeWeight(1); }
    }));
  }

  drawPlayer(p, animation) {
    const { x, y, frame } = animation;
    const image = this.getSprite(this.player.direction, frame);
    const pixelX = x * TILE_SIZE; const pixelY = y * TILE_SIZE;
    if (image?.width > 1 && image?.height > 1) {
      p.imageMode(p.CENTER);
      p.image(image, pixelX + TILE_SIZE / 2, pixelY + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
      p.imageMode(p.CORNER);
    } else { p.fill(230, 230, 240); p.noStroke(); p.circle(pixelX + 32, pixelY + 32, 40); p.fill(45, 35, 65); p.circle(pixelX + 32, pixelY + 31, 10); }
  }

  drawMonster(p) {
    if (!this.monster.active || this.ended) return;
    if (!this.monster.isMoving && p.millis() >= this.monster.nextMoveAt) {
      this.moveMonsterWithBFS(p);
      this.monster.nextMoveAt = p.millis() + MONSTER_MOVE_INTERVAL;
    }
    const { x, y } = this.updateActorAnimation(p, this.monster);
    const drawX = x * TILE_SIZE; const drawY = y * TILE_SIZE;
    p.fill(116, 70, 212); p.noStroke(); p.rect(drawX + 7, drawY + 7, 50, 50, 10);
    p.fill(235, 225, 255); p.circle(drawX + 23, drawY + 28, 11); p.circle(drawX + 42, drawY + 28, 11);
    p.fill(25, 15, 45); p.circle(drawX + 23, drawY + 28, 5); p.circle(drawX + 42, drawY + 28, 5);
    if (!this.monster.isMoving && this.samePosition(this.monster, this.player)) this.finish(p, "아오오니에게 붙잡혔습니다. GAME OVER");
  }

  // Queue를 사용한 BFS: 아오오니에서 플레이어까지의 최단 경로 중 한 칸을 반환한다.
  moveMonsterWithBFS(p) {
    const startKey = this.positionKey(this.monster.x, this.monster.y);
    const targetKey = this.positionKey(this.player.x, this.player.y);
    const queue = [{ x: this.monster.x, y: this.monster.y }];
    const parents = new Map([[startKey, null]]);
    let head = 0;
    while (head < queue.length) {
      const current = queue[head++];
      if (this.positionKey(current.x, current.y) === targetKey) break;
      for (const direction of DIRECTIONS) {
        const next = { x: current.x + direction.x, y: current.y + direction.y };
        const nextKey = this.positionKey(next.x, next.y);
        if (!parents.has(nextKey) && this.isMonsterWalkable(next.x, next.y)) {
          parents.set(nextKey, this.positionKey(current.x, current.y));
          queue.push(next);
        }
      }
    }
    if (!parents.has(targetKey)) return;
    let stepKey = targetKey;
    while (parents.get(stepKey) !== startKey && parents.get(stepKey) !== null) stepKey = parents.get(stepKey);
    if (stepKey !== startKey) {
      const [x, y] = stepKey.split(",").map(Number);
      this.startActorMove(this.monster, x, y, p.frameCount);
    }
  }

  handleKey(p, key) {
    if (key === "r") { this.restart(); return false; }
    if (this.ended) return false;
    const direction = DIRECTIONS.find((item) => item.key === key);
    if (direction) { this.heldDirections.add(key); this.movePlayer(p, direction); }
    else if (key === "e" && !this.player.isMoving) this.interact();
    this.updateStatus();
    return false;
  }

  handleKeyReleased(key) { this.heldDirections.delete(key); }

  processHeldMovement(p) {
    if (this.ended || this.player.isMoving || this.heldDirections.size === 0) return;
    const key = Array.from(this.heldDirections).at(-1);
    const direction = DIRECTIONS.find((item) => item.key === key);
    if (direction) this.movePlayer(p, direction);
  }

  movePlayer(p, direction) {
    if (this.player.isMoving) return;
    this.player.direction = direction.sprite;
    const x = this.player.x + direction.x; const y = this.player.y + direction.y;
    if (!this.isPlayerWalkable(x, y)) return;
    this.startActorMove(this.player, x, y, p.frameCount);
  }

  interact() {
    if (this.getTile(this.player.x, this.player.y) === TILE.KEY) {
      this.inventory.push("key");
      this.map[this.player.y][this.player.x] = TILE.FLOOR;
      this.message = "열쇠를 획득했습니다. 잠긴 문을 열 수 있습니다.";
      return;
    }
    const direction = DIRECTIONS.find((item) => item.sprite === this.player.direction);
    const x = this.player.x + direction.x; const y = this.player.y + direction.y;
    if (this.getTile(x, y) !== TILE.LOCKED_DOOR) { this.message = "조사할 수 있는 것이 없습니다."; return; }
    if (!this.inventory.includes("key")) { this.message = "문이 잠겨 있습니다. 열쇠가 필요합니다."; return; }
    this.map[y][x] = TILE.OPEN_DOOR;
    this.monster.active = true;
    this.monster.nextMoveAt = this.sketch.millis() + MONSTER_MOVE_INTERVAL;
    this.message = "문이 열렸습니다. 아오오니가 BFS 최단 경로로 추격합니다!";
  }

  getTile(x, y) { return this.map[y]?.[x]; }
  createActor(x, y, direction) { return { x, y, renderX: x, renderY: y, fromX: x, fromY: y, direction, moveStartFrame: 0, isMoving: false }; }
  startActorMove(actor, x, y, frameCount) {
    actor.fromX = actor.renderX; actor.fromY = actor.renderY;
    actor.x = x; actor.y = y; actor.moveStartFrame = frameCount; actor.isMoving = true;
  }
  updateActorAnimation(p, actor) {
    if (!actor.isMoving) return { x: actor.x, y: actor.y, frame: 0 };
    const progress = Math.min((p.frameCount - actor.moveStartFrame) / MOVE_FRAMES, 1);
    const eased = progress * progress * (3 - 2 * progress);
    actor.renderX = p.lerp(actor.fromX, actor.x, eased);
    actor.renderY = p.lerp(actor.fromY, actor.y, eased);
    if (progress === 1) {
      actor.isMoving = false; actor.renderX = actor.x; actor.renderY = actor.y;
      if (actor === this.player) this.onPlayerArrive(p);
    }
    return { x: actor.renderX, y: actor.renderY, frame: Math.min(MOVE_FRAMES - 1, Math.floor(progress * MOVE_FRAMES)) };
  }
  getSprite(direction, frame) {
    const frames = this.sprites[direction] ?? [];
    const spriteIndex = Math.min(SPRITE_FRAMES - 1, Math.floor(frame / (MOVE_FRAMES / SPRITE_FRAMES)));
    return frames[spriteIndex];
  }
  onPlayerArrive(p) {
    if (this.samePosition(this.player, this.monster) && this.monster.active) this.finish(p, "아오오니에게 붙잡혔습니다. GAME OVER");
    else if (this.getTile(this.player.x, this.player.y) === TILE.EXIT) this.finish(p, "탈출 성공! R 키 또는 처음부터 버튼으로 다시 시작할 수 있습니다.");
  }
  isPlayerWalkable(x, y) { return ![undefined, TILE.WALL, TILE.LOCKED_DOOR].includes(this.getTile(x, y)); }
  isMonsterWalkable(x, y) { return this.isPlayerWalkable(x, y); }
  positionKey(x, y) { return `${x},${y}`; }
  samePosition(a, b) { return a.x === b.x && a.y === b.y; }
  finish(p, message) { this.ended = true; this.message = message; this.updateStatus(); p.noLoop(); }
  updateStatus() {
    const key = this.inventory.includes("key") ? "획득" : "없음";
    this.statusElement.textContent = `열쇠: ${key}${this.monster.active ? " · BFS 추격 중" : ""}`;
  }

  drawFlashlight(p, lightX, lightY) {
    const context = p.drawingContext; context.save(); context.fillStyle = "rgba(0, 0, 0, 0.26)"; context.beginPath();
    context.rect(0, 0, p.width, p.height); context.arc(lightX, lightY, 300, 0, p.TWO_PI); context.fill("evenodd"); context.restore();
  }
  drawMessage(p) {
    p.fill(0, 0, 0, 195); p.noStroke(); p.rect(14, p.height - 58, Math.min(p.width - 28, 780), 44, 7);
    p.fill(255); p.textSize(15); p.textAlign(p.LEFT, p.CENTER); p.text(this.message, 28, p.height - 36, Math.min(p.width - 56, 740));
  }
}
