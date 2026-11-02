/* js/menu-buttons.js - the topic, level, category and type buttons; menu start-up
   Provides: renderTopicButtons, renderMenus, initMenus
   Needs: CONFIG, el, loadPref, state, $, t, getTopics, ICONS, showScreen, renderButtons, setSameDuration, goHome,
          openNextExercise, openCredits, setSmartBoard, openSettings, startQuiz, goNext, requestQuit */
'use strict';
/* =========================================================================
 * MENU BUTTONS (topic, level, category and question type buttons; the menus' start-up)
 * ========================================================================= */
// Topics depend on level + category, so they are rendered each time a category is chosen.
function renderTopicButtons() {
  renderButtons($('#topic-buttons'), getTopics(state.nav).map((name, i) => ({ id: i, label: name, lang: 'en' })), (item) => {
    state.nav.topic = item.id;
    showScreen('type');
  });
}

// The level, category and question type buttons; built again when the language changes.
function renderMenus() {
  $('#level-buttons').replaceChildren(...CONFIG.LEVEL_GROUPS.map((group) => {
    const grid = el('div', { class: 'grid' });
    renderButtons(grid, group.levels.map((l) => ({ id: l, label: l, sub: t(`levelName.${l}`) })), (item) => {
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
  renderButtons($('#category-buttons'), CONFIG.CATEGORIES.map((c) => ({ ...c, label: t(`category.${c.id}`) })), (item) => {
    state.nav.category = item.id;
    renderTopicButtons();
    showScreen('topic');
  });
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

