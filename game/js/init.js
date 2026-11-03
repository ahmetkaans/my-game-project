/* js/init.js - start-up: the order in which the parts are started
   Provides: (none)
   Needs: initLanguage, wasReloaded, openReloadNotice, applyStaticTexts, initSound, initTheme, showScreen, initMenus, initTree,
          initModal */
'use strict';
/* =========================================================================
 * INIT
 * ========================================================================= */
initLanguage();
if (wasReloaded()) openReloadNotice(); // before initTheme: the Halloween walker sees the open pop-up and waits for it
initTheme();
initSound();
initMenus();
initModal();
initTree();
applyStaticTexts();
showScreen('level');
