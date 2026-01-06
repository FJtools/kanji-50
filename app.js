/* ===========================
   漢字50問 手書き練習 + テストモード
   追加機能：
   1) 「正解を見る」= 押している間だけ正解表示（hold-to-reveal）
   2) テストモード：50問1周、○/×自己採点、結果を履歴に保存
=========================== */

const LS_KEYS = {
  items: "kanji_items_v2_sentence",
  idxPractice: "kanji_current_idx_practice_v2",
  idxTest: "kanji_current_idx_test_v2",
  mode: "kanji_mode_v2",
  strokesPracticePrefix: "kanji_strokes_practice_v2_",
  strokesTestPrefix: "kanji_strokes_test_v2_",
  testRun: "kanji_test_run_v2",           // current run
  testHistory: "kanji_test_history_v2",   // array
};

// --- 50問（文章）初期データ ---
const defaultItems = [
  { q: '一定の”ひょう”価', a: '一定の評価', kanji: '評' },
  { q: '新”がた”の船', a: '新型の船', kanji: '型' },
  { q: '”き”本に返る', a: '基本に返る', kanji: '基' },
  { q: '食料の”てい”供', a: '食料の提供', kanji: '提' },
  { q: '古い建”ちく”物', a: '古い建築物', kanji: '築' },

  { q: '”つま”の名前', a: '妻の名前', kanji: '妻' },
  { q: '温度の”せつ”定', a: '温度の設定', kanji: '設' },
  { q: '”ちょ”金をする', a: '貯金をする', kanji: '貯' },
  { q: '栄養”そ”', a: '栄養素', kanji: '素' },
  { q: '炭”さん”水', a: '炭酸水', kanji: '酸' },

  { q: '”よ”り道', a: '寄り道', kanji: '寄' },
  { q: '”しょう”明書', a: '証明書', kanji: '証' },
  { q: '薬の”こう”果', a: '薬の効果', kanji: '効' },
  { q: '血”えき”の成分', a: '血液の成分', kanji: '液' },
  { q: '説”とく”力', a: '説得力', kanji: '得' },

  { q: '車の通”こう”', a: '車の通行', kanji: '行' },
  { q: '”こん”み合う駅', a: '混み合う駅', kanji: '混' },
  { q: '人口の分”ぶ”', a: '人口の分布', kanji: '布' },
  { q: '多くの財”ざい”', a: '多くの財産', kanji: '産' },
  { q: '主”ちょう”する説', a: '主張する説', kanji: '張' },

  { q: '必要な条”けん”', a: '必要な条件', kanji: '件' },
  { q: '”ざつ”音が多い', a: '雑音が多い', kanji: '雑' },
  { q: '交通事”こ”', a: '交通事故', kanji: '故' },
  { q: '大きな組”しき”', a: '大きな組織', kanji: '織' },
  { q: '”さん”成の立場', a: '賛成の立場', kanji: '賛' },

  { q: '”とう”計資料', a: '統計資料', kanji: '統' },
  { q: '大学の教”じゅ”', a: '大学の教授', kanji: '授' },
  { q: '昔の”き”行文', a: '昔の紀行文', kanji: '紀' },
  { q: '”せき”任をとる', a: '責任をとる', kanji: '責' },
  { q: '数の”げん”少', a: '数の減少', kanji: '減' },

  { q: '荷物の”けん”査', a: '荷物の検査', kanji: '検' },
  { q: '大会の日”てい”', a: '大会の日程', kanji: '程' },
  { q: '虫の”さい”集', a: '虫の採集', kanji: '採' },
  { q: '”こ”人競技', a: '個人競技', kanji: '個' },
  { q: '省”りゃく”する', a: '省略する', kanji: '略' },

  { q: '”きゅう”道を走る', a: '旧道を走る', kanji: '旧' },
  { q: '日本の山”みゃく”', a: '日本の山脈', kanji: '脈' },
  { q: '養”ご”の先生', a: '養護の先生', kanji: '護' },
  { q: '”き”則を守る', a: '規則を守る', kanji: '規' },
  { q: '通行”きん”止', a: '通行禁止', kanji: '禁' },

  { q: '人口が”ふ”える', a: '人口が増える', kanji: '増' },
  { q: '”あま”りを求める', a: '余りを求める', kanji: '余' },
  { q: '健康を”たも”つ', a: '健康を保つ', kanji: '保' },
  { q: '道に”まよ”う', a: '道に迷う', kanji: '迷' },
  { q: '手で”ささ”える', a: '手で支える', kanji: '支' },

  { q: '”ふたた”び現れる', a: '再び現れる', kanji: '再' },
  { q: '左右を”くら”べる', a: '左右を比べる', kanji: '比' },
  { q: '例を”しめ”す', a: '例を示す', kanji: '示' },
  { q: '”ゆた”かな生活', a: '豊かな生活', kanji: '豊' },
  { q: '”ひと”り言を言う', a: '独り言を言う', kanji: '独' }
];

// ----------------- state -----------------
let items = loadItems();
let mode = loadMode(); // "practice" | "test"
let idxPractice = loadIdx("practice");
let idxTest = loadIdx("test");
let idx = (mode === "test") ? idxTest : idxPractice;

let traceMode = false;

// 「正解を見る」＝押している間だけ表示するためのフラグ
let revealAnswer = false;

// テスト実行状態
// results: Array<boolean|null>  true=○ false=× null=未回答
let testRun = loadTestRun() || newTestRun();

// 手書きデータ
let strokes = [];
let currentStroke = null;
let drawing = false;

// ----------------- DOM -----------------
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

const editBtn = document.getElementById("editBtn");
const editDialog = document.getElementById("editDialog");
const editArea = document.getElementById("editArea");
const saveEditBtn = document.getElementById("saveEditBtn");

const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

const resultDialog = document.getElementById("resultDialog");
const resultSummary = document.getElementById("resultSummary");
const resultList = document.getElementById("resultList");

const historyDialog = document.getElementById("historyDialog");
const historyList = document.getElementById("historyList");

// ----------------- Canvas -----------------
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redraw();
}
window.addEventListener("resize", resizeCanvas);

function drawGrid() {
  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);

  const size = Math.min(w, h) * 0.85;
  const x0 = (w - size) / 2;
  const y0 = (h - size) / 2;

  ctx.strokeStyle = "#e7e7e7";
  ctx.lineWidth = 1;

  ctx.strokeRect(x0, y0, size, size);

  ctx.beginPath();
  ctx.moveTo(x0 + size / 2, y0);
  ctx.lineTo(x0 + size / 2, y0 + size);
  ctx.moveTo(x0, y0 + size / 2);
  ctx.lineTo(x0 + size, y0 + size / 2);
  ctx.stroke();

  ctx.strokeStyle = "#f0f0f0";
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + size, y0 + size);
  ctx.moveTo(x0 + size, y0);
  ctx.lineTo(x0, y0 + size);
  ctx.stroke();
}

function drawTraceAnswer() {
  if (!traceMode) return;
  const item = items[idx];
  if (!item?.kanji) return;

  const w = canvas.getBoundingClientRect().width;
  const h = canvas.getBoundingClientRect().height;

  const size = Math.min(w, h) * 0.72;
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${size}px "Hiragino Mincho ProN", "Noto Serif JP", serif`;
  ctx.fillText(item.kanji, w / 2, h / 2);
  ctx.restore();
}

function drawStrokes() {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#111";

  for (const s of strokes) {
    const pts = s.points;
    if (!pts || pts.length < 2) continue;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const pressure = (b.p ?? 0.5);
      const width = 2 + pressure * 6;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function redraw() {
  drawGrid();
  drawTraceAnswer();
  drawStrokes();
}

// ----------------- Drawing events -----------------
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    p: (typeof e.pressure === "number" && e.pressure > 0) ? e.pressure : 0.5,
  };
}

canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture(e.pointerId);
  drawing = true;
  const pt = getPos(e);
  currentStroke = { points: [pt] };
  strokes.push(currentStroke);
  redraw();
});

canvas.addEventListener("pointermove", (e) => {
  if (!drawing || !currentStroke) return;
  const pt = getPos(e);
  currentStroke.points.push(pt);
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
canvas.addEventListener("pointerout", () => {
  if (drawing) endStroke();
});

// ----------------- UI actions -----------------
prevBtn.onclick = () => goTo(idx - 1);
nextBtn.onclick = () => goTo(idx + 1);

randomBtn.onclick = () => {
  if (items.length <= 1) return;
  const r = Math.floor(Math.random() * items.length);
  goTo(r);
};

clearBtn.onclick = () => {
  strokes = [];
  saveStrokesForCurrent();
  redraw();
};

toggleTraceBtn.onclick = () => {
  traceMode = !traceMode;
  redraw();
};

// 正解を見る（押している間だけ表示）
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

// モード切替
practiceModeBtn.onclick = () => switchMode("practice");
testModeBtn.onclick = () => switchMode("test");

// テスト
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

// 問題編集（練習のみ）
editBtn.onclick = () => openEditor();
function openEditor() {
  const lines = items.map(it => `${it.q},${it.a},${it.kanji}`).join("\n");
  editArea.value = lines;
  editDialog.showModal();
}

saveEditBtn.onclick = () => {
  const parsed = parseItems(editArea.value);
  if (parsed.length >= 1) {
    items = parsed;
    saveItems();
    idxPractice = Math.min(idxPractice, items.length - 1);
    saveIdx("practice", idxPractice);

    testRun = newTestRun();
    saveTestRun();

    idx = (mode === "test") ? idxTest : idxPractice;
    revealAnswer = false;

    loadStrokesForCurrent();
    renderAll();
  } else {
    alert("形式「問題,正解,漢字1字」で、少なくとも1問以上入力してください。");
  }
};

// バックアップ（練習のみ）
exportBtn.onclick = () => {
  const payload = {
    version: 2,
    items,
    idxPractice,
    strokesPractice: exportAllStrokes("practice"),
    exportedAt: new Date().toISOString(),
  };
  downloadJson(payload, `kanji_practice_backup_${new Date().toISOString().slice(0,10)}.json`);
};

importInput.onchange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.items || !Array.isArray(data.items)) throw new Error("itemsがありません");
    items = data.items.map(x => ({
      q: String(x.q ?? ""),
      a: String(x.a ?? ""),
      kanji: String(x.kanji ?? "")
    })).filter(x => x.q && x.a && x.kanji);

    if (items.length < 1) throw new Error("itemsが空です");
    saveItems();

    if (data.strokesPractice && typeof data.strokesPractice === "object") {
      importAllStrokes("practice", data.strokesPractice);
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

// ----------------- Render -----------------
function renderQuestion() {
  const item = items[idx] || { q: "", a: "", kanji: "" };
  qidEl.textContent = String(idx + 1);
  qtotalEl.textContent = String(items.length);
  promptEl.textContent = item.q;
  answerEl.textContent = revealAnswer ? item.a : "（非表示）";
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
  const total = items.length;
  testProgress.textContent = `（${answered}/${total} 回答）`;
}

function renderAll() {
  renderQuestion();
  updateModeUI();
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

// ----------------- Test logic -----------------
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

function openResultDialog() {
  const run = testRun;
  const { total, correct, wrong, unanswered } = calcScore(run);

  const started = run.startedAt ? new Date(run.startedAt) : null;
  const finished = run.finishedAt ? new Date(run.finishedAt) : null;

  resultSummary.innerHTML =
    `<div>スコア：<b>${correct}/${total}</b>（○=${correct} / ×=${wrong} / 未回答=${unanswered}）</div>` +
    `<div class="muted">開始：${started ? started.toLocaleString() : "-"}` +
    `　完了：${finished ? finished.toLocaleString() : (unanswered === 0 ? "-" : "（未完了）")}</div>`;

  const lines = [];
  run.results.forEach((v, i) => {
    if (v === true) return;
    const badge = (v === false) ? `<span class="badge ng">×</span>` : `<span class="badge">未</span>`;
    const it = items[i];
    lines.push(
      `<div class="resultItem">${badge}<b>問題${i + 1}</b>：${escapeHtml(it.q)}<br/>` +
      `正解：<b>${escapeHtml(it.a)}</b></div>`
    );
  });

  resultList.innerHTML = lines.length
    ? lines.join("")
    : `<div class="resultItem"><span class="badge ok">○</span>全問正解！</div>`;

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
  const history = loadHistory();
  if (history.length === 0) {
    historyList.innerHTML = `<div class="resultItem">履歴はまだありません。</div>`;
    historyDialog.showModal();
    return;
  }

  historyList.innerHTML = history.map((h, n) => {
    const { total, correct, wrong, unanswered } = calcScore(h);
    const started = h.startedAt ? new Date(h.startedAt).toLocaleString() : "-";
    const finished = h.finishedAt ? new Date(h.finishedAt).toLocaleString() : "-";
    return (
      `<div class="resultItem">` +
      `<span class="badge ok">${correct}/${total}</span>` +
      `#${history.length - n}　開始：${escapeHtml(started)}<br/>` +
      `<span class="muted">完了：${escapeHtml(finished)}　×=${wrong}　未=${unanswered}</span>` +
      `</div>`
    );
  }).join("");

  historyDialog.showModal();
}

// ----------------- Mode switch -----------------
function switchMode(next) {
  mode = next;
  saveMode(mode);

  idx = (mode === "test") ? idxTest : idxPractice;

  revealAnswer = false;
  loadStrokesForCurrent();
  renderAll();
}

// ----------------- Storage -----------------
function saveItems() {
  localStorage.setItem(LS_KEYS.items, JSON.stringify(items));
}
function loadItems() {
  const s = localStorage.getItem(LS_KEYS.items);
  if (!s) return defaultItems;
  try {
    const arr = JSON.parse(s);
    if (!Array.isArray(arr) || arr.length < 1) return defaultItems;
    return arr.map(x => ({
      q: String(x.q ?? ""),
      a: String(x.a ?? ""),
      kanji: String(x.kanji ?? "")
    })).filter(x => x.q && x.a && x.kanji);
  } catch {
    return defaultItems;
  }
}

function saveMode(m) {
  localStorage.setItem(LS_KEYS.mode, m);
}
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

function strokesKeyFor(i) {
  const prefix = (mode === "test") ? LS_KEYS.strokesTestPrefix : LS_KEYS.strokesPracticePrefix;
  return prefix + String(i);
}
function saveStrokesForCurrent() {
  localStorage.setItem(strokesKeyFor(idx), JSON.stringify(strokes));
}
function loadStrokesForCurrent() {
  const s = localStorage.getItem(strokesKeyFor(idx));
  if (!s) { strokes = []; return; }
  try {
    const arr = JSON.parse(s);
    strokes = Array.isArray(arr) ? arr : [];
  } catch {
    strokes = [];
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

// ----------------- Editor parse -----------------
function parseItems(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const out = [];
  for (const line of lines) {
    const parts = line.split(/[,，\t]/).map(x => x.trim()).filter(Boolean);
    if (parts.length >= 3) {
      out.push({ q: parts[0], a: parts[1], kanji: parts[2].slice(0, 2) });
    }
  }
  return out;
}

// ----------------- Backup strokes (practice) -----------------
function exportAllStrokes(which) {
  const obj = {};
  const prefix = (which === "test") ? LS_KEYS.strokesTestPrefix : LS_KEYS.strokesPracticePrefix;
  for (let i = 0; i < items.length; i++) {
    const s = localStorage.getItem(prefix + String(i));
    if (s) obj[String(i)] = s;
  }
  return obj;
}
function importAllStrokes(which, strokesById) {
  const prefix = (which === "test") ? LS_KEYS.strokesTestPrefix : LS_KEYS.strokesPracticePrefix;
  for (const [k, v] of Object.entries(strokesById)) {
    const i = Number(k);
    if (!Number.isFinite(i) || i < 0) continue;
    if (typeof v !== "string") continue;
    localStorage.setItem(prefix + String(i), v);
  }
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

// ----------------- Utils -----------------
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}

// ----------------- Init -----------------
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

  loadStrokesForCurrent();
  renderAll();
  resizeCanvas();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}
init();
