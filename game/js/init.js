/* js/init.js - start-up: the order in which the parts are started
   Provides: (none)
   Needs: initLanguage, recordInterruptedQuiz, wasReloaded, openReloadNotice, applyStaticTexts, initSound, initTheme, showScreen, initMenus, initTree,
          initHistory, initModal */
'use strict';
/* =========================================================================
 * INIT
 * ========================================================================= */
initLanguage();
recordInterruptedQuiz(); // before the first screen is shown: showing a screen removes the "quiz in progress" note
if (wasReloaded()) openReloadNotice(); // before initTheme: the Halloween walker sees the open pop-up and waits for it
initTheme();
initSound();
initMenus();
initModal();
initTree();
initHistory();
applyStaticTexts();
showScreen('level');
