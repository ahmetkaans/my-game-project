/* js/tips.js - the tips ("Tips for you"): the rules (which tips fit the totals of the overall result: numbers in, tips out) and the sentence of a tip
   Provides: TIP_KINDS, DAY_MS, TIP_RULES, TIP_VERSIONS, RESULTS_TIP_KINDS, TIP_LOOK, daysSince, countPlaysToReview, tipNewBest, tipWelcomeBack,
             tipRetry, tipReview, tipDifficulty, tipType, tipTrend, tipsFor, pickTips, currentTips, tipQuizExists, resultsTips, tipElement,
             tipKey, tipParams, tipText
   Needs: CONFIG, overallResult, loadStats, loadHistory, quizIsReal, getTopics, el, ICONS, t */
'use strict';
/* =========================================================================
 * TIPS  (the rules, the sentence of a tip and one tip on the screen; the card is in js/history-screen.js; README.md, "Tips")
 * tipsFor() reads the totals (js/overall.js), the number of plays with questions to review and the time now, and returns every
 * tip that applies as { kind, params, seed }, best priority first. pickTips() keeps the first CONFIG.TIPS_MAX. Nothing is stored:
 * the same totals always give the same tips, and seed (the number of finished plays) is what the texts use to choose a sentence
 * version, so the card changes after each new play and not when it is opened again. The thresholds are in CONFIG (TIPS_*).
 * The tips never say that the student is doing worse (the trend is good news only).
 * ========================================================================= */
// Priority: the time-sensitive ones first (a new best, welcome back, retry), then advice.
const TIP_KINDS = ['newBest', 'welcomeBack', 'retry', 'review', 'difficulty', 'type', 'trend'];
const DAY_MS = 24 * 3600 * 1000;

function daysSince(last, now) {
  return last && last.at > 0 ? (now - last.at) / DAY_MS : 0;
}

// How many saved plays have questions to review (finished plays with a non-empty missed list).
function countPlaysToReview(plays) {
  return plays.filter((p) => p && p.end === 'finished' && Array.isArray(p.missed) && p.missed.length > 0).length;
}

// The last play beat the best of its difficulty (decided when it was recorded), and it is not older than the welcome back gap.
function tipNewBest({ stats, now }) {
  const last = stats.last;
  if (!last || !last.newBest || daysSince(last, now) >= CONFIG.TIPS_WELCOME_BACK_DAYS) return null;
  return { kind: 'newBest', params: { d: last.d, p: Math.round(last.p) } };
}

function tipWelcomeBack({ stats, now }) {
  const last = stats.last;
  if (!last || last.at <= 0 || daysSince(last, now) < CONFIG.TIPS_WELCOME_BACK_DAYS) return null;
  return { kind: 'welcomeBack', params: {} };
}

// The last play is well below the average of the earlier plays of the same difficulty (the last play itself is left out).
// params say which quiz; canRetry(params) is asked whether that quiz still exists (the game answers with tipQuizExists), so a tip for a
// quiz that is gone is never picked and the next tip takes its place.
function tipRetry({ stats, canRetry }) {
  const last = stats.last;
  if (!last) return null;
  const entry = stats.byDifficulty[last.d];
  const earlier = entry.plays - 1;
  if (earlier < CONFIG.TIPS_RETRY_MIN_EARLIER) return null;
  const average = (entry.sum - last.p) / earlier;
  if (last.p > average - CONFIG.TIPS_RETRY_DROP + 1e-9) return null;
  const params = { level: last.level, category: last.category, topic: last.topic, topicName: last.topicName, type: last.type, d: last.d };
  return canRetry(params) ? { kind: 'retry', params } : null;
}

function tipReview({ reviewCount }) {
  if (reviewCount < CONFIG.TIPS_REVIEW_MIN_PLAYS) return null;
  return { kind: 'review', params: { n: reviewCount } };
}

// Most plays are in one difficulty that is not the hardest, and the student does well in it: suggest the next one.
function tipDifficulty({ stats, all }) {
  if (all.plays < CONFIG.TIPS_BALANCE_MIN_PLAYS) return null;
  const list = CONFIG.DIFFICULTIES;
  let top = 0;
  list.forEach((d, i) => { if (stats.byDifficulty[d.id].plays > stats.byDifficulty[list[top].id].plays) top = i; });
  const entry = stats.byDifficulty[list[top].id];
  if (top === list.length - 1 || entry.plays / all.plays < CONFIG.TIPS_BALANCE_SHARE) return null;
  if (entry.sum / entry.plays < CONFIG.TIPS_BALANCE_MIN_AVERAGE) return null;
  return { kind: 'difficulty', params: { from: list[top].id, to: list[top + 1].id } };
}

// Most plays are of one question type: suggest the type played least (counts only: the scores of the types are not comparable).
function tipType({ stats }) {
  const types = CONFIG.TYPES.map((type) => ({ id: type.id, plays: stats.byType[type.id] }));
  const total = types.reduce((sum, type) => sum + type.plays, 0);
  if (total < CONFIG.TIPS_TYPE_MIN_PLAYS) return null;
  const top = types.reduce((best, type) => (type.plays > best.plays ? type : best), types[0]);
  if (top.plays / total < CONFIG.TIPS_TYPE_SHARE) return null;
  const least = types.reduce((best, type) => (type.plays < best.plays ? type : best), types[0]);
  return { kind: 'type', params: { from: top.id, to: least.id } };
}

// Good news only: the recent plays are clearly above the usual score. It is never shown when they are lower.
function tipTrend({ stats, all }) {
  if (all.plays < CONFIG.TIPS_TREND_MIN_PLAYS) return null;
  const recent = overallResult(stats, true);
  if (recent.overall < all.overall + CONFIG.TIPS_TREND_GAIN - 1e-9) return null;
  return { kind: 'trend', params: {} };
}

const TIP_RULES = { newBest: tipNewBest, welcomeBack: tipWelcomeBack, retry: tipRetry, review: tipReview, difficulty: tipDifficulty, type: tipType, trend: tipTrend };

// Every tip that applies, best priority first. input: { stats, reviewCount, now, canRetry }. With empty totals (after "Reset calculation")
// only the review tip can apply, and its seed is the number of plays to review.
function tipsFor({ stats, reviewCount = 0, now = Date.now(), canRetry = () => true }) {
  if (!stats) return [];
  const all = overallResult(stats);
  const input = { stats, all, reviewCount, now, canRetry };
  const seed = all.plays > 0 ? all.plays : reviewCount;
  return TIP_KINDS.map((kind) => TIP_RULES[kind](input)).filter(Boolean).map((tip) => ({ ...tip, seed }));
}

function pickTips(tips) {
  return tips.slice(0, CONFIG.TIPS_MAX);
}

// The tips to show now: the saved totals and the saved history go in, the picked tips come out. The card on the History screen and the
// test panel both call this, so what the panel shows is what the card shows. It reads the storage (it may build the totals from the history).
function currentTips(now = Date.now()) {
  const history = loadHistory();
  return pickTips(tipsFor({ stats: loadStats(), reviewCount: history ? countPlaysToReview(history.plays) : 0, now, canRetry: tipQuizExists }));
}

// The quiz of a retry tip still exists: it is a real quiz and its topic still has the same name at the same position (the same guard as Play again).
function tipQuizExists(p) {
  const nav = { level: p.level, category: p.category, topic: p.topic, type: p.type, difficulty: p.d };
  return quizIsReal(nav) && getTopics(nav)[p.topic] === p.topicName;
}

// The one tip for the results screen: only a new best or a retry tip, and only when the last play is the one just finished
// (playAt is the time of the play that was just recorded; a quiz that is not recorded has none, so a tip of an older play never shows).
const RESULTS_TIP_KINDS = ['newBest', 'retry'];
function resultsTips(playAt, now = Date.now()) {
  const stats = loadStats();
  if (!stats || !stats.last || !playAt || stats.last.at !== playAt) return [];
  return tipsFor({ stats, now, canRetry: tipQuizExists }).filter((tip) => RESULTS_TIP_KINDS.includes(tip.kind)).slice(0, 1);
}

// ---- One tip on the screen: a round icon and its sentence (the History card adds its link or button) ----
// icon and tone: green for praise and good news, blue for suggestions, gray for the review pointer (never red).
const TIP_LOOK = { newBest: ['trophy', 'good'], trend: ['star', 'good'], welcomeBack: ['smile', 'good'], difficulty: ['arrowUp', 'try'], type: ['puzzle', 'try'], retry: ['refresh', 'try'], review: ['history', 'quiet'] };
function tipElement(tip) {
  const [icon, tone] = TIP_LOOK[tip.kind];
  const iconBox = el('span', { class: 'tip-icon', 'aria-hidden': 'true' });
  iconBox.innerHTML = ICONS[icon];
  return el('li', { class: `tip is-${tone}`, 'data-kind': tip.kind }, [iconBox, el('div', { class: 'tip-body' }, [el('p', { class: 'tip-text', text: tipText(tip) })])]);
}

// ---- The sentence of a tip (the texts: "tip.<kind>.1" to "tip.<kind>.3" in js/texts.js, approved by the owner 2026-11-10) ----
const TIP_VERSIONS = 3; // sentence versions per kind

// The text key: the version follows the number of plays, so the sentence changes after each new play and not when it is looked at again.
function tipKey(tip) {
  return `tip.${tip.kind}.${(tip.seed % TIP_VERSIONS) + 1}`;
}

// The values of a tip as words in the language now: difficulty and question type names come from the game's own texts. A name never gets
// an ending in Turkish: the sentences put a fixed noun after it ("seviyede", "türünü").
function tipParams(tip) {
  const p = tip.params;
  if (tip.kind === 'newBest') return { d: t(`difficulty.${p.d}`), p: p.p };
  if (tip.kind === 'difficulty') return { from: t(`difficulty.${p.from}`), to: t(`difficulty.${p.to}`) };
  if (tip.kind === 'type') return { from: t(`type.${p.from}`), to: t(`type.${p.to}`) };
  if (tip.kind === 'review') return { n: p.n };
  return {};
}

function tipText(tip) {
  return t(tipKey(tip), tipParams(tip));
}
