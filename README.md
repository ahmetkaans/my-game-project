# my-game-project
I have a dream so close.

A language-learning quiz game in a single file: [index.html](index.html). No build step — open the file in a browser. The only external resource is the Inter font from Google Fonts (optional: the system font is used when it can't load).

Content is a placeholder for now: all texts that were not explicitly named are lorem ipsum. The visual design ("clean study app", level colors, dark mode, motion, sound) is documented in [DESIGN.md](DESIGN.md). Agents must read [AGENTS.md](AGENTS.md) first.

## Screen flow

```
Level (A1 A2 B1 B2 C1)
 └─ Category (Vocabulary, Grammar)
     └─ Topic (per section: 15 vocabulary themes for A1 Vocabulary, 21 grammar topics for A1 Grammar, 10 lorem ipsum topics elsewhere)
         └─ Question type (Multiple Choice, Fill in the Blanks, True or False, Matching)
             └─ Difficulty (Easy, Medium, Hard, Very Hard) + "same duration" switch
                 └─ "Words in this game" pop-up (Start / Skip)
                     └─ Quiz (8 questions; Matching 2–4)
                     └─ Results
```

- Every screen is a `<section id="screen-NAME" class="screen">`; `showScreen(name)` shows one and hides the others.
- Back buttons use `data-back="NAME"` (fixed parent screen, not a history stack). The level screen is the root and has no back button.
- **"Words in this game" pop-up** (`openWordPreview()`, called by `startQuiz()`): every time a quiz starts, including Retry, a pop-up lists the quiz's tested words (`quizTargetWords()`: Multiple Choice answers, Fill answers, True or False `target`s, Matching left words), each with **all of its word types at that level** and a short meaning for each, from the level's glossary (`glossarySenses()`; lorem placeholders when a word has no entry). **The word type used in that game is underlined** (`.word-type.is-used`); a word with one type has that one underlined. Meanings are shown in every question type, Matching too (owner's decision: it is practice, and pre-teaching helps). Buttons **Start** and **Skip** both close it and show the first question; the timer starts only then. The pop-up can't be dismissed by Escape or clicking outside.
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

Placeholder list: `CREDITS`.

### Topics

- `TOPICS_BY_SECTION` holds real topic names per section, keyed `level|category` (e.g. `'A1|grammar'`). Array order = button order. Any number of topics is allowed.
- `DEFAULT_TOPICS` (10 lorem ipsum names) is used for every section without an entry.
- `getTopics(nav)` returns the right list. `renderTopicButtons()` rebuilds the topic grid each time a category is chosen; `breadcrumbParts()` also uses `getTopics()`.
- `nav.topic` is the topic's **index** in that list, so quiz keys (`quizKey()`, `QUESTION_BANK`) use the index. Don't reorder a section's topics after real questions are added for it.
- In the code every menu item at this step is a "topic". In the docs, Vocabulary items are called **vocabulary themes** and Grammar items **grammar topics**.
- Decided so far: **A1 Vocabulary** (15 vocabulary themes, in textbook order) and **A1 Grammar** (21 grammar topics); their words are in `ORG_A1_WORDS.md`. All their quizzes still use lorem ipsum questions.

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
| `mc` | `{ type, prompt, options: [correct, wrong1, wrong2, wrong3], explanation }` (+ `targetType` when the answer has several word types, on every type) | click an option = submit |
| `tf` | `{ type, prompt, answer: true\|false, target, explanation }` (`target` = the word the statement is about; used by the check script) | click True/False = submit |
| `fill` | `{ type, before, after, answer, bank: [answer, wrong1, wrong2(, wrong3)], explanation }` | type one bank word into the blank, then **Check** (or Enter) |
| `match` | `{ type, prompt, pairs: [{left, right}] ×4, explanation }` (correct pairing is `left i ↔ right i`) | click a left item, then a right item to pair; click a paired item to undo; **Check** when all pairs are made |

**Mindful shuffling** (`prepareQuiz(questions, key)` in `startQuiz()`, seeded by the quiz key so Retry shows exactly the same quiz; the stored questions are never changed):
- `mc`: `balancedPositions()` puts the correct answer in each of the 4 positions equally often (8 questions → each position exactly twice), never more than `MC_MAX_SAME_POSITION_IN_A_ROW` (2) times in a row; wrong options are shuffled into the other positions. Sets `q.answer` (index) for the renderer.
- `fill`: bank order shuffled.
- `match`: right-side order (`q.rightOrder`) shuffled, never the same order as the left side.

### Typed Fill in the Blanks

- The bank of 3–4 words is shown **above the sentence** (display only); the student **types** one of them into the blank (`.blank-input`), then presses **Check** or Enter. Check is disabled while the input is empty. The input is focused when the question opens.
- The input has a fixed width (it never hints at the word's length) and has autocorrect, auto-capitalization and spell check turned off, so phones don't fix the spelling for the student.
- **Comparing the answer** (`judgeFill(input, q)`, `editDistance()`, `normalizeAnswer()`): ignore capital letters, extra spaces and curly apostrophes. `editDistance()` counts the letters that differ (insert, delete, replace, or a swap of two neighboring letters such as *fisrt* = 1).
  - **Exactly the answer** → correct, full points.
  - **Exactly a wrong bank word** → incorrect.
  - **Close to the answer** and **strictly closer to the answer than to every wrong bank word** → **misspelled**: half points (`+6.25`), **no penalty**, and a spelling warning, e.g. *Check your spelling: "coffee", not "cofee".* "Close" = at most `SPELL_MAX_EDITS_SHORT` (1) different letter for answers of up to `SPELL_SHORT_MAX_LENGTH` (5) letters, at most `SPELL_MAX_EDITS_LONG` (2) for longer answers.
  - **Anything else** → incorrect (`−6`).
- Results show what the student typed, the correct word, and the spelling warning ("Note").

### Matching

- Matching quizzes have a **variable length** (all questions of the bank entry, at least `MATCH_MIN_QUESTIONS`).
- `rightOrder` is the shuffled display order of right items; correct pairing is `left i ↔ right i`.
- Paired items show the same number badge (`data-pair`, rendered via CSS `::after`).

## Content (questions)

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
- The 22 checks: **A. Structure** (1 valid key, 2 question count / plan's Matching count, 3 fields, 4 shapes, 5 True or False 4/4, 6 explanation 1–3 sentences); **B. Word rules** (7 every word in the lists or a normal form or a name, unknown forms listed for a hand check, 8 tested words only from the quiz's category or Both, 9 exception words only in their own grammar topic, 10 no British spellings); **C. Plan match** (11 targets = the approved plan, 12 no target twice in a quiz and every planned word tested); **D. Never ambiguous** (13 Multiple Choice options share a word type with the answer, 14 no wrong Fill bank word within the spelling tolerance of the answer, 15 the answer not already in the sentence, 16 a Matching meaning doesn't contain a left word, 17 no duplicate or near-duplicate questions); **E. Variety** (18 not more than 2 questions starting with the same two words, 19 no repeated sentence pattern, 20 a name or city at most twice per quiz, 21 A1 sentences at most about 12 words, 22 no sentence reused in another quiz of the theme); **F. Glossary** (23 every tested word has a glossary entry with one sense per word type of its level, no other types; a word with several senses has `targetType` / pair `type` naming one of them; meanings use words of the level, American spelling, and don't contain the word itself). `-GlossaryFile` reads a test glossary instead of index.html.
- Its name list, irregular forms and British spellings are lists at the top of the script; extend them when needed.
- Windows PowerShell 5.1 misreads non-ASCII characters in a script saved without a BOM, so the script writes "·" and "—" as character codes. Keep it that way.

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
10. **Rules section** at the top, adapted from `ORG_A1_WORDS.md`: only words of this level and lower levels, only their listed word types, normal forms allowed, tested part, rest of the sentence, "Goes well with", exceptions.
11. **Check with a script** (not by eye) and report the results:
    - every entry of the original is in exactly one category, and nothing is lost;
    - no word that is not in the original appears, except listed exceptions;
    - every "Goes well with" word is in Both;
    - the full word-type list has the same number of rows as the original.
    Run the same check again after every later change to the file.
12. **Update the docs.** In README.md, describe the new files next to "A1 word lists". When the vocabulary themes or grammar topics go into the game, add their names to `TOPICS_BY_SECTION` and to DESIGN.md's list of fixed names.

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
- Code: `quizKey()` does not include difficulty yet. Add `nav.difficulty` to it when the first real questions are written (key `level|category|topicIndex|type|difficulty`), and update "Content (questions)" above.

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
2. **Rank them by frequency.** Look for a trusted, published word frequency list on the internet; if none is found, use Claude's judgment (frequency, and how concrete the word is). Write the source in the plan.
3. **Split them into Easy, Medium, Hard and Very Hard**: the most frequent in Easy, the least frequent in Very Hard, groups of about the same size, **at least 8 words each**. If the theme has fewer than 32 words, stop and ask the owner.
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
- **Explanations** are in English and short: **one to three sentences**, only as long as needed to make the answer clear. Use words of that level where possible.
- **Names**: a small, international set of first names (e.g. Anna, Tom, Ali, Maria, Ken) and well-known cities (e.g. London, Paris, Tokyo, New York), so names never distract from the tested word.
- **Correct answer positions are balanced** (Multiple Choice): in each quiz, the correct answer is in each of the 4 positions **exactly twice**, and never in the same position more than **twice in a row**. The game does this when it shuffles the options; Retry shows the same order again.
- **Script check of every quiz** when questions are added (not by eye): the target words match the approved target-word plan; no answer word appears twice in the same quiz; no two questions are copies of each other; True or False has 4 true and 4 false; every word is allowed by the word-list rules.
- **One vocabulary theme at a time.** Start with a pilot theme (plan, then its 16 quizzes), let the owner try it in the game, adjust this method if needed, then continue theme by theme.

### Open questions (ask the owner; do not decide)

1. **Grammar topics**: their content method is decided when grammar content starts.
2. **Spelling tolerance for very short answers** (decide before grammar content starts): typed Fill allows 1 wrong letter for answers of up to 5 letters, so 2–3 letter answers are very forgiving (typing "n" for "in" counts as misspelled). The owner may want a stricter rule for them.

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

## Roadmap

Planned work (not implemented yet):

1. Design will be handled. — **Done** (see [DESIGN.md](DESIGN.md); remaining items are under "Open design work").
2. One by one, the menu items will be decided (replacing the lorem ipsum labels via `TOPICS_BY_SECTION`). — A1 Vocabulary and A1 Grammar decided.
3. Part by part, the menus will be filled with actual content (via `QUESTION_BANK`, see "Content (questions)").
4. **AWL** (Academic Word List) will be a whole separate section of the game, apart from the levels (A1–C1). The levels' Vocabulary is not split; it keeps leading straight to its vocabulary themes. (Replaces the earlier plan to split Vocabulary into Theme Based and AWL.)
