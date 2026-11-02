/* js/theme.js - the theme: Auto, Light, Dark
   Provides: setTheme, initTheme, THEMES, currentTheme
   Needs: loadPref, savePref, refreshSettings */
'use strict';
/* =========================================================================
 * THEME  (Auto / Light / Dark, chosen in Settings, remembered in localStorage "lg-theme")
 * ========================================================================= */
const THEMES = ['auto', 'light', 'dark'];
let currentTheme = 'auto';

function setTheme(theme, save = true) {
  if (!THEMES.includes(theme)) theme = 'auto';
  currentTheme = theme;
  if (theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  if (save) savePref('lg-theme', theme);
  refreshSettings();
}

function initTheme() {
  setTheme(loadPref('lg-theme', 'auto'), false);
}

