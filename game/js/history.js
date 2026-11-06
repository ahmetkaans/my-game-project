/* js/history.js - the history of finished plays: one record per finished real quiz, saved in the browser
   Provides: HISTORY_KEY, HISTORY_BACKUP_KEY, HISTORY_VERSION, newPlayId, buildPlayRecord, loadHistory, saveHistory, recordPlay
   Needs: CONFIG, state, quizIsReal, questionText, correctAnswerText, getTopics, getQuestionSeconds, clampScore */
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

// Called by showResults(): saves the play that just finished. Only real quizzes, once per quiz (a language switch on the
// results screen does not record it again). It never throws: the results screen must always show.
function recordPlay() {
  try {
    const quiz = state.quiz;
    if (!quiz || quiz.recorded || !quizIsReal(state.nav)) return false;
    quiz.recorded = true;
    const history = loadHistory();
    if (!history) return false;
    history.plays.unshift(buildPlayRecord(quiz, state.nav));
    return saveHistory(history.plays);
  } catch (e) {
    return false;
  }
}
