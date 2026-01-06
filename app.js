/* v3.5 - 編集機能つき（問題データ編集/書き出し/読込） */
const APP_DATA_VERSION = "3.17";

const LS_KEYS = {
  dataVersion: "kanji_data_version",
  items: "kanji_items_v3_ruby_units",
  idx: "kanji_idx_practice_only_v3",
  strokesPrefix: "kanji_strokes_practice_only_v3_",
  boxScaleOffset: "kanji_box_scale_offset_v3",
};

const defaultItems = [{"qRuby": "<ruby>一定<rt>いってい</rt></ruby>の”ひょう”<ruby>価<rt>か</rt></ruby>", "answerFull": "一定の評価", "units": [{"kind": "blank", "expected": "評", "reading": "ひょう"}, {"kind": "fixed", "char": "価", "reading": "か"}]}, {"qRuby": "<ruby>新<rt>しん</rt></ruby>”がた”の<ruby>船<rt>ふね</rt></ruby>", "answerFull": "新型の船", "units": [{"kind": "fixed", "char": "新", "reading": "しん"}, {"kind": "blank", "expected": "型", "reading": "がた"}]}, {"qRuby": "”き”<ruby>本<rt>ほん</rt></ruby>に<ruby>返<rt>かえ</rt></ruby>る", "answerFull": "基本に返る", "units": [{"kind": "blank", "expected": "基", "reading": "き"}, {"kind": "fixed", "char": "本", "reading": "ほん"}]}, {"qRuby": "<ruby>食<rt>しょく</rt></ruby><ruby>料<rt>りょう</rt></ruby>の”てい”<ruby>供<rt>きょう</rt></ruby>", "answerFull": "食料の提供", "units": [{"kind": "blank", "expected": "提", "reading": "てい"}, {"kind": "fixed", "char": "供", "reading": "きょう"}]}, {"qRuby": "<ruby>古<rt>ふる</rt></ruby>い<ruby>建<rt>けん</rt></ruby>”ちく”<ruby>物<rt>ぶつ</rt></ruby>", "answerFull": "古い建築物", "units": [{"kind": "fixed", "char": "建", "reading": "けん"}, {"kind": "blank", "expected": "築", "reading": "ちく"}, {"kind": "fixed", "char": "物", "reading": "ぶつ"}]}, {"qRuby": "”つま”の<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>", "answerFull": "妻の名前", "units": [{"kind": "blank", "expected": "妻", "reading": "つま"}]}, {"qRuby": "<ruby>温<rt>おん</rt></ruby><ruby>度<rt>ど</rt></ruby>の”せっ”<ruby>定<rt>てい</rt></ruby>", "answerFull": "温度の設定", "units": [{"kind": "blank", "expected": "設", "reading": "せっ"}, {"kind": "fixed", "char": "定", "reading": "てい"}]}, {"qRuby": "”ちょ”<ruby>金<rt>きん</rt></ruby>をする", "answerFull": "貯金をする", "units": [{"kind": "blank", "expected": "貯", "reading": "ちょ"}, {"kind": "fixed", "char": "金", "reading": "きん"}]}, {"qRuby": "<ruby>栄<rt>えい</rt></ruby><ruby>養<rt>よう</rt></ruby>”そ”", "answerFull": "栄養素", "units": [{"kind": "fixed", "char": "栄", "reading": "えい"}, {"kind": "fixed", "char": "養", "reading": "よう"}, {"kind": "blank", "expected": "素", "reading": "そ"}]}, {"qRuby": "<ruby>炭<rt>たん</rt></ruby>”さん”<ruby>水<rt>すい</rt></ruby>", "answerFull": "炭酸水", "units": [{"kind": "fixed", "char": "炭", "reading": "たん"}, {"kind": "blank", "expected": "酸", "reading": "さん"}, {"kind": "fixed", "char": "水", "reading": "すい"}]}, {"qRuby": "”よ”り<ruby>道<rt>みち</rt></ruby>", "answerFull": "寄り道", "units": [{"kind": "blank", "expected": "寄", "reading": "よ"}, {"kind": "fixed", "char": "り"}, {"kind": "fixed", "char": "道", "reading": "みち"}]}, {"qRuby": "”しょう”<ruby>明<rt>めい</rt></ruby><ruby>書<rt>しょ</rt></ruby>", "answerFull": "証明書", "units": [{"kind": "blank", "expected": "証", "reading": "しょう"}, {"kind": "fixed", "char": "明", "reading": "めい"}, {"kind": "fixed", "char": "書", "reading": "しょ"}]}, {"qRuby": "<ruby>薬<rt>くすり</rt></ruby>の”こう”<ruby>果<rt>か</rt></ruby>", "answerFull": "薬の効果", "units": [{"kind": "blank", "expected": "効", "reading": "こう"}, {"kind": "fixed", "char": "果", "reading": "か"}]}, {"qRuby": "<ruby>血<rt>けつ</rt></ruby>”えき”の<ruby>成<rt>せい</rt></ruby><ruby>分<rt>ぶん</rt></ruby>", "answerFull": "血液の成分", "units": [{"kind": "fixed", "char": "血", "reading": "けつ"}, {"kind": "blank", "expected": "液", "reading": "えき"}]}, {"qRuby": "<ruby>説<rt>せつ</rt></ruby>”とく”<ruby>力<rt>りょく</rt></ruby>", "answerFull": "説得力", "units": [{"kind": "fixed", "char": "説", "reading": "せつ"}, {"kind": "blank", "expected": "得", "reading": "とく"}, {"kind": "fixed", "char": "力", "reading": "りょく"}]}, {"qRuby": "<ruby>車<rt>くるま</rt></ruby>の<ruby>通<rt>つう</rt></ruby>”か”", "answerFull": "車の通過", "units": [{"kind": "fixed", "char": "通", "reading": "つう"}, {"kind": "blank", "expected": "過", "reading": "か"}]}, {"qRuby": "”こ”み<ruby>合<rt>あ</rt></ruby>う<ruby>駅<rt>えき</rt></ruby>", "answerFull": "混み合う駅", "units": [{"kind": "blank", "expected": "混", "reading": "こ"}, {"kind": "fixed", "char": "み"}, {"kind": "fixed", "char": "合", "reading": "あ"}, {"kind": "fixed", "char": "う"}]}, {"qRuby": "<ruby>人<rt>じん</rt></ruby><ruby>口<rt>こう</rt></ruby>の<ruby>分<rt>ぶん</rt></ruby>”ぶ”", "answerFull": "人口の分布", "units": [{"kind": "fixed", "char": "分", "reading": "ぶん"}, {"kind": "blank", "expected": "布", "reading": "ぶ"}]}, {"qRuby": "<ruby>多<rt>おお</rt></ruby>くの”ざい”<ruby>産<rt>さん</rt></ruby>", "answerFull": "多くの財産", "units": [{"kind": "blank", "expected": "財", "reading": "ざい"}, {"kind": "fixed", "char": "産", "reading": "さん"}]}, {"qRuby": "<ruby>主<rt>しゅ</rt></ruby>”ちょう”する<ruby>説<rt>せつ</rt></ruby>", "answerFull": "主張する説", "units": [{"kind": "fixed", "char": "主", "reading": "しゅ"}, {"kind": "blank", "expected": "張", "reading": "ちょう"}]}, {"qRuby": "<ruby>必<rt>ひつ</rt></ruby><ruby>要<rt>よう</rt></ruby>な<ruby>条<rt>じょう</rt></ruby>”けん”", "answerFull": "必要な条件", "units": [{"kind": "fixed", "char": "条", "reading": "じょう"}, {"kind": "blank", "expected": "件", "reading": "けん"}]}, {"qRuby": "”ざつ”<ruby>音<rt>おん</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い", "answerFull": "雑音が多い", "units": [{"kind": "blank", "expected": "雑", "reading": "ざつ"}, {"kind": "fixed", "char": "音", "reading": "おん"}]}, {"qRuby": "<ruby>交<rt>こう</rt></ruby><ruby>通<rt>つう</rt></ruby><ruby>事<rt>じ</rt></ruby>”こ”", "answerFull": "交通事故", "units": [{"kind": "fixed", "char": "事", "reading": "じ"}, {"kind": "blank", "expected": "故", "reading": "こ"}]}, {"qRuby": "<ruby>大<rt>おお</rt></ruby>きな<ruby>組<rt>そ</rt></ruby>”しき”", "answerFull": "大きな組織", "units": [{"kind": "fixed", "char": "組", "reading": "そ"}, {"kind": "blank", "expected": "織", "reading": "しき"}]}, {"qRuby": "”さん”<ruby>成<rt>せい</rt></ruby>の<ruby>立<rt>たち</rt></ruby><ruby>場<rt>ば</rt></ruby>", "answerFull": "賛成の立場", "units": [{"kind": "blank", "expected": "賛", "reading": "さん"}, {"kind": "fixed", "char": "成", "reading": "せい"}]}, {"qRuby": "”とう”<ruby>計<rt>けい</rt></ruby><ruby>資<rt>し</rt></ruby><ruby>料<rt>りょう</rt></ruby>", "answerFull": "統計資料", "units": [{"kind": "blank", "expected": "統", "reading": "とう"}, {"kind": "fixed", "char": "計", "reading": "けい"}]}, {"qRuby": "<ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby>の<ruby>教<rt>きょう</rt></ruby>”じゅ”", "answerFull": "大学の教授", "units": [{"kind": "fixed", "char": "教", "reading": "きょう"}, {"kind": "blank", "expected": "授", "reading": "じゅ"}]}, {"qRuby": "<ruby>昔<rt>むかし</rt></ruby>の”き”<ruby>行<rt>こう</rt></ruby><ruby>文<rt>ぶん</rt></ruby>", "answerFull": "昔の紀行文", "units": [{"kind": "blank", "expected": "紀", "reading": "き"}, {"kind": "fixed", "char": "行", "reading": "こう"}]}, {"qRuby": "”せき”<ruby>任<rt>にん</rt></ruby>をとる", "answerFull": "責任をとる", "units": [{"kind": "blank", "expected": "責", "reading": "せき"}, {"kind": "fixed", "char": "任", "reading": "にん"}]}, {"qRuby": "<ruby>数<rt>かず</rt></ruby>の”げん”<ruby>少<rt>しょう</rt></ruby>", "answerFull": "数の減少", "units": [{"kind": "blank", "expected": "減", "reading": "げん"}, {"kind": "fixed", "char": "少", "reading": "しょう"}]}, {"qRuby": "<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もつ</rt></ruby>の”けん”<ruby>査<rt>さ</rt></ruby>", "answerFull": "荷物の検査", "units": [{"kind": "blank", "expected": "検", "reading": "けん"}, {"kind": "fixed", "char": "査", "reading": "さ"}]}, {"qRuby": "<ruby>大<rt>たい</rt></ruby><ruby>会<rt>かい</rt></ruby>の<ruby>日<rt>にっ</rt></ruby>”てい”", "answerFull": "大会の日程", "units": [{"kind": "fixed", "char": "日", "reading": "にっ"}, {"kind": "blank", "expected": "程", "reading": "てい"}]}, {"qRuby": "<ruby>虫<rt>むし</rt></ruby>の”さい”<ruby>集<rt>しゅう</rt></ruby>", "answerFull": "虫の採集", "units": [{"kind": "blank", "expected": "採", "reading": "さい"}, {"kind": "fixed", "char": "集", "reading": "しゅう"}]}, {"qRuby": "”こ”<ruby>人<rt>じん</rt></ruby><ruby>競<rt>きょう</rt></ruby><ruby>技<rt>ぎ</rt></ruby>", "answerFull": "個人競技", "units": [{"kind": "blank", "expected": "個", "reading": "こ"}, {"kind": "fixed", "char": "人", "reading": "じん"}]}, {"qRuby": "<ruby>省<rt>しょう</rt></ruby>”りゃく”する", "answerFull": "省略する", "units": [{"kind": "fixed", "char": "省", "reading": "しょう"}, {"kind": "blank", "expected": "略", "reading": "りゃく"}]}, {"qRuby": "”きゅう”<ruby>道<rt>どう</rt></ruby>を<ruby>走<rt>はし</rt></ruby>る", "answerFull": "旧道を走る", "units": [{"kind": "blank", "expected": "旧", "reading": "きゅう"}, {"kind": "fixed", "char": "道", "reading": "どう"}]}, {"qRuby": "<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>の<ruby>山<rt>さん</rt></ruby>”みゃく”", "answerFull": "日本の山脈", "units": [{"kind": "fixed", "char": "山", "reading": "さん"}, {"kind": "blank", "expected": "脈", "reading": "みゃく"}]}, {"qRuby": "<ruby>養<rt>よう</rt></ruby>”ご”の<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>", "answerFull": "養護の先生", "units": [{"kind": "fixed", "char": "養", "reading": "よう"}, {"kind": "blank", "expected": "護", "reading": "ご"}]}, {"qRuby": "”き”<ruby>則<rt>そく</rt></ruby>を<ruby>守<rt>まも</rt></ruby>る", "answerFull": "規則を守る", "units": [{"kind": "blank", "expected": "規", "reading": "き"}, {"kind": "fixed", "char": "則", "reading": "そく"}]}, {"qRuby": "<ruby>通<rt>つう</rt></ruby><ruby>行<rt>こう</rt></ruby>”きん”<ruby>止<rt>し</rt></ruby>", "answerFull": "通行禁止", "units": [{"kind": "blank", "expected": "禁", "reading": "きん"}, {"kind": "fixed", "char": "止", "reading": "し"}]}, {"qRuby": "<ruby>人<rt>じん</rt></ruby><ruby>口<rt>こう</rt></ruby>が”ふえる”", "answerFull": "人口が増える", "units": [{"kind": "blank", "expected": "増", "reading": "ふ"}, {"kind": "blank", "expected": "え", "reading": "え"}, {"kind": "blank", "expected": "る", "reading": "る"}]}, {"qRuby": "”あまり”を<ruby>求<rt>もと</rt></ruby>める", "answerFull": "余りを求める", "units": [{"kind": "blank", "expected": "余", "reading": "あま"}, {"kind": "blank", "expected": "り", "reading": "り"}]}, {"qRuby": "<ruby>健<rt>けん</rt></ruby><ruby>康<rt>こう</rt></ruby>を”たもつ”", "answerFull": "健康を保つ", "units": [{"kind": "blank", "expected": "保", "reading": "たも"}, {"kind": "blank", "expected": "つ", "reading": "つ"}]}, {"qRuby": "<ruby>道<rt>みち</rt></ruby>に”まよう”", "answerFull": "道に迷う", "units": [{"kind": "blank", "expected": "迷", "reading": "まよ"}, {"kind": "blank", "expected": "う", "reading": "う"}]}, {"qRuby": "<ruby>手<rt>て</rt></ruby>で”ささえる”", "answerFull": "手で支える", "units": [{"kind": "blank", "expected": "支", "reading": "ささ"}, {"kind": "blank", "expected": "え", "reading": "え"}, {"kind": "blank", "expected": "る", "reading": "る"}]}, {"qRuby": "”ふたたび”<ruby>現<rt>あらわ</rt></ruby>れる", "answerFull": "再び現れる", "units": [{"kind": "blank", "expected": "再", "reading": "ふたた"}, {"kind": "blank", "expected": "び", "reading": "び"}]}, {"qRuby": "<ruby>左<rt>さ</rt></ruby><ruby>右<rt>ゆう</rt></ruby>を”くらべる”", "answerFull": "左右を比べる", "units": [{"kind": "blank", "expected": "比", "reading": "くら"}, {"kind": "blank", "expected": "べ", "reading": "べ"}, {"kind": "blank", "expected": "る", "reading": "る"}]}, {"qRuby": "<ruby>例<rt>れい</rt></ruby>を”しめす”", "answerFull": "例を示す", "units": [{"kind": "blank", "expected": "示", "reading": "しめ"}, {"kind": "blank", "expected": "す", "reading": "す"}]}, {"qRuby": "”ゆたかな”<ruby>生<rt>せい</rt></ruby><ruby>活<rt>かつ</rt></ruby>", "answerFull": "豊かな生活", "units": [{"kind": "blank", "expected": "豊", "reading": "ゆたか"}, {"kind": "blank", "expected": "か", "reading": "か"}, {"kind": "blank", "expected": "な", "reading": "な"}]}, {"qRuby": "”ひとり”<ruby>言<rt>ごと</rt></ruby>を<ruby>言<rt>い</rt></ruby>う", "answerFull": "独り言を言う", "units": [{"kind": "blank", "expected": "独", "reading": "ひと"}, {"kind": "blank", "expected": "り", "reading": "り"}, {"kind": "fixed", "char": "言", "reading": "ごと"}]}];

let items = loadItems();
let idx = loadIdx();

let traceMode = false;
let moreOpen = false;
const BOX_BASE_SCALE = 240; // 240% is treated as 0%
let boxScaleOffset = loadBoxScaleOffset();

let strokesByBlank = [];
let activeBlank = 0;

const canvas = document.getElementById("pad");
const ctx = canvas.getContext("2d");

const qidEl = document.getElementById("qid");
const qtotalEl = document.getElementById("qtotal");
const promptEl = document.getElementById("promptText");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");
const toggleTraceBtn = document.getElementById("toggleTraceBtn");
const boxScaleSlider = document.getElementById("boxScaleSlider");
const boxScaleLabel = document.getElementById("boxScaleLabel");
const resetBtn = document.getElementById("resetBtn");
const editBtn = document.getElementById("editBtn");



let boxes = [];

// --- editor elements ---
const editDialog = document.getElementById("editDialog");
const editPos = document.getElementById("editPos");
const editQRuby = document.getElementById("editQRuby");
const editAnswer = document.getElementById("editAnswer");
const unitsTable = document.getElementById("unitsTable");
const addUnitBtn = document.getElementById("addUnitBtn");
const prevEditBtn = document.getElementById("prevEditBtn");
const nextEditBtn = document.getElementById("nextEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");
const exportItemsBtn = document.getElementById("exportItemsBtn");
const importItemsInput = document.getElementById("importItemsInput");
const restoreDefaultBtn = document.getElementById("restoreDefaultBtn");
const editJson = document.getElementById("editJson");
const applyJsonBtn = document.getElementById("applyJsonBtn");

let editIndex = 0;

// ---------- canvas sizing ----------
function updateLayoutVars(){
  const topbar = document.querySelector('.topbar');
  const h = topbar ? topbar.offsetHeight : 280;
  document.documentElement.style.setProperty('--topbar-h', `${h}px`);
}

function resizeCanvas() {
  updateLayoutVars();
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  updateLayoutVars();
  redraw();
}
window.addEventListener("resize", resizeCanvas);

function safeUnits(item) {
  if (item && Array.isArray(item.units) && item.units.length >= 1) return item.units;
  return [{ kind: "blank", expected: " " }];
}

function buildBoxes() {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;

  const item = items[idx] || {};
  const units = safeUnits(item);

  // base box size based on screen width/units count
  const maxBoxW = Math.min(160, w / Math.max(3, units.length + 1));
  const baseBox = Math.max(85, Math.min(150, maxBoxW));
  const absScale = BOX_BASE_SCALE + (Number.isFinite(boxScaleOffset) ? boxScaleOffset : 0);
  const scale = absScale / 100;

  // Apply user scale, then constrain so it fits the canvas area.
  let box = baseBox * scale;

  // Constrain by width (leave some margin)
  const maxByWidth = (w * 0.92 - (units.length - 1) * Math.max(12, Math.min(22, baseBox * 0.12))) / units.length;
  // Constrain by height (leave margin top/bottom)
  const maxByHeight = h * 0.70;

  box = Math.max(70, Math.min(box, maxByWidth, maxByHeight));
  const gap = Math.max(10, Math.min(22, box * 0.12));

  const totalW = units.length * box + (units.length - 1) * gap;
  const startX = (w - totalW) / 2;
  const y = Math.max(20, (h - box) / 2 - 10);

  boxes = [];
  let blankCounter = 0;
  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    const x = startX + i * (box + gap);
    const isBlank = (u.kind === "blank");
    const bIdx = isBlank ? blankCounter++ : null;
    boxes.push({ x, y, w: box, h: box, unitIndex: i, isBlank, blankIndex: bIdx });
  }
}

function drawBackground() {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
}

function shouldShowFuriganaInBoxes() {
  // 1〜40のみ（0〜39）
  return idx <= 39;
}

function drawBoxes() {
  buildBoxes();
  const item = items[idx] || {};
  const units = safeUnits(item);

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#e2e2e2";

  for (const b of boxes) ctx.strokeRect(b.x, b.y, b.w, b.h);

  const activeBox = boxes.find(b => b.isBlank && b.blankIndex === activeBlank);
  if (activeBox) {
    ctx.strokeStyle = "#c8dcff";
    ctx.lineWidth = 2;
    ctx.strokeRect(activeBox.x - 1, activeBox.y - 1, activeBox.w + 2, activeBox.h + 2);
  }

  // Furigana in boxes for Q1-40
  if (shouldShowFuriganaInBoxes()) {
    ctx.fillStyle = "#666";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const rtSize = Math.floor((boxes[0]?.w || 120) * 0.18);
    ctx.font = `${rtSize}px "Hiragino Sans","Noto Sans JP",sans-serif`;

    for (const b of boxes) {
      const u = units[b.unitIndex];
      if (!u?.reading) continue;
      ctx.fillText(u.reading, b.x + b.w / 2, b.y + b.h * 0.17);
    }
  }

  // fixed chars
  ctx.fillStyle = "#111";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const fontSize = Math.floor((boxes[0]?.w || 120) * 0.62);
  ctx.font = `${fontSize}px "Hiragino Mincho ProN","Noto Serif JP",serif`;

  for (const b of boxes) {
    const u = units[b.unitIndex];
    if (u && u.kind === "fixed") ctx.fillText(u.char, b.x + b.w / 2, b.y + b.h / 2 + b.h*0.05);
  }

  if (traceMode) {
    ctx.globalAlpha = 0.16;
    for (const b of boxes) {
      if (!b.isBlank) continue;
      const u = units[b.unitIndex];
      if (u?.expected) ctx.fillText(u.expected, b.x + b.w / 2, b.y + b.h / 2 + b.h*0.05);
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawStrokes() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#111";

  const blankBoxes = boxes.filter(b => b.isBlank);
  for (let bi = 0; bi < blankBoxes.length; bi++) {
    const b = blankBoxes[bi];
    const strokes = strokesByBlank[bi] || [];
    for (const s of strokes) {
      const pts = s.points || [];
      if (pts.length < 2) continue;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const c = pts[i];
        const pressure = (c.p ?? 0.5);
        const width = 2 + pressure * 6;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(b.x + a.x * b.w, b.y + a.y * b.h);
        ctx.lineTo(b.x + c.x * b.w, b.y + c.y * b.h);
        ctx.stroke();
      }
    }
  }

  ctx.restore();
}

function redraw() {
  drawBackground();
  drawBoxes();
  drawStrokes();
}

// ---------- drawing ----------
let drawing = false;
let currentStroke = null;

function hitTestBlank(x, y) {
  for (const b of boxes) {
    if (!b.isBlank) continue;
    if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return b.blankIndex;
  }
  return null;
}

function getCanvasPos(e) {
  const rect = canvas.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top,
           p: (typeof e.pressure === "number" && e.pressure > 0) ? e.pressure : 0.5 };
}

function ensureStrokesShape() {
  const blanks = boxes.filter(b => b.isBlank).length;
  if (!Array.isArray(strokesByBlank) || strokesByBlank.length !== blanks) {
    strokesByBlank = Array.from({ length: blanks }, () => []);
  }
  if (activeBlank >= blanks) activeBlank = 0;
}

canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture(e.pointerId);
  const pos = getCanvasPos(e);
  const hit = hitTestBlank(pos.x, pos.y);
  if (hit === null) return;

  activeBlank = hit;
  ensureStrokesShape();
  drawing = true;

  const b = boxes.filter(b => b.isBlank)[activeBlank];
  const nx = (pos.x - b.x) / b.w;
  const ny = (pos.y - b.y) / b.h;

  currentStroke = { points: [{ x: clamp01(nx), y: clamp01(ny), p: pos.p }] };
  strokesByBlank[activeBlank].push(currentStroke);

  redraw();
});

canvas.addEventListener("pointermove", (e) => {
  if (!drawing || !currentStroke) return;
  const pos = getCanvasPos(e);

  const b = boxes.filter(b => b.isBlank)[activeBlank];
  const nx = (pos.x - b.x) / b.w;
  const ny = (pos.y - b.y) / b.h;

  currentStroke.points.push({ x: clamp01(nx), y: clamp01(ny), p: pos.p });
  redraw();
});

function endStroke() {
  if (!drawing) return;
  drawing = false;
  currentStroke = null;
  saveStrokesForCurrent();
}
canvas.addEventListener("pointerup", endStroke);
canvas.addEventListener("pointercancel", endStroke);

// ---------- navigation ----------
prevBtn.onclick = () => goTo(idx - 1);
nextBtn.onclick = () => goTo(idx + 1);

randomBtn.onclick = () => { if (items.length > 1) goTo(Math.floor(Math.random() * items.length)); };

clearBtn.onclick = () => {
  ensureStrokesShape();
  strokesByBlank = strokesByBlank.map(() => []);
  saveStrokesForCurrent();
  redraw();
};

toggleTraceBtn.onclick = () => { traceMode = !traceMode; redraw(); };
if (boxScaleSlider) {
  boxScaleSlider.addEventListener("input", () => {
    const v = Number(boxScaleSlider.value);
    if (!Number.isFinite(v)) return;
    boxScaleOffset = v;
    saveBoxScaleOffset();
    updateBoxScaleUI();
    redraw();
  });
}

// ---------- reset ----------
resetBtn.onclick = async () => {
  if (!confirm("このアプリの保存データを初期化します（手書き・編集した問題など）。よろしいですか？")) return;

  try {
    // remove known keys
    Object.values(LS_KEYS).forEach(k => { try { localStorage.removeItem(k); } catch {} });

    // remove all stroke keys
    const ks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith(LS_KEYS.strokesPrefix)) ks.push(k);
    }
    ks.forEach(k => localStorage.removeItem(k));
  } catch {}

  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
  } catch {}

  alert("初期化しました。ページを再読み込みします。");
  location.reload();
};

// ---------- render ----------
function renderQuestion() {
  const item = items[idx] || { qRuby:"", answerFull:"", units:[] };
  qidEl.textContent = String(idx + 1);
  qtotalEl.textContent = String(items.length);
  promptEl.innerHTML = item.qRuby || "";
}





function renderAll() {
  renderQuestion();
  updateBoxScaleUI();
  loadStrokesForCurrent();
  redraw();
}

function goTo(newIdx) {
  if (newIdx < 0) newIdx = items.length - 1;
  if (newIdx >= items.length) newIdx = 0;
  idx = newIdx;
  saveIdx(idx);
  loadStrokesForCurrent();
  renderAll();
}


// ---------- storage ----------
function getDataVersion() { return localStorage.getItem(LS_KEYS.dataVersion) || ""; }
function saveDataVersion(v) { localStorage.setItem(LS_KEYS.dataVersion, v); }

function sanitizeItems(arr) {
  const out = [];
  for (const it of arr) {
    const qRuby = String(it?.qRuby ?? "");
    const answerFull = String(it?.answerFull ?? "");
    const units = Array.isArray(it?.units) ? it.units : null;
    if (!qRuby || !answerFull || !units || units.length < 1) continue;

    const uu = units.map(u => {
      const reading = (u?.reading != null) ? String(u.reading) : undefined;
      if (u?.kind === "fixed") {
        const char = String(u.char ?? "").slice(0,2);
        const o = { kind:"fixed", char };
        if (reading) o.reading = reading;
        return o;
      }
      const expected = String(u.expected ?? " ").slice(0,2);
      const o = { kind:"blank", expected };
      if (reading) o.reading = reading;
      return o;
    }).filter(u => (u.kind === "fixed" ? u.char : true));

    if (uu.length < 1) continue;
    out.push({ qRuby, answerFull, units: uu });
  }
  return out.length ? out : defaultItems;
}


function applyKnownFixes(arr){
  // v3.7 fixes for specific questions. If user already edited, we avoid overriding.
  // Q7 (index 6): せつ -> せっ
  if (arr[6] && typeof arr[6].qRuby === "string" && arr[6].qRuby.includes("”せつ”")) {
    arr[6].qRuby = arr[6].qRuby.replace("”せつ”","”せっ”");
    if (Array.isArray(arr[6].units)) {
      arr[6].units.forEach(u => {
        if (u && u.kind === "blank" && u.expected === "設") u.reading = "せっ";
      });
    }
  }
  // Q16 (index 15): 通行 -> 通過 (行->過)
  if (arr[15] && arr[15].answerFull === "車の通行") {
    arr[15].qRuby = "<ruby>車<rt>くるま</rt></ruby>の<ruby>通<rt>つう</rt></ruby>”か”";
    arr[15].answerFull = "車の通過";
    arr[15].units = [
      { kind:"fixed", char:"通", reading:"つう" },
      { kind:"blank", expected:"過", reading:"か" },
    ];
  }
  // Q17 (index 16): 込み合う -> 混み合う / こ
  if (arr[16] && arr[16].answerFull === "込み合う駅") {
    arr[16].qRuby = "”こ”み<ruby>合<rt>あ</rt></ruby>う<ruby>駅<rt>えき</rt></ruby>";
    arr[16].answerFull = "混み合う駅";
    arr[16].units = [
      { kind:"blank", expected:"混", reading:"こ" },
      { kind:"fixed", char:"み" },
      { kind:"fixed", char:"合", reading:"あ" },
      { kind:"fixed", char:"う" },
    ];
  }
  // Q19 (index 18): focus on 財 (blank) + 産 (fixed)
  if (arr[18] && arr[18].answerFull === "多くの財産") {
    // If it is the old pattern where blank was 産, swap to blank 財.
    const u = arr[18].units;
    const looksOld = Array.isArray(u) && u.length >= 2 &&
      u.some(x => x && x.kind === "blank" && x.expected === "産") &&
      u.some(x => x && x.kind === "fixed" && x.char === "財");
    if (looksOld) {
      arr[18].qRuby = "<ruby>多<rt>おお</rt></ruby>くの”ざい”<ruby>産<rt>さん</rt></ruby>";
      arr[18].units = [
        { kind:"blank", expected:"財", reading:"ざい" },
        { kind:"fixed", char:"産", reading:"さん" },
      ];
    }
  }
  return arr;

}


function saveItems(){
  localStorage.setItem(LS_KEYS.items, JSON.stringify(items));
  saveDataVersion(APP_DATA_VERSION);
}

function loadItems(){
  const s = localStorage.getItem(LS_KEYS.items);
  if (!s) {
    saveDataVersion(APP_DATA_VERSION);
    localStorage.setItem(LS_KEYS.items, JSON.stringify(defaultItems));
    return defaultItems;
  }
  try {
    const arr = JSON.parse(s);
    const clean = sanitizeItems(arr);
    // 旧バージョンでも編集内容は残したいので、バージョン不一致でも上書きしない。
    localStorage.setItem(LS_KEYS.items, JSON.stringify(clean));
    saveDataVersion(APP_DATA_VERSION);
    return clean;
  } catch {
    localStorage.setItem(LS_KEYS.items, JSON.stringify(defaultItems));
    saveDataVersion(APP_DATA_VERSION);
    return defaultItems;
  }
}


function saveIdx(v){ localStorage.setItem(LS_KEYS.idx, String(v)); }
function loadIdx(){ const s = localStorage.getItem(LS_KEYS.idx); const n = Number(s); return Number.isFinite(n)&&n>=0?n:0; }

function strokesKey(qIndex, blankIndex){
  return `${LS_KEYS.strokesPrefix}${qIndex}_${blankIndex}`;
}



function loadStrokesForCurrent(){
  buildBoxes();
  const blanks = boxes.filter(b=>b.isBlank).length;
  strokesByBlank = Array.from({length:blanks},(_,bi)=>{
    const s = localStorage.getItem(strokesKey(idx,bi));
    if(!s) return [];
    try{ return JSON.parse(s)||[]; }catch{ return []; }
  });
  activeBlank = 0;
}
function saveStrokesForCurrent(){
  buildBoxes();
  const blanks = boxes.filter(b=>b.isBlank).length;
  for(let bi=0; bi<blanks; bi++){
    localStorage.setItem(strokesKey(idx,bi), JSON.stringify(strokesByBlank[bi]||[]));
  }
}
function exportAllPracticeStrokes(){
  const obj = {};
  for(let qi=0; qi<items.length; qi++){
    const blanks = (items[qi]?.units||[]).filter(u=>u.kind==="blank").length;
    for(let bi=0; bi<blanks; bi++){
      const k = strokesKey(qi,bi);
      const v = localStorage.getItem(k);
      if(v) obj[`${qi}_${bi}`] = v;
    }
  }
  return obj;
}
function importAllPracticeStrokes(strokesObj){
  for(const [k,v] of Object.entries(strokesObj)){
    if(typeof v !== "string") continue;
  }
}
}
function downloadJson(obj,filename){
  const blob = new Blob([JSON.stringify(obj,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

function loadBoxScaleOffset(){
  const s = localStorage.getItem(LS_KEYS.boxScaleOffset);
  const n = Number(s);
  // offset range so that actual scale stays within [70..400]
  if (Number.isFinite(n) && n >= -170 && n <= 160) return n;

  // migration from old absolute scale (kanji_box_scale_v3)
  const oldAbs = Number(localStorage.getItem("kanji_box_scale_v3"));
  if (Number.isFinite(oldAbs)) {
    const off = Math.max(-170, Math.min(160, oldAbs - BOX_BASE_SCALE));
    localStorage.setItem(LS_KEYS.boxScaleOffset, String(off));
    return off;
  }
  return 0; // default = 0% (means 240% actual)
}
function saveBoxScaleOffset(){
  localStorage.setItem(LS_KEYS.boxScaleOffset, String(boxScaleOffset));
}
function formatOffset(n){
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}%`;
}
function updateBoxScaleUI(){
  if (boxScaleLabel) boxScaleLabel.textContent = `${formatOffset(boxScaleOffset)}`;
  if (boxScaleSlider) boxScaleSlider.value = String(boxScaleOffset);
}
function changeBoxScale(delta){
  boxScaleOffset = Math.max(-170, Math.min(160, boxScaleOffset + delta));
  saveBoxScaleOffset();
  updateBoxScaleUI();
  redraw();
}


// ---------- editor ----------
function openEditor() {
  editIndex = idx;
  syncEditorFromItems();
  editDialog.showModal();
}

function syncEditorFromItems() {
  const it = items[editIndex] || { qRuby:"", answerFull:"", units:[{kind:"blank", expected:""}] };
  editPos.textContent = `問題 ${editIndex + 1} / ${items.length}`;
  editQRuby.value = it.qRuby || "";
  editAnswer.value = it.answerFull || "";
  renderUnitsEditor(it.units || []);
  editJson.value = JSON.stringify(items, null, 2);
}

function renderUnitsEditor(units) {
  unitsTable.innerHTML = "";
  units.forEach((u, i) => {
    const row = document.createElement("div");
    row.className = "unitRow";
    row.innerHTML = `
      <select class="sel" data-k="kind" data-i="${i}">
        <option value="blank">blank（手書き）</option>
        <option value="fixed">fixed（表示）</option>
      </select>
      <input class="small" data-k="char" data-i="${i}" placeholder="文字（fixed）/ 期待文字（blank）" />
      <input class="small" data-k="reading" data-i="${i}" placeholder="読み（任意） 例：ひょう / くら" />
      <button type="button" class="iconBtn" title="削除" data-del="${i}">🗑</button>
    `;
    unitsTable.appendChild(row);

    const sel = row.querySelector("select");
    sel.value = u.kind === "fixed" ? "fixed" : "blank";

    const char = row.querySelector('input[data-k="char"]');
    char.value = (u.kind === "fixed") ? (u.char || "") : (u.expected || "");

    const reading = row.querySelector('input[data-k="reading"]');
    reading.value = u.reading || "";

    row.querySelector('button[data-del]').onclick = () => {
      const it = items[editIndex];
      it.units.splice(i,1);
      if (it.units.length === 0) it.units.push({kind:"blank", expected:""});
      renderUnitsEditor(it.units);
      editJson.value = JSON.stringify(items, null, 2);
    };

    sel.onchange = () => {
      const it = items[editIndex];
      const uu = it.units[i];
      if (!uu) return;
      if (sel.value === "fixed") {
        const val = (uu.kind === "fixed") ? (uu.char||"") : (uu.expected||"");
        it.units[i] = { kind:"fixed", char: val, reading: uu.reading || "" };
      } else {
        const val = (uu.kind === "fixed") ? (uu.char||"") : (uu.expected||"");
        it.units[i] = { kind:"blank", expected: val, reading: uu.reading || "" };
      }
      renderUnitsEditor(it.units);
      editJson.value = JSON.stringify(items, null, 2);
    };

    char.oninput = () => {
      const it = items[editIndex];
      const uu = it.units[i];
      if (!uu) return;
      if (uu.kind === "fixed") uu.char = char.value;
      else uu.expected = char.value;
      editJson.value = JSON.stringify(items, null, 2);
    };

    reading.oninput = () => {
      const it = items[editIndex];
      const uu = it.units[i];
      if (!uu) return;
      uu.reading = reading.value;
      editJson.value = JSON.stringify(items, null, 2);
    };
  });
}

addUnitBtn.onclick = () => {
  const it = items[editIndex];
  it.units.push({ kind:"blank", expected:"", reading:"" });
  renderUnitsEditor(it.units);
  editJson.value = JSON.stringify(items, null, 2);
};

prevEditBtn.onclick = () => {
  // save current fields into items before moving
  applyEditorToItem(false);
  editIndex = (editIndex - 1 + items.length) % items.length;
  syncEditorFromItems();
};

nextEditBtn.onclick = () => {
  applyEditorToItem(false);
  editIndex = (editIndex + 1) % items.length;
  syncEditorFromItems();
};

function applyEditorToItem(validate=true) {
  const it = items[editIndex];
  it.qRuby = editQRuby.value.trim();
  it.answerFull = editAnswer.value.trim();
  // units are already live-updated
  if (validate) {
    const clean = sanitizeItems(items); // may drop broken ones
    if (!clean || clean.length !== items.length) {
      alert("入力内容に不備があるため保存できません（空の問題/unitsが不正など）。");
      return false;
    }
  }
  return true;
}

saveEditBtn.onclick = () => {
  if (!applyEditorToItem(true)) return;
  items = sanitizeItems(items);
  items = applyKnownFixes(items);
  saveItems();
  // reflect current idx item
  renderAll();
};

exportItemsBtn.onclick = () => {
  const payload = { version: APP_DATA_VERSION, items, exportedAt: new Date().toISOString() };
  downloadJson(payload, `kanji_items_${new Date().toISOString().slice(0,10)}.json`);
};

importItemsInput.onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try{
    const data = JSON.parse(await file.text());
    const arr = Array.isArray(data) ? data : data.items;
    if (!Array.isArray(arr)) throw new Error("items配列が見つかりません");
    items = sanitizeItems(arr);
    if (items.length !== 50) {
      // allow different lengths, but keep app consistent
      // We'll accept anyway; questions count becomes that length.
    }
    saveItems();
    alert("問題データを読み込みました。");
    // refresh editor and main
    idx = Math.min(idx, items.length-1);
    idx = Math.min(idx, items.length-1);
    idx = Math.min(idx, items.length-1);
    saveIdx(idx); saveIdx(idx);
    syncEditorFromItems();
    renderAll();
  }catch(err){
    alert("読み込みに失敗しました: " + err.message);
  }finally{
    importItemsInput.value = "";
  }
};

restoreDefaultBtn.onclick = () => {
  if (!confirm("初期の50問に戻します。編集した内容は上書きされます。よろしいですか？")) return;
  items = JSON.parse(JSON.stringify(defaultItems));
  saveItems();
  idx = 0; idx = 0; idx = 0;
  saveIdx(0); saveIdx(0);
  syncEditorFromItems();
  renderAll();
};

applyJsonBtn.onclick = () => {
  try{
    const arr = JSON.parse(editJson.value);
    if (!Array.isArray(arr)) throw new Error("JSONは配列（items）にしてください");
    const clean = sanitizeItems(arr);
    items = clean;
    saveItems();
    alert("JSONを反映しました。");
    editIndex = Math.min(editIndex, items.length-1);
    syncEditorFromItems();
    renderAll();
  }catch(err){
    alert("JSONの反映に失敗しました: " + err.message);
  }
};

if (editBtn) editBtn.onclick = openEditor;


// ---------- init ----------
function init(){
  document.body.classList.add("compact");
  items = sanitizeItems(items);
  items = applyKnownFixes(items);
  saveItems();

  if (idx >= items.length) { idx = 0; saveIdx(idx); }

  renderAll();
  updateBoxScaleUI();
  resizeCanvas();

  if("serviceWorker" in navigator){ navigator.serviceWorker.register("./sw.js").catch(()=>{}); }
}
init();