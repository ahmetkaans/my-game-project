/* js/confetti.js - the results confetti
   Provides: launchConfetti, stopConfetti, confetti
   Needs: CONFIG, el, prefersReducedMotion */
'use strict';
/* =========================================================================
 * CONFETTI  (results screen, high score only, skipped with reduced motion)
 * ========================================================================= */
let confetti = null;

function launchConfetti() {
  stopConfetti();
  if (prefersReducedMotion()) return;
  const canvas = el('canvas', { class: 'confetti', 'aria-hidden': 'true' });
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const colors = CONFIG.LEVELS.map((l) => styles.getPropertyValue(`--lvl-${l}`).trim());
  const pieces = Array.from({ length: CONFIG.CONFETTI_COUNT }, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.4,
    w: 6 + Math.random() * 4,
    h: 8 + Math.random() * 6,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 1.8 + Math.random() * 2.2,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.15,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  confetti = { canvas, raf: 0 };
  const frame = (now) => {
    const elapsed = now - start;
    if (elapsed >= CONFIG.CONFETTI_MS) {
      stopConfetti();
      return;
    }
    const fadeStart = CONFIG.CONFETTI_MS - 700;
    ctx.globalAlpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / 700 : 1;
    ctx.clearRect(0, 0, width, height);
    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    confetti.raf = requestAnimationFrame(frame);
  };
  confetti.raf = requestAnimationFrame(frame);
}

function stopConfetti() {
  if (!confetti) return;
  cancelAnimationFrame(confetti.raf);
  confetti.canvas.remove();
  confetti = null;
}

