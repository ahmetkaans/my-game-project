/* js/navigation.js - screens, the path line, the button builder (with the gray "not finished" buttons), difficulty buttons, the same-duration switch
   Provides: breadcrumbParts, refreshBreadcrumb, showScreen, renderButtons, getQuestionSeconds, setSameDuration,
             renderDifficultyButtons, SCREEN_DEPTH
   Needs: stopConfetti, CONFIG, el, findById, savePref, state, $, t, getTopics, renderCategoryButtons,
          renderTopicButtons, openUnfinishedConfirm, refreshSettings, startQuiz */
'use strict';
/* =========================================================================
 * NAVIGATION / MENUS
 * ========================================================================= */
const SCREEN_DEPTH = { level: 0, category: 1, topic: 2, type: 3, difficulty: 4, quiz: 5, results: 5 };

function breadcrumbParts() {
  const nav = state.nav;
  return [
    nav.level,
    nav.category ? t(`category.${nav.category}`) : null,
    nav.topic !== null ? getTopics(nav)[nav.topic] : null,
    nav.type ? t(`type.${nav.type}`) : null,
    nav.difficulty ? `${t(`difficulty.${nav.difficulty}`)} (${t('secondsShort', { n: getQuestionSeconds() })})` : null,
  ];
}

// The path line (Level › Category › …) of the screen being shown.
function refreshBreadcrumb() {
  const crumb = $(`#screen-${state.screen} .breadcrumb`);
  if (crumb) crumb.textContent = breadcrumbParts().slice(0, SCREEN_DEPTH[state.screen]).join(' › ');
}

function showScreen(name) {
  state.screen = name;
  stopConfetti();
  if (name !== 'difficulty') state.nextHint = null;
  document.querySelectorAll('.screen').forEach((s) => { s.hidden = s.id !== `screen-${name}`; });
  // Level accent: neutral on the level screen, the chosen level's color everywhere inside a level.
  if (name === 'level') delete document.body.dataset.level;
  else if (state.nav.level) document.body.dataset.level = state.nav.level;
  // Credits and the theme/mute bar are shown on every page except the game (quiz) page.
  $('#credits-footer').hidden = name === 'quiz';
  $('#topbar').hidden = name === 'quiz';
  $('#home-btn').hidden = name === 'level'; // already on the main menu
  refreshBreadcrumb();
  // These grids depend on the chosen level / category (the gray "not finished" buttons too): built each time they are shown.
  if (name === 'category') renderCategoryButtons();
  if (name === 'topic') renderTopicButtons();
  if (name === 'difficulty') renderDifficultyButtons();
  window.scrollTo(0, 0);
}

// item.unfinished: the part behind the button has no real questions yet. The button is grayed, carries a small tag, and
// asks "Go back / Go there" before it leads anywhere; it is a normal, clickable button (not disabled).
function renderButtons(container, items, onClick) {
  container.replaceChildren(...items.map((item) => {
    const btn = el('button', { class: 'menu-btn' }, [item.label]);
    if (item.lang) btn.lang = item.lang; // text that is not translated (topic names) says so
    if (item.sub) btn.append(el('small', { text: item.sub }));
    if (item.tag) {
      btn.classList.add('is-next');
      btn.append(el('span', { class: 'next-tag', text: item.tag }));
    }
    if (item.unfinished) {
      btn.classList.add('is-unfinished');
      btn.append(el('span', { class: 'unfinished-tag', lang: state.lang, text: t('unfinishedTag') }));
    }
    btn.addEventListener('click', () => (item.unfinished ? openUnfinishedConfirm(() => onClick(item)) : onClick(item)));
    return btn;
  }));
}

function getQuestionSeconds() {
  if (state.nav.sameDuration) return CONFIG.SAME_DURATION_SECONDS;
  return findById(CONFIG.DIFFICULTIES, state.nav.difficulty).seconds;
}

// The "same duration" switch lives on the Difficulty screen and in Settings; both always show this one value.
function setSameDuration(value, save = true) {
  state.nav.sameDuration = value;
  if (save) savePref('lg-same-duration', value ? '1' : '0');
  $('#same-duration-switch').checked = value;
  renderDifficultyButtons();
  refreshSettings();
}

function renderDifficultyButtons() {
  const items = CONFIG.DIFFICULTIES.map((d) => ({
    ...d,
    label: t(`difficulty.${d.id}`),
    sub: t('secondsShort', { n: state.nav.sameDuration ? CONFIG.SAME_DURATION_SECONDS : d.seconds }),
    tag: state.nextHint && state.nextHint.difficulty === d.id ? t('nextTag') : null,
  }));
  renderButtons($('#difficulty-buttons'), items, (d) => {
    state.nav.difficulty = d.id;
    startQuiz();
  });
}

