# my-game-project
I have a dream so close.

A language-learning quiz game in a single file: [index.html](index.html). No build step — open the file in a browser. The only external resource is the Inter font from Google Fonts (optional: the system font is used when it can't load).

Content is a placeholder for now: all texts that were not explicitly named are lorem ipsum. The visual design ("clean study app", level colors, dark mode, motion, sound) is documented in [DESIGN.md](DESIGN.md). Agents must read [AGENTS.md](AGENTS.md) first.

## Screen flow

```
Level (A1 A2 B1 B2 C1)
 └─ Category (Vocabulary, Grammar)
     └─ Topic (10 lorem ipsum topics)
         └─ Question type (Multiple Choice, Fill in the Blanks, True or False, Matching)
             └─ Difficulty (Easy, Medium, Hard, Very Hard) + "same duration" switch
                 └─ Quiz (8 questions)
                     └─ Results
```

- Every screen is a `<section id="screen-NAME" class="screen">`; `showScreen(name)` shows one and hides the others.
- Back buttons use `data-back="NAME"` (fixed parent screen, not a history stack). The level screen is the root and has no back button.
- The quiz screen's Back button opens a "Quit quiz?" confirm (timer paused). Quit → difficulty screen, progress lost. Cancel → timer resumes.
- Results screen: Back (→ difficulty), Retry (same settings), Main menu (→ level).
- Breadcrumb (`.breadcrumb` in each screen) is built from `state.nav` up to the screen's depth (`SCREEN_DEPTH`).
- **Credits**: footer link on every screen except the quiz screen (results included). Opens a modal listing `CREDITS` (lorem ipsum).
- **Top bar** (`#topbar`): theme and mute buttons, also hidden on the quiz screen.
- **Level accent**: `showScreen()` sets `document.body.dataset.level` to the chosen level on every screen except the level screen (where it is removed → neutral accent). CSS maps it to `--accent`.

## Configuration

All tunable numbers are in the `CONFIG` object at the top of the script:

| Key | Value | Meaning |
|---|---|---|
| `DIFFICULTIES[].seconds` | Easy 60, Medium 45, Hard 30, Very Hard 20 | per-question time with the switch OFF |
| `SAME_DURATION_SECONDS` | 60 | per-question time for every difficulty with the switch ON |
| `QUESTIONS_PER_QUIZ` | 8 | |
| `POINTS_CORRECT` | 12.5 | added on a correct answer (8 × 12.5 = 100) |
| `POINTS_INCORRECT` | 6 | subtracted on an incorrect answer |
| `EXTENSION_SECONDS` / `EXTENSION_PENALTY` | 10 / 10 | time-out extension: +10 s for −10 points |
| `SCORE_MIN` / `SCORE_MAX` | 0 / 100 | clamp, applied **only on the results screen** |
| `UNGRADED_TYPES` | `['match']` | types that give/take no points |
| `MC_OPTIONS`, `MATCH_PAIRS`, `FILL_BANK_MIN/MAX` | 4, 4, 3–4 | question shape for lorem generation |
| `TIMER_LOW_RATIO` | 0.25 | timer bar pulses below this fraction |
| `TICK_LAST_SECONDS` | 5 | tick sound in the last N seconds (normal and extra time) |
| `CONFETTI_MIN_SCORE` | 80 | graded quizzes: confetti when final score ≥ this |
| `CONFETTI_MIN_MATCH_CORRECT` | 7 | matching: confetti when fully correct questions ≥ this |
| `CONFETTI_COUNT` / `CONFETTI_MS` | 90 / 2800 | confetti pieces and duration |

Placeholder lists: `TOPICS` (10 names), `CREDITS`.

## State

```js
state.nav  = { level, category, topic /* index */, type, difficulty, sameDuration }
state.quiz = {
  questions, index,
  score,          // raw running score, can go negative mid-quiz
  graded,         // false for UNGRADED_TYPES
  records[],      // one per question, see below
  timer: { totalMs, remainingMs, intervalId, lastTs, extension, lastTickSecond },
  answered,       // current question is locked (answered / skipped / game over)
  over,           // game over happened
  ui,             // renderer-specific state for the current question
}
record = { status: 'correct'|'incorrect'|'skipped'|'unanswered', userAnswer, points, penalty, extensionUsed, timedOut }
```

## Scoring algorithm

- Correct: `+12.5`. Incorrect: `−6`. Skipped: `0`. Time extension: `−10`.
- The running score is **not** clamped during the quiz (it may be shown as negative).
- Final score = `clamp(score, 0, 100)` — `clampScore()` in `showResults()` only.
- Matching (`UNGRADED_TYPES`): no points for correct/incorrect and no extension penalty; the quiz header and results show "not graded yet". Pair correctness is still checked and shown.

> **Matching grading is undecided.** Matching questions currently give and take no points. When a rule is chosen (e.g. per pair, all-or-nothing), remove `'match'` from `CONFIG.UNGRADED_TYPES` and adjust the matching Check handler in `renderMatch()` / `submitAnswer()` accordingly.

## Timer and time-out algorithm

- Timer is time-based (`performance.now()` deltas every `TIMER_TICK_MS`), so pausing preserves exact remaining ms.
- Functions: `startTimer(seconds, extension)`, `pauseTimer()`, `resumeTimer()`, `stopTimer()`, `tick()`, `renderTimer()`.
- Duration per question = `getQuestionSeconds()` → `SAME_DURATION_SECONDS` if the switch is ON, else the difficulty's `seconds`.
- The timer stops when the question is answered and is paused while the quit modal is open. The time-out/game-over modals open with the timer already stopped.
- Time reaches 0 (`onTimeUp()`):
  1. First time on this question → **Time out** modal: `+10 seconds (−10 points)` or `Skip question`.
     - Extension (`useExtension()`): penalty applied (if graded), timer restarts at 10 s in "extension" mode (striped orange bar, "Extra time" label). Only once per question.
     - Skip (`skipQuestion()`): record = skipped, go straight to the next question (or results if last).
  2. Extension also reaches 0 → `gameOver()`: the quiz ends. **Game over** modal: `Retry` (same level/category/topic/type/difficulty/switch) or `See results`. The current question is marked `timedOut`, it and all later questions are "Not answered".
- Ticks: in `tick()`, `secondsLeft = ceil(remainingMs / 1000)`; when `secondsLeft ≤ TICK_LAST_SECONDS` and it differs from `timer.lastTickSecond`, play `'tick'` once (so 5, 4, 3, 2, 1). `startTimer()` resets `lastTickSecond`, so the extra time ticks too.

## Theme, sound and confetti

- **Theme** (`initTheme`, `applyTheme`): cycles `auto → light → dark`. `auto` removes `html[data-theme]` so CSS follows `prefers-color-scheme`. Saved in `localStorage["lg-theme"]`; an inline script in `<head>` applies it before first paint.
- **Sound** (`initSound`, `getAudio`, `playNote`, `playSound(name)`): Web Audio API, notes defined in `SOUNDS` (`correct`, `wrong`, `tick`). The `AudioContext` is created/resumed on the first `pointerdown`/`keydown` (browser autoplay rules). On by default; mute saved in `localStorage["lg-muted"]` (`'1'` = muted). `submitAnswer()` plays `correct`/`wrong`.
- **Storage**: `loadPref` / `savePref` wrap `localStorage` in try/catch; if storage is blocked (private mode, `data:` previews) the game still works and simply doesn't remember.
- **Correct animation**: `submitAnswer()` adds `.pop` to every `.is-correct` element in the question when the answer is correct.
- **Confetti** (`launchConfetti`, `stopConfetti`): `<canvas>` overlay drawn with `requestAnimationFrame` in the five level colors (read from CSS `--lvl-*`). Triggered at the end of `showResults()` when `clampScore(score) ≥ CONFETTI_MIN_SCORE` (graded) or `correct count ≥ CONFETTI_MIN_MATCH_CORRECT` (matching). Removed after `CONFETTI_MS` or by `showScreen()`.
- **Reduced motion**: `prefersReducedMotion()` skips confetti; CSS disables all animations/transitions under `prefers-reduced-motion: reduce`.

## Answer feedback

`submitAnswer(correct, userAnswer)` locks the question, stops the timer, updates score and shows feedback:
- Correct → "Correct!" + the answer.
- Incorrect → "Incorrect." + correct answer + explanation (lorem ipsum).
- Then a **Next** button (labelled **See results** on the last question). No auto-advance. No voluntary skip (skip only exists in the time-out modal).

## Question types

Renderers are in `RENDERERS = { mc, tf, fill, match }`, each `render*(q, area)`.

| Type | Data shape | Interaction |
|---|---|---|
| `mc` | `{ type, prompt, options: string[4], answer: index, explanation }` | click an option = submit |
| `tf` | `{ type, prompt, answer: boolean, explanation }` | click True/False = submit |
| `fill` | `{ type, before, after, answer, bank: string[3–4], explanation }` | drag a word from the word bank (above the sentence) into the single blank, then **Check** |
| `match` | `{ type, prompt, pairs: [{left, right}] ×4, rightOrder: index[], explanation }` | click a left item, then a right item to pair; click a paired item to undo; **Check** when all pairs are made |

### Fill-in-the-blank drag and drop

- Implemented with pointer events (`onChipPointerDown` → `onDragMove` → `onDragEnd`), so it works with mouse, touch and pen. A floating clone (`.drag-ghost`, `pointer-events: none`) follows the pointer; the drop target is found with `document.elementFromPoint`.
- Dropping on the blank places the word; if the blank already had a word, that word returns to the bank. Dragging the placed word anywhere outside the blank returns it to the bank (in its original bank order).
- Movement under `DRAG_THRESHOLD_PX` is treated as a tap: tap a bank word to place it, tap the placed word to return it (accessibility/convenience fallback).
- `cancelDrag()` is called on answer, time-out and quit so no ghost is left behind.

### Matching

- `rightOrder` is the shuffled display order of right items; correct pairing is `left i ↔ right i`.
- Paired items show the same number badge (`data-pair`, rendered via CSS `::after`).

## Content (questions)

- `getQuestions(nav)` looks up `QUESTION_BANK[key]` with key `level|category|topicIndex|type` (e.g. `A1|vocabulary|0|mc`). If it has at least 8 questions, the first 8 are used; otherwise `generateLoremQuestions(nav)` creates placeholders.
- Lorem questions use a seeded RNG (`hashString` + `mulberry32`) keyed by level/category/topic/type, so the same quiz always produces the same questions (Retry repeats the exact quiz).
- Difficulty currently only changes the timer. To give each difficulty its own questions later, add `nav.difficulty` to `quizKey()`.

## Confirmed decisions

- 5 levels, 2 categories, 10 topics, 4 question types, 4 difficulties, 8 questions per quiz.
- Timers: 60/45/30/20 s; switch ON → 60 s for all.
- Next button after feedback; no auto-advance; skip only from the time-out modal.
- Fill in the blanks: 1 blank, 3–4 word bank, drag and drop, Check button.
- Matching: click left then right, 4 pairs, Check after all pairs, not graded yet.
- Quiz Back = quit with confirmation.
- Credits on all screens except the quiz screen.

## Roadmap

Planned work (not implemented yet):

1. Design will be handled. — **Done** (see [DESIGN.md](DESIGN.md); remaining items are under "Open design work").
2. One by one, the menu items will be decided (replacing the lorem ipsum labels, e.g. `TOPICS`).
3. Part by part, the menus will be filled with actual content (via `QUESTION_BANK`, see "Content (questions)").
4. The Vocabulary section will be divided into **Theme Based** and **AWL** (Academic Word List). Currently Vocabulary leads straight to the 10 topics, so this will need a new step or screen between Category and Topic.
