/* js/sound.js - Web Audio sounds and mute
   Provides: getAudio, playNote, playSound, setMuted, initSound, sound, SOUNDS
   Needs: loadPref, savePref, refreshSettings */
'use strict';
/* =========================================================================
 * SOUND  (Web Audio API, no files; mute remembered in localStorage "lg-muted")
 * ========================================================================= */
const sound = { ctx: null, muted: loadPref('lg-muted', '0') === '1' };

// Each note: { freq, endFreq?, type?, start (s), duration (s), gain }
const SOUNDS = {
  correct: [
    { freq: 659.25, type: 'sine', start: 0, duration: 0.5, gain: 0.12 },
    { freq: 987.77, type: 'sine', start: 0.09, duration: 0.7, gain: 0.09 },
  ],
  partial: [
    { freq: 587.33, type: 'sine', start: 0, duration: 0.45, gain: 0.1 },
  ],
  wrong: [
    { freq: 220, endFreq: 174.6, type: 'triangle', start: 0, duration: 0.45, gain: 0.13 },
  ],
  tick: [
    { freq: 1250, type: 'sine', start: 0, duration: 0.05, gain: 0.035 },
  ],
};

function getAudio() {
  if (sound.muted) return null;
  if (!sound.ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    sound.ctx = new AudioCtx();
  }
  if (sound.ctx.state === 'suspended') sound.ctx.resume();
  return sound.ctx;
}

function playNote(ctx, note) {
  const t0 = ctx.currentTime + note.start;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = note.type || 'sine';
  osc.frequency.setValueAtTime(note.freq, t0);
  if (note.endFreq) osc.frequency.exponentialRampToValueAtTime(note.endFreq, t0 + note.duration);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(note.gain, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + note.duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + note.duration + 0.05);
}

function playSound(name) {
  const ctx = getAudio();
  if (!ctx) return;
  SOUNDS[name].forEach((note) => playNote(ctx, note));
}

function setMuted(muted) {
  sound.muted = muted;
  savePref('lg-muted', muted ? '1' : '0');
  refreshSettings();
}

function initSound() {
  // Browsers only allow audio after a user gesture: create/resume the context on the first one.
  const unlock = () => { if (!sound.muted) getAudio(); };
  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
}

