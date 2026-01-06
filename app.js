/* ===========================
   漢字50問 手書き練習 v3
=========================== */

const LS_KEYS = {
  items: "kanji_items_v3_ruby_units",
  mode: "kanji_mode_v3",
  idxPractice: "kanji_idx_practice_v3",
  idxTest: "kanji_idx_test_v3",
  strokesPrefixPractice: "kanji_strokes_practice_v3_",
  strokesPrefixTest: "kanji_strokes_test_v3_",
  testRun: "kanji_test_run_v3",
  testHistory: "kanji_test_history_v3",
};

const defaultItems = [{"qRuby": "一定の”ひょう”<ruby>価<rt>か</rt></ruby>", "answerFull": "一定の評価", "units": [{"kind": "blank", "expected": "評"}, {"kind": "fixed", "char": "価"}]}, {"qRuby": "<ruby>新<rt>しん</rt></ruby>”がた”の<ruby>船<rt>ふね</rt></ruby>", "answerFull": "新型の船", "units": [{"kind": "fixed", "char": "新"}, {"kind": "blank", "expected": "型"}]}, {"qRuby": "”き”<ruby>本<rt>ほん</rt></ruby>に<ruby>返<rt>かえ</rt></ruby>る", "answerFull": "基本に返る", "units": [{"kind": "blank", "expected": "基"}, {"kind": "fixed", "char": "本"}]}, {"qRuby": "<ruby>食<rt>しょく</rt></ruby><ruby>料<rt>りょう</rt></ruby>の”てい”<ruby>供<rt>きょう</rt></ruby>", "answerFull": "食料の提供", "units": [{"kind": "blank", "expected": "提"}, {"kind": "fixed", "char": "供"}]}, {"qRuby": "<ruby>古<rt>ふる</rt></ruby>い<ruby>建<rt>けん</rt></ruby>”ちく”<ruby>物<rt>ぶつ</rt></ruby>", "answerFull": "古い建築物", "units": [{"kind": "fixed", "char": "建"}, {"kind": "blank", "expected": "築"}, {"kind": "fixed", "char": "物"}]}, {"qRuby": "”つま”の<ruby>名<rt>な</rt></ruby><ruby>前<rt>まえ</rt></ruby>", "answerFull": "妻の名前", "units": [{"kind": "blank", "expected": "妻"}]}, {"qRuby": "<ruby>温<rt>おん</rt></ruby><ruby>度<rt>ど</rt></ruby>の”せつ”<ruby>定<rt>てい</rt></ruby>", "answerFull": "温度の設定", "units": [{"kind": "blank", "expected": "設"}, {"kind": "fixed", "char": "定"}]}, {"qRuby": "”ちょ”<ruby>金<rt>きん</rt></ruby>をする", "answerFull": "貯金をする", "units": [{"kind": "blank", "expected": "貯"}, {"kind": "fixed", "char": "金"}]}, {"qRuby": "<ruby>栄<rt>えい</rt></ruby><ruby>養<rt>よう</rt></ruby>”そ”", "answerFull": "栄養素", "units": [{"kind": "fixed", "char": "栄"}, {"kind": "fixed", "char": "養"}, {"kind": "blank", "expected": "素"}]}, {"qRuby": "<ruby>炭<rt>たん</rt></ruby>”さん”<ruby>水<rt>すい</rt></ruby>", "answerFull": "炭酸水", "units": [{"kind": "fixed", "char": "炭"}, {"kind": "blank", "expected": "酸"}, {"kind": "fixed", "char": "水"}]}, {"qRuby": "”よ”り<ruby>道<rt>みち</rt></ruby>", "answerFull": "寄り道", "units": [{"kind": "blank", "expected": "寄"}, {"kind": "fixed", "char": "り"}, {"kind": "fixed", "char": "道"}]}, {"qRuby": "”しょう”<ruby>明<rt>めい</rt></ruby><ruby>書<rt>しょ</rt></ruby>", "answerFull": "証明書", "units": [{"kind": "blank", "expected": "証"}, {"kind": "fixed", "char": "明"}, {"kind": "fixed", "char": "書"}]}, {"qRuby": "<ruby>薬<rt>くすり</rt></ruby>の”こう”<ruby>果<rt>か</rt></ruby>", "answerFull": "薬の効果", "units": [{"kind": "blank", "expected": "効"}, {"kind": "fixed", "char": "果"}]}, {"qRuby": "<ruby>血<rt>けつ</rt></ruby>”えき”の<ruby>成<rt>せい</rt></ruby><ruby>分<rt>ぶん</rt></ruby>", "answerFull": "血液の成分", "units": [{"kind": "fixed", "char": "血"}, {"kind": "blank", "expected": "液"}]}, {"qRuby": "<ruby>説<rt>せつ</rt></ruby>”とく”<ruby>力<rt>りょく</rt></ruby>", "answerFull": "説得力", "units": [{"kind": "fixed", "char": "説"}, {"kind": "blank", "expected": "得"}, {"kind": "fixed", "char": "力"}]}, {"qRuby": "<ruby>車<rt>くるま</rt></ruby>の<ruby>通<rt>つう</rt></ruby>”こう”", "answerFull": "車の通行", "units": [{"kind": "fixed", "char": "通"}, {"kind": "blank", "expected": "行"}]}, {"qRuby": "”こん”み<ruby>合<rt>あ</rt></ruby>う<ruby>駅<rt>えき</rt></ruby>", "answerFull": "混み合う駅", "units": [{"kind": "blank", "expected": "混"}, {"kind": "fixed", "char": "み"}, {"kind": "fixed", "char": "合"}, {"kind": "fixed", "char": "う"}]}, {"qRuby": "<ruby>人<rt>じん</rt></ruby><ruby>口<rt>こう</rt></ruby>の<ruby>分<rt>ぶん</rt></ruby>”ぶ”", "answerFull": "人口の分布", "units": [{"kind": "fixed", "char": "分"}, {"kind": "blank", "expected": "布"}]}, {"qRuby": "<ruby>多<rt>おお</rt></ruby>くの<ruby>財<rt>ざい</rt></ruby>”ざい”", "answerFull": "多くの財産", "units": [{"kind": "fixed", "char": "財"}, {"kind": "blank", "expected": "産"}]}, {"qRuby": "<ruby>主<rt>しゅ</rt></ruby>”ちょう”する<ruby>説<rt>せつ</rt></ruby>", "answerFull": "主張する説", "units": [{"kind": "fixed", "char": "主"}, {"kind": "blank", "expected": "張"}]}, {"qRuby": "<ruby>必<rt>ひつ</rt></ruby><ruby>要<rt>よう</rt></ruby>な<ruby>条<rt>じょう</rt></ruby>”けん”", "answerFull": "必要な条件", "units": [{"kind": "fixed", "char": "条"}, {"kind": "blank", "expected": "件"}]}, {"qRuby": "”ざつ”<ruby>音<rt>おん</rt></ruby>が<ruby>多<rt>おお</rt></ruby>い", "answerFull": "雑音が多い", "units": [{"kind": "blank", "expected": "雑"}, {"kind": "fixed", "char": "音"}]}, {"qRuby": "<ruby>交<rt>こう</rt></ruby><ruby>通<rt>つう</rt></ruby><ruby>事<rt>じ</rt></ruby>”こ”", "answerFull": "交通事故", "units": [{"kind": "fixed", "char": "事"}, {"kind": "blank", "expected": "故"}]}, {"qRuby": "<ruby>大<rt>おお</rt></ruby>きな<ruby>組<rt>そ</rt></ruby>”しき”", "answerFull": "大きな組織", "units": [{"kind": "fixed", "char": "組"}, {"kind": "blank", "expected": "織"}]}, {"qRuby": "”さん”<ruby>成<rt>せい</rt></ruby>の<ruby>立<rt>たち</rt></ruby><ruby>場<rt>ば</rt></ruby>", "answerFull": "賛成の立場", "units": [{"kind": "blank", "expected": "賛"}, {"kind": "fixed", "char": "成"}]}, {"qRuby": "”とう”<ruby>計<rt>けい</rt></ruby><ruby>資<rt>し</rt></ruby><ruby>料<rt>りょう</rt></ruby>", "answerFull": "統計資料", "units": [{"kind": "blank", "expected": "統"}, {"kind": "fixed", "char": "計"}]}, {"qRuby": "<ruby>大<rt>だい</rt></ruby><ruby>学<rt>がく</rt></ruby>の<ruby>教<rt>きょう</rt></ruby>”じゅ”", "answerFull": "大学の教授", "units": [{"kind": "fixed", "char": "教"}, {"kind": "blank", "expected": "授"}]}, {"qRuby": "<ruby>昔<rt>むかし</rt></ruby>の”き”<ruby>行<rt>こう</rt></ruby><ruby>文<rt>ぶん</rt></ruby>", "answerFull": "昔の紀行文", "units": [{"kind": "blank", "expected": "紀"}, {"kind": "fixed", "char": "行"}]}, {"qRuby": "”せき”<ruby>任<rt>にん</rt></ruby>をとる", "answerFull": "責任をとる", "units": [{"kind": "blank", "expected": "責"}, {"kind": "fixed", "char": "任"}]}, {"qRuby": "<ruby>数<rt>かず</rt></ruby>の”げん”<ruby>少<rt>しょう</rt></ruby>", "answerFull": "数の減少", "units": [{"kind": "blank", "expected": "減"}, {"kind": "fixed", "char": "少"}]}, {"qRuby": "<ruby>荷<rt>に</rt></ruby><ruby>物<rt>もつ</rt></ruby>の”けん”<ruby>査<rt>さ</rt></ruby>", "answerFull": "荷物の検査", "units": [{"kind": "blank", "expected": "検"}, {"kind": "fixed", "char": "査"}]}, {"qRuby": "<ruby>大<rt>たい</rt></ruby><ruby>会<rt>かい</rt></ruby>の<ruby>日<rt>にっ</rt></ruby>”てい”", "answerFull": "大会の日程", "units": [{"kind": "fixed", "char": "日"}, {"kind": "blank", "expected": "程"}]}, {"qRuby": "<ruby>虫<rt>むし</rt></ruby>の”さい”<ruby>集<rt>しゅう</rt></ruby>", "answerFull": "虫の採集", "units": [{"kind": "blank", "expected": "採"}, {"kind": "fixed", "char": "集"}]}, {"qRuby": "”こ”<ruby>人<rt>じん</rt></ruby><ruby>競<rt>きょう</rt></ruby><ruby>技<rt>ぎ</rt></ruby>", "answerFull": "個人競技", "units": [{"kind": "blank", "expected": "個"}, {"kind": "fixed", "char": "人"}]}, {"qRuby": "<ruby>省<rt>しょう</rt></ruby>”りゃく”する", "answerFull": "省略する", "units": [{"kind": "fixed", "char": "省"}, {"kind": "blank", "expected": "略"}]}, {"qRuby": "”きゅう”<ruby>道<rt>どう</rt></ruby>を<ruby>走<rt>はし</rt></ruby>る", "answerFull": "旧道を走る", "units": [{"kind": "blank", "expected": "旧"}, {"kind": "fixed", "char": "道"}]}, {"qRuby": "<ruby>日<rt>に</rt></ruby><ruby>本<rt>ほん</rt></ruby>の<ruby>山<rt>さん</rt></ruby>”みゃく”", "answerFull": "日本の山脈", "units": [{"kind": "fixed", "char": "山"}, {"kind": "blank", "expected": "脈"}]}, {"qRuby": "<ruby>養<rt>よう</rt></ruby>”ご”の<ruby>先<rt>せん</rt></ruby><ruby>生<rt>せい</rt></ruby>", "answerFull": "養護の先生", "units": [{"kind": "fixed", "char": "養"}, {"kind": "blank", "expected": "護"}]}, {"qRuby": "”き”<ruby>則<rt>そく</rt></ruby>を<ruby>守<rt>まも</rt></ruby>る", "answerFull": "規則を守る", "units": [{"kind": "blank", "expected": "規"}, {"kind": "fixed", "char": "則"}]}, {"qRuby": "<ruby>通<rt>つう</rt></ruby><ruby>行<rt>こう</rt></ruby>”きん”<ruby>止<rt>し</rt></ruby>", "answerFull": "通行禁止", "units": [{"kind": "blank", "expected": "禁"}, {"kind": "fixed", "char": "止"}]}, {"qRuby": "<ruby>人<rt>じん</rt></ruby><ruby>口<rt>こう</rt></ruby>が”ふえる”", "answerFull": "人口が増える", "units": [{"kind": "blank", "expected": "増"}, {"kind": "fixed", "char": "え"}, {"kind": "fixed", "char": "る"}]}, {"qRuby": "”あまり”を<ruby>求<rt>もと</rt></ruby>める", "answerFull": "余りを求める", "units": [{"kind": "blank", "expected": "余"}, {"kind": "fixed", "char": "り"}]}, {"qRuby": "<ruby>健<rt>けん</rt></ruby><ruby>康<rt>こう</rt></ruby>を”たもつ”", "answerFull": "健康を保つ", "units": [{"kind": "blank", "expected": "保"}, {"kind": "fixed", "char": "つ"}]}, {"qRuby": "<ruby>道<rt>みち</rt></ruby>に”まよう”", "answerFull": "道に迷う", "units": [{"kind": "blank", "expected": "迷"}, {"kind": "fixed", "char": "う"}]}, {"qRuby": "<ruby>手<rt>て</rt></ruby>で”ささえる”", "answerFull": "手で支える", "units": [{"kind": "blank", "expected": "支"}, {"kind": "fixed", "char": "え"}, {"kind": "fixed", "char": "る"}]}, {"qRuby": "”ふたたび”<ruby>現<rt>あらわ</rt></ruby>れる", "answerFull": "再び現れる", "units": [{"kind": "blank", "expected": "再"}, {"kind": "fixed", "char": "び"}]}, {"qRuby": "<ruby>左<rt>さ</rt></ruby><ruby>右<rt>ゆう</rt></ruby>を”くらべる”", "answerFull": "左右を比べる", "units": [{"kind": "blank", "expected": "比"}, {"kind": "fixed", "char": "べ"}, {"kind": "fixed", "char": "る"}]}, {"qRuby": "<ruby>例<rt>れい</rt></ruby>を”しめす”", "answerFull": "例を示す", "units": [{"kind": "blank", "expected": "示"}, {"kind": "fixed", "char": "す"}]}, {"qRuby": "”ゆたかな”<ruby>生<rt>せい</rt></ruby><ruby>活<rt>かつ</rt></ruby>", "answerFull": "豊かな生活", "units": [{"kind": "blank", "expected": "豊"}, {"kind": "fixed", "char": "か"}, {"kind": "fixed", "char": "な"}]}, {"qRuby": "”ひとり”<ruby>言<rt>ごと</rt></ruby>を<ruby>言<rt>い</rt></ruby>う", "answerFull": "独り言を言う", "units": [{"kind": "blank", "expected": "独"}, {"kind": "fixed", "char": "り"}, {"kind": "fixed", "char": "言"}]}];

let items = loadItems();
let mode = loadMode(); // "practice" | "test"
let idxPractice = loadIdx("practice");
let idxTest = loadIdx("test");
let idx = (mode === "test") ? idxTest : idxPractice;

let traceMode = false;
let revealAnswer = false;

let testRun = loadTestRun() || newTestRun();

let strokesByBlank = [];
let activeBlank = 0;

const canvas = document.getElementById("pad");
const ctx = canvas.getContext("2d");

const qidEl = document.getElementById("qid");
const qtotalEl = document.getElementById("qtotal");
const promptEl = document.getElementById("promptText");
const answerEl = document.getElementById("answerText");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");
const toggleTraceBtn = document.getElementById("toggleTraceBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");

const practiceModeBtn = document.getElementById("practiceModeBtn");
const testModeBtn = document.getElementById("testModeBtn");
const modeLabel = document.getElementById("modeLabel");
const testProgress = document.getElementById("testProgress");

const startTestBtn = document.getElementById("startTestBtn");
const markCorrectBtn = document.getElementById("markCorrectBtn");
const markWrongBtn = document.getElementById("markWrongBtn");
const showResultBtn = document.getElementById("showResultBtn");
const historyBtn = document.getElementById("historyBtn");

const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

let resultDialog, historyDialog;

let boxes = []; // display units boxes

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redraw();
}
window.addEventListener("resize", resizeCanvas);

function buildBoxes() {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;

  const item = items[idx];
  const units = item.units;

  const maxBoxW = Math.min(140, w / Math.max(3, units.length + 1));
  const box = Math.max(70, Math.min(130, maxBoxW));
  const gap = Math.max(10, Math.min(18, box * 0.12));

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

function drawBoxes() {
  buildBoxes();
  const item = items[idx];

  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#e2e2e2";

  for (const b of boxes) {
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  }

  const activeBox = boxes.find(b => b.isBlank && b.blankIndex === activeBlank);
  if (activeBox) {
    ctx.strokeStyle = "#c8dcff";
    ctx.lineWidth = 2;
    ctx.strokeRect(activeBox.x - 1, activeBox.y - 1, activeBox.w + 2, activeBox.h + 2);
  }

  ctx.fillStyle = "#111";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${Math.floor((boxes[0]?.w || 110) * 0.62)}px "Hiragino Mincho ProN","Noto Serif JP",serif`;

  for (const b of boxes) {
    const u = item.units[b.unitIndex];
    if (u.kind === "fixed") {
      ctx.fillText(u.char, b.x + b.w / 2, b.y + b.h / 2);
    }
  }

  if (traceMode) {
    ctx.globalAlpha = 0.16;
    for (const b of boxes) {
      if (!b.isBlank) continue;
      const u = item.units[b.unitIndex];
      ctx.fillText(u.expected, b.x + b.w / 2, b.y + b.h / 2);
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
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    p: (typeof e.pressure === "number" && e.pressure > 0) ? e.pressure : 0.5,
  };
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

prevBtn.onclick = () => goTo(idx - 1);
nextBtn.onclick = () => goTo(idx + 1);

randomBtn.onclick = () => {
  if (items.length <= 1) return;
  goTo(Math.floor(Math.random() * items.length));
};

clearBtn.onclick = () => {
  ensureStrokesShape();
  strokesByBlank = strokesByBlank.map(() => []);
  saveStrokesForCurrent();
  redraw();
};

toggleTraceBtn.onclick = () => {
  traceMode = !traceMode;
  redraw();
};

function setRevealAnswer(v) {
  revealAnswer = v;
  renderQuestion();
}
["pointerdown","mousedown","touchstart"].forEach(ev => {
  showAnswerBtn.addEventListener(ev, (e) => {
    e.preventDefault();
    setRevealAnswer(true);
  }, { passive: false });
});
["pointerup","pointercancel","pointerleave","mouseup","touchend","touchcancel"].forEach(ev => {
  showAnswerBtn.addEventListener(ev, (e) => {
    e.preventDefault();
    setRevealAnswer(false);
  }, { passive: false });
});

practiceModeBtn.onclick = () => switchMode("practice");
testModeBtn.onclick = () => switchMode("test");

startTestBtn.onclick = () => {
  if (!confirm("テストを開始/リセットします。前回の途中結果は上書きされます。")) return;
  testRun = newTestRun();
  saveTestRun();
  idxTest = 0;
  saveIdx("test", idxTest);
  goTo(0);
  updateTestUI();
};
markCorrectBtn.onclick = () => markResult(true);
markWrongBtn.onclick = () => markResult(false);
showResultBtn.onclick = () => openResultDialog();
historyBtn.onclick = () => openHistoryDialog();

exportBtn.onclick = () => {
  const payload = {
    version: 3,
    items,
    idxPractice,
    strokesPractice: exportAllPracticeStrokes(),
    exportedAt: new Date().toISOString(),
  };
  downloadJson(payload, `kanji_v3_backup_${new Date().toISOString().slice(0,10)}.json`);
};

importInput.onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!data.items || !Array.isArray(data.items)) throw new Error("itemsがありません");
    items = data.items;
    saveItems();

    if (data.strokesPractice && typeof data.strokesPractice === "object") {
      importAllPracticeStrokes(data.strokesPractice);
    }

    idxPractice = Math.min(Number(data.idxPractice ?? 0) || 0, items.length - 1);
    saveIdx("practice", idxPractice);

    testRun = newTestRun();
    saveTestRun();

    switchMode("practice");
    alert("バックアップを読み込みました。");
  } catch (err) {
    alert("読み込みに失敗しました: " + err.message);
  } finally {
    importInput.value = "";
  }
};

function renderQuestion() {
  const item = items[idx] || { qRuby: "", answerFull: "", units: [] };
  qidEl.textContent = String(idx + 1);
  qtotalEl.textContent = String(items.length);
  promptEl.innerHTML = item.qRuby;
  answerEl.textContent = revealAnswer ? item.answerFull : "（非表示）";
}

function updateModeUI() {
  practiceModeBtn.classList.toggle("active", mode === "practice");
  testModeBtn.classList.toggle("active", mode === "test");
  modeLabel.textContent = (mode === "practice") ? "練習モード" : "テストモード";
  document.querySelectorAll("[data-practice-only]").forEach(el => {
    el.classList.toggle("hidden", mode !== "practice");
  });
  document.querySelectorAll("[data-test-only]").forEach(el => {
    el.classList.toggle("hidden", mode !== "test");
  });
  updateTestUI();
}

function updateTestUI() {
  if (mode !== "test") {
    testProgress.textContent = "";
    return;
  }
  const answered = testRun.results.filter(v => v !== null).length;
  testProgress.textContent = `（${answered}/${items.length} 回答）`;
}

function renderAll() {
  revealAnswer = false;
  renderQuestion();
  updateModeUI();
  loadStrokesForCurrent();
  redraw();
}

function goTo(newIdx) {
  if (newIdx < 0) newIdx = items.length - 1;
  if (newIdx >= items.length) newIdx = 0;
  idx = newIdx;

  if (mode === "practice") {
    idxPractice = idx;
    saveIdx("practice", idxPractice);
  } else {
    idxTest = idx;
    saveIdx("test", idxTest);
  }

  revealAnswer = false;
  loadStrokesForCurrent();
  renderAll();
}

function switchMode(next) {
  mode = next;
  saveMode(mode);
  idx = (mode === "test") ? idxTest : idxPractice;
  revealAnswer = false;
  loadStrokesForCurrent();
  renderAll();
}

function newTestRun() {
  return {
    id: String(Date.now()),
    startedAt: new Date().toISOString(),
    finishedAt: null,
    results: Array(items.length).fill(null),
  };
}

function markResult(isCorrect) {
  if (mode !== "test") return;

  testRun.results[idx] = isCorrect;
  saveTestRun();
  updateTestUI();

  const nextUnanswered = testRun.results.findIndex((v, i) => v === null && i > idx);
  const wrapUnanswered = testRun.results.findIndex(v => v === null);

  if (nextUnanswered !== -1) {
    goTo(nextUnanswered);
  } else if (wrapUnanswered !== -1) {
    goTo(wrapUnanswered);
  } else {
    if (!testRun.finishedAt) {
      testRun.finishedAt = new Date().toISOString();
      saveTestRun();
      pushHistory(testRun);
    }
    openResultDialog();
  }
}

function calcScore(run) {
  const total = run.results.length;
  const correct = run.results.filter(v => v === true).length;
  const wrong = run.results.filter(v => v === false).length;
  const unanswered = run.results.filter(v => v === null).length;
  return { total, correct, wrong, unanswered };
}

function ensureDialogs() {
  if (resultDialog) return;

  resultDialog = document.createElement("dialog");
  resultDialog.innerHTML = `
    <form method="dialog" style="width:min(760px,92vw);">
      <h3>テスト結果</h3>
      <div id="resSum" style="font-size:14px;margin:6px 0 10px;"></div>
      <div id="resList" style="border:1px solid #e5e5e5;border-radius:10px;background:#fff;padding:10px;max-height:45vh;overflow:auto;font-size:13px;line-height:1.6;"></div>
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px;">
        <button class="btn primary" value="ok">閉じる</button>
      </div>
    </form>`;
  document.body.appendChild(resultDialog);

  historyDialog = document.createElement("dialog");
  historyDialog.innerHTML = `
    <form method="dialog" style="width:min(760px,92vw);">
      <h3>履歴（直近10回）</h3>
      <div id="hisList" style="border:1px solid #e5e5e5;border-radius:10px;background:#fff;padding:10px;max-height:45vh;overflow:auto;font-size:13px;line-height:1.6;"></div>
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px;">
        <button class="btn primary" value="ok">閉じる</button>
      </div>
    </form>`;
  document.body.appendChild(historyDialog);
}

function openResultDialog() {
  ensureDialogs();
  const run = testRun;
  const { total, correct, wrong, unanswered } = calcScore(run);

  const started = run.startedAt ? new Date(run.startedAt) : null;
  const finished = run.finishedAt ? new Date(run.finishedAt) : null;

  resultDialog.querySelector("#resSum").innerHTML =
    `<div>スコア：<b>${correct}/${total}</b>（○=${correct} / ×=${wrong} / 未回答=${unanswered}）</div>` +
    `<div style="color:#666;font-size:12px;">開始：${started ? started.toLocaleString() : "-"}` +
    `　完了：${finished ? finished.toLocaleString() : (unanswered === 0 ? "-" : "（未完了）")}</div>`;

  const lines = [];
  run.results.forEach((v, i) => {
    if (v === true) return;
    const badge = (v === false) ? "×" : "未";
    const it = items[i];
    lines.push(
      `<div style="padding:6px 0;border-bottom:1px dashed #eee;">` +
      `<b>[${badge}] 問題${i + 1}</b>：${it.qRuby}<br/>` +
      `正解：<b>${escapeHtml(it.answerFull)}</b>` +
      `</div>`
    );
  });

  resultDialog.querySelector("#resList").innerHTML =
    lines.length ? lines.join("") : `<div style="padding:6px 0;">全問正解！</div>`;

  resultDialog.showModal();
}

function pushHistory(run) {
  const history = loadHistory();
  const compact = {
    id: run.id,
    startedAt: run.startedAt,
    finishedAt: run.finishedAt,
    results: run.results,
  };
  history.unshift(compact);
  while (history.length > 10) history.pop();
  localStorage.setItem(LS_KEYS.testHistory, JSON.stringify(history));
}

function openHistoryDialog() {
  ensureDialogs();
  const history = loadHistory();
  const el = historyDialog.querySelector("#hisList");
  if (history.length === 0) {
    el.innerHTML = `<div>履歴はまだありません。</div>`;
    historyDialog.showModal();
    return;
  }
  el.innerHTML = history.map(h => {
    const { total, correct, wrong, unanswered } = calcScore(h);
    const started = h.startedAt ? new Date(h.startedAt).toLocaleString() : "-";
    const finished = h.finishedAt ? new Date(h.finishedAt).toLocaleString() : "-";
    return `<div style="padding:6px 0;border-bottom:1px dashed #eee;">
      <b>${correct}/${total}</b>　（×=${wrong} / 未=${unanswered}）<br/>
      <span style="color:#666;font-size:12px;">開始：${escapeHtml(started)}　完了：${escapeHtml(finished)}</span>
    </div>`;
  }).join("");
  historyDialog.showModal();
}

function saveItems() {
  localStorage.setItem(LS_KEYS.items, JSON.stringify(items));
}
function loadItems() {
  const s = localStorage.getItem(LS_KEYS.items);
  if (!s) return defaultItems;
  try {
    const arr = JSON.parse(s);
    if (!Array.isArray(arr) || arr.length < 1) return defaultItems;
    return arr;
  } catch {
    return defaultItems;
  }
}

function saveMode(m) { localStorage.setItem(LS_KEYS.mode, m); }
function loadMode() {
  const m = localStorage.getItem(LS_KEYS.mode);
  return (m === "test" || m === "practice") ? m : "practice";
}
function saveIdx(which, value) {
  localStorage.setItem(which === "test" ? LS_KEYS.idxTest : LS_KEYS.idxPractice, String(value));
}
function loadIdx(which) {
  const key = which === "test" ? LS_KEYS.idxTest : LS_KEYS.idxPractice;
  const s = localStorage.getItem(key);
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function strokesKey(whichMode, qIndex, blankIndex) {
  const prefix = (whichMode === "test") ? LS_KEYS.strokesPrefixTest : LS_KEYS.strokesPrefixPractice;
  return `${prefix}${qIndex}_${blankIndex}`;
}

function loadStrokesForCurrent() {
  buildBoxes();
  const blanks = boxes.filter(b => b.isBlank).length;
  strokesByBlank = Array.from({ length: blanks }, (_, bi) => {
    const s = localStorage.getItem(strokesKey(mode, idx, bi));
    if (!s) return [];
    try { return JSON.parse(s) || []; } catch { return []; }
  });
  activeBlank = 0;
}

function saveStrokesForCurrent() {
  buildBoxes();
  const blanks = boxes.filter(b => b.isBlank).length;
  for (let bi = 0; bi < blanks; bi++) {
    localStorage.setItem(strokesKey(mode, idx, bi), JSON.stringify(strokesByBlank[bi] || []));
  }
}

function exportAllPracticeStrokes() {
  const obj = {};
  for (let qi = 0; qi < items.length; qi++) {
    const blanks = items[qi].units.filter(u => u.kind === "blank").length;
    for (let bi = 0; bi < blanks; bi++) {
      const k = strokesKey("practice", qi, bi);
      const v = localStorage.getItem(k);
      if (v) obj[`${qi}_${bi}`] = v;
    }
  }
  return obj;
}
function importAllPracticeStrokes(strokesObj) {
  for (const [k, v] of Object.entries(strokesObj)) {
    if (typeof v !== "string") continue;
    localStorage.setItem(LS_KEYS.strokesPrefixPractice + k, v);
  }
}

function loadTestRun() {
  const s = localStorage.getItem(LS_KEYS.testRun);
  if (!s) return null;
  try {
    const r = JSON.parse(s);
    if (!r || !Array.isArray(r.results) || r.results.length !== items.length) return null;
    return {
      id: String(r.id ?? Date.now()),
      startedAt: String(r.startedAt ?? new Date().toISOString()),
      finishedAt: r.finishedAt ? String(r.finishedAt) : null,
      results: r.results.map(v => (v === true ? true : v === false ? false : null)),
    };
  } catch {
    return null;
  }
}
function saveTestRun() {
  localStorage.setItem(LS_KEYS.testRun, JSON.stringify(testRun));
}
function loadHistory() {
  const s = localStorage.getItem(LS_KEYS.testHistory);
  if (!s) return [];
  try {
    const arr = JSON.parse(s);
    if (!Array.isArray(arr)) return [];
    return arr.map(h => ({
      id: String(h.id ?? ""),
      startedAt: String(h.startedAt ?? ""),
      finishedAt: h.finishedAt ? String(h.finishedAt) : null,
      results: Array.isArray(h.results)
        ? h.results.map(v => (v === true ? true : v === false ? false : null))
        : Array(items.length).fill(null),
    })).filter(h => h.results.length === items.length);
  } catch {
    return [];
  }
}

function saveTestHistory(arr) {
  localStorage.setItem(LS_KEYS.testHistory, JSON.stringify(arr));
}

function downloadJson(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clamp01(x) { return Math.max(0, Math.min(1, x)); }

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}

function init() {
  if (idxPractice >= items.length) idxPractice = 0;
  if (idxTest >= items.length) idxTest = 0;
  saveIdx("practice", idxPractice);
  saveIdx("test", idxTest);

  if (!testRun || testRun.results.length !== items.length) {
    testRun = newTestRun();
    saveTestRun();
  }

  idx = (mode === "test") ? idxTest : idxPractice;

  renderAll();
  resizeCanvas();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}
init();
