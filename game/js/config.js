/* js/config.js - every tunable number, the level groups, categories, types and difficulties
   Provides: CONFIG
   Needs: (none) */
'use strict';

/* =========================================================================
 * CONFIG — every tunable number lives here. See README.md "Configuration".
 * ========================================================================= */
const CONFIG = {
  LEVELS: ['A1', 'A2', 'B1', 'B2', 'C1'],
  // Level screen: the buttons are shown in these groups. The group headings and the level names
  // ("levelGroup.A", "levelName.A1") and the names of categories, types and difficulties are texts: see I18N.
  LEVEL_GROUPS: [
    { id: 'A', levels: ['A1', 'A2'] },
    { id: 'B', levels: ['B1', 'B2'] },
    { id: 'C', levels: ['C1'] },
  ],
  CATEGORIES: [
    { id: 'vocabulary' },
    { id: 'grammar' },
  ],
  TYPES: [
    { id: 'mc' },
    { id: 'fill' },
    { id: 'tf' },
    { id: 'match' },
  ],
  DIFFICULTIES: [
    { id: 'easy', seconds: 60 },
    { id: 'medium', seconds: 45 },
    { id: 'hard', seconds: 30 },
    { id: 'veryhard', seconds: 20 },
  ],
  SAME_DURATION_SECONDS: 60,     // used for every difficulty when the switch is ON
  QUESTIONS_PER_QUIZ: 8,
  POINTS_CORRECT: 12.5,
  POINTS_INCORRECT: 6,           // subtracted
  EXTENSION_SECONDS: 10,
  EXTENSION_PENALTY: 10,         // subtracted
  SCORE_MIN: 0,                  // clamp applied only on the results screen
  SCORE_MAX: 100,
  UNGRADED_TYPES: [],            // types that give/take no points (none since matching is graded)
  MC_OPTIONS: 4,
  MC_MAX_SAME_POSITION_IN_A_ROW: 2, // correct answer never in the same position more often in a row
  MATCH_PAIRS: 4,
  MATCH_MIN_QUESTIONS: 2,        // matching quizzes have a variable length (see README.md)
  MATCH_MAX_LOREM_QUESTIONS: 4,  // lorem matching quizzes: 2..this questions
  FILL_BANK_MIN: 3,
  FILL_BANK_MAX: 4,
  FILL_MISSPELLED_SHARE: 0.5,    // misspelled fill answer: this share of POINTS_CORRECT, no penalty
  SPELL_EXACT_MAX_LENGTH: 3,     // answers up to this many letters must be typed exactly (no "misspelled" half points)
  SPELL_SHORT_MAX_LENGTH: 5,     // answers up to this many letters count as "short"
  SPELL_MAX_EDITS_SHORT: 1,      // allowed spelling differences for short answers
  SPELL_MAX_EDITS_LONG: 2,       // allowed spelling differences for longer answers
  TIMER_TICK_MS: 100,
  TIMER_LOW_RATIO: 0.25,         // timer bar pulses below this fraction
  TICK_LAST_SECONDS: 5,          // tick sound in the last N seconds (normal and extra time)
  CONFETTI_MIN_SCORE: 80,        // final score >= this (multiple choice, fill, true/false)
  CONFETTI_MIN_MATCH_SCORE: 75,  // matching: final score >= this
  CONFETTI_COUNT: 90,
  CONFETTI_MS: 2800,
  TREE_CLOSE_MS: 280,            // menu tree: how long the close animation runs before the panel is hidden (matches the CSS)
  HISTORY_MAX: 500,              // finished plays kept in the history; when it is full the oldest are dropped first
  HISTORY_PAGE_SIZE: 10,         // History screen: rows shown at first, and added by each press of "More"
  HALLOWEEN_WALKER_DELAY_SECONDS: 3,        // Trick or Treat: the walker starts this long after the page opens (or after the switch is turned on)
  HALLOWEEN_WALKER_STOP_SECONDS: 2.5,       // it stops this long, and looks back
  HALLOWEEN_WALKER_SPEED: 28,               // walking speed in px per second, the same on every screen width (a calm walk; its feet and rope are made for it)
  HALLOWEEN_WALKER_TUGS_BEFORE_STOP: [2.5, 5.8], // seconds after the start: hard tugs on the rope before the stop
  HALLOWEEN_WALKER_TUGS_AFTER_STOP: [3.5, 8],    // seconds after it walks on again
  HALLOWEEN_WALKER_SINK_SECONDS: 2.2,       // sinking into the ground when a quiz starts (the quiz waits this long)
};

