/* js/history.js - the history of plays: one record per finished real quiz, and one per real quiz cut short by a reload; saved in the browser
   Provides: HISTORY_KEY, HISTORY_BACKUP_KEY, HISTORY_VERSION, QUIZ_RUN_KEY, newPlayId, buildPlayRecord, loadHistory, saveHistory,
             clearHistory, recordPlay, saveQuizRun, clearQuizRun, buildQuitRecord, recordInterruptedQuiz
   Needs: CONFIG, state, quizIsReal, questionText, correctAnswerText, getTopics, getQuestionSeconds, clampScore, wasReloaded, recordStats */
'use strict';
/* =========================================================================
 * HISTORY  (recording only for now; README.md, "History")
 * Saved in localStorage "lg-history" as { v, plays }: plays are newest first, at most CONFIG.HISTORY_MAX.
 * A record keeps the numbers of the results screen and the missed questions (everything not fully correct).
 * ========================================================================= */
const HISTORY_KEY = 'lg-history';
const HISTORY_BACKUP_KEY = 'lg-history-backup'; // the old text of a damaged list is kept here (one slot), never thrown away silently
const HISTORY_VERSION = 1;

function newPlayId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// The record of the quiz that just finished (quiz = state.quiz, nav = state.nav). Notes are kept as { key, params }
// (not as a sentence), so they can be shown in either language later; the question, answers and explanation are English.
function buildPlayRecord(quiz, nav) {
  const counts = { correct: 0, partial: 0, incorrect: 0, skipped: 0, unanswered: 0 };
  quiz.records.forEach((r) => { counts[r.status]++; });
  const missed = [];
  quiz.questions.forEach((q, i) => {
    const rec = quiz.records[i];
    if (rec.status === 'correct') return;
    missed.push({
      n: i + 1,
      type: q.type,
      status: rec.status,
      timedOut: rec.timedOut,
      question: questionText(q),
      userAnswer: rec.userAnswer,
      correctAnswer: correctAnswerText(q),
      note: rec.note,
      points: rec.points,
      penalty: rec.penalty,
      extensionUsed: rec.extensionUsed,
      explanation: q.explanation,
    });
  });
  return {
    id: newPlayId(),
    at: Date.now(),
    end: 'finished',                              // room for 'quit' later
    level: nav.level,
    category: nav.category,
    topic: nav.topic,
    topicName: getTopics(nav)[nav.topic],
    type: nav.type,
    difficulty: nav.difficulty,
    seconds: getQuestionSeconds(),
    sameDuration: nav.sameDuration,
    graded: quiz.graded,
    score: clampScore(quiz.score),
    max: CONFIG.SCORE_MAX,
    counts,
    total: quiz.questions.length,
    extensions: quiz.records.filter((r) => r.extensionUsed).length,
    over: quiz.over,
    missed,
  };
}

// The saved list as { plays }, or null when it must not be written: the storage is blocked, or the list was saved by a
// newer version of the game (left alone, so an update can't wipe it). A damaged list is kept in the backup slot and a fresh one starts.
function loadHistory() {
  let text;
  try { text = localStorage.getItem(HISTORY_KEY); } catch (e) { return null; }
  if (text === null) return { plays: [] };
  try {
    const data = JSON.parse(text);
    if (data && data.v === HISTORY_VERSION && Array.isArray(data.plays)) return { plays: data.plays };
    if (data && typeof data.v === 'number' && data.v > HISTORY_VERSION) return null;
  } catch (e) { /* damaged: handled below */ }
  try { localStorage.setItem(HISTORY_BACKUP_KEY, text); } catch (e) { /* ignore */ }
  return { plays: [] };
}

// Saves the list (newest first). When the storage is full the oldest plays are dropped one by one until it fits.
// Returns false only when nothing could be saved.
function saveHistory(plays) {
  const list = plays.slice(0, CONFIG.HISTORY_MAX);
  while (list.length) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify({ v: HISTORY_VERSION, plays: list }));
      return true;
    } catch (e) {
      list.pop();
    }
  }
  return false;
}

// "Clear history": removes every play (and the backup of a damaged list). Does not touch the overall result totals. saveHistory([])
// writes nothing for an empty list, so the saved list is removed instead. Returns false when the storage is blocked.
function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(HISTORY_BACKUP_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

// Called by showResults(): saves the play that just finished. Only real quizzes, once per quiz (a language switch on the
// results screen does not record it again). It never throws: the results screen must always show.
function recordPlay() {
  try {
    const quiz = state.quiz;
    if (!quiz || quiz.recorded || !quizIsReal(state.nav)) return false;
    quiz.recorded = true;
    const play = buildPlayRecord(quiz, state.nav);
    recordStats(play); // the overall result has its own totals: it does not depend on the history being saved (js/overall.js)
    const history = loadHistory();
    if (!history) return false;
    history.plays.unshift(play);
    return saveHistory(history.plays);
  } catch (e) {
    return false;
  }
}

// ---- A quiz cut short by a reload ----
// While a real quiz is running, a small note ("a quiz is in progress, at question n") is kept in sessionStorage: it survives a
// reload in the same tab, not a closed tab or browser (accepted limit) and is not shared between tabs. The note is removed when the
// quiz screen is left (finished, quit). If the page starts again with a note left over after a reload, that quiz was cut short and
// a "quit" play is added to the history. Quit plays have no score and are never part of any calculation.
const QUIZ_RUN_KEY = 'lg-quiz-run';

// Called by renderQuestion(): the player is now at this question of a real quiz.
function saveQuizRun() {
  try {
    const quiz = state.quiz;
    const nav = state.nav;
    if (!quiz || !quizIsReal(nav)) return;
    sessionStorage.setItem(QUIZ_RUN_KEY, JSON.stringify({
      at: Date.now(), level: nav.level, category: nav.category, topic: nav.topic, topicName: getTopics(nav)[nav.topic], type: nav.type,
      difficulty: nav.difficulty, seconds: getQuestionSeconds(), sameDuration: nav.sameDuration, total: quiz.questions.length, question: quiz.index + 1,
    }));
  } catch (e) { /* storage blocked: nothing is noted */ }
}

function clearQuizRun() {
  try { sessionStorage.removeItem(QUIZ_RUN_KEY); } catch (e) { /* ignore */ }
}

function buildQuitRecord(note) {
  return {
    id: newPlayId(), at: note.at, end: 'quit',
    level: note.level, category: note.category, topic: note.topic, topicName: note.topicName, type: note.type, difficulty: note.difficulty,
    seconds: note.seconds, sameDuration: note.sameDuration, total: note.total, quitIn: note.question,
  };
}

// Called once at start-up, before the first screen is shown (showing a screen removes the note). Always removes the note;
// adds a quit play only after a reload, for a real quiz, from a note of the expected shape.
function recordInterruptedQuiz() {
  try {
    const raw = sessionStorage.getItem(QUIZ_RUN_KEY);
    if (raw === null) return false;
    sessionStorage.removeItem(QUIZ_RUN_KEY);
    if (!wasReloaded()) return false;
    const note = JSON.parse(raw);
    const shape = { level: 'string', category: 'string', topicName: 'string', type: 'string', difficulty: 'string', at: 'number', topic: 'number', total: 'number', question: 'number' };
    if (!note || Object.keys(shape).some((key) => typeof note[key] !== shape[key]) || !quizIsReal(note)) return false;
    const history = loadHistory();
    if (!history) return false;
    history.plays.unshift(buildQuitRecord(note));
    return saveHistory(history.plays);
  } catch (e) {
    return false;
  }
}
