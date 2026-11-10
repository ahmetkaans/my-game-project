/* js/overall.js - the overall result: running totals of the finished plays, saved in the browser (the maths and the numbers the tips read)
   Provides: STATS_KEY, STATS_BACKUP_KEY, STATS_VERSION, isPercent, emptyStats, cleanLast, cleanStats, addToStats, statsFromPlays, loadStats, saveStats,
             recordStats, resetStats, overallBand, overallResult
   Needs: CONFIG, loadHistory */
'use strict';
/* =========================================================================
 * OVERALL RESULT  (README.md, "Overall result")
 * Saved in localStorage "lg-stats" (version 2) as
 *   { v, byDifficulty: { easy: { plays, sum, best }, ... }, byType: { mc: plays, ... }, recent: [ { d, p }, ... ], last }
 * plays and sum: how many finished plays of each difficulty and the sum of their scores as percents of the maximum; best: the best
 * score of that difficulty; byType: plays per question type; recent: the newest CONFIG.OVERALL_RECENT_COUNT plays (difficulty and
 * percent, newest first) for the "Recent plays" view; last: the newest finished play (where, which difficulty, percent, and newBest:
 * it beat the best of its difficulty by at least 1 point, with at least 2 earlier plays there). last and recent[0] describe the same
 * play and must agree. It is a store of its own (not read from the history list), so clearing the history or the 500-play limit never
 * changes it; "Reset calculation" empties all of it. Quit plays and ungraded plays never count. From version 2 on, a change of the
 * format needs a proper upgrade (before the game is published, an old version is simply built again from the history).
 * ========================================================================= */
const STATS_KEY = 'lg-stats';
const STATS_BACKUP_KEY = 'lg-stats-backup'; // the old text of damaged totals is kept here (one slot)
const STATS_VERSION = 2;

function emptyStats() {
  const byDifficulty = {};
  CONFIG.DIFFICULTIES.forEach((d) => { byDifficulty[d.id] = { plays: 0, sum: 0, best: 0 }; });
  const byType = {};
  CONFIG.TYPES.forEach((type) => { byType[type.id] = 0; });
  return { v: STATS_VERSION, byDifficulty, byType, recent: [], last: null };
}

const isPercent = (n) => Number.isFinite(n) && n >= 0 && n <= 100;

// The saved newest play: null, or an object of the expected shape (otherwise undefined, which means damaged).
function cleanLast(last, stats) {
  if (last === null) return null;
  if (!last || typeof last !== 'object') return undefined;
  const strings = ['level', 'category', 'topicName', 'type'];
  if (strings.some((key) => typeof last[key] !== 'string') || !Number.isFinite(last.at) || !Number.isFinite(last.topic)) return undefined;
  if (!stats.byDifficulty[last.d] || !isPercent(last.p) || typeof last.newBest !== 'boolean') return undefined;
  return { at: last.at, level: last.level, category: last.category, topic: last.topic, topicName: last.topicName, type: last.type, d: last.d, p: last.p, newBest: last.newBest };
}

// Saved totals can be damaged or edited by hand: only the expected shape is used, otherwise null.
function cleanStats(data) {
  if (!data || !data.byDifficulty || typeof data.byDifficulty !== 'object' || !data.byType || typeof data.byType !== 'object' || !Array.isArray(data.recent)) return null;
  const stats = emptyStats();
  for (const d of CONFIG.DIFFICULTIES) {
    const entry = data.byDifficulty[d.id];
    if (entry === undefined) continue;
    if (!entry || !Number.isFinite(entry.plays) || !Number.isFinite(entry.sum) || entry.plays < 0 || entry.sum < 0 || !isPercent(entry.best)) return null;
    stats.byDifficulty[d.id] = { plays: Math.floor(entry.plays), sum: entry.sum, best: entry.best };
  }
  for (const type of CONFIG.TYPES) {
    const count = data.byType[type.id];
    if (count === undefined) continue;
    if (!Number.isFinite(count) || count < 0) return null;
    stats.byType[type.id] = Math.floor(count);
  }
  for (const item of data.recent) {
    if (!item || !stats.byDifficulty[item.d] || !isPercent(item.p)) return null;
  }
  stats.recent = data.recent.slice(0, CONFIG.OVERALL_RECENT_COUNT).map((item) => ({ d: item.d, p: item.p }));
  const last = cleanLast(data.last === undefined ? null : data.last, stats);
  if (last === undefined) return null;
  stats.last = last;
  return stats;
}

// Adds one history record to the totals. Only a finished, graded play of a known difficulty counts. Returns true when it counted.
function addToStats(stats, play) {
  if (!play || typeof play !== 'object' || play.end !== 'finished' || play.graded === false) return false;
  const entry = stats.byDifficulty[play.difficulty];
  const score = Number(play.score);
  const max = Number(play.max);
  if (!entry || !Number.isFinite(score) || !(max > 0)) return false;
  const percent = Math.min(100, Math.max(0, (score / max) * 100));
  const newBest = entry.plays >= 2 && percent >= entry.best + 1;
  entry.plays += 1;
  entry.sum += percent;
  entry.best = Math.max(entry.best, percent);
  if (Object.prototype.hasOwnProperty.call(stats.byType, play.type)) stats.byType[play.type] += 1;
  stats.recent.unshift({ d: play.difficulty, p: percent });
  stats.recent.length = Math.min(stats.recent.length, CONFIG.OVERALL_RECENT_COUNT);
  stats.last = {
    at: Number(play.at) || 0, level: String(play.level || ''), category: String(play.category || ''), topic: Number(play.topic) || 0,
    topicName: String(play.topicName || ''), type: String(play.type || ''), d: play.difficulty, p: percent, newBest,
  };
  return true;
}

// plays: history records, newest first (they are added oldest first, so the newest ends up first in the recent list)
function statsFromPlays(plays) {
  const stats = emptyStats();
  plays.slice().reverse().forEach((play) => addToStats(stats, play));
  return stats;
}

// Writes the totals. Returns false when the storage is blocked or full.
function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return true;
  } catch (e) {
    return false;
  }
}

// The saved totals, or null when they must not be written: the storage is blocked, or they were saved by a newer version of the game.
// When no totals are saved yet (the very first time) or they are damaged (the old text goes to the backup slot), they are built once
// from the plays in the history. A reset saves empty totals instead of removing them, so a reset is never built again from the history.
function loadStats() {
  let text;
  try { text = localStorage.getItem(STATS_KEY); } catch (e) { return null; }
  if (text !== null) {
    try {
      const data = JSON.parse(text);
      if (data && typeof data.v === 'number' && data.v > STATS_VERSION) return null;
      const stats = data && data.v === STATS_VERSION ? cleanStats(data) : null;
      if (stats) return stats;
    } catch (e) { /* damaged: handled below */ }
    try { localStorage.setItem(STATS_BACKUP_KEY, text); } catch (e) { /* ignore */ }
  }
  const history = loadHistory();
  if (!history) return null;
  const stats = statsFromPlays(history.plays);
  saveStats(stats);
  return stats;
}

// Called by recordPlay() before the new play is put in the history, so a first-time build from the history does not count it twice.
// It does not depend on the history being saved, and it never throws.
function recordStats(play) {
  try {
    const stats = loadStats();
    if (!stats || !addToStats(stats, play)) return false;
    return saveStats(stats);
  } catch (e) {
    return false;
  }
}

// "Reset calculation": empty totals (and an empty recent list), kept as saved empty totals. Does not touch the history.
// The backup of damaged totals is removed too. Returns false when the storage is blocked.
function resetStats() {
  try { localStorage.removeItem(STATS_BACKUP_KEY); } catch (e) { /* ignore */ }
  return saveStats(emptyStats());
}

// Which of the five comments fits a whole score (what the student sees): 0 below the first limit of CONFIG.OVERALL_COMMENT_BANDS,
// up to 4 at or above the last. It takes the rounded score, so the comment never disagrees with the number on the screen.
function overallBand(score) {
  return CONFIG.OVERALL_COMMENT_BANDS.filter((limit) => score >= limit).length;
}

// The overall result from the totals: { plays, overall, byDifficulty }. Every play counts as many times as the weight of its
// difficulty (CONFIG.DIFFICULTIES), so a harder quiz counts more. overall and each byDifficulty value are percents (0 to 100),
// null when there is nothing to average. recentOnly: use only the newest CONFIG.OVERALL_RECENT_COUNT plays ("Recent plays")
// instead of all plays. Not rounded: the screen rounds.
function overallResult(stats, recentOnly) {
  let source = stats.byDifficulty;
  if (recentOnly) {
    source = emptyStats().byDifficulty;
    stats.recent.forEach((item) => { source[item.d].plays += 1; source[item.d].sum += item.p; });
  }
  let weighted = 0;
  let weights = 0;
  let plays = 0;
  const byDifficulty = {};
  CONFIG.DIFFICULTIES.forEach((d) => {
    const entry = source[d.id];
    byDifficulty[d.id] = entry.plays ? entry.sum / entry.plays : null;
    weighted += d.weight * entry.sum;
    weights += d.weight * entry.plays;
    plays += entry.plays;
  });
  return { plays, overall: weights ? weighted / weights : null, byDifficulty };
}
