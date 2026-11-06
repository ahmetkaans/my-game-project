/* js/demo-data.js - TEMPORARY test helper: two small buttons that add random plays to the History and remove them again. DELETE BEFORE PUBLISHING.
   Provides: DEMO_PLAY_COUNT, DEMO_DAYS, demoPick, demoWrongAnswer, makeDemoPlay, rebuildDemoStats, addDemoPlays, removeDemoData, initDemoData
   Needs: CONFIG, QUESTION_BANK, state, findById, getQuestions, prepareQuiz, getTopics, buildPlayRecord, buildQuitRecord,
          HISTORY_KEY, loadHistory, saveHistory, statsFromPlays, saveStats, openHistory */
'use strict';
/* =========================================================================
 * DEMO DATA (TEMPORARY)  (README.md, "Testing", "Temporary test buttons")
 * The owner's test helper so the History can be looked at without playing many quizzes. It is one file with one script tag in
 * index.html. To remove it before publishing: delete this file, its script tag in index.html, its map rows in README.md and the
 * play-through test section "Demo data". Every fake play is marked demo: true, so "Remove all test data" takes out only those.
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

// Removes only the fake plays; the real ones stay.
function removeDemoData() {
  const history = loadHistory();
  if (!history) return false;
  const kept = history.plays.filter((play) => !(play && play.demo));
  if (kept.length) saveHistory(kept);
  else { try { localStorage.removeItem(HISTORY_KEY); } catch (e) { return false; } } // saveHistory([]) writes nothing
  rebuildDemoStats();
  return true;
}

function initDemoData() {
  const box = document.createElement('div');
  box.id = 'demo-data-box';
  box.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:9999;display:flex;align-items:center;gap:6px;padding:6px 8px;border:2px dashed #c0392b;border-radius:8px;background:rgba(255,255,255,0.94);color:#222;font:12px/1.2 sans-serif;';
  const label = document.createElement('span');
  label.textContent = 'TEST ONLY';
  label.style.cssText = 'font-weight:700;color:#c0392b;';
  box.append(label);
  const addButton = (text, action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.style.cssText = 'min-height:0;padding:6px 8px;font:12px/1.2 sans-serif;color:#222;background:#fff;border:1px solid #999;border-radius:6px;cursor:pointer;';
    button.addEventListener('click', () => {
      const ok = action();
      if (state.screen === 'history') openHistory(); // the list on the screen is built again
      button.textContent = ok ? 'Done' : 'Could not';
      setTimeout(() => { button.textContent = text; }, 1500);
    });
    box.append(button);
  };
  addButton('Add 15 random plays', () => addDemoPlays(DEMO_PLAY_COUNT));
  addButton('Remove all test data', removeDemoData);
  document.body.append(box);
}

initDemoData();
