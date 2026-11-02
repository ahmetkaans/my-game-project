/* js/menu-tree.js - the menu tree panel; also the pop-up listeners (initModal)
   Provides: renderTree, openTree, closeTree, initTree, initModal, TREE_STEPS, treeCloseTimer
   Needs: CONFIG, el, state, $, t, ICONS, breadcrumbParts, showScreen, SCREEN_DEPTH, openHomeConfirm, updateInert,
          closeModal, modalState */
'use strict';
/* =========================================================================
 * MENU TREE  (the student's path through the menu; a chosen step opens that menu screen)
 * ========================================================================= */
const TREE_STEPS = [
  { screen: 'level' },
  { screen: 'category' },
  { screen: 'topic' },
  { screen: 'type' },
  { screen: 'difficulty' },
];
let treeCloseTimer = null;

function renderTree() {
  const values = breadcrumbParts();
  const depth = Math.min(SCREEN_DEPTH[state.screen], TREE_STEPS.length); // how many steps are chosen on this screen
  const current = Math.min(depth, TREE_STEPS.length - 1);                // the step being chosen (the last one on results)
  $('#tree-list').replaceChildren(...TREE_STEPS.map((step, i) => {
    const chosen = i < depth;
    const value = el('span', { class: 'val', text: chosen ? values[i] : t('notChosen') });
    if (i === current) value.append(el('span', { class: 'tree-here', text: t('youAreHere') }));
    const btn = el('button', { type: 'button', class: 'tree-step' }, [el('span', { class: 'cap', text: t(`step.${step.screen}`) }), value]);
    if (i === current) btn.setAttribute('aria-current', 'step');
    if (chosen) {
      btn.addEventListener('click', () => {
        closeTree();
        if (step.screen !== state.screen) showScreen(step.screen);
      });
    } else {
      btn.disabled = true;
    }
    const cls = [i === current ? 'is-current' : '', chosen ? '' : 'is-pending'].join(' ').trim();
    return el('li', { class: cls, style: `--depth:${i};--i:${i}` }, [btn]);
  }));
}

function openTree() {
  clearTimeout(treeCloseTimer);
  renderTree();
  const overlay = $('#tree-overlay');
  overlay.hidden = false;
  void overlay.offsetWidth; // let the browser draw the closed position first, so the slide-in plays
  overlay.classList.add('is-open');
  updateInert();
  $('#tree-close').focus();
}

function closeTree() {
  const overlay = $('#tree-overlay');
  if (overlay.hidden) return;
  overlay.classList.remove('is-open');
  updateInert();
  clearTimeout(treeCloseTimer);
  treeCloseTimer = setTimeout(() => { overlay.hidden = true; }, CONFIG.TREE_CLOSE_MS); // a timer, so it also hides with reduced motion
  $('#tree-btn').focus(); // back to the button that opened it (a click doesn't focus buttons in every browser)
}

function initTree() {
  const home = $('#home-btn');
  home.innerHTML = ICONS.home;
  home.addEventListener('click', openHomeConfirm);
  const btn = $('#tree-btn');
  btn.innerHTML = ICONS.tree;
  btn.addEventListener('click', openTree);
  $('#tree-close').addEventListener('click', closeTree);
  $('#tree-overlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTree(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#tree-overlay').hidden) closeTree();
  });
}

function initModal() {
  $('#modal-back').innerHTML = ICONS.back;
  $('#modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget && modalState.dismissible) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#modal-overlay').hidden && modalState.dismissible) closeModal();
  });
}

