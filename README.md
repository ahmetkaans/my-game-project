# my-game-project
I have a dream so close.

A language-learning quiz game in a single file: [index.html](index.html). No build step — open the file in a browser. The only external resource is the Inter font from Google Fonts (optional: the system font is used when it can't load).

The game is called **My Game Project**. Texts the owner has not named are still lorem ipsum (mostly questions and the topic names of other levels); the approved screen and pop-up texts are listed in DESIGN.md. The visual design ("clean study app", level colors, dark mode, motion, sound) is documented in [DESIGN.md](DESIGN.md). Agents must read [AGENTS.md](AGENTS.md) first.

## How to play

**You only need one file: [`index.html`](index.html).** Nothing to install, no account.

1. Open [`index.html`](index.html) here on GitHub.
2. Click the **download** button (the arrow icon, "Download raw file") at the top right of the file.
3. Open the downloaded file with your browser (Chrome, Edge, Firefox or Safari): double-click it, or drag it into a browser window.

- The game works on **phones and computers**.
- Works **offline**, too: without internet, the game uses your device's own font instead of Inter.
- Your theme and sound choices are remembered in that browser.

**Coming later: a website.** The plan is to publish the game on a website, so anyone can play it from a link on a computer or a phone, with nothing to download (see "Roadmap").

## Screen flow

```
Level (A1 A2 B1 B2 C1)
 └─ Category (Vocabulary, Grammar)
     └─ Topic (per section: 15 vocabulary themes for A1 Vocabulary, 21 grammar topics for A1 Grammar, 10 lorem ipsum topics elsewhere)
         └─ Question type (Multiple Choice, Fill in the Blanks, True or False, Matching)
             └─ Difficulty (Easy, Medium, Hard, Very Hard) + "same duration" switch
                 └─ "Words in this game" pop-up (Start)
                     └─ Quiz (8 questions; Matching 2–4)
                     └─ Results
```

- Every screen is a `<section id="screen-NAME" class="screen">`; `showScreen(name)` shows one and hides the others.
- Back buttons use `data-back="NAME"` (fixed parent screen, not a history stack). The level screen is the root and has no back button.
- **"Words in this game" pop-up** (`openWordPreview()`, called by `startQuiz()`): every time a quiz starts, including Retry, a pop-up lists the quiz's tested words (`quizTargetWords()`: Multiple Choice answers, Fill answers, True or False `target`s, Matching left words), each with **all of its word types at that level** and a short meaning for each, from the level's glossary (`glossarySenses()`; lorem placeholders when a word has no entry). **The word type used in that game is underlined** (`.word-type.is-used`); a word with one type has that one underlined. Meanings are shown in every question type, Matching too (owner's decision: it is practice, and pre-teaching helps). One button, **Start**, closes it and shows the first question (owner's decision: a second **Skip** button did the same job, and "Skip" suggested the words don't matter); the timer starts only then. The pop-up can't be dismissed by Escape or clicking outside.
- The quiz screen's Back button opens a "Quit quiz?" confirm (timer paused). Quit → difficulty screen, progress lost. Cancel → timer resumes.
- Results screen: Back (→ difficulty), Retry (same settings), Main menu (→ level).
- Breadcrumb (`.breadcrumb` in each screen) is built from `state.nav` up to the screen's depth (`SCREEN_DEPTH`).
- **Credits**: footer link on every screen except the quiz screen (results included). Opens a modal listing `CREDITS` (Ahmet Kaan Sarılarlı, Enes Miraç Ateş).
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
| `UNGRADED_TYPES` | `[]` | types that give/take no points (none: Matching is graded) |
| `MC_OPTIONS`, `MATCH_PAIRS`, `FILL_BANK_MIN/MAX` | 4, 4, 3–4 | question shape |
| `MC_MAX_SAME_POSITION_IN_A_ROW` | 2 | the correct option is never in the same position more often in a row |
| `MATCH_MIN_QUESTIONS` / `MATCH_MAX_LOREM_QUESTIONS` | 2 / 4 | Matching quizzes have a variable length; lorem ones have 2–4 questions |
| `FILL_MISSPELLED_SHARE` | 0.5 | a misspelled Fill answer earns this share of `POINTS_CORRECT` (6.25), no penalty |
| `SPELL_SHORT_MAX_LENGTH` | 5 | answers up to this many letters count as short |
| `SPELL_MAX_EDITS_SHORT` / `SPELL_MAX_EDITS_LONG` | 1 / 2 | allowed spelling differences for short / longer answers |
| `TIMER_LOW_RATIO` | 0.25 | timer bar pulses below this fraction |
| `TICK_LAST_SECONDS` | 5 | tick sound in the last N seconds (normal and extra time) |
| `CONFETTI_MIN_SCORE` | 80 | Multiple Choice, Fill, True or False: confetti when final score ≥ this |
| `CONFETTI_MIN_MATCH_SCORE` | 75 | Matching: confetti when final score ≥ this |
| `CONFETTI_COUNT` / `CONFETTI_MS` | 90 / 2800 | confetti pieces and duration |

`CREDITS` holds the names shown in the Credits pop-up (Ahmet Kaan Sarılarlı, Enes Miraç Ateş).

### Topics

- `TOPICS_BY_SECTION` holds real topic names per section, keyed `level|category` (e.g. `'A1|grammar'`). Array order = button order. Any number of topics is allowed.
- `DEFAULT_TOPICS` (10 lorem ipsum names) is used for every section without an entry.
- `getTopics(nav)` returns the right list. `renderTopicButtons()` rebuilds the topic grid each time a category is chosen; `breadcrumbParts()` also uses `getTopics()`.
- `nav.topic` is the topic's **index** in that list, so quiz keys (`quizKey()`, `QUESTION_BANK`) use the index. Don't reorder a section's topics after real questions are added for it.
- In the code every menu item at this step is a "topic". In the docs, Vocabulary items are called **vocabulary themes** and Grammar items **grammar topics**.
- Decided so far: **A1 Vocabulary** (15 vocabulary themes, in textbook order) and **A1 Grammar** (21 grammar topics); their words are in `ORG_A1_WORDS.md`. Their quizzes use lorem ipsum questions, except Greetings and Feelings (see "Content (questions)").

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
record = { status: 'correct'|'partial'|'incorrect'|'skipped'|'unanswered', userAnswer, note, points, penalty, extensionUsed, timedOut }
// partial = misspelled Fill answer, or a Matching question with 1–3 correct pairs; note = the spelling warning / "2 of 4 pairs are correct."
```

## Scoring algorithm

- **Multiple Choice, True or False, Fill in the Blanks:** correct `+12.5`, incorrect `−6`, skipped `0`.
- **Fill in the Blanks misspelled** (see "Typed Fill in the Blanks"): half points (`+6.25`), **no penalty**, status `partial`.
- **Matching:**
  - A Matching question is worth **100 ÷ the number of questions** in that Matching quiz (Matching quizzes have a variable length, see "Question content method"), so the maximum is still 100.
  - **Partial points:** each correct pair earns a quarter of the question's points. Example: 2 questions → 50 points each → 12.5 per pair; 2 of 4 pairs right = 25 points (status `partial`).
  - **No penalty:** wrong pairs take no points away (not −6): one mistake usually breaks two pairs at once, and with only 2–4 questions a penalty would swing the score too much.
- **Time extension:** `−10` in every question type.
- Renderers compute the points and call `submitAnswer(outcome, userAnswer, points, note)`; `choicePoints()` gives +12.5 / −6.
- The score is kept exact (3 × 33.33… = 100); `fmt()` removes float noise and shows at most 2 decimals (6.25, 33.33).
- The running score is **not** clamped during the quiz (it may be shown as negative).
- Final score = `clamp(score, 0, 100)` — `clampScore()` in `showResults()` only.
- `UNGRADED_TYPES` is empty now; a type listed there would give and take no points and show "not graded".

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
- **Sound** (`initSound`, `getAudio`, `playNote`, `playSound(name)`): Web Audio API, notes defined in `SOUNDS` (`correct`, `partial`, `wrong`, `tick`). The `AudioContext` is created/resumed on the first `pointerdown`/`keydown` (browser autoplay rules). On by default; mute saved in `localStorage["lg-muted"]` (`'1'` = muted). `submitAnswer()` plays `correct` / `partial` / `wrong`.
- **Storage**: `loadPref` / `savePref` wrap `localStorage` in try/catch; if storage is blocked (private mode, `data:` previews) the game still works and simply doesn't remember.
- **Correct animation**: `submitAnswer()` adds `.pop` to every `.is-correct` element in the question when the answer is correct.
- **Confetti** (`launchConfetti`, `stopConfetti`): `<canvas>` overlay drawn with `requestAnimationFrame` in the five level colors (read from CSS `--lvl-*`). Triggered at the end of `showResults()` when the final score ≥ `CONFETTI_MIN_SCORE` (80), or ≥ `CONFETTI_MIN_MATCH_SCORE` (75) for Matching. Removed after `CONFETTI_MS` or by `showScreen()`.
- **Reduced motion**: `prefersReducedMotion()` skips confetti; CSS disables all animations/transitions under `prefers-reduced-motion: reduce`.

## Answer feedback

`submitAnswer(outcome, userAnswer, points, note)` locks the question, stops the timer, updates score, plays a sound and shows feedback (with the points earned):
- Correct (`.feedback.ok`, green) → "Correct!" + the answer.
- Partial (`.feedback.partial`, level-color tint, soft one-note sound) → Fill: "Almost!" + "Check your spelling: "coffee", not "cofee"."; Matching: "Partly correct." + "2 of 4 pairs are correct." Then the correct answer + explanation.
- Incorrect (`.feedback.bad`, red) → "Incorrect." + correct answer + explanation.
- Results: summary shows "Misspelled" / "Partly correct" counts when there are any; partial result cards have a level-color left border (`st-partial`) and a "Note" line.
- Then a **Next** button (labelled **See results** on the last question). No auto-advance. No voluntary skip (skip only exists in the time-out modal).

## Question types

Renderers are in `RENDERERS = { mc, tf, fill, match }`, each `render*(q, area)`.

**Stored shapes** (in the question bank; the correct answer is always **first**, the game shuffles):

| Type | Stored data shape | Interaction |
|---|---|---|
| `mc` | `{ type, prompt, options: [correct, wrong1, wrong2, wrong3], explanation }` (+ `targetType` when the answer has several word types, on every type; + `target` on Multiple Choice and Fill when the answer is not written in its dictionary form, e.g. `"laughs"` → `"target": "laugh"`, `"Hello"` → `"hello"`, so the pop-up, the glossary and the check script use the dictionary word) | click an option = submit |
| `tf` | `{ type, prompt, answer: true\|false, target, explanation }` (`target` = the word the statement is about, in its dictionary form; + `targetType` when the word has several word types) | click True/False = submit |
| `fill` | `{ type, before, after, answer, bank: [answer, wrong1, wrong2(, wrong3)], explanation }` (+ `target` when the answer is not in its dictionary form, e.g. `"happened"` → `"happen"`, `"Hi"` → `"hi"`; + `targetType` when the word has several word types) | type one bank word into the blank, then **Check** (or Enter) |
| `match` | `{ type, prompt, pairs: [{left, right(, type)}] ×4, explanation }` (correct pairing is `left i ↔ right i`; a pair has `type` when its word has several word types) | click a left item, then a right item to pair; click a paired item to undo; **Check** when all pairs are made |

Real example (Fill, Very Hard): `{ "type": "fill", "before": "\"What", "after": "to your arm?\" \"I fell off my bike.\"", "answer": "happened", "bank": ["happened", "hoped", "missed", "believed"], "target": "happen", "explanation": "…" }`. All real questions are in the `#question-bank` block of `index.html`; copy their style.

**Mindful shuffling** (`prepareQuiz(questions, key)` in `startQuiz()`, seeded by the quiz key so Retry shows exactly the same quiz; the stored questions are never changed):
- `mc`: `balancedPositions()` puts the correct answer in each of the 4 positions equally often (8 questions → each position exactly twice), never more than `MC_MAX_SAME_POSITION_IN_A_ROW` (2) times in a row; wrong options are shuffled into the other positions. Sets `q.answer` (index) for the renderer.
- `fill`: bank order shuffled.
- `match`: right-side order (`q.rightOrder`) shuffled, never the same order as the left side.
- `tf`: **not shuffled.** The stored order is the order students see, so write the 8 statements in a mixed true/false order: never more than 2 of the same answer in a row, and no simple pattern such as TFTFTFTF.

### Typed Fill in the Blanks

- The bank of 3–4 words is shown **above the sentence** (display only); the student **types** one of them into the blank (`.blank-input`), then presses **Check** or Enter. Check is disabled while the input is empty. The input is focused when the question opens.
- The input has a fixed width (it never hints at the word's length) and has autocorrect, auto-capitalization and spell check turned off, so phones don't fix the spelling for the student.
- **Sentence** = `before` + blank + `after`. `fillBefore()` / `fillAfter()` add a space around the blank like normal print: none after an opening quote (`before` ending in `"`) and none before punctuation or a closing quote (`after` starting with `. , ! ? ; : " '`). So `before` can be just `"` when the blank starts a quote.
- **Comparing the answer** (`judgeFill(input, q)`, `editDistance()`, `normalizeAnswer()`): ignore capital letters, extra spaces and curly apostrophes. `editDistance()` counts the letters that differ (insert, delete, replace, or a swap of two neighboring letters such as *fisrt* = 1).
  - **Exactly the answer** → correct, full points.
  - **Exactly a wrong bank word** → incorrect.
  - **Close to the answer** and **strictly closer to the answer than to every wrong bank word** → **misspelled**: half points (`+6.25`), **no penalty**, and a spelling warning, e.g. *Check your spelling: "coffee", not "cofee".* "Close" = at most `SPELL_MAX_EDITS_SHORT` (1) different letter for answers of up to `SPELL_SHORT_MAX_LENGTH` (5) letters, at most `SPELL_MAX_EDITS_LONG` (2) for longer answers.
  - **Anything else** → incorrect (`−6`).
- Results show what the student typed, the correct word, and the spelling warning ("Note").

### Matching

- Matching quizzes have a **variable length** (all questions of the bank entry, at least `MATCH_MIN_QUESTIONS`).
- `rightOrder` is the shuffled display order of right items; correct pairing is `left i ↔ right i`.
- Paired items show the same number badge (`data-pair`, rendered via CSS `::after`). On phones the badge sits on the box's top-right corner and the word column is only as wide as its longest word, so long meanings stay readable (DESIGN.md, "Matching").

## Content (questions)

**Written so far:** A1 Vocabulary, Greetings and Feelings (pilot theme, plan approved 2026-10-31): all 16 quizzes (4 question types × 4 difficulties), with glossary entries for all 34 words of the theme. Everything else is still lorem.

- **Question bank:** a JSON block in `index.html`, `<script type="application/json" id="question-bank">`, before the main script. `loadQuestionBank()` parses it once at startup (invalid JSON → console warning and lorem questions). It is JSON (not a JS object) so the check script can read it.
- **Glossary:** a second JSON block, `<script type="application/json" id="glossary">`, parsed by the same `loadJsonBlock()`. Shape: `{ "A1": { "banana": { "type": "noun", "meaning": "a long yellow fruit" }, "drink": [ { "type": "noun", "meaning": "…" }, { "type": "verb", "meaning": "…" } ] } }`, keys in lower case. **One entry per tested word per level**, written once and reused in every quiz, so a word always has the same meanings. An entry is one sense (object) or, when the word has several word types at that level, a list with **one sense per word type**.
- **Which type a quiz uses:** when a tested word has more than one word type in the glossary, its question says which one it uses: `targetType` on Multiple Choice / Fill in the Blanks / True or False questions, `type` on a Matching pair (e.g. `{ "left": "drink", "right": "…", "type": "verb" }`). The pop-up underlines that type.
- **Key:** `level|category|topicIndex|type|difficulty` (e.g. `A1|vocabulary|0|mc|easy`); difficulty ids: `easy`, `medium`, `hard`, `veryhard`. Each difficulty has its own questions.
- `getQuestions(nav)`: Multiple Choice, Fill and True or False need at least 8 questions (the first 8 are used); Matching uses all of its questions (at least 2). Otherwise `generateLoremQuestions(nav)` creates placeholders in the same stored shapes (lorem Matching: 2–4 questions; lorem True or False: 4 true, 4 false).
- Lorem questions use a seeded RNG (`hashString` + `mulberry32`) keyed by the quiz key, so the same quiz always produces the same questions (Retry repeats the exact quiz).

### Check script

`.gitignore/tools/check_questions.ps1` (private, PowerShell; it reads the private word lists and plans). Run it from the project folder whenever questions are added or changed:

```bash
powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_questions.ps1
```

- It reads the question bank from `index.html` (or `-BankFile sample.json` for testing), the organized word files (`ORG_<LEVEL>_WORDS.md`, lower levels included) and the target-word plans (`PLAN_<LEVEL>_<CATEGORY>.md`, or `-PlanDir`). It never changes files and never writes questions.
- It prints, per quiz, **ERRORS** (must fix) and **warnings** (review as a teacher), and exits with 1 if there are errors.
- The 22 checks (numbered 1-24; checks 16 and 19 moved to the review, see below): **A. Structure** (1 valid key, 2 question count / plan's Matching count, 3 fields (a `target` must be a form of the answer), 4 shapes, 5 True or False 4/4, 6 explanation 1–3 sentences); **B. Word rules** (7 every word in the lists or a normal form or a name, unknown forms listed for a hand check, 8 tested words only from the quiz's category or Both, and never written in digits, 9 exception words only in their own grammar topic, 10 no British spellings, 24 an ordinal written in digits has the right ending: 1st, 2nd, 3rd, 4th, 11th-13th, 21st); **C. Plan match** (11 targets = the approved plan, 12 no target twice in a quiz and every planned word tested); **D. Never ambiguous** (13 Multiple Choice options share a word type with the answer, 14 no wrong Fill bank word within the spelling tolerance of the answer, 15 the answer not already in the sentence, 17 no duplicate or near-duplicate questions); **E. Variety** (18 not more than 2 questions starting with the same two words, 20 a name or city in at most 2 questions per quiz (*Anna's* counts as *Anna*), 21 each A1 sentence at most about 12 words (a prompt may have several sentences), 22 no sentence reused in another quiz of the theme); **F. Glossary** (23 every tested word has a glossary entry with one sense per word type of its level, no other types; a word with several senses has `targetType` / pair `type` naming one of them; meanings use words of the level, American spelling, and don't contain the word itself). `-GlossaryFile` reads a test glossary instead of index.html.
- **Expected result now:** 0 errors and 6 warnings, all check 14 in Fill (Hard Q1, Very Hard Q1–3, Q6–7). They are kept on purpose: pairs like *boring / bored* are 3–4 letters apart and are the point of Very Hard. Any other warning or error after a change must be read and fixed or explained to the owner.
- Its name list, irregular forms and British spellings are lists at the top of the script; extend them when needed (e.g. add a missing irregular past form such as *broke = break*). The script is a checker, not an authority: when it flags something that is correct English, fix the script and tell the owner, as happened with *like* and with names such as *Lisa's*. **Never weaken a check just to make a question pass**; if a check finds a real mistake, fix the question.
- A word written the same in two categories (*like*: "like (similar)" is Grammar, "like (find sb/sth pleasant)" is Both) counts as both, so check 8 accepts it in either.
- **Moved to the review:** check 16 (a Matching meaning contains one of its 4 words, except on purpose at Very Hard) and check 19 (the same sentence frame used again and again) are judged better by an AI reviewer than by a script, so they are in the Review checklist (sections 5 and 9), not in the script. The other check numbers did not change.
- **Digits** (decided 2026-11-01, see "Rules for A1 questions"): a number written in digits is one word for the script (`12`, `3rd`, `10:30`, `1,000`, `555-0123`). It is never an "unknown word", it counts in the sentence length (check 21) and in the duplicate and pattern checks (so "Tom is 12" and "Tom is 13" are different questions), a hyphenated number (*twenty-one*) is split into its parts, and a times sign `x` between numbers is ignored. Digits in the tested part are an error (check 8), and a wrong ordinal ending (*2th*, *13rd*) is an error (check 24). The script cannot check arithmetic or whether a number fits the situation: that is for the review.
- **Inflected words:** a word is read both as written and as a form of another word (*thanks* = the noun / exclamation, or *thank* + s). Check 13 passes an option if any reading has the answer's word type. Curly and straight apostrophes are the same (*o’clock* = *o'clock*).
- **Show how a word file is read:** `powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_questions.ps1 -ShowLevel A1` prints how the script reads `ORG_A1_WORDS.md` (word counts per category, the themes and topics with their word counts, the exception words) and stops with `Result: OK.` or a list of problems. A1 shows 899 rows for the 901 entries because the script counts unique words (*second* has two entries, *like* has two, and each counts once). Use it for every new organized word file (see "Building an organized word file for a level").
- **Changing the script:** run it on the real question bank before and after, and compare the reports; they must stay the same unless the change is meant to change them. Keep the script pure ASCII: Windows PowerShell 5.1 misreads non-ASCII characters in a script saved without a BOM, so "·", "—" and the curly quotes are written as character codes (`[char]0x00B7` and so on). A function that can return a single item must be called as `@(Get-Something)`; without `@()`, PowerShell turns a one-item list into the item itself, and the script then reads the first LETTER of a word (this once made *includes* look like the pronoun *I*, and silently skipped checks on forms like *laughs*).

### A1 word lists

Both files are in the private `.gitignore/` folder, which is never uploaded to GitHub (see AGENTS.md rule 8). For A1 questions, read **only `ORG_A1_WORDS.md`**.

- **`.gitignore/A1_WORDS.md`**: the original list of every word considered A1 (901 entries), from a trusted source, with its A1 word types and its higher-level uses. **Never change this file.** `A1_WORDS.md` should be read only when you work on creating a file in the same format as `ORG_A1_WORDS.md` (for example for another level), just to understand how the original word file is turned into a useful file for AI, or when the owner asks you to. Everything in it is already in `ORG_A1_WORDS.md`.
- **`.gitignore/ORG_A1_WORDS.md`**: the file to use for all A1 work. It holds the full A1 list with word types ("A1 word types (full list)" at the end) and splits the words into three categories, each word in exactly one category (but possibly in several vocabulary themes or grammar topics inside it):
  1. **Vocabulary**: words tested for their meaning, grouped into 15 vocabulary themes of about 32–68 words each, in the same order as the game's A1 Vocabulary themes (`TOPICS_BY_SECTION['A1|vocabulary']`).
  2. **Grammar**: words tested for their grammar function, grouped by grammar topic (the game's 21 A1 grammar topics in order, plus other A1 grammar points that are not game topics yet).
  3. **Both**: words especially needed to build meaningful sentences (be, have, do, go, like, want, very, common everyday nouns, …).
  Many vocabulary themes and grammar topics also have a "Goes well with (from Both)" line: Both words that belong naturally to them. The file ends with a "Watch out" list of common words whose A1 word types are limited.

Rules for A1 questions:

- Use only words from `ORG_A1_WORDS.md` in A1 questions, answers and wrong options. Names of people and places are fine.
- Use each word only in the A1 word types listed for it in "A1 word types (full list)"; ignore its higher-level uses (e.g. *have* is not an auxiliary at A1, *after* is not a conjunction).
- Normal forms of listed words are allowed: plurals, verb endings, past tenses, comparatives/superlatives and contractions (*is, were, went, children, playing, bigger, can't, I'd*).
- **Digits** (owner's decision, 2026-11-01). Use digits only when the situation naturally has them: ages, clock times, dates, prices, phone numbers, floors, page numbers, ordinals such as 1st, 2nd, 3rd, 4th. **Never add a number just to make a sentence look real:** if a question works without one, leave it out. Words stay the default. Digits may appear in sentences, explanations and Matching meanings. The **tested part** (answer, wrong options, bank words, Matching words) is always a word, never digits. This is decided for A1; ask the owner before applying it to another level. Extra guidance for themes whose target words are numbers is in "Theme notes".
- **Tested part** (the blank, the correct answer, the wrong options, the matching pairs) comes only from that quiz's own category (Vocabulary or Grammar) or from Both.
- **"Goes well with" words**: in their vocabulary theme or grammar topic, use them whenever you can, so students learn which words go together. The list is a suggestion, not a limit: any Both word may be used in any quiz (tested or not) whenever the question needs it.
- **Rest of the sentence** may use other A1 words when needed for meaning, preferring words from Both. A vocabulary word may appear in a grammar sentence, but it must never be what the grammar question tests, and the reverse.
- **Exceptions** (*these, those, mine, yours, hers, ours, theirs*, *his* as a pronoun): not in the A1 list. They may be **tested** only in their own grammar topic ("This / that / these / those", "Possessives (my, mine, 's)"), as listed in `ORG_A1_WORDS.md`. In any other A1 question (any vocabulary theme or grammar topic) they may appear in the untested part of a sentence when needed. These limits apply only to A1 quizzes; higher levels follow their own rules. **If you are working on a level other than A1 and reach this rule, ask the owner what to do with these words for that level before deciding.**

### Building an organized word file for a level

Use this when the owner gives an original word list for a level (e.g. `A2_WORDS.md`) and it must be turned into an organized file for AI (e.g. `ORG_A2_WORDS.md`). These are the steps that produced `ORG_A1_WORDS.md`; follow them in order.

1. **Ask the owner first** (AGENTS.md rule 1), at least:
   - where the original file is, and where to save the organized file (default: the private `.gitignore/` folder);
   - anything the original list leaves unclear (badly formatted lines, unclear notes).
   - **Decided, no need to ask:** quizzes of a level may also use the words of all lower levels (an A2 quiz may use A1 words). The organized file lists only its own level's words; the lower levels' organized files are read alongside it.
2. **Read the inputs.**
   - The original list, in full, including its own rules, word types and higher-level uses. **Never change the original file.**
   - `ORG_A1_WORDS.md`, as the model for format and rules.
   - `A1_WORDS.md`, only to see how an original list was turned into `ORG_A1_WORDS.md`.
3. **Put every entry in exactly one of three categories.** A word may be in several vocabulary themes or grammar topics, but only inside its one category.
   - **Vocabulary**: words tested for their meaning (mostly nouns, verbs, adjectives, adverbs, numbers and exclamations).
   - **Grammar**: words tested for their grammar function (articles, pronouns, possessives, prepositions, modal and auxiliary verbs, determiners, conjunctions, question words).
   - **Both**: words especially needed to build meaningful sentences (core verbs such as *be, have, do, go, like, want*; common everyday nouns, adjectives and adverbs such as *very*). Also put here the verbs and adjectives that grammar topics need to test (tense forms, comparatives), because a grammar question may only test Grammar or Both words.
   - Decide by the word's types **at this level** only; ignore its higher-level uses.
4. **Vocabulary themes.** Group the Vocabulary words into themes that each form a clear thematic whole, of roughly 32–70 words (A1 has 15). **Every theme needs at least 32 words**, so that each of its four difficulties gets at least 8 (see "Question content method"). If a theme is too small, add related words that already sit in other themes (a word may be in several themes of its category), as was done for A1 Body and Health. Put the themes in **textbook theme order**: the order an English course for that level would teach them. The game's buttons use the same order, and so does the organized file.
5. **Grammar topics.** Group the Grammar words by the game's grammar topics for that level, in the game's order. Other grammar points of that level come after them, marked "(not a game topic yet)".
6. **"Goes well with (from Both)" lines.** For each vocabulary theme and grammar topic, list the Both words that belong naturally to it.
7. **Exceptions.** If a grammar topic needs a word that is missing from the list (as *these, mine* were for A1), ask the owner. If it is allowed, list it under that grammar topic as "Exceptions (not in the <level> list)", and write its rule in the rules section.
8. **"Watch out" list.** List common words whose word types are limited at this level (e.g. *have* is not an auxiliary at A1).
9. **Full word-type list.** Copy the whole original list, with its word types and higher-level uses, to the end of the file ("<level> word types (full list)"). Change nothing except clearly broken formatting, and say which lines were fixed. Then the organized file holds everything, and the original no longer needs to be read.
10. **Rules section** at the top, adapted from `ORG_A1_WORDS.md`: only words of this level and lower levels, only their listed word types, normal forms allowed, tested part, rest of the sentence, "Goes well with", exceptions, digits and numbers.
11. **Check with a script** (not by eye) and report the results:
    - every entry of the original is in exactly one category, and nothing is lost;
    - no word that is not in the original appears, except listed exceptions;
    - every "Goes well with" word is in Both;
    - the full word-type list has the same number of rows as the original.
    Run the same check again after every later change to the file.
    The script can do the first, second and fourth checks for you and shows how it reads the file: `powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_questions.ps1 -ShowLevel <LEVEL>`. It must end with `Result: OK.` Compare its counts with the original list (a word written twice, such as *like*, or with two notes, such as *second*, counts once).
12. **Update the docs.** In README.md, describe the new files next to "A1 word lists". When the vocabulary themes or grammar topics go into the game, add their names to `TOPICS_BY_SECTION` and to DESIGN.md's list of fixed names.

**What the check script needs from a new organized word file** (it reads the file by its headings, so keep them exactly as in `ORG_A1_WORDS.md`, the model). Do this before any question is written for the new level:
- **Name and place:** `ORG_<LEVEL>_WORDS.md` (for example `ORG_A2_WORDS.md`) in the `.gitignore/` folder, saved as UTF-8. Words are separated by ` · ` (space, middle dot, space). Lower levels are read automatically (an A2 quiz may use A1 words), so `ORG_A1_WORDS.md` must stay in the same folder.
- **Categories:** headings that start with `## 1.` (Vocabulary), `## 2.` (Grammar) and `## 3.` (Both), with a single digit. A heading that starts with `## Watch` ends the categories.
- **Themes and topics:** each is a `### ` heading (a number and a dot before the name, as in `### 3. Present simple`, is fine), followed by a line that starts exactly with `- **Words:**`. A note in parentheses after a word (`bank (money)`) is allowed. "Goes well with" lines are ignored by the script, so they must not start with `- **Words:**`.
- **Exceptions:** a line `- **Exceptions (not in the <LEVEL> list):**` under the grammar topic that owns them.
- **Full word-type list:** a heading that contains `word types (full list)` (for example `## A2 word types (full list)`), then rows written `word | types | higher-level uses`. Its header line must start with `Format:`, and no other line in that section may contain ` | `.
- **Check it:** run `-ShowLevel <LEVEL>`: it must end with `Result: OK.`, the themes and topics must be in the game's order, and no vocabulary theme may have fewer than 32 words.
- **Then extend the script's lists** (at the top of `check_questions.ps1`) if the new level needs it: `$MAX_WORDS` (longest sentence; only A1 is decided, so ask the owner), `$NAMES`, `$BRITISH`, `$IRREGULAR` (add a missing irregular form instead of weakening a check). Add the level's theme and topic names to `TOPICS_BY_SECTION` in `index.html`, because the script reads topic names from there. Target-word plans are read from `PLAN_<LEVEL>_<CATEGORY>.md`.
- **Test before real questions:** run the script on a small sample bank (`-BankFile sample.json`) for the new level and read every warning, as was done for A1.

## Question content method

How real questions are planned and written. These are the owner's decisions. They apply to the **vocabulary themes** of every level; the examples are from A1 Vocabulary. Whether they also apply to grammar topics is decided when grammar content starts. Ask the owner about anything this section does not cover, and see "Open questions" at the end.

### Never ambiguous (most important rule)

Every question has **exactly one** correct answer. Wrong options may be similar to the answer, but none of them may also be correct in that sentence. The sentence must give enough context to decide. Before finishing a question, check every wrong option and ask: "Could this also be right?" If yes, change it. This rule has no exceptions, at any level or difficulty.

### Target words

- A question's **target word** is the word it tests: the correct option in Multiple Choice, the word for the blank in Fill in the Blanks, the word a True or False statement is about, and the 4 words in a Matching question.
- **Vocabulary Matching pairs are word ↔ short meaning** (*banana ↔ a yellow fruit*). The meaning is written only with words of that level (and lower levels), and each meaning fits **only one** of the 4 words, so the question is never ambiguous. The meanings are not target words.
- Target words follow the word-list rules: they come only from the quiz's own category (Vocabulary or Grammar) or from Both.

### Target words and difficulty

- Each vocabulary theme's words are **split across the four difficulties** by how frequent and how difficult they are:
  - **Easy**: the most frequent, concrete, easiest words (e.g. *apple, mother, red*).
  - **Very Hard**: the least frequent, more abstract or harder words (e.g. *opinion, situation*).
  - Medium and Hard: in between.
  - The four groups are about the same size, and **each has at least 8 words** (one Multiple Choice quiz needs 8 different answers).
- **How frequency is decided:** look for a trusted, published word frequency list on the internet and follow it. Only if no trusted list can be found, Claude decides from its own knowledge (frequency and how concrete the word is). Either way, the owner checks the split in the target-word plan. Say in the plan which source was used.
- **Expected progression, not cumulative.** Each difficulty tests its own words. Harder difficulties do not re-test the easier difficulties' words. Students are expected to go from Easy to Very Hard, like units in a course. The game does not lock difficulties; the button order (Easy → Very Hard) suggests the path.
- So **each difficulty has its own quiz** for each question type: 8 questions for Multiple Choice, Fill in the Blanks and True or False, and a variable number for Matching (see below). For A1 Vocabulary: 15 vocabulary themes × 4 question types × 4 difficulties = **240 quizzes** (1,440 Multiple Choice, Fill in the Blanks and True or False questions, plus the Matching questions).
- Code: `quizKey()` includes the difficulty (key `level|category|topicIndex|type|difficulty`), see "Content (questions)".

### How similar the wrong options are

Wrong options get **more similar to the answer** in two directions at once: from lower to higher levels (A1 → C1) and from easier to harder difficulties (Easy → Very Hard).

| | Easy | Very Hard |
|---|---|---|
| **A1** | very different options, even from other vocabulary themes (*apple / chair / blue / run*) | same vocabulary theme and word type (*breakfast / lunch / dinner / meal*) |
| **C1** | clearly different meanings, all C1-level | near-synonyms that need fine judgment (*reluctant / hesitant / unwilling / averse*) |

- Medium and Hard, and the levels between A1 and C1, sit in between.
- However similar they are, "Never ambiguous" always applies.
- Wrong options always have the **same word type** as the answer (a noun for a noun, a verb for a verb) and the same form (*went / came / ate*, not *went / come / eating*), so the grammar never gives the answer away.
- Wrong options follow the word-list rules: from the quiz's own category or Both (so A1 Easy may use words from other vocabulary themes).

### Matching quizzes have a variable length

A Matching question has 4 words, and **a word appears only once in a Matching quiz**. So a Matching quiz cannot have 8 questions (that would need 32 words at one difficulty). Instead, its length is chosen to keep repetition smooth:

- **Goal:** across its difficulty's four quizzes, each word is tested about **2–3 times** on average.
- **Rule:** number of Matching questions = round((2.5 × words − 24) ÷ 4), but **at least 2** and **at most words ÷ 4 (rounded down)**. ("24" is the 8 + 8 + 8 answers of the other three quizzes.)
- In practice:

| Words at that difficulty | Matching questions | Matching words |
|---|---|---|
| 8–13 | 2 | 8 |
| 14–15 | 3 | 12 |
| 16–19 | 4 | 16 |

- The number for every Matching quiz is written in the target-word plan.

### Planned, smooth overlap across question types

- A word is tested only at its own difficulty, which has one quiz per question type (4 quizzes).
- Because a difficulty has only about 8–17 words, most words are tested in **2–4 of the 4 question types** at their difficulty. Each time it is a different task: recognize the word (Multiple Choice), produce it (Fill in the Blanks), judge its meaning (True or False), match it to a meaning (Matching).
- A word is **never tested twice in the same quiz**.
- Each time a word appears, the **sentence and context are new**, never the same question in another form.
- Every word is tested **at least once** at its difficulty, so no word is forgotten. Spread the tests as evenly as possible: no word should be tested in all four types while another is tested only once, unless the numbers force it.

### Target-word plans

A **target-word plan** is a planning sheet for one vocabulary theme, written **before** any of its questions: it decides which words each quiz tests, like a teacher's scheme of work for a unit. Questions are written only after the owner approves the theme's plan.

**File.** One file per level and category in the private `.gitignore/` folder (e.g. `.gitignore/PLAN_A1_VOCABULARY.md`), never uploaded. It has one section per vocabulary theme, in the game's order. Plans are added theme by theme; a theme without a section has no plan yet.

**Format of one theme's section:**

```
## Food and Drink
Status: draft | approved by the owner (date)
Frequency source: <name and link of the trusted list, or "Claude's judgment">

### Easy (14 words)
- Words: apple · banana · bread · …
- Multiple Choice (8): apple · bread · …
- Fill in the Blanks (8): …
- True or False (8): …
- Matching (3 questions, 12 words): …
- Times tested: apple 3 · banana 2 · bread 2 · …

### Medium (…)
…
```

**How to make a plan (follow in order):**

1. **Take the theme's words** from the **Words** line of that vocabulary theme in the level's organized word file (e.g. `ORG_A1_WORDS.md`).
2. **Rank them by frequency.** Look for a trusted, published word frequency list on the internet; if none is found, use Claude's judgment (frequency, and how concrete the word is). Write the source in the plan. The pilot used the OpenSubtitles 2018 list (FrequencyWords, https://github.com/hermitdave/FrequencyWords, `en_50k`); use it again unless the owner chooses another.
3. **Split them into Easy, Medium, Hard and Very Hard**: the most frequent in Easy, the least frequent in Very Hard, groups of about the same size, **at least 8 words each**. If the theme has fewer than 32 words, stop and ask the owner.
   - **Frequency + teaching** (owner's choice in the pilot): start from the frequency ranks, then move a word when a teacher would teach it earlier or later, because it is concrete and taught early (*hungry, sad*) or abstract (*believe*), and keep related words together (*hello / hi / bye / goodbye* in one difficulty; *-ed* adjectives in Hard and *-ing* adjectives in Very Hard). Strict frequency put *believe* in Easy and *sad, hungry* in Very Hard, which no coursebook does. In the plan, show the strict-frequency split next to yours and say which words you moved and why, so the owner can approve it.
4. **Set the Matching length** for each difficulty from the table in "Matching quizzes have a variable length".
5. **Assign the target words** for each difficulty: 8 for Multiple Choice, 8 for Fill in the Blanks, 8 for True or False, and 4 per Matching question. Follow "Planned, smooth overlap": every word at least once, no word twice in one quiz, tests spread as evenly as possible. Choose for each question type the words that suit it (e.g. concrete nouns for "word ↔ short meaning" in Matching).
6. **Check with a script** (not by eye) and report the results:
   - every word of the theme is in exactly one difficulty, and every word comes from the theme's Words line;
   - each difficulty has at least 8 words;
   - each quiz has the right number of target words, with no word twice in the same quiz;
   - every word is tested at least once at its difficulty; the "Times tested" line matches the lists.
7. **Ask the owner to review.** Change what the owner asks, check again, then set the status to "approved by the owner" with the date. Only then write that theme's questions.
8. **Don't change an approved plan** once its questions are written, unless the owner asks; if it changes, the affected questions must be rewritten.

### Writing the questions

- **American English** everywhere: spelling (*color, favorite, center*) and words (*vacation, apartment*), as in the word lists.
- **Each question type is a different task:**
  - **Multiple Choice**: choose the correct word from 4 options (recognize).
  - **Fill in the Blanks**: 3–4 words are shown above the sentence, and the student **types** one of them into the blank (produce and spell). See "Typed Fill in the Blanks" under "Question types".
  - **True or False**: judge a statement about meaning. Each quiz has **4 true and 4 false** statements, in mixed order. A false statement is clearly false, never "a bit false".
  - **Matching**: match each word to its short meaning.
- **Glossary meanings** (for the "Words in this game" pop-up), written once per level when the word's first questions are written:
  - **Every word type the word has at that level gets its own short meaning** (e.g. *drink*: noun and verb), so the pop-up tells all of them. Never higher-level types or meanings.
  - **The type used in the game is underlined** in the pop-up; when a word has several types, the question must name the one it uses (`targetType`, or `type` on a Matching pair).
  - Use only words of that level (and lower levels), American English, never the word itself. Keep it short, like a learner's dictionary for that level (*banana: noun, a long yellow fruit*). It may differ from the Matching meaning of the same word, so Matching doesn't simply repeat the pop-up.
  - **A word can be in several vocabulary themes** (A1: *fine, hungry, thirsty, tired* are also in Body and Health; *miss* is also in Travel and the World). The glossary has **one entry per word per level**, so before writing a meaning, look in the `#glossary` block: if the word is already there, reuse it. If the new theme uses another sense of the same word type, change the one meaning so it covers both senses (as *miss* already covers missing people and missing the bus), and tell the owner.
- **Wrong options and banks** (decided in the pilot):
  - Multiple Choice: 4 options. Fill in the Blanks: **3 bank words at Easy and Medium, 4 at Hard and Very Hard**.
  - **Synonyms are never options or bank words together** (*hello / hi / hey*, *bye / goodbye*, *yes / yeah / OK*).
  - **Capital letters:** when the blank starts a sentence or a quote, all options / bank words are capitalized (*Hello · Bye · Please · No*); otherwise all are lower case. Add `"target"` with the lower-case dictionary form.
  - In Fill, no wrong bank word within 1–2 letters of the answer (*hey / bye*, *angry / hungry*), except planned Very Hard pairs (*boring / bored*).
- **True or False:** 4 true and 4 false in a mixed order (see "Mindful shuffling": True or False is not shuffled); no negatives in false statements; statements about what a word means or what is right to say, never about facts the student can't know.
- **Explanations** are in English and short: **one to three sentences**, only as long as needed to make the answer clear. Use words of that level where possible.
- **Names**: a small, international set of first names (e.g. Anna, Tom, Ali, Maria, Ken) and well-known cities (e.g. London, Paris, Tokyo, New York), so names never distract from the tested word.
- **Correct answer positions are balanced** (Multiple Choice): in each quiz, the correct answer is in each of the 4 positions **exactly twice**, and never in the same position more than **twice in a row**. The game does this when it shuffles the options; Retry shows the same order again.
- **Script check of every quiz** when questions are added (not by eye): the target words match the approved target-word plan; no answer word appears twice in the same quiz; no two questions are copies of each other; True or False has 4 true and 4 false; every word is allowed by the word-list rules.
- **One vocabulary theme at a time.** Start with a pilot theme (plan, then its 16 quizzes), let the owner try it in the game, adjust this method if needed, then continue theme by theme. The pilot (Greetings and Feelings, topic index 0) is done; continue with the next theme in the game's order (Numbers and Amounts, index 1).

### Next theme, step by step

1. **Read** AGENTS.md, this README (especially "Question content method" and the "Review checklist") and DESIGN.md. Read the theme's **Words** and **Goes well with** lines and the word types of its words in `.gitignore/ORG_A1_WORDS.md`.
2. **Target-word plan** ("How to make a plan"): draft it, show it to the owner, change it on request, then save it in `.gitignore/PLAN_A1_VOCABULARY.md` with "Status: approved by the owner (date)". Copy the format of the Greetings and Feelings section there. If the theme has a note in "Theme notes", copy it into the plan as a `Notes:` line.
3. **One question type at a time** (Multiple Choice, then Fill in the Blanks, True or False, Matching), each with all 4 difficulties, following "Workflow: draft → review → write": draft in the chat → remind the owner to ask for a review → review with the checklist → write only on the owner's go-ahead.
4. **Glossary:** add a meaning for every new tested word (all its word types at the level); reuse existing entries (see "Glossary meanings").
5. **Quiz key:** `A1|vocabulary|<topic index>|<mc|fill|tf|match>|<easy|medium|hard|veryhard>`; the topic index is the theme's position in `TOPICS_BY_SECTION['A1|vocabulary']`, starting at 0.
6. **After writing:** run the check script, then play the new quizzes in the browser (the pop-up shows real meanings with the right type underlined; Fill accepts the answer and a typo; True or False shows 4 / 4; Matching scores add up to 100). Update "Written so far" under "Content (questions)".
7. **Commit** only when the owner asks (AGENTS.md rule 7).

### Theme notes

Extra guidance for themes that need it. Everything else in this README applies to all themes.

**Numbers and Amounts** (and any other theme whose target words are numbers):
- The tested part is always a number word written in letters (*ninety*); digits are only context. Compound numbers such as *twenty-one* are allowed.
- Prefer **real-life counting contexts** built from A1 words (age, family, school, shopping, time and dates).
- Use a **sum only as a last resort**, when a number word in the theme's Words line cannot be covered by any real-life context from `ORG_A1_WORDS.md`. Write it with symbols only ("5 + 3 = ?"), because *plus*, *minus* and *equals* are not A1 words. A sum has exactly one answer. The draft says which questions use sums and why, so the owner can approve each one.

### Workflow: draft → review → write (AGENTS.md rule 9)

Questions, explanations, glossary meanings and target-word plans are **never written into the files right after they are drafted**.

1. **Draft.** Write the quiz(zes) and show them to the owner in the chat, with explanations and any new glossary meanings. Do not change any file.
2. **Remind the owner** to ask for a review before anything is written, for example: *"Before I add these, please ask me to review them against the review checklist."*
3. **Review** (a separate step, when the owner asks): go through the "Review checklist" below, question by question, then the quiz as a whole. Report every change and why (a table of "problem → new version" works well), and list what was kept and why.
4. **Write** only when the owner says so. Then run the check script, fix what it finds (report each fix), and play the quizzes in the browser.

### Review checklist

Use this the way an experienced English teacher checks coursebook material, and the way an editor checks an AI writer. **Go through every item for every question; don't trust a first impression.** A question that seems fine at a glance is exactly where mistakes hide. It is built from the problems found while reviewing the pilot theme (Greetings and Feelings), and it adds the mistakes language models typically make.

**How to review**
- Review in a **separate step** from writing. Read every question **as a student of that level would**: someone who knows only the level's words, reads literally, and looks for another possible answer.
- Check **each question alone** first, then **the quiz as a whole**, then **the theme as a whole** (all question types and difficulties).
- **Look words up; never check from memory.** Every doubtful word goes against `ORG_<LEVEL>_WORDS.md` (word *and* word type). Models often "feel sure" a word is A1 when it isn't.
- **Fix by rewriting the context**, not by adding more words. A question that needs a long explanation to be fair is a bad question.

**1. Exactly one correct answer (the most important rule)**
- [ ] Put **every wrong option** (or bank word) into the sentence and read it aloud. Could a good student argue it is also right, in any reading? If yes, change the option or the context.
- [ ] **Synonyms and near-synonyms** are never options or bank words together: *hello / hi / hey*, *bye / goodbye*, *yes / yeah / OK*, *big / large*, *sad / unhappy*. Watch register pairs too: an informal word can still be "correct".
- [ ] **Feelings and opinions are slippery.** "Kate waits an hour; she is ___" fits *angry, bored, tired, sad*. Give a cause that points to one feeling only (a friend breaks her phone → *angry*), and make sure the other options don't fit that cause.
- [ ] **"Everyday knowledge" traps.** Lots of things to do can be boring (homework!). A good friend moving away could make someone angry, not only sad. Imagine a real student who disagrees.
- [ ] **True or False:** a false statement is **clearly** false, never "a bit false" or "false for some people". A true statement is true **for everyone**, not just usually. Add *often*, *can* or *usually* when needed ("People **often** miss their friends…").
- [ ] **No statements about facts a student can't know** ("Anna says hello to her teacher", "Ali is hungry at ten"). Write about what is right to say or what a word means ("Anna **can** say 'hello'…", "If you have no breakfast, you are **often** hungry…").
- [ ] **Matching:** every meaning fits **only one** of the 4 words in that question. Check each meaning against all 4 words, not just its own (*oh* "when you hear news" also fit *yeah*).
- [ ] **No grammar giveaway by accident.** *a / an* before the blank, a preposition after it (*afraid of*, *interested in*), or a verb form (*-s, -ed*) must not leave only one grammatical option, unless the collocation is what you want to teach (then the other options must still be real words of the same type).

**2. Level and word list**
- [ ] **Every word** is in the level's list (or a lower level's): the sentence, every option, the explanation, the Matching meanings and the glossary meanings. **Explanations and meanings are where above-level words slip in** (pilot: *rest, truth, happiness, polite, loud, surprised, shout*).
- [ ] **Every word is used in an allowed word type.** The word can be in the list but not in that type: *fun* (noun only; "fun things" is A2), *ride* (verb only; "a ride" is A2), *all right* (*all* as an adverb is A2), *close* (verb only), *kind* (noun "type" only), *book* (noun only), *like* (verb / preposition, not noun), *past* (only "half past"). Check the "Watch out" list and the full word-type list.
- [ ] **Digits.** Each digit is there because the situation needs it (an age, a time, a price), not as decoration. Digits appear only in the sentence, the explanation or a Matching meaning, never in the tested part. Ordinals have the right ending (1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st). A sum appears only when no real-life context works (see "Theme notes").
- [ ] **Grammar in the sentence is at the level.** At A1: no present perfect (*have* is not an auxiliary), no past continuous (*was looking*), no *after / before* + clause, no conditionals beyond very simple *if + present*. Normal forms (*-s, -ed, -ing*, past simple, comparatives, contractions) are fine.
- [ ] **Tested part** (answer, wrong options, bank, Matching words) only from the quiz's own category or Both.

**3. Natural, correct English**
- [ ] Would a native speaker **really say** this sentence in this situation? ("Thanks for the pen, Emma!" yes; "I want to like you for the flowers" is a fine *wrong* option, but the correct sentence must be natural.)
- [ ] **American English**: spelling (*color, favorite, center, theater, practice* as a verb), words (*vacation, movie, apartment, Mom, soccer* for the round-ball game), prepositions (**on** *the street*, **on** *the weekend*, *on a team*), and no *have got*.
- [ ] **Collocations** are right: *afraid **of***, *interested **in***, *excited **about***, *angry **with***, *miss **the bus***, *say **hello to***.
- [ ] **Punctuation and quotes** are clean: one pair of quotes per speech, comma or full stop inside the quote, a question mark on questions, capital letters at the start of sentences.
- [ ] **Capital letters on options:** when the blank starts a sentence (or a quote), **all** options / bank words are capitalized; otherwise all are lower case. A single capitalized option gives the answer away.

**4. Content, context and the learner**
- [ ] **Suitable for kids, teens and adults.** Avoid death (also of pets), serious illness or injury of people, violence, alcohol (*beer, wine* are A1 words, but keep them out of sentences unless the owner decides otherwise), religion, politics, dating, money worries.
- [ ] **No stereotypes**: mix who cooks, works, plays football, is afraid, is good at science.
- [ ] **Facts about the world are true and stable** (capitals, animals, sizes). Models sometimes invent facts; when not sure, choose a context that needs no world fact.
- [ ] **Names and places** come from the approved set (the check script's name list); a name in at most 2 questions per quiz.
- [ ] **The context fits the level**: short, concrete, everyday situations at A1; longer or more abstract ones only at higher levels.

**5. Question type rules**
- **Multiple Choice**
  - [ ] 4 options, all the **same word type and form** as the answer (*went / came / ate*, not *went / come / eating*).
  - [ ] Easy: options very different (even from other themes). Very Hard: from the same theme and close in meaning, but still only one fits.
  - [ ] Options are not silly at Hard / Very Hard. A joke option makes the question easier than its difficulty.
  - [ ] When the answer is not in its dictionary form (*laughs*, *Hello*), the question has `"target"` with the dictionary form, and `targetType` when the word has several types.
- **Fill in the Blanks (typed)**
  - [ ] The answer is **exactly a bank word** in the same form as the sentence needs (*happened* in the bank, not *happen*).
  - [ ] Bank: Easy / Medium 3 words, Hard / Very Hard 4 words; all the same word type and form; none fits the blank.
  - [ ] **No wrong bank word within 1–2 letters of the answer** (*hey / bye*, *angry / hungry*): a typo could land between them. Planned pairs at Very Hard (*boring / bored*) are fine.
  - [ ] Very short answers (2–3 letters: *hi, oh*) accept any 1-letter mistake as "misspelled" (see "Open questions"); prefer longer answers when you can choose.
  - [ ] `before` / `after` give normal spacing: `before` ends with `"` when the blank starts a quote; `after` starts with punctuation when the blank ends a sentence.
  - [ ] Typing the answer takes time: at Very Hard (20 s), keep sentences short enough to read and type.
- **True or False**
  - [ ] Exactly **4 true and 4 false** per quiz, in a mixed order with **no more than 2 of the same answer in a row**, and no simple pattern (TFTFTFTF).
  - [ ] **No negatives in false statements** ("You **don't** feel…" + False = a double negative that A1 students get lost in). A simple *don't* in a true statement is fine when needed.
  - [ ] The statement is about the **target word's meaning or use**, and the target word is in the statement (`"target"`, and `targetType` when needed).
- **Matching**
  - [ ] 4 pairs per question; the number of questions is the plan's; **close words go in different questions** (*hello* and *hi*; *bored* and *interested*).
  - [ ] The meaning never contains any of the question's 4 words (or an obvious form of them), except on purpose at Very Hard (*boring ↔ "it makes people feel bored"*).
  - [ ] **The Matching meaning is not the same as the pop-up meaning.** Otherwise Matching only tests memory of the pop-up. Use a situation, an example or a related word (*hi ↔ a short, friendly "hello"*).

**6. Difficulty**
- [ ] The question really is at its difficulty: Easy = simple, direct situation and clearly different options; Very Hard = closer options, finer meaning differences, set phrases (*-ed / -ing*, *a bad feeling about*, *miss the bus*).
- [ ] Wrong options get **more similar** from Easy to Very Hard (README "How similar the wrong options are").

**7. Explanations**
- [ ] 1–3 short sentences, at the level, in American English.
- [ ] They **teach**: say why the answer is right and, when useful, why a tempting wrong option is wrong ("We say 'bye' when we leave; 'hello' is for when we arrive").
- [ ] For a false statement: give the right fact, not just "No."
- [ ] They match the question: same word, same meaning, same type; no contradiction with the answer.

**8. Glossary (pop-up) meanings**
- [ ] One meaning for **every word type the word has at that level**, never more types, never higher-level meanings; the same entry is used in every quiz of the level.
- [ ] Short, at the level, never containing the word itself, and **correct for that type** (*welcome* as an adjective describes the guest: "people are happy to see you", not the host).
- [ ] A word used in two senses of one type (*miss* people / *miss* the bus) has both in its one meaning.

**9. The quiz and the theme as a whole**
- [ ] The quiz's targets are **exactly the approved plan's**, no word twice in one quiz.
- [ ] **Variety**: not the same frame again and again ("X says, '___'", "We say ___ when…", "If you…"); at most 2 questions start with the same two words; no sentence reused from another quiz of the theme (also not with only the tested word changed).
- [ ] Sentences are short: at A1 about 12 words per sentence at most.
- [ ] Each time a word appears in another question type, the **context is new**.

**10. Typical language-model mistakes (check these on purpose)**
- [ ] **Two right answers** hidden in a "plausible distractor" (the most common and most serious one).
- [ ] **Above-level or wrong-type words** in explanations, meanings and the untested part of sentences.
- [ ] **British English** slipping in (*in the street, at the weekend, holiday, film, Mum, colour, have got*).
- [ ] **Saying "checked" without checking.** Every claim ("all words are A1", "4 true / 4 false") must come from a lookup or the check script, not memory.
- [ ] **Counting mistakes**: 8 questions, 4 options, 3–4 bank words, 4 true / 4 false, the plan's Matching count, the "Times tested" line.
- [ ] **Repeated frames, names and topics** across a quiz (the same pattern 5 times feels machine-made).
- [ ] **Unnatural "textbook-ese"** or over-formal sentences that no one says.
- [ ] **The explanation answers a different question** or contradicts the stored answer.
- [ ] **Missing or wrong fields**: `target`, `targetType`, Matching pair `type`, `answer` true/false, the correct answer stored first.
- [ ] **JSON mistakes** when writing to the file: unescaped quotes inside strings (`\"`), a missing comma.
- [ ] **Number mistakes**: a wrong ordinal ending (*2th*, *13rd*), a digit that doesn't fit the number word, a sum with two possible answers, or a sum where a real-life context would work. The script checks the endings; the arithmetic and the context are checked by hand.
- [ ] **Silent changes**: every change to an approved draft is reported to the owner.

**After the review**
- Report: the changes (problem → new version, and why), anything kept on purpose and why, and anything you are unsure about (ask the owner instead of guessing).
- Then wait for the owner's go-ahead (see "Workflow" above). After writing: run the check script and read **every warning** as a teacher; play the quizzes in the browser.

### Open questions (ask the owner; do not decide)

1. **Grammar topics**: their content method is decided when grammar content starts.
2. **Spelling tolerance for very short answers** (decide before grammar content starts): typed Fill allows 1 wrong letter for answers of up to 5 letters, so 2–3 letter answers are very forgiving (typing "n" for "in" counts as misspelled). The owner may want a stricter rule for them. Seen in the pilot: typing **"he"** (a real, different word) for *hey* got "Almost!" and half points; it affects *hi, oh, hey* in Greetings and Feelings already.

### Code changes for real questions: done

All built and tested with lorem questions (see the sections above for how each works):
1. Difficulty in the quiz key ("Content (questions)").
2. Variable-length Matching quizzes ("Question types" → "Matching").
3. Matching confetti at a final score ≥ 75 (`CONFETTI_MIN_MATCH_SCORE`).
4. Matching points with partial points and no penalty ("Scoring algorithm").
5. Typed Fill in the Blanks ("Typed Fill in the Blanks").
6. Balanced shuffling of Multiple Choice options ("Question types" → "Mindful shuffling").
7. Check script ("Content (questions)" → "Check script").

**Owner's test (not done yet):** the owner wants to try typed Fill in the Blanks themselves at **Very Hard** (20 s per question), to check that there is enough time to type. Remind the owner before or during the pilot theme.

## Confirmed decisions

- 5 levels, 2 categories, topics per section (A1 Vocabulary: 15 vocabulary themes; A1 Grammar: 21 grammar topics; others: 10 placeholders), 4 question types, 4 difficulties, 8 questions per quiz (Matching: 2–4).
- Timers: 60/45/30/20 s; switch ON → 60 s for all.
- Next button after feedback; no auto-advance; skip only from the time-out modal.
- Fill in the blanks: 1 blank, 3–4 word bank above the sentence, the student **types** the word, Check button (half points and a spelling warning for a misspelling, no penalty).
- Matching: click left then right, 4 pairs, Check after all pairs. Variable length (2–4 questions at A1), points = 100 ÷ number of questions with partial points per correct pair and no penalty, extra time −10, confetti at a final score ≥ 75.
- Each difficulty has its own questions; Multiple Choice answer positions are balanced.
- Quiz Back = quit with confirmation.
- Credits on all screens except the quiz screen.
- Quizzes of a level may use the words of all lower levels (e.g. A2 quizzes may use A1 words).
- Questions follow the "Question content method" (never ambiguous; target words split by difficulty, at least 8 per difficulty; expected progression; wrong options of the same word type, more similar at higher levels and difficulties; variable-length Matching; planned, smooth overlap; approved target-word plan first).
- From the pilot (2026-10-31 / 11-01): difficulty split by "Frequency + teaching"; Fill banks of 3 (Easy, Medium) and 4 (Hard, Very Hard); synonyms never together; capitalized options when the blank starts a sentence; `target` for answers not in dictionary form; every question is drafted, reviewed with the "Review checklist" and written only on the owner's go-ahead (AGENTS.md rule 9).

## Roadmap

Planned work (not implemented yet). The owner rewrote this list on 2026-11-01. Ask the owner about every open question before building (AGENTS.md rules 1 and 4).

1. **Menu items and content.** The menu items are decided and filled with actual content one by one, over time (menus via `TOPICS_BY_SECTION`, questions via `QUESTION_BANK`, see "Content (questions)"). A1 Vocabulary and A1 Grammar menus are decided; the first filled theme is Greetings and Feelings. (The design is done: see [DESIGN.md](DESIGN.md), "Open design work".)
2. **AWL** (Academic Word List) will be a whole separate section of the game, apart from the levels (A1–C1). The levels' Vocabulary is not split; it keeps leading straight to its vocabulary themes.
3. **History** of the student's previous plays, with a summary of their performance.
4. **Overall performance.** The game calculates the student's overall performance from the played quizzes and shows a **comment** on it (several possible comments, one is chosen). It also gives **recommendations**: it analyses the scores to find the topics the student is good at and the ones they are weak at, and writes a short review of where they are strong and where they are weak.
5. **Reset button for history:** clears everything in the history except the performance calculation.
6. **Reset button for calculation:** clears everything in the calculation except the history.
7. **"Next exercise" button** on every results screen, so the student can go straight on to the next exercise.
8. **Credits:** add Claude to the Credits page, next to the other names.
9. **Settings button.** Everything that is a setting moves into one Settings menu:
   - Dark / light mode (now the theme button).
   - Mute (now the mute button).
   - **Duration switch.** It stays on the Difficulty screen as well. The Settings copy is an addition, and both are synced across all pages and games.
   - **SmartBoard mode.** Writing is hard on a smart board, so this setting replaces every activity that needs writing (today only typed Fill in the Blanks) with the easier **tap-tap method** that Matching already uses (`renderMatch`: tap one item, then tap where it goes; tapping a placed item undoes it): the student taps a word in the bank and it goes into the blank straight away; tapping the placed word takes it back out; then Check. Scoring has only correct or incorrect, because tapping has no "misspelled" case (decided by the owner, 2026-11-01). A short explanation of what it does is shown with the setting. (The earlier version of Fill in the Blanks was drag-and-drop, not tap-tap, and is gone from the code; the tap-tap code is reused from Matching.)
   - A **work in progress** statement.
   - Every setting has its own short explanation, clear enough but not long, and the menu must look good on phones and computers.
10. **Lesson-file maker (a separate project).** A second HTML file, made by turning this game's `index.html` into a smaller copy with the same design and logic, for **one theme, one grammar or one vocabulary exercise**, to use in a lesson. The single-file rule (AGENTS.md rule 2) stays as it is for `index.html`; the new file is a whole separate thing. With it come a small **README2.md** and **DESIGN2.md**, written as guides for people or LLMs to read before changing individual lesson files.
11. **Website** (owner's plan, 2026-11-01): publish the game online so anyone can play it from a link, on a computer or a phone, without downloading. Open questions: where to host it (for example GitHub Pages, which is free and works with this repository as it is, or the owner's own domain), the web address, and when (now, or after more content is ready). Saved progress (theme, sound, and later history and performance) is stored per website, so moving to another address later starts it fresh. Once it is online, put the link in the GitHub "About" section ("Website") and in "How to play".

### Open questions (ask the owner before building)

- **History (3):** what one entry shows (date and time, level › category › topic › type › difficulty, score, correct / partly correct / wrong / skipped counts, used extra time?); whether the student can open an entry to see its answers; how many entries are kept; where it is opened (a button on the level screen, the top bar, the results screen).
- **Performance (4):** what is calculated (average score; per level, category, question type, difficulty or topic; best score; number of quizzes played; progress through the topics); whether only the latest try of each quiz counts or every try; whether the same-duration (60 s) switch, extra time or SmartBoard mode changes anything (tapping is easier than typing, so scores may not be comparable); how it is shown (numbers, bars, a chart). For the recommendations: what score counts as strong or weak, and how many plays of a topic are needed before judging it; only topics with real content count. The comments and recommendation texts need the owner's approval (AGENTS.md rule 9).
- **Resets (5, 6):** where the buttons are; a confirmation pop-up before clearing ("Are you sure?"), since a reset can't be undone.
- **Next exercise (7):** what "next" means: the next difficulty of the same quiz (Easy → Medium → Hard → Very Hard, following the expected progression), the next question type of the same topic, or the next topic; what happens after the last one; whether it skips quizzes that are still lorem.
- **Credits (8):** the Claude line is just the name "Claude" together with the other names; the owner confirms the final order. DESIGN.md lists the fixed names and must be updated when it is built.
- **Settings (9):** where the Settings button sits and whether it also opens during a quiz (today the top bar is hidden on the quiz screen on purpose); the texts of every setting, its explanation and the work-in-progress statement need the owner's approval; whether the duration switch and SmartBoard mode are remembered (like the theme and mute choices) or reset on every visit; whether the results note that SmartBoard mode was on.
- **Lesson-file maker (10):** its file name and where it lives in the repository; which parts of the game it keeps (probably no level / category menus) and how the theme's questions get into it; how it is kept in step with `index.html` when the design or logic changes (AGENTS.md rule 11 will need to say what covers it).
- **Storage (3–6):** everything is saved in the browser (`localStorage`), like the theme and mute settings. So it belongs to one device and one browser, and clearing the browser's data deletes it. Ask whether that is enough, or whether students will need it on several devices (that would need accounts and a server, which goes against the single-file rule).
- **Design (all):** new screens or pop-ups and their texts need the owner's approved names (DESIGN.md).
