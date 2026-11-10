/* js/demo-data.js - TEMPORARY test helper: a small "TEST ONLY" box with buttons that fill the History with fake plays (random ones, or a
   scenario for each tip), add one play, age the newest play, and show the tips and numbers as text. DELETE BEFORE PUBLISHING.
   Provides: DEMO_PLAY_COUNT, DEMO_DAYS, DEMO_BACKUP_KEY, DEMO_HOUR, DEMO_DAY, DEMO_SCENARIOS, DEMO_BUTTON_STYLE, DEMO_FIELD_STYLE, demoPick,
             demoRepeat, demoTypeAt, demoWrongAnswer, makeDemoPlay, rebuildDemoStats, addDemoPlays, backupRealData, restoreRealData, demoRecord,
             buildScenario, addManualPlay, setNewestPlayDaysAgo, describeTips, removeDemoData, initDemoData
   Needs: CONFIG, QUESTION_BANK, state, findById, getQuestions, prepareQuiz, getTopics, buildPlayRecord, buildQuitRecord, newPlayId,
          HISTORY_KEY, STATS_KEY, loadHistory, saveHistory, loadStats, saveStats, statsFromPlays, recordStats, overallResult,
          countPlaysToReview, tipsFor, currentTips, tipKey, tipText, openHistory */
'use strict';
/* =========================================================================
 * DEMO DATA (TEMPORARY)  (README.md, "Testing", "Temporary test buttons")
 * The owner's test helper so the History can be looked at without playing many quizzes. It is one file with one script tag in
 * index.html. To remove it before publishing: delete this file, its script tag in index.html, its map rows in README.md and the
 * play-through test section "Demo data". Every fake play is marked demo: true, so "Remove all test data" takes out only those. A scenario
 * replaces the whole history and totals, so it saves the real ones first (lg-demo-backup); "Remove all test data" then puts them back.
 * ========================================================================= */
const DEMO_PLAY_COUNT = 15;
const DEMO_DAYS = 30; // the fake plays are dated within the last 30 days

const demoPick = (list) => list[Math.floor(Math.random() * list.length)];

function demoWrongAnswer(q) {
  if (q.type === 'mc') return q.options.find((option, i) => i !== q.answer);
  if (q.type === 'tf') return q.answer ? 'False' : 'True';
  if (q.type === 'fill') return q.bank.find((word) => word !== q.answer) || '-';
  return 'wrong pairing';
}

// One fake play of a real quiz: about one in eight is a quit play, one in five of the others is perfect, the rest have a random skill.
function makeDemoPlay() {
  const key = demoPick(Object.keys(QUESTION_BANK));
  const [level, category, topic, type, difficulty] = key.split('|');
  const nav = { level, category, topic: Number(topic), type, difficulty, sameDuration: false };
  const questions = prepareQuiz(getQuestions(nav), key);
  const at = Date.now() - Math.floor(Math.random() * DEMO_DAYS * 24 * 3600 * 1000);
  if (Math.random() < 0.12) {
    const play = buildQuitRecord({
      at, level, category, topic: nav.topic, topicName: getTopics(nav)[nav.topic], type, difficulty,
      seconds: findById(CONFIG.DIFFICULTIES, difficulty).seconds, sameDuration: false,
      total: questions.length, question: 1 + Math.floor(Math.random() * questions.length),
    });
    play.demo = true;
    return play;
  }
  const skill = Math.random() < 0.2 ? 1 : Math.random();
  let score = 0;
  const records = questions.map((q) => {
    const rec = { status: 'correct', timedOut: false, userAnswer: null, note: null, points: CONFIG.POINTS_CORRECT, penalty: 0, extensionUsed: false };
    if (Math.random() < skill) {
      score += rec.points;
      return rec;
    }
    const roll = Math.random();
    if (roll < 0.6) {
      Object.assign(rec, { status: 'incorrect', points: -CONFIG.POINTS_INCORRECT, userAnswer: demoWrongAnswer(q) });
    } else if (roll < 0.7 && q.type === 'fill' && q.answer.length > CONFIG.SPELL_EXACT_MAX_LENGTH) {
      const typed = q.answer.slice(0, -1);
      Object.assign(rec, { status: 'partial', points: CONFIG.POINTS_CORRECT * CONFIG.FILL_MISSPELLED_SHARE, userAnswer: typed, note: { key: 'spellingWarning', params: { answer: q.answer, typed } } });
    } else if (roll < 0.85) {
      Object.assign(rec, { status: 'skipped', points: 0 });
    } else {
      Object.assign(rec, { status: 'unanswered', points: 0, timedOut: Math.random() < 0.6 });
    }
    score += rec.points;
    return rec;
  });
  const saved = state.nav;
  state.nav = Object.assign({}, saved, nav);
  let play;
  try { play = buildPlayRecord({ records, questions, score, graded: true, over: false }, state.nav); } finally { state.nav = saved; }
  play.at = at;
  play.demo = true;
  return play;
}

// The totals are built again from the history, so they always agree with the list after a change here.
function rebuildDemoStats() {
  const history = loadHistory();
  if (history) saveStats(statsFromPlays(history.plays));
}

// Adds fake plays and keeps the whole list newest first by date. Returns false when the history can't be changed.
function addDemoPlays(count = DEMO_PLAY_COUNT) {
  const history = loadHistory();
  if (!history) return false;
  const added = Array.from({ length: count }, makeDemoPlay);
  const ok = saveHistory(history.plays.concat(added).sort((a, b) => (Number(b.at) || 0) - (Number(a.at) || 0)));
  rebuildDemoStats();
  return ok;
}

// ---- Scenarios: a clean history that makes one tip apply (the real data is saved first and put back by "Remove all test data") ----
const DEMO_BACKUP_KEY = 'lg-demo-backup';
const DEMO_HOUR = 3600 * 1000;
const DEMO_DAY = 24 * DEMO_HOUR;

// Saves the real history and totals once (a second scenario never overwrites the saved copy with test data).
function backupRealData() {
  try {
    if (localStorage.getItem(DEMO_BACKUP_KEY) !== null) return true;
    localStorage.setItem(DEMO_BACKUP_KEY, JSON.stringify({ history: localStorage.getItem(HISTORY_KEY), stats: localStorage.getItem(STATS_KEY) }));
    return true;
  } catch (e) {
    return false;
  }
}

// Puts the saved real history and totals back and forgets the copy. Returns false when there is no copy.
function restoreRealData() {
  try {
    const raw = localStorage.getItem(DEMO_BACKUP_KEY);
    if (raw === null) return false;
    const saved = JSON.parse(raw);
    [[HISTORY_KEY, saved.history], [STATS_KEY, saved.stats]].forEach(([key, value]) => {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    });
    localStorage.removeItem(DEMO_BACKUP_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// One fake finished play of a real quiz (A1 vocabulary, topic 0): a score below 100 gets that many questions to review.
function demoRecord({ d, score, type = 'mc', at }) {
  const total = CONFIG.QUESTIONS_PER_QUIZ;
  const correct = Math.round((score / CONFIG.SCORE_MAX) * total);
  const missed = Array.from({ length: total - correct }, (x, i) => ({
    n: i + 1, type, status: 'incorrect', timedOut: false, question: `Test question ${i + 1}`, userAnswer: 'a wrong answer',
    correctAnswer: 'the right answer', note: null, points: -CONFIG.POINTS_INCORRECT, penalty: 0, extensionUsed: false, explanation: 'A test explanation.',
  }));
  return {
    id: newPlayId(), at, end: 'finished', level: 'A1', category: 'vocabulary', topic: 0, topicName: getTopics({ level: 'A1', category: 'vocabulary' })[0],
    type, difficulty: d, seconds: findById(CONFIG.DIFFICULTIES, d).seconds, sameDuration: false, graded: true, score, max: CONFIG.SCORE_MAX,
    counts: { correct, partial: 0, incorrect: total - correct, skipped: 0, unanswered: 0 }, total, extensions: 0, over: false, missed, demo: true,
  };
}

const demoRepeat = (n, item) => Array.from({ length: n }, () => item);
const demoTypeAt = (i) => CONFIG.TYPES[i % CONFIG.TYPES.length].id;
// A list of plays, oldest first: [difficulty, score, type]; the numbers come from CONFIG, so the scenarios follow the thresholds.
const DEMO_SCENARIOS = {
  newBest: () => ({ items: [['hard', 50], ['hard', 60], ['hard', 75]] }),
  welcomeBack: () => ({ items: demoRepeat(3, ['easy', 70]), ageDays: CONFIG.TIPS_WELCOME_BACK_DAYS + 1 }),
  retry: () => ({ items: [...demoRepeat(CONFIG.TIPS_RETRY_MIN_EARLIER, ['medium', 80]), ['medium', 80 - CONFIG.TIPS_RETRY_DROP - 5]] }),
  review: () => ({ items: demoRepeat(CONFIG.TIPS_REVIEW_MIN_PLAYS, ['easy', 60]) }),
  difficulty: () => {
    const n = CONFIG.TIPS_BALANCE_MIN_PLAYS;
    const easy = Math.ceil(n * CONFIG.TIPS_BALANCE_SHARE);
    return { items: Array.from({ length: n }, (x, i) => [i < easy ? 'easy' : 'medium', CONFIG.SCORE_MAX, demoTypeAt(i)]) };
  },
  type: () => {
    const n = CONFIG.TIPS_TYPE_MIN_PLAYS;
    const main = Math.ceil(n * CONFIG.TIPS_TYPE_SHARE);
    const others = CONFIG.TYPES.slice(1);
    return { items: Array.from({ length: n }, (x, i) => [i % 2 ? 'medium' : 'easy', CONFIG.SCORE_MAX, i < main ? CONFIG.TYPES[0].id : others[(i - main) % others.length].id]) };
  },
  trend: () => {
    const half = CONFIG.TIPS_TREND_MIN_PLAYS / 2;
    const older = 55;
    const newer = older + 2 * CONFIG.TIPS_TREND_GAIN + 2;
    return { items: Array.from({ length: half * 2 }, (x, i) => [i % 2 ? 'medium' : 'easy', i < half ? older : newer, demoTypeAt(i)]) };
  },
  everything: () => {
    const half = CONFIG.TIPS_TREND_MIN_PLAYS / 2;
    return { items: Array.from({ length: half * 2 }, (x, i) => ['easy', i < half ? 62 : 80, CONFIG.TYPES[0].id]), ageDays: CONFIG.TIPS_WELCOME_BACK_DAYS + 1 };
  },
};

// Replaces the history and the totals with a scenario. Returns false when it can't.
function buildScenario(name) {
  const make = DEMO_SCENARIOS[name];
  if (!make || !backupRealData()) return false;
  const { items, ageDays = 0 } = make();
  const now = Date.now();
  // oldest first in the list above; the newest play is "ageDays" old and each older one an hour before the next
  const plays = items.map(([d, score, type], i) => demoRecord({ d, score, type, at: now - ageDays * DEMO_DAY - (items.length - 1 - i) * DEMO_HOUR })).reverse();
  const ok = saveHistory(plays);
  rebuildDemoStats();
  return ok;
}

// One more fake play now, with the chosen difficulty, question type and score (the totals are updated the way a real play does it).
function addManualPlay(d, type, score) {
  const history = loadHistory();
  if (!history) return false;
  const play = demoRecord({ d, score: Math.min(CONFIG.SCORE_MAX, Math.max(0, Number(score) || 0)), type, at: Date.now() });
  recordStats(play);
  history.plays.unshift(play);
  return saveHistory(history.plays);
}

// Makes the newest play (in the history and in the totals) this many days old, for "welcome back" and the age of a new best.
function setNewestPlayDaysAgo(days) {
  const at = Date.now() - Math.max(0, Number(days) || 0) * DEMO_DAY;
  let changed = false;
  const history = loadHistory();
  if (history && history.plays.length) {
    history.plays[0].at = at;
    changed = saveHistory(history.plays);
  }
  const stats = loadStats();
  if (stats && stats.last) {
    stats.last.at = at;
    changed = saveStats(stats) || changed;
  }
  return changed;
}

// The saved numbers and the tips as plain text, for looking at the tips without the card: the tips that apply, the ones shown, their sentences.
function describeTips() {
  const stats = loadStats();
  if (!stats) return 'The saved numbers cannot be read.';
  const history = loadHistory();
  const reviewCount = history ? countPlaysToReview(history.plays) : 0;
  const all = overallResult(stats);
  const recent = overallResult(stats, true);
  const round = (n) => (n === null ? '-' : String(Math.round(n)));
  const now = Date.now();
  const lines = [`Plays counted: ${all.plays}. Overall ${round(all.overall)}, recent ${round(recent.overall)}.`];
  CONFIG.DIFFICULTIES.forEach((d) => {
    const e = stats.byDifficulty[d.id];
    lines.push(`${d.id}: ${e.plays} plays, average ${round(all.byDifficulty[d.id])}, best ${round(e.best)}`);
  });
  lines.push(`Types: ${CONFIG.TYPES.map((type) => `${type.id} ${stats.byType[type.id]}`).join(', ')}`);
  lines.push(`Recent: ${stats.recent.map((r) => `${r.d} ${round(r.p)}`).join(', ') || '-'}`);
  const last = stats.last;
  lines.push(last ? `Last play: ${last.d} ${round(last.p)} (${last.type}), ${((now - last.at) / DEMO_DAY).toFixed(1)} days ago, new best: ${last.newBest}` : 'Last play: none');
  lines.push(`History: ${history ? history.plays.length : '?'} plays, ${reviewCount} with questions to review.`, '');
  const found = tipsFor({ stats, reviewCount, now });
  const shownKinds = currentTips(now).map((tip) => tip.kind);
  lines.push(`Tips that apply: ${found.length}. The first ${CONFIG.TIPS_MAX} are shown (*).`);
  found.forEach((tip) => lines.push(`${shownKinds.includes(tip.kind) ? '*' : ' '} ${tip.kind} (${tipKey(tip)}): ${tipText(tip)}`));
  return lines.join('\n');
}

// Removes the fake plays. When a scenario saved the real data first, that is put back; otherwise only the plays marked demo go.
function removeDemoData() {
  if (localStorage.getItem(DEMO_BACKUP_KEY) !== null) return restoreRealData();
  const history = loadHistory();
  if (!history) return false;
  const kept = history.plays.filter((play) => !(play && play.demo));
  if (kept.length) saveHistory(kept);
  else { try { localStorage.removeItem(HISTORY_KEY); } catch (e) { return false; } } // saveHistory([]) writes nothing
  rebuildDemoStats();
  return true;
}

const DEMO_BUTTON_STYLE = 'min-height:0;padding:6px 8px;font:12px/1.2 sans-serif;color:#222;background:#fff;border:1px solid #999;border-radius:6px;cursor:pointer;';
const DEMO_FIELD_STYLE = 'min-height:0;padding:5px 6px;font:12px/1.2 sans-serif;color:#222;background:#fff;border:1px solid #999;border-radius:6px;';

function initDemoData() {
  const box = document.createElement('div');
  box.id = 'demo-data-box';
  box.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:9999;display:flex;flex-wrap:wrap;align-items:center;gap:6px;max-width:min(92vw,520px);padding:6px 8px;border:2px dashed #c0392b;border-radius:8px;background:rgba(255,255,255,0.96);color:#222;font:12px/1.2 sans-serif;';
  const label = document.createElement('span');
  label.textContent = 'TEST ONLY';
  label.style.cssText = 'font-weight:700;color:#c0392b;';
  box.append(label);
  const panel = document.createElement('div');
  panel.id = 'demo-data-panel';
  panel.hidden = true;
  panel.style.cssText = 'flex:1 0 100%;display:grid;gap:8px;max-height:60vh;overflow:auto;';
  const output = document.createElement('pre');
  output.id = 'demo-data-output';
  output.hidden = true;
  output.style.cssText = 'margin:0;padding:6px;background:#f4f4f4;border-radius:6px;font:11px/1.4 monospace;white-space:pre-wrap;';
  // After an action: the History list is built again, and the text panel is written again when it is open.
  const refresh = () => {
    if (state.screen === 'history') openHistory();
    if (!output.hidden) output.textContent = describeTips();
  };
  const addButton = (parent, text, action, quiet = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.style.cssText = DEMO_BUTTON_STYLE;
    button.addEventListener('click', () => {
      const ok = action();
      if (quiet) return; // the two toggles below only open and close things
      refresh();
      button.textContent = ok === false ? 'Could not' : 'Done';
      setTimeout(() => { button.textContent = text; }, 1500);
    });
    parent.append(button);
    return button;
  };
  const addSelect = (parent, options) => {
    const select = document.createElement('select');
    select.style.cssText = DEMO_FIELD_STYLE;
    options.forEach(([value, text]) => select.append(new Option(text, value)));
    parent.append(select);
    return select;
  };
  const addNumber = (parent, value, max) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = String(max);
    input.value = String(value);
    input.style.cssText = `${DEMO_FIELD_STYLE}width:56px;`;
    parent.append(input);
    return input;
  };
  const addRow = (title) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:6px;';
    const name = document.createElement('span');
    name.textContent = title;
    name.style.cssText = 'font-weight:700;min-width:64px;';
    row.append(name);
    panel.append(row);
    return row;
  };

  addButton(box, 'Add 15 random plays', () => addDemoPlays(DEMO_PLAY_COUNT));
  addButton(box, 'Remove all test data', removeDemoData);
  addButton(box, 'More', () => { panel.hidden = !panel.hidden; }, true);

  const scenarioRow = addRow('Scenario');
  const scenario = addSelect(scenarioRow, Object.keys(DEMO_SCENARIOS).map((name) => [name, name]));
  addButton(scenarioRow, 'Build', () => buildScenario(scenario.value));

  const playRow = addRow('One play');
  const difficulty = addSelect(playRow, CONFIG.DIFFICULTIES.map((d) => [d.id, d.id]));
  const type = addSelect(playRow, CONFIG.TYPES.map((tp) => [tp.id, tp.id]));
  const score = addNumber(playRow, 80, CONFIG.SCORE_MAX);
  addButton(playRow, 'Add 1 play', () => addManualPlay(difficulty.value, type.value, score.value));

  const daysRow = addRow('Newest play');
  const days = addNumber(daysRow, CONFIG.TIPS_WELCOME_BACK_DAYS + 1, 365);
  const daysLabel = document.createElement('span');
  daysLabel.textContent = 'days old';
  daysRow.append(daysLabel);
  addButton(daysRow, 'Set', () => setNewestPlayDaysAgo(days.value));

  const showRow = addRow('Look');
  addButton(showRow, 'Show tips and numbers', () => {
    output.hidden = !output.hidden;
    if (!output.hidden) output.textContent = describeTips();
  }, true);

  panel.append(output);
  box.append(panel);
  document.body.append(box);
}

initDemoData();
