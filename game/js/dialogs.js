/* js/dialogs.js - the pop-up engine, the inert page behind it, the "not finished yet" question, the reload notice, Credits
   Provides: updateInert, openModal, closeModal, openUnfinishedConfirm, wasReloaded, openReloadNotice, openCredits, modalState
   Needs: el, $, t, CREDITS, walkerModalClosed */
'use strict';
/* =========================================================================
 * MODAL
 * ========================================================================= */
const modalState = { dismissible: false, opener: null, kind: null }; // kind: 'settings' while Settings is open (it is built again when the language changes)

// While a pop-up or the menu tree is open, the page behind it can't be reached with the keyboard
// (Tab, Shift+Tab) or a screen reader: it is made `inert`. Called whenever either one opens or closes.
function updateInert() {
  const active = !$('#modal-overlay').hidden || $('#tree-overlay').classList.contains('is-open');
  ['#topbar', '#app', '#credits-footer'].forEach((sel) => { $(sel).inert = active; });
}

// onBack (optional): shows a left arrow button before the title that runs it (used by the "Words in this game" pop-up).
// title (optional): without one the title row is hidden and the sentence of the pop-up is its name (the reload notice).
function openModal({ title = '', body, buttons, dismissible = false, onBack = null, kind = null }) {
  modalState.kind = kind;
  $('#modal-title').textContent = title;
  $('#modal-title').hidden = !title;
  $('#modal-overlay .modal-head').hidden = !title && !onBack;
  $('#modal-overlay .modal').setAttribute('aria-labelledby', title ? 'modal-title' : 'modal-body');
  $('#modal-back').hidden = !onBack;
  $('#modal-back').onclick = onBack;
  $('#modal-body').replaceChildren(typeof body === 'string' ? el('p', { text: body }) : body);
  $('#modal-actions').replaceChildren(...buttons.map((b) => {
    const btn = el('button', { class: b.primary ? 'primary' : '', text: b.label });
    btn.addEventListener('click', b.onClick);
    return btn;
  }));
  if ($('#modal-overlay').hidden) modalState.opener = document.activeElement; // focus goes back here when it closes
  modalState.dismissible = dismissible;
  $('#modal-overlay').hidden = false;
  updateInert();
  $('#modal-overlay .modal').scrollTop = 0; // a long pop-up (the word list) always opens at its top
  const focusTarget = $('#modal-actions .primary') || $('#modal-actions button');
  if (focusTarget) focusTarget.focus({ preventScroll: true }); // focusing the button must not scroll the pop-up down to it
}

function closeModal() {
  if ($('#modal-overlay').hidden) return;
  $('#modal-overlay').hidden = true;
  modalState.kind = null;
  updateInert();
  const opener = modalState.opener;
  modalState.opener = null;
  if (opener && opener.isConnected && !opener.disabled) opener.focus({ preventScroll: true });
  walkerModalClosed(); // Trick or Treat turned on in Settings: the walker's few seconds start now
}

// Asks before entering a part that has no real questions yet (a grayed-out menu button, or Next exercise leading there).
// "Go back" (the main button) stays where the student was; "Go there" runs onGo.
function openUnfinishedConfirm(onGo) {
  openModal({
    title: t('unfinishedTitle'),
    body: t('unfinishedBody'),
    dismissible: true,
    buttons: [
      { label: t('goBack'), primary: true, onClick: closeModal },
      { label: t('goThere'), onClick: () => { closeModal(); onGo(); } },
    ],
  });
}

// The page was reloaded: the game starts again on the main menu, and this notice says so. Shown only after a reload
// (not on the first visit), if the browser can tell; if it can't, there is no notice and nothing else changes.
function wasReloaded() {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    return Boolean(nav) && nav.type === 'reload';
  } catch (e) {
    return false;
  }
}

function openReloadNotice() {
  openModal({
    body: t('reloadedBody'),
    dismissible: true,
    buttons: [{ label: t('ok'), primary: true, onClick: closeModal }],
  });
}

function openCredits() {
  openModal({
    title: t('credits'),
    body: el('ul', {}, CREDITS.map((name) => el('li', { text: name }))),
    buttons: [{ label: t('close'), primary: true, onClick: closeModal }],
    dismissible: true,
  });
}

