/* js/init.js - start-up: the order in which the parts are started
   Provides: (none)
   Needs: initLanguage, applyStaticTexts, initSound, initTheme, showScreen, initMenus, initTree, initModal */
'use strict';
/* =========================================================================
 * INIT
 * ========================================================================= */
initLanguage();
initTheme();
initSound();
initMenus();
initModal();
initTree();
applyStaticTexts();
showScreen('level');
