const TILE_SIZE = 64;
const MOVE_FRAMES = 12;
const SPRITE_FRAMES = 4;

const MONSTER_MOVE_INTERVAL = 180;

const PLAYER_SPEED_PX = 365;
const MONSTER_SPEED_PX = 170;

const SPRITE_FOLDER = "images/";

const TILE = {
  FLOOR: 0,
  WALL: 1,
  KEY: 2,
  LOCKED_DOOR: 3,
  EXIT: 4,
  OPEN_DOOR: 5,
  STAIRS: 6,
};

const DIRECTIONS = [
  { key: "w", x: 0, y: -1, sprite: "W" },
  { key: "a", x: -1, y: 0, sprite: "A" },
  { key: "s", x: 0, y: 1, sprite: "S" },
  { key: "d", x: 1, y: 0, sprite: "D" },
];

// 0: 길
// 1: 벽
// 2: 열쇠
// 3: 잠긴 문
// 4: 출구
// 5: 열린 문
// 6: 계단
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
    this.container = container;
    this.statusElement = statusElement;

    this.resetState();

    this.sketch = new window.p5(
      (p) => this.createSketch(p),
      container
    );
  }

  resetState() {
    this.map = INITIAL_MAP.map((row) => [...row]);

    this.map[KEY_POSITION.y][KEY_POSITION.x] = TILE.KEY;
    this.map[EXIT_POSITION.y][EXIT_POSITION.x] = TILE.EXIT;

    this.player = this.createActor(
      SPAWN.x,
      SPAWN.y,
      "S",
      PLAYER_SPEED_PX
    );

    this.monster = {
      ...this.createActor(
        MONSTER_SPAWN.x,
        MONSTER_SPAWN.y,
        "S",
        MONSTER_SPEED_PX
      ),
      active: true,
      nextMoveAt: 1000,
    };

    this.inventory = [];

    // 현재 누르고 있는 방향
    this.heldDirections = new Set();

    // 가장 최근에 누른 방향
    this.lastPressedDirection = null;

    this.ended = false;

    this.message = "열쇠를 찾아 잠긴 문을 열고 탈출하세요.";
  }

  restart() {
    this.resetState();

    this.sketch?.loop();

    this.updateStatus();
  }

  toggleFullscreen() {
    this.sketch.fullscreen(!this.sketch.fullscreen());
  }

  createSketch(p) {
    this.sprites = { A: [], D: [], S: [], W: [] };
    this.monsterSprites = { A: [], D: [], S: [], W: [] };
    const loadSprite = (name) => p.loadImage(`${SPRITE_FOLDER}${name}`, undefined, () => { this.spriteLoadFailed = true; });
    const monsterDirectionNames = { W: "up", A: "left", S: "down", D: "right" };
    p.preload = () => Object.keys(this.sprites).forEach((dir) => {
      this.sprites[dir] = Array.from({ length: SPRITE_FRAMES }, (_, index) => loadSprite(`${dir}${index + 1}.png`));
      this.monsterSprites[dir] = Array.from(
        { length: SPRITE_FRAMES },
        (_, index) => loadSprite(`monster_${monsterDirectionNames[dir]}_${index + 1}.png`),
      );
    });
    p.setup = () => { p.createCanvas(320, 320); p.frameRate(30); p.noSmooth(); p.textFont("sans-serif"); this.resizeCanvas(p); this.updateStatus(); };
    p.draw = () => this.draw(p);

    p.keyPressed = () => {
      this.handleKey(p, p.key.toLowerCase());
      return false;
    };

    p.keyReleased = () => {
      this.handleKeyReleased(p.key.toLowerCase());
      return false;
    };

    p.windowResized = () => {
      this.resizeCanvas(p);
    };
  }

  resizeCanvas(p) {
    const frame = this.container.parentElement;

    p.resizeCanvas(
      Math.max(frame.clientWidth, 320),
      Math.max(frame.clientHeight, 320)
    );
  }

  draw(p) {
  this.processHeldMovement(p);

  const playerAnimation = {
    x: this.player.px / TILE_SIZE,
    y: this.player.py / TILE_SIZE,
    frame: this.heldDirections.size > 0
      ? Math.floor((p.millis() / 100) % MOVE_FRAMES)
      : 0
  };

    p.background(10, 10, 14);

    const cameraX =
      p.width / 2 -
      (playerAnimation.x * TILE_SIZE + TILE_SIZE / 2);

    const cameraY =
      p.height / 2 -
      (playerAnimation.y * TILE_SIZE + TILE_SIZE / 2);

    const lightX =
      cameraX +
      playerAnimation.x * TILE_SIZE +
      TILE_SIZE / 2;

    const lightY =
      cameraY +
      playerAnimation.y * TILE_SIZE +
      TILE_SIZE / 2;

    p.push();

    p.translate(cameraX, cameraY);

    this.drawMap(p);
    this.drawPlayer(p, playerAnimation);
    this.drawMonster(p);

    p.pop();

    this.drawFlashlight(p, lightX, lightY);
    this.drawMessage(p);
  }

  drawMap(p) {
    const colors = {
      0: [32, 32, 38],
      1: [55, 45, 65],
      2: [190, 150, 65],
      3: [120, 60, 25],
      4: [35, 140, 90],
      5: [145, 97, 48],
      6: [54, 105, 155],
    };

    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;

        p.fill(...colors[tile]);
        p.stroke(15, 15, 20);

        p.rect(
          px,
          py,
          TILE_SIZE,
          TILE_SIZE
        );

        if (tile === TILE.KEY) {
          p.fill(255, 225, 125);
          p.noStroke();

          p.circle(
            px + TILE_SIZE / 2,
            py + TILE_SIZE / 2,
            16
          );
        }

        if (tile === TILE.EXIT) {
          p.fill(150, 245, 190);
          p.noStroke();

          p.triangle(
            px + 19,
            py + 47,
            px + 32,
            py + 16,
            px + 45,
            py + 47
          );
        }

        if (tile === TILE.STAIRS) {
          p.stroke(155, 205, 240);
          p.strokeWeight(3);

          for (let i = 0; i < 4; i++) {
            p.line(
              px + 12,
              py + 16 + i * 11,
              px + 52,
              py + 16 + i * 11
            );
          }

          p.strokeWeight(1);
        }
      });
    });
  }

  drawPlayer(p, animation) {
    const {
      x,
      y,
      frame,
    } = animation;

    const image = this.getSprite(
      this.player.direction,
      frame
    );

    const pixelX = x * TILE_SIZE;
    const pixelY = y * TILE_SIZE;

    if (
      image?.width > 1 &&
      image?.height > 1
    ) {
      p.imageMode(p.CENTER);

      p.image(
        image,
        pixelX + TILE_SIZE / 2,
        pixelY + TILE_SIZE / 2,
        TILE_SIZE,
        TILE_SIZE
      );

      p.imageMode(p.CORNER);
    } else {
      p.fill(230, 230, 240);
      p.noStroke();

      p.circle(
        pixelX + 32,
        pixelY + 32,
        40
      );

      p.fill(45, 35, 65);

      p.circle(
        pixelX + 32,
        pixelY + 31,
        10
      );
    }
  }

  drawMonster(p) {
    if (!this.monster.active || this.ended) {
      return;
    }

    if (
      !this.monster.isMoving &&
      p.millis() >= this.monster.nextMoveAt
    ) {
      this.moveMonsterWithBFS(p);

      this.monster.nextMoveAt =
        p.millis() + MONSTER_MOVE_INTERVAL;
    }
    const { x, y, frame } = this.updateActorAnimation(p, this.monster);
    const drawX = x * TILE_SIZE; const drawY = y * TILE_SIZE;
    const image = this.getMonsterSprite(this.monster.direction, frame);
    if (image?.width > 1 && image?.height > 1) {
      p.imageMode(p.CENTER);
      p.image(image, drawX + TILE_SIZE / 2, drawY + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
      p.imageMode(p.CORNER);
    } else {
      p.fill(116, 70, 212); p.noStroke(); p.rect(drawX + 7, drawY + 7, 50, 50, 10);
      p.fill(235, 225, 255); p.circle(drawX + 23, drawY + 28, 11); p.circle(drawX + 42, drawY + 28, 11);
      p.fill(25, 15, 45); p.circle(drawX + 23, drawY + 28, 5); p.circle(drawX + 42, drawY + 28, 5);
    }
    if (!this.monster.isMoving && this.samePosition(this.monster, this.player)) this.finish(p, "아오오니에게 붙잡혔습니다. GAME OVER");
  }

  // Queue를 사용하는 BFS
  // 아오오니에서 플레이어까지의 최단 경로를 찾고
  // 그 경로의 다음 한 칸으로 이동한다.
  moveMonsterWithBFS(p) {
    const startKey = this.positionKey(
      this.monster.x,
      this.monster.y
    );

    const targetKey = this.positionKey(
      this.getActorCell(this.player).x,
      this.getActorCell(this.player).y
    );

    const queue = [
      {
        x: this.monster.x,
        y: this.monster.y,
      },
    ];

    const parents = new Map([
      [startKey, null],
    ]);

    let head = 0;

    while (head < queue.length) {
      const current = queue[head++];

      const currentKey = this.positionKey(
        current.x,
        current.y
      );

      if (currentKey === targetKey) {
        break;
      }

      for (const direction of DIRECTIONS) {
        const next = {
          x: current.x + direction.x,
          y: current.y + direction.y,
        };

        const nextKey = this.positionKey(
          next.x,
          next.y
        );

        if (
          !parents.has(nextKey) &&
          this.isMonsterWalkable(
            next.x,
            next.y
          )
        ) {
          parents.set(
            nextKey,
            currentKey
          );

          queue.push(next);
        }
      }
    }

    if (!parents.has(targetKey)) {
      return;
    }

    let stepKey = targetKey;

    while (
      parents.get(stepKey) !== startKey &&
      parents.get(stepKey) !== null
    ) {
      stepKey = parents.get(stepKey);
    }

    if (stepKey !== startKey) {
      const [
        x,
        y,
      ] = stepKey
        .split(",")
        .map(Number);

      const isPlayerCell = stepKey === targetKey;
      this.startActorMove(
        this.monster,
        isPlayerCell ? this.player.px / TILE_SIZE : x,
        isPlayerCell ? this.player.py / TILE_SIZE : y
      );
    }
  }

  handleKey(p, key) {
    if (key === "r") {
      this.restart();
      return false;
    }

    if (this.ended) {
      return false;
    }

    const direction =
      DIRECTIONS.find(
        (item) => item.key === key
      );

    if (direction) {
      // 누른 방향을 저장
      this.heldDirections.add(key);

      // 가장 최근에 누른 방향 저장
      this.lastPressedDirection = key;

      // 방향은 즉시 변경
      this.player.direction =
        direction.sprite;

      // 이동 중이 아니면 즉시 이동
    } else if (key === "e") {
      this.interact();
    }

    this.updateStatus();

    return false;
  }

  handleKeyReleased(key) {
    // 키를 떼면 반드시 제거
    this.heldDirections.delete(key);

    // 현재 마지막 방향을 떼었다면
    // 남아 있는 방향 중 가장 최근 방향을 찾는다.
    if (
      key === this.lastPressedDirection
    ) {
      const remaining =
        Array.from(
          this.heldDirections
        );

      this.lastPressedDirection =
        remaining.length > 0
          ? remaining[remaining.length - 1]
          : null;
    }
  }

  processHeldMovement(p) {
  if (this.ended) return;
  if (this.heldDirections.size === 0) return;

  const key = Array.from(this.heldDirections).at(-1);
  const direction = DIRECTIONS.find(
    (item) => item.key === key
  );

  if (!direction) return;

  // 현재 누르고 있는 방향을 바라봄
  this.player.direction = direction.sprite;

  // 실제 연속 이동
  const distance = this.player.speed * p.deltaTime / 1000;

  const dx = direction.x * distance;
  const dy = direction.y * distance;

  this.movePlayerContinuous(dx, dy);
}

  movePlayerContinuous(dx, dy) {
  const actor = this.player;

  const nextPx = actor.px + dx;
  const nextPy = actor.py + dy;

  if (this.canOccupyPixel(nextPx, nextPy)) {
    actor.px = nextPx;
    actor.py = nextPy;

    actor.x = actor.px / TILE_SIZE;
    actor.y = actor.py / TILE_SIZE;
    const tileX = Math.floor(actor.x);
    const tileY = Math.floor(actor.y);
    if (this.getTile(tileX, tileY) === TILE.KEY) {
      this.inventory.push("key");
      this.map[tileY][tileX] = TILE.FLOOR;
    }
    if (this.getTile(tileX, tileY) === TILE.EXIT) this.finish(this.sketch, "탈출 성공! R 키로 다시 시작할 수 있습니다.");
  }
}

  getTile(x, y) {
    return this.map[y]?.[x];
  }

  createActor(
    x,
    y,
    direction,
    speed
  ) {
    return {
      x,
      y,

      targetX: x,
      targetY: y,

      px: x * TILE_SIZE,
      py: y * TILE_SIZE,

      targetPx: x * TILE_SIZE,
      targetPy: y * TILE_SIZE,

      direction,

      speed,

      animationMs: 0,

      isMoving: false,
    };
  }

  startActorMove(
    actor,
    x,
    y
  ) {
    actor.targetX = x;
    actor.targetY = y;

    actor.targetPx =
      x * TILE_SIZE;

    actor.targetPy =
      y * TILE_SIZE;

    actor.animationMs = 0;
    actor.isMoving = true;
  }

  updateActorAnimation(
    p,
    actor
  ) {
    // 이동하지 않는 상태
    if (!actor.isMoving) {
      return {
        x: actor.px / TILE_SIZE,
        y: actor.py / TILE_SIZE,
        frame: 0,
      };
    }

    const elapsedMs =
      Math.min(
        p.deltaTime,
        50
      );

    const dx =
      actor.targetPx - actor.px;

    const dy =
      actor.targetPy - actor.py;

    const distance =
      Math.hypot(dx, dy);

    const distanceThisFrame =
      actor.speed *
      elapsedMs /
      1000;

    actor.animationMs +=
      elapsedMs;

    // 목적지에 도착했거나
    // 이번 프레임 이동량이 남은 거리보다 크면
    // 정확히 목적지에 고정한다.
    if (
      distance <=
      distanceThisFrame
    ) {
      actor.px =
        actor.targetPx;

      actor.py =
        actor.targetPy;

      actor.x =
        actor.targetX;

      actor.y =
        actor.targetY;

      actor.isMoving = false;

      if (
        actor === this.player
      ) {
        this.onPlayerArrive(p);
      }
    } else {
      actor.px +=
        (dx / distance) *
        distanceThisFrame;

      actor.py +=
        (dy / distance) *
        distanceThisFrame;
    }

    const frame =
      Math.floor(
        (
          actor.animationMs /
          (400 / MOVE_FRAMES)
        )
      ) % MOVE_FRAMES;

    return {
      x:
        actor.px /
        TILE_SIZE,

      y:
        actor.py /
        TILE_SIZE,

      frame,
    };
  }

  getSprite(
    direction,
    frame
  ) {
    const frames =
      this.sprites[
        direction
      ] ?? [];

    if (
      frames.length === 0
    ) {
      return undefined;
    }

    const spriteIndex =
      Math.min(
        SPRITE_FRAMES - 1,
        Math.floor(
          frame /
          (
            MOVE_FRAMES /
            SPRITE_FRAMES
          )
        )
      );

    return frames[
      spriteIndex
    ];
  }

  onPlayerArrive(p) {
    // 몬스터와 같은 칸이면 게임 오버
    if (
      this.samePosition(
        this.player,
        this.monster
      ) &&
      this.monster.active
    ) {
      this.finish(
        p,
        "아오오니에게 붙잡혔습니다. GAME OVER"
      );

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
  createActor(x, y, direction, speed = PLAYER_SPEED_PX) {
    return { x, y, px: x * TILE_SIZE, py: y * TILE_SIZE, targetX: x, targetY: y, targetPx: x * TILE_SIZE, targetPy: y * TILE_SIZE, direction, speed, animationMs: 0, isMoving: false };
  }
  startActorMove(actor, x, y, frameCount) {
    const direction = DIRECTIONS.find((item) => item.x === x - actor.x && item.y === y - actor.y);
    if (direction) actor.direction = direction.sprite;
    actor.targetX = x; actor.targetY = y; actor.targetPx = x * TILE_SIZE; actor.targetPy = y * TILE_SIZE; actor.animationMs = 0; actor.isMoving = true;
  }
  updateActorAnimation(p, actor) {
    if (!actor.isMoving) return { x: actor.px / TILE_SIZE, y: actor.py / TILE_SIZE, frame: 0 };
    const dx = actor.targetPx - actor.px; const dy = actor.targetPy - actor.py;
    const distance = Math.hypot(dx, dy); const distanceThisFrame = actor.speed * Math.min(p.deltaTime, 50) / 1000;
    actor.animationMs += Math.min(p.deltaTime, 50);
    if (distance <= distanceThisFrame) {
      actor.px = actor.targetPx; actor.py = actor.targetPy; actor.x = actor.targetX; actor.y = actor.targetY; actor.isMoving = false;
    } else { actor.px += (dx / distance) * distanceThisFrame; actor.py += (dy / distance) * distanceThisFrame; }
    if (actor === this.monster && this.monsterCaughtPlayer()) this.finish(p, "괴물에게 붙잡혔습니다. GAME OVER");
    return { x: actor.px / TILE_SIZE, y: actor.py / TILE_SIZE, frame: Math.floor(actor.animationMs / (400 / MOVE_FRAMES)) % MOVE_FRAMES };
  }
  getSprite(direction, frame) {
    const frames = this.sprites[direction] ?? [];
    const spriteIndex = Math.min(SPRITE_FRAMES - 1, Math.floor(frame / (MOVE_FRAMES / SPRITE_FRAMES)));
    return frames[spriteIndex];
  }
  getMonsterSprite(direction, frame) {
    const frames = this.monsterSprites[direction] ?? [];
    const spriteIndex = Math.min(SPRITE_FRAMES - 1, Math.floor(frame / (MOVE_FRAMES / SPRITE_FRAMES)));
    return frames[spriteIndex];
  }
  interact() {
    const direction = DIRECTIONS.find((item) => item.sprite === this.player.direction);
    const x = Math.floor(this.player.x) + direction.x;
    const y = Math.floor(this.player.y) + direction.y;
    if (this.getTile(x, y) !== TILE.LOCKED_DOOR) return;
    if (!this.inventory.includes("key")) { this.message = "문이 잠겨 있습니다. 열쇠가 필요합니다."; return; }
    this.map[y][x] = TILE.OPEN_DOOR;
    this.message = "문을 열었습니다.";
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
    const key =
      this.inventory.includes("key")
        ? "획득"
        : "없음";

    this.statusElement.textContent =
      `열쇠: ${key}${
        this.monster.active
          ? " · BFS 추격 중"
          : ""
      }`;
  }

  drawFlashlight(
    p,
    lightX,
    lightY
  ) {
    const context =
      p.drawingContext;

    context.save();

    context.fillStyle =
      "rgba(0, 0, 0, 0.26)";

    context.beginPath();

    context.rect(
      0,
      0,
      p.width,
      p.height
    );

    context.arc(
      lightX,
      lightY,
      300,
      0,
      p.TWO_PI
    );

    context.fill(
      "evenodd"
    );

    context.restore();
  }

  drawMessage(p) {
    p.fill(
      0,
      0,
      0,
      195
    );

    p.noStroke();

    p.rect(
      14,
      p.height - 58,
      Math.min(
        p.width - 28,
        780
      ),
      44,
      7
    );

    p.fill(255);

    p.textSize(15);

    p.textAlign(
      p.LEFT,
      p.CENTER
    );

    p.text(
      this.message,
      28,
      p.height - 36,
      Math.min(
        p.width - 56,
        740
      )
    );
  }
  
  getFootHitbox(actor, px = actor.px, py = actor.py) {
    return { left: px + 23, right: px + 41, top: py + 45, bottom: py + 60 };
  }

  getActorCell(actor) {
    const hitbox = this.getFootHitbox(actor);
    return { x: Math.floor((hitbox.left + hitbox.right) / 2 / TILE_SIZE), y: Math.floor(hitbox.bottom / TILE_SIZE) };
  }

  canOccupyPixel(px, py) {
    const hitbox = this.getFootHitbox(this.player, px, py);
    const left = Math.floor(hitbox.left / TILE_SIZE);
    const right = Math.floor(hitbox.right / TILE_SIZE);
    const top = Math.floor(hitbox.top / TILE_SIZE);
    const bottom = Math.floor(hitbox.bottom / TILE_SIZE);
    return this.isPlayerWalkable(left, top) && this.isPlayerWalkable(right, top) && this.isPlayerWalkable(left, bottom) && this.isPlayerWalkable(right, bottom);
  }

  getMonsterCaptureHitbox() {
    return {
      left: this.monster.px + 17,
      right: this.monster.px + 47,
      top: this.monster.py + 24,
      bottom: this.monster.py + 52,
    };
  }

  monsterCaughtPlayer() {
    const monster = this.getMonsterCaptureHitbox();
    const player = this.getFootHitbox(this.player);
    return monster.left < player.right && monster.right > player.left && monster.top < player.bottom && monster.bottom > player.top;
  }

  movePlayerContinuous(dx, dy) {
    const nextPx = this.player.px + dx;
    const nextPy = this.player.py + dy;
    if (!this.canOccupyPixel(nextPx, nextPy)) return;
    this.player.px = nextPx;
    this.player.py = nextPy;
    this.player.x = nextPx / TILE_SIZE;
    this.player.y = nextPy / TILE_SIZE;
    const cell = this.getActorCell(this.player);
    const tile = this.getTile(cell.x, cell.y);
    if (tile === TILE.KEY) {
      this.inventory.push("key");
      this.map[cell.y][cell.x] = TILE.FLOOR;
      this.message = "열쇠를 획득했습니다.";
    } else if (tile === TILE.EXIT) {
      this.finish(this.sketch, "탈출 성공! R 키로 다시 시작할 수 있습니다.");
    }
    if (this.monsterCaughtPlayer()) this.finish(this.sketch, "괴물에게 붙잡혔습니다. GAME OVER");
  }

  interact() {
    const direction = DIRECTIONS.find((item) => item.sprite === this.player.direction);
    const cell = this.getActorCell(this.player);
    const x = cell.x + direction.x;
    const y = cell.y + direction.y;
    if (this.getTile(x, y) !== TILE.LOCKED_DOOR) {
      this.message = "이 방향에는 상호작용할 대상이 없습니다.";
      return;
    }
    if (!this.inventory.includes("key")) {
      this.message = "문이 잠겨 있습니다. 열쇠가 필요합니다.";
      return;
    }
    this.map[y][x] = TILE.OPEN_DOOR;
    this.message = "문을 열었습니다.";
  }
}

