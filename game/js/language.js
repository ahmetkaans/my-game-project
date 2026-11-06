/* js/language.js - the saved language, the static texts of the page, switching the language
   Provides: initLanguage, applyStaticTexts, setLanguage
   Needs: t, LANGS, loadPref, savePref, state, $, refreshBreadcrumb, renderDifficultyButtons, renderMenus,
          renderTopicButtons, translateSettings, renderResultsContent, refreshHistoryScreen, modalState */
'use strict';
/* =========================================================================
 * LANGUAGE  (English / Turkish, chosen in Settings, remembered in localStorage "lg-lang")
 * ========================================================================= */
function initLanguage() {
  const saved = loadPref('lg-lang', 'en');
  state.lang = LANGS.includes(saved) ? saved : 'en';
}

// Static texts carry data-i18n="key" (their text) or data-i18n-label="key" (tooltip and screen reader name).
// <html lang> follows the language; English content (questions, topic names, the word list) carries lang="en" itself.
function applyStaticTexts() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-label]').forEach((node) => {
    const label = t(node.dataset.i18nLabel);
    node.title = label;
    node.setAttribute('aria-label', label);
  });
}

function setLanguage(lang, save = true) {
  if (!LANGS.includes(lang) || lang === state.lang) return;
  state.lang = lang;
  if (save) savePref('lg-lang', lang);
  applyStaticTexts();
  renderMenus();
  if (state.screen === 'topic') renderTopicButtons();   // the "Not finished" tags are texts too
  renderDifficultyButtons();
  refreshBreadcrumb();
  // Settings is the only pop-up that can be open now: its texts change in place, so the toggle keeps its slide and its focus.
  if (modalState.kind === 'settings' && !$('#modal-overlay').hidden) translateSettings();
  // The results screen is built from the quiz record: build it again in the new language.
  if (state.screen === 'results' && state.quiz) renderResultsContent();
  refreshHistoryScreen();   // the History screens too (only when one is showing)
}

