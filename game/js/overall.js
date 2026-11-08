/* js/overall.js - the overall result: running totals of the finished plays per difficulty, saved in the browser (recording and maths only for now)
   Provides: STATS_KEY, STATS_BACKUP_KEY, STATS_VERSION, emptyStats, cleanStats, addToStats, statsFromPlays, loadStats, saveStats,
             recordStats, resetStats, overallBand, overallResult
   Needs: CONFIG, loadHistory */
'use strict';
/* =========================================================================
 * OVERALL RESULT  (totals and maths only for now; README.md, "Overall result")
 * Saved in localStorage "lg-stats" as { v, byDifficulty: { easy: { plays, sum }, ... }, recent: [ { d, p }, ... ] }:
 * how many finished plays of each difficulty and the sum of their scores as percents of the maximum, and the newest
 * CONFIG.OVERALL_RECENT_COUNT plays (difficulty and percent, newest first) for the "Recent plays" view. It is a store of its own
 * (not read from the history list), so clearing the history or the 500-play limit never changes it. Quit plays and ungraded
 * plays never count.
 * ========================================================================= */
const STATS_KEY = 'lg-stats';
const STATS_BACKUP_KEY = 'lg-stats-backup'; // the old text of damaged totals is kept here (one slot)
const STATS_VERSION = 1;

function emptyStats() {
  const byDifficulty = {};
  CONFIG.DIFFICULTIES.forEach((d) => { byDifficulty[d.id] = { plays: 0, sum: 0 }; });
  return { v: STATS_VERSION, byDifficulty, recent: [] };
}

// Saved totals can be damaged or edited by hand: only the expected shape is used, otherwise null.
function cleanStats(data) {
  if (!data || !data.byDifficulty || typeof data.byDifficulty !== 'object' || !Array.isArray(data.recent)) return null;
  const stats = emptyStats();
  for (const d of CONFIG.DIFFICULTIES) {
    const entry = data.byDifficulty[d.id];
    if (entry === undefined) continue;
    if (!entry || !Number.isFinite(entry.plays) || !Number.isFinite(entry.sum) || entry.plays < 0 || entry.sum < 0) return null;
    stats.byDifficulty[d.id] = { plays: Math.floor(entry.plays), sum: entry.sum };
  }
  for (const item of data.recent) {
    if (!item || !stats.byDifficulty[item.d] || !Number.isFinite(item.p) || item.p < 0 || item.p > 100) return null;
  }
  stats.recent = data.recent.slice(0, CONFIG.OVERALL_RECENT_COUNT).map((item) => ({ d: item.d, p: item.p }));
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
  entry.plays += 1;
  entry.sum += percent;
  stats.recent.unshift({ d: play.difficulty, p: percent });
  stats.recent.length = Math.min(stats.recent.length, CONFIG.OVERALL_RECENT_COUNT);
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
