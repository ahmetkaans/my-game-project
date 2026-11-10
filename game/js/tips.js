/* js/tips.js - the rules of the tips ("Tips for you"): which tips fit the totals of the overall result (pure: numbers in, tips out, no screen)
   Provides: TIP_KINDS, DAY_MS, TIP_RULES, daysSince, countPlaysToReview, tipNewBest, tipWelcomeBack, tipRetry, tipReview, tipDifficulty, tipType,
             tipTrend, tipsFor, pickTips
   Needs: CONFIG, overallResult */
'use strict';
/* =========================================================================
 * TIPS  (the rules only; README.md, "Tips")
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
// params say which quiz: the card checks that it still exists before it shows a button.
function tipRetry({ stats }) {
  const last = stats.last;
  if (!last) return null;
  const entry = stats.byDifficulty[last.d];
  const earlier = entry.plays - 1;
  if (earlier < CONFIG.TIPS_RETRY_MIN_EARLIER) return null;
  const average = (entry.sum - last.p) / earlier;
  if (last.p > average - CONFIG.TIPS_RETRY_DROP + 1e-9) return null;
  return { kind: 'retry', params: { level: last.level, category: last.category, topic: last.topic, topicName: last.topicName, type: last.type, d: last.d } };
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

// Every tip that applies, best priority first. input: { stats, reviewCount, now }.
function tipsFor({ stats, reviewCount = 0, now = Date.now() }) {
  if (!stats) return [];
  const all = overallResult(stats);
  if (all.plays === 0) return [];
  const input = { stats, all, reviewCount, now };
  return TIP_KINDS.map((kind) => TIP_RULES[kind](input)).filter(Boolean).map((tip) => ({ ...tip, seed: all.plays }));
}

function pickTips(tips) {
  return tips.slice(0, CONFIG.TIPS_MAX);
}
