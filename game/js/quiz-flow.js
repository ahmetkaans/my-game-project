/* js/quiz-flow.js - starting a quiz, the words pop-up, one question, answering, quitting
   Provides: startQuiz, quizTargetWords, glossarySenses, openWordPreview, currentQuestion, currentRecord,
             renderQuestion, updateScoreDisplay, submitAnswer, goNext, skipQuestion, requestQuit
   Needs: CONFIG, el, fmt, englishText, noteText, hashString, mulberry32, makeLorem, state, $, playSound, t, GLOSSARY,
          quizKey, getQuestions, prepareQuiz, correctAnswerText, showScreen, getQuestionSeconds, openModal,
          closeModal, startTimer, resumeTimer, pauseTimer, stopTimer, renderFillTap, RENDERERS, showResults, sinkWalker */
'use strict';
/* =========================================================================
 * QUIZ FLOW
 * ========================================================================= */
function startQuiz() {
  if (sinkWalker(startQuiz)) return; // Trick or Treat: a walker still on screen sinks into the ground first, then the quiz starts
  stopTimer();
  closeModal();
  const questions = prepareQuiz(getQuestions(state.nav), quizKey(state.nav));
  state.quiz = {
    questions,
    index: 0,
    score: 0,                                   // raw running score, may go negative
    graded: !CONFIG.UNGRADED_TYPES.includes(state.nav.type),
    records: questions.map(() => ({
      status: 'unanswered',                     // correct | partial | incorrect | skipped | unanswered
      userAnswer: null,
      note: null,                               // partial: { key, params } of a text (spellingWarning / pairsCorrect), shown by noteText()
      points: 0,                                // points from answering
      penalty: 0,                               // points lost to the time extension
      extensionUsed: false,
      timedOut: false,                          // true if this question ended the game
    })),
    timer: { totalMs: 0, remainingMs: 0, intervalId: null, lastTs: 0, extension: false, lastTickSecond: null },
    answered: false,                            // current question locked?
    over: false,
    recorded: false,                            // true once recordPlay() has saved this play in the history
    ui: {},                                     // per-question renderer state
  };
  showScreen('quiz');
  // The "Words in this game" pop-up comes first (also on Retry); the timer starts when it closes.
  $('#quiz-question').replaceChildren();
  $('#quiz-feedback').hidden = true;
  $('#quiz-next').hidden = true;
  openWordPreview(() => { closeModal(); renderQuestion(); });
}

// The words a quiz tests, in order of appearance, without repeats: [{ word, type }].
// type = the word type used in this quiz (q.targetType / pair.type); needed when a word has several types.
// q.target (optional on mc / fill) = the dictionary form when the answer is another form ("laughs" -> "laugh").
function quizTargetWords(questions) {
  const words = new Map();
  const add = (word, type) => { if (word && !words.has(word)) words.set(word, { word, type: type || null }); };
  questions.forEach((q) => {
    if (q.type === 'mc') add(q.target || q.options[q.answer], q.targetType);
    else if (q.type === 'fill') add(q.target || q.answer, q.targetType);
    else if (q.type === 'tf') add(q.target, q.targetType);
    else if (q.type === 'match') q.pairs.forEach((p) => add(p.left, p.type));
  });
  return [...words.values()];
}

// All senses of a word from GLOSSARY[level]: [{ type, meaning }]. An entry is one sense (object) or several
// (array, one per word type). Lorem quizzes get a lorem placeholder.
function glossarySenses(level, word) {
  const entry = (GLOSSARY[level] || {})[word.toLowerCase()];
  if (entry) return [].concat(entry);
  const L = makeLorem(mulberry32(hashString(`glossary|${word}`)));
  return [{ type: L.words(1)[0], meaning: L.sentence(3, 6, '') }];
}

function openWordPreview(start) {
  const level = state.nav.level;
  const list = el('ul', { class: 'word-list', lang: 'en' }, quizTargetWords(state.quiz.questions).map(({ word, type }) => {
    const senses = glossarySenses(level, word);
    const used = type || senses[0].type;   // one sense: that one is used
    // Every word type of the word is shown; the one used in this game is underlined.
    return el('li', {}, [
      el('span', { class: 'word', text: word }),
      ...senses.map((s) => el('p', { class: 'word-sense' }, [
        el('span', { class: `word-type${s.type === used ? ' is-used' : ''}`, text: s.type }),
        ` ${s.meaning}`,
      ])),
    ]);
  }));
  openModal({
    title: t('wordsTitle'),
    body: list,
    buttons: [{ label: t('start'), primary: true, onClick: start }],
    // The arrow leaves before the quiz begins: same place as Quit, the Difficulty screen (nothing was answered yet)
    onBack: () => { closeModal(); state.quiz = null; showScreen('difficulty'); },
  });
}

function currentQuestion() {
  return state.quiz.questions[state.quiz.index];
}

function currentRecord() {
  return state.quiz.records[state.quiz.index];
}

function renderQuestion() {
  const quiz = state.quiz;
  const q = currentQuestion();
  quiz.answered = false;
  quiz.ui = {};
  $('#quiz-progress').textContent = t('questionOf', { n: quiz.index + 1, total: quiz.questions.length });
  updateScoreDisplay();
  $('#quiz-feedback').hidden = true;
  $('#quiz-next').hidden = true;
  const area = $('#quiz-question');
  area.replaceChildren();
  (q.type === 'fill' && state.smartBoard ? renderFillTap : RENDERERS[q.type])(q, area);
  startTimer(getQuestionSeconds(), false);
}

function updateScoreDisplay() {
  const quiz = state.quiz;
  $('#quiz-score').textContent = quiz.graded ? `${t('score')}: ${fmt(quiz.score)}` : t('scoreNotGraded');
}

/*
 * outcome: 'correct' | 'partial' | 'incorrect'. points: what the answer earns (renderers compute it,
 * see questionPoints()). note: { key, params } of a text, shown for partial answers (spelling warning, pairs count).
 */
function submitAnswer(outcome, userAnswer, points, note = null) {
  const quiz = state.quiz;
  if (!quiz || quiz.answered) return;
  quiz.answered = true;
  stopTimer();

  const q = currentQuestion();
  const rec = currentRecord();
  rec.status = outcome;
  rec.userAnswer = userAnswer;
  rec.note = note;
  if (quiz.graded) {
    rec.points = points;
    quiz.score += rec.points;
  }
  updateScoreDisplay();
  playSound({ correct: 'correct', partial: 'partial', incorrect: 'wrong' }[outcome]);

  const area = $('#quiz-question');
  area.querySelectorAll('button, input').forEach((b) => { b.disabled = true; });
  // Renderers mark the right element(s) with .is-correct before calling submitAnswer.
  if (outcome === 'correct') area.querySelectorAll('.is-correct').forEach((node) => node.classList.add('pop'));

  const fb = $('#quiz-feedback');
  fb.className = `feedback ${{ correct: 'ok', partial: 'partial', incorrect: 'bad' }[outcome]}`;
  const heading = t({ correct: 'feedback.correct', partial: q.type === 'fill' ? 'feedback.almost' : 'feedback.partial', incorrect: 'feedback.incorrect' }[outcome]);
  const lines = [el('p', {}, [el('strong', { text: heading })])];
  if (note) lines.push(el('p', { text: noteText(note) }));
  // The answer and the explanation are English content: they carry lang="en" inside the (maybe Turkish) line.
  const labelled = (key, value) => el('p', {}, [`${t(key)}: `, englishText(value)]);
  if (outcome === 'correct') {
    lines.push(labelled('answer', correctAnswerText(q)));
  } else {
    lines.push(labelled('correctAnswer', correctAnswerText(q)));
    lines.push(labelled('explanation', q.explanation));
  }
  if (quiz.graded) lines.push(el('p', { class: 'points', text: `${t('points')}: ${points > 0 ? '+' : ''}${fmt(points)}` }));
  fb.replaceChildren(...lines);
  fb.hidden = false;

  const next = $('#quiz-next');
  next.textContent = t(quiz.index === quiz.questions.length - 1 ? 'seeResults' : 'next');
  next.hidden = false;
  next.focus();
}

function goNext() {
  const quiz = state.quiz;
  if (quiz.index < quiz.questions.length - 1) {
    quiz.index++;
    renderQuestion();
  } else {
    showResults();
  }
}

function skipQuestion() {
  const quiz = state.quiz;
  quiz.answered = true;
  currentRecord().status = 'skipped';
  goNext();
}

function requestQuit() {
  const quiz = state.quiz;
  const wasRunning = quiz.timer.intervalId !== null;
  pauseTimer();
  openModal({
    title: t('quitTitle'),
    body: t('quitBody'),
    buttons: [
      { label: t('cancel'), primary: true, onClick: () => { closeModal(); if (wasRunning) resumeTimer(); } },
      { label: t('quit'), onClick: () => { closeModal(); stopTimer(); state.quiz = null; showScreen('difficulty'); } },
    ],
  });
}

