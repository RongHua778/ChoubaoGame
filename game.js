const canvas = tap.createCanvas();
const ctx = canvas.getContext("2d");

const CARD_SCORE = "score";
const CARD_BOMB = "bomb";
const EFFECT_STEAL = "steal";
const EFFECT_BLUFF = "bluff";
const EFFECT_INTIMIDATE = "intimidate";
const EFFECT_AMBUSH = "ambush";
const EFFECT_COPY = "copy";
const EFFECT_BRUISER = "bruiser";
const EFFECT_VANGUARD = "vanguard";
const EFFECT_IMP = "imp";
const EFFECT_DIVINE_LIGHT = "divineLight";
const EFFECT_SHIELD = "shield";
const EFFECT_CHIEFTAIN = "chieftain";
const EFFECT_LEECH = "leech";
const EFFECT_FLOOD = "flood";
const EFFECT_POLLUTE = "pollute";
const EFFECT_MENACE = "menace";
const EFFECT_INCITE = "incite";
const EFFECT_WASTELAND = "wasteland";
const EFFECT_POISON_SOURCE = "poisonSource";
const MAX_HP = 3;
const WIN_TARGET = 3;
const QUEUE_LIMIT = 10;
const QUEUE_COLUMNS = 5;
const QUEUE_ROWS = 2;
const SCORE_CARDS = [1, 1, 1, 2, 2, 2, 3];
const BOMB_COUNT = 3;
const AI_DELAY = 850;
const ROUND_END_DELAY = 2600;
const DRAW_ANIM_DURATION = 340;
const SLOT_MOVE_ANIM_DURATION = 430;
const DISCARD_ANIM_DURATION = 420;
const DISCARD_ANIM_STAGGER = 90;
const BOMB_ANIM_DURATION = 780;
const HEART_FLASH_DURATION = 900;
const BOTTOM_PROMPT_HEIGHT_DEFAULT = 46;
const BOTTOM_PROMPT_GAP_DEFAULT = 8;
const CARD_GRID_GAP = 8;
const TIPS_DEFAULT_DURATION_MS = 1350;
const TIPS_ROUND_RESULT_MS = 1800;
const TIPS_MATCH_RESULT_MS = 2550;
const OPPONENT_SPEECH_BUBBLE_MS = 3000;
const OPPONENT_SPEECH_FONT_SIZE = 12;
const OPPONENT_SPEECH_LINE_HEIGHT = 13.5;
const OPPONENT_SPEECH_PAD = 9;
const OPPONENT_SPEECH_FADE_IN_MS = 130;
const OPPONENT_SPEECH_FADE_OUT_MS = 260;
const OPPONENT_SPEECH_POP_IN_MS = 420;
const OPPONENT_SPEECH_ARROW_LEN = 11;
const OPPONENT_SPEECH_SLIDE_PX = 64;
const OPPONENT_LINE_ON_DRAW_CHANCE = 0.05;
const OPPONENT_LINE_ROUND_WIN_CHANCE = 0.25;
const OPPONENT_LINE_ROUND_LOSE_CHANCE = 0.25;
const TIPS_FADE_IN_MS = 160;
const TIPS_FADE_OUT_MS = 200;
const NEXT_LEVEL_STUB_MS = 2200;
const HP_RECOVER_PULSE_MS = 900;
const ROUND_NUM_PULSE_MS = 1100;
const SHOP_CARD_COUNT = 4;
const SHOP_REFRESH_FIRST_COST = 2;
const SHOP_REFRESH_STEP = 2;
const VICTORY_BASE_GOLD = 5;
const VICTORY_INTEREST_CAP = 5;
const GOLD_PER_INTEREST_UNIT = 5;
const MATCH_VICTORY_REWARD_DELAY_MS = 2000;
const INTEREST_RULE_TEXT = "每5金币获得1利息，上限为5";
const STARTING_GOLD = 0;
const SHOP_CARD_COST = 4;
const REMOVE_CARD_COST = 3;
const RUN_BATTLE_COUNT = 9;
const BOSS_BATTLE_NUMBERS = [3, 6, 9];
const RUN_BOSS_ROUNDS = 3;
const ROUTE_ROW_WIDTHS = [1, 2, 3, 2, 1];
const ROUTE_NODE_START = "start";
const ROUTE_NODE_BOSS_BEATEN = "bossBeaten";
const ROUTE_NODE_NORMAL = "normal";
const ROUTE_NODE_EVENT = "event";
const ROUTE_NODE_SHOP = "shop";
const ROUTE_NODE_ELITE = "elite";
const ROUTE_NODE_BOSS = "boss";
/** 中间 7 格（不含起点与庄家）：切磋 2–3、强手 1–2、事件 1–2、黑市 1–2 */
const ROUTE_MIDDLE_COUNT_OPTIONS = [
  [3, 2, 1, 1],
  [3, 1, 2, 1],
  [3, 1, 1, 2],
  [2, 2, 2, 1],
  [2, 2, 1, 2],
  [2, 1, 2, 2]
];
const ROUTE_CELL_BORDER = "rgba(94, 231, 255, 0.88)";
const ROUTE_CELL_BORDER_DIM = "rgba(94, 231, 255, 0.26)";
const ROUTE_CELL_FILL_VISITED = "rgba(160, 210, 255, 0.38)";
const ROUTE_CELL_FILL_DEFAULT = "rgba(16, 20, 35, 0.92)";
const ROUTE_CELL_TEXT_DIM = "rgba(143, 155, 181, 0.52)";
const ROUTE_CELL_GAP_X = 13;
const ROUTE_CELL_GAP_Y = 10;
const ROUTE_CELL_RADIUS_SCALE = 0.88 * 1.3 * 0.9;
const ROUTE_CELL_RADIUS_MIN = 19;
const ROUTE_CELL_RADIUS_MAX = 54;
const ROUTE_CELL_LABEL_SIZE = 11 * 1.25;
const ROUTE_CELL_LABEL_SIZE_BOSS = 12 * 1.25;
/** 极简图标半径 = min(rx,ry) × 该系数 */
const ROUTE_NODE_ICON_RADIUS_FACTOR = 0.4;
/** 图标中心相对格子中心的纵向偏移（负号偏上） */
const ROUTE_NODE_ICON_CENTER_OFFSET_Y_RATIO = -0.24;
/** 节点两字文案相对格子中心下移（比例 × ry） */
const ROUTE_NODE_LABEL_OFFSET_Y_RATIO = 0.17;
const RUN_BOTTOM_BAR_HEIGHT = 72;
const RUN_BOTTOM_BAR_MARGIN = 12;
const UI_FONT = '"Noto Sans SC", "Source Han Sans SC", sans-serif';
const THEME = {
  panel: "#101423",
  panelAlt: "#171021",
  panelEdge: "#f05d8f",
  panelEdgeCool: "#49d6ff",
  text: "#f4f7ff",
  muted: "#8f9bb5",
  gold: "#ffe071",
  danger: "#ff4b61",
  cyan: "#5ee7ff",
  green: "#70f0c8",
  button: "#f05d8f",
  buttonStop: "#4bd6c7",
  paper: "#e9edf7"
};
const GAME_SYMBOLS = ["○", "△", "□"];
const EFFECTS = {
  steal: {
    name: "偷窃",
    trigger: "active",
    description: "主动：选择对手队列中的一个卡，将其放入自己的队列。"
  },
  bluff: {
    name: "虚张",
    trigger: "passive",
    description: "被动：如果对手的队列数量小于等于 3，则自身 +2 筹码。"
  },
  intimidate: {
    name: "恐吓",
    trigger: "active",
    description: "主动：随机弃掉对手队列中的一个卡。"
  },
  ambush: {
    name: "埋伏",
    trigger: "passive",
    description: "弃置：往对手抽牌堆中随机放入一枚临时炸弹。"
  },
  copy: {
    name: "复制",
    trigger: "active",
    description: "主动：复制己方队列中任一其他牌生成临时复制；若原牌有主动技能，复制后加入队列时将立即询问是否发动。"
  },
  bruiser: {
    name: "莽夫",
    trigger: "passive",
    description:
      "被动：被抽取后逐张额外抽牌；炸弹引爆造成淘汰后会停止本条强制抽（嵌套莽夫同理）；仅抽到但未因此淘汰则继续抽完本条。再抽到莽夫会再次触发。"
  },
  vanguard: {
    name: "先锋",
    trigger: "passive",
    description: "被动：此后抽取的卡获得+1分"
  },
  imp: {
    name: "小鬼",
    trigger: "passive",
    description: "被动：如果是最后一张，则+3分"
  },
  divineLight: {
    name: "圣光",
    trigger: "active",
    description: "主动：使队列中其他卡牌获得+1分"
  },
  shield: {
    name: "盾牌",
    trigger: "active",
    description: "主动：选择己方队列中另一张牌，将其随机洗回己方抽牌堆。"
  },
  chieftain: {
    name: "首领",
    trigger: "passive",
    description: "被动：队列中每有 1 张基础分数低于 2 的记分卡，自身筹码便 +1。"
  },
  leech: {
    name: "汲取",
    trigger: "passive",
    description: "被动：在队列中时，对手每再抽一张牌，自身筹码便 +1。"
  },
  flood: {
    name: "洪水",
    trigger: "active",
    description: "主动：双方各随机弃掉至多 2 张队列中的牌（队列不足则尽其所能）。"
  },
  pollute: {
    name: "污染",
    trigger: "active",
    description: "主动：往对手弃牌堆随机放入一张临时「污染」（−1 分，离开时销毁）。"
  },
  menace: {
    name: "威吓",
    trigger: "passive",
    description: "被动：在队列中时，对手每再抽一张牌，自身筹码便 −1。"
  },
  incite: {
    name: "怂恿",
    trigger: "active",
    description: "主动：对手立即再抽一张牌（受停牌、队列上限与牌库限制）。"
  },
  wasteland: {
    name: "废土",
    trigger: "passive",
    description: "被动：对手队列中每有一张临时污染，自身筹码便 +1。"
  },
  poisonSource: {
    name: "毒源",
    trigger: "passive",
    description: "被动：在队列中时，对手每再抽一张牌，就往对手弃牌堆加入一张临时污染（−1 分）。"
  }
};
const PLAYER_STARTING_DECK_FALLBACK = [
  { type: CARD_SCORE, value: 1 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 0, effect: EFFECT_STEAL },
  { type: CARD_SCORE, value: 1, effect: EFFECT_BLUFF },
  { type: CARD_SCORE, value: 1 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 1, effect: EFFECT_BLUFF },
  { type: CARD_SCORE, value: 0, effect: EFFECT_INTIMIDATE },
  { type: CARD_SCORE, value: 0, effect: EFFECT_INTIMIDATE },
  { type: CARD_BOMB, value: 0 },
  { type: CARD_BOMB, value: 0 },
  { type: CARD_BOMB, value: 0 }
];
const BOSS_STARTING_DECK = [
  { type: CARD_SCORE, value: 3 },
  { type: CARD_SCORE, value: 3 },
  { type: CARD_SCORE, value: 3 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 1 },
  { type: CARD_SCORE, value: 1 },
  { type: CARD_SCORE, value: 0, effect: EFFECT_STEAL },
  { type: CARD_SCORE, value: 0, effect: EFFECT_INTIMIDATE },
  { type: CARD_SCORE, value: 1, effect: EFFECT_BLUFF },
  { type: CARD_SCORE, value: 1, effect: EFFECT_BLUFF },
  { type: CARD_BOMB, value: 0 }
];
const CARD_REWARD_POOL_FALLBACK = [
  { type: CARD_SCORE, value: 1 },
  { type: CARD_SCORE, value: 2 },
  { type: CARD_SCORE, value: 3 },
  { type: CARD_SCORE, value: 0, effect: EFFECT_STEAL },
  { type: CARD_SCORE, value: 1, effect: EFFECT_BLUFF },
  { type: CARD_SCORE, value: 0, effect: EFFECT_INTIMIDATE },
  { type: CARD_BOMB, value: 0 }
];
const DEFAULT_OPPONENT_CHOICES = [
  { name: "街角赌徒", description: "使用当前默认对手卡组。" },
  { name: "夜市牌手", description: "使用当前默认对手卡组。" }
];
const DEFAULT_THRESHOLD_LAYOUT = {
  labelOffsetX: 0,
  labelOffsetY: 0,
  pointStartX: 38,
  pointOffsetY: -5,
  pointGap: 23.4,
  pointRadius: 5.8,
  flashRadiusBoost: 1.4
};
const DEFAULT_PANEL_LAYOUT = {
  topMargin: 12,
  sideMargin: 14,
  panelGap: 8,
  controlsYRatio: 0.895,
  centerHRatio: 0.095,
  minCenterH: 64
};
const DEFAULT_WIDGET_LAYOUT = {
  scoreOffsetX: 0,
  scoreOffsetY: 56,
  scoreSize: 20,
  pileRightMargin: 14,
  pileTopOffset: 12,
  pileGap: 6,
  pileWidth: 64,
  pileHeight: 40,
  controlYRatio: 0.895,
  controlMargin: 22,
  controlGap: 12,
  controlHeight: 48
};
const DEFAULT_CENTER_LAYOUT = {
  roundTitleY: 18,
  roundTitleFontSize: 11,
  sectionLabelY: 23,
  sectionLabelSize: 10,
  winRowYRatio: 0.66,
  aiColumnXRatio: 0.1,
  playerColumnXRatio: 0.9,
  vsSize: 15,
  winSlotSize: 16,
  winSlotGap: 8,
  bottomPromptHeight: BOTTOM_PROMPT_HEIGHT_DEFAULT,
  bottomPromptGap: BOTTOM_PROMPT_GAP_DEFAULT
};
const DEFAULT_BORDER_LAYOUT = {
  borderWidth: 2,
  cornerRadius: 7,
  glowBrightness: 1
};
const DEFAULT_TITLE_MENU_LAYOUT = {
  logoMaxWidthRatio: 0.92,
  logoMaxWidthCap: 380,
  logoTopRatio: 0.105,
  /** 「开始游戏」宽度：draw = 与控制区左侧「抽牌」同宽（默认水平居中）；full = 与控制区整条同宽（左右 margin 与控制区一致） */
  startButtonWidthMode: "draw",
  /** 若为数字且 >0，自定义按钮高度；否则与对战底部「抽牌」同高 */
  startButtonHeight: null,
  startButtonWidth: null,
  /** 0～1：按钮顶部 Y = 屏高×该值；-1 或未设置：对齐对战控件 Y（与抽牌同款） */
  startButtonYRatio: null,
  startButtonYOffset: 0,
  /** 0～1：按钮水平位置（以锚点居中）；−1／未设置：按宽度模式默认对齐（draw 居中、full 靠边距） */
  startButtonCenterXRatio: null,
  fallbackLogoTextWhenNoImage: "",
  showBootstrapLoadingHint: false,
  bootstrapLoadingHintYRatio: 0.552,
  bootstrapLoadingHintSize: 13
};

let scene = "title";
let game = null;
let runState = null;
let pulse = 0;
let buttons = {};
let pileHitAreas = [];
let queueCardHitAreas = [];
let modalCardHitAreas = [];
let shopCardHitAreas = [];
let shopBuyButtonHitAreas = [];
let routeNodeHitAreas = [];
let modal = null;
let modalStack = [];
let aiActionAt = 0;
let roundAdvanceAt = 0;
let activeEffects = [];
let pendingActiveEffect = null;
let pendingAiActiveEffect = null;
let playerPendingActiveEffects = [];
let bruiserDrawMachine = null;
let tipsState = null;
let winScoreSlotPulse = null;
let roundLabelPulseAt = 0;
let hpRecoverPulse = { player: null, ai: null };
let matchVictoryRewardAt = 0;
let cardsCatalogEntries = null;
let catalogById = {};
let thiefDeckCardIds = null;
let thiefDeckOpponentLines = null;
let playerDeckCardIds = null;
let bootstrapReady = false;
let expeditionRoundDecks = null;

/** 运行时只读取 Data/cards.json（由 scripts/export_cards.py 按需生成）；不会在浏览器里跑表转换。 */
const CARDS_JSON_URL = "./Data/cards.json";
const THIEF_DECK_JSON_URL = "./Data/Decks/thief.json";
const PLAYER_DECK_JSON_URL = "./Data/Decks/player.json";
const TITLE_LOGO_URL = "./images/cardloot-choubao-logo.png";
const titleLogo = createAssetImage(TITLE_LOGO_URL);

function createAssetImage(src) {
  const image =
    typeof tap.createImage === "function" ? tap.createImage() : typeof Image !== "undefined" ? new Image() : null;

  if (!image) {
    return { image: null, isReady: false, hasError: true };
  }

  const state = { image: image, isReady: false, hasError: false };
  image.onload = function () {
    state.isReady = true;
  };
  image.onerror = function () {
    state.hasError = true;
  };
  image.src = src;

  if (image.complete) {
    state.isReady = true;
  }

  return state;
}

function resizeCanvas() {
  const width = canvas.width || 375;
  const height = canvas.height || 667;
  return { width, height };
}

function getThresholdLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_THRESHOLD_LAYOUT;
  }

  return Object.assign({}, DEFAULT_THRESHOLD_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.threshold);
}

function getPanelLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_PANEL_LAYOUT;
  }

  return Object.assign({}, DEFAULT_PANEL_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.panels);
}

function getWidgetLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_WIDGET_LAYOUT;
  }

  return Object.assign({}, DEFAULT_WIDGET_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.widgets);
}

function getTitleMenuLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_TITLE_MENU_LAYOUT;
  }

  return Object.assign({}, DEFAULT_TITLE_MENU_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.titleMenu || {});
}

function getTitleStartButtonRect(width, height) {
  const lm = getTitleMenuLayout();
  const controls = getControlRects(width, height);
  const rawW = lm.startButtonWidth;
  let w;
  let xAlignBase;
  if (lm.startButtonWidthMode === "full") {
    w =
      typeof rawW === "number" && !isNaN(rawW) && rawW > 0
        ? rawW
        : controls.full.w;
    xAlignBase = controls.full.x;
  } else {
    w =
      typeof rawW === "number" && !isNaN(rawW) && rawW > 0
        ? rawW
        : controls.left.w;
    xAlignBase = (width - w) / 2;
  }

  const cxr = lm.startButtonCenterXRatio;
  const x =
    typeof cxr === "number" && !isNaN(cxr) && cxr >= 0 && cxr <= 1
      ? width * cxr - w / 2
      : xAlignBase;

  const rawH = lm.startButtonHeight;
  const h =
    typeof rawH === "number" && !isNaN(rawH) && rawH > 0 ? rawH : controls.left.h;

  const yRatio = lm.startButtonYRatio;
  const y =
    typeof yRatio === "number" && !isNaN(yRatio) && yRatio >= 0 && yRatio <= 1
      ? height * yRatio + (lm.startButtonYOffset || 0)
      : controls.left.y + (lm.startButtonYOffset || 0);

  return { x: x, y: y, w: w, h: h };
}

function getCenterLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_CENTER_LAYOUT;
  }

  return Object.assign({}, DEFAULT_CENTER_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.center || {});
}

function getBorderLayout() {
  if (typeof window === "undefined" || !window.CARDLOOT_LAYOUT_DEBUG) {
    return DEFAULT_BORDER_LAYOUT;
  }

  return Object.assign({}, DEFAULT_BORDER_LAYOUT, window.CARDLOOT_LAYOUT_DEBUG.borders || {});
}

function getBattleBorderOptions(options) {
  const defaults = {
    lineWidth: options && options.lineWidth != null ? options.lineWidth : 2,
    cornerRadius: options && options.cornerRadius != null ? options.cornerRadius : 7,
    glowBrightness: options && options.glowBrightness != null ? options.glowBrightness : 1
  };

  const useBattleChrome = scene === "playing" || scene === "backstage" || scene === "routeMap";
  if (!useBattleChrome) {
    return defaults;
  }

  const borderLayout = getBorderLayout();
  return {
    lineWidth: Math.max(0.5, borderLayout.borderWidth),
    cornerRadius: Math.max(0, borderLayout.cornerRadius),
    glowBrightness: Math.max(0, borderLayout.glowBrightness)
  };
}

function showTip(text, durationMs) {
  const duration = typeof durationMs === "number" ? durationMs : TIPS_DEFAULT_DURATION_MS;
  tipsState = {
    text: String(text),
    until: Date.now() + Math.max(420, duration),
    startedAt: Date.now()
  };
}

function updateTips(now) {
  if (tipsState && now >= tipsState.until) {
    tipsState = null;
  }
}

function drawTips(width, height) {
  const now = Date.now();
  let tipText = null;
  let motion = null;
  if (game && game.matchWinner && game.stubTipUntil > Date.now() && game.stubTipText) {
    tipText = game.stubTipText;
  } else if (tipsState && tipsState.text) {
    tipText = tipsState.text;
    const age = now - tipsState.startedAt;
    const timeLeft = tipsState.until - now;
    const tIn = Math.min(1, Math.max(0, age / TIPS_FADE_IN_MS));
    const tOut = timeLeft < TIPS_FADE_OUT_MS ? Math.max(0, timeLeft / TIPS_FADE_OUT_MS) : 1;
    const easeIn = 1 - Math.pow(1 - tIn, 3);
    const alpha = easeIn * tOut;
    const scale = (0.88 + 0.12 * easeIn) * (0.94 + 0.06 * tOut);
    motion = { alpha: alpha, scale: scale };
  }

  if (!tipText) {
    return;
  }

  ctx.save();
  const maxTextW = Math.min(300, width - 40);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "normal 13px " + UI_FONT;

  const lines = wrapTipsText(tipText, maxTextW, 13);
  const lineGap = 6;
  let textH = lines.length * 15 + (lines.length > 1 ? (lines.length - 1) * lineGap : 0);
  textH = Math.max(22, textH);
  const padX = 16;
  const padY = 12;
  let boxW = 0;
  lines.forEach(function (line) {
    boxW = Math.max(boxW, ctx.measureText(line).width);
  });
  boxW = Math.min(width - 28, boxW + padX * 2);
  const boxH = textH + padY * 2;
  const cx = width / 2;
  const cy = height * 0.4 - 20;
  const x = cx - boxW / 2;
  const y = cy - boxH / 2;

  if (motion) {
    ctx.globalAlpha = motion.alpha;
    ctx.translate(cx, cy);
    ctx.scale(motion.scale, motion.scale);
    ctx.translate(-cx, -cy);
  }

  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = "rgba(10, 14, 26, 0.92)";
  ctx.strokeStyle = "rgba(94, 231, 255, 0.45)";
  ctx.lineWidth = 1.5;
  roundRect(x, y, boxW, boxH, 10, true, true);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  lines.forEach(function (line, index) {
    const lineY = y + padY + 11 + index * (15 + lineGap);
    drawCenteredText(line, cx, lineY, 13, THEME.text, "normal");
  });

  ctx.restore();
}

function wrapTipsText(text, maxWidth, size) {
  ctx.save();
  ctx.font = "normal " + size + "px " + UI_FONT;

  if (!text) {
    ctx.restore();
    return [""];
  }

  let result = [];
  const segments = text.split("\n");

  segments.forEach(function (segment) {
    if (!segment.length) {
      result.push("");
      return;
    }

    let buf = "";
    for (let i = 0; i < segment.length; i += 1) {
      const next = buf + segment[i];
      if (ctx.measureText(next).width > maxWidth && buf.length > 0) {
        result.push(buf);
        buf = segment[i];
      } else {
        buf = next;
      }
    }
    if (buf) {
      result.push(buf);
    }
  });

  ctx.restore();
  return result.length ? result : [fitText(text, maxWidth, size, "normal")];
}

function makeDeck() {
  const deck = SCORE_CARDS.map(function (value) {
    return { type: CARD_SCORE, value: value };
  });

  for (let i = 0; i < BOMB_COUNT; i += 1) {
    deck.push({ type: CARD_BOMB, value: 0 });
  }

  return shuffle(deck);
}

function cloneCard(card) {
  return Object.assign({}, card);
}

function normalizeCatalogCard(raw) {
  if (!raw || typeof raw !== "object") {
    return { type: CARD_SCORE, value: 0 };
  }

  const typeKey = raw.type === "bomb" ? CARD_BOMB : CARD_SCORE;
  const card = {
    type: typeKey,
    value: typeof raw.value === "number" && !isNaN(raw.value) ? raw.value : 0
  };

  if (raw.effect && EFFECTS[raw.effect]) {
    card.effect = raw.effect;
  }

  if (raw.displayName && typeof raw.displayName === "string") {
    card.displayName = raw.displayName;
  }

  return card;
}

function attachCatalogMetadataToCard(card, meta) {
  if (!card || !meta) {
    return;
  }

  const desc = meta.effectDescription;
  if (desc != null && String(desc).trim() !== "") {
    card.effectDescription = String(desc).trim();
  }

  const en = meta.effectName;
  if (en != null && String(en).trim() !== "") {
    card.catalogEffectName = String(en).trim();
  }
}

function catalogRowUnlocked(row) {
  if (!row || typeof row !== "object") {
    return false;
  }

  const v = row.unlocked;
  if (typeof v === "boolean") {
    return v;
  }
  if (v === 1 || v === "1") {
    return true;
  }
  if (v === 0 || v === "0") {
    return false;
  }
  if (typeof v === "string" && v) {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "yes" || s === "是") {
      return true;
    }
    if (s === "false" || s === "no" || s === "否") {
      return false;
    }
  }

  return true;
}

function applyCardsCatalogPayload(data) {
  if (!data || !Array.isArray(data.cards)) {
    return;
  }

  cardsCatalogEntries = data.cards.map(function (row) {
    const price = Number(row.shopPrice);
    const card = normalizeCatalogCard(row.card);
    attachCatalogMetadataToCard(card, {
      effectName: row.effectName,
      effectDescription: row.effectDescription
    });
    return {
      id: row.id,
      unlocked: catalogRowUnlocked(row),
      shopPrice: !isNaN(price) ? price : SHOP_CARD_COST,
      effectName: row.effectName || "",
      effectDescription: row.effectDescription || "",
      card: card
    };
  });
}

function getRewardCatalogEntries() {
  if (cardsCatalogEntries && cardsCatalogEntries.length > 0) {
    return cardsCatalogEntries;
  }

  return CARD_REWARD_POOL_FALLBACK.map(function (card, index) {
    return {
      id: index + 1,
      unlocked: true,
      shopPrice: SHOP_CARD_COST,
      effectName: "",
      effectDescription: "",
      card: cloneCard(card)
    };
  });
}

/** 商店专用：仅使用已从 cards.json 载入且 unlocked 的卡，无兜底池。 */
function getShopCatalogEntries() {
  if (!cardsCatalogEntries || cardsCatalogEntries.length === 0) {
    return [];
  }

  return cardsCatalogEntries.filter(function (e) {
    return e && e.unlocked === true && e.id != null && e.card && typeof e.card === "object";
  });
}

function rebuildCatalogIndex() {
  catalogById = {};
  getRewardCatalogEntries().forEach(function (entry) {
    if (entry && entry.id != null) {
      catalogById[entry.id] = entry;
    }
  });
}

const OPPONENT_LINE_CATEGORY_KEYS = ["matchStart", "matchVictory", "matchDefeat", "onDraw", "roundWin", "roundLose"];

function normalizeOpponentLines(raw) {
  const out = {};
  let ki;
  for (ki = 0; ki < OPPONENT_LINE_CATEGORY_KEYS.length; ki += 1) {
    out[OPPONENT_LINE_CATEGORY_KEYS[ki]] = [];
  }
  if (!raw || typeof raw !== "object") {
    return out;
  }
  for (ki = 0; ki < OPPONENT_LINE_CATEGORY_KEYS.length; ki += 1) {
    const key = OPPONENT_LINE_CATEGORY_KEYS[ki];
    const arr = raw[key];
    if (!Array.isArray(arr)) {
      continue;
    }
    arr.forEach(function (s) {
      if (typeof s !== "string") {
        return;
      }
      const t = s.trim();
      if (t) {
        out[key].push(t);
      }
    });
  }
  return out;
}

function pickRandomOpponentLine(lines, category) {
  const arr = lines && lines[category];
  if (!arr || arr.length === 0) {
    return "";
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function queueOpponentSpeech(text, durationMs) {
  if (!game || typeof text !== "string" || !text.trim()) {
    return;
  }
  const ms = typeof durationMs === "number" ? durationMs : OPPONENT_SPEECH_BUBBLE_MS;
  const t = Date.now();
  game.opponentSpeechBubble = { text: text.trim(), until: t + ms, startedAt: t };
}

function tryOpponentSpeechCategory(category, probability) {
  if (!game || !game.opponentLines) {
    return;
  }
  if (typeof probability === "number" && probability < 1 && Math.random() >= probability) {
    return;
  }
  const line = pickRandomOpponentLine(game.opponentLines, category);
  if (line) {
    queueOpponentSpeech(line);
  }
}

function forceOpponentSpeechCategory(category) {
  tryOpponentSpeechCategory(category, 1);
}

function applyThiefDeckPayload(data) {
  thiefDeckCardIds = null;
  thiefDeckOpponentLines = null;
  if (!data || !Array.isArray(data.cardIds)) {
    return;
  }

  thiefDeckOpponentLines = normalizeOpponentLines(data.opponentLines);

  thiefDeckCardIds = data.cardIds
    .map(function (x) {
      const n = Number(x);
      return !isNaN(n) ? n : null;
    })
    .filter(function (x) {
      return x !== null;
    });
}

function applyPlayerDeckPayload(data) {
  playerDeckCardIds = null;
  if (!data || !Array.isArray(data.cardIds)) {
    return;
  }

  playerDeckCardIds = data.cardIds
    .map(function (x) {
      const n = Number(x);
      return !isNaN(n) ? n : null;
    })
    .filter(function (x) {
      return x !== null;
    });
}

function resolveCatalogDeckSlot(id) {
  if (id === 0) {
    const card = cloneFirstBombCardFromCatalog();
    card.catalogId = 0;
    return card;
  }

  const entry = catalogById[id];
  if (!entry) {
    return null;
  }

  const card = cloneCard(entry.card);
  const nid = Number(id);
  card.catalogId = !isNaN(nid) ? nid : Number.MAX_SAFE_INTEGER;
  return card;
}

function getThiefDeckCards() {
  if (thiefDeckCardIds && thiefDeckCardIds.length > 0) {
    const out = [];
    for (let i = 0; i < thiefDeckCardIds.length; i += 1) {
      const card = resolveCatalogDeckSlot(thiefDeckCardIds[i]);
      if (card) {
        out.push(card);
      }
    }
    if (out.length > 0) {
      return out;
    }
  }

  return PLAYER_STARTING_DECK_FALLBACK.map(cloneCard);
}

function getPlayerDeckCards() {
  if (playerDeckCardIds && playerDeckCardIds.length > 0) {
    const out = [];
    for (let i = 0; i < playerDeckCardIds.length; i += 1) {
      const card = resolveCatalogDeckSlot(playerDeckCardIds[i]);
      if (card) {
        out.push(card);
      }
    }
    if (out.length > 0) {
      return out;
    }
  }

  return getThiefDeckCards();
}

function cloneFirstBombCardFromCatalog() {
  const keys = Object.keys(catalogById);
  for (let i = 0; i < keys.length; i += 1) {
    const entry = catalogById[keys[i]];
    if (entry && entry.card && entry.card.type === CARD_BOMB) {
      const card = cloneCard(entry.card);
      const nid = Number(entry.id);
      card.catalogId = !isNaN(nid) ? nid : 0;
      return card;
    }
  }

  const card = cloneCard({ type: CARD_BOMB, value: 0 });
  card.catalogId = 0;
  return card;
}

function parseDeckIdsFromPayload(data) {
  if (!data || !Array.isArray(data.cardIds)) {
    return [];
  }
  return data.cardIds
    .map(function (x) {
      const n = Number(x);
      return !isNaN(n) ? n : null;
    })
    .filter(function (x) {
      return x !== null;
    });
}

function parseDeckSlotPayload(data) {
  const cardIds = parseDeckIdsFromPayload(data);
  let displayName = "";
  if (data && typeof data.name === "string" && data.name.trim()) {
    displayName = data.name.trim();
  }
  return {
    cardIds: cardIds,
    displayName: displayName,
    opponentLines: normalizeOpponentLines(data && data.opponentLines)
  };
}

function cardsFromDeckIdsArray(ids) {
  const out = [];
  if (!ids || !ids.length) {
    return out;
  }
  for (let i = 0; i < ids.length; i += 1) {
    const card = resolveCatalogDeckSlot(ids[i]);
    if (card) {
      out.push(card);
    }
  }
  return out;
}

function buildShuffledMiddleRouteTypes() {
  const pick = ROUTE_MIDDLE_COUNT_OPTIONS[Math.floor(Math.random() * ROUTE_MIDDLE_COUNT_OPTIONS.length)];
  const list = [];
  let i;
  for (i = 0; i < pick[0]; i += 1) {
    list.push(ROUTE_NODE_NORMAL);
  }
  for (i = 0; i < pick[1]; i += 1) {
    list.push(ROUTE_NODE_ELITE);
  }
  for (i = 0; i < pick[2]; i += 1) {
    list.push(ROUTE_NODE_EVENT);
  }
  for (i = 0; i < pick[3]; i += 1) {
    list.push(ROUTE_NODE_SHOP);
  }
  const copy = list.slice();
  for (i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

/** 从 0..poolSize-1 中不重复随机取出 count 个（count ≤ poolSize；用于本图切磋≤3、强手≤2） */
function pickDistinctDeckVariants(count, poolSize) {
  if (count <= 0) {
    return [];
  }
  const take = Math.min(count, poolSize);
  const pool = [];
  let i;
  for (i = 0; i < poolSize; i += 1) {
    pool.push(i);
  }
  for (i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, take);
}

function initExpeditionRoundDecksStructure() {
  expeditionRoundDecks = [];
  const emptySlot = function () {
    return { cardIds: [], displayName: "", opponentLines: normalizeOpponentLines(null) };
  };
  let i;
  for (i = 0; i < RUN_BOSS_ROUNDS; i += 1) {
    expeditionRoundDecks.push({
      normals: [emptySlot(), emptySlot(), emptySlot()],
      elites: [emptySlot(), emptySlot()],
      boss: emptySlot()
    });
  }
}

function expeditionRoundDeckUrl(roundOneBased, filenameStem) {
  return "./Data/Decks/Rounds/round_" + roundOneBased + "/" + filenameStem + ".json";
}

function fetchDeckSlot(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(url + " " + response.status);
      }
      return response.json();
    })
    .then(parseDeckSlotPayload)
    .catch(function () {
      return parseDeckSlotPayload({});
    });
}

function expeditionDeckLoadPromises() {
  initExpeditionRoundDecksStructure();
  const jobs = [];
  let r;
  for (r = 1; r <= RUN_BOSS_ROUNDS; r += 1) {
    const ri = r - 1;
    [["normal_a", 0], ["normal_b", 1], ["normal_c", 2]].forEach(function (pair) {
      jobs.push(
        fetchDeckSlot(expeditionRoundDeckUrl(r, pair[0])).then(function (slot) {
          expeditionRoundDecks[ri].normals[pair[1]] = slot;
        })
      );
    });
    [["elite_a", 0], ["elite_b", 1]].forEach(function (pair) {
      jobs.push(
        fetchDeckSlot(expeditionRoundDeckUrl(r, pair[0])).then(function (slot) {
          expeditionRoundDecks[ri].elites[pair[1]] = slot;
        })
      );
    });
    jobs.push(
      fetchDeckSlot(expeditionRoundDeckUrl(r, "boss")).then(function (slot) {
        expeditionRoundDecks[ri].boss = slot;
      })
    );
  }
  return jobs;
}

function getExpeditionAiDeckForRouteNode(node) {
  if (!node || !runState) {
    return null;
  }
  const roundIdx = runState.bossesDefeated;
  if (roundIdx < 0 || roundIdx >= RUN_BOSS_ROUNDS || !expeditionRoundDecks || !expeditionRoundDecks[roundIdx]) {
    return null;
  }
  const pack = expeditionRoundDecks[roundIdx];

  if (node.type === ROUTE_NODE_NORMAL) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 3
        ? node.deckVariant
        : 0;
    const slot = pack.normals[slotIdx];
    const ids = slot && slot.cardIds ? slot.cardIds : [];
    return cardsFromDeckIdsArray(ids);
  }
  if (node.type === ROUTE_NODE_ELITE) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 2
        ? node.deckVariant
        : 0;
    const slot = pack.elites[slotIdx];
    const ids = slot && slot.cardIds ? slot.cardIds : [];
    return cardsFromDeckIdsArray(ids);
  }
  if (node.type === ROUTE_NODE_BOSS) {
    const slot = pack.boss;
    const ids = slot && slot.cardIds ? slot.cardIds : [];
    return cardsFromDeckIdsArray(ids);
  }
  return null;
}

function getExpeditionOpponentDeckDisplayName(node) {
  if (!node || !runState) {
    return "";
  }
  const roundIdx = runState.bossesDefeated;
  if (roundIdx < 0 || roundIdx >= RUN_BOSS_ROUNDS || !expeditionRoundDecks || !expeditionRoundDecks[roundIdx]) {
    return "";
  }
  const pack = expeditionRoundDecks[roundIdx];

  if (node.type === ROUTE_NODE_NORMAL) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 3
        ? node.deckVariant
        : 0;
    const slot = pack.normals[slotIdx];
    return slot && slot.displayName ? slot.displayName : "";
  }
  if (node.type === ROUTE_NODE_ELITE) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 2
        ? node.deckVariant
        : 0;
    const slot = pack.elites[slotIdx];
    return slot && slot.displayName ? slot.displayName : "";
  }
  if (node.type === ROUTE_NODE_BOSS) {
    const slot = pack.boss;
    return slot && slot.displayName ? slot.displayName : "";
  }
  return "";
}

function getExpeditionOpponentLines(node) {
  if (!node || !runState) {
    return normalizeOpponentLines(null);
  }
  const roundIdx = runState.bossesDefeated;
  if (roundIdx < 0 || roundIdx >= RUN_BOSS_ROUNDS || !expeditionRoundDecks || !expeditionRoundDecks[roundIdx]) {
    return normalizeOpponentLines(null);
  }
  const pack = expeditionRoundDecks[roundIdx];

  if (node.type === ROUTE_NODE_NORMAL) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 3
        ? node.deckVariant
        : 0;
    const slot = pack.normals[slotIdx];
    return normalizeOpponentLines(slot && slot.opponentLines);
  }
  if (node.type === ROUTE_NODE_ELITE) {
    const slotIdx =
      typeof node.deckVariant === "number" && !isNaN(node.deckVariant) && node.deckVariant >= 0 && node.deckVariant < 2
        ? node.deckVariant
        : 0;
    const slot = pack.elites[slotIdx];
    return normalizeOpponentLines(slot && slot.opponentLines);
  }
  if (node.type === ROUTE_NODE_BOSS) {
    const slot = pack.boss;
    return normalizeOpponentLines(slot && slot.opponentLines);
  }
  return normalizeOpponentLines(null);
}

function makeRouteRows(bossBeatenCount) {
  const beaten = typeof bossBeatenCount === "number" && bossBeatenCount > 0 ? bossBeatenCount : 0;
  const widths = ROUTE_ROW_WIDTHS.slice();
  const lastBossRowIndex = widths.length - 1;
  const middleTypes = buildShuffledMiddleRouteTypes();
  let normalCount = 0;
  let eliteCount = 0;
  middleTypes.forEach(function (t) {
    if (t === ROUTE_NODE_NORMAL) {
      normalCount += 1;
    } else if (t === ROUTE_NODE_ELITE) {
      eliteCount += 1;
    }
  });
  const normalVariants = pickDistinctDeckVariants(normalCount, 3);
  const eliteVariants = pickDistinctDeckVariants(eliteCount, 2);
  let normalVariantPos = 0;
  let eliteVariantPos = 0;
  let middleIdx = 0;

  return widths.map(function (width, rowIndex) {
    const isBossRow = width === 1 && rowIndex === lastBossRowIndex && rowIndex > 0;
    const nodes = [];
    for (let colIndex = 0; colIndex < width; colIndex += 1) {
      let type;
      let deckVariant = null;
      if (rowIndex === 0 && colIndex === 0) {
        type = beaten > 0 ? ROUTE_NODE_BOSS_BEATEN : ROUTE_NODE_START;
      } else if (isBossRow) {
        type = ROUTE_NODE_BOSS;
      } else {
        type = middleTypes[middleIdx];
        middleIdx += 1;
        if (type === ROUTE_NODE_NORMAL) {
          deckVariant = normalVariants[normalVariantPos];
          normalVariantPos += 1;
        } else if (type === ROUTE_NODE_ELITE) {
          deckVariant = eliteVariants[eliteVariantPos];
          eliteVariantPos += 1;
        }
      }
      nodes.push({
        id: "r" + rowIndex + "c" + colIndex + "x" + Math.floor(Math.random() * 1e7),
        rowIndex: rowIndex,
        colIndex: colIndex,
        type: type,
        deckVariant: deckVariant
      });
    }
    return nodes;
  });
}

function flattenRouteNodes() {
  ensureRunState();
  return runState.routeRows.reduce(function (nodes, row) {
    return nodes.concat(row);
  }, []);
}

function getRouteNodeById(nodeId) {
  if (!nodeId || !runState || !runState.routeRows) {
    return null;
  }
  const nodes = flattenRouteNodes();
  return (
    nodes.find(function (node) {
      return node.id === nodeId;
    }) || null
  );
}

function getRouteStartNode() {
  ensureRunState();
  const rows = runState.routeRows;
  if (!rows) {
    return null;
  }
  for (let ri = 0; ri < rows.length; ri += 1) {
    const row = rows[ri] || [];
    for (let ci = 0; ci < row.length; ci += 1) {
      const n = row[ci];
      if (n && n.type === ROUTE_NODE_START) {
        return n;
      }
    }
  }
  return rows[0] && rows[0][0] ? rows[0][0] : null;
}

function seedAutoVisitedRouteCells() {
  ensureRunState();
  runState.visitedRouteNodeIds = [];
  runState.currentRouteNodeId = null;
  runState.selectedRouteNodeId = null;
  runState.routeStep = -1;

  const rows = runState.routeRows || [];
  for (let ri = 0; ri < rows.length; ri += 1) {
    const row = rows[ri] || [];
    if (!row.length) {
      continue;
    }

    const head = row[0];
    if (head.type === ROUTE_NODE_BOSS_BEATEN) {
      markRouteNodeVisited(head);
      continue;
    }
    if (head.type === ROUTE_NODE_START) {
      markRouteNodeVisited(head);
      break;
    }
    break;
  }
}

function getCurrentRouteNode() {
  ensureRunState();
  return getRouteNodeById(runState.currentRouteNodeId);
}

function getNextRouteNodes() {
  ensureRunState();
  if (!runState.routeRows || runState.routeStep >= runState.routeRows.length - 1) {
    return [];
  }

  if (runState.routeStep < 0) {
    const startNode = getRouteStartNode();
    return startNode ? [startNode] : [];
  }

  const current = getCurrentRouteNode();
  if (!current) {
    return [];
  }

  const nextRowIndex = current.rowIndex + 1;
  const nextRow = runState.routeRows[nextRowIndex] || [];
  const nextWidth = nextRow.length;
  const currentWidth = (runState.routeRows[current.rowIndex] || []).length;
  let columns;
  if (nextWidth > currentWidth) {
    columns = [current.colIndex, current.colIndex + 1];
  } else if (nextWidth < currentWidth) {
    columns = [current.colIndex - 1, current.colIndex];
  } else {
    columns = [current.colIndex];
  }

  return columns
    .filter(function (colIndex, index, allColumns) {
      return colIndex >= 0 && colIndex < nextWidth && allColumns.indexOf(colIndex) === index;
    })
    .map(function (colIndex) {
      return nextRow[colIndex];
    });
}

function canSelectRouteNode(node) {
  if (!node) {
    return false;
  }
  return getNextRouteNodes().some(function (nextNode) {
    return nextNode.id === node.id;
  });
}

function markRouteNodeVisited(node) {
  ensureRunState();
  runState.currentRouteNodeId = node.id;
  runState.selectedRouteNodeId = node.id;
  runState.routeStep = node.rowIndex;
  if (runState.visitedRouteNodeIds.indexOf(node.id) < 0) {
    runState.visitedRouteNodeIds.push(node.id);
  }
}

function isRouteComplete() {
  ensureRunState();
  return runState.routeRows && runState.routeStep >= runState.routeRows.length - 1;
}

function getRouteNodeLabel(type) {
  if (type === ROUTE_NODE_BOSS) {
    return "庄家";
  }
  if (type === ROUTE_NODE_BOSS_BEATEN) {
    return "旧庄";
  }
  if (type === ROUTE_NODE_START) {
    return "起点";
  }
  if (type === ROUTE_NODE_ELITE) {
    return "强手";
  }
  if (type === ROUTE_NODE_EVENT) {
    return "事件";
  }
  if (type === ROUTE_NODE_SHOP) {
    return "黑市";
  }
  return "切磋";
}

function selectRouteNode(node) {
  ensureRunState();
  if (!canSelectRouteNode(node)) {
    showTip("只能选择相邻的下一格");
    return;
  }

  if (node.type === ROUTE_NODE_START || node.type === ROUTE_NODE_BOSS_BEATEN) {
    return;
  }

  markRouteNodeVisited(node);
  if (node.type === ROUTE_NODE_EVENT) {
    showTip("事件节点暂未开放，本次先安全通过。", 2200);
    enterRouteMap();
    return;
  }

  if (node.type === ROUTE_NODE_SHOP) {
    showTip("进入黑市");
    enterBackstage();
    return;
  }

  startNextRunBattle();
}

function makeRunState() {
  const routeRows = makeRouteRows(0);
  return {
    deck: getPlayerDeckCards(),
    gold: STARTING_GOLD,
    battlesWon: 0,
    bossesDefeated: 0,
    removeCardCost: REMOVE_CARD_COST,
    shopCards: [],
    shopRefreshNextCost: SHOP_REFRESH_FIRST_COST,
    routeRows: routeRows,
    routeStep: -1,
    currentRouteNodeId: null,
    selectedRouteNodeId: null,
    visitedRouteNodeIds: [],
    opponentChoices: DEFAULT_OPPONENT_CHOICES.map(function (opponent) {
      return Object.assign({}, opponent);
    })
  };
}

function ensureRunState() {
  if (!runState) {
    runState = makeRunState();
  }
}

function makePlayerDeck(deckCards) {
  const source = deckCards && deckCards.length ? deckCards : getThiefDeckCards();
  return shuffle(source.map(cloneCard));
}

function shuffle(cards) {
  const copy = cards.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function makeSide(id, name, deckCards) {
  return {
    id: id,
    name: name,
    hp: MAX_HP,
    wins: 0,
    roundScore: 0,
    drawPile: makePlayerDeck(deckCards),
    discardPile: [],
    queue: [],
    stopped: false,
    busted: false,
    status: "准备"
  };
}

function startGame() {
  runState = makeRunState();
  seedAutoVisitedRouteCells();
  enterRouteMap();
}

function getNextFightNumber() {
  ensureRunState();
  return runState.battlesWon + 1;
}

function isBossFightNumber(n) {
  return BOSS_BATTLE_NUMBERS.indexOf(n) >= 0;
}

function isBossRouteNode(node) {
  return node && node.type === ROUTE_NODE_BOSS;
}

function injectBossPreBattleBomb(fightNumOrNode) {
  const isBoss = typeof fightNumOrNode === "number" ? isBossFightNumber(fightNumOrNode) : isBossRouteNode(fightNumOrNode);
  if (!isBoss) {
    return;
  }
  ensureRunState();
  runState.deck.push(cloneFirstBombCardFromCatalog());
  showTip("庄家战：牌组永久加入 1 张炸弹", TIPS_DEFAULT_DURATION_MS);
}

function getRunBattleConfig(fightNumOrNode) {
  if (fightNumOrNode && typeof fightNumOrNode === "object") {
    const node = fightNumOrNode;
    const stepLabel = node.rowIndex + 1;
    if (node.type === ROUTE_NODE_START || node.type === ROUTE_NODE_BOSS_BEATEN) {
      return {
        name: "远征",
        deck: null
      };
    }
    if (node.type === ROUTE_NODE_BOSS) {
      return {
        name: "庄家 · 路线第 " + stepLabel + " 行",
        deck: BOSS_STARTING_DECK
      };
    }
    if (node.type === ROUTE_NODE_ELITE) {
      return {
        name: "强手 · 路线第 " + stepLabel + " 行",
        deck: BOSS_STARTING_DECK
      };
    }
    return {
      name: "切磋 · 路线第 " + stepLabel + " 行",
      deck: null
    };
  }

  const fightNum = fightNumOrNode;
  if (isBossFightNumber(fightNum)) {
    return {
      name: "庄家 · 第 " + fightNum + " 战",
      deck: BOSS_STARTING_DECK
    };
  }
  return {
    name: "对手 " + fightNum,
    deck: null
  };
}

function startNextRunBattle() {
  ensureRunState();
  const routeNode = getCurrentRouteNode();
  if (routeNode) {
    injectBossPreBattleBomb(routeNode);
    const routeCfg = getRunBattleConfig(routeNode);
    let aiDeck = getExpeditionAiDeckForRouteNode(routeNode);
    if (!aiDeck || aiDeck.length === 0) {
      aiDeck = routeCfg.deck;
    }
    const deckTitle = getExpeditionOpponentDeckDisplayName(routeNode);
    const opponentName = deckTitle || routeCfg.name;
    startBattle(
      opponentName,
      aiDeck && aiDeck.length ? aiDeck : undefined,
      getExpeditionOpponentLines(routeNode)
    );
    return;
  }

  const fightNum = getNextFightNumber();
  if (fightNum > RUN_BATTLE_COUNT) {
    return;
  }
  injectBossPreBattleBomb(fightNum);
  const cfg = getRunBattleConfig(fightNum);
  startBattle(cfg.name, cfg.deck);
}

function enterRunVictory() {
  scene = "runVictory";
  modal = null;
  modalStack = [];
  buttons = {};
}

function startBattle(opponentName, aiDeckOverride, opponentLinesExplicit) {
  ensureRunState();
  const aiDeck = aiDeckOverride && aiDeckOverride.length ? aiDeckOverride : undefined;
  let opponentLines = normalizeOpponentLines(null);
  if (arguments.length >= 3) {
    opponentLines = normalizeOpponentLines(opponentLinesExplicit);
  } else if (!aiDeck) {
    opponentLines = thiefDeckOpponentLines ? thiefDeckOpponentLines : opponentLines;
  }
  game = {
    player: makeSide("player", "玩家", runState.deck),
    ai: makeSide("ai", opponentName || "AI 对手", aiDeck),
    active: "player",
    firstSideId: "player",
    round: 0,
    message: "",
    winner: null,
    matchWinner: null,
    stubTipText: "",
    stubTipUntil: 0,
    opponentLines: opponentLines,
    opponentSpeechBubble: null
  };
  activeEffects = [];
  pendingActiveEffect = null;
  pendingAiActiveEffect = null;
  playerPendingActiveEffects = [];
  clearBruiserDrawMachine();
  modal = null;
  modalStack = [];
  buttons = {};
  scene = "playing";
  tipsState = null;
  roundAdvanceAt = 0;
  matchVictoryRewardAt = 0;
  winScoreSlotPulse = null;
  roundLabelPulseAt = 0;
  hpRecoverPulse = { player: null, ai: null };
  startRound();
  forceOpponentSpeechCategory("matchStart");
}

function startRound() {
  game.round += 1;
  roundLabelPulseAt = Date.now();
  game.winner = null;
  game.message = "第 " + game.round + " 局：选择继续，或选择停手。";
  roundAdvanceAt = 0;
  aiActionAt = 0;
  activeEffects = [];
  pendingActiveEffect = null;
  pendingAiActiveEffect = null;
  playerPendingActiveEffects = [];
  clearBruiserDrawMachine();
  modalStack = [];

  resetForRound(game.player);
  resetForRound(game.ai);
  game.firstSideId = game.round % 2 === 1 ? "player" : "ai";
  game.active = game.firstSideId;

  if (game.active === "ai") {
    game.message = "AI 思考中...";
    aiActionAt = Date.now() + AI_DELAY;
  }
}

function resetForRound(side) {
  const prevHp = side.hp;
  side.hp = Math.min(MAX_HP, side.hp + 1);
  if (side.hp > prevHp) {
    hpRecoverPulse[side.id] = {
      slotIndex: side.hp - 1,
      startedAt: Date.now()
    };
  } else {
    hpRecoverPulse[side.id] = null;
  }
  side.roundScore = 0;
  side.queue = [];
  side.stopped = false;
  side.busted = false;
  side.status = "准备";
}

function notifyOpponentQueuedCardsAfterDraw(drawingSide) {
  if (!game || !drawingSide) {
    return;
  }

  const passiveSide = getOpponent(drawingSide);
  passiveSide.queue.forEach(function (card) {
    if (!card || card.type !== CARD_SCORE) {
      return;
    }

    if (card.effect === EFFECT_LEECH) {
      card.roundLeechBonus = (typeof card.roundLeechBonus === "number" ? card.roundLeechBonus : 0) + 1;
    }

    if (card.effect === EFFECT_MENACE) {
      card.roundMenacePenalty = (typeof card.roundMenacePenalty === "number" ? card.roundMenacePenalty : 0) - 1;
    }

    if (card.effect === EFFECT_POISON_SOURCE) {
      injectPollutionIntoDiscardPile(drawingSide);
    }
  });

  syncRoundScores();
}

function drawCard(side) {
  refillDrawPile(side);

  if (side.queue.length >= QUEUE_LIMIT) {
    side.stopped = true;
    side.status = "队列已满";
    return null;
  }

  if (side.drawPile.length === 0) {
    side.stopped = true;
    side.status = "无牌可抽";
    return null;
  }

  const card = side.drawPile.pop();
  side.queue.push(card);

  if (card.type === CARD_BOMB) {
    syncRoundScores();
    side.hp = Math.max(0, side.hp - 1);
    side.status = "惩罚牌！阈值 -1";

    if (side.hp === 0) {
      side.busted = true;
      side.stopped = true;
      side.status = "淘汰";
      if (side.id === "player") {
        showTip("你爆掉了", TIPS_DEFAULT_DURATION_MS);
      } else {
        showTip("对手爆掉了", TIPS_DEFAULT_DURATION_MS);
      }
    }
  } else {
    syncRoundScores();
    const contribution = getCardRoundContribution(card);
    side.status = contribution > card.value ? "虚张！筹码 +" + contribution : "筹码 +" + contribution;
  }

  notifyOpponentQueuedCardsAfterDraw(side);
  refillDrawPile(side);
  return card;
}

function syncRoundScores() {
  if (!game) {
    return;
  }

  game.player.roundScore = calculateRoundScore(game.player);
  game.ai.roundScore = calculateRoundScore(game.ai);
}

function calculateRoundScore(side) {
  return side.queue.reduce(function (sum, card, queueIndex) {
    card.roundContribution = calculateCardRoundContribution(side, card, queueIndex);
    return sum + card.roundContribution;
  }, 0);
}

function countVanguardsBeforeIndex(side, queueIndex) {
  let n = 0;
  for (let j = 0; j < queueIndex; j += 1) {
    const c = side.queue[j];
    if (c && c.effect === EFFECT_VANGUARD) {
      n += 1;
    }
  }
  return n;
}

function calculateCardRoundContribution(side, card, queueIndex) {
  if (card.type !== CARD_SCORE) {
    return 0;
  }

  const idxRaw =
    typeof queueIndex === "number" && queueIndex >= 0 ? queueIndex : side.queue.indexOf(card);
  const idx = idxRaw >= 0 ? idxRaw : 0;

  let contribution = card.value;
  if (typeof card.roundBlessBonus === "number") {
    contribution += card.roundBlessBonus;
  }
  if (card.effect === EFFECT_BLUFF && getOpponent(side).queue.length <= 3) {
    contribution += 2;
  }

  contribution += countVanguardsBeforeIndex(side, idx);

  if (card.effect === EFFECT_IMP && idx === side.queue.length - 1) {
    contribution += 3;
  }

  if (card.effect === EFFECT_CHIEFTAIN) {
    let lowCount = 0;
    for (let i = 0; i < side.queue.length; i += 1) {
      const c = side.queue[i];
      if (c && c.type === CARD_SCORE && typeof c.value === "number" && c.value < 2) {
        lowCount += 1;
      }
    }
    contribution += lowCount;
  }

  if (typeof card.roundLeechBonus === "number") {
    contribution += card.roundLeechBonus;
  }

  if (typeof card.roundMenacePenalty === "number") {
    contribution += card.roundMenacePenalty;
  }

  if (card.effect === EFFECT_WASTELAND) {
    let pollutionCount = 0;
    const opp = getOpponent(side);
    for (let i = 0; i < opp.queue.length; i += 1) {
      const c = opp.queue[i];
      if (c && c.tempPollution === true) {
        pollutionCount += 1;
      }
    }
    contribution += pollutionCount;
  }

  return contribution;
}

function getCardRoundContribution(card) {
  return card.roundContribution || 0;
}

function getCardDisplayValue(card) {
  if (card.type === CARD_SCORE && typeof card.roundContribution === "number") {
    return card.roundContribution;
  }

  return card.value;
}

function clearRoundCardState(card) {
  delete card.roundContribution;
  delete card.roundBlessBonus;
  delete card.roundLeechBonus;
  delete card.roundMenacePenalty;
}

function isBattleTemporaryCard(card) {
  return !!(card && (card.tempBomb === true || card.tempCopy === true || card.tempPollution === true));
}

function getOpponent(side) {
  return side.id === "player" ? game.ai : game.player;
}

function makeTemporaryPollutionCard() {
  return cloneCard({
    type: CARD_SCORE,
    value: -1,
    displayName: "污染",
    tempPollution: true,
    effectDescription: "临时效果：−1 分"
  });
}

function injectPollutionIntoDiscardPile(side) {
  if (!side || !game) {
    return;
  }

  const card = makeTemporaryPollutionCard();
  const pile = side.discardPile;
  const insertAt = pile.length === 0 ? 0 : Math.floor(Math.random() * (pile.length + 1));
  pile.splice(insertAt, 0, card);
}

function shuffleCardIntoDrawPile(side, card) {
  if (!side || !card) {
    return;
  }

  refillDrawPile(side);
  const pile = side.drawPile;
  const insertAt = pile.length === 0 ? 0 : Math.floor(Math.random() * (pile.length + 1));
  pile.splice(insertAt, 0, card);
}

function injectTemporaryBombIntoDrawPile(opponentSide) {
  if (!opponentSide || !game) {
    return;
  }

  refillDrawPile(opponentSide);
  const pile = opponentSide.drawPile;
  const bomb = cloneCard({ type: CARD_BOMB, value: 0, displayName: "临时炸弹", tempBomb: true });
  const insertAt = pile.length === 0 ? 0 : Math.floor(Math.random() * (pile.length + 1));
  pile.splice(insertAt, 0, bomb);
  showTip("埋伏：对手抽牌堆被塞入临时炸弹", TIPS_DEFAULT_DURATION_MS);
}

function triggerAmbushOnDiscard(ownerSide, card) {
  if (!ownerSide || !card || card.effect !== EFFECT_AMBUSH || card.type !== CARD_SCORE) {
    return;
  }

  injectTemporaryBombIntoDrawPile(getOpponent(ownerSide));
}

const BRUISER_MAX_DEPTH = 48;

function clearBruiserDrawMachine() {
  bruiserDrawMachine = null;
}

function isScoreBruiserCard(card) {
  return !!(card && card.type === CARD_SCORE && card.effect === EFFECT_BRUISER);
}

function startBruiserDrawSchedule(side, originCard, depth, followKind, queueBeforeSnap) {
  if (!game || scene !== "playing" || depth > BRUISER_MAX_DEPTH) {
    return false;
  }

  if (!isScoreBruiserCard(originCard)) {
    return false;
  }

  bruiserDrawMachine = {
    stack: [{ sideId: side.id, remaining: 2, depth: depth }],
    nextAt: Date.now() + DRAW_ANIM_DURATION,
    followKind: followKind,
    playerQueueBefore: followKind === "player" ? queueBeforeSnap : undefined,
    aiQueueBefore: followKind === "ai" ? queueBeforeSnap : undefined
  };
  return true;
}

function finalizeBruiserDrawFollowUp() {
  if (!game || scene !== "playing") {
    clearBruiserDrawMachine();
    return;
  }

  const m = bruiserDrawMachine;
  if (!m) {
    return;
  }

  clearBruiserDrawMachine();

  if (m.followKind === "player" && typeof m.playerQueueBefore === "number") {
    schedulePlayerActiveEffectsAfterDraw(game.player.queue.slice(m.playerQueueBefore));
    return;
  }

  if (m.followKind === "ai" && typeof m.aiQueueBefore === "number") {
    const chain = game.ai.queue.slice(m.aiQueueBefore).filter(hasActiveEffect);
    if (chain.length > 0) {
      pendingAiActiveEffect = {
        aiEffectChain: chain,
        resolveAt: Date.now() + DRAW_ANIM_DURATION
      };
    } else if (scene === "playing") {
      afterAction();
    }
    return;
  }

  afterAction();
}

function tickBruiserDrawMachine(now) {
  if (!bruiserDrawMachine || !game || scene !== "playing") {
    clearBruiserDrawMachine();
    return false;
  }

  const m = bruiserDrawMachine;
  if (now < m.nextAt) {
    return true;
  }

  if (m.stack.length > 0 && m.stack[m.stack.length - 1].remaining <= 0) {
    m.stack.pop();
    if (m.stack.length === 0) {
      finalizeBruiserDrawFollowUp();
      return false;
    }
    m.nextAt = now + DRAW_ANIM_DURATION;
    return true;
  }

  const frame = m.stack[m.stack.length - 1];
  const side = game[frame.sideId];

  if (!side || side.busted || side.stopped || side.queue.length >= QUEUE_LIMIT) {
    finalizeBruiserDrawFollowUp();
    return false;
  }

  refillDrawPile(side);
  if (side.drawPile.length === 0 && side.discardPile.length === 0) {
    finalizeBruiserDrawFollowUp();
    return false;
  }

  const card = drawCard(side);
  if (!card) {
    finalizeBruiserDrawFollowUp();
    return false;
  }

  triggerDrawEffect(side, card);
  frame.remaining -= 1;

  if (isScoreBruiserCard(card) && frame.depth + 1 <= BRUISER_MAX_DEPTH) {
    m.stack.push({ sideId: side.id, remaining: 2, depth: frame.depth + 1 });
  }

  m.nextAt = now + DRAW_ANIM_DURATION;
  return true;
}

function openNextPlayerPendingActiveModalOrAdvance() {
  if (!game || scene !== "playing") {
    return;
  }

  while (playerPendingActiveEffects.length > 0) {
    const next = playerPendingActiveEffects.shift();
    if (game.player.queue.indexOf(next) < 0 || !hasActiveEffect(next)) {
      continue;
    }

    pendingActiveEffect = {
      card: next,
      openAt: Date.now() + DRAW_ANIM_DURATION
    };
    return;
  }

  afterAction();
}

function schedulePlayerActiveEffectsAfterDraw(drawnSlice) {
  playerPendingActiveEffects = drawnSlice.filter(hasActiveEffect);
  openNextPlayerPendingActiveModalOrAdvance();
}

function makeTemporaryCopy(sourceCard) {
  const c = cloneCard(sourceCard);
  delete c.catalogId;
  delete c.roundContribution;
  delete c.roundBlessBonus;
  c.tempCopy = true;
  return c;
}

function playerHasValidShieldTarget(shieldCard) {
  const q = game.player.queue;
  const si = q.indexOf(shieldCard);
  if (si < 0 || q.length < 2) {
    return false;
  }

  for (let i = 0; i < q.length; i += 1) {
    if (i !== si && q[i]) {
      return true;
    }
  }

  return false;
}

function playerHasValidCopyTarget(copyCard) {
  const q = game.player.queue;
  const ci = q.indexOf(copyCard);
  if (ci < 0 || q.length < 2) {
    return false;
  }

  for (let i = 0; i < q.length; i += 1) {
    if (i !== ci && q[i]) {
      return true;
    }
  }

  return false;
}

function hasActiveEffect(card) {
  return card && card.effect && EFFECTS[card.effect] && EFFECTS[card.effect].trigger === "active";
}

function refillDrawPile(side) {
  if (side.drawPile.length === 0 && side.discardPile.length > 0) {
    side.drawPile = shuffle(side.discardPile);
    side.discardPile = [];
    side.status = "弃牌洗回";
  }
}

function stopSide(side) {
  side.stopped = true;
  side.status = "停手";
}

function playerDraw() {
  if (!canPlayerAct()) {
    return;
  }

  const queueBefore = game.player.queue.length;
  const card = drawCard(game.player);
  if (!card) {
    if (game.player.status === "队列已满") {
      showTip("队列已满，无法继续抽牌");
    } else if (game.player.status === "无牌可抽") {
      showTip("牌库已无牌可抽");
    }
    if (scene === "playing") {
      afterAction();
    }
    return;
  }

  triggerDrawEffect(game.player, card);
  const bruiserPending = startBruiserDrawSchedule(game.player, card, 0, "player", queueBefore);
  if (!bruiserPending) {
    const drawnSlice = game.player.queue.slice(queueBefore);
    schedulePlayerActiveEffectsAfterDraw(drawnSlice);
  }
}

function playerStop() {
  if (!canPlayerAct()) {
    return;
  }

  stopSide(game.player);
  afterAction();
}

function afterAction() {
  if (scene !== "playing" || game.matchWinner) {
    return;
  }

  if (game.player.stopped && game.ai.stopped) {
    settleStoppedRound();
    return;
  }

  advanceTurn();
}

function advanceTurn() {
  const previousActive = game.active;

  if (game.player.stopped && game.ai.stopped) {
    settleStoppedRound();
    return;
  }

  if (previousActive === "player") {
    if (!game.ai.stopped) {
      game.active = "ai";
      game.message = "AI 思考中...";
      aiActionAt = Date.now() + AI_DELAY;
    } else if (!game.player.stopped) {
      game.active = "player";
      game.message = "你的回合：继续抽，或停手。";
    }
    return;
  }

  if (!game.player.stopped) {
    game.active = "player";
    game.message = "你的回合：继续抽，或停手。";
  } else if (!game.ai.stopped) {
    game.active = "ai";
    game.message = "AI 思考中...";
    aiActionAt = Date.now() + AI_DELAY;
  }
}

function runAiTurn() {
  if (scene !== "playing" || game.active !== "ai" || game.ai.stopped) {
    return;
  }

  if (shouldAiDraw()) {
    const qBefore = game.ai.queue.length;
    const card = drawCard(game.ai);
    if (!card) {
      if (scene === "playing") {
        afterAction();
      }
      return;
    }

    tryOpponentSpeechCategory("onDraw", OPPONENT_LINE_ON_DRAW_CHANCE);

    triggerDrawEffect(game.ai, card);
    const bruiserPending = startBruiserDrawSchedule(game.ai, card, 0, "ai", qBefore);

    if (!bruiserPending) {
      const chain = game.ai.queue.slice(qBefore).filter(hasActiveEffect);
      if (scene === "playing" && chain.length > 0) {
        pendingAiActiveEffect = {
          aiEffectChain: chain,
          resolveAt: Date.now() + DRAW_ANIM_DURATION
        };
        return;
      }
    } else if (scene === "playing") {
      return;
    }
  } else {
    stopSide(game.ai);
  }

  if (scene === "playing") {
    afterAction();
  }
}

function openActiveEffectModal(card) {
  modal = {
    type: "activeEffect",
    title: getCardUIMainTitle(card),
    card: card
  };
}

function openModal(nextModal) {
  if (modal) {
    modalStack.push(modal);
  }

  modal = nextModal;
}

function closeModal() {
  modal = modalStack.pop() || null;
}

function resolveActiveEffect(useEffect) {
  if (!modal || modal.type !== "activeEffect") {
    return;
  }

  const card = modal.card;
  modal = null;
  modalStack = [];

  if (!useEffect) {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (card.effect === EFFECT_STEAL) {
    if (game.ai.queue.length === 0 || game.player.queue.length >= QUEUE_LIMIT) {
      game.player.status = "偷窃无目标";
      openNextPlayerPendingActiveModalOrAdvance();
      return;
    }

    modal = {
      type: "selectStealTarget",
      title: "选择偷窃目标",
      card: card
    };
    return;
  }

  if (card.effect === EFFECT_COPY) {
    if (!playerHasValidCopyTarget(card) || game.player.queue.length >= QUEUE_LIMIT) {
      game.player.status = "复制无目标";
      openNextPlayerPendingActiveModalOrAdvance();
      return;
    }

    modal = {
      type: "selectCopyTarget",
      title: "选择复制目标",
      card: card
    };
    return;
  }

  if (card.effect === EFFECT_INTIMIDATE) {
    applyIntimidateEffect();
  }

  if (card.effect === EFFECT_DIVINE_LIGHT) {
    applyHolyLightEffect(game.player, card);
  }

  if (card.effect === EFFECT_FLOOD) {
    applyFloodEffect();
    game.player.status = "洪水！双方各随机弃牌";
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (card.effect === EFFECT_POLLUTE) {
    injectPollutionIntoDiscardPile(game.ai);
    game.player.status = "污染：对手弃牌堆加入临时污染";
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (card.effect === EFFECT_INCITE) {
    if (!applyInciteEffect(game.player)) {
      game.player.status = game.player.status || "怂恿失败";
    }
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (card.effect === EFFECT_SHIELD) {
    if (!playerHasValidShieldTarget(card)) {
      game.player.status = "盾牌无目标";
      openNextPlayerPendingActiveModalOrAdvance();
      return;
    }

    modal = {
      type: "selectShieldTarget",
      title: "选择盾牌目标",
      card: card
    };
    return;
  }

  openNextPlayerPendingActiveModalOrAdvance();
}

function resolveAiActiveEffect(card) {
  const skillTipName = EFFECTS[card.effect] ? resolveEffectDisplayName(card) || EFFECTS[card.effect].name : "技能";
  showTip("对手发动了【" + skillTipName + "】");

  if (card.effect === EFFECT_STEAL) {
    const targetIndex = chooseAiStealTargetIndex();
    if (targetIndex >= 0) {
      applyStealEffectFor(game.ai, game.player, targetIndex);
    } else {
      game.ai.status = "偷窃无目标";
    }
    return;
  }

  if (card.effect === EFFECT_COPY) {
    const targetIndex = chooseAiCopyTargetIndex(card);
    if (targetIndex >= 0) {
      applyCopyEffectForAi(game.ai, card, targetIndex);
    } else {
      game.ai.status = "复制无目标";
    }
    return;
  }

  if (card.effect === EFFECT_INTIMIDATE) {
    applyIntimidateEffectFor(game.ai, game.player);
    return;
  }

  if (card.effect === EFFECT_DIVINE_LIGHT) {
    applyHolyLightEffect(game.ai, card);
    return;
  }

  if (card.effect === EFFECT_SHIELD) {
    const targetIndex = chooseAiShieldTargetIndex(card);
    if (targetIndex >= 0) {
      applyShieldEffectFor(game.ai, card, targetIndex);
    } else {
      game.ai.status = "盾牌无目标";
    }
    return;
  }

  if (card.effect === EFFECT_FLOOD) {
    if (chooseAiUseFloodNow()) {
      applyFloodEffect();
      game.ai.status = "洪水！双方各随机弃牌";
    } else {
      game.ai.status = "洪水：暂无目标";
    }
    return;
  }

  if (card.effect === EFFECT_POLLUTE) {
    injectPollutionIntoDiscardPile(game.player);
    game.ai.status = "污染：你的弃牌堆被塞入临时污染";
    return;
  }

  if (card.effect === EFFECT_INCITE) {
    if (chooseAiUseInciteNow()) {
      applyInciteEffect(game.ai);
    } else {
      game.ai.status = "怂恿：暂无时机";
    }
    return;
  }
}

function applyIntimidateEffect() {
  applyIntimidateEffectFor(game.player, game.ai);
}

function applyHolyLightEffect(user, sourceCard) {
  if (!user || !sourceCard || !game) {
    return false;
  }

  const q = user.queue;
  if (q.indexOf(sourceCard) < 0) {
    return false;
  }

  let hit = 0;
  for (let i = 0; i < q.length; i += 1) {
    const c = q[i];
    if (!c || c === sourceCard || c.type !== CARD_SCORE) {
      continue;
    }
    c.roundBlessBonus = (typeof c.roundBlessBonus === "number" ? c.roundBlessBonus : 0) + 1;
    hit += 1;
  }

  syncRoundScores();
  user.status = hit > 0 ? "圣光！其他记分卡+1" : "圣光：无其他记分卡";
  return true;
}

function applyFloodRandomDiscards(side, count, orderBase) {
  let order = orderBase;
  let done = 0;

  while (done < count && side.queue.length > 0) {
    const idx = Math.floor(Math.random() * side.queue.length);
    const removed = side.queue.splice(idx, 1)[0];
    discardQueuedCard(side, removed, idx, order, false);
    order += 1;
    done += 1;
  }

  return order;
}

function applyFloodEffect() {
  if (!game) {
    return;
  }

  let order = 0;
  order = applyFloodRandomDiscards(game.player, 2, order);
  applyFloodRandomDiscards(game.ai, 2, order);
  syncRoundScores();
}

function applyInciteEffect(user) {
  if (!game || scene !== "playing" || !user) {
    return false;
  }

  const opp = getOpponent(user);
  if (!opp || opp.busted) {
    user.status = "怂恿：对手无法抽牌";
    return false;
  }

  if (opp.stopped) {
    user.status = "怂恿：对手已停牌";
    return false;
  }

  if (opp.queue.length >= QUEUE_LIMIT) {
    user.status = "怂恿：对手队列已满";
    return false;
  }

  refillDrawPile(opp);
  if (opp.drawPile.length === 0 && opp.discardPile.length === 0) {
    user.status = "怂恿：对手无牌可抽";
    return false;
  }

  const queueBefore = opp.queue.length;
  const drawn = drawCard(opp);
  if (!drawn) {
    user.status = "怂恿：未能抽牌";
    return false;
  }

  triggerDrawEffect(opp, drawn);
  const bruiserPending = startBruiserDrawSchedule(opp, drawn, 0, opp.id === "player" ? "player" : "ai", queueBefore);

  if (!bruiserPending) {
    if (opp.id === "player") {
      schedulePlayerActiveEffectsAfterDraw(game.player.queue.slice(queueBefore));
    } else {
      const chain = game.ai.queue.slice(queueBefore).filter(hasActiveEffect);
      if (chain.length > 0) {
        pendingAiActiveEffect = {
          aiEffectChain: chain,
          resolveAt: Date.now() + DRAW_ANIM_DURATION
        };
      }
    }
  }

  user.status = "怂恿：对手再抽一张";
  return true;
}

function chooseAiUseFloodNow() {
  return game.player.queue.length + game.ai.queue.length >= 2;
}

function chooseAiUseInciteNow() {
  const opp = game.player;
  if (!opp || opp.busted || opp.stopped || opp.queue.length >= QUEUE_LIMIT) {
    return false;
  }

  if (opp.drawPile.length === 0 && opp.discardPile.length === 0) {
    return false;
  }

  return estimateBombRisk(opp) >= 0.26 || opp.roundScore >= game.ai.roundScore;
}

function applyShieldEffectFor(user, shieldCard, targetIndex) {
  if (!user || !shieldCard || !game) {
    return false;
  }

  const q = user.queue;
  const shieldIdx = q.indexOf(shieldCard);
  if (shieldIdx < 0 || targetIndex < 0 || targetIndex >= q.length || targetIndex === shieldIdx) {
    return false;
  }

  const target = q[targetIndex];
  if (!target) {
    return false;
  }

  q.splice(targetIndex, 1);
  clearRoundCardState(target);
  shuffleCardIntoDrawPile(user, target);
  syncRoundScores();
  user.status = "盾牌：已将一张牌洗回抽牌堆";
  return true;
}

function chooseAiShieldTargetIndex(shieldCard) {
  const q = game.ai.queue;
  const ci = q.indexOf(shieldCard);
  if (ci < 0 || q.length < 2) {
    return -1;
  }

  let bestIndex = -1;
  let bestContribution = Infinity;
  for (let i = 0; i < q.length; i += 1) {
    if (i === ci) {
      continue;
    }

    const c = q[i];
    if (!c) {
      continue;
    }

    const contrib = calculateCardRoundContribution(game.ai, c, i);
    if (contrib < bestContribution) {
      bestContribution = contrib;
      bestIndex = i;
    }
  }

  return bestIndex;
}

function applyShieldEffect(targetIndex) {
  const shieldCard = modal && modal.card ? modal.card : null;
  modal = null;
  modalStack = [];

  if (!shieldCard || !game || game.active !== "player") {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  const q = game.player.queue;
  const shieldIdx = q.indexOf(shieldCard);
  if (
    shieldIdx < 0 ||
    targetIndex < 0 ||
    targetIndex >= q.length ||
    targetIndex === shieldIdx ||
    !q[targetIndex]
  ) {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (!applyShieldEffectFor(game.player, shieldCard, targetIndex)) {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  openNextPlayerPendingActiveModalOrAdvance();
}

function applyStealEffect(index) {
  if (!applyStealEffectFor(game.player, game.ai, index)) {
    return;
  }

  modal = null;
  modalStack = [];
  openNextPlayerPendingActiveModalOrAdvance();
}

function applyCopyEffect(targetIndex) {
  const copyCard = modal && modal.card ? modal.card : null;
  modal = null;
  modalStack = [];

  if (!copyCard || !game || game.active !== "player") {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  const q = game.player.queue;
  const copyIdx = q.indexOf(copyCard);
  if (copyIdx < 0 || targetIndex < 0 || targetIndex >= q.length || targetIndex === copyIdx) {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  const target = q[targetIndex];
  if (!target) {
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  if (q.length >= QUEUE_LIMIT) {
    showTip("队列已满");
    openNextPlayerPendingActiveModalOrAdvance();
    return;
  }

  const dup = makeTemporaryCopy(target);
  q.splice(copyIdx + 1, 0, dup);
  syncRoundScores();
  game.player.status = "复制！获得临时复制";
  if (hasActiveEffect(dup)) {
    playerPendingActiveEffects.unshift(dup);
  }
  openNextPlayerPendingActiveModalOrAdvance();
}

function applyCopyEffectForAi(ai, copyCard, targetIndex) {
  const q = ai.queue;
  const copyIdx = q.indexOf(copyCard);
  if (copyIdx < 0 || targetIndex < 0 || targetIndex >= q.length || targetIndex === copyIdx) {
    return false;
  }

  const target = q[targetIndex];
  if (!target) {
    return false;
  }

  if (q.length >= QUEUE_LIMIT) {
    return false;
  }

  const dup = makeTemporaryCopy(target);
  q.splice(copyIdx + 1, 0, dup);
  syncRoundScores();
  ai.status = "复制！获得临时复制";
  if (hasActiveEffect(dup)) {
    resolveAiActiveEffect(dup);
  }
  return true;
}

function applyIntimidateEffectFor(user, target) {
  if (target.queue.length === 0) {
    user.status = "恐吓无目标";
    return false;
  }

  const index = Math.floor(Math.random() * target.queue.length);
  const removed = target.queue.splice(index, 1)[0];
  discardQueuedCard(target, removed, index, 0);
  syncRoundScores();
  user.status = "恐吓！弃掉对手一张牌";
  return true;
}

function applyStealEffectFor(user, target, index) {
  if (index < 0 || index >= target.queue.length || user.queue.length >= QUEUE_LIMIT) {
    user.status = "偷窃无目标";
    return false;
  }

  const stolen = target.queue.splice(index, 1)[0];
  const targetIndex = user.queue.length;
  if (!stolen.returnToSideId) {
    stolen.returnToSideId = target.id;
  }
  user.queue.push(stolen);
  triggerSlotMoveEffect(target, user, stolen, index, targetIndex);
  syncRoundScores();
  user.status = "偷窃！获得对手一张牌";
  return true;
}

function chooseAiStealTargetIndex() {
  if (game.player.queue.length === 0 || game.ai.queue.length >= QUEUE_LIMIT) {
    return -1;
  }

  let bestIndex = 0;
  let bestValue = getAiStealTargetValue(game.player.queue[0]);

  for (let i = 1; i < game.player.queue.length; i += 1) {
    const value = getAiStealTargetValue(game.player.queue[i]);
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
  }

  return bestValue > 0 ? bestIndex : -1;
}

function chooseAiCopyTargetIndex(copyCard) {
  const q = game.ai.queue;
  const ci = q.indexOf(copyCard);
  if (ci < 0 || q.length >= QUEUE_LIMIT) {
    return -1;
  }

  let bestIndex = -1;
  let bestValue = -Infinity;

  for (let i = 0; i < q.length; i += 1) {
    if (i === ci) {
      continue;
    }

    const c = q[i];
    if (!c) {
      continue;
    }

    const value = c.type === CARD_BOMB ? -900 + i * 0.01 : getAiStealTargetValue(c);
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
  }

  return bestIndex;
}

function getAiStealTargetValue(card) {
  if (card.type === CARD_BOMB) {
    return -1;
  }

  let value = getCardRoundContribution(card);
  if (card.effect === EFFECT_BLUFF) {
    value += 0.4;
  } else if (card.effect) {
    value += 0.2;
  }
  return value;
}

function shouldAiDraw() {
  const ai = game.ai;
  const player = game.player;

  if (ai.queue.length >= QUEUE_LIMIT || ai.drawPile.length + ai.discardPile.length === 0) {
    return false;
  }

  if (game.player.busted) {
    return false;
  }

  const bombRisk = estimateBombRisk(ai);
  const scoreGap = player.roundScore - ai.roundScore;
  const winGap = player.wins - ai.wins;
  const queuePressure = ai.queue.length / QUEUE_LIMIT;
  const expectedGain = estimateScoreGain(ai);
  const hasHpBuffer = ai.hp > 1;
  const hasFreeRecovery = ai.hp === MAX_HP;
  const targetScore = player.stopped ? player.roundScore + 1 : Math.max(4, player.roundScore + 2);

  if (player.stopped && !player.busted && ai.roundScore > player.roundScore) {
    return false;
  }
  const nextCard = ai.drawPile.length > 0 ? ai.drawPile[ai.drawPile.length - 1] : null;
  const mustChaseStoppedPlayer = player.stopped && ai.roundScore <= player.roundScore;
  const bombUnlocksDiscardPile = nextCard && nextCard.type === CARD_BOMB && ai.drawPile.length === 1 && ai.discardPile.length > 0;

  if (ai.roundScore >= targetScore && (player.stopped || ai.roundScore >= player.roundScore + 2)) {
    return false;
  }

  if (mustChaseStoppedPlayer && bombUnlocksDiscardPile && ai.hp > 1) {
    return true;
  }

  if (ai.queue.length === 0) {
    if (hasHpBuffer) {
      return true;
    }

    const openingRiskLimit = 0.42;
    const pressureBonus = scoreGap > 0 || winGap > 0 ? 0.1 : 0;
    return bombRisk < openingRiskLimit + pressureBonus;
  }

  let riskLimit = 0.34;

  if (scoreGap >= 2) {
    riskLimit += 0.24;
  } else if (scoreGap >= 0) {
    riskLimit += 0.14;
  }

  if (winGap > 0) {
    riskLimit += 0.12;
  }

  if (ai.hp >= 3) {
    riskLimit += hasFreeRecovery ? 0.22 : 0.12;
  } else if (hasHpBuffer) {
    riskLimit += 0.08;
  } else if (ai.hp === 1) {
    riskLimit -= 0.14;
  }

  if (expectedGain >= 2 && ai.roundScore < targetScore) {
    riskLimit += 0.08;
  }

  if (queuePressure > 0.7) {
    riskLimit -= 0.12;
  }

  return bombRisk < clamp(riskLimit, 0.18, hasFreeRecovery ? 0.9 : 0.82);
}

function estimateScoreGain(side) {
  const source = side.drawPile.length > 0 ? side.drawPile : side.discardPile;
  const scoreCards = source.filter(function (card) {
    return card.type === CARD_SCORE;
  });

  if (scoreCards.length === 0) {
    return 0;
  }

  const total = scoreCards.reduce(function (sum, card) {
    return sum + card.value;
  }, 0);

  return total / scoreCards.length;
}

function estimateBombRisk(side) {
  const available = side.drawPile.length || side.discardPile.length;
  if (available === 0) {
    return 1;
  }

  const source = side.drawPile.length > 0 ? side.drawPile : side.discardPile;
  const bombs = source.filter(function (card) {
    return card.type === CARD_BOMB;
  }).length;

  return bombs / source.length;
}

function settleStoppedRound() {
  if (game.player.busted && game.ai.busted) {
    finishRound(null, "双方都爆掉了，本局平分。");
    return;
  }

  if (game.player.busted) {
    finishRound("ai", "你爆掉了，对手通关本局。");
    return;
  }

  if (game.ai.busted) {
    finishRound("player", "对手爆掉了，你通关本局。");
    return;
  }

  const playerScore = game.player.roundScore;
  const aiScore = game.ai.roundScore;

  if (playerScore > aiScore) {
    finishRound("player", "你以筹码优势通过本局。");
  } else if (aiScore > playerScore) {
    finishRound("ai", "AI 以筹码优势通过本局。");
  } else {
    finishRound(null, "本局平分，无人通关。");
  }
}

function triggerTestWin() {
  if (scene !== "playing" || !game || game.matchWinner) {
    return;
  }

  game.player.wins = WIN_TARGET - 1;
  finishRound("player", "测试：玩家直接赢得整场对战。");
}

function finishRound(winnerId, message) {
  if (scene !== "playing") {
    return;
  }

  pendingActiveEffect = null;
  pendingAiActiveEffect = null;
  playerPendingActiveEffects = [];
  clearBruiserDrawMachine();
  modalStack = [];
  game.winner = winnerId;
  game.message = message;

  if (winnerId) {
    game[winnerId].wins += 1;
    winScoreSlotPulse = {
      sideId: winnerId,
      slotIndex: game[winnerId].wins - 1,
      startedAt: Date.now()
    };
  } else {
    winScoreSlotPulse = null;
  }

  if (game.player.wins >= WIN_TARGET || game.ai.wins >= WIN_TARGET) {
    game.matchWinner = game.player.wins >= WIN_TARGET ? "player" : "ai";
    const aiBust = game.matchWinner === "player" && game.ai.busted;
    const finalTip = game.matchWinner === "player" ? (aiBust ? "对手爆掉了！" : "你赢得了整场对战！") : "对手赢得了整场对战！";
    game.message = finalTip;
    showTip(finalTip, TIPS_MATCH_RESULT_MS);
    moveQueuesToDiscard();
    if (game.matchWinner === "ai") {
      forceOpponentSpeechCategory("matchVictory");
    } else if (game.matchWinner === "player") {
      forceOpponentSpeechCategory("matchDefeat");
    }
    if (game.matchWinner === "player") {
      matchVictoryRewardAt = Date.now() + MATCH_VICTORY_REWARD_DELAY_MS;
    } else {
      matchVictoryRewardAt = 0;
    }
    return;
  }

  moveQueuesToDiscard();

  if (winnerId === "ai") {
    tryOpponentSpeechCategory("roundWin", OPPONENT_LINE_ROUND_WIN_CHANCE);
  } else if (winnerId === "player") {
    tryOpponentSpeechCategory("roundLose", OPPONENT_LINE_ROUND_LOSE_CHANCE);
  }

  let roundTip = "";
  if (winnerId === "player") {
    roundTip = game.ai.busted ? "对手爆掉了！" : "你赢了本局";
  } else if (winnerId === "ai") {
    roundTip = game.player.busted ? "你爆掉了，对手赢了本局" : "对手赢了本局";
  } else {
    roundTip = "本局打平";
  }
  showTip(roundTip, TIPS_ROUND_RESULT_MS);
  game.message = roundTip;
  roundAdvanceAt = Date.now() + ROUND_END_DELAY;
}

function moveQueuesToDiscard() {
  let order = 0;
  order = moveQueue(game.player, order, true);
  moveQueue(game.ai, order, true);
}

function moveQueue(side, startOrder, deferDiscard) {
  side.queue.forEach(function (card, index) {
    discardQueuedCard(side, card, index, startOrder + index, deferDiscard);
  });
  const count = side.queue.length;
  if (!deferDiscard) {
    side.queue = [];
  }
  return startOrder + count;
}

function discardQueuedCard(side, card, queueIndex, animationOrder, deferQueueCommit) {
  const returnSide = card.returnToSideId && game[card.returnToSideId] ? game[card.returnToSideId] : side;
  triggerDiscardEffect(side, returnSide, card, queueIndex, animationOrder || 0, deferQueueCommit);
  if (deferQueueCommit) {
    return;
  }

  triggerAmbushOnDiscard(side, card);
  clearRoundCardState(card);
  delete card.returnToSideId;
  if (!isBattleTemporaryCard(card)) {
    returnSide.discardPile.push(card);
  }
}

function commitDeferredDiscardEffect(effect) {
  if (!effect || effect.type !== "discard" || !effect.deferQueueCommit) {
    return;
  }

  const sourceSide = game[effect.sourceSideId];
  if (sourceSide) {
    const idx = sourceSide.queue.indexOf(effect.card);
    if (idx >= 0) {
      sourceSide.queue.splice(idx, 1);
    }
  }

  const targetSide = game[effect.targetSideId];
  triggerAmbushOnDiscard(sourceSide, effect.card);
  clearRoundCardState(effect.card);
  delete effect.card.returnToSideId;
  if (targetSide && !isBattleTemporaryCard(effect.card)) {
    targetSide.discardPile.push(effect.card);
  }
}

function flushDeferredDiscardEffects() {
  activeEffects.forEach(function (effect) {
    if (effect.type === "discard" && effect.deferQueueCommit) {
      commitDeferredDiscardEffect(effect);
    }
  });
  activeEffects = activeEffects.filter(function (effect) {
    return !(effect.type === "discard" && effect.deferQueueCommit);
  });
}

function advanceFromRoundEnd() {
  if (roundAdvanceAt <= 0) {
    return;
  }

  flushDeferredDiscardEffects();
  roundAdvanceAt = 0;
  startRound();
}

function computeVictoryRewardBreakdown(goldBefore) {
  const safeGold = Math.max(0, goldBefore | 0);
  const baseGold = VICTORY_BASE_GOLD;
  const interestGold = Math.min(VICTORY_INTEREST_CAP, Math.floor(safeGold / GOLD_PER_INTEREST_UNIT));

  return {
    goldBefore: safeGold,
    baseGold: baseGold,
    interestGold: interestGold,
    totalGold: baseGold + interestGold
  };
}

function openVictoryRewardModal() {
  ensureRunState();
  flushDeferredDiscardEffects();
  activeEffects = [];
  pendingActiveEffect = null;
  pendingAiActiveEffect = null;
  playerPendingActiveEffects = [];
  clearBruiserDrawMachine();
  modalStack = [];
  buttons = {};

  const goldBefore = runState.gold;
  const breakdown = computeVictoryRewardBreakdown(goldBefore);
  modal = Object.assign({ type: "victoryReward" }, breakdown);
}

function confirmVictoryRewards() {
  ensureRunState();
  if (!modal || modal.type !== "victoryReward") {
    return;
  }

  runState.battlesWon += 1;
  runState.gold += modal.totalGold;
  modal = null;
  modalStack = [];
  buttons = {};

  const currentNodeAfterWin = getCurrentRouteNode();
  const beatBossSegment =
    runState.routeRows &&
    currentNodeAfterWin &&
    currentNodeAfterWin.type === ROUTE_NODE_BOSS &&
    isRouteComplete();

  if (beatBossSegment) {
    runState.bossesDefeated += 1;
    if (runState.bossesDefeated >= RUN_BOSS_ROUNDS) {
      enterRunVictory();
      return;
    }

    runState.routeRows = makeRouteRows(runState.bossesDefeated);
    seedAutoVisitedRouteCells();
    enterRouteMap();
    return;
  }

  enterRouteMap();
}

function generateCardChoices(count) {
  const entries = shuffle(getRewardCatalogEntries().slice());
  const choices = [];
  for (let i = 0; i < count; i += 1) {
    choices.push(cloneCard(entries[i % entries.length].card));
  }
  return choices;
}

function enterBackstage() {
  ensureRunState();
  runState.shopRefreshNextCost = SHOP_REFRESH_FIRST_COST;
  runState.shopCards = generateShopCards(SHOP_CARD_COUNT);
  runState.removeCardCost = REMOVE_CARD_COST;
  scene = "backstage";
  modal = null;
  modalStack = [];
  buttons = {};
}

function enterRouteMap() {
  ensureRunState();
  scene = "routeMap";
  modal = null;
  modalStack = [];
  buttons = {};
  shopCardHitAreas = [];
  shopBuyButtonHitAreas = [];
  routeNodeHitAreas = [];
}

function getShopRefreshNextCost() {
  ensureRunState();
  const n = runState.shopRefreshNextCost;
  return typeof n === "number" && !isNaN(n) ? n : SHOP_REFRESH_FIRST_COST;
}

function canRefreshShop() {
  ensureRunState();
  if (getShopCatalogEntries().length === 0) {
    return false;
  }
  return runState.gold >= getShopRefreshNextCost();
}

function refreshShop() {
  ensureRunState();
  if (getShopCatalogEntries().length === 0) {
    showTip("暂无可刷新的商品");
    return;
  }

  const cost = getShopRefreshNextCost();
  if (runState.gold < cost) {
    showTip("金币不足，刷新需 " + cost + " 金币");
    return;
  }

  runState.gold -= cost;
  runState.shopRefreshNextCost = cost + SHOP_REFRESH_STEP;
  runState.shopCards = generateShopCards(SHOP_CARD_COUNT);
  showTip("已刷新商店（-" + cost + " 金币）");
}

function generateShopCards(count) {
  const entries = shuffle(getShopCatalogEntries().slice());
  if (entries.length === 0) {
    return [];
  }

  const shop = [];
  for (let i = 0; i < count; i += 1) {
    const e = entries[i % entries.length];
    const cid = Number(e.id);
    shop.push({
      card: cloneCard(e.card),
      cost: typeof e.shopPrice === "number" ? e.shopPrice : SHOP_CARD_COST,
      bought: false,
      catalogId: !isNaN(cid) ? cid : null
    });
  }
  return shop;
}

function buyShopCard(index) {
  ensureRunState();
  const item = runState.shopCards[index];
  if (!item || item.bought) {
    return;
  }

  if (runState.gold < item.cost) {
    showTip("金币不足，无法购买");
    return;
  }

  runState.gold -= item.cost;
  item.bought = true;
  const bought = cloneCard(item.card);
  if (item.catalogId != null && typeof item.catalogId === "number" && !isNaN(item.catalogId)) {
    bought.catalogId = item.catalogId;
  }
  runState.deck.push(bought);
  showTip("购买成功：" + getCardName(item.card));
}

function openRemoveCardModal() {
  ensureRunState();
  const cost = getRemoveCardCost();
  const removableCards = getRemovableDeckCards();
  if (runState.gold < cost) {
    showTip("金币不足，无法删牌");
    return;
  }

  if (removableCards.length === 0) {
    showTip("没有可删除的非炸弹卡");
    return;
  }

  openModal({
    type: "removeCard",
    title: "删除一张牌",
    cards: removableCards
  });
}

function removeRunCard(index) {
  ensureRunState();
  const cost = getRemoveCardCost();
  if (runState.gold < cost) {
    showTip("金币不足，无法删牌");
    return;
  }

  const target = runState.deck[index];
  if (!target || target.type === CARD_BOMB) {
    showTip("只能删除非炸弹卡");
    return;
  }

  const removed = runState.deck.splice(index, 1)[0];
  if (!removed) {
    return;
  }

  runState.gold -= cost;
  runState.removeCardCost = cost + REMOVE_CARD_COST;
  modal = null;
  modalStack = [];
  showTip("已删除：" + getCardName(removed));
}

function getRemoveCardCost() {
  ensureRunState();
  return runState.removeCardCost || REMOVE_CARD_COST;
}

function getRemovableDeckCards() {
  ensureRunState();
  return runState.deck.reduce(function (cards, card, index) {
    if (card.type !== CARD_BOMB) {
      const displayCard = cloneCard(card);
      displayCard.removeIndex = index;
      cards.push(displayCard);
    }
    return cards;
  }, []);
}

function enterOpponentSelect() {
  ensureRunState();
  runState.opponentChoices = DEFAULT_OPPONENT_CHOICES.map(function (opponent) {
    return Object.assign({}, opponent);
  });
  scene = "opponentSelect";
  modal = null;
  modalStack = [];
  buttons = {};
}

function chooseOpponent(index) {
  ensureRunState();
  startNextRunBattle();
}

function getCardName(card) {
  if (!card) {
    return "未知卡牌";
  }

  if (card.displayName) {
    return card.displayName;
  }

  if (card.type === CARD_BOMB) {
    return "炸弹";
  }

  const base = "点数 " + card.value;
  if (card.effect && EFFECTS[card.effect]) {
    return base + " · " + resolveEffectDisplayName(card);
  }

  return base;
}

function canPlayerAct() {
  return (
    scene === "playing" &&
    !game.matchWinner &&
    !(roundAdvanceAt > Date.now()) &&
    !pendingActiveEffect &&
    game.active === "player" &&
    !game.player.stopped &&
    !game.player.busted &&
    !(bruiserDrawMachine && bruiserDrawMachine.followKind === "player")
  );
}

function triggerDrawEffect(side, card) {
  if (!card) {
    return;
  }

  activeEffects.push({
    type: "draw",
    sideId: side.id,
    card: card,
    queueIndex: Math.max(0, side.queue.length - 1),
    startedAt: Date.now()
  });

  if (card.type === CARD_BOMB) {
    activeEffects.push({
      type: "bomb",
      sideId: side.id,
      queueIndex: Math.max(0, side.queue.length - 1),
      lostHeartIndex: side.hp,
      startedAt: Date.now()
    });
  }
}

function triggerDiscardEffect(sourceSide, targetSide, card, queueIndex, order, deferQueueCommit) {
  if (!card || typeof queueIndex !== "number") {
    return;
  }

  activeEffects.push({
    type: "discard",
    sourceSideId: sourceSide.id,
    targetSideId: targetSide.id,
    card: card,
    queueIndex: Math.max(0, queueIndex),
    deferQueueCommit: !!deferQueueCommit,
    startedAt: Date.now() + Math.max(0, order || 0) * DISCARD_ANIM_STAGGER
  });
}

function triggerSlotMoveEffect(sourceSide, targetSide, card, fromIndex, toIndex) {
  if (!card || typeof fromIndex !== "number" || typeof toIndex !== "number") {
    return;
  }

  activeEffects.push({
    type: "slotMove",
    sourceSideId: sourceSide.id,
    targetSideId: targetSide.id,
    card: card,
    fromQueueIndex: Math.max(0, fromIndex),
    toQueueIndex: Math.max(0, toIndex),
    startedAt: Date.now()
  });
}

function pruneEffects(now) {
  activeEffects = activeEffects.filter(function (effect) {
    const duration = getEffectDuration(effect);

    if (effect.type === "discard" && effect.deferQueueCommit) {
      if (now >= effect.startedAt + duration) {
        commitDeferredDiscardEffect(effect);
        return false;
      }
      return true;
    }

    return now - effect.startedAt < duration;
  });
}

function getEffectDuration(effect) {
  if (effect.type === "draw") {
    return DRAW_ANIM_DURATION;
  }

  if (effect.type === "discard") {
    return DISCARD_ANIM_DURATION;
  }

  if (effect.type === "slotMove") {
    return SLOT_MOVE_ANIM_DURATION;
  }

  if (effect.type === "bomb") {
    return Math.max(BOMB_ANIM_DURATION, HEART_FLASH_DURATION);
  }

  return 0;
}

function hitButton(point, button) {
  if (!button) {
    return false;
  }

  return point.x >= button.x && point.x <= button.x + button.w && point.y >= button.y && point.y <= button.y + button.h;
}

function hitRouteNode(point, area) {
  if (!area) {
    return false;
  }
  const dx = Math.abs(point.x - area.cx) / area.rx;
  const dy = Math.abs(point.y - area.cy) / area.ry;
  return dx + dy <= 1;
}

function getCanvasPoint(event) {
  const touch = event.changedTouches && event.changedTouches[0] ? event.changedTouches[0] : event.touches[0];
  const rect = canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : { left: 0, top: 0, width: canvas.width, height: canvas.height };
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY
  };
}

function handleTouch(event) {
  const point = getCanvasPoint(event);

  if (modal) {
    if (modal.type === "activeEffect") {
      if (hitButton(point, buttons.useEffect)) {
        resolveActiveEffect(true);
      } else if (hitButton(point, buttons.skipEffect)) {
        resolveActiveEffect(false);
      } else {
        handleBoardInfoTouch(point);
      }
      return;
    }

    if (modal.type === "selectStealTarget") {
      const target = queueCardHitAreas.find(function (area) {
        return area.side.id === "ai" && hitButton(point, area);
      });

      if (target) {
        applyStealEffect(target.index);
      } else if (hitButton(point, buttons.skipEffect)) {
        modal = null;
        openNextPlayerPendingActiveModalOrAdvance();
      }
      return;
    }

    if (modal.type === "selectCopyTarget") {
      const pick = queueCardHitAreas.find(function (area) {
        return area.side.id === "player" && hitButton(point, area);
      });

      const copyCard = modal.card;
      const copyIdx = copyCard ? game.player.queue.indexOf(copyCard) : -1;

      if (pick && copyIdx >= 0 && pick.index !== copyIdx && pick.card) {
        applyCopyEffect(pick.index);
      } else if (hitButton(point, buttons.skipEffect)) {
        modal = null;
        modalStack = [];
        openNextPlayerPendingActiveModalOrAdvance();
      }
      return;
    }

    if (modal.type === "selectShieldTarget") {
      const pick = queueCardHitAreas.find(function (area) {
        return area.side.id === "player" && hitButton(point, area);
      });

      const shieldCard = modal.card;
      const shieldIdx = shieldCard ? game.player.queue.indexOf(shieldCard) : -1;

      if (pick && shieldIdx >= 0 && pick.index !== shieldIdx && pick.card) {
        applyShieldEffect(pick.index);
      } else if (hitButton(point, buttons.skipEffect)) {
        modal = null;
        modalStack = [];
        openNextPlayerPendingActiveModalOrAdvance();
      }
      return;
    }

    if (modal.type === "cardTip") {
      closeModal();
      return;
    }

    if (modal.type === "removeCard") {
      const removeHit = modalCardHitAreas.find(function (area) {
        return hitButton(point, area);
      });

      if (removeHit) {
        const removeIndex = typeof removeHit.card.removeIndex === "number" ? removeHit.card.removeIndex : removeHit.index;
        removeRunCard(removeIndex);
        return;
      }

      if (hitButton(point, buttons.closeModal)) {
        closeModal();
      }
      return;
    }

    if (modal.type === "victoryReward") {
      if (hitButton(point, buttons.interestHelp)) {
        showTip(INTEREST_RULE_TEXT, 3200);
        return;
      }
      if (hitButton(point, buttons.continueReward)) {
        confirmVictoryRewards();
      }
      return;
    }

    if (modal.type === "pile") {
      const modalCardHit = modalCardHitAreas.find(function (area) {
        return hitButton(point, area);
      });

      if (modalCardHit) {
        openCardTipModal(modalCardHit.card);
        return;
      }
    }

    if (hitButton(point, buttons.closeModal)) {
      closeModal();
    }
    return;
  }

  if (scene === "runVictory") {
    if (hitButton(point, buttons.runVictoryOk)) {
      runState = null;
      scene = "title";
    }
    return;
  }

  if (scene === "title") {
    if (!buttons.titleStart || !hitButton(point, buttons.titleStart)) {
      return;
    }
    if (!bootstrapReady) {
      showTip("正在载入卡牌数据…");
      return;
    }
    startGame();
    return;
  }

  if (scene === "backstage") {
    handleBackstageTouch(point);
    return;
  }

  if (scene === "routeMap") {
    handleRouteMapTouch(point);
    return;
  }

  if (scene === "opponentSelect") {
    handleOpponentSelectTouch(point);
    return;
  }

  if (scene === "playing" && game.matchWinner) {
    if (game.matchWinner === "ai" && hitButton(point, buttons.rematch)) {
      startGame();
    }
    return;
  }

  if (scene === "playing" && roundAdvanceAt > 0) {
    advanceFromRoundEnd();
    return;
  }

  if (handleBoardInfoTouch(point)) {
    return;
  }

  if (hitButton(point, buttons.draw)) {
    playerDraw();
  } else if (hitButton(point, buttons.stop)) {
    playerStop();
  }
}

function handleBackstageTouch(point) {
  if (handleRunBottomBarTouch(point)) {
    return;
  }

  const buyButtonHit = shopBuyButtonHitAreas.find(function (area) {
    return hitButton(point, area);
  });

  if (buyButtonHit) {
    buyShopCard(buyButtonHit.index);
    return;
  }

  const shopHit = shopCardHitAreas.find(function (area) {
    return hitButton(point, area);
  });

  if (shopHit) {
    openCardTipModal(shopHit.card);
    return;
  }

  if (hitButton(point, buttons.shopRefresh)) {
    refreshShop();
    return;
  }

  if (hitButton(point, buttons.removeCard)) {
    openRemoveCardModal();
    return;
  }

  if (hitButton(point, buttons.leaveBackstage)) {
    enterRouteMap();
  }
}

function handleRouteMapTouch(point) {
  if (handleRunBottomBarTouch(point)) {
    return;
  }

  const hit = routeNodeHitAreas.find(function (area) {
    return hitRouteNode(point, area);
  });

  if (!hit) {
    return;
  }

  selectRouteNode(hit.node);
}

function handleOpponentSelectTouch(point) {
  if (handleRunBottomBarTouch(point)) {
    return;
  }

  if (hitButton(point, buttons.opponentA)) {
    chooseOpponent(0);
    return;
  }

  if (hitButton(point, buttons.opponentB)) {
    chooseOpponent(1);
  }
}

function handleRunBottomBarTouch(point) {
  if (hitButton(point, buttons.runDeck)) {
    openRunDeckModal();
    return true;
  }

  return false;
}

function handleBoardInfoTouch(point) {
  const pileHit = pileHitAreas.find(function (area) {
    return hitButton(point, area);
  });

  if (pileHit) {
    openPileModal(pileHit.side, pileHit.pileType);
    return true;
  }

  const queueHit = queueCardHitAreas.find(function (area) {
    return hitButton(point, area);
  });

  if (queueHit) {
    openCardTipModal(queueHit.card);
    return true;
  }

  return false;
}

function update() {
  const now = Date.now();
  if (scene === "playing" && game && game.opponentSpeechBubble && now >= game.opponentSpeechBubble.until) {
    game.opponentSpeechBubble = null;
  }
  pruneEffects(now);
  updateTips(now);

  if (scene === "playing" && tickBruiserDrawMachine(now)) {
    return;
  }

  if (modal) {
    return;
  }

  if (scene === "playing" && game && game.matchWinner === "player" && matchVictoryRewardAt > 0 && now >= matchVictoryRewardAt) {
    matchVictoryRewardAt = 0;
    openVictoryRewardModal();
    return;
  }

  if (scene === "playing" && game.matchWinner) {
    return;
  }

  if (scene === "playing" && pendingActiveEffect && now >= pendingActiveEffect.openAt) {
    const card = pendingActiveEffect.card;
    pendingActiveEffect = null;
    openActiveEffectModal(card);
    return;
  }

  if (scene === "playing" && pendingAiActiveEffect && now >= pendingAiActiveEffect.resolveAt) {
    const chain = pendingAiActiveEffect.aiEffectChain;
    const legacyCard = pendingAiActiveEffect.card;
    pendingAiActiveEffect = null;
    const list = chain && chain.length ? chain.slice() : legacyCard ? [legacyCard] : [];
    list.forEach(function (c) {
      resolveAiActiveEffect(c);
    });
    if (scene === "playing") {
      afterAction();
    }
    return;
  }

  if (scene === "playing" && roundAdvanceAt > 0 && now >= roundAdvanceAt) {
    advanceFromRoundEnd();
    return;
  }

  if (scene === "playing" && game && game.active === "ai" && aiActionAt > 0 && now >= aiActionAt && !(roundAdvanceAt > now)) {
    aiActionAt = 0;
    runAiTurn();
  }
}

function drawBackground(width, height) {
  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, "#0c0e14");
  g.addColorStop(0.55, "#07080c");
  g.addColorStop(1, "#030406");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  const v = ctx.createRadialGradient(
    width * 0.5,
    height * 0.42,
    Math.min(width, height) * 0.12,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.72
  );
  v.addColorStop(0, "rgba(0, 0, 0, 0)");
  v.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, width, height);
}

function drawTitle(width, height) {
  buttons = {};
  drawBackground(width, height);
  const lm = getTitleMenuLayout();
  const hasLogoImage = drawTitleLogo(width, height);
  if (!hasLogoImage && lm.fallbackLogoTextWhenNoImage) {
    drawCenteredText(lm.fallbackLogoTextWhenNoImage, width / 2, height * 0.28, 40, THEME.text, "bold");
  }

  buttons.titleStart = getTitleStartButtonRect(width, height);
  const canStart = bootstrapReady;

  if (!canStart && lm.showBootstrapLoadingHint) {
    drawCenteredText(
      "载入卡牌数据…",
      width / 2,
      height * lm.bootstrapLoadingHintYRatio,
      lm.bootstrapLoadingHintSize != null ? lm.bootstrapLoadingHintSize : 13,
      THEME.muted,
      "normal"
    );
  }

  drawButton(buttons.titleStart, "开始游戏", canStart ? THEME.button : "#3b3f52", "#120613", canStart);
}

function drawTitleLogo(width, height) {
  if (!titleLogo.isReady || !titleLogo.image) {
    return false;
  }

  const lm = getTitleMenuLayout();
  const logoW = Math.min(width * lm.logoMaxWidthRatio, lm.logoMaxWidthCap);
  const logoAspect =
    titleLogo.image.naturalWidth && titleLogo.image.naturalHeight
      ? titleLogo.image.naturalHeight / titleLogo.image.naturalWidth
      : titleLogo.image.height && titleLogo.image.width
        ? titleLogo.image.height / titleLogo.image.width
        : 0.42;
  const logoH = logoW * logoAspect;
  const logoX = (width - logoW) / 2;
  const logoY = height * lm.logoTopRatio;

  ctx.save();
  ctx.shadowColor = "rgba(126, 74, 255, 0.42)";
  ctx.shadowBlur = 18;
  ctx.drawImage(titleLogo.image, logoX, logoY, logoW, logoH);
  ctx.restore();
  return true;
}

function drawVictoryRewardModal(width, height) {
  buttons = {};

  ctx.fillStyle = "rgba(6, 10, 20, 0.48)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(2, 4, 12, 0.28)";
  ctx.fillRect(0, 0, width, height);

  const PAD_TOP = 22;
  const PAD_SIDE = 20;
  const PAD_BOTTOM = 18;
  const ROW_LABEL_H = 22;
  const ROW_VALUE_H = 28;
  const GAP_SECTION = 16;
  const GAP_BEFORE_BTN = 16;
  const BTN_H = 42;

  const panelW = clamp(Math.min(292, width - 44), 236, width - 28);

  const panelH =
    PAD_TOP +
    ROW_LABEL_H +
    ROW_VALUE_H +
    GAP_SECTION +
    ROW_LABEL_H +
    ROW_VALUE_H +
    GAP_SECTION +
    ROW_LABEL_H +
    ROW_VALUE_H +
    GAP_BEFORE_BTN +
    BTN_H +
    PAD_BOTTOM;

  const panel = {
    x: (width - panelW) / 2,
    y: (height - panelH) / 2,
    w: panelW,
    h: panelH
  };
  const cx = panel.x + panel.w / 2;

  ctx.save();
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  ctx.shadowOffsetY = 0;

  ctx.fillStyle = "rgba(22, 28, 46, 0.82)";
  ctx.strokeStyle = "rgba(160, 220, 255, 0.22)";
  ctx.lineWidth = 1;
  roundRect(panel.x, panel.y, panel.w, panel.h, 14, true, true);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;
  roundRect(panel.x + 1, panel.y + 1, panel.w - 2, panel.h - 2, 13, false, true);

  ctx.restore();

  let top = panel.y + PAD_TOP;

  drawCenteredMiddleText("奖金", cx, top + ROW_LABEL_H / 2, 14, THEME.text, "bold");
  top += ROW_LABEL_H;
  drawCenteredMiddleText(String(modal.baseGold), cx, top + ROW_VALUE_H / 2, 22, THEME.gold, "bold");
  top += ROW_VALUE_H;

  top += GAP_SECTION;

  const interestRowCy = top + ROW_LABEL_H / 2;
  ctx.save();
  ctx.font = "bold 14px " + UI_FONT;
  const interestLabelW = ctx.measureText("利息").width;
  ctx.restore();

  drawCenteredMiddleText("利息", cx, interestRowCy, 14, THEME.text, "bold");

  const qTap = 22;
  const qGap = 10;

  buttons.interestHelp = {
    x: cx + interestLabelW / 2 + qGap,
    y: interestRowCy - qTap / 2,
    w: qTap,
    h: qTap
  };

  ctx.fillStyle = "rgba(255, 255, 255, 0.09)";
  ctx.strokeStyle = "rgba(180, 210, 255, 0.28)";
  ctx.lineWidth = 1;
  roundRect(buttons.interestHelp.x, buttons.interestHelp.y, buttons.interestHelp.w, buttons.interestHelp.h, 6, true, true);
  drawCenteredMiddleText(
    "?",
    buttons.interestHelp.x + buttons.interestHelp.w / 2,
    interestRowCy,
    12,
    THEME.muted,
    "bold"
  );

  top += ROW_LABEL_H;

  drawCenteredMiddleText(String(modal.interestGold), cx, top + ROW_VALUE_H / 2, 22, THEME.gold, "bold");
  top += ROW_VALUE_H;

  top += GAP_SECTION;

  drawCenteredMiddleText("合计", cx, top + ROW_LABEL_H / 2, 14, THEME.text, "bold");
  top += ROW_LABEL_H;
  drawCenteredMiddleText(String(modal.totalGold), cx, top + ROW_VALUE_H / 2, 22, THEME.gold, "bold");
  top += ROW_VALUE_H;

  top += GAP_BEFORE_BTN;

  buttons.continueReward = {
    x: panel.x + PAD_SIDE,
    y: top,
    w: panel.w - PAD_SIDE * 2,
    h: BTN_H
  };
  drawButton(buttons.continueReward, "继续", THEME.buttonStop, "#061d1b", true);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawBackstage(width, height) {
  buttons = {};
  shopCardHitAreas = [];
  shopBuyButtonHitAreas = [];
  drawBackground(width, height);

  const bottomBar = getRunBottomBarRect(width, height);
  const panel = { x: 16, y: height * 0.06, w: width - 32, h: bottomBar.y - height * 0.06 - 14 };
  drawBackstageRoom(width, height, panel, bottomBar);
  drawCenteredText("幕后牌间", width / 2, panel.y + 38, 22, THEME.text, "bold");

  const wlBtn = getWidgetLayout();
  const btnHShop = wlBtn.controlHeight;
  const btnGapShop = wlBtn.controlGap;
  const shopInnerW = panel.w - 40;
  const gridShopH = Math.max(80, panel.h - 226 - btnHShop - btnGapShop);

  drawCardGrid(
    (runState ? runState.shopCards : []).map(function (item) {
      return item.card;
    }),
    panel.x + 20,
    panel.y + 92,
    shopInnerW,
    gridShopH,
    width,
    height,
    shopCardHitAreas,
    { fixedColumns: 4 }
  );
  if (runState && runState.shopCards.length === 0) {
    drawCenteredText("暂无卡可售（请确认已载入 cards.json）", width / 2, panel.y + panel.h * 0.42, 13, THEME.muted, "normal");
  }
  drawShopBuyButtons();

  const wl = getWidgetLayout();
  const btnH = wl.controlHeight;
  const btnGap = wl.controlGap;
  const innerW = panel.w - 40;
  const leaveY = panel.y + panel.h - 16 - btnH;
  const refreshRemoveY = leaveY - btnGap - btnH;
  const refreshCost = getShopRefreshNextCost();
  const refreshOk = canRefreshShop();
  const pairW = (innerW - btnGap) / 2;
  buttons.shopRefresh = { x: panel.x + 20, y: refreshRemoveY, w: pairW, h: btnH };
  buttons.removeCard = { x: panel.x + 20 + pairW + btnGap, y: refreshRemoveY, w: pairW, h: btnH };
  buttons.leaveBackstage = { x: panel.x + 20, y: leaveY, w: innerW, h: btnH };
  drawButton(buttons.shopRefresh, "刷新 " + refreshCost + " 金币", refreshOk ? THEME.button : "#3b3f52", "#120613", refreshOk);
  drawButton(buttons.removeCard, "删牌 " + getRemoveCardCost() + " 金币", THEME.button, "#120613", canRemoveRunCard());
  drawButton(buttons.leaveBackstage, "返回路线", THEME.buttonStop, "#061d1b", true);
  drawRunBottomBar(width, height);
}

function drawBackstageRoom(width, height, panel, bottomBar) {
  const room = { x: 8, y: 8, w: width - 16, h: bottomBar.y - 18 };
  const backdrop = ctx.createLinearGradient(0, room.y, 0, room.y + room.h);
  backdrop.addColorStop(0, "#101218");
  backdrop.addColorStop(1, "#060708");
  ctx.fillStyle = backdrop;
  roundRect(room.x, room.y, room.w, room.h, 12, true, false);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 1;
  roundRect(room.x + 0.5, room.y + 0.5, room.w - 1, room.h - 1, 12, false, true);
}

function drawRunVictory(width, height) {
  buttons = {};
  drawBackground(width, height);
  drawCenteredText("远征胜利", width / 2, height * 0.3, 30, THEME.gold, "bold");
  drawCenteredText("你已击败全部 " + RUN_BOSS_ROUNDS + " 名庄家", width / 2, height * 0.4, 17, THEME.text, "normal");
  drawCenteredText("每轮终点庄家战前会永久塞入 1 张炸弹", width / 2, height * 0.47, 12, THEME.muted, "normal");
  buttons.runVictoryOk = { x: width * 0.2, y: height * 0.68, w: width * 0.6, h: 50 };
  drawButton(buttons.runVictoryOk, "返回标题", THEME.buttonStop, "#061d1b", true);
}

function drawRouteMap(width, height) {
  buttons = {};
  routeNodeHitAreas = [];
  shopCardHitAreas = [];
  shopBuyButtonHitAreas = [];
  drawBackground(width, height);

  const bottomBar = getRunBottomBarRect(width, height);
  const routeTitleY = height * 0.085 + 10;
  drawCenteredText("挑战路线", width / 2, routeTitleY, 24, THEME.text, "bold");
  ensureRunState();
  const routeRoundCurrent = Math.min(RUN_BOSS_ROUNDS, (runState.bossesDefeated || 0) + 1);
  drawCenteredText(
    "第" + routeRoundCurrent + "/" + RUN_BOSS_ROUNDS + "轮",
    width / 2,
    routeTitleY + 22,
    11,
    THEME.muted,
    "normal"
  );

  const mapTop = height * 0.155;
  const mapArea = {
    x: 16,
    y: mapTop,
    w: width - 32,
    h: bottomBar.y - mapTop - 12
  };

  const positions = computeRouteNodePositions(mapArea);

  const nodes = flattenRouteNodes();
  nodes.forEach(function (node) {
    const pos = positions[node.id];
    if (!pos) {
      return;
    }
    drawRouteNode(node, pos);
    routeNodeHitAreas.push({ node: node, cx: pos.cx, cy: pos.cy, rx: pos.rx, ry: pos.ry });
  });

  drawRunBottomBar(width, height);
}

function computeRouteNodePositions(mapArea) {
  ensureRunState();
  const rows = runState.routeRows || [];
  const mapTop = mapArea.y + 4;
  const mapBottom = mapArea.y + mapArea.h - 4;
  const gapX = ROUTE_CELL_GAP_X;
  const gapY = ROUTE_CELL_GAP_Y;
  const n = rows.length;
  const maxRowWidth = rows.reduce(function (maxWidth, row) {
    return Math.max(maxWidth, row.length);
  }, 1);
  const availableW = mapArea.w - 16;
  const availableH = mapBottom - mapTop;

  let rW =
    maxRowWidth > 1
      ? Math.max(12, (availableW - (maxRowWidth - 1) * gapX) / (2 * (maxRowWidth - 1)))
      : availableW / 2;
  let rH = n > 0 ? Math.max(12, (availableH - (n - 1) * gapY) / (n + 1)) : 24;

  let routeRadius = Math.min(rW, rH, ROUTE_CELL_RADIUS_MAX);
  routeRadius = Math.max(ROUTE_CELL_RADIUS_MIN, Math.floor(routeRadius * ROUTE_CELL_RADIUS_SCALE));

  const colPitch = routeRadius * 2 + gapX;
  const rowStep = routeRadius + gapY;
  const bottomY = mapTop + availableH / 2 + ((n - 1) * rowStep) / 2;
  const positions = {};

  rows.forEach(function (row, rowIndex) {
    const y = bottomY - rowIndex * rowStep;
    row.forEach(function (node, colIndex) {
      positions[node.id] = {
        cx: mapArea.x + mapArea.w / 2 + (colIndex - (row.length - 1) / 2) * colPitch,
        cy: y,
        rx: routeRadius,
        ry: routeRadius
      };
    });
  });

  return positions;
}

function getAdjacentRouteNodes(node) {
  if (!node || !runState || !runState.routeRows || node.rowIndex >= runState.routeRows.length - 1) {
    return [];
  }

  const nextRow = runState.routeRows[node.rowIndex + 1] || [];
  const nextWidth = nextRow.length;
  const currentWidth = (runState.routeRows[node.rowIndex] || []).length;
  let columns;
  if (nextWidth > currentWidth) {
    columns = [node.colIndex, node.colIndex + 1];
  } else if (nextWidth < currentWidth) {
    columns = [node.colIndex - 1, node.colIndex];
  } else {
    columns = [node.colIndex];
  }

  return columns
    .filter(function (colIndex, index, allColumns) {
      return colIndex >= 0 && colIndex < nextWidth && allColumns.indexOf(colIndex) === index;
    })
    .map(function (colIndex) {
      return nextRow[colIndex];
    });
}

function drawRouteNodeMinimalIcon(nodeType, cx, cy, r, strokeStyle) {
  ctx.save();
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = strokeStyle;
  ctx.lineWidth = Math.max(1.1, r * 0.085);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (nodeType === ROUTE_NODE_NORMAL) {
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.52, cy - r * 0.5);
    ctx.lineTo(cx + r * 0.52, cy + r * 0.5);
    ctx.moveTo(cx + r * 0.52, cy - r * 0.5);
    ctx.lineTo(cx - r * 0.52, cy + r * 0.5);
    ctx.stroke();
  } else if (nodeType === ROUTE_NODE_ELITE) {
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.16, cy - r * 0.58);
    ctx.lineTo(cx - r * 0.3, cy - r * 0.02);
    ctx.lineTo(cx + r * 0.06, cy - r * 0.02);
    ctx.lineTo(cx - r * 0.2, cy + r * 0.58);
    ctx.stroke();
  } else if (nodeType === ROUTE_NODE_EVENT) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 0.55);
    ctx.lineTo(cx, cy + r * 0.06);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy + r * 0.36, r * 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (nodeType === ROUTE_NODE_SHOP) {
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.46, cy - r * 0.26);
    ctx.quadraticCurveTo(cx - r * 0.5, cy + r * 0.4, cx, cy + r * 0.46);
    ctx.quadraticCurveTo(cx + r * 0.5, cy + r * 0.4, cx + r * 0.46, cy - r * 0.26);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.2, cy - r * 0.26);
    ctx.quadraticCurveTo(cx, cy - r * 0.58, cx + r * 0.2, cy - r * 0.26);
    ctx.stroke();
  } else if (nodeType === ROUTE_NODE_BOSS) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.19, 0, Math.PI * 2);
    ctx.stroke();
  } else if (nodeType === ROUTE_NODE_BOSS_BEATEN) {
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.19, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.5, cy - r * 0.5);
    ctx.lineTo(cx + r * 0.5, cy + r * 0.5);
    ctx.stroke();
  } else if (nodeType === ROUTE_NODE_START) {
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.1, cy - r * 0.5);
    ctx.lineTo(cx - r * 0.1, cy + r * 0.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.06, cy - r * 0.44);
    ctx.lineTo(cx + r * 0.46, cy - r * 0.2);
    ctx.lineTo(cx - r * 0.06, cy + r * 0.06);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawRouteNode(node, pos) {
  const visited = runState.visitedRouteNodeIds.indexOf(node.id) >= 0;
  const selectable = canSelectRouteNode(node);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pos.cx, pos.cy - pos.ry);
  ctx.lineTo(pos.cx + pos.rx, pos.cy);
  ctx.lineTo(pos.cx, pos.cy + pos.ry);
  ctx.lineTo(pos.cx - pos.rx, pos.cy);
  ctx.closePath();
  ctx.fillStyle = visited ? ROUTE_CELL_FILL_VISITED : ROUTE_CELL_FILL_DEFAULT;
  ctx.strokeStyle = selectable ? ROUTE_CELL_BORDER : ROUTE_CELL_BORDER_DIM;
  ctx.lineWidth = selectable ? 3 : 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  const labelColor = selectable ? THEME.text : ROUTE_CELL_TEXT_DIM;
  const iconR = Math.min(pos.rx, pos.ry) * ROUTE_NODE_ICON_RADIUS_FACTOR;
  const iconCy = pos.cy + pos.ry * ROUTE_NODE_ICON_CENTER_OFFSET_Y_RATIO;
  drawRouteNodeMinimalIcon(node.type, pos.cx, iconCy, iconR, labelColor);

  const labelY = pos.cy + pos.ry * ROUTE_NODE_LABEL_OFFSET_Y_RATIO;
  drawCenteredMiddleText(
    getRouteNodeLabel(node.type),
    pos.cx,
    labelY,
    node.type === ROUTE_NODE_BOSS || node.type === ROUTE_NODE_BOSS_BEATEN ? ROUTE_CELL_LABEL_SIZE_BOSS : ROUTE_CELL_LABEL_SIZE,
    labelColor,
    "bold"
  );
}

function drawOpponentSelect(width, height) {
  buttons = {};
  shopCardHitAreas = [];
  shopBuyButtonHitAreas = [];
  drawBackground(width, height);

  const bottomBar = getRunBottomBarRect(width, height);
  drawCenteredText("选择下一个对手", width / 2, height * 0.14, 26, THEME.text, "bold");
  drawCenteredText("当前版本两个选项均使用同一默认对手卡组。", width / 2, height * 0.19, 13, THEME.muted, "normal");

  const margin = 24;
  const gap = 16;
  const availableH = bottomBar.y - height * 0.26 - gap - 10;
  const cardH = Math.max(108, Math.min(138, availableH / 2));
  const top = height * 0.28;
  const cardW = width - margin * 2;
  const choices = runState ? runState.opponentChoices : DEFAULT_OPPONENT_CHOICES;
  buttons.opponentA = { x: margin, y: top, w: cardW, h: cardH };
  buttons.opponentB = { x: margin, y: top + cardH + gap, w: cardW, h: cardH };
  drawOpponentChoice(buttons.opponentA, choices[0], 1);
  drawOpponentChoice(buttons.opponentB, choices[1], 2);
  drawRunBottomBar(width, height);
}

function getRunBottomBarRect(width, height) {
  return {
    x: RUN_BOTTOM_BAR_MARGIN,
    y: height - RUN_BOTTOM_BAR_HEIGHT - RUN_BOTTOM_BAR_MARGIN,
    w: width - RUN_BOTTOM_BAR_MARGIN * 2,
    h: RUN_BOTTOM_BAR_HEIGHT
  };
}

function drawRunBottomBar(width, height) {
  ensureRunState();
  const bar = getRunBottomBarRect(width, height);
  drawPanel(bar, THEME.panel);
  drawPanelRim(bar, THEME.panelEdgeCool);

  ctx.textAlign = "left";
  drawText("我的金币：" + runState.gold, bar.x + 18, bar.y + 48, 18, THEME.gold, "bold");

  buttons.runDeck = { x: bar.x + bar.w - 82, y: bar.y + 16, w: 64, h: 40 };
  drawPileButtonFace(buttons.runDeck, "牌库", runState.deck.length);
}

function drawCardGrid(cards, x, y, width, height, viewportWidth, viewportHeight, hitAreas, gridOptions) {
  const colGap = CARD_GRID_GAP + 12;
  const queueCardSize = getQueueCardDisplaySize(viewportWidth, viewportHeight);
  const maxCardSize = Math.min(82, Math.max(54, Math.min(queueCardSize.w, queueCardSize.h) * 1.35));
  let columns;
  if (gridOptions && gridOptions.fixedColumns != null && gridOptions.fixedColumns > 0) {
    columns = Math.min(gridOptions.fixedColumns, Math.max(1, cards.length || 1));
  } else {
    columns = Math.max(1, Math.min(cards.length || 1, Math.floor((width + colGap) / (maxCardSize + colGap))));
  }

  const rows = Math.max(1, Math.ceil((cards.length || 1) / columns));

  let rowGap = colGap;
  if (gridOptions && gridOptions.fixedColumns != null && gridOptions.fixedColumns > 0) {
    const btnH = getWidgetLayout().controlHeight;
    rowGap = Math.max(colGap, 12 + btnH + 10);
  }

  const availableH = Math.max(24, height - rowGap * (rows - 1));
  let cardS = Math.max(18, Math.min(maxCardSize, availableH / rows));
  if (gridOptions && gridOptions.fixedColumns != null && gridOptions.fixedColumns > 0 && columns > 0) {
    const maxByWidth = (width - colGap * (columns - 1)) / columns;
    cardS = Math.max(18, Math.min(cardS, maxByWidth));
  }
  const gridW = columns * cardS + colGap * (columns - 1);
  const gridH = rows * cardS + rowGap * (rows - 1);
  const startX = x + (width - gridW) / 2;
  const startY = y + Math.max(0, (height - gridH) / 2);

  cards.forEach(function (card, index) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const cardX = startX + col * (cardS + colGap);
    const cardY = startY + row * (cardS + rowGap);
    hitAreas.push({ x: cardX, y: cardY, w: cardS, h: cardS, card: card, index: index });
    drawMiniCard(card, cardX, cardY, cardS, cardS);
  });
}

function drawShopBuyButtons() {
  const items = runState ? runState.shopCards : [];
  const btnH = getWidgetLayout().controlHeight;
  shopCardHitAreas.forEach(function (area, index) {
    const item = items[index];
    if (!item) {
      return;
    }

    const rect = { x: area.x - 4, y: area.y + area.h + 12, w: area.w + 8, h: btnH };
    shopBuyButtonHitAreas.push(Object.assign({ index: index }, rect));
    drawButton(rect, item.bought ? "已购买" : item.cost + " 金币", item.bought ? "#3b3f52" : THEME.button, "#120613", !item.bought);
    if (item.bought) {
      ctx.fillStyle = "rgba(4, 6, 12, 0.58)";
      roundRect(area.x, area.y, area.w, area.h, 6, true, false);
    }
  });
}

function drawOpponentChoice(rect, opponent, index) {
  ctx.textAlign = "left";
  drawPanel(rect, THEME.panel);
  drawPanelRim(rect, index === 1 ? THEME.panelEdgeCool : THEME.panelEdge);
  drawText("对手 " + index, rect.x + 18, rect.y + 34, 13, THEME.muted, "normal");
  drawText(opponent.name, rect.x + 18, rect.y + 66, 22, THEME.text, "bold");
  drawWrappedText(opponent.description, rect.x + 18, rect.y + 92, rect.w - 36, 13, 18, THEME.muted, "normal");
  drawText("点击选择", rect.x + rect.w - 88, rect.y + rect.h - 22, 12, THEME.gold, "bold");
}

function canRemoveRunCard() {
  return !!runState && runState.gold >= getRemoveCardCost() && getRemovableDeckCards().length > 0;
}

function drawSymbolRow(centerX, y, size) {
  const gap = size * 1.4;
  GAME_SYMBOLS.forEach(function (symbol, index) {
    const x = centerX + (index - 1) * gap;
    const color = index === 0 ? THEME.button : index === 1 ? THEME.cyan : THEME.gold;
    drawGameSymbol(x, y, size, symbol, color);
  });
}

function drawGameSymbol(x, y, size, symbol, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.08);
  ctx.globalAlpha = 0.95;

  if (symbol === "○") {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.42, 0, Math.PI * 2);
    ctx.stroke();
  } else if (symbol === "△") {
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.46);
    ctx.lineTo(x - size * 0.43, y + size * 0.34);
    ctx.lineTo(x + size * 0.43, y + size * 0.34);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.strokeRect(x - size * 0.34, y - size * 0.34, size * 0.68, size * 0.68);
  }

  ctx.restore();
}

function drawGame(width, height) {
  drawBackground(width, height);
  pileHitAreas = [];
  queueCardHitAreas = [];

  const layout = getGameLayout(width, height);
  const gap = layout.gap;
  const aiPanel = layout.aiPanel;
  const playerPanel = layout.playerPanel;
  const centerY = aiPanel.y + aiPanel.h + gap;
  const centerH = playerPanel.y - centerY - gap;

  drawSidePanel(game.ai, aiPanel, true);
  drawCenterStatus({ x: layout.sideMargin, y: centerY, w: width - layout.sideMargin * 2, h: centerH });
  drawSidePanel(game.player, playerPanel, false);
  drawControls(width, height);
}

function getGameLayout(width, height) {
  const panelLayout = getPanelLayout();
  const margin = panelLayout.topMargin;
  const gap = panelLayout.panelGap;
  const sideMargin = panelLayout.sideMargin;
  const controlsY = getGameplayAreaBottom(width, height);
  const centerH = Math.max(panelLayout.minCenterH, height * panelLayout.centerHRatio);
  const panelH = (controlsY - margin - centerH - gap * 2) / 2;

  return {
    gap: gap,
    sideMargin: sideMargin,
    aiPanel: { x: sideMargin, y: margin, w: width - sideMargin * 2, h: panelH },
    playerPanel: { x: sideMargin, y: margin + panelH + gap + centerH + gap, w: width - sideMargin * 2, h: panelH }
  };
}

function getGameplayAreaBottom(width, height) {
  const c = getCenterLayout();
  return getControlRects(width, height).y - c.bottomPromptHeight - c.bottomPromptGap;
}

function countWrappedTextLines(text, maxWidth, size, weight) {
  if (!text) {
    return 1;
  }
  ctx.save();
  ctx.font = weight + " " + size + "px " + UI_FONT;
  let line = "";
  let lines = 0;
  let i;
  for (i = 0; i < text.length; i += 1) {
    const testLine = line + text[i];
    if (line && ctx.measureText(testLine).width > maxWidth) {
      lines += 1;
      line = text[i];
    } else {
      line = testLine;
    }
  }
  if (line) {
    lines += 1;
  }
  ctx.restore();
  return Math.max(lines, 1);
}

/** 对白气泡进场缓动（可略大于 1，配合位移形成「弹出」感） */
function easeOutBackOpponentSpeech(t) {
  const c1 = 1.525;
  const c3 = c1 + 1;
  const x = clamp(t, 0, 1);
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function wrapOpponentBubbleTextLines(text, maxWidth, size, weight) {
  const out = [];
  if (!text || maxWidth <= 0) {
    return [""];
  }
  ctx.save();
  ctx.font = weight + " " + size + "px " + UI_FONT;
  let line = "";
  let i;
  for (i = 0; i < text.length; i += 1) {
    const testLine = line + text[i];
    if (line && ctx.measureText(testLine).width > maxWidth) {
      out.push(line);
      line = text[i];
    } else {
      line = testLine;
    }
  }
  if (line) {
    out.push(line);
  }
  ctx.restore();
  return out.length ? out : [""];
}

function computeOpponentSpeechBubbleSizing(text, fontSize, lineHeight, pad, maxBodyW, weight) {
  const maxInner = Math.max(24, maxBodyW - pad * 2);
  const minInner = 42;
  let inner = maxInner;
  let lines = [];
  let iter;
  for (iter = 0; iter < 14; iter += 1) {
    lines = wrapOpponentBubbleTextLines(text, inner, fontSize, weight);
    ctx.save();
    ctx.font = weight + " " + fontSize + "px " + UI_FONT;
    let maxLn = 0;
    lines.forEach(function (ln) {
      maxLn = Math.max(maxLn, ctx.measureText(ln).width);
    });
    ctx.restore();
    const slack = 10;
    const nextInner = clamp(Math.ceil(maxLn + slack), minInner, maxInner);
    if (nextInner >= inner - 0.5) {
      inner = nextInner;
      lines = wrapOpponentBubbleTextLines(text, inner, fontSize, weight);
      break;
    }
    inner = nextInner;
  }

  const lineCount = lines.length;
  const textBlockH = lineCount * lineHeight;
  const bubbleH = textBlockH + pad * 2;
  const bodyW = inner + pad * 2;

  return {
    innerW: inner,
    bodyW: bodyW,
    lines: lines,
    lineCount: lineCount,
    bubbleH: bubbleH,
    lineHeight: lineHeight
  };
}

function drawOpponentBubbleLineStack(lines, firstBaselineX, firstBaselineY, lineHeight, fontSize, color, weight) {
  ctx.save();
  ctx.textAlign = "left";
  ctx.font = weight + " " + fontSize + "px " + UI_FONT;
  ctx.fillStyle = color;
  let y = firstBaselineY;
  lines.forEach(function (ln) {
    ctx.fillText(ln, firstBaselineX, y);
    y += lineHeight;
  });
  ctx.restore();
}

function getOpponentSpeechBubbleLeft(side, nameX) {
  ctx.save();
  ctx.font = "bold 15px " + UI_FONT;
  const nameW = ctx.measureText(side.name).width;
  ctx.restore();
  /** 仅相对名字定位，避免因「已停牌」「获胜」等标签出现/消失而跳动 */
  return nameX + nameW + 10;
}

/** 对战 HUD 之上、弹窗与 TIPS 之下 */
function drawOpponentSpeechBubbleOverlay(screenW, screenH) {
  if (scene !== "playing" || !game || !game.ai || modal) {
    return;
  }

  const bub = game.opponentSpeechBubble;
  const now = Date.now();
  if (!bub || !bub.text || now >= bub.until) {
    return;
  }

  const startedAt = typeof bub.startedAt === "number" ? bub.startedAt : now;
  const age = now - startedAt;
  const timeLeft = bub.until - now;
  const tOut = timeLeft < OPPONENT_SPEECH_FADE_OUT_MS ? Math.max(0, timeLeft / OPPONENT_SPEECH_FADE_OUT_MS) : 1;

  const pPop = clamp(age / OPPONENT_SPEECH_POP_IN_MS, 0, 1);
  const easePop = easeOutBackOpponentSpeech(pPop);
  const dxEnter = (1 - easePop) * -OPPONENT_SPEECH_SLIDE_PX;
  const alphaEnter = Math.min(1, age / OPPONENT_SPEECH_FADE_IN_MS);
  const alpha = alphaEnter * tOut;
  const scalePop = 0.72 + 0.28 * easePop;

  const layout = getGameLayout(screenW, screenH);
  const panelRect = layout.aiPanel;
  const side = game.ai;
  const nameX = panelRect.x + 14;
  const nameY = panelRect.y + 28;
  /** 与 15px 名字大致垂直居中对齐（baseline 偏下） */
  const nameVisualCenterY = nameY - 7;

  let bodyLeft = getOpponentSpeechBubbleLeft(side, nameX);

  ctx.save();
  ctx.font = "bold 15px " + UI_FONT;
  const nameW = ctx.measureText(side.name).width;
  ctx.restore();

  let maxCap = Math.min(272, screenW - bodyLeft - 14);
  if (maxCap < 52) {
    return;
  }

  const fontSize = OPPONENT_SPEECH_FONT_SIZE;
  const lineHeight = OPPONENT_SPEECH_LINE_HEIGHT;
  const pad = OPPONENT_SPEECH_PAD;

  let sizing = computeOpponentSpeechBubbleSizing(bub.text, fontSize, lineHeight, pad, maxCap, "normal");
  let bodyW = sizing.bodyW;
  let bubbleH = sizing.bubbleH;

  let bubbleY = nameVisualCenterY - bubbleH / 2;
  bubbleY = Math.max(panelRect.y + 6, bubbleY);
  bubbleY = Math.min(bubbleY, panelRect.y + panelRect.h - bubbleH - 10);

  let tipX = bodyLeft - OPPONENT_SPEECH_ARROW_LEN;
  let aimLow = bubbleY + bubbleH * 0.72;
  let aimHigh = bubbleY + bubbleH * 0.28;
  let ty = clamp(nameVisualCenterY, aimHigh + 4, aimLow - 4);
  const minTip = Math.max(panelRect.x + 6, nameX + Math.max(8, nameW * 0.22));
  if (tipX < minTip) {
    const shift = minTip - tipX;
    tipX += shift;
    bodyLeft += shift;
    maxCap = Math.min(272, screenW - bodyLeft - 14);
    if (maxCap < 52) {
      return;
    }
    sizing = computeOpponentSpeechBubbleSizing(bub.text, fontSize, lineHeight, pad, maxCap, "normal");
    bodyW = sizing.bodyW;
    bubbleH = sizing.bubbleH;
    bubbleY = nameVisualCenterY - bubbleH / 2;
    bubbleY = Math.max(panelRect.y + 6, bubbleY);
    bubbleY = Math.min(bubbleY, panelRect.y + panelRect.h - bubbleH - 10);
    aimLow = bubbleY + bubbleH * 0.72;
    aimHigh = bubbleY + bubbleH * 0.28;
    ty = clamp(nameVisualCenterY, aimHigh + 4, aimLow - 4);
  }

  const pivotX = bodyLeft + bodyW * 0.06 + (tipX - bodyLeft) * 0.35;
  const pivotY = bubbleY + bubbleH * 0.5;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(dxEnter, 0);
  ctx.translate(pivotX, pivotY);
  ctx.scale(scalePop, scalePop);
  ctx.translate(-pivotX, -pivotY);

  ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 3;

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.14)";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(tipX, ty);
  ctx.lineTo(bodyLeft + 0.5, aimHigh);
  ctx.lineTo(bodyLeft + 0.5, aimLow);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  roundRect(bodyLeft, bubbleY, bodyW, bubbleH, 9, true, true);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const firstBaseline = bubbleY + pad + fontSize * 0.92;
  drawOpponentBubbleLineStack(sizing.lines, bodyLeft + pad, firstBaseline, lineHeight, fontSize, "#111111", "normal");

  ctx.restore();
}

function drawSidePanel(side, rect, isAi) {
  const panelColor = isAi ? THEME.panelAlt : THEME.panel;
  drawPanel(rect, panelColor, { cornerRadius: 6 });
  drawContestPanelDecor(rect, isAi);
  drawPanelRim(rect, isAi ? THEME.panelEdge : THEME.panelEdgeCool, { lineWidth: 1.5, cornerRadius: 4, inset: 2 });

  ctx.textAlign = "left";
  const nameX = rect.x + 14;
  const nameY = rect.y + 28;
  drawText(side.name, nameX, nameY, 15, THEME.text, "bold");
  drawStoppedBadge(side, nameX, nameY);
  drawHearts(side, rect.x + 14, rect.y + 52);

  const drawPileButton = getDrawPileButton(rect);
  const discardPileButton = getDiscardPileButton(rect);

  const pileStroke = isAi ? THEME.panelEdge : THEME.cyan;
  drawPileButtonFace(drawPileButton, "牌库", side.drawPile.length, pileStroke);
  drawPileButtonFace(discardPileButton, "弃牌", side.discardPile.length, pileStroke);

  pileHitAreas.push({ x: drawPileButton.x, y: drawPileButton.y, w: drawPileButton.w, h: drawPileButton.h, side: side, pileType: "draw" });
  pileHitAreas.push({ x: discardPileButton.x, y: discardPileButton.y, w: discardPileButton.w, h: discardPileButton.h, side: side, pileType: "discard" });

  const cardArea = { x: rect.x + 12, y: rect.y + 64, w: rect.w - 24, h: rect.h - 76 };
  drawContestCardArea(cardArea, isAi);
  drawQueue(side, cardArea.x + 10, cardArea.y + 12, cardArea.w - 20, cardArea.h - 22);
}

function drawStoppedBadge(side, nameX, nameY) {
  if (!game) {
    return;
  }

  let label = null;
  let fillStyle = "";
  let strokeStyle = "";
  let textColor = "";

  if (game.matchWinner) {
    if (side.id !== game.matchWinner) {
      return;
    }
    label = "获胜";
    fillStyle = "rgba(255, 224, 113, 0.14)";
    strokeStyle = THEME.gold;
    textColor = THEME.gold;
  } else if (!side.stopped) {
    return;
  } else {
    label = "已停牌";
    fillStyle = "rgba(75, 214, 199, 0.16)";
    strokeStyle = THEME.buttonStop;
    textColor = THEME.buttonStop;
  }

  ctx.save();
  ctx.font = "bold 15px " + UI_FONT;
  const nameW = ctx.measureText(side.name).width;
  ctx.restore();

  ctx.save();
  ctx.font = "bold 10px " + UI_FONT;
  const labelW = ctx.measureText(label).width;
  ctx.restore();

  const badge = { x: nameX + nameW + 8, y: nameY - 16, w: Math.ceil(labelW + 18), h: 18 };

  ctx.save();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 1.5;
  roundRect(badge.x, badge.y, badge.w, badge.h, 7, true, true);
  ctx.restore();

  drawCenteredText(label, badge.x + badge.w / 2, badge.y + 13, 10, textColor, "bold");
}

function fitText(text, maxWidth, size, weight) {
  ctx.save();
  ctx.font = weight + " " + size + "px " + UI_FONT;

  if (ctx.measureText(text).width <= maxWidth) {
    ctx.restore();
    return text;
  }

  let result = text;
  while (result.length > 1 && ctx.measureText(result + "...").width > maxWidth) {
    result = result.slice(0, -1);
  }

  ctx.restore();
  return result + "...";
}

function drawContestPanelDecor(rect, isAi) {
  ctx.save();
  ctx.globalAlpha = 0.42;
  for (let i = 0; i < 5; i += 1) {
    const y = rect.y + 18 + i * 26;
    ctx.strokeStyle = i % 2 === 0 ? "rgba(240, 93, 143, 0.22)" : "rgba(94, 231, 255, 0.14)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rect.x + 12, y);
    ctx.lineTo(rect.x + rect.w - 12, y + Math.sin(i + pulse) * 1.5);
    ctx.stroke();
  }
  ctx.restore();

  const glowX = isAi ? rect.x + rect.w * 0.28 : rect.x + rect.w * 0.72;
  const glow = ctx.createRadialGradient(glowX, rect.y + 34, 8, glowX, rect.y + 34, rect.w * 0.55);
  glow.addColorStop(0, isAi ? "rgba(240, 93, 143, 0.2)" : "rgba(94, 231, 255, 0.18)");
  glow.addColorStop(1, "rgba(255, 199, 111, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

}

function drawPileButtonFace(rect, label, count, strokeColor) {
  const stroke = strokeColor != null ? strokeColor : THEME.cyan;
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "rgba(14, 18, 28, 0.82)";
  ctx.strokeStyle = stroke;
  ctx.globalAlpha = 0.92;
  ctx.lineWidth = 1;
  roundRect(rect.x, rect.y, rect.w, rect.h, 5, true, true);
  ctx.globalAlpha = 1;

  drawCenteredMiddleText(label + " " + count, rect.x + rect.w / 2, rect.y + rect.h / 2 + 0.5, 12, THEME.text, "bold");
}

function drawContestCardArea(rect, isAi) {
  const border = getBattleBorderOptions({ lineWidth: 2, cornerRadius: 7, glowBrightness: 1 });
  const innerRadius = Math.max(0, border.cornerRadius - 2);
  ctx.fillStyle = "#080b13";
  ctx.strokeStyle = isAi ? THEME.panelEdge : THEME.panelEdgeCool;
  ctx.lineWidth = border.lineWidth;
  ctx.shadowColor = isAi ? THEME.panelEdge : THEME.panelEdgeCool;
  ctx.shadowBlur = 8 * border.glowBrightness;
  roundRect(rect.x, rect.y, rect.w, rect.h, border.cornerRadius, true, true);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  const felt = ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.h);
  felt.addColorStop(0, isAi ? "#241124" : "#102638");
  felt.addColorStop(1, isAi ? "#100912" : "#07131d");
  ctx.fillStyle = felt;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = Math.max(0.5, border.lineWidth * 0.62);
  roundRect(rect.x + 5, rect.y + 5, rect.w - 10, rect.h - 10, innerRadius, true, true);
}

function drawActiveEffects(width, height) {
  if (!game || activeEffects.length === 0 || scene !== "playing") {
    return;
  }

  activeEffects.forEach(function (effect) {
    if (effect.type === "draw") {
      drawDrawEffect(effect, width, height);
    } else if (effect.type === "slotMove") {
      drawSlotMoveEffect(effect, width, height);
    } else if (effect.type === "discard") {
      drawDiscardEffect(effect, width, height);
    } else if (effect.type === "bomb") {
      drawBombEffect(effect, width, height);
    }
  });
}

function drawDrawEffect(effect, width, height) {
  const now = Date.now();
  const t = clamp((now - effect.startedAt) / DRAW_ANIM_DURATION, 0, 1);
  const eased = 1 - Math.pow(1 - t, 3);
  const pos = getEffectPositions(effect.sideId, effect.queueIndex, width, height);

  if (!pos) {
    return;
  }

  const cx = lerp(pos.source.x, pos.target.x, eased);
  const cy = lerp(pos.source.y, pos.target.y, eased) - Math.sin(t * Math.PI) * 34;
  const scale = 1 + Math.sin(t * Math.PI) * 0.32;
  const alpha = 1;
  const rotation = (effect.sideId === "ai" ? -1 : 1) * (1 - eased) * 0.28;

  drawFloatingMiniCard(effect.card, cx, cy, pos.card.w, pos.card.h, scale, rotation, alpha);
}

function drawDiscardEffect(effect, width, height) {
  const now = Date.now();
  const rawT = (now - effect.startedAt) / DISCARD_ANIM_DURATION;
  if (rawT < 0) {
    return;
  }

  const t = clamp(rawT, 0, 1);
  const eased = 1 - Math.pow(1 - t, 3);
  const pos = getDiscardEffectPositions(effect, width, height);

  if (!pos) {
    return;
  }

  const cx = lerp(pos.source.x, pos.target.x, eased);
  const cy = lerp(pos.source.y, pos.target.y, eased) - Math.sin(t * Math.PI) * 26;
  const scale = lerp(1, 0.62, eased);
  const alpha = 1 - t * 0.18;
  const rotation = (effect.sourceSideId === "ai" ? 1 : -1) * Math.sin(t * Math.PI) * 0.22;

  drawFloatingMiniCard(effect.card, cx, cy, pos.card.w, pos.card.h, scale, rotation, alpha);
}

function drawSlotMoveEffect(effect, width, height) {
  const now = Date.now();
  const t = clamp((now - effect.startedAt) / SLOT_MOVE_ANIM_DURATION, 0, 1);
  const eased = 1 - Math.pow(1 - t, 3);
  const pos = getSlotMoveEffectPositions(effect, width, height);

  if (!pos) {
    return;
  }

  const cx = lerp(pos.source.x, pos.target.x, eased);
  const cy = lerp(pos.source.y, pos.target.y, eased) - Math.sin(t * Math.PI) * 22;
  const scale = 1 + Math.sin(t * Math.PI) * 0.08;
  const alpha = 1;
  const rotation = (effect.sourceSideId === "ai" ? -1 : 1) * (1 - eased) * 0.2;

  drawFloatingMiniCard(effect.card, cx, cy, pos.card.w, pos.card.h, scale, rotation, alpha);
}

function drawBombEffect(effect, width, height) {
  const now = Date.now();
  const t = clamp((now - effect.startedAt) / BOMB_ANIM_DURATION, 0, 1);
  const pos = getEffectPositions(effect.sideId, effect.queueIndex, width, height);

  if (!pos) {
    return;
  }

  const cx = pos.target.x;
  const cy = pos.target.y;
  const radius = 12 + t * 54;
  const alpha = 1 - t;

  ctx.save();
  ctx.globalAlpha = alpha;
  const glow = ctx.createRadialGradient(cx, cy, 4, cx, cy, radius);
  glow.addColorStop(0, "rgba(255, 243, 170, 0.95)");
  glow.addColorStop(0.34, "rgba(255, 119, 58, 0.72)");
  glow.addColorStop(1, "rgba(255, 45, 34, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = THEME.gold;
  ctx.lineWidth = 3;
  for (let i = 0; i < 10; i += 1) {
    const angle = (Math.PI * 2 * i) / 10 + t * 1.8;
    const inner = radius * 0.34;
    const outer = radius * (0.72 + (i % 2) * 0.18);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFloatingMiniCard(card, cx, cy, w, h, scale, rotation, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  drawMiniCard(card, -w / 2, -h / 2, w, h);
  ctx.restore();
}

function getEffectPositions(sideId, queueIndex, width, height) {
  const layout = getGameLayout(width, height);
  const panel = sideId === "ai" ? layout.aiPanel : layout.playerPanel;
  const pileButton = getDrawPileButton(panel);
  const cardArea = { x: panel.x + 12, y: panel.y + 64, w: panel.w - 24, h: panel.h - 76 };
  const card = getQueueCardRect(queueIndex, cardArea.x + 10, cardArea.y + 12, cardArea.w - 20, cardArea.h - 22);

  return {
    source: { x: pileButton.x + pileButton.w / 2, y: pileButton.y + pileButton.h / 2 },
    target: { x: card.x + card.w / 2, y: card.y + card.h / 2 },
    card: card
  };
}

function getDiscardEffectPositions(effect, width, height) {
  const layout = getGameLayout(width, height);
  const sourcePanel = effect.sourceSideId === "ai" ? layout.aiPanel : layout.playerPanel;
  const targetPanel = effect.targetSideId === "ai" ? layout.aiPanel : layout.playerPanel;
  const sourceArea = { x: sourcePanel.x + 12, y: sourcePanel.y + 64, w: sourcePanel.w - 24, h: sourcePanel.h - 76 };
  const card = getQueueCardRect(effect.queueIndex, sourceArea.x + 10, sourceArea.y + 12, sourceArea.w - 20, sourceArea.h - 22);
  const discardPileButton = getDiscardPileButton(targetPanel);

  return {
    source: { x: card.x + card.w / 2, y: card.y + card.h / 2 },
    target: { x: discardPileButton.x + discardPileButton.w / 2, y: discardPileButton.y + discardPileButton.h / 2 },
    card: card
  };
}

function getSlotMoveEffectPositions(effect, width, height) {
  const layout = getGameLayout(width, height);
  const sourcePanel = effect.sourceSideId === "ai" ? layout.aiPanel : layout.playerPanel;
  const targetPanel = effect.targetSideId === "ai" ? layout.aiPanel : layout.playerPanel;
  const sourceArea = { x: sourcePanel.x + 12, y: sourcePanel.y + 64, w: sourcePanel.w - 24, h: sourcePanel.h - 76 };
  const targetArea = { x: targetPanel.x + 12, y: targetPanel.y + 64, w: targetPanel.w - 24, h: targetPanel.h - 76 };
  const sourceCard = getQueueCardRect(effect.fromQueueIndex, sourceArea.x + 10, sourceArea.y + 12, sourceArea.w - 20, sourceArea.h - 22);
  const targetCard = getQueueCardRect(effect.toQueueIndex, targetArea.x + 10, targetArea.y + 12, targetArea.w - 20, targetArea.h - 22);

  return {
    source: { x: sourceCard.x + sourceCard.w / 2, y: sourceCard.y + sourceCard.h / 2 },
    target: { x: targetCard.x + targetCard.w / 2, y: targetCard.y + targetCard.h / 2 },
    card: targetCard
  };
}

function getDrawPileButton(rect) {
  const widgetLayout = getWidgetLayout();
  const pileGap = widgetLayout.pileGap;
  const pileW = widgetLayout.pileWidth;
  const pileH = widgetLayout.pileHeight;
  const pileY = rect.y + widgetLayout.pileTopOffset;
  return { x: rect.x + rect.w - pileW * 2 - pileGap - widgetLayout.pileRightMargin, y: pileY, w: pileW, h: pileH };
}

function getDiscardPileButton(rect) {
  const pileGap = getWidgetLayout().pileGap;
  const drawPileButton = getDrawPileButton(rect);
  return { x: drawPileButton.x + drawPileButton.w + pileGap, y: drawPileButton.y, w: drawPileButton.w, h: drawPileButton.h };
}

function getQueueCardRect(index, x, y, width, height) {
  const gapX = CARD_GRID_GAP;
  const gapY = CARD_GRID_GAP;
  const cappedW = Math.min(width, 330);
  const regionX = x + (width - cappedW) / 2;
  const innerW = cappedW - gapX * (QUEUE_COLUMNS - 1);
  const innerH = height - gapY * (QUEUE_ROWS - 1);
  const maxCellW = innerW / QUEUE_COLUMNS;
  const maxCellH = innerH / QUEUE_ROWS;
  const s = Math.min(maxCellW, maxCellH);
  const gridPixelW = QUEUE_COLUMNS * s + gapX * (QUEUE_COLUMNS - 1);
  const gridPixelH = QUEUE_ROWS * s + gapY * (QUEUE_ROWS - 1);
  const gridX = regionX + (cappedW - gridPixelW) / 2;
  const gridY = y + (height - gridPixelH) / 2;
  const col = index % QUEUE_COLUMNS;
  const row = Math.floor(index / QUEUE_COLUMNS);

  return {
    x: gridX + col * (s + gapX),
    y: gridY + row * (s + gapY),
    w: s,
    h: s
  };
}

function drawCenterRoundTitle(centerX, baselineY) {
  const centerUi = getCenterLayout();
  const prefix = "第 ";
  const suffix = " 局";
  const numStr = String(game.round);
  const fontSize = centerUi.roundTitleFontSize;
  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.font = "bold " + fontSize + "px " + UI_FONT;

  let numScale = 1;
  if (roundLabelPulseAt > 0) {
    const elapsed = Date.now() - roundLabelPulseAt;
    if (elapsed >= 0 && elapsed < ROUND_NUM_PULSE_MS) {
      const p = elapsed / ROUND_NUM_PULSE_MS;
      numScale = 1 + 0.32 * Math.sin(p * Math.PI);
    }
  }

  const wPre = ctx.measureText(prefix).width;
  const wNumBase = ctx.measureText(numStr).width;
  const wSuf = ctx.measureText(suffix).width;
  const numDrawW = wNumBase * numScale;
  const totalW = wPre + numDrawW + wSuf;
  let x = centerX - totalW / 2;

  ctx.fillStyle = THEME.muted;
  ctx.fillText(prefix, x, baselineY);
  x += wPre;

  ctx.save();
  ctx.translate(x + numDrawW / 2, baselineY);
  ctx.scale(numScale, numScale);
  ctx.textAlign = "center";
  ctx.fillStyle = THEME.gold;
  ctx.fillText(numStr, 0, 0);
  ctx.restore();
  x += numDrawW;

  ctx.textAlign = "left";
  ctx.fillStyle = THEME.muted;
  ctx.fillText(suffix, x, baselineY);

  ctx.restore();
}

function drawCenterStatus(rect) {
  const centerUi = getCenterLayout();
  drawPanel(rect, "#090d18");
  drawPanelRim(rect, THEME.gold);
  const centerX = rect.x + rect.w / 2;
  const labelY = rect.y + centerUi.sectionLabelY;
  const slotY = rect.y + rect.h * centerUi.winRowYRatio;
  const aiX = rect.x + rect.w * centerUi.aiColumnXRatio;
  const playerX = rect.x + rect.w * centerUi.playerColumnXRatio;

  drawCenterRoundTitle(centerX, rect.y + centerUi.roundTitleY);

  drawCenteredText("对手通关", aiX, labelY, centerUi.sectionLabelSize, THEME.muted, "bold");
  drawWinSlots(aiX, slotY, game.ai.wins, THEME.panelEdge, "ai");

  const widgetLayout = getWidgetLayout();
  const chipGap = 6;
  ctx.save();
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = "bold " + widgetLayout.scoreSize + "px " + UI_FONT;
  const bustStr = "爆";
  const aiScoreStr = game.ai.busted ? bustStr : String(game.ai.roundScore);
  const plScoreStr = game.player.busted ? bustStr : String(game.player.roundScore);
  const aiScoreCol = THEME.panelEdge;
  const plScoreCol = THEME.panelEdgeCool;
  const aiScoreW = ctx.measureText(aiScoreStr).width;
  const plScoreW = ctx.measureText(plScoreStr).width;
  ctx.font = "bold " + centerUi.vsSize + "px " + UI_FONT;
  const vsW = ctx.measureText("VS").width;
  ctx.restore();

  const ox = widgetLayout.scoreOffsetX;
  const leftScoreX = centerX - vsW / 2 - chipGap - aiScoreW / 2 - ox;
  const rightScoreX = centerX + vsW / 2 + chipGap + plScoreW / 2 + ox;

  drawCenteredMiddleText(aiScoreStr, leftScoreX, slotY, widgetLayout.scoreSize, aiScoreCol, "bold");
  drawCenteredMiddleText(plScoreStr, rightScoreX, slotY, widgetLayout.scoreSize, plScoreCol, "bold");
  drawMiddleText("VS", centerX, slotY, centerUi.vsSize, THEME.gold, "bold");

  drawCenteredText("我的通关", playerX, labelY, centerUi.sectionLabelSize, THEME.muted, "bold");
  drawWinSlots(playerX, slotY, game.player.wins, THEME.green, "player");
}

function drawWinSlots(centerX, centerY, wins, fillColor, sideKey) {
  const now = Date.now();
  const WIN_SLOT_PULSE_MS = 760;
  const centerUi = getCenterLayout();
  const border = getBattleBorderOptions({ lineWidth: 1.5, cornerRadius: 4, glowBrightness: 1 });
  const size = centerUi.winSlotSize;
  const gap = centerUi.winSlotGap;
  const startX = centerX - (size * WIN_TARGET + gap * (WIN_TARGET - 1)) / 2;

  for (let i = 0; i < WIN_TARGET; i += 1) {
    const x = startX + i * (size + gap);
    const filled = i < wins;

    let pulse = 0;
    if (filled && winScoreSlotPulse && winScoreSlotPulse.sideId === sideKey && winScoreSlotPulse.slotIndex === i) {
      const elapsed = now - winScoreSlotPulse.startedAt;
      if (elapsed >= 0 && elapsed < WIN_SLOT_PULSE_MS) {
        pulse = Math.sin((elapsed / WIN_SLOT_PULSE_MS) * Math.PI);
      }
    }

    ctx.save();
    ctx.translate(x + size / 2, centerY);
    const enl = pulse > 0 ? 1 + pulse * 0.14 : 1;
    ctx.scale(enl, enl);

    if (pulse > 0) {
      ctx.shadowBlur = 4 + pulse * 14;
      ctx.shadowColor = fillColor;
      ctx.shadowOffsetY = 0;
    }

    ctx.fillStyle = filled ? fillColor : "rgba(7, 11, 22, 0.66)";
    ctx.strokeStyle = filled ? THEME.text : "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = filled ? border.lineWidth + pulse * 3.5 : border.lineWidth;
    roundRect(-size / 2, -size / 2, size, size, border.cornerRadius, true, true);

    if (pulse > 0.08 && filled) {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(255, 255, 255, " + (0.35 + pulse * 0.55) + ")";
      ctx.lineWidth = 1 + pulse * 2;
      roundRect(-size / 2 - 1, -size / 2 - 1, size + 2, size + 2, border.cornerRadius + 1, false, true);
    }

    ctx.restore();
  }
}

function drawControls(width, height) {
  buttons = {};
  const controls = getControlRects(width, height);

  if (scene === "playing" && game.matchWinner) {
    if (game.matchWinner === "ai") {
      buttons.rematch = controls.full;
      drawButton(buttons.rematch, "重新开始", THEME.button, "#120613", true);
    }
    return;
  }

  if (scene !== "playing" || (roundAdvanceAt > Date.now()) || modal || pendingActiveEffect || game.active !== "player" || game.player.stopped) {
    return;
  }

  buttons.draw = controls.left;
  buttons.stop = controls.right;

  const canDraw = game.player.queue.length < QUEUE_LIMIT && game.player.drawPile.length + game.player.discardPile.length > 0;
  drawButton(buttons.draw, canDraw ? "继续抽" : "已满", canDraw ? THEME.button : "#3b3f52", "#120613", canDraw);
  drawButton(buttons.stop, "停手", THEME.buttonStop, "#061d1b", true);
}

function getControlRects(width, height) {
  const widgetLayout = getWidgetLayout();
  const y = height * widgetLayout.controlYRatio;
  const margin = widgetLayout.controlMargin;
  const gap = widgetLayout.controlGap;
  const w = (width - margin * 2 - gap) / 2;
  const h = widgetLayout.controlHeight;

  return {
    y: y,
    h: h,
    left: { x: margin, y: y, w: w, h: h },
    right: { x: margin + w + gap, y: y, w: w, h: h },
    full: { x: margin, y: y, w: width - margin * 2, h: h }
  };
}

function getDeckViewerCatalogId(card) {
  if (card.catalogId != null && typeof card.catalogId === "number" && !isNaN(card.catalogId)) {
    return card.catalogId;
  }

  const entries = getRewardCatalogEntries();
  for (let i = 0; i < entries.length; i += 1) {
    const e = entries[i];
    if (!e || !e.card) {
      continue;
    }

    const ec = e.card;
    if (ec.type === card.type && ec.value === card.value && (ec.effect || "") === (card.effect || "")) {
      const nid = Number(e.id);
      return !isNaN(nid) ? nid : Number.MAX_SAFE_INTEGER;
    }
  }

  return Number.MAX_SAFE_INTEGER;
}

function sortCardsForDeckViewerDisplay(cards) {
  return cards.slice().sort(function (a, b) {
    const aBomb = a.type === CARD_BOMB;
    const bBomb = b.type === CARD_BOMB;
    if (aBomb !== bBomb) {
      return aBomb ? -1 : 1;
    }

    const va = typeof a.value === "number" && !isNaN(a.value) ? a.value : 0;
    const vb = typeof b.value === "number" && !isNaN(b.value) ? b.value : 0;
    if (va !== vb) {
      return vb - va;
    }

    return getDeckViewerCatalogId(a) - getDeckViewerCatalogId(b);
  });
}

function openPileModal(side, pileType) {
  const cards =
    pileType === "draw"
      ? sortCardsForDeckViewerDisplay(side.drawPile)
      : side.discardPile.slice().reverse();
  openModal({
    type: "pile",
    title: side.name + "的" + (pileType === "draw" ? "抽牌堆" : "弃牌堆"),
    cards: cards
  });
}

function openRunDeckModal() {
  ensureRunState();
  openModal({
    type: "pile",
    title: "当前牌库",
    cards: sortCardsForDeckViewerDisplay(runState.deck)
  });
}

function openCardTipModal(card) {
  if (!card) {
    return;
  }

  openModal({
    type: "cardTip",
    title: getCardUIMainTitle(card),
    card: card
  });
}

function drawPileModal(width, height) {
  if (!modal) {
    return;
  }

  modalCardHitAreas = [];

  if (modal.type === "activeEffect") {
    drawActiveEffectModal(width, height);
    return;
  }

  if (modal.type === "selectStealTarget") {
    drawStealTargetModal(width, height);
    return;
  }

  if (modal.type === "selectCopyTarget") {
    drawCopyTargetModal(width, height);
    return;
  }

  if (modal.type === "selectShieldTarget") {
    drawShieldTargetModal(width, height);
    return;
  }

  if (modal.type === "cardTip") {
    drawCardTipModal(width, height);
    return;
  }

  if (modal.type === "removeCard") {
    drawRemoveCardModal(width, height);
    return;
  }

  if (modal.type === "victoryReward") {
    drawVictoryRewardModal(width, height);
    return;
  }

  ctx.fillStyle = "rgba(4, 6, 12, 0.82)";
  ctx.fillRect(0, 0, width, height);

  const panel = { x: 14, y: height * 0.16, w: width - 28, h: height * 0.68 };
  drawPanel(panel, THEME.panel);
  drawPanelRim(panel, THEME.panelEdgeCool);

  ctx.textAlign = "left";
  drawText(modal.title, panel.x + 18, panel.y + 34, 18, THEME.text, "bold");
  drawText("共 " + modal.cards.length + " 张", panel.x + 18, panel.y + 58, 13, THEME.muted, "normal");

  buttons.closeModal = { x: panel.x + panel.w / 2 - 72, y: panel.y + panel.h - 58, w: 144, h: 42 };
  drawButton(buttons.closeModal, "关闭", THEME.buttonStop, "#061d1b", true);

  if (modal.cards.length === 0) {
    drawCenteredText("这里还没有卡牌", panel.x + panel.w / 2, panel.y + panel.h * 0.48, 15, THEME.muted, "normal");
    return;
  }

  drawModalCards(modal.cards, panel.x + 8, panel.y + 82, panel.w - 16, panel.h - 156, width, height);
}

function drawActiveEffectModal(width, height) {
  const controls = getControlRects(width, height);
  drawBottomPrompt(controls, "是否发动「" + modal.title + "」？", getCardEffectDescription(modal.card));
  const effectControls = getEffectControlRects(controls);
  buttons.useEffect = effectControls.left;
  buttons.skipEffect = effectControls.right;
  drawButton(buttons.useEffect, "发动" + modal.title, THEME.button, "#120613", true);
  drawButton(buttons.skipEffect, "跳过", THEME.buttonStop, "#061d1b", true);
}

function drawStealTargetModal(width, height) {
  const controls = getControlRects(width, height);
  drawBottomPrompt(controls, "选择偷窃目标", "点击对手队列卡牌完成偷窃。");
  const effectControls = getEffectControlRects(controls);
  buttons.skipEffect = effectControls.full;
  drawButton(buttons.skipEffect, "取消偷窃", THEME.buttonStop, "#061d1b", true);
}

function drawCopyTargetModal(width, height) {
  const controls = getControlRects(width, height);
  drawBottomPrompt(controls, "选择复制目标", "点击己方队列中任一其他牌（不能选复制卡本身），插入其下方的临时复制；若复制的牌带有主动技能，随后会询问是否发动。");
  const effectControls = getEffectControlRects(controls);
  buttons.skipEffect = effectControls.full;
  drawButton(buttons.skipEffect, "取消复制", THEME.buttonStop, "#061d1b", true);
}

function drawShieldTargetModal(width, height) {
  const controls = getControlRects(width, height);
  drawBottomPrompt(controls, "选择盾牌目标", "点击己方队列中另一张牌，将其随机洗回己方抽牌堆（不能选盾牌自身）。");
  const effectControls = getEffectControlRects(controls);
  buttons.skipEffect = effectControls.full;
  drawButton(buttons.skipEffect, "取消盾牌", THEME.buttonStop, "#061d1b", true);
}

function getEffectControlRects(controls) {
  return {
    left: controls.left,
    right: controls.right,
    full: controls.full
  };
}

function drawBottomPrompt(controls, title, description) {
  const c = getCenterLayout();
  const border = getBattleBorderOptions({ lineWidth: 1.5, cornerRadius: 7, glowBrightness: 1 });
  const prompt = { x: controls.full.x, y: controls.y - c.bottomPromptHeight - c.bottomPromptGap, w: controls.full.w, h: c.bottomPromptHeight };
  const glow = 0.5 + Math.sin(pulse * 2.4) * 0.5;
  const scanX = prompt.x + ((pulse * 54) % (prompt.w + 70)) - 70;
  const fill = ctx.createLinearGradient(prompt.x, prompt.y, prompt.x + prompt.w, prompt.y + prompt.h);
  fill.addColorStop(0, "rgba(13, 18, 32, 0.9)");
  fill.addColorStop(0.5, "rgba(18, 28, 45, 0.92)");
  fill.addColorStop(1, "rgba(18, 11, 28, 0.9)");

  ctx.save();
  ctx.shadowColor = "rgba(94, 231, 255, " + (0.28 + glow * 0.28) + ")";
  ctx.shadowBlur = (10 + glow * 9) * border.glowBrightness;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(94, 231, 255, " + (0.48 + glow * 0.34) + ")";
  ctx.lineWidth = border.lineWidth + glow * 0.8;
  roundRect(prompt.x, prompt.y, prompt.w, prompt.h, border.cornerRadius, true, true);

  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(240, 93, 143, " + (0.26 + glow * 0.28) + ")";
  ctx.lineWidth = Math.max(0.5, border.lineWidth * 0.5);
  roundRect(prompt.x + 4, prompt.y + 4, prompt.w - 8, prompt.h - 8, Math.max(0, border.cornerRadius - 2), false, true);

  const scan = ctx.createLinearGradient(scanX, prompt.y, scanX + 70, prompt.y);
  scan.addColorStop(0, "rgba(94, 231, 255, 0)");
  scan.addColorStop(0.48, "rgba(94, 231, 255, " + (0.18 + glow * 0.16) + ")");
  scan.addColorStop(1, "rgba(94, 231, 255, 0)");
  ctx.fillStyle = scan;
  roundRect(prompt.x + 8, prompt.y + 5, prompt.w - 16, 3, 2, true, false);
  ctx.restore();

  drawCenteredText(title, prompt.x + prompt.w / 2, prompt.y + 17, 13, THEME.text, "bold");
  drawCenteredText(fitText(description, prompt.w - 18, 11, "normal"), prompt.x + prompt.w / 2, prompt.y + 35, 11, THEME.muted, "normal");
}

function drawCardTipModal(width, height) {
  drawEffectInfoPanel(width, height, modal.title, getCardEffectDescription(modal.card));
  const panel = getEffectModalPanel(width, height);
  buttons.closeModal = { x: panel.x + panel.w / 2 - 72, y: panel.y + panel.h - 58, w: 144, h: 42 };
  drawButton(buttons.closeModal, "关闭", THEME.buttonStop, "#061d1b", true);
}

function drawRemoveCardModal(width, height) {
  ctx.fillStyle = "rgba(4, 6, 12, 0.82)";
  ctx.fillRect(0, 0, width, height);

  const panel = { x: 14, y: height * 0.12, w: width - 28, h: height * 0.76 };
  drawPanel(panel, THEME.panel);
  drawPanelRim(panel, THEME.panelEdge);
  ctx.textAlign = "left";
  drawText(modal.title, panel.x + 18, panel.y + 34, 18, THEME.text, "bold");
  drawText("花费 " + getRemoveCardCost() + " 金币，当前金币 " + runState.gold, panel.x + 18, panel.y + 60, 13, THEME.gold, "bold");
  drawText("只能删除非炸弹卡。", panel.x + 18, panel.y + 82, 12, THEME.muted, "normal");

  buttons.closeModal = { x: panel.x + panel.w / 2 - 72, y: panel.y + panel.h - 58, w: 144, h: 42 };
  drawButton(buttons.closeModal, "取消", THEME.buttonStop, "#061d1b", true);

  if (!modal.cards || modal.cards.length === 0) {
    drawCenteredText("没有可删除的非炸弹卡", panel.x + panel.w / 2, panel.y + panel.h * 0.5, 15, THEME.muted, "normal");
    return;
  }

  drawCardGrid(modal.cards, panel.x + 8, panel.y + 112, panel.w - 16, panel.h - 186, width, height, modalCardHitAreas);
}

function getEffectModalPanel(width, height) {
  return { x: 34, y: height * 0.32, w: width - 68, h: 188 };
}

function drawEffectInfoPanel(width, height, title, description) {
  ctx.fillStyle = "rgba(4, 6, 12, 0.82)";
  ctx.fillRect(0, 0, width, height);

  const panel = getEffectModalPanel(width, height);
  drawPanel(panel, THEME.panel);
  drawPanelRim(panel, THEME.panelEdge);
  drawCenteredText(title, panel.x + panel.w / 2, panel.y + 38, 18, THEME.text, "bold");
  drawWrappedText(description, panel.x + 24, panel.y + 72, panel.w - 48, 15, 20, THEME.muted, "normal");
}

function getCatalogEntryForBattleCard(card) {
  if (!card || typeof card.catalogId !== "number") {
    return null;
  }

  return catalogById[card.catalogId] || null;
}

function resolveEffectDisplayName(card) {
  if (!card || !card.effect || !EFFECTS[card.effect]) {
    return "";
  }

  if (card.catalogEffectName && String(card.catalogEffectName).trim()) {
    return String(card.catalogEffectName).trim();
  }

  const entry = getCatalogEntryForBattleCard(card);
  if (entry && entry.effectName && String(entry.effectName).trim()) {
    return String(entry.effectName).trim();
  }

  return EFFECTS[card.effect].name;
}

function getCardUIMainTitle(card) {
  if (!card) {
    return "";
  }

  if (card.displayName && String(card.displayName).trim()) {
    return String(card.displayName).trim();
  }

  if (card.effect && EFFECTS[card.effect]) {
    const cn = resolveEffectDisplayName(card);
    if (cn) {
      return cn;
    }
  }

  return getCardName(card);
}

function getCardEffectDescription(card) {
  if (!card) {
    return "";
  }

  if (card.effectDescription && String(card.effectDescription).trim()) {
    return String(card.effectDescription).trim();
  }

  const entryById = getCatalogEntryForBattleCard(card);
  if (entryById && entryById.effectDescription && String(entryById.effectDescription).trim()) {
    return String(entryById.effectDescription).trim();
  }

  if (card.effect && EFFECTS[card.effect]) {
    return EFFECTS[card.effect].description;
  }

  return "这张卡没有特殊效果。";
}

function drawModalCards(cards, x, y, width, height, viewportWidth, viewportHeight) {
  const gap = CARD_GRID_GAP;
  const queueCardSize = getQueueCardDisplaySize(viewportWidth, viewportHeight);
  const columnScale = (width - gap * (QUEUE_COLUMNS - 1)) / (queueCardSize.w * QUEUE_COLUMNS);
  const cardScale = Math.min(1, Math.max(0.1, columnScale));
  const base = Math.min(queueCardSize.w, queueCardSize.h) * cardScale;
  const cardS = Math.max(4, base);
  const columns = Math.max(1, Math.min(QUEUE_COLUMNS, Math.floor((width + gap) / (cardS + gap))));
  const rows = Math.max(1, Math.floor((height + gap) / (cardS + gap)));
  const visibleCount = rows * columns;
  const gridW = columns * cardS + gap * (columns - 1);
  const startX = x + (width - gridW) / 2;

  cards.slice(0, visibleCount).forEach(function (card, index) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const cardX = startX + col * (cardS + gap);
    const cardY = y + row * (cardS + gap);
    modalCardHitAreas.push({ x: cardX, y: cardY, w: cardS, h: cardS, card: card, index: index });
    drawMiniCard(card, cardX, cardY, cardS, cardS);
  });

  if (cards.length > visibleCount) {
    drawText("+" + (cards.length - visibleCount) + " 张", x, Math.min(y + height - 4, y + rows * (cardS + gap) + 12), 12, THEME.muted, "normal");
  }
}

function getQueueCardDisplaySize(width, height) {
  const layout = getGameLayout(width, height);
  const panel = layout.playerPanel;
  const cardArea = { x: panel.x + 12, y: panel.y + 64, w: panel.w - 24, h: panel.h - 76 };
  const rect = getQueueCardRect(0, cardArea.x + 10, cardArea.y + 12, cardArea.w - 20, cardArea.h - 22);
  return { w: rect.w, h: rect.h };
}

function drawQueue(side, x, y, width, height) {
  ctx.textAlign = "left";

  for (let i = 0; i < QUEUE_LIMIT; i += 1) {
    const slot = getQueueCardRect(i, x, y, width, height);
    drawCardSlot(slot, side.id === "ai");
  }

  side.queue.slice(0, QUEUE_LIMIT).forEach(function (card, index) {
    if (isQueueCardHiddenByDrawEffect(side.id, index) || isQueueCardHiddenBySlotMoveEffect(side.id, index, card) || isQueueCardHiddenByDeferDiscardFlight(side.id, card)) {
      return;
    }

    const rect = getQueueCardRect(index, x, y, width, height);
    queueCardHitAreas.push({ x: rect.x, y: rect.y, w: rect.w, h: rect.h, side: side, index: index, card: card });
    drawMiniCard(card, rect.x, rect.y, rect.w, rect.h);
    if (isActiveEffectCard(card)) {
      drawActiveSkillCardGlow(rect);
    }
  });
}

function drawCardSlot(rect, isAi) {
  const border = getBattleBorderOptions({ lineWidth: 1.5, cornerRadius: 6, glowBrightness: 0 });
  const strokeColor = isAi ? "255, 168, 196" : "94, 231, 255";
  ctx.fillStyle = "rgba(7, 11, 22, 0.48)";
  ctx.strokeStyle = "rgba(" + strokeColor + ", 0.22)";
  ctx.lineWidth = border.lineWidth;
  ctx.shadowColor = "rgba(" + strokeColor + ", 0.45)";
  ctx.shadowBlur = 5 * border.glowBrightness;
  roundRect(rect.x, rect.y, rect.w, rect.h, border.cornerRadius, true, true);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(" + strokeColor + ", 0.12)";
  ctx.lineWidth = Math.max(0.5, border.lineWidth * 0.66);
  roundRect(rect.x + 4, rect.y + 4, rect.w - 8, rect.h - 8, Math.max(0, border.cornerRadius - 2), false, true);
}

function isQueueCardHiddenByDrawEffect(sideId, queueIndex) {
  const now = Date.now();
  return activeEffects.some(function (effect) {
    return effect.type === "draw" && effect.sideId === sideId && effect.queueIndex === queueIndex && now - effect.startedAt < DRAW_ANIM_DURATION;
  });
}

function isQueueCardHiddenBySlotMoveEffect(sideId, queueIndex, card) {
  const now = Date.now();
  return activeEffects.some(function (effect) {
    return (
      effect.type === "slotMove" &&
      effect.targetSideId === sideId &&
      effect.toQueueIndex === queueIndex &&
      effect.card === card &&
      now >= effect.startedAt &&
      now - effect.startedAt < SLOT_MOVE_ANIM_DURATION
    );
  });
}

function isQueueCardHiddenByDeferDiscardFlight(sideId, card) {
  const now = Date.now();
  return activeEffects.some(function (effect) {
    return (
      effect.type === "discard" &&
      effect.deferQueueCommit &&
      effect.sourceSideId === sideId &&
      effect.card === card &&
      now >= effect.startedAt &&
      now - effect.startedAt < DISCARD_ANIM_DURATION
    );
  });
}

function isActiveEffectCard(card) {
  return (
    modal &&
    (modal.type === "activeEffect" ||
      modal.type === "selectStealTarget" ||
      modal.type === "selectCopyTarget" ||
      modal.type === "selectShieldTarget") &&
    modal.card === card
  );
}

function drawActiveSkillCardGlow(rect) {
  const glow = 0.5 + Math.sin(pulse * 2.8) * 0.5;
  const scanY = rect.y + ((pulse * 42) % (rect.h + 26)) - 13;

  ctx.save();
  ctx.shadowColor = "rgba(255, 224, 113, " + (0.45 + glow * 0.35) + ")";
  ctx.shadowBlur = 10 + glow * 9;
  ctx.strokeStyle = "rgba(255, 224, 113, " + (0.62 + glow * 0.32) + ")";
  ctx.lineWidth = 2 + glow * 1.2;
  roundRect(rect.x - 3, rect.y - 3, rect.w + 6, rect.h + 6, 8, false, true);

  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(94, 231, 255, " + (0.28 + glow * 0.32) + ")";
  ctx.lineWidth = 1.5;
  roundRect(rect.x + 3, rect.y + 3, rect.w - 6, rect.h - 6, 5, false, true);

  const scan = ctx.createLinearGradient(rect.x, scanY - 8, rect.x, scanY + 8);
  scan.addColorStop(0, "rgba(255, 224, 113, 0)");
  scan.addColorStop(0.5, "rgba(255, 224, 113, " + (0.16 + glow * 0.16) + ")");
  scan.addColorStop(1, "rgba(255, 224, 113, 0)");
  ctx.fillStyle = scan;
  roundRect(rect.x + 5, rect.y + 5, rect.w - 10, rect.h - 10, 4, true, false);
  ctx.restore();
}

function drawMiniCard(card, x, y, w, h) {
  const edge = Math.min(Math.max(0, w), Math.max(0, h));
  if (edge < 4) {
    return;
  }
  const border = getBattleBorderOptions({ lineWidth: 2.5, cornerRadius: 6, glowBrightness: 1 });
  const sx = x + (w - edge) / 2;
  const sy = y + (h - edge) / 2;

  const isBomb = card.type === CARD_BOMB;
  const isTemp = isBattleTemporaryCard(card);

  ctx.save();
  if (isTemp) {
    ctx.globalAlpha = 0.78;
  }

  ctx.shadowColor = "rgba(0, 0, 0, 0.38)";
  ctx.shadowBlur = 5 * border.glowBrightness;
  ctx.shadowOffsetY = 2;

  let outerFill;
  let outerStroke;
  let innerFill;
  let mainColor;
  let effBottomColor;

  if (isTemp) {
    outerFill = isBomb ? "rgba(58, 42, 14, 0.82)" : "rgba(255, 236, 160, 0.72)";
    outerStroke = "rgba(212, 165, 26, 0.92)";
    innerFill = isBomb ? "rgba(92, 68, 22, 0.58)" : "rgba(255, 248, 210, 0.82)";
    mainColor = isBomb ? "rgba(184, 132, 28, 0.96)" : "rgba(110, 82, 18, 0.94)";
    effBottomColor = isBomb ? mainColor : "rgba(92, 72, 22, 0.72)";
  } else {
    outerFill = isBomb ? "#220b16" : THEME.paper;
    outerStroke = isBomb ? THEME.danger : THEME.cyan;
    innerFill = isBomb ? "rgba(42, 10, 24, 0.55)" : "#f6f8fd";
    mainColor = isBomb ? THEME.danger : "#111827";
    effBottomColor = isBomb ? THEME.danger : "rgba(17, 24, 39, 0.68)";
  }

  ctx.fillStyle = outerFill;
  ctx.strokeStyle = outerStroke;
  ctx.lineWidth = border.lineWidth;
  roundRect(sx, sy, edge, edge, border.cornerRadius, true, true);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  const inset = Math.max(2, Math.min(5, Math.round(edge * 0.07)));
  const innerRadius = Math.max(2, border.cornerRadius - 2);
  ctx.fillStyle = innerFill;
  roundRect(sx + inset, sy + inset, edge - inset * 2, edge - inset * 2, innerRadius, true, false);

  ctx.textAlign = "center";
  const mainText = isBomb ? "X" : String(getCardDisplayValue(card));
  const mainSize = Math.max(12, Math.min(28, Math.floor(edge * 0.42)));
  drawMiddleText(mainText, sx + edge / 2, sy + edge / 2, mainSize, mainColor, "bold");

  if (card.effect && EFFECTS[card.effect]) {
    const effSize = Math.max(10, Math.round(Math.max(8, Math.min(11, edge * 0.18)) * 1.3));
    const margin = Math.max(4, edge * 0.05);
    let effectCy = sy + edge * 0.845;
    const maxCy = sy + edge - margin - effSize * 0.5;
    if (effectCy > maxCy) {
      effectCy = maxCy;
    }
    drawCenteredMiddleText(
      resolveEffectDisplayName(card),
      sx + edge / 2,
      effectCy,
      effSize,
      effBottomColor,
      "bold"
    );
  } else if (card.tempPollution === true && card.displayName) {
    const tagSize = Math.max(9, Math.round(Math.max(8, Math.min(11, edge * 0.16)) * 1.15));
    drawCenteredMiddleText(
      String(card.displayName),
      sx + edge / 2,
      sy + edge * 0.82,
      tagSize,
      mainColor,
      "bold"
    );
  }

  ctx.restore();
}

function drawPanel(rect, color, options) {
  const border = getBattleBorderOptions({
    lineWidth: options && options.lineWidth != null ? options.lineWidth : 1,
    cornerRadius: options && options.cornerRadius != null ? options.cornerRadius : 8,
    glowBrightness: options && options.glowBrightness != null ? options.glowBrightness : 1
  });
  ctx.shadowColor = "rgba(0, 0, 0, 0.38)";
  ctx.shadowBlur = 10 * border.glowBrightness;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = Math.max(0.5, border.lineWidth * 0.5);
  roundRect(rect.x, rect.y, rect.w, rect.h, border.cornerRadius, true, true);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

function drawPanelRim(rect, color, options) {
  const border = getBattleBorderOptions({
    lineWidth: options && options.lineWidth != null ? options.lineWidth : 2,
    cornerRadius: options && options.cornerRadius != null ? options.cornerRadius : 6,
    glowBrightness: options && options.glowBrightness != null ? options.glowBrightness : 1
  });
  const inset = options && options.inset != null ? options.inset : 3;
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 8 * border.glowBrightness;
  ctx.strokeStyle = color;
  ctx.lineWidth = border.lineWidth;
  roundRect(rect.x + inset, rect.y + inset, rect.w - inset * 2, rect.h - inset * 2, border.cornerRadius, false, true);
  ctx.restore();
}

function drawButton(rect, label, color, textColor, enabled) {
  const border = getBattleBorderOptions({ lineWidth: 2, cornerRadius: 8, glowBrightness: 1 });
  const battleButtonGlow =
    enabled && (scene === "playing" || scene === "backstage" || scene === "title");
  ctx.shadowColor = battleButtonGlow ? color : "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 7 * border.glowBrightness;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = color;
  ctx.strokeStyle = enabled ? "rgba(255, 255, 255, 0.86)" : "rgba(143, 155, 181, 0.48)";
  ctx.lineWidth = border.lineWidth;
  roundRect(rect.x, rect.y, rect.w, rect.h, border.cornerRadius, true, true);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = Math.max(0.5, border.lineWidth * 0.5);
  roundRect(rect.x + 5, rect.y + 5, rect.w - 10, rect.h - 10, Math.max(0, border.cornerRadius - 3), false, true);
  drawCenteredText(label, rect.x + rect.w / 2, rect.y + rect.h / 2 + 6, 15, textColor, "bold");
}

function roundRect(x, y, w, h, radius, fill, stroke) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  if (fill) {
    ctx.fill();
  }

  if (stroke) {
    ctx.stroke();
  }
}

function drawHearts(side, x, y) {
  const layout = getThresholdLayout();
  const labelX = x + layout.labelOffsetX;
  const labelY = y + layout.labelOffsetY;

  ctx.textAlign = "left";
  drawText("阈值", labelX, labelY, 14, THEME.muted, "normal");

  const heartStartX = x + layout.pointStartX;
  const pointY = labelY + layout.pointOffsetY;
  const pointRadius = layout.pointRadius;
  const now = Date.now();
  const flash = activeEffects.find(function (effect) {
    return effect.type === "bomb" && effect.sideId === side.id && now - effect.startedAt < HEART_FLASH_DURATION;
  });

  const recoverPulse = hpRecoverPulse[side.id];

  for (let i = 0; i < MAX_HP; i += 1) {
    const heartX = heartStartX + i * layout.pointGap;
    const isAlive = i < side.hp;
    const isFlashingLostHeart = flash && i === flash.lostHeartIndex;

    if (isAlive) {
      let r = pointRadius;
      let ringAlpha = 0;
      if (recoverPulse && recoverPulse.slotIndex === i) {
        const prog = (now - recoverPulse.startedAt) / HP_RECOVER_PULSE_MS;
        if (prog >= 0 && prog < 1) {
          r *= 1 + 0.52 * Math.sin(prog * Math.PI);
          ringAlpha = 0.5 * (1 - prog);
        }
      }
      if (ringAlpha > 0.02) {
        ctx.save();
        ctx.globalAlpha = ringAlpha;
        ctx.beginPath();
        ctx.arc(heartX, pointY, r + 6, 0, Math.PI * 2);
        ctx.strokeStyle = THEME.gold;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
      drawThresholdPoint(heartX, pointY, r, true, THEME.danger);
    } else if (isFlashingLostHeart) {
      const t = clamp((now - flash.startedAt) / HEART_FLASH_DURATION, 0, 1);
      const visible = Math.floor(t * 9) % 2 === 0;

      if (visible || t > 0.7) {
        ctx.save();
        ctx.globalAlpha = 1 - Math.max(0, t - 0.72) / 0.28;
        drawThresholdPoint(heartX, pointY, pointRadius + Math.sin(t * Math.PI) * layout.flashRadiusBoost, true, THEME.danger);
        ctx.restore();
      }
    } else {
      drawThresholdPoint(heartX, pointY, pointRadius, false, "rgba(143, 155, 181, 0.28)");
    }
  }
}

function drawThresholdPoint(x, y, radius, filled, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);

  if (filled) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function drawText(text, x, y, size, color, weight) {
  ctx.fillStyle = color;
  ctx.font = weight + " " + size + "px " + UI_FONT;
  ctx.fillText(text, x, y);
}

function drawCenteredText(text, x, y, size, color, weight) {
  ctx.textAlign = "center";
  drawText(text, x, y, size, color, weight);
}

function drawMiddleText(text, x, y, size, color, weight) {
  ctx.save();
  ctx.textBaseline = "middle";
  drawText(text, x, y, size, color, weight);
  ctx.restore();
}

function drawCenteredMiddleText(text, x, y, size, color, weight) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawText(text, x, y, size, color, weight);
  ctx.restore();
}

function drawWrappedText(text, x, y, maxWidth, size, lineHeight, color, weight) {
  ctx.save();
  ctx.textAlign = "left";
  ctx.font = weight + " " + size + "px " + UI_FONT;
  ctx.fillStyle = color;

  let line = "";
  let currentY = y;
  for (let i = 0; i < text.length; i += 1) {
    const testLine = line + text[i];
    if (line && ctx.measureText(testLine).width > maxWidth) {
      ctx.fillText(line, x, currentY);
      line = text[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    ctx.fillText(line, x, currentY);
  }

  ctx.restore();
}

let testWinOverlayEl = null;

function initTestWinOverlay() {
  if (typeof document === "undefined") {
    return;
  }

  const el = document.getElementById("layoutTestWinToggle");
  if (!el) {
    return;
  }

  testWinOverlayEl = el;

  if (el.dataset.cardlootBound === "1") {
    return;
  }

  el.dataset.cardlootBound = "1";
  el.addEventListener("click", function (event) {
    event.preventDefault();
    triggerTestWin();
  });
}

function syncTestWinOverlayVisibility() {
  if (!testWinOverlayEl) {
    return;
  }

  const visible =
    scene === "playing" &&
    game &&
    !game.matchWinner &&
    !modal &&
    !pendingActiveEffect &&
    !(roundAdvanceAt > Date.now());

  testWinOverlayEl.hidden = !visible;
}

function draw() {
  const size = resizeCanvas();
  update();

  if (scene === "title") {
    drawTitle(size.width, size.height);
  } else if (scene === "playing") {
    drawGame(size.width, size.height);
  } else if (scene === "backstage") {
    drawBackstage(size.width, size.height);
  } else if (scene === "routeMap") {
    drawRouteMap(size.width, size.height);
  } else if (scene === "runVictory") {
    drawRunVictory(size.width, size.height);
  } else if (scene === "opponentSelect") {
    drawOpponentSelect(size.width, size.height);
  } else {
    drawTitle(size.width, size.height);
  }

  drawActiveEffects(size.width, size.height);
  drawOpponentSpeechBubbleOverlay(size.width, size.height);
  drawPileModal(size.width, size.height);
  drawTips(size.width, size.height);

  syncTestWinOverlayVisibility();

  pulse += 0.05;
  requestAnimationFrame(draw);
}

function startGameShell() {
  initTestWinOverlay();
  tap.onTouchStart(handleTouch);
  draw();
}

rebuildCatalogIndex();
bootstrapReady = false;
startGameShell();

Promise.all([
  fetch(CARDS_JSON_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("cards.json " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      applyCardsCatalogPayload(data);
    })
    .catch(function () {
      cardsCatalogEntries = null;
    }),
  fetch(THIEF_DECK_JSON_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("thief deck " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      applyThiefDeckPayload(data);
    })
    .catch(function () {
      thiefDeckCardIds = null;
    }),
  fetch(PLAYER_DECK_JSON_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("player deck " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      applyPlayerDeckPayload(data);
    })
    .catch(function () {
      playerDeckCardIds = null;
    })
].concat(expeditionDeckLoadPromises()))
  .finally(function () {
    rebuildCatalogIndex();
    bootstrapReady = true;
  });
