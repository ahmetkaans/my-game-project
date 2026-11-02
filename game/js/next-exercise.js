/* js/next-exercise.js - the order of the next quiz, the main menu pop-up, the end-of-category pop-up
   Provides: getNextExercise, levelCategoryLabel, openHomeConfirm, goHome, goToNextExercise, goToNextExerciseAsking,
             openNextExercise
   Needs: CONFIG, state, t, getTopics, isInUnfinished, showScreen, openModal, closeModal, openUnfinishedConfirm */
'use strict';
/* =========================================================================
 * NEXT EXERCISE  (results screen: difficulty -> question type -> topic; the student chooses at the end of a category)
 * ========================================================================= */
// The next quiz after `nav`: { nav } for the next quiz, { options: [{ nav }] } when the category's topics are finished
// (the student decides where to go), or null after the very last quiz.
function getNextExercise(nav) {
  const diffs = CONFIG.DIFFICULTIES;
  const types = CONFIG.TYPES;
  const d = diffs.findIndex((x) => x.id === nav.difficulty);
  if (d < diffs.length - 1) return { nav: { ...nav, difficulty: diffs[d + 1].id } };
  const t = types.findIndex((x) => x.id === nav.type);
  if (t < types.length - 1) return { nav: { ...nav, type: types[t + 1].id, difficulty: diffs[0].id } };
  if (nav.topic < getTopics(nav).length - 1) {
    return { nav: { ...nav, topic: nav.topic + 1, type: types[0].id, difficulty: diffs[0].id } };
  }
  const start = (level, category) => ({ ...nav, level, category, topic: 0, type: types[0].id, difficulty: diffs[0].id });
  const c = CONFIG.CATEGORIES.findIndex((x) => x.id === nav.category);
  const l = CONFIG.LEVELS.indexOf(nav.level);
  const options = [];
  if (c < CONFIG.CATEGORIES.length - 1) options.push({ nav: start(nav.level, CONFIG.CATEGORIES[c + 1].id) });
  if (l < CONFIG.LEVELS.length - 1) options.push({ nav: start(CONFIG.LEVELS[l + 1], CONFIG.CATEGORIES[0].id) });
  return options.length ? { options } : null;
}

function levelCategoryLabel(nav) {
  return `${nav.level} ${t(`category.${nav.category}`)}`;
}

// Asks before leaving the current screen for the level screen (the top bar's Main menu button).
function openHomeConfirm() {
  openModal({
    title: t('homeTitle'),
    body: t('homeBody'),
    dismissible: true,
    buttons: [
      { label: t('no'), onClick: closeModal },
      { label: t('yes'), primary: true, onClick: () => { closeModal(); goHome(); } },
    ],
  });
}

function goHome() {
  state.quiz = null;
  showScreen('level');
}

// Opens the Difficulty screen of the next quiz and marks it; the student presses it to start.
function goToNextExercise(nav) {
  Object.assign(state.nav, nav);
  state.quiz = null;
  closeModal();
  state.nextHint = { difficulty: nav.difficulty };
  showScreen('difficulty');
}

// Same as goToNextExercise, but asks first when the next quiz sits in a part without real questions and the quiz that
// was just played does not (finished -> unfinished): "Go back" stays on the results screen, "Go there" continues.
// Moving from one unfinished part to another does not ask again.
function goToNextExerciseAsking(nav) {
  if (isInUnfinished(nav) && !isInUnfinished(state.nav)) {
    closeModal();
    openUnfinishedConfirm(() => goToNextExercise(nav));
  } else {
    goToNextExercise(nav);
  }
}

function openNextExercise() {
  const next = getNextExercise(state.nav);
  if (!next) return;
  if (next.nav) { goToNextExerciseAsking(next.nav); return; }
  const here = levelCategoryLabel(state.nav);
  openModal({
    title: t('endTitle', { here }),
    body: t('endBody', { here }),
    buttons: [
      ...next.options.map((o, i) => ({ label: levelCategoryLabel(o.nav), primary: i === 0, onClick: () => goToNextExerciseAsking(o.nav) })),
      { label: t('mainMenu'), onClick: () => { closeModal(); goHome(); } },
    ],
    dismissible: true,
  });
}

