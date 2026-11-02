/* js/menu-buttons.js - the topic, level, category and type buttons (with the gray "not finished" ones); menu start-up
   Provides: renderTopicButtons, renderCategoryButtons, renderMenus, initMenus
   Needs: CONFIG, el, loadPref, state, $, t, getTopics, ICONS, hasRealQuizzes, showScreen, renderButtons,
          setSameDuration, goHome, openNextExercise, openCredits, setSmartBoard, openSettings, startQuiz, goNext,
          requestQuit */
'use strict';
/* =========================================================================
 * MENU BUTTONS (topic, level, category and question type buttons; the menus' start-up)
 * ========================================================================= */
// "Not finished" (grayed) buttons: a button is gray when the part behind it has no real questions yet AND the part it
// sits in has some. So only the FIRST button that leads to lorem ipsum is gray (a level like A2, A1 Grammar, an A1
// vocabulary theme without questions); inside such a part nothing is gray. See hasRealQuizzes() in questions.js.

// Topics depend on level + category: built each time the topic screen is shown (showScreen).
function renderTopicButtons() {
  const { level, category } = state.nav;
  const categoryFinished = hasRealQuizzes(level, category);
  renderButtons($('#topic-buttons'), getTopics(state.nav).map((name, i) => ({
    id: i, label: name, lang: 'en', unfinished: categoryFinished && !hasRealQuizzes(level, category, i),
  })), (item) => {
    state.nav.topic = item.id;
    showScreen('type');
  });
}

// Categories depend on the level: built each time the category screen is shown (showScreen) and when the language changes.
function renderCategoryButtons() {
  const level = state.nav.level;
  const levelFinished = !!level && hasRealQuizzes(level);
  renderButtons($('#category-buttons'), CONFIG.CATEGORIES.map((c) => ({
    ...c, label: t(`category.${c.id}`), unfinished: levelFinished && !hasRealQuizzes(level, c.id),
  })), (item) => {
    state.nav.category = item.id;
    showScreen('topic');
  });
}

// The level and question type buttons (and the category buttons); built again when the language changes.
function renderMenus() {
  $('#level-buttons').replaceChildren(...CONFIG.LEVEL_GROUPS.map((group) => {
    const grid = el('div', { class: 'grid' });
    renderButtons(grid, group.levels.map((l) => ({ id: l, label: l, sub: t(`levelName.${l}`), unfinished: !hasRealQuizzes(l) })), (item) => {
      state.nav.level = item.id;
      showScreen('category');
    });
    // Each level button previews its own level color.
    [...grid.children].forEach((btn, i) => {
      btn.classList.add('level-btn');
      btn.style.setProperty('--chip', `var(--lvl-${group.levels[i]})`);
    });
    return el('div', { class: 'level-group' }, [el('h2', { class: 'level-group-title', text: t(`levelGroup.${group.id}`) }), grid]);
  }));
  renderCategoryButtons();
  renderButtons($('#type-buttons'), CONFIG.TYPES.map((x) => ({ ...x, label: t(`type.${x.id}`) })), (item) => {
    state.nav.type = item.id;
    showScreen('difficulty');
  });
}

function initMenus() {
  renderMenus();

  const sw = $('#same-duration-switch');
  setSameDuration(loadPref('lg-same-duration', '0') === '1', false);
  sw.addEventListener('change', () => setSameDuration(sw.checked));
  setSmartBoard(loadPref('lg-smartboard', '0') === '1', false);

  const settingsBtn = $('#settings-btn');
  settingsBtn.innerHTML = ICONS.settings;
  settingsBtn.addEventListener('click', openSettings);

  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => showScreen(btn.dataset.back));
  });

  $('#credits-btn').addEventListener('click', openCredits);
  $('#quiz-quit').addEventListener('click', requestQuit);
  $('#quiz-next').addEventListener('click', goNext);
  $('#results-next').addEventListener('click', openNextExercise);
  $('#results-retry').addEventListener('click', startQuiz);
  $('#results-home').addEventListener('click', goHome);
}

