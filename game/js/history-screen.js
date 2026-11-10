/* js/history-screen.js - the History screens: the overall result block, the list of finished plays, one play in detail, and the buttons that open them
   Provides: HISTORY_SCREENS, OVERALL_VIEW_KEY, historyView, overallView, renderOverall, setOverallView,
             scrollToHistoryList, tipWithAction, renderTips, updateHistoryResets, askHistoryReset, showHistoryAfterReset, askClearHistory, askResetCalculation, isPlayRecord, readHistoryPlays, historyDate, historyPath, historyMeta, historyCounts,
             historyScore, historyTag, historyRow, appendHistoryRows, updateHistoryFooter, renderHistoryList, renderHistoryDetail,
             historyQuitRow, historyPlayAgain, updateHistoryQuitCount, refreshHistoryScreen, openHistory, closeHistory, openHistoryPlay,
             backToHistoryList, showMoreHistory, initHistory
   Needs: CONFIG, el, fmt, englishText, noteText, state, $, t, ICONS, loadHistory, clearHistory, loadStats, resetStats, overallResult, overallBand,
          loadPref, savePref, prefersReducedMotion, currentTips, tipElement, openModal, closeModal,
          showScreen, renderResultsContent, getTopics,
          quizIsReal, startQuiz */
'use strict';
/* =========================================================================
 * HISTORY SCREEN  (list newest first, "More" shows CONFIG.HISTORY_PAGE_SIZE rows each press; a row opens that play;
 * Back returns to the same rows at the same scroll position; README.md, "History")
 * ========================================================================= */
const HISTORY_SCREENS = ['history', 'history-detail'];
const OVERALL_VIEW_KEY = 'lg-overall-view'; // 'all' or 'recent': the last choice of the switch in the overall result block
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

// ---- The overall result block (the maths is in js/overall.js) ----
// Which view is shown is the student's last choice, remembered like a setting; "All plays" the first time.
function overallView() {
  return loadPref(OVERALL_VIEW_KEY, 'all') === 'recent' ? 'recent' : 'all';
}

// Hidden when the totals can't be read, and on a brand-new History (no counted play and no play in the list: the list message says
// it). When there are plays but none is counted (after "Reset calculation") it shows only its empty text. It is updated in place, so
// the switch keeps the keyboard focus. The comment is chosen from the whole number shown, so it never disagrees with it.
function renderOverall() {
  const stats = loadStats();
  const counted = stats ? overallResult(stats).plays : 0;
  const box = $('#overall');
  box.hidden = !stats || (counted === 0 && historyView.plays.length === 0);
  if (box.hidden) return;
  $('#overall-main').hidden = counted === 0;
  $('#overall-empty').hidden = counted > 0;
  $('#overall-empty').textContent = t('overallEmpty');
  if (counted === 0) return;
  const view = overallView();
  const result = overallResult(stats, view === 'recent');
  const score = Math.round(result.overall);
  $('#overall-all').setAttribute('aria-pressed', String(view === 'all'));
  $('#overall-recent').setAttribute('aria-pressed', String(view === 'recent'));
  $('#overall-score').replaceChildren(el('span', { class: 'overall-num', text: String(score) }), el('span', { class: 'overall-max', text: ` / ${CONFIG.SCORE_MAX}` }));
  $('#overall-comment').textContent = t(`overallComment${overallBand(score)}`);
  $('#overall-pills').replaceChildren(...CONFIG.DIFFICULTIES.map((d) => {
    const value = result.byDifficulty[d.id];
    return el('span', { text: `${t(`difficulty.${d.id}`)} ${value === null ? '–' : Math.round(value)}` });
  }));
  $('#overall-recent-note').hidden = view !== 'recent';
  $('#overall-recent-note').textContent = result.plays === 1 ? t('overallRecentOne') : t('overallRecentLine', { n: result.plays });
  $('#overall-weights').textContent = t('overallWeights', { list: CONFIG.DIFFICULTIES.map((d) => `${t(`difficulty.${d.id}`)} ×${d.weight}`).join(', ') });
  $('#overall-few').hidden = result.plays >= CONFIG.OVERALL_MIN_PLAYS;
  $('#overall-few').textContent = t('overallFew');
}

function setOverallView(view) {
  savePref(OVERALL_VIEW_KEY, view);
  renderOverall();
}

// ---- The "Tips for you" card (the rules and the sentences are in js/tips.js) ----
// The review tip has a link that moves to the list below; the retry tip has a button that starts the same quiz again, like Play again.
function scrollToHistoryList() {
  const list = $('#history-list');
  list.tabIndex = -1;
  list.focus({ preventScroll: true });
  list.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

function tipWithAction(tip) {
  const item = tipElement(tip);
  const body = item.querySelector('.tip-body');
  if (tip.kind === 'review') {
    const link = el('button', { class: 'link-btn tip-action', type: 'button', text: t('tipReviewLink') });
    link.addEventListener('click', scrollToHistoryList);
    body.append(link);
  } else if (tip.kind === 'retry') {
    const p = tip.params;
    const button = el('button', { class: 'history-again tip-button', type: 'button', text: t('tipRetryButton') });
    button.addEventListener('click', () => historyPlayAgain({ level: p.level, category: p.category, topic: p.topic, type: p.type, difficulty: p.d }));
    body.append(button);
  }
  return item;
}

// Hidden when no tip applies (also on a brand-new History). The card is built again whenever the list is (opening, Back, language).
function renderTips() {
  const tips = currentTips();
  $('#tips').hidden = tips.length === 0;
  $('#tips-list').replaceChildren(...tips.map(tipWithAction));
}

// ---- The two quiet buttons at the very bottom: "Clear history" and "Reset calculation" ----
// Each one is shown only when there is something to remove, and asks first: Cancel is the main button, and Escape or a click
// outside also cancel. Neither touches the other's data (js/history.js clearHistory, js/overall.js resetStats).
function updateHistoryResets() {
  const history = loadHistory();
  const stats = loadStats();
  const canClear = Boolean(history) && history.plays.length > 0;
  const canReset = Boolean(stats) && overallResult(stats).plays > 0;
  $('#history-clear').hidden = !canClear;
  $('#history-reset').hidden = !canReset;
  $('#history-resets').hidden = !canClear && !canReset;
}

function askHistoryReset(texts, action) {
  openModal({
    title: t(texts.title),
    body: t(texts.body),
    dismissible: true,
    buttons: [
      { label: t('cancel'), primary: true, onClick: closeModal },
      { label: t(texts.button), onClick: () => { closeModal(); action(); showHistoryAfterReset(); } },
    ],
  });
}

// The button that was pressed is gone now: the list, the block and the buttons are built again, and the keyboard focus goes to the title.
function showHistoryAfterReset() {
  Object.assign(historyView, readHistoryPlays(), { shown: CONFIG.HISTORY_PAGE_SIZE });
  renderHistoryList();
  window.scrollTo(0, 0);
  const title = $('#screen-history h1');
  title.tabIndex = -1;
  title.focus({ preventScroll: true });
}

function askClearHistory() {
  askHistoryReset({ title: 'historyClearTitle', body: 'historyClearBody', button: 'historyClearButton' }, clearHistory);
}

function askResetCalculation() {
  askHistoryReset({ title: 'overallResetTitle', body: 'overallResetBody', button: 'overallResetButton' }, resetStats);
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
  renderOverall();
  renderTips();
  updateHistoryResets();
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
  $('#overall-all').addEventListener('click', () => setOverallView('all'));
  $('#overall-recent').addEventListener('click', () => setOverallView('recent'));
  $('#history-clear').addEventListener('click', askClearHistory);
  $('#history-reset').addEventListener('click', askResetCalculation);
}
