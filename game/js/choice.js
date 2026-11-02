/* js/choice.js - the question screens, part 1: Multiple Choice and True or False (the RENDERERS section continues in fill.js and match.js)
   Provides: renderChoiceButtons, choicePoints, submitChoice, renderMC, renderTF
   Needs: CONFIG, el, state, submitAnswer */
'use strict';
/* =========================================================================
 * RENDERERS (one per question type)
 * ========================================================================= */
function renderChoiceButtons(area, labels, correctIndex, onPick, extraClass = '') {
  const wrap = el('div', { class: `options ${extraClass}`.trim() });
  labels.forEach((label, i) => {
    const btn = el('button', { class: 'option', text: label });
    btn.addEventListener('click', () => {
      if (state.quiz.answered) return;
      const correct = i === correctIndex;
      btn.classList.add(correct ? 'is-correct' : 'is-wrong');
      wrap.children[correctIndex].classList.add('is-correct');
      onPick(correct, label);
    });
    wrap.append(btn);
  });
  area.append(wrap);
}

// Points for multiple choice / true or false / fill: +POINTS_CORRECT or −POINTS_INCORRECT.
function choicePoints(correct) {
  return correct ? CONFIG.POINTS_CORRECT : -CONFIG.POINTS_INCORRECT;
}

function submitChoice(correct, label) {
  submitAnswer(correct ? 'correct' : 'incorrect', label, choicePoints(correct));
}

function renderMC(q, area) {
  area.append(el('p', { class: 'prompt', text: q.prompt }));
  renderChoiceButtons(area, q.options, q.answer, submitChoice);
}

function renderTF(q, area) {
  area.append(el('p', { class: 'prompt', text: q.prompt }));
  renderChoiceButtons(area, ['True', 'False'], q.answer ? 0 : 1, submitChoice, 'two');
}

