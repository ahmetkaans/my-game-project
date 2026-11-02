/* js/questions.js - the quiz key, which parts have real questions, getting and shuffling questions, lorem questions, checking a typed Fill answer
   Provides: quizKey, hasRealQuizzes, isInUnfinished, getQuestions, generateLoremQuestions, prepareQuiz,
             balancedPositions, editDistance, normalizeAnswer, judgeFill, questionText, correctAnswerText
   Needs: CONFIG, hashString, mulberry32, makeLorem, QUESTION_BANK, fillBefore, fillAfter */
'use strict';
/* =========================================================================
 * QUESTIONS
 * ========================================================================= */
function quizKey(nav) {
  return `${nav.level}|${nav.category}|${nav.topic}|${nav.type}|${nav.difficulty}`;
}

// True when the question bank holds at least one real quiz below the given parts: hasRealQuizzes('A1'),
// hasRealQuizzes('A1', 'vocabulary'), hasRealQuizzes('A1', 'vocabulary', 1). Everything else shows lorem ipsum quizzes.
// This is how the menus know which buttons are "not finished" (they follow the data, nothing to edit by hand).
function hasRealQuizzes(...parts) {
  const prefix = `${parts.join('|')}|`;
  return Object.keys(QUESTION_BANK).some((key) => key.startsWith(prefix));
}

// True when a quiz (a full nav: level, category, topic) sits in a part that has no real questions yet.
function isInUnfinished(nav) {
  return !hasRealQuizzes(nav.level) || !hasRealQuizzes(nav.level, nav.category) || !hasRealQuizzes(nav.level, nav.category, nav.topic);
}

// Stored shapes: the correct answer is first (mc options[0], fill bank[0]); prepareQuiz() shuffles.
function getQuestions(nav) {
  const bank = QUESTION_BANK[quizKey(nav)];
  if (nav.type === 'match') {
    // Matching quizzes have a variable length: use every question of the entry.
    if (bank && bank.length >= CONFIG.MATCH_MIN_QUESTIONS) return bank;
  } else if (bank && bank.length >= CONFIG.QUESTIONS_PER_QUIZ) {
    return bank.slice(0, CONFIG.QUESTIONS_PER_QUIZ);
  }
  return generateLoremQuestions(nav);
}

function generateLoremQuestions(nav) {
  const L = makeLorem(mulberry32(hashString(quizKey(nav))));
  const count = nav.type === 'match'
    ? L.int(CONFIG.MATCH_MIN_QUESTIONS, CONFIG.MATCH_MAX_LOREM_QUESTIONS)
    : CONFIG.QUESTIONS_PER_QUIZ;
  const questions = [];
  for (let i = 0; i < count; i++) {
    const explanation = L.sentence(10, 16);
    if (nav.type === 'mc') {
      questions.push({ type: 'mc', prompt: L.sentence(6, 10, '?'), options: L.words(CONFIG.MC_OPTIONS), explanation });
    } else if (nav.type === 'tf') {
      const prompt = L.sentence(6, 10);
      questions.push({ type: 'tf', prompt, answer: i % 2 === 0, target: prompt.split(' ')[1], explanation });
    } else if (nav.type === 'fill') {
      const length = L.int(6, 9);                        // words in sentence incl. the blank
      const bankSize = L.int(CONFIG.FILL_BANK_MIN, CONFIG.FILL_BANK_MAX);
      const all = L.words(length - 1 + bankSize);
      const sentenceWords = all.slice(0, length - 1);
      const bankWords = all.slice(length - 1);           // bankWords[0] is the answer
      const pos = L.int(1, length - 2);                  // blank never first or last
      sentenceWords[0] = L.capitalize(sentenceWords[0]);
      questions.push({
        type: 'fill',
        before: sentenceWords.slice(0, pos).join(' '),
        after: sentenceWords.slice(pos).join(' ') + '.',
        answer: bankWords[0],
        bank: bankWords,
        explanation,
      });
    } else if (nav.type === 'match') {
      const w = L.words(CONFIG.MATCH_PAIRS * 2);
      const pairs = [];
      for (let p = 0; p < CONFIG.MATCH_PAIRS; p++) pairs.push({ left: w[p], right: w[p + CONFIG.MATCH_PAIRS] });
      questions.push({ type: 'match', prompt: L.sentence(5, 8), pairs, explanation });
    }
  }
  // Lorem true/false: 4 true and 4 false in a mixed (seeded) order, like real quizzes.
  return nav.type === 'tf' ? L.shuffle(questions) : questions;
}

/*
 * Mindful shuffling, seeded by the quiz key so Retry shows exactly the same quiz.
 * Returns copies; the stored questions are never changed.
 * - mc: each position holds the correct answer equally often (8 questions → each position twice),
 *       never more than MC_MAX_SAME_POSITION_IN_A_ROW times in a row. Sets q.answer (index).
 * - fill: bank order shuffled.
 * - match: right-side order shuffled, never the same order as the left side. Sets q.rightOrder.
 */
function prepareQuiz(questions, key) {
  const L = makeLorem(mulberry32(hashString(`shuffle|${key}`)));
  const mcCount = questions.filter((q) => q.type === 'mc').length;
  const positions = balancedPositions(mcCount, CONFIG.MC_OPTIONS, CONFIG.MC_MAX_SAME_POSITION_IN_A_ROW, L);
  let mcIndex = 0;
  return questions.map((q) => {
    if (q.type === 'mc') {
      const [correct, ...wrong] = q.options;
      const options = L.shuffle(wrong);
      const answer = positions[mcIndex++];
      options.splice(answer, 0, correct);
      return { ...q, options, answer };
    }
    if (q.type === 'fill') return { ...q, bank: L.shuffle(q.bank) };
    if (q.type === 'match') {
      const identity = q.pairs.map((_, i) => i);
      let order = L.shuffle(identity);
      while (order.every((v, i) => v === i)) order = L.shuffle(identity);
      return { ...q, rightOrder: order };
    }
    return { ...q };
  });
}

function balancedPositions(count, slots, maxRun, L) {
  const list = Array.from({ length: count }, (_, i) => i % slots);
  const runTooLong = (arr) => arr.some((_, i) => i >= maxRun && arr.slice(i - maxRun, i + 1).every((v) => v === arr[i]));
  let order = L.shuffle(list);
  for (let tries = 0; tries < 200 && runTooLong(order); tries++) order = L.shuffle(list);
  return order;
}

// Spelling: optimal string alignment distance (insert, delete, replace, or swap of two neighbors = 1).
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function normalizeAnswer(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[‘’]/g, "'");
}

// Typed fill answer → 'correct' | 'misspelled' | 'incorrect' (see README.md "Typed Fill in the Blanks").
function judgeFill(input, q) {
  const typed = normalizeAnswer(input);
  const answer = normalizeAnswer(q.answer);
  const others = q.bank.map(normalizeAnswer).filter((w) => w !== answer);
  if (typed === answer) return 'correct';
  if (others.includes(typed)) return 'incorrect';
  if (answer.length <= CONFIG.SPELL_EXACT_MAX_LENGTH) return 'incorrect'; // very short answers (hi, oh, one, six) must be exact: one wrong letter often makes another real word
  const allowed = answer.length <= CONFIG.SPELL_SHORT_MAX_LENGTH ? CONFIG.SPELL_MAX_EDITS_SHORT : CONFIG.SPELL_MAX_EDITS_LONG;
  const toAnswer = editDistance(typed, answer);
  const closerToAnswer = others.every((w) => toAnswer < editDistance(typed, w));
  return toAnswer <= allowed && closerToAnswer ? 'misspelled' : 'incorrect';
}

function questionText(q) {
  if (q.type === 'fill') return `${fillBefore(q.before)}___${fillAfter(q.after)}`;
  return q.prompt;
}

function correctAnswerText(q) {
  if (q.type === 'mc') return q.options[q.answer];
  if (q.type === 'tf') return q.answer ? 'True' : 'False';
  if (q.type === 'fill') return q.answer;
  if (q.type === 'match') return q.pairs.map((p) => `${p.left} → ${p.right}`).join('; ');
  return '';
}

