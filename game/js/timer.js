/* js/timer.js - the timer, the time-out pop-up, extra time, game over
   Provides: startTimer, resumeTimer, pauseTimer, stopTimer, tick, renderTimer, onTimeUp, useExtension, gameOver
   Needs: CONFIG, state, $, playSound, t, openModal, closeModal, startQuiz, currentRecord, updateScoreDisplay,
          skipQuestion, showResults */
'use strict';
/* =========================================================================
 * TIMER  (time-based, so pausing keeps the exact remaining milliseconds)
 * ========================================================================= */
function startTimer(seconds, extension) {
  stopTimer();
  const t = state.quiz.timer;
  t.totalMs = seconds * 1000;
  t.remainingMs = t.totalMs;
  t.extension = extension;
  t.lastTickSecond = null;
  resumeTimer();
}

function resumeTimer() {
  const t = state.quiz.timer;
  if (t.intervalId !== null || t.remainingMs <= 0) return;
  t.lastTs = performance.now();
  t.intervalId = setInterval(tick, CONFIG.TIMER_TICK_MS);
  renderTimer();
}

function pauseTimer() {
  const t = state.quiz && state.quiz.timer;
  if (!t || t.intervalId === null) return;
  t.remainingMs = Math.max(0, t.remainingMs - (performance.now() - t.lastTs));
  stopTimer();
}

function stopTimer() {
  const t = state.quiz && state.quiz.timer;
  if (!t || t.intervalId === null) return;
  clearInterval(t.intervalId);
  t.intervalId = null;
}

function tick() {
  const quiz = state.quiz;
  if (!quiz) return;
  const t = quiz.timer;
  const now = performance.now();
  t.remainingMs -= now - t.lastTs;
  t.lastTs = now;
  if (t.remainingMs <= 0) {
    t.remainingMs = 0;
    stopTimer();
    renderTimer();
    onTimeUp();
    return;
  }
  // Quiet tick once per second in the last TICK_LAST_SECONDS (normal and extra time).
  const secondsLeft = Math.ceil(t.remainingMs / 1000);
  if (secondsLeft <= CONFIG.TICK_LAST_SECONDS && secondsLeft !== t.lastTickSecond) {
    t.lastTickSecond = secondsLeft;
    playSound('tick');
  }
  renderTimer();
}

function renderTimer() {
  const timer = state.quiz.timer; // not named `t`: that is the text function
  const ratio = timer.totalMs ? timer.remainingMs / timer.totalMs : 0;
  const text = $('#quiz-timer-text');
  text.textContent = `${t(timer.extension ? 'extraTime' : 'time')}: ${t('secondsShort', { n: Math.ceil(timer.remainingMs / 1000) })}`;
  text.classList.toggle('is-extension', timer.extension);
  $('#quiz-timer-fill').style.width = `${ratio * 100}%`;
  const bar = $('#quiz-timer-bar');
  bar.classList.toggle('is-extension', timer.extension);
  bar.classList.toggle('is-low', !timer.extension && ratio < CONFIG.TIMER_LOW_RATIO);
}

function onTimeUp() {
  const quiz = state.quiz;
  if (quiz.answered) return;
  const rec = currentRecord();
  if (!rec.extensionUsed) {
    openModal({
      title: t('timeOutTitle'),
      body: t(quiz.graded ? 'timeOutBodyPts' : 'timeOutBody', { n: CONFIG.EXTENSION_SECONDS, p: CONFIG.EXTENSION_PENALTY }),
      buttons: [
        {
          label: t(quiz.graded ? 'plusSecondsPts' : 'plusSeconds', { n: CONFIG.EXTENSION_SECONDS, p: CONFIG.EXTENSION_PENALTY }),
          primary: true,
          onClick: () => { closeModal(); useExtension(); },
        },
        { label: t('skipQuestion'), onClick: () => { closeModal(); skipQuestion(); } },
      ],
    });
  } else {
    gameOver();
  }
}

function useExtension() {
  const quiz = state.quiz;
  const rec = currentRecord();
  rec.extensionUsed = true;
  if (quiz.graded) {
    rec.penalty = -CONFIG.EXTENSION_PENALTY;
    quiz.score += rec.penalty;
  }
  updateScoreDisplay();
  startTimer(CONFIG.EXTENSION_SECONDS, true);
}

function gameOver() {
  const quiz = state.quiz;
  quiz.answered = true;
  quiz.over = true;
  currentRecord().timedOut = true;
  $('#quiz-question').querySelectorAll('button, input').forEach((b) => { b.disabled = true; });
  openModal({
    title: t('gameOverTitle'),
    body: t('gameOverBody'),
    buttons: [
      { label: t('retry'), primary: true, onClick: () => { closeModal(); startQuiz(); } },
      { label: t('seeResults'), onClick: () => { closeModal(); showResults(); } },
    ],
  });
}

