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
const SECOND_FLOOR_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 6, 6, 6, 1, 1, 6, 6, 6, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const SPAWN = { x: 2, y: 1 };
const EXIT_POSITION = { x: 28, y: 28 };
const MONSTER_SPAWN = { x: 15, y: 12 };
const SECOND_FLOOR_SPAWN = { x: 28, y: 7 };

// ============================================================
// 회사 테마: 문 & 카드키 정의
// 같은 keyName을 공유하는 항목은 카드키 1장으로 동시에 개방됩니다.
// ============================================================
const DOORS = [
  // 1층 (Floor 0) — 로비 출입증으로 복도 두 구역 모두 개방
  {
    floor: 0,
    name: "로비 보안문",
    keyName: "로비 출입증",
    tiles: [
      { x: 17, y: 10 }, { x: 17, y: 11 }, // 복도 A
      { x: 14, y: 13 }, { x: 15, y: 13 }, // 복도 B (같은 출입증으로 동시 개방)
    ],
  },
  { floor: 0, name: "지하창고 보안문",  keyName: "지하창고 출입증", tiles: [{ x: 20, y: 21 }, { x: 21, y: 21 }] },
  { floor: 0, name: "비상 탈출구",      keyName: "비상구 마스터키",  tiles: [{ x: 27, y: 21 }] },

  // 2층 (Floor 1)
  { floor: 1, name: "IT실 출입문",      keyName: "IT실 출입증",       tiles: [{ x: 12, y: 4 },  { x: 12, y: 5 }]  },
  { floor: 1, name: "연구소 출입문",    keyName: "연구소 출입증",     tiles: [{ x: 12, y: 13 }, { x: 12, y: 14 }] },
  { floor: 1, name: "자료실 출입문",    keyName: "자료실 출입증",     tiles: [{ x: 12, y: 20 }]                   },
  { floor: 1, name: "이사실 출입문",    keyName: "이사실 출입증",     tiles: [{ x: 20, y: 16 }, { x: 20, y: 17 }] },
  { floor: 1, name: "회의실 출입문",    keyName: "회의실 출입증",     tiles: [{ x: 21, y: 10 }, { x: 22, y: 10 }] },
  { floor: 1, name: "보안구역 출입문",  keyName: "보안구역 출입증",   tiles: [{ x: 14, y: 22 }, { x: 15, y: 22 }] },
  { floor: 1, name: "CEO실 출입문",    keyName: "CEO실 마스터키",    tiles: [{ x: 23, y: 22 }, { x: 24, y: 22 }] },
];

const KEYS = [
  // 1층 카드키
  { floor: 0, x: 10, y: 3,  keyName: "로비 출입증" },
  { floor: 0, x: 8,  y: 8,  keyName: "IT실 출입증" },
  { floor: 0, x: 3,  y: 26, keyName: "비상구 마스터키" },

  // 2층 카드키
  { floor: 1, x: 2,  y: 2,  keyName: "이사실 출입증" },
  { floor: 1, x: 22, y: 14, keyName: "연구소 출입증" },
  { floor: 0, x: 10, y: 17, keyName: "지하창고 출입증" },
  { floor: 1, x: 7,  y: 14, keyName: "자료실 출입증" },
  { floor: 1, x: 3,  y: 24, keyName: "보안구역 출입증" },
  { floor: 1, x: 17, y: 26, keyName: "CEO실 마스터키" },
  { floor: 1, x: 25, y: 26, keyName: "회의실 출입증" },
];

export class EscapeGame {
  constructor(container, statusElement) {
    this.container = container;
    this.statusElement = statusElement;

    this.controls = { up: "w", left: "a", down: "s", right: "d", interact: "e", inventory: "f" };
    this.resetState();

    this.sketch = new window.p5(
      (p) => this.createSketch(p),
      container
    );
  }

  resetState() {
    this.currentFloor = 0;

    // 층별 독립 맵 복사본 생성 (층 이동 시에도 열린 문과 열쇠 상태 보존)
    this.floorMaps = [
      INITIAL_MAP.map((row) => [...row]),
      SECOND_FLOOR_MAP.map((row) => [...row]),
    ];

    // 열쇠 배치 초기화
    this.placedKeys = KEYS.map((k) => ({ ...k, taken: false }));
    for (const k of this.placedKeys) {
      this.floorMaps[k.floor][k.y][k.x] = TILE.KEY;
    }

    // 출구 설정
    this.floorMaps[0][EXIT_POSITION.y][EXIT_POSITION.x] = TILE.EXIT;

    this.map = this.floorMaps[0];

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
      active: false,
      nextMoveAt: 1000,
    };

    this.inventory = [];
    this.heldItem = null;

    // 현재 누르고 있는 방향
    this.heldDirections = new Set();

    this.inventoryOpen = false;

    // 가장 최근에 누른 방향
    this.lastPressedDirection = null;

    this.stairTransitionLocked = false;
    this.ended = false;
    this.paused = false;

    this.message = "[안내] 카드키를 획득하여 보안문을 개방하고 건물을 탈출하세요. (E: 상호작용 / F: 인벤토리)";
  }

  restart() {
    this.resetState();
    this.updateStatus();
  }

  pause() { this.paused = true; this.heldDirections.clear(); this.sketch?.noLoop(); }
  resume() { if (!this.ended) { this.paused = false; this.sketch?.loop(); } }
  getBinding(action) { return this.controls[action]; }
  setBinding(action, key) {
    if (!key || key === "escape") return;
    Object.keys(this.controls).forEach((name) => { if (name !== action && this.controls[name] === key) this.controls[name] = ""; });
    this.controls[action] = key;
  }
  directionForKey(key) {
    const action = Object.entries(this.controls).find(([, value]) => value === key)?.[0];
    return ({ up: DIRECTIONS[0], left: DIRECTIONS[1], down: DIRECTIONS[2], right: DIRECTIONS[3] })[action];
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
    p.setup = () => { p.createCanvas(320, 320); p.frameRate(30); p.noSmooth(); p.textFont("sans-serif"); this.resizeCanvas(p); this.updateStatus(); p.noLoop(); };
    p.draw = () => this.draw(p);

    p.keyPressed = () => {
      this.handleKey(p, p.key.toLowerCase());
      return false;
    };

    p.keyReleased = () => {
      this.handleKeyReleased(p.key.toLowerCase());
      return false;
    };

    p.mousePressed = () => {
      if (this.inventoryOpen) {
        this.handleInventoryClick(p.mouseX, p.mouseY);
        return false;
      }
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

    p.push();

    p.translate(cameraX, cameraY);

    this.drawMap(p);
    this.drawPlayer(p, playerAnimation);
    this.drawMonster(p);

    p.pop();

    this.drawMessage(p);

    if (this.inventoryOpen) {
      this.drawInventory(p);
    }
  }

  drawMap(p) {
    // 바닥 색상: 1층은 따뜻한 회사 로비 / 2층은 차가운 사무실 톤
    const isFloor2 = this.currentFloor === 1;
    const floorColor = isFloor2 ? [28, 34, 45] : [35, 30, 42];
    const wallColor  = isFloor2 ? [50, 60, 80] : [58, 48, 72];

    const colors = {
      0: floorColor,
      1: wallColor,
      2: [190, 150, 65],
      3: [120, 60, 25],
      4: [35, 180, 100],
      5: [145, 97, 48],
      6: [54, 105, 155],
    };

    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        const px = x * TILE_SIZE;
        const py = y * TILE_SIZE;

        p.fill(...colors[tile]);
        p.stroke(12, 12, 18);
        p.strokeWeight(1);
        p.rect(px, py, TILE_SIZE, TILE_SIZE);

        // === 출구 (비상구) ===
        if (tile === TILE.EXIT) {
          p.push();
          p.noStroke();
          p.fill(50, 220, 130);
          // 비상구 화살표 아이콘
          p.triangle(px + 20, py + 48, px + 32, py + 16, px + 44, py + 48);
          p.fill(255);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(8);
          p.text("EXIT", px + 32, py + 54);
          p.pop();
        }

        // === 계단 ===
        if (tile === TILE.STAIRS) {
          p.stroke(155, 205, 240);
          p.strokeWeight(3);
          for (let i = 0; i < 4; i++) {
            p.line(px + 12, py + 16 + i * 11, px + 52, py + 16 + i * 11);
          }
          p.strokeWeight(1);
        }
      });
    });

  }

  // =============================================================
  // 회사 인테리어 장식
  // =============================================================
  drawOfficeDecorations(p) {
    p.push();
    p.noStroke();
    const T = TILE_SIZE;

    if (this.currentFloor === 0) {
      // ─── 1층: 로비/복도/창고 ───────────────────────────────

      // 로비 안내 데스크
      this._drawDesk(p, 4 * T, 3 * T);
      this._drawDesk(p, 5 * T, 3 * T);
      // 로비 화분
      this._drawPlant(p, 2 * T, 1 * T);
      this._drawPlant(p, 6 * T, 1 * T);
      // 복도 의자
      this._drawChair(p, 3 * T, 5 * T);
      this._drawChair(p, 4 * T, 5 * T);

      // 대형 회의실 / 사무공간
      this._drawDesk(p, 8 * T,  8 * T);  this._drawMonitor(p, 8 * T,  7 * T);
      this._drawDesk(p, 10 * T, 8 * T);  this._drawMonitor(p, 10 * T, 7 * T);
      this._drawDesk(p, 12 * T, 8 * T);  this._drawMonitor(p, 12 * T, 7 * T);
      this._drawDesk(p, 8 * T,  11 * T); this._drawMonitor(p, 8 * T,  12 * T);
      this._drawDesk(p, 10 * T, 11 * T); this._drawMonitor(p, 10 * T, 12 * T);
      this._drawDesk(p, 12 * T, 11 * T); this._drawMonitor(p, 12 * T, 12 * T);

      // 창고 구역: 서버랙 + 박스
      this._drawServerRack(p, 26 * T, 11 * T);
      this._drawServerRack(p, 27 * T, 11 * T);
      this._drawBox(p, 26 * T, 14 * T);
      this._drawBox(p, 27 * T, 14 * T);
      this._drawBox(p, 26 * T, 15 * T);

      // 지하 창고
      this._drawBox(p, 3 * T,  24 * T);
      this._drawBox(p, 5 * T,  24 * T);
      this._drawBox(p, 7 * T,  24 * T);
      this._drawBox(p, 9 * T,  24 * T);
      this._drawFilingCabinet(p, 3 * T,  26 * T);
      this._drawFilingCabinet(p, 5 * T,  26 * T);
      this._drawFilingCabinet(p, 16 * T, 24 * T);
      this._drawFilingCabinet(p, 18 * T, 24 * T);
      this._drawFilingCabinet(p, 20 * T, 24 * T);

      // 비상구 주변 서버룸
      this._drawServerRack(p, 26 * T, 23 * T);
      this._drawServerRack(p, 27 * T, 25 * T);

      // 방 이름 표지판
      this._drawRoomSign(p,  8 * T, 1 * T,  "[ 로비 ]" , 80);
      this._drawRoomSign(p, 10 * T, 14 * T, "[ 사무실 ]", 80);
      this._drawRoomSign(p, 26 * T, 10 * T, "[ 창고 ]" , 60);
      this._drawRoomSign(p,  8 * T, 22 * T, "[ 지하창고 ]", 80);
      this._drawRoomSign(p, 26 * T, 22 * T, "[ 서버룸 ]", 60);

    } else {
      // ─── 2층: 사무실 각 부서 ──────────────────────────────

      // IT실 (좌상: x1~11, y1~8)
      this._drawMonitor(p, 2 * T, 2 * T); this._drawMonitor(p, 4 * T, 2 * T);
      this._drawMonitor(p, 6 * T, 2 * T); this._drawMonitor(p, 8 * T, 2 * T);
      this._drawDesk(p,   2 * T, 3 * T);  this._drawDesk(p, 4 * T, 3 * T);
      this._drawDesk(p,   6 * T, 3 * T);  this._drawDesk(p, 8 * T, 3 * T);
      this._drawServerRack(p, 9 * T, 5 * T);
      this._drawServerRack(p, 9 * T, 6 * T);
      this._drawRoomSign(p, 4 * T, 1 * T, "[ IT실 ]", 80);

      // 메인 사무실 (중앙: x13~28, y1~21)
      for (let col = 0; col < 4; col++) {
        this._drawDesk(p, (14 + col * 3) * T, 3 * T);
        this._drawMonitor(p, (14 + col * 3) * T, 2 * T);
        this._drawDesk(p, (14 + col * 3) * T, 7 * T);
        this._drawMonitor(p, (14 + col * 3) * T, 8 * T);
        this._drawDesk(p, (14 + col * 3) * T, 12 * T);
        this._drawMonitor(p, (14 + col * 3) * T, 11 * T);
      }
      this._drawPlant(p, 27 * T, 2 * T);
      this._drawPlant(p, 13 * T, 2 * T);
      this._drawRoomSign(p, 18 * T, 1 * T, "[ 사무실 2층 ]", 90);

      // 계단 옆 임원구역
      this._drawPlant(p, 22 * T, 2 * T);
      this._drawPlant(p, 24 * T, 2 * T);

      // 연구소 (좌중: x1~11, y10~17)
      this._drawDesk(p, 2 * T, 11 * T);
      this._drawDesk(p, 5 * T, 11 * T);
      this._drawDesk(p, 8 * T, 11 * T);
      this._drawMonitor(p, 2 * T, 12 * T);
      this._drawMonitor(p, 5 * T, 12 * T);
      this._drawMonitor(p, 8 * T, 12 * T);
      this._drawFilingCabinet(p, 9 * T, 15 * T);
      this._drawRoomSign(p, 4 * T, 10 * T, "[ 연구소 ]", 80);

      // 회의실 A/B (우중 소방: x21~27, y11~18)
      this._drawConferenceTable(p, 22 * T, 13 * T);
      this._drawConferenceTable(p, 26 * T, 13 * T);
      this._drawRoomSign(p, 22 * T, 11 * T, "[ 회의실 A ]", 60);
      this._drawRoomSign(p, 26 * T, 11 * T, "[ 회의실 B ]", 60);

      // 자료실 (좌하: x1~11, y19~28)
      this._drawFilingCabinet(p, 2 * T, 20 * T);
      this._drawFilingCabinet(p, 4 * T, 20 * T);
      this._drawFilingCabinet(p, 6 * T, 20 * T);
      this._drawFilingCabinet(p, 8 * T, 20 * T);
      this._drawFilingCabinet(p, 2 * T, 23 * T);
      this._drawFilingCabinet(p, 4 * T, 23 * T);
      this._drawFilingCabinet(p, 6 * T, 23 * T);
      this._drawBox(p, 3 * T, 26 * T);
      this._drawBox(p, 5 * T, 26 * T);
      this._drawRoomSign(p, 4 * T, 19 * T, "[ 자료실 ]", 80);

      // 보안구역 (하중: x13~20, y23~28)
      this._drawMonitor(p, 14 * T, 25 * T);
      this._drawMonitor(p, 16 * T, 25 * T);
      this._drawDesk(p,   14 * T, 26 * T);
      this._drawDesk(p,   16 * T, 26 * T);
      this._drawServerRack(p, 19 * T, 25 * T);
      this._drawRoomSign(p, 15 * T, 23 * T, "[ 보안구역 ]", 80);

      // CEO실 (우하: x22~28, y23~28)
      this._drawExecutiveDesk(p, 24 * T, 25 * T);
      this._drawPlant(p, 23 * T, 24 * T);
      this._drawPlant(p, 27 * T, 24 * T);
      this._drawRoomSign(p, 24 * T, 23 * T, "[ CEO실 ]", 70);

      // 이사실 (우중 소방: x21~28, y16~18, 사실상 창 너머)
      this._drawRoomSign(p, 22 * T, 16 * T, "[ 이사실 ]", 60);
    }
    p.pop();
  }

  // ── 가구 헬퍼 ──────────────────────────────────────────────
  _drawDesk(p, px, py) {
    p.fill(110, 75, 45);
    p.rect(px + 6, py + 22, 52, 26, 3);
    p.fill(88, 58, 32);
    p.rect(px + 8,  py + 46, 8, 14);
    p.rect(px + 48, py + 46, 8, 14);
  }
  _drawMonitor(p, px, py) {
    p.fill(40, 45, 55);
    p.rect(px + 14, py + 14, 36, 26, 3);
    p.fill(80, 160, 255, 210);
    p.rect(px + 17, py + 17, 30, 20);
    p.fill(60, 65, 75);
    p.rect(px + 27, py + 40, 10, 8);
    p.rect(px + 20, py + 46, 24, 4);
  }
  _drawFilingCabinet(p, px, py) {
    p.fill(130, 135, 145);
    p.rect(px + 12, py + 6, 40, 56, 2);
    p.stroke(90, 95, 105);
    p.strokeWeight(1);
    p.line(px + 12, py + 26, px + 52, py + 26);
    p.line(px + 12, py + 45, px + 52, py + 45);
    p.noStroke();
    p.fill(170, 175, 185);
    p.rect(px + 26, py + 17, 12, 5);
    p.rect(px + 26, py + 36, 12, 5);
    p.rect(px + 26, py + 54, 12, 5);
  }
  _drawPlant(p, px, py) {
    p.fill(65, 115, 50);
    p.circle(px + 32, py + 22, 28);
    p.circle(px + 22, py + 30, 18);
    p.circle(px + 42, py + 30, 18);
    p.fill(85, 58, 30);
    p.rect(px + 26, py + 34, 12, 20, 2);
    p.fill(110, 78, 40);
    p.rect(px + 19, py + 50, 26, 10, 4);
  }
  _drawServerRack(p, px, py) {
    p.fill(25, 28, 38);
    p.rect(px + 6, py + 2, 52, 60, 3);
    for (let i = 0; i < 5; i++) {
      p.fill(35, 40, 52);
      p.rect(px + 10, py + 6 + i * 11, 44, 9, 1);
      p.fill(0, 220, 110);
      p.circle(px + 14, py + 11 + i * 11, 4);
      p.fill(i % 2 ? [0, 140, 255] : [255, 120, 30]);
      p.circle(px + 22, py + 11 + i * 11, 4);
    }
  }
  _drawBox(p, px, py) {
    p.fill(170, 130, 80);
    p.rect(px + 10, py + 16, 44, 40, 2);
    p.fill(140, 105, 60);
    p.rect(px + 10, py + 16, 44, 6);
    p.stroke(120, 90, 50);
    p.strokeWeight(1);
    p.line(px + 32, py + 16, px + 32, py + 56);
    p.noStroke();
  }
  _drawChair(p, px, py) {
    p.fill(55, 55, 75);
    p.circle(px + 32, py + 32, 36);
    p.fill(45, 45, 62);
    p.rect(px + 22, py + 6, 20, 24, 4);
  }
  _drawConferenceTable(p, px, py) {
    p.fill(100, 70, 40);
    p.ellipse(px + 32, py + 32, 48, 36);
    p.fill(120, 85, 50);
    p.ellipse(px + 32, py + 32, 38, 28);
  }
  _drawExecutiveDesk(p, px, py) {
    p.fill(60, 35, 15);
    p.rect(px - 10, py + 16, 84, 36, 5);
    p.fill(80, 50, 22);
    p.rect(px - 6, py + 20, 76, 28, 3);
    p.fill(30, 140, 255);
    p.rect(px + 16, py + 24, 20, 14, 2);  // 노트북 화면
    p.fill(20, 100, 200);
    p.rect(px + 8,  py + 37, 36, 4);
  }
  _drawRoomSign(p, px, py, label, w) {
    p.fill(0, 0, 0, 120);
    p.rect(px, py + 4, w, 18, 4);
    p.fill(200, 230, 255);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(9);
    p.text(label, px + w / 2, py + 13);
  }

  drawInventory(p) {
    // =========================
    // 인벤토리 전체 오버레이
    // =========================
    p.push();

    // 화면 어둡게
    p.fill(0, 0, 0, 190);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    // =========================
    // 인벤토리 패널
    // =========================
    const panelWidth = Math.min(820, p.width - 40);
    const panelHeight = Math.min(500, p.height - 40);

    const panelX = (p.width - panelWidth) / 2;
    const panelY = (p.height - panelHeight) / 2;

    // 패널
    p.fill(20, 20, 28);
    p.stroke(90, 90, 110);
    p.strokeWeight(2);
    p.rect(panelX, panelY, panelWidth, panelHeight, 12);

    // =========================
    // 제목
    // =========================
    p.noStroke();
    p.fill(245);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(26);
    p.text("INVENTORY", panelX + 28, panelY + 32);

    p.fill(120);
    p.textSize(13);
    p.text("아이템", panelX + 30, panelY + 58);

    // =========================
    // 왼쪽 : 주손
    // =========================
    const handAreaX = panelX + 30;
    const handAreaY = panelY + 95;

    const handWidth = panelWidth * 0.35;
    const handHeight = panelHeight - 145;

    // 주손 영역
    p.fill(27, 27, 38);
    p.stroke(70, 70, 90);
    p.strokeWeight(2);
    p.rect(
      handAreaX,
      handAreaY,
      handWidth,
      handHeight,
      10
    );

    // 주손 제목
    p.noStroke();
    p.fill(220);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);
    p.text(
      "주손",
      handAreaX + handWidth / 2,
      handAreaY + 35
    );

    // =========================
    // 주손 슬롯
    // =========================
    const handSlotSize = Math.min(
      handWidth * 0.62,
      handHeight * 0.55
    );

    const handSlotX =
      handAreaX + (handWidth - handSlotSize) / 2;

    const handSlotY =
      handAreaY + 65;

    // 슬롯
    p.fill(15, 15, 22);
    p.stroke(110, 110, 130);
    p.strokeWeight(2);
    p.rect(
      handSlotX,
      handSlotY,
      handSlotSize,
      handSlotSize,
      8
    );

    // =========================
    // 주손 아이템 표시
    // =========================
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);

    if (this.heldItem) {
      p.fill(245);
      p.text(
        this.heldItem,
        handSlotX + handSlotSize / 2,
        handSlotY + handSlotSize / 2
      );
    } else {
      p.fill(100);
      p.text(
        "빈손",
        handSlotX + handSlotSize / 2,
        handSlotY + handSlotSize / 2
      );
    }

    // =========================
    // 가운데 구분선
    // =========================
    const dividerX =
      handAreaX + handWidth + 25;

    p.stroke(65, 65, 85);
    p.strokeWeight(2);

    p.line(
      dividerX,
      panelY + 75,
      dividerX,
      panelY + panelHeight - 30
    );

    // =========================
    // 오른쪽 : 6칸 인벤토리
    // =========================
    const inventoryX = dividerX + 30;
    const inventoryY = panelY + 95;

    const inventoryWidth =
      panelX + panelWidth - inventoryX - 30;

    const inventoryHeight =
      panelHeight - 145;

    // 보관함 제목
    p.noStroke();
    p.fill(220);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(18);
    p.text(
      "보관함  6칸",
      inventoryX,
      inventoryY - 35
    );

    // =========================
    // 2 x 3 슬롯
    // =========================
    const columns = 3;
    const rows = 2;
    const gap = 12;

    const slotSize = Math.min(
      (inventoryWidth - gap * (columns - 1)) / columns,
      (inventoryHeight - gap * (rows - 1)) / rows
    );

    const totalWidth =
      slotSize * columns + gap * (columns - 1);

    const startX =
      inventoryX + (inventoryWidth - totalWidth) / 2;

    const startY = inventoryY;

    for (let index = 0; index < 6; index++) {
      const column = index % columns;
      const row = Math.floor(index / columns);

      const x =
        startX + column * (slotSize + gap);

      const y =
        startY + row * (slotSize + gap);

      // 슬롯
      p.fill(15, 15, 22);
      p.stroke(75, 75, 95);
      p.strokeWeight(2);

      p.rect(
        x,
        y,
        slotSize,
        slotSize,
        8
      );

      // 번호
      p.noStroke();
      p.fill(90);
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(12);

      p.text(
        `${index + 1}`,
        x + 8,
        y + 7
      );

      // 실제 아이템이 있다면 표시
      if (this.inventory[index]) {
        p.fill(245);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(15);

        p.text(
          this.inventory[index],
          x + slotSize / 2,
          y + slotSize / 2
        );
      }
    }

    // =========================
    // 하단 안내
    // =========================
    p.noStroke();
    p.fill(110);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(13);

    p.text(
      "1-6 또는 슬롯 클릭 · F 키로 닫기",
      panelX + panelWidth / 2,
      panelY + panelHeight - 18
    );

    p.pop();
  }

  getInventorySlotBounds() {
    const panelWidth = Math.min(820, this.sketch.width - 40);
    const panelHeight = Math.min(500, this.sketch.height - 40);
    const panelX = (this.sketch.width - panelWidth) / 2;
    const panelY = (this.sketch.height - panelHeight) / 2;
    const handAreaX = panelX + 30;
    const handAreaY = panelY + 95;
    const handWidth = panelWidth * 0.35;
    const handHeight = panelHeight - 145;
    const handSlotSize = Math.min(handWidth * 0.62, handHeight * 0.55);
    const handSlot = {
      x: handAreaX + (handWidth - handSlotSize) / 2,
      y: handAreaY + 65,
      size: handSlotSize,
    };
    const dividerX = handAreaX + handWidth + 25;
    const inventoryX = dividerX + 30;
    const inventoryY = panelY + 95;
    const inventoryWidth = panelX + panelWidth - inventoryX - 30;
    const inventoryHeight = panelHeight - 145;
    const gap = 12;
    const slotSize = Math.min(
      (inventoryWidth - gap * 2) / 3,
      (inventoryHeight - gap) / 2
    );
    const startX = inventoryX + (inventoryWidth - (slotSize * 3 + gap * 2)) / 2;

    return {
      handSlot,
      slots: Array.from({ length: 6 }, (_, index) => ({
        x: startX + (index % 3) * (slotSize + gap),
        y: inventoryY + Math.floor(index / 3) * (slotSize + gap),
        size: slotSize,
      })),
    };
  }

  handleInventoryClick(x, y) {
    const { handSlot, slots } = this.getInventorySlotBounds();
    const contains = (slot) => (
      x >= slot.x && x <= slot.x + slot.size &&
      y >= slot.y && y <= slot.y + slot.size
    );

    if (contains(handSlot)) {
      if (!this.heldItem) {
        this.message = "주손이 비어 있습니다.";
      } else if (this.inventory.length >= 6) {
        this.message = "보관함이 가득 차서 주손 아이템을 넣을 수 없습니다.";
      } else {
        this.inventory.push(this.heldItem);
        this.heldItem = null;
        this.message = "주손 아이템을 보관함에 넣었습니다.";
        this.updateStatus();
      }
      return;
    }

    const slotIndex = slots.findIndex(contains);
    if (slotIndex !== -1) {
      this.equipInventorySlot(slotIndex);
    }
  }


  equipInventorySlot(index) {
    // 슬롯 번호가 잘못된 경우
    if (index < 0 || index >= this.inventory.length) {
      this.message = "이 슬롯에는 아이템이 없습니다.";
      return;
    }

    // 해당 슬롯이 비어 있는 경우
    if (!this.inventory[index]) {
      this.message = "이 슬롯에는 아이템이 없습니다.";
      return;
    }

    // =========================
    // 주손이 비어 있는 경우
    // =========================
    if (!this.heldItem) {
      this.heldItem = this.inventory[index];

      // 해당 아이템을 보관함에서 제거
      this.inventory.splice(index, 1);

      this.message =
        `${this.heldItem}을(를) 주손에 들었습니다.`;

      this.updateStatus();
      return;
    }

    // =========================
    // 주손에 아이템이 이미 있는 경우
    // =========================
    const temp = this.heldItem;

    this.heldItem = this.inventory[index];
    this.inventory[index] = temp;

    this.message =
      `${this.heldItem}을(를) 주손에 들었습니다.`;

    this.updateStatus();
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
    if (this.ended || this.paused) {
      return false;
    }

    if (key === this.controls.inventory) {
      this.inventoryOpen = !this.inventoryOpen;

      this.heldDirections.clear();
      this.lastPressedDirection = null;

      this.updateStatus();

      return false;
    }

    if (this.inventoryOpen) {
      if (/^[1-6]$/.test(key)) {
        this.equipInventorySlot(Number(key) - 1);
      }

      return false;
    }

    const direction = this.directionForKey(key);

    if (direction) {
      // 누른 방향을 저장
      this.heldDirections.add(key);

      // 가장 최근에 누른 방향 저장
      this.lastPressedDirection = key;

      // 방향은 즉시 변경
      this.player.direction =
        direction.sprite;

      // 이동 중이 아니면 즉시 이동
    } else if (key === this.controls.interact) {
      this.useHeldItem();
    }

    this.updateStatus();

    return false;
  }

  handleKeyReleased(key) {
    // 키를 떼면 반드시 제거
    this.heldDirections.delete(key);

    // 현재 마지막 방향을 떼었다면
    // 남아 있는 방향 중 가장 최근 방향을 찾는다.
    if (key === this.lastPressedDirection) {
      const remaining = Array.from(this.heldDirections);
      this.lastPressedDirection =
        remaining.length > 0
          ? remaining[remaining.length - 1]
          : null;
    }
  }

  processHeldMovement(p) {
    if (this.ended || this.paused) return;
    if (this.heldDirections.size === 0) return;

    const key = Array.from(this.heldDirections).at(-1);
    const direction = this.directionForKey(key);

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
    const nextPx = this.player.px + dx;
    const nextPy = this.player.py + dy;

    if (!this.canOccupyPixel(nextPx, nextPy)) return;

    this.player.px = nextPx;
    this.player.py = nextPy;
    this.player.x = nextPx / TILE_SIZE;
    this.player.y = nextPy / TILE_SIZE;

    const cell = this.getActorCell(this.player);
    const tile = this.getTile(cell.x, cell.y);

    // 계단 판정
    if (tile === TILE.STAIRS && !this.stairTransitionLocked) {
      this.stairTransitionLocked = true;
      this.changeFloor();
      return;
    }
    if (tile !== TILE.STAIRS) {
      this.stairTransitionLocked = false;
    }

    // 열쇠 획득 판정
    if (tile === TILE.KEY) {
      const keyObj = this.placedKeys.find(
        (k) => !k.taken && k.floor === this.currentFloor && k.x === cell.x && k.y === cell.y
      );
      const keyName = keyObj ? keyObj.keyName : "열쇠";

      if (this.inventory.length >= 6 && this.heldItem !== null) {
        this.message = "보관함이 가득 차서 열쇠를 주울 수 없습니다.";
      } else {
        if (this.heldItem === null) {
          this.heldItem = keyName;
          this.message = `${keyName}을(를) 획득하여 주손에 들었습니다.`;
        } else {
          this.inventory.push(keyName);
          this.message = `${keyName}을(를) 획득했습니다.`;
        }
        if (keyObj) keyObj.taken = true;
        this.map[cell.y][cell.x] = TILE.FLOOR;
        this.updateStatus();
      }
    } else if (tile === TILE.EXIT) {
      this.finish(this.sketch, "탈출 성공! R 키로 다시 시작할 수 있습니다.");
    }

    if (this.monsterCaughtPlayer()) {
      this.finish(this.sketch, "괴물에게 붙잡혔습니다. GAME OVER");
    }
  }

  changeFloor() {
    if (this.currentFloor === 0) {
      // 1층 → 2층
      this.currentFloor = 1;
      this.map = this.floorMaps[1];

      this.player = this.createActor(
        SECOND_FLOOR_SPAWN.x,
        SECOND_FLOOR_SPAWN.y,
        "S",
        PLAYER_SPEED_PX
      );

      this.message = "[2층 사무실] 카드키로 각 부서 출입문을 개방하세요.";
    } else {
      // 2층 → 1층
      this.currentFloor = 0;
      this.map = this.floorMaps[0];

      this.player = this.createActor(
        22,
        6,
        "S",
        PLAYER_SPEED_PX
      );

      this.message = "[1층 로비] 로비 출입증으로 보안 구역을 통과하세요.";
    }

    this.heldDirections.clear();
    this.lastPressedDirection = null;
    this.monster.active = false;
    this.updateStatus();
  }

  getConnectedDoors(startX, startY) {
    const visited = new Set();
    const result = [];
    const queue = [{ x: startX, y: startY }];
    visited.add(`${startX},${startY}`);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);

      for (const dir of [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
      ]) {
        const nx = current.x + dir.x;
        const ny = current.y + dir.y;
        const key = `${nx},${ny}`;

        if (!visited.has(key) && this.getTile(nx, ny) === TILE.LOCKED_DOOR) {
          visited.add(key);
          queue.push({ x: nx, y: ny });
        }
      }
    }

    return result;
  }

  getInteractTargetTile() {
    const direction = DIRECTIONS.find((item) => item.sprite === this.player.direction);
    if (!direction) return null;

    const hitbox = this.getFootHitbox(this.player);
    const centerX = Math.floor((hitbox.left + hitbox.right) / 2 / TILE_SIZE);
    const centerY = Math.floor(hitbox.bottom / TILE_SIZE);

    // 바라보는 방향 바로 앞
    const pX = centerX + direction.x;
    const pY = centerY + direction.y;
    if (this.getTile(pX, pY) === TILE.LOCKED_DOOR) {
      return { x: pX, y: pY };
    }

    // 모서리 접촉 시 보정
    if (direction.y !== 0) {
      const leftX = Math.floor(hitbox.left / TILE_SIZE);
      const rightX = Math.floor(hitbox.right / TILE_SIZE);
      if (this.getTile(leftX, centerY + direction.y) === TILE.LOCKED_DOOR) {
        return { x: leftX, y: centerY + direction.y };
      }
      if (this.getTile(rightX, centerY + direction.y) === TILE.LOCKED_DOOR) {
        return { x: rightX, y: centerY + direction.y };
      }
    } else if (direction.x !== 0) {
      const topY = Math.floor(hitbox.top / TILE_SIZE);
      const bottomY = Math.floor(hitbox.bottom / TILE_SIZE);
      if (this.getTile(centerX + direction.x, topY) === TILE.LOCKED_DOOR) {
        return { x: centerX + direction.x, y: topY };
      }
      if (this.getTile(centerX + direction.x, bottomY) === TILE.LOCKED_DOOR) {
        return { x: centerX + direction.x, y: bottomY };
      }
    }

    return null;
  }

  interact() {
    const target = this.getInteractTargetTile();

    if (!target) {
      this.message = "이 방향에는 카드 리더기가 없습니다.";
      return;
    }

    // 눌린 문 타일이 속한 문 정의 탐색
    const doorDef = DOORS.find(
      (d) =>
        d.floor === this.currentFloor &&
        d.tiles.some((t) => t.x === target.x && t.y === target.y)
    );

    const requiredKey = doorDef ? doorDef.keyName : "카드키";
    const doorName   = doorDef ? doorDef.name   : "보안문";
    const hasKey = this.heldItem === requiredKey;

    if (!hasKey) {
      this.message = `🔒 [${doorName}] 카드 인증 실패. [${requiredKey}]가 필요합니다.`;
      return;
    }

    // 카드키 소모 (주손 → 보관함 순서로 제거)
    if (this.heldItem === requiredKey) {
  this.heldItem = null;
}

    // ★ 같은 카드키를 공유하는 모든 문 타일 동시 개방
    const sameKeyDoors = DOORS.filter(
      (d) => d.floor === this.currentFloor && d.keyName === requiredKey
    );
    let openedCount = 0;
    for (const door of sameKeyDoors) {
      for (const t of door.tiles) {
        if (this.getTile(t.x, t.y) === TILE.LOCKED_DOOR) {
          this.map[t.y][t.x] = TILE.OPEN_DOOR;
          openedCount++;
        }
      }
    }

    const extraMsg = sameKeyDoors.length > 1
      ? ` (${sameKeyDoors.length}개 구역 일괄 개방!)`
      : "";
    this.message = `✅ [${requiredKey}] 인증 완료 — ${doorName} 개방${extraMsg}`;
    this.updateStatus();
  }

  useHeldItem() {
  // 주손에 아이템이 없으면 사용 불가
  if (this.heldItem === null) {
    this.message = "주손에 들고 있는 아이템이 없습니다.";
    return;
  }

  const item = this.heldItem;

  // 현재는 카드키만 사용 가능
  if (item.includes("출입증") || item.includes("마스터키")) {
    this.interact();
    return;
  }

  // 나중에 다른 아이템이 추가되면 여기에 사용 효과를 추가하면 됨
  this.message = `${item}은(는) 지금 사용할 수 없습니다.`;
}

  getTile(x, y) {
    return this.map[y]?.[x];
  }

  createActor(x, y, direction, speed = PLAYER_SPEED_PX) {
    return {
      x,
      y,
      px: x * TILE_SIZE,
      py: y * TILE_SIZE,
      targetX: x,
      targetY: y,
      targetPx: x * TILE_SIZE,
      targetPy: y * TILE_SIZE,
      direction,
      speed,
      animationMs: 0,
      isMoving: false,
    };
  }

  startActorMove(actor, x, y) {
    const direction = DIRECTIONS.find((item) => item.x === x - actor.x && item.y === y - actor.y);
    if (direction) actor.direction = direction.sprite;
    actor.targetX = x;
    actor.targetY = y;
    actor.targetPx = x * TILE_SIZE;
    actor.targetPy = y * TILE_SIZE;
    actor.animationMs = 0;
    actor.isMoving = true;
  }

  updateActorAnimation(p, actor) {
    if (!actor.isMoving) return { x: actor.px / TILE_SIZE, y: actor.py / TILE_SIZE, frame: 0 };
    const dx = actor.targetPx - actor.px;
    const dy = actor.targetPy - actor.py;
    const distance = Math.hypot(dx, dy);
    const distanceThisFrame = (actor.speed * Math.min(p.deltaTime, 50)) / 1000;
    actor.animationMs += Math.min(p.deltaTime, 50);

    if (distance <= distanceThisFrame) {
      actor.px = actor.targetPx;
      actor.py = actor.targetPy;
      actor.x = actor.targetX;
      actor.y = actor.targetY;
      actor.isMoving = false;
    } else {
      actor.px += (dx / distance) * distanceThisFrame;
      actor.py += (dy / distance) * distanceThisFrame;
    }

    if (actor === this.monster && this.monsterCaughtPlayer()) {
      this.finish(p, "괴물에게 붙잡혔습니다. GAME OVER");
    }

    return {
      x: actor.px / TILE_SIZE,
      y: actor.py / TILE_SIZE,
      frame: Math.floor(actor.animationMs / (400 / MOVE_FRAMES)) % MOVE_FRAMES,
    };
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

  onPlayerArrive(p) {
    if (this.samePosition(this.player, this.monster) && this.monster.active) {
      this.finish(p, "아오오니에게 붙잡혔습니다. GAME OVER");
    } else if (this.getTile(this.player.x, this.player.y) === TILE.EXIT) {
      this.finish(p, "탈출 성공! R 키로 다시 시작할 수 있습니다.");
    }
  }

  isPlayerWalkable(x, y) {
    return ![undefined, TILE.WALL, TILE.LOCKED_DOOR].includes(this.getTile(x, y));
  }

  isMonsterWalkable(x, y) {
    return this.isPlayerWalkable(x, y);
  }

  positionKey(x, y) {
    return `${x},${y}`;
  }

  samePosition(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  finish(p, message) {
    if (this.ended) return;
    this.ended = true;
    this.message = message;
    this.updateStatus();
    p.noLoop();
    if (message.includes("GAME OVER")) {
      this.onJumpscare?.();
      window.setTimeout(() => this.onGameOver?.(), 3450);
    }
  }

  updateStatus() {
    const held = this.heldItem ? `주손: [${this.heldItem}]` : "주손: 빈손";
    const bag = `보관함: ${this.inventory.length}개`;
    this.statusElement.textContent = `${held} · ${bag}${this.monster.active ? " · 아오오니 추격 중" : ""
      }`;
  }

  drawFlashlight(p, lightX, lightY) {
    const context = p.drawingContext;
    context.save();
    context.fillStyle = "rgba(0, 0, 0, 0.26)";
    context.beginPath();
    context.rect(0, 0, p.width, p.height);
    context.arc(lightX, lightY, 300, 0, p.TWO_PI);
    context.fill("evenodd");
    context.restore();
  }

  drawMessage(p) {
    p.fill(0, 0, 0, 195);
    p.noStroke();
    p.rect(14, p.height - 58, Math.min(p.width - 28, 780), 44, 7);
    p.fill(255);
    p.textSize(15);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(this.message, 28, p.height - 36, Math.min(p.width - 56, 740));
  }

  getFootHitbox(actor, px = actor.px, py = actor.py) {
    return { left: px + 23, right: px + 41, top: py + 45, bottom: py + 60 };
  }

  getActorCell(actor) {
    const hitbox = this.getFootHitbox(actor);
    return {
      x: Math.floor((hitbox.left + hitbox.right) / 2 / TILE_SIZE),
      y: Math.floor(hitbox.bottom / TILE_SIZE),
    };
  }

  canOccupyPixel(px, py) {
    const hitbox = this.getFootHitbox(this.player, px, py);
    const left = Math.floor(hitbox.left / TILE_SIZE);
    const right = Math.floor(hitbox.right / TILE_SIZE);
    const top = Math.floor(hitbox.top / TILE_SIZE);
    const bottom = Math.floor(hitbox.bottom / TILE_SIZE);
    return (
      this.isPlayerWalkable(left, top) &&
      this.isPlayerWalkable(right, top) &&
      this.isPlayerWalkable(left, bottom) &&
      this.isPlayerWalkable(right, bottom)
    );
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
    if (!this.monster.active) return false;
    const monster = this.getMonsterCaptureHitbox();
    const player = this.getFootHitbox(this.player);

    return (
      monster.left < player.right &&
      monster.right > player.left &&
      monster.top < player.bottom &&
      monster.bottom > player.top
    );
  }
}
