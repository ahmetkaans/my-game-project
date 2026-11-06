/* js/history-screen.js - the History screens: the list of finished plays, one play in detail, and the buttons that open them
   Provides: HISTORY_SCREENS, historyView, isPlayRecord, readHistoryPlays, historyDate, historyPath, historyMeta, historyCounts,
             historyScore, historyTag, historyRow, appendHistoryRows, updateHistoryFooter, renderHistoryList, renderHistoryDetail,
             historyQuitRow, historyPlayAgain, updateHistoryQuitCount, refreshHistoryScreen, openHistory, closeHistory, openHistoryPlay,
             backToHistoryList, showMoreHistory, initHistory
   Needs: CONFIG, el, fmt, englishText, noteText, state, $, t, ICONS, loadHistory, showScreen, renderResultsContent, getTopics,
          quizIsReal, startQuiz */
'use strict';
/* =========================================================================
 * HISTORY SCREEN  (list newest first, "More" shows CONFIG.HISTORY_PAGE_SIZE rows each press; a row opens that play;
 * Back returns to the same rows at the same scroll position; README.md, "History")
 * ========================================================================= */
const HISTORY_SCREENS = ['history', 'history-detail'];
// plays: the saved plays read when the screen was opened; shown: rows on the list; scrollY: where the list was left when a play was opened;
// openId: the play shown in detail; from: the screen the History was opened from (Back goes there)
const historyView = { plays: [], ok: true, shown: 0, scrollY: 0, openId: null, from: 'level' };

// Saved data can be damaged or edited by hand: only records of the expected shape are used.
function isPlayRecord(p) {
  if (!p || typeof p !== 'object' || typeof p.id !== 'string') return false;
  if (p.end === 'quit') {
    return Number.isFinite(p.quitIn) && Number.isFinite(p.total) && ['level', 'category', 'topicName', 'type', 'difficulty'].every((key) => typeof p[key] === 'string');
  }
  return Boolean(p.counts) && typeof p.counts === 'object' && Array.isArray(p.missed);
}

function readHistoryPlays() {
  const history = loadHistory();
  if (!history) return { ok: false, plays: [] };
  return { ok: true, plays: history.plays.filter(isPlayRecord) };
}

// "6 Nov 2026, 14:32" in English, "6 Kas 2026 14:32" in Turkish (the browser's own date names, no texts needed).
function historyDate(at) {
  const date = new Date(at);
  if (!Number.isFinite(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(state.lang === 'tr' ? 'tr-TR' : 'en-GB', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(date);
  } catch (e) {
    return date.toLocaleString();
  }
}

function historyPath(p) {
  return `${p.level} ${t(`category.${p.category}`)} › ${p.topicName}`;
}

function historyMeta(p) {
  return `${t(`type.${p.type}`)} · ${t(`difficulty.${p.difficulty}`)}`;
}

// The counts of the results screen: Correct, Misspelled / Partly correct (only when above 0), Incorrect, Skipped, Not answered.
function historyCounts(p) {
  const num = (key) => Number(p.counts[key]) || 0;
  return [
    `${t('count.correct')}: ${num('correct')}`,
    ...(num('partial') ? [`${t(p.type === 'fill' ? 'count.misspelled' : 'count.partial')}: ${num('partial')}`] : []),
    `${t('count.incorrect')}: ${num('incorrect')}`,
    `${t('count.skipped')}: ${num('skipped')}`,
    `${t('count.unanswered')}: ${num('unanswered')}`,
  ];
}

function historyScore(p) {
  if (p.graded === false) return [el('span', { class: 'score-na', text: t('scoreNotGraded') })];
  return [el('span', { class: 'score-num', text: fmt(Number(p.score) || 0) }), el('span', { class: 'score-max', text: ` / ${Number(p.max) || 0}` })];
}

// The small tag of a question to review: Incorrect, Partly correct (Misspelled in Fill in the Blanks), Skipped, Not answered, Time ran out.
function historyTag(m) {
  let key;
  if (m.status === 'incorrect') key = 'status.incorrect';
  else if (m.status === 'partial') key = m.type === 'fill' ? 'status.misspelled' : 'status.partial';
  else if (m.status === 'skipped') key = 'historySkipped';
  else key = m.timedOut ? 'historyTimedOut' : 'status.unanswered';
  return el('span', { class: `history-tag is-${m.status}`, text: t(key) });
}

// A play cut short by a reload: a "Quit" tag instead of a score, where it was left, and Play again (when that quiz still exists).
// It has no detail and is never counted in any calculation.
function historyQuitRow(p) {
  const top = el('span', { class: 'history-top' }, [
    el('span', {}, [
      el('span', { class: 'history-date', text: historyDate(p.at) }),
      el('span', { class: 'history-path', text: historyPath(p) }),
      el('span', { class: 'history-meta', text: historyMeta(p) }),
    ]),
    el('span', { class: 'history-tag is-quit', text: t('historyQuitTag') }),
  ]);
  const children = [top, el('span', { class: 'history-quit-line', text: t('historyQuitIn', { n: p.quitIn, total: p.total }) })];
  if (quizIsReal(p) && getTopics(p)[p.topic] === p.topicName) {
    const again = el('button', { class: 'history-again', type: 'button' }, [el('span', { class: 'history-again-icon', 'aria-hidden': 'true' }), el('span', { text: t('historyPlayAgain') })]);
    again.firstChild.innerHTML = ICONS.play;
    again.addEventListener('click', () => historyPlayAgain(p));
    children.push(again);
  }
  return el('li', {}, [el('div', { class: 'history-row is-quit' }, children)]);
}

// Play again: the same quiz (level, category, topic, type, difficulty), with the same-duration setting as it is now.
function historyPlayAgain(p) {
  Object.assign(state.nav, { level: p.level, category: p.category, topic: p.topic, type: p.type, difficulty: p.difficulty });
  startQuiz();
}

// A play with questions to review is a button that opens it; a perfect play is a plain box that says so.
function historyRow(p) {
  if (p.end === 'quit') return historyQuitRow(p);
  const top = el('span', { class: 'history-top' }, [
    el('span', {}, [
      el('span', { class: 'history-date', text: historyDate(p.at) }),
      el('span', { class: 'history-path', text: historyPath(p) }),
      el('span', { class: 'history-meta', text: historyMeta(p) }),
    ]),
    el('span', { class: 'history-score' }, historyScore(p)),
  ]);
  const pills = el('span', { class: 'history-pills' }, historyCounts(p).map((text) => el('span', { text })));
  if (!p.missed.length) {
    const perfect = el('span', { class: 'history-perfect', text: `✓ ${t('historyPerfect')}` });
    return el('li', {}, [el('div', { class: 'history-row is-perfect' }, [top, pills, perfect])]);
  }
  const button = el('button', { class: 'history-row', type: 'button' }, [top, pills, el('span', { class: 'history-arrow', 'aria-hidden': 'true', text: '›' })]);
  button.addEventListener('click', () => openHistoryPlay(p.id));
  return el('li', {}, [button]);
}

function appendHistoryRows(from, to) {
  $('#history-list').append(...historyView.plays.slice(from, to).map(historyRow));
}

// "Quit: n" under the subtitle, only when there is a quit play in the list.
function updateHistoryQuitCount() {
  const quits = historyView.plays.filter((p) => p.end === 'quit').length;
  $('#history-quit-count').textContent = quits ? t('historyQuitCount', { n: quits }) : '';
  $('#history-quit-count').hidden = quits === 0;
}

function updateHistoryFooter() {
  const total = historyView.plays.length;
  const shown = Math.min(historyView.shown, total);
  $('#history-count').textContent = t('historyShowing', { shown, total });
  $('#history-more').hidden = shown >= total;
}

// Builds the list again: the first `shown` rows, the count, the note, or a message when there is nothing to show.
function renderHistoryList() {
  const view = historyView;
  const hasList = view.ok && view.plays.length > 0;
  $('#history-list').replaceChildren();
  $('#history-message').textContent = view.ok ? t('historyEmpty') : t('historyUnavailable');
  $('#history-message').hidden = hasList;
  $('#history-count').hidden = !hasList;
  $('#history-note').textContent = t('historyNote', { n: CONFIG.HISTORY_MAX });
  $('#history-how').hidden = !view.ok; // the "How your history works" panel shows whenever the history can be read, also when it is empty
  updateHistoryQuitCount();
  if (!hasList) { $('#history-more').hidden = true; return; }
  appendHistoryRows(0, Math.min(view.shown, view.plays.length));
  updateHistoryFooter();
}

// One play: its place and date, the score and counts of the results screen, and every question that was not fully correct.
function renderHistoryDetail() {
  const p = historyView.plays.find((x) => x.id === historyView.openId);
  if (!p) return;
  $('#history-detail-title').textContent = historyPath(p);
  $('#history-detail-sub').textContent = `${historyDate(p.at)} · ${historyMeta(p)}`;
  $('#history-detail-score').replaceChildren(...historyScore(p));
  $('#history-detail-summary').replaceChildren(...historyCounts(p).map((text) => el('li', { text })));
  $('#history-detail-list').replaceChildren(...p.missed.map((m) => {
    const row = (label, value) => el('p', {}, [el('span', { class: 'label', text: `${label}: ` }), value]);
    const children = [
      el('p', { class: 'history-qhead' }, [el('strong', { text: t('questionNumber', { n: m.n }) }), historyTag(m)]),
      el('p', {}, [englishText(m.question)]),
      row(t('yourAnswer'), englishText(m.userAnswer ?? '—')),
      row(t('correctAnswer'), englishText(m.correctAnswer)),
    ];
    if (m.note) children.push(row(t('note'), noteText(m.note)));
    if (m.extensionUsed) children.push(row(t('extraTime'), t('used')));
    children.push(row(t('explanation'), englishText(m.explanation)));
    return el('li', { class: `st-${m.status}` }, children);
  }));
}

// A language switch on a History screen: its texts are built again, the page stays where it is.
function refreshHistoryScreen() {
  const y = window.scrollY;
  if (state.screen === 'history') renderHistoryList();
  else if (state.screen === 'history-detail') renderHistoryDetail();
  else return;
  window.scrollTo(0, y);
}

function openHistory() {
  if (!HISTORY_SCREENS.includes(state.screen)) historyView.from = state.screen;
  Object.assign(historyView, readHistoryPlays(), { shown: CONFIG.HISTORY_PAGE_SIZE, scrollY: 0, openId: null });
  renderHistoryList();
  showScreen('history');
}

// Back from the list: to the screen the History was opened from (the results screen is built again: the language may have changed).
function closeHistory() {
  let target = historyView.from;
  if (!target || HISTORY_SCREENS.includes(target) || target === 'quiz' || (target === 'results' && !state.quiz)) target = 'level';
  if (target === 'results') renderResultsContent();
  showScreen(target);
}

function openHistoryPlay(id) {
  historyView.scrollY = window.scrollY;
  historyView.openId = id;
  renderHistoryDetail();
  showScreen('history-detail');
}

// Back from one play: the same rows, at the same place on the page.
function backToHistoryList() {
  historyView.openId = null;
  renderHistoryList();
  showScreen('history');
  window.scrollTo(0, historyView.scrollY);
}

// "More": the next rows are added below the ones shown; nothing is redrawn and the page does not move.
function showMoreHistory() {
  const view = historyView;
  const from = Math.min(view.shown, view.plays.length);
  view.shown = Math.min(from + CONFIG.HISTORY_PAGE_SIZE, view.plays.length);
  appendHistoryRows(from, view.shown);
  updateHistoryFooter();
  if ($('#history-more').hidden) $('#history-count').focus(); // the button is gone: keep the keyboard focus on the page
}

function initHistory() {
  $('#history-btn').innerHTML = ICONS.history;
  $('#results-history-icon').innerHTML = ICONS.history;
  $('#history-btn').addEventListener('click', openHistory);
  $('#results-history').addEventListener('click', openHistory);
  $('#history-back').addEventListener('click', closeHistory);
  $('#history-detail-back').addEventListener('click', backToHistoryList);
  $('#history-more').addEventListener('click', showMoreHistory);
}
