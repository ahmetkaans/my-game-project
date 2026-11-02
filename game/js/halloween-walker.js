/* js/halloween-walker.js - Trick or Treat: a hooded figure with a lantern walks across the bottom once and drags a skeleton
   Provides: WALKER_HEIGHT, WALKER_GROUND, WALKER_SCALE, WALKER_FIGURE_MIDDLE, WALKER_X0, WALKER_RAMP, WALKER_TAU, walker,
             walkerSmooth, walkerKeys, walkerRotate, walkerEase, walkerOut, walkerMarkup, planWalker, walkerPosition, renderWalker,
             tickWalker, beginWalker, finishWalker, startWalker, walkerModalClosed, stopWalker, sinkWalker
   Needs: CONFIG, state, $, prefersReducedMotion */
'use strict';
/* =========================================================================
 * HALLOWEEN WALKER  (Trick or Treat only: one pass a few seconds after the page opens; it sinks into the ground when a quiz starts)
 * ========================================================================= */
const WALKER_HEIGHT = 110;        // px: the strip it walks in (css/halloween.css, .walker)
const WALKER_GROUND = 104;        // px: the ground line inside that strip
const WALKER_SCALE = 0.8;         // px per drawing unit (the figure is drawn in units: about 125 units tall)
const WALKER_FIGURE_MIDDLE = 117; // px from the left edge of the drawing to the middle of the lantern figure (146 units)
const WALKER_X0 = -165;           // px: where the drawing starts, out of sight on the left
const WALKER_RAMP = 0.5;          // seconds to slow down into the stop, and to speed up again
const WALKER_TAU = Math.PI * 2;

// One pass per page visit: `done` stays true once it has walked, sunk, or been switched off while walking.
const walker = { timer: 0, raf: 0, done: false, active: false, plan: null, nodes: null, t: 0, last: 0, sinkT: -1, after: null, afterScreen: null, waiting: false };

function walkerSmooth(a) { return a * a * (3 - 2 * a); }

// Eases through key points [[progress 0..1, value], ...].
function walkerKeys(u, points) {
  for (let i = 1; i < points.length; i++) {
    if (u <= points[i][0]) {
      const [u0, v0] = points[i - 1];
      const [u1, v1] = points[i];
      return v0 + (v1 - v0) * walkerSmooth(Math.max(0, Math.min(1, (u - u0) / (u1 - u0))));
    }
  }
  return points[points.length - 1][1];
}

function walkerRotate(px, py, cx, cy, deg) {
  const r = (deg * Math.PI) / 180;
  const dx = px - cx;
  const dy = py - cy;
  return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)];
}

function walkerEase(u) {
  const c = Math.max(0, Math.min(1, u));
  return c * c * c;
}

// Fast at first, slow at the end (a hole opening).
function walkerOut(u) {
  const c = Math.max(0, Math.min(1, u));
  return 1 - (1 - c) * (1 - c) * (1 - c);
}

// The drawing (inline SVG, no image files). Parts that move carry data-w="name"; the figure faces right.
function walkerMarkup() {
  return `<svg width="100%" height="${WALKER_HEIGHT}" aria-hidden="true">
<defs><clipPath id="walker-clip"><rect x="0" y="0" width="5000" height="${WALKER_GROUND + 2}"/></clipPath></defs>
<line data-w="ground" x1="0" y1="${WALKER_GROUND + 0.5}" x2="100%" y2="${WALKER_GROUND + 0.5}" stroke="#5A3A14" stroke-width="1" opacity="0"/>
<g clip-path="url(#walker-clip)"><g data-w="scene"><g fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-width="1">
<g data-w="rings" stroke="#5A3A14" stroke-width=".8"><circle data-w="r1" cx="172" cy="60" r="13"/><circle data-w="r2" cx="172" cy="60" r="20"/></g>
<ellipse data-w="pool" cx="172" cy="158.5" rx="26" ry="3" stroke="#5A3A14" stroke-width=".8"/>
<path data-w="beam" d="M118 158 L136 44 L156 44 L174 158 Z" fill="#FF8A1F" stroke="none" opacity="0"/>
<ellipse data-w="spill" cx="146" cy="156.8" rx="1" ry="2.2" fill="#FF8A1F" stroke="none" opacity="0"/>
<rect data-w="hole" x="146" y="156.6" width="0" height="3.6" fill="#000" stroke="none"/>
<g stroke="#FF8A1F" stroke-width="1.2"><path data-w="rimL" d="M146 155.6 V160.4" opacity="0"/><path data-w="rimR" d="M146 155.6 V160.4" opacity="0"/></g>
<g data-w="sinkS"><g transform="translate(-30 158) scale(1.4) translate(0 -158)">
<g stroke="#5A3A14" stroke-width=".9"><path d="M-30 158.4 H-14" opacity=".9"/><path d="M-70 158.4 H-34" opacity=".5"/><path d="M-120 158.4 H-74" opacity=".25"/></g>
<g fill="#7A5A30" stroke="none"><g data-w="d1"><circle cx="-2" cy="154" r="1.7"/></g><g data-w="d2"><circle cx="-2" cy="156" r="1.4"/></g><g data-w="d3"><circle cx="-2" cy="155" r="1.2"/></g></g>
<g data-w="coast"><g data-w="jerk"><g data-w="bump"><g stroke="#E2A054">
<g data-w="legs"><path d="M26 154 L14 151 L1 156 M26 157 L14 157 L0 158"/><circle cx="14" cy="151" r="1.8" fill="#171009"/><circle cx="14" cy="157" r="1.8" fill="#171009"/></g>
<path d="M22 151 Q28 159 34 151 L31 147 Q28 152 25 147 Z" fill="#171009"/><path d="M32 153 L58 152"/>
<ellipse cx="45" cy="148" rx="13" ry="6.5" fill="#171009"/><path d="M39 142 V154 M45 141.5 V154.5 M51 142 V154"/>
<path d="M54 146 L62 142 L71 140 M52 150 L56 157 L64 158"/><circle cx="62" cy="142" r="1.4" fill="#171009"/>
<g data-w="skull"><ellipse cx="66" cy="150" rx="8" ry="7.5" fill="#171009"/><path d="M60 154 Q66 160 72 154"/><ellipse cx="63" cy="149" rx="1.9" ry="2.4" fill="#000" stroke="none"/><ellipse cx="69" cy="149" rx="1.9" ry="2.4" fill="#000" stroke="none"/><path d="M66 152 L64.8 155 H67.2 Z" fill="#000" stroke="none"/></g>
<circle cx="71" cy="140" r="2.6" stroke="#9A6A30"/>
</g></g></g></g>
</g></g>
<path data-w="rope" d="M128 122 L69 133" stroke="#9A6A30" stroke-dasharray="3 2"/>
<g transform="translate(36 0)"><g data-w="sinkP"><g data-w="person" stroke="#FF8A1F" fill="#171009">
<g data-w="body">
<path d="M110 40 C102 40 98 47 99 55 C97 62 93 72 90 92 C87 115 84 135 80 156 Q96 160 112 157 Q128 160 138 154 C134 135 131 115 128 95 C125 72 121 62 120 55 C121 47 118 40 110 40 Z"/>
<g data-w="face"><path d="M104 50 Q110 44 116 50 Q118 60 110 64 Q102 60 104 50 Z" fill="#000"/><circle cx="107" cy="54" r="1.3" fill="#FFB04D" stroke="none"/><circle cx="113" cy="54" r="1.3" fill="#FFB04D" stroke="none"/></g>
<path d="M121 74 C128 72 132 62 134 52 L138 54 C137 66 132 78 124 82 Z"/><circle cx="136" cy="48" r="2.5"/>
<g data-w="lant"><path d="M132 49 Q136 41 140 49" fill="none"/><path d="M130 52 H142 L140 49 H132 Z"/><path d="M131 52 V68 H141 V52 Z" fill="#000"/><path d="M130 68 H142"/><path data-w="flame" d="M136 66 C132 63 134 60 136 56 C138 60 140 63 136 66 Z" fill="#FFD36B" stroke="none"/></g>
<g data-w="arm"><path d="M96 78 C93 88 92 100 90 118 L95 120 C97 104 99 90 101 80 Z"/><circle cx="92" cy="122" r="2"/></g>
</g>
<ellipse data-w="shL" cx="98" cy="158" rx="6" ry="2.5"/><ellipse data-w="shR" cx="122" cy="157" rx="6" ry="2.5"/>
</g></g></g>
<g fill="#7A5A30" stroke="none"><circle data-w="k0" r="1.6" opacity="0"/><circle data-w="k1" r="1.6" opacity="0"/><circle data-w="k2" r="1.6" opacity="0"/><circle data-w="k3" r="1.6" opacity="0"/><circle data-w="k4" r="1.6" opacity="0"/><circle data-w="k5" r="1.6" opacity="0"/></g>
<g stroke="none"><circle data-w="p0" r="1.5" fill="#FFD36B" opacity="0"/><circle data-w="p1" r="1.2" fill="#FFB04D" opacity="0"/><circle data-w="p2" r="1.5" fill="#FFD36B" opacity="0"/><circle data-w="p3" r="1.2" fill="#FFB04D" opacity="0"/><circle data-w="p4" r="1.5" fill="#FFD36B" opacity="0"/><circle data-w="p5" r="1.2" fill="#FFB04D" opacity="0"/><circle data-w="p6" r="1.5" fill="#FFD36B" opacity="0"/><circle data-w="p7" r="1.2" fill="#FFB04D" opacity="0"/></g>
</g></g></g></svg>`;
}

// When it stops, looks back and walks on, from the screen width. The speed is always the same (the feet, the bumps and the rope are made for it), so a wide screen means a longer pass.
function planWalker(width) {
  const speed = CONFIG.HALLOWEEN_WALKER_SPEED;
  const stopX = Math.round(width * 0.5 - WALKER_FIGURE_MIDDLE);
  const endX = width + 60;
  const stopAt = (stopX - WALKER_X0 - (speed * WALKER_RAMP) / 2) / speed + WALKER_RAMP; // the stop starts
  const goAt = stopAt + CONFIG.HALLOWEEN_WALKER_STOP_SECONDS;                            // walking on starts
  const endAt = goAt + WALKER_RAMP + (endX - stopX - (speed * WALKER_RAMP) / 2) / speed;
  const tugs = CONFIG.HALLOWEEN_WALKER_TUGS_BEFORE_STOP.filter((s) => s < stopAt - WALKER_RAMP - 1.1)
    .concat(CONFIG.HALLOWEEN_WALKER_TUGS_AFTER_STOP.map((s) => goAt + s).filter((s) => s < endAt - 1.5));
  return { speed, stopX, stopAt, goAt, endAt, tugs };
}

// Where the drawing is at time t, and how fast it goes (0 = stopped, 1 = full speed).
function walkerPosition(plan, time) {
  const { speed, stopX, stopAt, goAt } = plan;
  const r = WALKER_RAMP;
  if (time <= stopAt - r) return { x: WALKER_X0 + speed * time, run: 1 };
  if (time <= stopAt) {
    const s = time - (stopAt - r);
    return { x: WALKER_X0 + speed * (stopAt - r) + speed * (s - (s * s) / (2 * r)), run: 1 - s / r };
  }
  if (time <= goAt) return { x: stopX, run: 0 };
  if (time <= goAt + r) {
    const s = time - goAt;
    return { x: stopX + (speed * s * s) / (2 * r), run: s / r };
  }
  return { x: stopX + speed * (r / 2 + (time - goAt - r)), run: 1 };
}

function renderWalker() {
  const { plan, nodes: n } = walker;
  const time = walker.t;
  const sink = walker.sinkT;
  const f = CONFIG.HALLOWEEN_WALKER_SINK_SECONDS / 2.2; // the sinking below is written for 2.2 s; f stretches it to the CONFIG time
  const sinceSink = sink >= 0 ? sink / f : -1;           // seconds of that 2.2 s script
  const { x, run } = walkerPosition(plan, time);
  const set = (key, attr, value) => n[key].setAttribute(attr, value);
  const num = (v) => v.toFixed(2);

  const cyc = x / 25;
  const phase = x / 41.6;
  const skullPhase = x / 47;
  let tug = -1;
  plan.tugs.forEach((start) => { if (time >= start && time <= start + 1) tug = time - start; });
  let arm = 0;
  let jerk = 0;
  let wind = 0;
  if (tug >= 0) {
    arm = walkerKeys(tug, [[0, 0], [0.3, 8], [0.55, -10], [1, 0]]);
    jerk = walkerKeys(tug, [[0, 0], [0.3, 0], [0.55, 4], [1, 0]]);
    wind = walkerKeys(tug, [[0, 0], [0.3, 0.5], [0.55, 0], [1, 0]]);
  }
  const sinceStop = time - plan.stopAt;
  const sinceGo = time - plan.goAt;
  const coast = time < plan.stopAt ? 0 : time < plan.goAt ? 2.5 * (1 - Math.exp(-sinceStop * 8)) : 2.5 * Math.exp(-sinceGo * 5);
  const stopSlack = time < plan.stopAt ? 0 : time < plan.goAt ? Math.min(1, sinceStop * 5) : Math.max(0, 1 - sinceGo * 1.7);
  const slack = Math.max(stopSlack, wind);
  const look = walkerKeys(Math.max(0, Math.min(1, (sinceStop - 0.3) / 1.9)), [[0, 0], [0.2, -4.5], [0.8, -4.5], [1, 0]]);

  // Sinking into the ground (a quiz starts while it is on screen), a script of 2.2 s: everything stops, a hole opens in the
  // ground with a beam of light and sparks, the figure sinks into it (the lantern flares, then goes out), the rope drags the
  // skeleton along the ground to the hole and down, and the hole closes.
  const sc = sinceSink;
  const sinkP = sc >= 0 ? 135 * walkerEase((sc - 0.55) / 0.8) : 0;
  const slideS = sc >= 0 ? 95 * walkerSmooth(Math.max(0, Math.min(1, (sc - 0.7) / 0.6))) : 0;
  const sinkS = sc >= 0 ? 55 * walkerEase((sc - 1.25) / 0.55) : 0;
  const open = sc >= 0 ? walkerOut((sc - 0.2) / 0.5) * (1 - walkerEase((sc - 1.8) / 0.4)) : 0;
  const beam = sc >= 0 ? walkerOut((sc - 0.45) / 0.25) * (1 - walkerEase((sc - 1.6) / 0.4)) : 0;
  const flare = sc >= 0 ? Math.sin(Math.PI * Math.max(0, Math.min(1, (sc - 0.15) / 0.5))) : 0;
  const light = sc >= 0 ? Math.max(0, Math.min(1, 1 - (sc - 0.5) / 0.8)) : 1;

  set('scene', 'transform', `translate(${num(x)} ${num(WALKER_GROUND - 158 * WALKER_SCALE)}) scale(${WALKER_SCALE})`);
  set('ground', 'opacity', num(Math.min(1, time / 0.6, (plan.endAt - time) / 0.6)));
  set('person', 'transform', `translate(0 ${num(-0.8 * (0.5 - 0.5 * Math.cos(2 * WALKER_TAU * cyc)) * run)})`);
  set('sinkP', 'transform', `translate(0 ${num(sinkP)})`);
  set('sinkS', 'transform', `translate(${num(slideS)} ${num(sinkS)})`);
  set('body', 'transform', `translate(110 158) skewX(${num(1.4 * run * Math.sin(WALKER_TAU * cyc + 1) + 0.5 * Math.sin(time * 1.9))}) translate(-110 -158)`);
  set('face', 'transform', `translate(${num(look)} 0)`);
  set('lant', 'transform', `rotate(${num(3 * run * Math.sin(WALKER_TAU * cyc - 0.8) + 1.2 * Math.sin(time * 3.7))} 136 48)`);
  set('arm', 'transform', `rotate(${num(arm)} 96 78)`);
  const sine = Math.sin(WALKER_TAU * cyc);
  const cosine = Math.cos(WALKER_TAU * cyc);
  set('shL', 'transform', `translate(${num(-3 * cosine * run)} ${num(-1.8 * Math.max(0, sine) * run)})`);
  set('shR', 'transform', `translate(${num(3 * cosine * run)} ${num(-1.8 * Math.max(0, -sine) * run)})`);

  const bumpAt = phase - Math.floor(phase);
  const bump = -(1.6 * Math.pow(Math.max(0, Math.sin(WALKER_TAU * bumpAt)), 2) + 0.5 * Math.pow(Math.max(0, Math.sin(2 * WALKER_TAU * bumpAt + 1)), 2)) * run;
  set('coast', 'transform', `translate(${num(coast)} 0)`);
  set('jerk', 'transform', `translate(${num(jerk)} 0)`);
  set('bump', 'transform', `translate(0 ${num(bump)})`);
  set('legs', 'transform', `rotate(${num(2.5 * Math.sin(WALKER_TAU * bumpAt) * run)} 26 155)`);
  set('skull', 'transform', `rotate(${num(4 * Math.sin(WALKER_TAU * skullPhase) * run)} 60 153)`);

  for (let k = 1; k <= 3; k++) {
    let q = x / (plan.speed * 0.9) + (k - 1) / 3;
    q -= Math.floor(q);
    set(`d${k}`, 'transform', `translate(${num(-12 * q)} ${num(-3 * q)})`);
    set(`d${k}`, 'opacity', num(0.9 * (1 - q) * run));
  }

  const hand = walkerRotate(128, 122, 132, 78, arm);
  const endX = -30 + 1.4 * (71 + coast + jerk) + slideS;
  const endY = 158 + 1.4 * (140 - 158 + bump) + sinkS;
  const handY = hand[1] + sinkP;
  set('rope', 'd', `M${hand[0].toFixed(1)} ${handY.toFixed(1)} Q${((hand[0] + endX) / 2).toFixed(1)} ${((handY + endY) / 2 + 12.6 * slack).toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`);

  set('flame', 'opacity', num(light * (0.78 + 0.22 * Math.sin(time * 14) * Math.sin(time * 5.3 + 1))));
  set('flame', 'transform', `translate(136 66) scale(${num(1 + 0.9 * flare)}) translate(-136 -66)`);
  set('rings', 'transform', `translate(0 ${num(sinkP)})`);
  set('r1', 'r', num((13 + Math.sin(time * 4.1)) * (1 + 0.5 * flare) * light));
  set('r2', 'r', num((20 + 1.4 * Math.sin(time * 3.3 + 1)) * (1 + 0.5 * flare) * light));
  set('pool', 'rx', num((26 + 2 * Math.sin(time * 4.1)) * light));

  // The hole in the ground (a gap in the ground line with glowing ends), the beam of light and the light on the ground.
  const holeHalf = 36 * open;
  set('hole', 'x', num(146 - holeHalf));
  set('hole', 'width', num(2 * holeHalf));
  set('rimL', 'd', `M${num(146 - holeHalf)} 155.6 V160.4`);
  set('rimR', 'd', `M${num(146 + holeHalf)} 155.6 V160.4`);
  set('rimL', 'opacity', num(open));
  set('rimR', 'opacity', num(open));
  set('beam', 'opacity', num(0.2 * beam));
  set('spill', 'rx', num(Math.max(1, holeHalf * 1.15)));
  set('spill', 'opacity', num(0.4 * open));

  // Flying dirt and sparks from the hole.
  for (let k = 0; k < 6; k++) {
    const u = sc >= 0 ? (sc - 0.55) / 0.9 : -1;
    const on = u > 0 && u < 1;
    const side = k - 2.5;
    set(`k${k}`, 'cx', num(146 + side * 5 + side * 16 * (on ? u : 0)));
    set(`k${k}`, 'cy', num(157 - (45 + 6 * (k % 3)) * (on ? u : 0) + 120 * (on ? u * u : 0)));
    set(`k${k}`, 'opacity', on ? num(0.9 * (1 - u)) : '0');
  }
  for (let k = 0; k < 8; k++) {
    const u = sc >= 0 ? (sc - 0.5 - (k % 4) * 0.05) / 1.1 : -1;
    const on = u > 0 && u < 1;
    const side = k - 3.5;
    set(`p${k}`, 'cx', num(146 + side * 6 + side * 9 * (on ? u : 0)));
    set(`p${k}`, 'cy', num(157 - (65 + 9 * (k % 4)) * (on ? u : 0) + 95 * (on ? u * u : 0)));
    set(`p${k}`, 'opacity', on ? num(Math.sqrt(1 - u)) : '0');
  }
}

function tickWalker(now) {
  const dt = walker.last ? Math.min(0.05, (now - walker.last) / 1000) : 0; // a hidden tab does not make it jump
  walker.last = now;
  if (walker.sinkT >= 0) {
    walker.sinkT += dt;
    walker.t += dt * Math.max(0, 1 - walker.sinkT / 0.25); // the world eases to a stop, then it sinks
  } else {
    walker.t += dt;
  }
  if (walker.t >= walker.plan.endAt || walker.sinkT >= CONFIG.HALLOWEEN_WALKER_SINK_SECONDS) {
    finishWalker();
    return;
  }
  renderWalker();
  walker.raf = requestAnimationFrame(tickWalker);
}

// Starts the pass: the drawing is put on the page (the strip lives outside every screen, so changing menus never touches it).
function beginWalker() {
  walker.timer = 0;
  if (walker.done || walker.active) return;
  if (state.screen === 'quiz') { walker.done = true; return; }
  const host = $('#walker');
  host.innerHTML = walkerMarkup();
  walker.nodes = {};
  host.querySelectorAll('[data-w]').forEach((node) => { walker.nodes[node.dataset.w] = node; });
  walker.plan = planWalker(window.innerWidth);
  walker.t = 0;
  walker.last = 0;
  walker.sinkT = -1;
  walker.active = true;
  host.hidden = false;
  renderWalker();
  walker.raf = requestAnimationFrame(tickWalker);
}

function finishWalker() {
  cancelAnimationFrame(walker.raf);
  clearTimeout(walker.timer);
  if (walker.active) walker.done = true;
  const after = walker.sinkT >= 0 ? walker.after : null;
  const screen = walker.afterScreen;
  walker.active = false;
  walker.timer = 0;
  walker.waiting = false;
  walker.sinkT = -1;
  walker.after = null;
  const host = $('#walker');
  host.replaceChildren();
  host.hidden = true;
  if (after && state.screen === screen) after(); // the quiz that waited for the sinking starts now (not if the player went elsewhere)
}

// Trick or Treat turned on (or the page opened with it on): the pass starts a few seconds later, once per visit.
// With a pop-up open (the switch was turned on in Settings) it waits: the few seconds start when the pop-up closes.
function startWalker() {
  if (walker.done || walker.active || walker.timer) return;
  if (prefersReducedMotion()) { walker.done = true; return; }
  if (!$('#modal-overlay').hidden) { walker.waiting = true; return; }
  walker.waiting = false;
  walker.timer = setTimeout(beginWalker, CONFIG.HALLOWEEN_WALKER_DELAY_SECONDS * 1000);
}

// closeModal() tells it that a pop-up has closed.
function walkerModalClosed() {
  if (walker.waiting) startWalker();
}

// Trick or Treat turned off: it goes at once (a pass that had started does not come back).
function stopWalker() {
  finishWalker();
}

// A quiz is about to start while it is on screen: it sinks into the ground and does not come back, and `after` (the quiz)
// runs when it has gone. Returns true while it is sinking, so the caller waits; false when nothing is on screen.
function sinkWalker(after) {
  if (!walker.active) return false;
  if (walker.sinkT < 0) {
    walker.sinkT = 0;
    walker.after = after || null;
    walker.afterScreen = state.screen;
    walker.timer = setTimeout(finishWalker, CONFIG.HALLOWEEN_WALKER_SINK_SECONDS * 1000 + 400); // in case the browser pauses animation frames
  }
  return true;
}

