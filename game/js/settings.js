/* js/settings.js - the Settings pop-up and the Language toggle
   Provides: refreshSettings, setSmartBoard, settingText, settingSwitch, languageToggle, translateSettings,
             openSettings, settingsUi
   Needs: CONFIG, el, savePref, state, $, setLanguage, setMuted, sound, t, LANGS, LANG_NAMES, setTheme, THEMES,
          currentTheme, halloweenOn, setHalloween, ICONS, setSameDuration, openModal, closeModal */
'use strict';
/* =========================================================================
 * SETTINGS  (pop-up: language, theme, Trick or Treat, sound, same duration, SmartBoard mode; each remembered in localStorage)
 * ========================================================================= */
let settingsUi = null; // controls of the open Settings pop-up, kept in step by refreshSettings()

function refreshSettings() {
  if (!settingsUi) return;
  const isTurkish = state.lang === 'tr';
  settingsUi.languageToggle.setAttribute('aria-checked', String(isTurkish));
  settingsUi.languageToggle.setAttribute('aria-label', `${t('languageName')}: ${LANG_NAMES[state.lang]}`);
  settingsUi.languageToggle.querySelectorAll('.lang-lbl').forEach((lbl, i) => lbl.classList.toggle('is-on', LANGS[i] === state.lang));
  settingsUi.themeButtons.forEach((btn, i) => {
    btn.setAttribute('aria-pressed', String(THEMES[i] === currentTheme));
    btn.disabled = halloweenOn; // the Halloween theme is on: Auto / Light / Dark are grayed out
  });
  const themeHelpKey = halloweenOn ? 'halloweenThemeNote' : 'themeHelp';
  settingsUi.texts.forEach((entry) => { if (entry[0] === settingsUi.themeHelp) entry[1] = themeHelpKey; });
  settingsUi.themeHelp.textContent = t(themeHelpKey);
  settingsUi.halloweenSwitch.checked = halloweenOn;
  settingsUi.soundSwitch.checked = !sound.muted;
  settingsUi.durationSwitch.checked = state.nav.sameDuration;
  settingsUi.smartBoardSwitch.checked = state.smartBoard;
  // A quiz always runs in one mode: the switch is locked while a quiz is on screen.
  const locked = state.screen === 'quiz';
  settingsUi.smartBoardSwitch.disabled = locked;
  settingsUi.smartBoardLock.hidden = !locked;
}

function setSmartBoard(value, save = true) {
  state.smartBoard = value;
  if (save) savePref('lg-smartboard', value ? '1' : '0');
  refreshSettings();
}

// A text of the Settings pop-up: `texts` remembers [node, key, params] so translateSettings() can set it again.
function settingText(texts, tag, attrs, key, params) {
  const node = el(tag, attrs, [t(key, params)]);
  texts.push([node, key, params]);
  return node;
}

function settingSwitch(texts, id, nameKey, helpKey, helpParams, onChange) {
  const input = el('input', { type: 'checkbox', 'aria-describedby': `${id}-help` });
  input.addEventListener('change', () => onChange(input.checked));
  const row = el('div', { class: 'setting' }, [
    el('label', { class: 'setting-head' }, [
      settingText(texts, 'span', { class: 'setting-name' }, nameKey),
      el('span', { class: 'switch' }, [input, el('span', { class: 'slider' })]),
    ]),
    settingText(texts, 'p', { class: 'setting-help', id: `${id}-help` }, helpKey, helpParams),
  ]);
  return { row, input };
}

// The Language toggle: a sliding pill with both names always shown. A tap on a half chooses that side;
// Left / Right choose a side, Space / Enter switch to the other one.
function languageToggle() {
  const toggle = el('div', {
    class: 'lang-toggle', id: 'setting-language', role: 'switch', tabindex: '0', 'aria-checked': 'false',
    'aria-describedby': 'setting-language-help',
  }, [
    el('span', { class: 'lang-thumb' }),
    ...LANGS.map((lang) => el('span', { class: 'lang-lbl', lang, text: LANG_NAMES[lang] })),
  ]);
  toggle.addEventListener('click', (e) => {
    const box = toggle.getBoundingClientRect();
    setLanguage(e.clientX - box.left > box.width / 2 ? 'tr' : 'en');
  });
  toggle.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') setLanguage(state.lang === 'en' ? 'tr' : 'en');
    else if (e.key === 'ArrowLeft') setLanguage('en');
    else if (e.key === 'ArrowRight') setLanguage('tr');
    else return;
    e.preventDefault();
  });
  return toggle;
}

// Sets every text of the open Settings pop-up again (the language changed) without rebuilding it,
// so the Language toggle keeps its place and its slide plays.
function translateSettings() {
  settingsUi.texts.forEach(([node, key, params]) => { node.textContent = t(key, params); });
  $('#modal-title').textContent = t('settings');
  $('#modal-actions button').textContent = t('close');
  refreshSettings();
}

function openSettings() {
  const texts = [];
  const languageControl = languageToggle();
  const languageRow = el('div', { class: 'setting' }, [
    el('div', { class: 'setting-head can-wrap' }, [settingText(texts, 'span', { class: 'setting-name' }, 'languageName'), languageControl]),
    settingText(texts, 'p', { class: 'setting-help', id: 'setting-language-help' }, 'languageHelp'),
  ]);
  const themeButtons = THEMES.map((theme) => {
    const btn = el('button', { type: 'button', 'aria-pressed': 'false' }, [settingText(texts, 'span', {}, `theme.${theme}`)]);
    btn.insertAdjacentHTML('afterbegin', ICONS[theme]);
    btn.addEventListener('click', () => setTheme(theme));
    return btn;
  });
  const themeHelp = settingText(texts, 'p', { class: 'setting-help', id: 'setting-theme-help' }, 'themeHelp');
  const themeRow = el('div', { class: 'setting' }, [
    el('div', { class: 'setting-head' }, [settingText(texts, 'span', { class: 'setting-name', id: 'setting-theme-name' }, 'themeName')]),
    el('div', { class: 'segmented', role: 'group', 'aria-labelledby': 'setting-theme-name', 'aria-describedby': 'setting-theme-help' }, themeButtons),
    themeHelp,
  ]);
  const halloweenRow = settingSwitch(texts, 'setting-halloween', 'halloweenName', 'halloweenHelp', null, (on) => setHalloween(on));
  const soundRow = settingSwitch(texts, 'setting-sound', 'soundName', 'soundHelp', null, (on) => setMuted(!on));
  const durationRow = settingSwitch(texts, 'setting-duration', 'sameDuration', 'durationHelp',
    { n: CONFIG.SAME_DURATION_SECONDS }, (on) => setSameDuration(on));
  const smartBoardRow = settingSwitch(texts, 'setting-smartboard', 'smartBoardName', 'smartBoardHelp', null, (on) => setSmartBoard(on));
  const smartBoardLock = settingText(texts, 'p', { class: 'setting-help' }, 'smartBoardLock');
  smartBoardRow.row.append(smartBoardLock);
  settingsUi = { texts, languageToggle: languageControl, themeButtons, themeHelp, halloweenSwitch: halloweenRow.input, soundSwitch: soundRow.input,
    durationSwitch: durationRow.input, smartBoardSwitch: smartBoardRow.input, smartBoardLock };
  refreshSettings();
  openModal({
    title: t('settings'),
    body: el('div', {}, [
      el('div', { class: 'settings' }, [languageRow, themeRow, halloweenRow.row, soundRow.row, durationRow.row, smartBoardRow.row]),
      settingText(texts, 'p', { class: 'settings-note' }, 'workInProgress'),
    ]),
    buttons: [{ label: t('close'), primary: true, onClick: closeModal }],
    dismissible: true,
    kind: 'settings',
  });
}

