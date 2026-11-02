/* js/match.js - the question screens, part 3: Matching, and the list that maps each question type to its screen
   Provides: renderMatch, RENDERERS
   Needs: CONFIG, el, state, t, submitAnswer, renderMC, renderTF, renderFill */
'use strict';
function renderMatch(q, area) {
  const ui = { selectedLeft: null, pairs: new Map(), leftBtns: [], rightBtns: [] };
  const leftCol = el('div', { class: 'match-col' });
  const rightCol = el('div', { class: 'match-col' });

  const refresh = () => {
    ui.leftBtns.forEach((btn, i) => {
      btn.classList.toggle('is-selected', ui.selectedLeft === i);
      if (ui.pairs.has(i)) btn.dataset.pair = i + 1; else delete btn.dataset.pair;
    });
    ui.rightBtns.forEach((btn, ri) => {
      const left = [...ui.pairs].find(([, r]) => r === ri);
      if (left) btn.dataset.pair = left[0] + 1; else delete btn.dataset.pair;
    });
    ui.check.disabled = ui.pairs.size !== q.pairs.length;
  };

  q.pairs.forEach((pair, i) => {
    const btn = el('button', { class: 'match-item', text: pair.left });
    btn.addEventListener('click', () => {
      if (state.quiz.answered) return;
      if (ui.pairs.has(i)) {
        ui.pairs.delete(i);                       // clicking a paired item undoes the pair
        ui.selectedLeft = null;
      } else {
        ui.selectedLeft = ui.selectedLeft === i ? null : i;
      }
      refresh();
    });
    ui.leftBtns[i] = btn;
    leftCol.append(btn);
  });

  q.rightOrder.forEach((ri) => {
    const btn = el('button', { class: 'match-item', text: q.pairs[ri].right });
    btn.addEventListener('click', () => {
      if (state.quiz.answered) return;
      const existing = [...ui.pairs].find(([, r]) => r === ri);
      if (existing) {
        ui.pairs.delete(existing[0]);
      } else if (ui.selectedLeft !== null) {
        ui.pairs.set(ui.selectedLeft, ri);
        ui.selectedLeft = null;
      }
      refresh();
    });
    ui.rightBtns[ri] = btn;
    rightCol.append(btn);
  });

  ui.check = el('button', { class: 'primary check-btn', text: t('check'), disabled: true });
  ui.check.addEventListener('click', () => {
    if (state.quiz.answered) return;
    let correctPairs = 0;
    q.pairs.forEach((_, i) => {
      const ri = ui.pairs.get(i);
      const ok = ri === i;
      if (ok) correctPairs++;
      ui.leftBtns[i].classList.add(ok ? 'is-correct' : 'is-wrong');
      ui.rightBtns[ri].classList.add(ok ? 'is-correct' : 'is-wrong');
    });
    const userAnswer = q.pairs.map((p, i) => `${p.left} → ${q.pairs[ui.pairs.get(i)].right}`).join('; ');
    // Partial points: the quiz is worth SCORE_MAX in total; each correct pair earns its share. No penalty.
    const points = (CONFIG.SCORE_MAX / state.quiz.questions.length) * (correctPairs / q.pairs.length);
    const outcome = correctPairs === q.pairs.length ? 'correct' : correctPairs > 0 ? 'partial' : 'incorrect';
    const note = outcome === 'partial' ? { key: 'pairsCorrect', params: { n: correctPairs, total: q.pairs.length } } : null;
    submitAnswer(outcome, userAnswer, points, note);
  });

  area.append(
    el('p', { class: 'prompt', text: q.prompt }),
    el('div', { class: 'match-columns' }, [leftCol, rightCol]),
    ui.check,
  );
  state.quiz.ui = ui;
  refresh();
}

const RENDERERS = { mc: renderMC, tf: renderTF, fill: renderFill, match: renderMatch };

