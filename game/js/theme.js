/* js/theme.js - the theme: Auto, Light, Dark; and Trick or Treat, the Halloween theme that replaces them while it is on
   Provides: setTheme, initTheme, setHalloween, THEMES, currentTheme, halloweenOn
   Needs: loadPref, savePref, refreshSettings, startWalker, stopWalker */
'use strict';
/* =========================================================================
 * THEME  (Auto / Light / Dark, chosen in Settings, remembered in localStorage "lg-theme";
 *         Trick or Treat = the Halloween theme, remembered in "lg-halloween")
 * ========================================================================= */
const THEMES = ['auto', 'light', 'dark'];
let currentTheme = 'auto';
let halloweenOn = false; // Trick or Treat: html[data-halloween="on"] (css/halloween.css); the <head> script of the page sets it before the first paint

function setTheme(theme, save = true) {
  if (!THEMES.includes(theme)) theme = 'auto';
  currentTheme = theme;
  if (theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  if (save) savePref('lg-theme', theme);
  refreshSettings();
}

// While Halloween is on, the Auto / Light / Dark choice is kept but has no effect and is grayed out in Settings.
function setHalloween(value, save = true) {
  halloweenOn = value;
  document.documentElement.dataset.halloween = value ? 'on' : 'off';
  if (save) savePref('lg-halloween', value ? '1' : '0');
  if (value) startWalker();
  else stopWalker();
  refreshSettings();
}

function initTheme() {
  setTheme(loadPref('lg-theme', 'auto'), false);
  setHalloween(loadPref('lg-halloween', '0') === '1', false);
}

