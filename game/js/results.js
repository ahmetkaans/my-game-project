/* js/results.js - the results screen
   Provides: statusLabel, renderResultsContent, showResults
   Needs: launchConfetti, CONFIG, el, fmt, englishText, noteText, clampScore, state, $, t, questionText,
          correctAnswerText, showScreen, getNextExercise, stopTimer */
'use strict';
/* =========================================================================
 * RESULTS
 * ========================================================================= */
function statusLabel(rec, graded, type) {
  const pts = (n) => (graded ? ` (${n > 0 ? '+' : ''}${fmt(n)})` : ` (${t('notGraded')})`);
  if (rec.status === 'correct') return `${t('status.correct')}${pts(rec.points)}`;
  if (rec.status === 'partial') return `${t(type === 'fill' ? 'status.misspelled' : 'status.partial')}${pts(rec.points)}`;
  if (rec.status === 'incorrect') return `${t('status.incorrect')}${pts(rec.points)}`;
  if (rec.status === 'skipped') return t('status.skipped');
  return t(rec.timedOut ? 'status.timedOut' : 'status.unanswered');
}

// Builds everything on the results screen from state.quiz. Runs again when the language changes on this screen
// (no timer, screen change or confetti involved).
function renderResultsContent() {
  const quiz = state.quiz;
  const counts = { correct: 0, partial: 0, incorrect: 0, skipped: 0, unanswered: 0 };
  quiz.records.forEach((r) => { counts[r.status]++; });
  const finalScore = clampScore(quiz.score);
  const type = state.nav.type;

  $('#results-score').replaceChildren(...(quiz.graded
    ? [el('span', { class: 'score-num', text: fmt(finalScore) }), el('span', { class: 'score-max', text: ` / ${CONFIG.SCORE_MAX}` })]
    : [el('span', { class: 'score-na', text: t('scoreNotGraded') })]));
  $('#results-summary').replaceChildren(
    el('li', { text: `${t('count.correct')}: ${counts.correct}` }),
    ...(counts.partial ? [el('li', { text: `${t(type === 'fill' ? 'count.misspelled' : 'count.partial')}: ${counts.partial}` })] : []),
    el('li', { text: `${t('count.incorrect')}: ${counts.incorrect}` }),
    el('li', { text: `${t('count.skipped')}: ${counts.skipped}` }),
    el('li', { text: `${t('count.unanswered')}: ${counts.unanswered}` }),
  );

  $('#results-list').replaceChildren(...quiz.questions.map((q, i) => {
    const rec = quiz.records[i];
    const row = (label, value) => el('p', {}, [el('span', { class: 'label', text: `${label}: ` }), value]);
    const children = [
      el('p', {}, [el('strong', {}, [`${t('questionNumber', { n: i + 1 })} `, englishText(questionText(q))])]),
      row(t('yourAnswer'), englishText(rec.userAnswer ?? '—')),
      row(t('correctAnswer'), englishText(correctAnswerText(q))),
      row(t('result'), statusLabel(rec, quiz.graded, q.type)),
    ];
    if (rec.note) children.push(row(t('note'), noteText(rec.note)));
    if (rec.extensionUsed) {
      children.push(row(t('extraTime'), quiz.graded ? `${t('used')} (${fmt(rec.penalty)})` : t('used')));
    }
    children.push(row(t('explanation'), englishText(q.explanation)));
    return el('li', { class: `st-${rec.status}` }, children);
  }));

  $('#results-next').hidden = !getNextExercise(state.nav);   // hidden after the very last quiz
}

function showResults() {
  stopTimer();
  const quiz = state.quiz;
  renderResultsContent();
  showScreen('results');
  const finalScore = clampScore(quiz.score);
  const minScore = state.nav.type === 'match' ? CONFIG.CONFETTI_MIN_MATCH_SCORE : CONFIG.CONFETTI_MIN_SCORE;
  if (quiz.graded && finalScore >= minScore) launchConfetti();
}

