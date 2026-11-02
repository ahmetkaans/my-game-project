/* js/fill.js - the question screens, part 2: Fill in the Blanks, typed and tapped (SmartBoard)
   Provides: fillBefore, fillAfter, renderFill, renderFillTap
   Needs: CONFIG, el, state, t, normalizeAnswer, judgeFill, submitAnswer */
'use strict';
// Typed fill: the word bank is shown above the sentence; the student types one word into the blank.
// Spaces around the blank like normal print: none after an opening quote ("___) and none before
// punctuation or a closing quote (___. / ___!" / ___,).
function fillBefore(text) { return !text || text.endsWith('"') ? text || '' : `${text} `; }
function fillAfter(text) { return !text || /^[.,!?;:"']/.test(text) ? text || '' : ` ${text}`; }

function renderFill(q, area) {
  const bank = el('div', { class: 'word-bank' }, q.bank.map((word) => el('span', { class: 'chip', text: word })));
  const input = el('input', {
    class: 'blank-input',
    type: 'text',
    autocomplete: 'off',
    autocorrect: 'off',
    autocapitalize: 'off',
    spellcheck: 'false',
    enterkeyhint: 'done',
    'aria-label': t('yourAnswer'),
  });
  const check = el('button', { class: 'primary check-btn', text: t('check'), disabled: true });
  const submit = () => {
    const typed = input.value.trim();
    if (!typed || state.quiz.answered) return;
    const result = judgeFill(typed, q);
    if (result === 'correct') {
      input.classList.add('is-correct');
      submitAnswer('correct', typed, CONFIG.POINTS_CORRECT);
    } else if (result === 'misspelled') {
      input.classList.add('is-partial');
      submitAnswer('partial', typed, CONFIG.POINTS_CORRECT * CONFIG.FILL_MISSPELLED_SHARE,
        { key: 'spellingWarning', params: { answer: q.answer, typed } });
    } else {
      input.classList.add('is-wrong');
      submitAnswer('incorrect', typed, -CONFIG.POINTS_INCORRECT);
    }
  };
  input.addEventListener('input', () => { check.disabled = !input.value.trim(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
  check.addEventListener('click', submit);
  area.append(
    el('p', { class: 'instructions', text: t('typeInstruction') }),
    bank,
    el('p', { class: 'prompt fill-sentence' }, [fillBefore(q.before), input, fillAfter(q.after)]),
    check,
  );
  state.quiz.ui = { input, check };
  input.focus({ preventScroll: true });
}

// SmartBoard mode: the same question, answered with taps. Tap a bank word and it goes into the blank;
// tap the placed word (or the blank) to take it back. No "misspelled" case: the word is right or wrong.
function renderFillTap(q, area) {
  const ui = { placed: null }; // index into q.bank of the word in the blank
  const chips = q.bank.map((word, i) => {
    const chip = el('button', { class: 'chip', type: 'button', text: word });
    chip.addEventListener('click', () => {
      if (state.quiz.answered) return;
      ui.placed = ui.placed === i ? null : i;         // tapping a word puts it in the blank (replacing another); tapping the placed one takes it back
      refresh();
    });
    return chip;
  });
  const slot = el('button', { class: 'blank-slot', type: 'button', 'aria-label': t('theBlank') });
  slot.addEventListener('click', () => {
    if (state.quiz.answered) return;
    ui.placed = null;                                 // tapping the word in the blank takes it out
    refresh();
  });
  const check = el('button', { class: 'primary check-btn', text: t('check'), disabled: true });
  const refresh = () => {
    chips.forEach((chip, i) => chip.classList.toggle('is-used', ui.placed === i));
    slot.textContent = ui.placed === null ? '' : q.bank[ui.placed];
    slot.classList.toggle('is-filled', ui.placed !== null);
    check.disabled = ui.placed === null;
  };
  check.addEventListener('click', () => {
    if (ui.placed === null || state.quiz.answered) return;
    const word = q.bank[ui.placed];
    if (normalizeAnswer(word) === normalizeAnswer(q.answer)) {
      slot.classList.add('is-correct');
      submitAnswer('correct', word, CONFIG.POINTS_CORRECT);
    } else {
      slot.classList.add('is-wrong');
      submitAnswer('incorrect', word, -CONFIG.POINTS_INCORRECT);
    }
  });
  area.append(
    el('p', { class: 'instructions', text: t('tapInstruction') }),
    el('div', { class: 'word-bank' }, chips),
    el('p', { class: 'prompt fill-sentence' }, [fillBefore(q.before), slot, fillAfter(q.after)]),
    check,
  );
  state.quiz.ui = ui;
  refresh();
}

