# my-game-project
I have a dream so close.

A language-learning quiz game in plain files with no build step: the page is [game/index.html](game/index.html) and its look is in [game/css/](game/css/); open the page in a browser. (The questions and word meanings are in [game/data/](game/data/) and all the code in [game/js/](game/js/).) The only external resource is the Inter font from Google Fonts (optional: the system font is used when it can't load).

The game is called **My Game Project**. Texts the owner has not named are still lorem ipsum (mostly questions and the topic names of other levels); the approved screen and pop-up texts are listed in DESIGN.md. The visual design ("clean study app", level colors, dark mode, motion, sound) is documented in [DESIGN.md](DESIGN.md). Agents must read [AGENTS.md](AGENTS.md) first. What changed and when is listed in [CHANGELOG.md](CHANGELOG.md).

**What is in this folder** (in plain words):

```
my-game-project/
├── game/             the game itself: open game/index.html to play
│   ├── index.html    the page: only the screens and the list of files to load
│   ├── css/          how it looks (6 files)
│   ├── js/           how it works (23 files, one job each; each starts with a note saying what it gives and needs)
│   └── data/         the questions and the word meanings (one file per theme, one per level)
├── README.md         this page, with the file map for helpers
├── DESIGN.md         how the game looks and sounds
├── AGENTS.md         the working rules for helpers
├── CHANGELOG.md      what changed and when, in plain language
└── .gitignore/       private, only on the owner's PC, never uploaded: checks and tools, drafts, word lists,
                      plans, and the old single-file version of the game
```

## File map

**Read AGENTS.md first, then this map.** It says where things are and what to read for a task, so nobody has to read whole files. **No line numbers are stored here** (they change with every edit).
- **Where the files are (folder split, step 4b):** the page is `game/index.html` (only the screens and the list of files to load, about 170 lines), the CSS is in `game/css/` (6 files), the questions and word meanings are in `game/data/` (4 files, see the Data file table in B) and all the code is in `game/js/` (23 files, one or more per script banner: see the File column of the Banner table in B). In this README, `index.html` means `game/index.html`, and a name of code (a function, a constant, `CONFIG`, `I18N`) is found with a search in `game/js/` (the Banner table says which file). The tools find the files by themselves.
- **Code (`game/js/`): read a window, or a whole small file.** Search for the anchor (any search tool: `grep -n`, the Grep tool), then read about 60 lines around the hit (the Read tool with `offset` and `limit`, or `sed -n`). How to search: a script **banner** as `^ \* NAME` (for example `^ \* TIMER`; the bare word also appears in many other places), a **function** as `^function name(`, a **CSS anchor** as `/\* anchor`, an **id** as `id="name"`, a **JSON key** as the key itself. Search every anchor of your task's row in **one** call (for example `grep -n -E "^ \* (TIMER|TEXTS)"`) and read the routed doc sections in parallel calls.
- **Docs (README.md, DESIGN.md): read the whole section the map points to.** Find it with `^## Heading` (for example `^## Screen flow`); it runs to the next `## ` heading.
- **Current line ranges** of every banner and `##` heading: `powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_filemap.ps1 -Lines`. The same script, run without `-Lines`, checks that this map matches the files (see F).

**Do not read whole:** the data files; `index.html` (about 170 lines) and the code files of `game/js/` (16 to 200 lines each) may be read whole; the CSS files in `game/css/` are 40 to 240 lines each and may be read whole; the data files in `game/data/` (each of the two theme files of `data/questions/` is about 28,000 characters, the glossary `data/glossary/a1.js` about 8,000): search a key, for example `A1|vocabulary|1|mc|easy`, and read around it; the README parts "Question content method" and "Content (questions)" unless you work on questions; the private word lists in `.gitignore/` (10,000 to 40,000 characters each).
**Always read:** this map. **Before you change something, also read** README "Confirmed decisions" and the "Change together" row (E) for your task; for a plain question about how things work you may skip those two. **When unsure, read more, not less.**

### A. Start here: the task, then what to read

| Task | Anchors in the code files (or the CSS files) | Docs to read (README / DESIGN) |
|---|---|---|
| Change a visible text, or a Turkish text | `TEXTS`, `LANGUAGE` | README Language (English / Turkish); DESIGN Status |
| Change a number (time, points, thresholds) | `CONFIG` | README Configuration |
| Add or change a setting | `SETTINGS`, `MENU BUTTONS` (`initMenus` loads some saved settings), `TEXTS`, `LANGUAGE`, `THEME`, `SOUND` | README Theme, sound and confetti ("To add a setting"), Language (English / Turkish); DESIGN Components |
| Change a screen, menu, level or navigation | `NAVIGATION / MENUS`, `MENU BUTTONS`, `NEXT EXERCISE`, `MENU TREE` | README Screen flow; DESIGN Controls placement |
| Change a pop-up | `MODAL` (the engine), `TEXTS` (its texts), and the banner that opens it: `NEXT EXERCISE` (main menu, end of category), `QUIZ FLOW` (words, quit), `TIMER` (time out, game over), `SETTINGS` | README Screen flow; DESIGN Components |
| Change a question type, answer checking or scoring | `QUESTIONS`, `RENDERERS`, `QUIZ FLOW`, `CONFIG` (`POINTS_CORRECT`, `POINTS_INCORRECT`, `SPELL_EXACT_MAX_LENGTH`, `SPELL_SHORT_MAX_LENGTH`, `SPELL_MAX_EDITS_SHORT`, `SPELL_MAX_EDITS_LONG`) | README Question types (with "Typed Fill in the Blanks"), Scoring algorithm, Answer feedback |
| Change the timer or the time-out | `TIMER`, `TEXTS` (its pop-up texts), `CONFIG` (`EXTENSION_SECONDS`, `EXTENSION_PENALTY`) | README Timer and time-out algorithm |
| Change the results screen | `RESULTS` | README Answer feedback, Screen flow |
| Change the look (colors, spacing, motion) | CSS anchors (B), in `game/css/` | DESIGN (the matching sections) |
| Write or review questions or glossary meanings (a change task: also read "Confirmed decisions" and row E) | the theme files of `game/data/questions/` and the level file of `game/data/glossary/` (search keys), the check script (its commands: `-Draft`, `-Worksheet`), and the private files `.gitignore/plans/PLAN_<LEVEL>_<CATEGORY>.md` (the theme's approved plan) and `.gitignore/words/ORG_<LEVEL>_WORDS.md` (only that theme's lines) | README Content (questions), Question content method (it holds "Workflow: draft → review → write" and the Review checklist; AGENTS.md rule 9) |
| Add a vocabulary theme | `TOPICS AND DATA`, a new file in `game/data/questions/` with its script tag in the page | README Content (questions), "Next theme, step by step" |
| Plan something new, or check what is decided or still open | none | README Roadmap (with its "Open questions"), Question content method ("Open questions"), Confirmed decisions; AGENTS.md rule 4 |
| Commit | none | AGENTS.md rule 7, README Changelog, CHANGELOG.md |

### B. The page, the css, data and code files, in file order

The `<head>` script applies the saved theme before the first paint, and the page links the six CSS files of `game/css/` (colors, layout, quiz, results, dialogs, halloween). The `<body>` holds the screens. Then come the script tags of the data files (`game/data/`, see the Data file table) and of the code files (`game/js/`, in load order, see the Banner table).

**Script banners** (each is the first uppercase words of a `/* ===` comment; a function belongs to the nearest banner above it). All sections are in `game/js/` (23 files, in load order; each file starts with a header that lists what it provides and what it needs, and the map check fails when a header is wrong). The RENDERERS section is cut by function over three files, `choice.js` (starts with the banner), `fill.js` and `match.js`. The last column is the file (the first one listed holds the banner):

| Banner | Holds | Functions | Constants | File |
|---|---|---|---|---|
| `CONFIG` | every tunable number, level groups, categories, types, difficulties | - | CONFIG | `js/config.js` |
| `TEXTS` | the English and Turkish texts and the text function | t | LANGS, LANG_NAMES, I18N | `js/texts.js` |
| `TOPICS AND DATA` | topic names, credits, the two lists the data files fill, lorem words, icons | getTopics | DEFAULT_TOPICS, TOPICS_BY_SECTION, CREDITS, QUESTION_BANK, GLOSSARY, LOREM_WORDS, ICONS | `js/topics.js` |
| `STATE` | the state object | - | state | `js/core.js` |
| `HELPERS` | element builder, number format, storage, seeded random | el, fmt, englishText, noteText, clampScore, findById, loadPref, savePref, prefersReducedMotion, hashString, mulberry32, makeLorem | - | `js/core.js` |
| `LANGUAGE` | saved language, static texts, switching language | initLanguage, applyStaticTexts, setLanguage | - | `js/language.js` |
| `THEME` | Auto, Light, Dark; Trick or Treat (the Halloween theme) | setTheme, initTheme, setHalloween | THEMES, currentTheme, halloweenOn | `js/theme.js` |
| `SOUND` | Web Audio sounds and mute | getAudio, playNote, playSound, setMuted, initSound | sound, SOUNDS | `js/sound.js` |
| `CONFETTI` | results confetti | launchConfetti, stopConfetti | confetti | `js/confetti.js` |
| `HALLOWEEN WALKER` | Trick or Treat: the hooded figure with a lantern that walks across the bottom once, drags a skeleton, and sinks into the ground when a quiz starts | walkerSmooth, walkerKeys, walkerRotate, walkerEase, walkerOut, walkerMarkup, planWalker, walkerPosition, renderWalker, tickWalker, beginWalker, finishWalker, startWalker, walkerModalClosed, stopWalker, sinkWalker | WALKER_HEIGHT, WALKER_GROUND, WALKER_SCALE, WALKER_FIGURE_MIDDLE, WALKER_X0, WALKER_RAMP, WALKER_TAU, walker | `js/halloween-walker.js` |
| `QUESTIONS` | quiz key, which parts have real questions, getting and shuffling questions, lorem questions, Fill checking | quizKey, hasRealQuizzes, isInUnfinished, getQuestions, generateLoremQuestions, prepareQuiz, balancedPositions, editDistance, normalizeAnswer, judgeFill, questionText, correctAnswerText | - | `js/questions.js` |
| `NAVIGATION / MENUS` | screens, path line, button builder, difficulty, same duration | breadcrumbParts, refreshBreadcrumb, showScreen, renderButtons, getQuestionSeconds, setSameDuration, renderDifficultyButtons | SCREEN_DEPTH | `js/navigation.js` |
| `NEXT EXERCISE` | order of the next quiz (asks first before an unfinished part), main menu pop-up, end-of-category pop-up | getNextExercise, levelCategoryLabel, openHomeConfirm, goHome, goToNextExercise, goToNextExerciseAsking, openNextExercise | - | `js/next-exercise.js` |
| `MENU BUTTONS` | topic, level, category and type buttons (with the gray "not finished" ones); menu start-up | renderTopicButtons, renderCategoryButtons, renderMenus, initMenus | - | `js/menu-buttons.js` |
| `MODAL` | pop-up engine, inert page behind it, the "not finished yet" question, the reload notice, Credits | updateInert, openModal, closeModal, openUnfinishedConfirm, wasReloaded, openReloadNotice, openCredits | modalState | `js/dialogs.js` |
| `SETTINGS` | Settings pop-up and the Language toggle | refreshSettings, setSmartBoard, settingText, settingSwitch, languageToggle, translateSettings, openSettings | settingsUi | `js/settings.js` |
| `MENU TREE` | menu tree panel; also initModal (the pop-up's listeners) | renderTree, openTree, closeTree, initTree, initModal | TREE_STEPS, treeCloseTimer | `js/menu-tree.js` |
| `QUIZ FLOW` | start a quiz, word pre-view pop-up, one question, answer, quit | startQuiz, quizTargetWords, glossarySenses, openWordPreview, currentQuestion, currentRecord, renderQuestion, updateScoreDisplay, submitAnswer, goNext, skipQuestion, requestQuit | - | `js/quiz-flow.js` |
| `TIMER` | timer, time-out pop-up, extra time, game over | startTimer, resumeTimer, pauseTimer, stopTimer, tick, renderTimer, onTimeUp, useExtension, gameOver | - | `js/timer.js` |
| `RENDERERS` | one renderer per question type | renderChoiceButtons, choicePoints, submitChoice, renderMC, renderTF, fillBefore, fillAfter, renderFill, renderFillTap, renderMatch | RENDERERS | `js/choice.js`, `js/fill.js`, `js/match.js` |
| `RESULTS` | the results screen | statusLabel, renderResultsContent, showResults | - | `js/results.js` |
| `INIT` | start-up order | - | - | `js/init.js` |

**HTML ids** (screens and big blocks):

| Id | What it is |
|---|---|
| `topbar` | top bar: Main menu, menu tree and Settings buttons |
| `screen-level` | level screen (root) |
| `screen-category` | Vocabulary / Grammar screen |
| `screen-topic` | topic screen |
| `screen-type` | question type screen |
| `screen-difficulty` | difficulty screen and the same-duration switch |
| `screen-quiz` | the quiz (header, timer bar, question, feedback, Next) |
| `screen-results` | results (score, counts, buttons, one card per question) |
| `walker` | the strip along the bottom where the Halloween walker is drawn (empty and hidden except during its one pass) |
| `credits-footer` | footer with the Credits link |
| `tree-overlay` | menu tree panel |
| `modal-overlay` | the one pop-up used by every dialog |

**Data files** (`game/data/`; the page loads them with script tags, in this order, before the code files; the checks read them by file name):

| Data file | Holds |
|---|---|
| `data/start.js` | creates the two empty lists the data files fill (`GAME_DATA.questions`, `GAME_DATA.glossary`) |
| `data/questions/a1-vocabulary-00-greetings-and-feelings.js` | A1 Vocabulary, theme 0: 16 quizzes (4 types x 4 difficulties) |
| `data/questions/a1-vocabulary-01-numbers-and-amounts.js` | A1 Vocabulary, theme 1: 16 quizzes |
| `data/glossary/a1.js` | the word meanings of level A1 (shown in the "Words in this game" pop-up); search a word |

**CSS anchors** (each is the start of a `/* ... */` comment in one of the six files of `game/css/`; the look itself is described in DESIGN.md):

| CSS anchor | File | Covers |
|---|---|---|
| `Design language` | `colors.css` | color tokens, light and dark values |
| `The level accent` | `colors.css` | accent colors per level |
| `Top bar` | `layout.css` | top bar and icon buttons |
| `Buttons` | `layout.css` | normal and primary buttons |
| `Menu grids` | `layout.css` | level, category, topic, type and difficulty buttons |
| `Unfinished buttons` | `layout.css` | the grayed "not finished" buttons and their small tag |
| `The quiz suggested` | `layout.css` | the "Next" mark on the difficulty screen |
| `Switch` | `layout.css` | switch rows |
| `Halloween theme` | `halloween.css` | the Trick or Treat tokens: AMOLED black, one orange, light text |
| `Halloween screens` | `halloween.css` | orange outlines (2px, `--line`) on cards, buttons, pop-ups and top bar buttons; dashed amber for unfinished buttons |
| `The ghost` | `halloween.css` | the ghost in the top bar's left corner (Halloween only) |
| `Halloween walker` | `halloween.css` | the strip behind the page where the walker is drawn (fixed, never tappable) |
| `Quiz header` | `quiz.css` | progress, score, timer bar |
| `Fill in the blanks` | `quiz.css` | word bank, instructions |
| `Typed blank` | `quiz.css` | the typed blank |
| `SmartBoard mode` | `quiz.css` | tappable bank words and blank |
| `Matching` | `quiz.css` | two-column matching |
| `Results` | `results.css` | results hero and cards |
| `Footer / credits` | `results.css` | footer link |
| `Modal` | `dialogs.css` | pop-up |
| `Settings pop-up` | `dialogs.css` | Settings rows, segmented control |
| `Language toggle` | `dialogs.css` | the sliding English / Türkçe pill |
| `Menu tree` | `dialogs.css` | menu tree drawer and sheet |

### C. Docs: which section when

| README section | Read when |
|---|---|
| `File map` | always, first |
| `How to play` | the player-facing instructions change |
| `Screen flow` | any screen, pop-up, menu, tree or navigation change |
| `Configuration` | any number in CONFIG, and the topic lists |
| `State` | the state or a quiz record changes |
| `Scoring algorithm` | points, penalties, score limits |
| `Timer and time-out algorithm` | timer, extra time, game over |
| `Language (English / Turkish)` | any text, the language switch, Turkish wording |
| `Theme, sound and confetti` | Settings internals, theme, sound, saved settings, confetti |
| `Answer feedback` | feedback box, partly correct answers, result cards |
| `Question types` | stored question shapes, typed and SmartBoard Fill, Matching, shuffling |
| `Content (questions)` | question bank, glossary, check script, A1 word lists, organized word files |
| `Question content method` | planning, writing and reviewing questions (it ends with the Review checklist) |
| `Confirmed decisions` | before you change something (not needed for a plain question) |
| `Testing` | before handing over |
| `Changelog` | when committing |
| `Roadmap` | planning, owner's ideas, history design, the file split |

| DESIGN section | Read when |
|---|---|
| `Status` | any visible text, fixed names, approved texts, Turkish names |
| `Style: "clean study app"` | layout and general look |
| `Level colors` | level colors |
| `Other colors` | answer, timer and surface colors |
| `Light and dark mode` | theme work |
| `Typography` | fonts |
| `Motion` | animations |
| `Sound` | sounds |
| `Controls placement` | top bar, Back button, footer |
| `Components` | any button, switch, pop-up, toggle or card |
| `Open design work` | planning design |

Sub-sections (`###`) you may need, inside the sections above (the map check does not list them, so check the name when you search): under `Question types`: "Typed Fill in the Blanks", "SmartBoard Fill in the Blanks", "Matching"; under `Content (questions)`: "Check script" (with `####` parts: "Commands", "Reading the report", "The checks", "Writing questions with it", "What the script depends on", "Known warnings", "Changing the script", "Troubleshooting"), "A1 word lists", "Building an organized word file for a level"; under `Question content method`: "Target-word plans", "Writing the questions", "Next theme, step by step", "Theme notes", "Workflow: draft → review → write", "Review checklist", "Open questions (ask the owner; do not decide)"; under `Roadmap`: "Open questions (ask the owner before building)", "Draft design: history, overall calculation, resets, recommendations", "Later, not planned yet: splitting the file".

### D. Other files

| File | What and when |
|---|---|
| `AGENTS.md` | the working rules; read first, every session |
| `CHANGELOG.md` | plain-language log; read only to add the entry for a commit, and then only its first 12 lines (the rule, the newest entries and the commit ID to copy) |
| `.gitignore/tools/check_questions.ps1` | question check, draft check and review worksheet; run after any question change (README Check script, with its guide) |
| `.gitignore/tools/test_check_questions.ps1` | self-tests of the question check; run after changing that script (README Check script, "Changing the script") |
| `.gitignore/drafts/` | question drafts and glossary drafts while a theme is in progress; private, never committed |
| `.gitignore/tools/check_filemap.ps1` | file map check, which also looks for stale function and constant names in the docs; run after any structural change or doc edit (F) |
| `.gitignore/archive/serve.ps1` | the old test server (served only an `index.html` in the project folder); retired 2026-11-02 and replaced by `serve_test.ps1`, kept only in case |
| `.gitignore/tools/serve_test.ps1` | private test server for any folder (also a split one); adds the play-through test to the page when the address ends in `?playtest` (README Testing) |
| `.gitignore/tools/playthrough.js` | the play-through test: plays every question type, the timer, pop-ups, language and settings through the real screens (README Testing); run by `serve_test.ps1`, never part of the game |
| `.gitignore/tools/dryrun_split.ps1` | dry run of the folder split into a scratch folder, with the text proofs (private plan: `.gitignore/drafts/FOLDER_SPLIT_PLAN.md`) |
| `.gitignore/archive/single-file-2026-11-02/index.html` | the old single-file version of the game (with the notes of that time and a READ_ME_FIRST.txt), kept just in case; never changed, never read for a task |
| `.gitignore/tools/split_code2.ps1` | step 4b of the folder split: moves the rest of the script (QUESTIONS to INIT) into 14 more files of `game/js/` and removes the main script from the page, with the same proofs (used once; kept as the record of how the split was made) |
| `.gitignore/tools/split_code1.ps1` | step 4a of the folder split: moves the first nine sections of the script into `game/js/` with headers, and proves that nothing changed (used once; kept as the record of how the split was made) |
| `.gitignore/tools/split_data.ps1` | step 3 of the folder split: moves the question bank and the glossary out of the page into `game/data/` and proves that nothing changed (used once; kept as the record of how the split was made) |
| `.gitignore/tools/split_css.ps1` | step 2 of the folder split: cuts the old `<style>` block into the five css files and proves that nothing changed (used once; kept as the record of how the split was made) |
| `.gitignore/tools/jsnames.ps1` | the scanner behind the header check of `check_filemap.ps1`: finds the names a code file defines and the names it uses from other files; not run by hand |
| `.gitignore/words/ORG_A1_WORDS.md` | A1 word lists, about 40,000 characters: read only the theme or topic you need |
| `.gitignore/plans/PLAN_A1_VOCABULARY.md` | target-word plans, about 7,000 characters |
| `.gitignore/words/A1_WORDS.md` | the original A1 list, never changed, almost never read |
| `.gitignore/words/GRAMMAR_LIST.md` | CEFR grammar points per level and the Grammar topics (not described elsewhere) |

**Git leftovers (local only, nothing to do with them).** The branch `split` is the finished work of the folder split; it is already joined into `main`. The tag `before-split` marks the last version where the whole game was one `index.html`. Both exist only on the owner's PC (never pushed), and neither may be deleted without asking the owner. A new session can ignore them. To look at the old single-file game, `git checkout before-split` (look only, then `git checkout main` to come back); the same file is also kept in `.gitignore/archive/`.

### E. Change together (AGENTS.md rule 11 as a lookup)

| If you change | Also check and change |
|---|---|
| A visible text | `I18N` in both languages; `data-i18n` in the HTML; README Language; DESIGN Status when it is a fixed or approved text |
| A number | CONFIG; the README Configuration table; any README text that quotes it |
| A setting | `openSettings` (a row made with `settingSwitch`, its input in `settingsUi`, its row in the list), a setter and its `lg-` storage key, `refreshSettings`, loading the saved value at start-up (step 5 of "To add a setting"), the `I18N` texts in both languages, the `SETTINGS` banner comment, and this map when a function is new; README: Theme, sound and confetti (Settings internals and the storage line), How to play, Screen flow (top bar), Testing, Roadmap item 9, Open questions (Storage, Settings); DESIGN: Status (Settings texts), Controls placement; the AGENTS.md rule 6 list, but **ask the owner first** (AGENTS.md changes only when asked) |
| A level | `CONFIG.LEVELS`, `LEVEL_GROUPS`, `levelName.X` in both languages, a `--lvl-X` color and `body[data-level]` CSS; DESIGN Level colors; the check script lists |
| A vocabulary theme | `TOPICS_BY_SECTION`, a new file in `game/data/questions/` (name, keys, script tag in the page, row in the Data file table), the level file in `game/data/glossary/`, the plan file, DESIGN names list; run the question check |
| The shape of a question | README Question types, the renderers, `generateLoremQuestions`, the check script |
| A screen | its HTML section, `SCREEN_DEPTH`, `showScreen`, the menu tree steps; README Screen flow |
| The Halloween theme or the walker | `css/halloween.css` (tokens and outlines), `js/halloween-walker.js` (drawing and timing), `CONFIG.HALLOWEEN_WALKER_*` and the README Configuration table, the `halloween*` texts in both languages, `setHalloween` and the Settings rows (`settings.js`), the `<head>` script and the `#walker` / ghost in the page; README Theme, sound and confetti; DESIGN Light and dark mode, Components, Status (texts); the play-through test |
| A function, banner, id or doc heading name | this map (rule 12) and the `Provides` / `Needs` header of its code file in `game/js/`, then run the map check |
| The question check script (a check, an option, a number it reads) | the script's header, `$CHECK_NAMES` and `$REVIEW_MAP` in it, `test_check_questions.ps1`, README Check script (the guide, "Known warnings") and Testing, the `CONFIG` numbers it reads (rule 13) |

### F. Keeping the map true (AGENTS.md rule 12)

In the same change, update this map whenever you **add, remove, rename or move** a script banner, a function, a listed constant, a listed HTML id, a data file, a CSS anchor, a `##` heading of README.md or DESIGN.md, or a file listed in D, and whenever what this map says lives where is no longer true. Then run:

```bash
powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_filemap.ps1
```

It must end with `OK`. It reports an **error** when the map names something that does not exist, when something exists but is not in the map (every top-level function, script banner, `screen-` section, data file, css file and `##` heading is checked; a theme file's name must also match the keys inside it), or when a function is listed under the wrong banner. It reports a **warning** for a CSS anchor that is not found in the css file the map names or a private file that is absent, and an **error** for a css file that is not named in the map, not linked by the page, or named but missing. **Code files (split layout):** it also checks every file of `game/js/`: the page must load it, its name must be lower case, `'use strict';` must follow its header (each file needs its own), and its header must list exactly the names the file defines (`Provides`) and the names of other files that it uses (`Needs`; a name that is only used as an object key or inside a string or comment does not count). So when a code file gets a new function, or starts using something from another file, change its header in the same change. The scanner is `jsnames.ps1`. **Stale names in the docs:** it also reports an **error** when a function name written in backticks with round brackets right after it, or an UPPER_CASE name written alone in backticks, in README.md, DESIGN.md or AGENTS.md does not exist in the code (the page and `game/js/`; a renamed or removed name; the first real catch was the old question bank loader, which the README still named after it was renamed). CSS words that look like calls (`rgba`, `scale` …) and names the docs mention on purpose as removed (`THEME_LABELS`) are in two lists at the top of the script, `$DOC_ALLOWED_CALLS` and `$DOC_REMOVED_NAMES`: add to them when the check gives a false alarm. If the map and the files disagree, fix the one that is wrong and tell the owner. **What the check does not do:** it does not check the "Holds" and "Read when" descriptions, the names inside tables A and E, the `###` sub-sections, names written another way (for example `CONFIG.LEVELS`, or without backticks) or whether every CSS anchor is listed, so read those with a critical eye and fix any that are wrong. The script is private (it lives in `.gitignore/tools/`, which is never uploaded): on a copy without that folder the check cannot run, so compare by hand and tell the owner. Table syntax the script relies on: the first cell of a row in a table is the thing to find, written in backticks; function and constant cells are plain names separated by commas; do not put a `|` inside a cell.

## How to play

**You need the whole `game` folder.** Nothing to install, no account.

1. On GitHub, click the green **Code** button, then **Download ZIP**.
2. Unzip the downloaded file.
3. Open `game/index.html` with your browser (Chrome, Edge, Firefox or Safari): double-click it, or drag it into a browser window.

- The game works on **phones and computers**.
- Works **offline**, too: without internet, the game uses your device's own font instead of Inter.
- Your settings (language, theme, sound, the same-duration switch and SmartBoard mode) are remembered in that browser. Open them with the **gear button** in the top corner.

**Coming later: a website.** The plan is to publish the game on a website, so anyone can play it from a link on a computer or a phone, with nothing to download (see "Roadmap").

## Screen flow

```
Level (A1 A2 B1 B2 C1)
 └─ Category (Vocabulary, Grammar)
     └─ Topic (per section: 15 vocabulary themes for A1 Vocabulary, 21 grammar topics for A1 Grammar, 10 lorem ipsum topics elsewhere)
         └─ Question type (Multiple Choice, Fill in the Blanks, True or False, Matching)
             └─ Difficulty (Easy, Medium, Hard, Very Hard) + "same duration" switch
                 └─ "Words in this game" pop-up (Start, or the back arrow to this screen)
                     └─ Quiz (8 questions; Matching 2–4)
                     └─ Results
```

- Every screen is a `<section id="screen-NAME" class="screen">`; `showScreen(name)` shows one and hides the others.
- Back buttons use `data-back="NAME"` (fixed parent screen, not a history stack). The level screen is the root and has no back button.
- **"Words in this game" pop-up** (`openWordPreview()`, called by `startQuiz()`): every time a quiz starts, including Retry, a pop-up lists the quiz's tested words (`quizTargetWords()`: Multiple Choice answers, Fill answers, True or False `target`s, Matching left words), each with **all of its word types at that level** and a short meaning for each, from the level's glossary (`glossarySenses()`; lorem placeholders when a word has no entry). **The word type used in that game is underlined** (`.word-type.is-used`); a word with one type has that one underlined. Meanings are shown in every question type, Matching too (owner's decision: it is practice, and pre-teaching helps). One button, **Start**, closes it and shows the first question; the timer starts only then. A **back arrow** left of the title (`onBack` in `openModal`; owner's request, 2026-11-01; the owner did not like a second Back button in the button row) leaves before the quiz begins, to the Difficulty screen, like Quit (nothing was answered yet; `state.quiz` is cleared). A former second **Skip** button was removed because it did the same job as Start. The pop-up can't be dismissed by Escape or clicking outside. Every pop-up opens scrolled to its top (`openModal` resets the scroll and focuses its main button without scrolling), so a long word list starts at its first word.
- **Starting a quiz while the Halloween walker is on screen** (Trick or Treat only; `startQuiz()` begins with `if (sinkWalker(startQuiz)) return;`): the quiz does **not** start at once. The walker sinks into the ground first (`CONFIG.HALLOWEEN_WALKER_SINK_SECONDS`, 2.2 s), and then `startQuiz()` runs again by itself (only if the player is still on the same screen; a timer is the fallback if the browser pauses animation frames). When the walker is not on screen (not yet started, already gone, Halloween off, reduce motion), `sinkWalker` answers false and the quiz starts at once. See "Theme, sound and confetti".
- **Level screen** (`#level-buttons`, built by `renderMenus()`, which `initMenus()` calls and which runs again when the language changes): the five levels are shown in three headed groups taken from `CONFIG.LEVEL_GROUPS` (A: A1, A2; B: B1, B2; C: C1). The group headings (`levelGroup.A` … in `I18N`: A - Basic user, B - Independent user, C - Proficient user) and the level names under the codes (`levelName.A1` … : Beginner, Elementary, Intermediate, Upper Intermediate, Advanced) are texts in `I18N`, in both languages. `CONFIG.LEVELS` stays the ordered list of codes used everywhere else (accent, Next exercise, tree). To add a level (for example C2), add it to `LEVELS` and a group in `LEVEL_GROUPS`, add its name `levelName.C2` to both languages of `I18N`, and give it a `--lvl-` color.
- **Unfinished parts** (owner's request, 2026-11-02; `hasRealQuizzes()` and `isInUnfinished()` in `questions.js`, the `unfinished` flag of `renderButtons()` in `navigation.js`, `openUnfinishedConfirm()` in `dialogs.js`): a menu button whose part has no real questions yet is **grayed** (`.is-unfinished`: softer colors, no shadow, a small tag "Not finished" / "Henüz bitmedi"; a level button keeps its own level color, only paler) but stays a normal clickable button. A click opens the pop-up "Not finished yet" ("The part you want to go to is not finished yet. Do you still want to go there?"): **Go back** (the main button) stays, **Go there** continues as before. **Only the first button that leads to lorem ipsum is gray:** a level button when the level has no real quiz at all (A2 to C1 today), a category button when its level has some but the category has none (A1 Grammar), a topic button when its category has some but that topic has none (13 of the 15 A1 vocabulary themes). Inside a gray part nothing is gray and nothing asks. The gray follows the data by itself: `hasRealQuizzes(level, category, topic)` is true when `QUESTION_BANK` holds a key below that part, so the day a theme's questions are added its button stops being gray (nothing to edit). The category and topic grids are built each time the screen is shown (`showScreen()`), because they depend on the chosen level and category. The pop-up shows every time (no memory). The menu tree and the Back buttons never ask: they only return to screens already visited.
- **Reload notice** (owner's request, 2026-11-03; `wasReloaded()` and `openReloadNotice()` in `dialogs.js`, called from `init.js`): the game does not keep where the player was, so a reload always ends on the main menu. When the browser says the page was reloaded (`performance.getEntriesByType('navigation')[0].type === 'reload'`; a first visit, a link or a typed address say something else), a small pop-up opens on top of the main menu: "Oops, you reloaded the page. When you reload the page, you go back to the main menu." / "Hay aksi, sayfayı yeniden yükledin. Sayfayı yeniden yüklediğinde ana menüye dönersin." with one button OK / Tamam (texts `reloadedBody`, `ok`). It has **no title**: `openModal()` without `title` hides the title row and names the pop-up by its sentence (`aria-labelledby` points to `#modal-body`). Escape and clicking outside close it. It is opened in `init.js` **before** `initTheme()`, so with Trick or Treat on the Halloween walker sees an open pop-up and waits for it to close (`startWalker`). If the browser can't tell (no navigation record), nothing is shown and nothing breaks. Browser back and forward buttons are not used by the game (one page, no history steps; on a website back leaves the game): see the Roadmap.
- The quiz screen's Back button opens a "Quit quiz?" confirm (timer paused). Quit → difficulty screen, progress lost. Cancel → timer resumes.
- Results screen: Back (→ difficulty), **Next exercise** (primary), Retry (same settings), Main menu (→ level).
- **Next exercise** (`getNextExercise()`, `openNextExercise()`, `goToNextExercise()`; button `#results-next`, on every results page, hidden after the very last quiz): opens the **Difficulty screen of the next quiz with that quiz marked "Next"** (accent outline and a small tag; `state.nextHint`), and the student presses it to start. Order: next difficulty (Easy → Very Hard); after Very Hard the next question type (Multiple Choice, Fill in the Blanks, True or False, Matching) at Easy; after the last type the next topic (Multiple Choice, Easy). After the last topic of a category, a pop-up "End of {level} {category}" tells the situation and lets the student choose: the next category of the same level (Vocabulary → Grammar), the first category of the next level, or Main menu. Placeholder (lorem) quizzes are included, so it can lead to one: **when the next quiz is in a part without real questions and the one just played is not** (finished → unfinished, `goToNextExerciseAsking()` with `isInUnfinished()`), the same "Not finished yet" pop-up asks first (Go back stays on the results screen; this holds for the options of the end-of-category pop-up too); from one unfinished part to another it does not ask again. `state.nav` is set to the next quiz (so Back and Quit work from there) and `sameDuration` is untouched; the mark disappears as soon as any other screen is shown. The last quiz is C1 Grammar, last topic, Matching, Very Hard.
- Breadcrumb (`.breadcrumb` in each screen) is built from `state.nav` up to the screen's depth (`SCREEN_DEPTH`).
- **Credits**: footer link on every screen except the quiz screen (results included). Opens a modal listing `CREDITS` (Claude, Ahmet Kaan Sarılarlı, Enes Miraç Ateş).
- **Top bar** (`#topbar`): three buttons, hidden on the quiz screen: **Main menu** (house), the **menu tree** (pine-tree icon) and **Settings** (gear). The gear opens the Settings pop-up (`openSettings()`, a dismissible `openModal`): Language (the English / Türkçe toggle, first row; see "Language (English / Turkish)"), Theme (Auto / Light / Dark; grayed out while Halloween is on), **Trick or Treat** (the Halloween theme switch), Sound, the same-duration switch and a **SmartBoard mode** switch (built, see "SmartBoard Fill in the Blanks"), each with a short explanation, and a "Work in Progress" note. Credits stays in the footer.
- **Main menu button** (`#home-btn`, `openHomeConfirm()`): a house icon left of the menu tree, hidden on the level screen (`showScreen()` sets its `hidden`). It opens a pop-up "Go to the main menu?" ("You will go back to the level selection screen.", buttons No and Yes); Yes calls `goHome()` (clears `state.quiz`, shows the level screen), No, Escape or a click outside close it. `state.nav` is kept, as with the other ways home.
- **Pop-ups and keyboard focus** (`openModal()`, `closeModal()`, `updateInert()`): while a pop-up or the menu tree is open, `#topbar`, `#app` and `#credits-footer` are `inert`, so Tab and Shift+Tab (and screen readers) cannot reach the page behind it. Before this, a keyboard user could answer a question behind the "Time out" pop-up and then pay the 10-point extension for an answered question (found in the 2026-11-01 test). `closeModal()` returns focus to the control that opened the pop-up (`modalState.opener`); `closeTree()` returns it to the tree button. **Rule (owner, 2026-11-01): every pop-up, now and in the future, must behave like this.** Build new pop-ups with `openModal()` (it does all of the above by itself); an overlay that cannot use it must call `updateInert()` when it opens and when it closes, and return focus to its opener.
- **Menu tree** (`#tree-btn`, `openTree()`, `renderTree()`, `closeTree()`; panel `#tree-overlay` > `.tree-panel`): shows the student's path through the five menu steps (Level, Category, Topic, Question type, Difficulty) as a vertical tree. Steps already chosen on the current screen show their value and are clickable: a click opens that step's menu screen, so the student can change it (it does not clear `state.nav`, like the Back buttons); steps not chosen yet are dimmed and disabled; the step being chosen is highlighted with "You are here" (on the results screen, the Difficulty step). The depth comes from `SCREEN_DEPTH[state.screen]` (`state.screen` is set by `showScreen()`), the values from `breadcrumbParts()`. On screens 600px and wider it is a drawer that slides in from the right; on phones it is a bottom sheet (max 75% of the screen height). Closes with Close, Escape, a click on the dim backdrop or a step; focus returns to the tree button. Closing uses a timer (`CONFIG.TREE_CLOSE_MS`), so it also hides with "reduce motion". The button and tree use the level accent, not green (green is only for answers).
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
| `SPELL_EXACT_MAX_LENGTH` | 3 | answers up to this many letters must be typed exactly: no "misspelled" half points (owner's rule, 2026-11-01) |
| `SPELL_SHORT_MAX_LENGTH` | 5 | answers up to this many letters count as short |
| `SPELL_MAX_EDITS_SHORT` / `SPELL_MAX_EDITS_LONG` | 1 / 2 | allowed spelling differences for short / longer answers |
| `TIMER_LOW_RATIO` | 0.25 | timer bar pulses below this fraction |
| `TICK_LAST_SECONDS` | 5 | tick sound in the last N seconds (normal and extra time) |
| `CONFETTI_MIN_SCORE` | 80 | Multiple Choice, Fill, True or False: confetti when final score ≥ this |
| `CONFETTI_MIN_MATCH_SCORE` | 75 | Matching: confetti when final score ≥ this |
| `CONFETTI_COUNT` / `CONFETTI_MS` | 90 / 2800 | confetti pieces and duration |
| `HALLOWEEN_WALKER_DELAY_SECONDS` | 3 | Trick or Treat: the walker starts this long after the page opens (or after the Settings pop-up closes, when the switch was turned on there) |
| `HALLOWEEN_WALKER_STOP_SECONDS` | 2.5 | it stops this long to look back |
| `HALLOWEEN_WALKER_SPEED` | 28 | walking speed in px per second, the same on every screen width (the speed of the approved demo; about 22 s for a pass on a 340 px phone, about 55 s on a 1280 px screen) |
| `HALLOWEEN_WALKER_TUGS_BEFORE_STOP` / `_TUGS_AFTER_STOP` | [2.5, 5.8] / [3.5, 8] | seconds (from the start / from walking on again) when it tugs the rope hard |
| `HALLOWEEN_WALKER_SINK_SECONDS` | 2.2 | sinking into the ground when a quiz starts (the quiz waits this long) |
| `TREE_CLOSE_MS` | 280 | how long the menu tree's close animation runs before the panel is hidden (matches the CSS, 0.28 s) |
| `LEVEL_GROUPS` | A: A1, A2; B: B1, B2; C: C1 | which levels sit in which group on the level screen (`id` + `levels`). The group headings, level names and the names of categories, types and difficulties are **texts**, so they live in `I18N` (English and Turkish), not here |

`CREDITS` holds the names shown in the Credits pop-up (Claude, Ahmet Kaan Sarılarlı, Enes Miraç Ateş).

### Topics

- `TOPICS_BY_SECTION` holds real topic names per section, keyed `level|category` (e.g. `'A1|grammar'`). Array order = button order. Any number of topics is allowed.
- `DEFAULT_TOPICS` (10 lorem ipsum names) is used for every section without an entry.
- `getTopics(nav)` returns the right list. `renderTopicButtons()` rebuilds the topic grid each time a category is chosen; `breadcrumbParts()` also uses `getTopics()`.
- `nav.topic` is the topic's **index** in that list, so quiz keys (`quizKey()`, `QUESTION_BANK`) use the index. Don't reorder a section's topics after real questions are added for it.
- In the code every menu item at this step is a "topic". In the docs, Vocabulary items are called **vocabulary themes** and Grammar items **grammar topics**.
- Decided so far: **A1 Vocabulary** (15 vocabulary themes, in textbook order) and **A1 Grammar** (21 grammar topics); their words are in `ORG_A1_WORDS.md`. Their quizzes use lorem ipsum questions, except Greetings and Feelings (see "Content (questions)").

## State

```js
state.nav  = { level, category, topic /* index */, type, difficulty, sameDuration }   // sameDuration is remembered: localStorage "lg-same-duration"
state.screen = 'level'   // the screen being shown (set by showScreen); the menu tree reads it with SCREEN_DEPTH
state.nextHint = null   // { difficulty }: the quiz "Next exercise" marks on the Difficulty screen; cleared as soon as any other screen is shown
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
// partial = misspelled Fill answer, or a Matching question with 1–3 correct pairs; note = { key, params } of a text (spellingWarning "Check your spelling…" / pairsCorrect "2 of 4 pairs are correct."), turned into a sentence by noteText() in the chosen language
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
- The score is kept exact (3 × 33.33… = 100); `fmt()` removes float noise and shows at most 2 decimals (6.25, 33.33; in Turkish with a comma, 6,25 and 33,33, display only).
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
     - The numbers come from `CONFIG` (`EXTENSION_SECONDS`, `EXTENSION_PENALTY`); `tick()` calls `onTimeUp()` each time the time reaches 0. The texts are in `I18N`, both languages: Time out `timeOutTitle`, body `timeOutBodyPts` (graded quiz) or `timeOutBody` (not graded), buttons `plusSecondsPts` / `plusSeconds` and `skipQuestion`; Game over `gameOverTitle`, `gameOverBody`, `retry`, `seeResults`.
     - Extension (`useExtension()`): penalty applied (if graded), timer restarts at 10 s in "extension" mode (striped orange bar, "Extra time" label). Only once per question.
     - Skip (`skipQuestion()`): record = skipped, go straight to the next question (or results if last).
  2. Extension also reaches 0 → `gameOver()`: the quiz ends. **Game over** modal: `Retry` (same level/category/topic/type/difficulty/switch) or `See results`. The current question is marked `timedOut`, it and all later questions are "Not answered".
- Ticks: in `tick()`, `secondsLeft = ceil(remainingMs / 1000)`; when `secondsLeft ≤ TICK_LAST_SECONDS` and it differs from `timer.lastTickSecond`, play `'tick'` once (so 5, 4, 3, 2, 1). `startTimer()` resets `lastTickSecond`, so the extra time ticks too.

## Language (English / Turkish)

Owner's request (2026-11-01), built in two rounds. **Both rounds are built.** Round 1 is committed (`8f4af6c`) and round 2 is committed (`ea4d67c`).

**What is translated** (owner's decisions): menu elements, buttons, pop-ups, Settings, the quiz screen, answer feedback and the results screen, and the fixed names (Multiple Choice, Easy, level names, …). **Never translated, not ever:** questions and their options, bank words and Matching words; the True / False **answer buttons** (the type *name* "True or False" is translated); topic names; the game name "My Game Project"; level codes (A1 … C1); people's names. Later, separate steps (not started): the meanings in the "Words in this game" pop-up, then the answer explanations.

**How it works** (the code is in `game/js/`: `texts.js` holds `I18N`, `language.js` the switching, `core.js` the helpers, `settings.js` the toggle):
- `I18N = { en: {…}, tr: {…} }` holds every text, one key per text (`'type.mc'`, `'timeOutBodyPts'`, …). **Both languages must have every key** (English is the fallback; a key missing everywhere logs `Missing text: key` to the console and shows the key). `{name}` in a text is filled from the params: `t('endTitle', { here })`. `t(key, params)` returns the text in `state.lang`. Keep the key names free of `'A1|vocabulary':`-style strings, because `check_questions.ps1` finds topic names by searching the file for them.
- **Only the *label* texts moved out of `CONFIG`:** `CONFIG.CATEGORIES`, `TYPES` and `DIFFICULTIES` now hold ids (and `seconds`) only; their names are `t('category.vocabulary')`, `t('type.mc')`, `t('difficulty.easy')`. `LEVEL_GROUPS` holds `id` + `levels`; the headings and level names are `t('levelGroup.A')`, `t('levelName.A1')`. The old `CONFIG.LEVEL_NAMES` and the `THEME_LABELS` object are gone. Numbers stay in `CONFIG` (AGENTS.md rule 5).
- `state.lang` is `'en'` (default) or `'tr'`, saved in `localStorage["lg-lang"]`. `initLanguage()` reads it; `setLanguage(lang)` saves it and refreshes everything on screen: `applyStaticTexts()` (HTML elements marked `data-i18n="key"` get their text, `data-i18n-label="key"` sets the tooltip and screen reader name), `renderMenus()` (level / category / type buttons), `renderDifficultyButtons()`, `refreshBreadcrumb()`, when Settings is open `translateSettings()`, and when the results screen is showing `renderResultsContent()`.
- **`<html lang>` follows the language**, so Turkish capital letters work (`İ`, `ı` in the uppercase group headings). English content carries its own `lang="en"`: the question area (`#quiz-question`), the topic buttons (`renderButtons` item `lang`) and the word list. Add `lang="en"` to any new place that shows English content in a Turkish page.
- **To add a text:** add its key to **both** languages in `I18N`; use `t('key')` in code, or `data-i18n="key"` on the HTML element. A pop-up text is built when the pop-up opens, so it needs no refresh (Settings is the only pop-up that can be open while the language changes). **Never join sentences from pieces in code** (Turkish word order differs): use one text with `{placeholders}`. Do not use a local variable called `t` in a function that also calls `t()` (a local `t` hides the function; several timer functions and `getNextExercise` still have one, but they never call `t()`; rename it if they ever need a text).
- **Language toggle** (`languageToggle()`; DESIGN.md "Language toggle"): `role="switch"` on a `div` (not a button, so the page's button styles never touch it); a tap on a half chooses that side, Left / Right choose a side, Space / Enter switch; `refreshSettings()` sets `aria-checked` (`true` = Türkçe) and `aria-label` ("Language: English"). The names "English" and "Türkçe" always show in their own language (`LANG_NAMES`).

**Round 1 (built):** the toggle and `I18N`; the level, category, topic, type and difficulty screens; the Back buttons, Credits link, top bar tooltips; the Main menu, End of category, Credits, Words in this game (title, Start, back arrow tooltip), Quit, Time out and Game over pop-ups; Settings; the menu tree.

**Round 2 (built, 2026-11-01):** the quiz screen (`questionOf`, `score`, `time` / `extraTime`, `next`, `check`, the Fill instructions, the screen reader labels `yourAnswer` / `theBlank`), the answer feedback (`feedback.*`, the labels `answer` / `correctAnswer` / `explanation` / `points`, `spellingWarning`, `pairsCorrect`) and the results screen (title, Next exercise / Retry / Main menu, the counts `count.*` such as "Doğru sayısı", the result cards, `Q1.` → "Soru 1.", statuses `status.*`). How it differs from round 1:
- **Numbers get a comma in Turkish** (12,5; 6,25; 33,33): `fmt()` changes only the *display*. Stored numbers, `CONFIG` and the future history / export keep dots.
- **A record's note is a text key, not a sentence:** `rec.note` is `{ key, params }` (`spellingWarning` with `{ answer, typed }`, `pairsCorrect` with `{ n, total }`), shown with `noteText(note)`, so it can be shown in either language later.
- **The results screen is built by `renderResultsContent()`** (from `state.quiz`), which `showResults()` calls and `setLanguage()` calls again when the language changes on the results screen (no timer, screen change or confetti). The top bar and Settings are available there, so the language can change there.
- **English content inside a Turkish line** (the question text, the correct answer, the student's answer, the explanation) is wrapped by `englishText()` in `<span lang="en">`. The True / False answer text stays "True" / "False" ("Doğru cevap: True"), like the buttons (owner's choice, 2026-11-01).
- The quiz header label is the short "Puan"; the results hero shows only the number.
- `renderTimer()` uses `timer` as its local name, because `t` is the text function. `getNextExercise`, `startTimer`, `tick` and the other timer functions still have a local `t` but never call `t()`.

Still English in Turkish mode, by design: questions, options, bank and Matching words, the True / False buttons, topic names, the word meanings in the "Words in this game" pop-up, and the answer explanations (the last two are separate, later steps).

**Testing** (round 1 and round 2, 2026-11-01): every screen and pop-up read in both languages with a script; Multiple Choice, True or False, typed Fill (correct, "Almost!", wrong), SmartBoard tap Fill and Matching (partly correct) played in Turkish; Time out (extra time used, −10), Game over and the results with every status; switching the language on the results screen; the "not graded" texts (set `CONFIG.UNGRADED_TYPES = ['fill']` in the console, it is not reachable in the game); comma and dot numbers; saved choice after a reload; keyboard (Left, Right, Space, Enter); phone width (375px, no sideways scroll; quiz header, results, Settings); light and dark; no console errors; `check_questions.ps1` unchanged (0 errors, 16 warnings). "Reduce motion" is covered by the page's global rule (`*, *::before, *::after { animation: none !important; transition: none !important; }`), which includes the toggle's slide; it was read, not emulated.

## Theme, sound and confetti

- **Theme** (`setTheme`, `initTheme`; chosen in Settings with the Auto / Light / Dark buttons): `auto` removes `html[data-theme]` so CSS follows `prefers-color-scheme`. Saved in `localStorage["lg-theme"]`; an inline script in `<head>` applies it before first paint.
- **Trick or Treat, the Halloween theme** (owner's request, 2026-11-03; `setHalloween` in `js/theme.js`, the walker in `js/halloween-walker.js`, the look in `css/halloween.css`): a whole third theme that **replaces Auto / Light / Dark while it is on**. Off by default, a switch row in Settings after Theme, kept in `localStorage["lg-halloween"]` (`'1'` = on). `halloweenOn` holds it and `html[data-halloween]` is `on` or `off`; the `<head>` script of the page sets the attribute before the first paint (no flash). In `halloween.css` the tokens are redefined under `html[data-halloween="on"]:root` (the `:root` at the end makes it stronger than the dark theme selectors) and a few outlines are added (2px orange, the token `--line`); nothing in the other css files changes. While it is on, the three Theme buttons are disabled (grayed) and the Theme help text becomes the note "Halloween mode is on. Turn off Trick or Treat to choose Auto, Light or Dark." (`refreshSettings` swaps its text key, so `translateSettings` keeps working); the saved Auto / Light / Dark choice is kept and applies again when Halloween is turned off. **The walker** (`startWalker`, `stopWalker`, `sinkWalker`): a hooded figure with a lantern drags a skeleton along the bottom of the page. **Once per page visit**: it starts `CONFIG.HALLOWEEN_WALKER_DELAY_SECONDS` after the page opens (or, when the switch was turned on in Settings, after the Settings pop-up has closed: `startWalker` sees the open pop-up, sets `walker.waiting`, and `closeModal` calls `walkerModalClosed`), crosses once, stops in the middle to look back, tugs the rope now and then, and leaves; `walker.done` stays true afterwards, so switching the theme off and on does not repeat it. Its drawing is built as inline SVG in `walkerMarkup()` (no image files) and put into the empty `#walker` strip, which is `position: fixed`, `z-index: -1` (behind every screen, so cards cover it and nothing can be tapped), outside all screens: **changing menus never touches it**. Everything is computed from one clock (`walker.t`, which adds the time since the last frame, at most 0.05 s, so a hidden tab never makes it jump); the speed is always `HALLOWEEN_WALKER_SPEED` (a faster walk looked like a frantic shuffle, because the feet and the rope are made for a calm one), so a wider screen means a longer pass; the feet, bumps and dust follow the distance walked, so nothing slides. **When a quiz starts while it is on screen** (`startQuiz` asks `sinkWalker(startQuiz)`): a script of 2.2 s (stretched to the CONFIG time): everything eases to a stop, a hole opens in the ground (a gap in the ground line with glowing ends, a beam of light, light on the ground), the lantern flares, the figure sinks into the hole (clipped at the ground line) with sparks and dirt flying up and the lantern light going out, the rope drags the skeleton along the ground to the hole and down, and the hole closes; `startQuiz` waits `HALLOWEEN_WALKER_SINK_SECONDS` and then runs (not if the player left the screen meanwhile; a timer is the fallback if the browser pauses animation frames). It never comes back. With "reduce motion" on, or when Halloween is switched off, it does not run (switched off mid-pass: it goes at once). All its numbers are in `CONFIG` (`HALLOWEEN_WALKER_*`). To change the look edit `halloween.css` (tokens, outlines) or the drawing in `walkerMarkup()`. **Testing note:** a preview pane may not run animation frames, so the play-through test advances the walker by calling `tickWalker(fakeTime)` itself.
- **Sound** (`initSound`, `getAudio`, `playNote`, `playSound(name)`): Web Audio API, notes defined in `SOUNDS` (`correct`, `partial`, `wrong`, `tick`). The `AudioContext` is created/resumed on the first `pointerdown`/`keydown` (browser autoplay rules). On by default; the Sound switch in Settings (`setMuted`) saves the choice in `localStorage["lg-muted"]` (`'1'` = muted). `submitAnswer()` plays `correct` / `partial` / `wrong`.
- **Same duration** (`setSameDuration`): the switch exists on the Difficulty screen and in Settings, and both always show `state.nav.sameDuration`. `setSameDuration(value)` updates the state, `localStorage["lg-same-duration"]` (`'1'` = on), both switches and the seconds on the difficulty buttons. `initMenus()` loads the saved value before the first render. Settings is not available during a quiz, so the time of a running quiz never changes.
- **Settings pop-up internals** (`openSettings()`, `settingSwitch()`, `settingText()`, `languageToggle()`, `translateSettings()`, `refreshSettings()`, `settingsUi`): `openSettings()` builds the rows and keeps references to the open controls in `settingsUi`; every text in it is made with `settingText()`, which also remembers `[node, key, params]` in `settingsUi.texts`, so `translateSettings()` can set all of them again in place when the language changes (the pop-up is not rebuilt, so the Language toggle keeps its focus and its slide plays). Every setter (`setTheme`, `setHalloween`, `setMuted`, `setSameDuration`) ends with `refreshSettings()`, which sets the open controls from the real values (the selected theme button and whether the three are disabled, the Theme help text, the Trick or Treat switch, the Sound switch = not muted, the duration switch), so a change made anywhere shows everywhere. **To add a setting:** (1) add its name text and help text to **both** languages of `I18N`; (2) in `openSettings()` add a row made with `settingSwitch(texts, id, nameKey, helpKey, helpParams, onChange)`, put its input into the `settingsUi` object and its row into the `.settings` list; (3) write a setter like `setSmartBoard()` that sets `state`, saves to `localStorage` under a new `lg-` key when `save` is true, and ends with `refreshSettings()`; (4) add one line to `refreshSettings()`; (5) load the saved value when the page starts (same duration and SmartBoard mode do it in `initMenus()`, theme in `initTheme()`, language in `initLanguage()`, sound where the `sound` object is created); (6) update every list of settings (see the file map, E). The SmartBoard row follows the same pattern: `setSmartBoard()` saves `lg-smartboard` and `refreshSettings()` sets its switch from `state.smartBoard`; while `state.screen === "quiz"` the switch is disabled and a note "You can change this between quizzes." is shown (the top bar is hidden on the quiz screen anyway, so this is a safety guard).
- **Storage**: `loadPref` / `savePref` wrap `localStorage` in try/catch; if storage is blocked (private mode, `data:` previews) the game still works and simply doesn't remember.
- **Correct animation**: `submitAnswer()` adds `.pop` to every `.is-correct` element in the question when the answer is correct.
- **Confetti** (`launchConfetti`, `stopConfetti`): `<canvas>` overlay drawn with `requestAnimationFrame` in the five level colors (read from CSS `--lvl-*`). Triggered at the end of `showResults()` when the final score ≥ `CONFETTI_MIN_SCORE` (80), or ≥ `CONFETTI_MIN_MATCH_SCORE` (75) for Matching. Removed after `CONFETTI_MS` or by `showScreen()`.
- **Reduced motion**: `prefersReducedMotion()` skips confetti and the Halloween walker (`startWalker()` marks it done and never draws it); CSS disables all animations/transitions under `prefers-reduced-motion: reduce`.

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

Real example (Fill, Very Hard): `{ "type": "fill", "before": "\"What", "after": "to your arm?\" \"I fell off my bike.\"", "answer": "happened", "bank": ["happened", "hoped", "missed", "believed"], "target": "happen", "explanation": "…" }`. All real questions are in the theme files of `game/data/questions/`; copy their style.

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
  - **Close to the answer** and **strictly closer to the answer than to every wrong bank word** → **misspelled**: half points (`+6.25`), **no penalty**, and a spelling warning, e.g. *Check your spelling: "coffee", not "cofee".* "Close" applies only to answers longer than `SPELL_EXACT_MAX_LENGTH` (3) letters (**answers of 1 to 3 letters such as *hi, oh, hey, one, six, ten* must be exact**, otherwise they are incorrect: one wrong letter often makes another real word, like *he* for *hey* or *fine* for *five*). "Close" = at most `SPELL_MAX_EDITS_SHORT` (1) different letter for answers of up to `SPELL_SHORT_MAX_LENGTH` (5) letters, at most `SPELL_MAX_EDITS_LONG` (2) for longer answers.
  - **Anything else** → incorrect (`−6`).
- Results show what the student typed, the correct word, and the spelling warning ("Note").
### SmartBoard Fill in the Blanks

When `state.smartBoard` is on, `renderQuestion()` uses `renderFillTap()` instead of `renderFill()` for `fill` questions (same stored questions, same bank, same timer). The bank words are buttons (`.chip`) and the blank is a button (`.blank-slot`): **one tap on a bank word puts it straight into the blank** (owner's change, 2026-11-01: tapping the only blank first felt redundant); tapping another bank word replaces the word in the blank; tapping the word in the blank (or the faded word in the bank) takes it back out. Check is enabled once a word is placed. The word is judged by exact match with `answer`: correct = +`POINTS_CORRECT`, wrong = -`POINTS_INCORRECT` (no misspelled case, so no "Almost!"). Instruction text: "Tap a word to put it in the blank." The typed version is unchanged when the mode is off. Note for teachers: typed Fill at Very Hard is the spelling test; SmartBoard mode skips it.


### Matching

- Matching quizzes have a **variable length** (all questions of the bank entry, at least `MATCH_MIN_QUESTIONS`).
- `rightOrder` is the shuffled display order of right items; correct pairing is `left i ↔ right i`.
- Paired items show the same number badge (`data-pair`, rendered via CSS `::after`). On phones the badge sits on the box's top-right corner and the word column is only as wide as its longest word, so long meanings stay readable (DESIGN.md, "Matching").

## Content (questions)

**Written so far:** A1 Vocabulary, Greetings and Feelings (pilot theme, plan approved 2026-10-31): all 16 quizzes (4 question types × 4 difficulties), with glossary entries for all 34 words of the theme. **Numbers and Amounts** (topic index 1; plan approved 2026-11-01): all 16 quizzes are written (Multiple Choice, Fill in the Blanks and True or False with 8 questions each, Matching with 2 questions; 104 questions, owner-reviewed). Its glossary has meanings for all 41 words (digits are used in the meanings of number words, approved by the owner 2026-11-01). Matching meanings mix real situations, digits in a real place (page 15, room 18), order ("the number after 89") and three sums for the big numbers (sixteen, thousand, million), which the owner approved on 2026-11-01 because the A1 list has no real-life word for them. Everything else is still lorem.

- **Question bank:** one file per theme in `game/data/questions/`, named level, category, topic number and topic name in lower case (for example `a1-vocabulary-00-greetings-and-feelings.js`), each one a single call `Object.assign(GAME_DATA.questions, { ...JSON... });`. `data/start.js` creates the two empty lists (`GAME_DATA.questions` and `GAME_DATA.glossary`), the page loads the data files with script tags before the code files, and `js/topics.js` reads the lists into the constants `QUESTION_BANK` and `GLOSSARY` (a broken file stops the whole script, which the play-through test and the check script catch). The part inside the call is JSON, not a JS object, so the check script can read it. **To add a theme:** add its file, its script tag in `game/index.html` and its row in the Data file table of the file map.
- **Glossary:** one file per level in `game/data/glossary/` (for example `a1.js`), written as `Object.assign(GAME_DATA.glossary, { ... });` with the JSON inside. Shape: `{ "A1": { "banana": { "type": "noun", "meaning": "a long yellow fruit" }, "drink": [ { "type": "noun", "meaning": "…" }, { "type": "verb", "meaning": "…" } ] } }`, keys in lower case. **One entry per tested word per level**, written once and reused in every quiz, so a word always has the same meanings. An entry is one sense (object) or, when the word has several word types at that level, a list with **one sense per word type**.
- **Which type a quiz uses:** when a tested word has more than one word type in the glossary, its question says which one it uses: `targetType` on Multiple Choice / Fill in the Blanks / True or False questions, `type` on a Matching pair (e.g. `{ "left": "drink", "right": "…", "type": "verb" }`). The pop-up underlines that type.
- **Key:** `level|category|topicIndex|type|difficulty` (e.g. `A1|vocabulary|0|mc|easy`); difficulty ids: `easy`, `medium`, `hard`, `veryhard`. Each difficulty has its own questions.
- `getQuestions(nav)`: Multiple Choice, Fill and True or False need at least 8 questions (the first 8 are used); Matching uses all of its questions (at least 2). Otherwise `generateLoremQuestions(nav)` creates placeholders in the same stored shapes (lorem Matching: 2–4 questions; lorem True or False: 4 true, 4 false).
- Lorem questions use a seeded RNG (`hashString` + `mulberry32`) keyed by the quiz key, so the same quiz always produces the same questions (Retry repeats the exact quiz).

### Check script

`.gitignore/tools/check_questions.ps1` is a **private helper** (PowerShell; it reads the private word lists and plans). It does three things: it **checks** questions for mistakes by fixed rules; it **prepares a reader** (`-Worksheet`, `-Checks`); and it **joins a draft to the real bank**, so a draft can be checked before anything goes into the data files. It never changes a file and never writes questions. **Its report is evidence, never approval:** every report ends by saying that a reader must still review (AGENTS.md rule 9; "Review checklist"). Its self-tests are `.gitignore/tools/test_check_questions.ps1`. Both are private and are never uploaded.

#### Commands

Run them from the project folder. Every command starts with `powershell -ExecutionPolicy Bypass -File .gitignore/tools/check_questions.ps1`; only the options are shown here.

- *(no option)*: checks the whole bank. The report is **quiet**: only quizzes with a finding are listed, then a summary and the reminder that a reader is still needed.
- `-All`: lists every checked quiz, also the clean ones (the old, long report format).
- `-Only 'A1|vocabulary|2'`: checks only the quiz keys that start with this text. It is much faster. Use a **whole theme** (the first three parts of a key) when you need checks 12, 22 and 25, because they compare the quizzes of one theme.
- `-Draft draft.json` (and `-DraftGlossary glossary.json`): a draft **joined** to the real bank and glossary (the same keys are replaced). Without `-Only`, the whole themes the draft touches are checked. A draft quiz with no finding is named at the end, so you know it was checked.
- `-Worksheet -Only '<key start>'` or `-Worksheet -Draft draft.json`: prints **pages for a reader**: each Multiple Choice sentence with every option in the blank, each Fill sentence with every bank word, each Matching meaning with the words to rule out, the word types from the word list, and the glossary meanings (the word type the question uses is marked with `*`). It gives **no verdict**.
- `-Checks`: prints the numbered checks, and for each section of the Review checklist what the script helps with and what only a reader can do. The script is the single source of this list.
- `-ShowLevel A1`: shows how `ORG_A1_WORDS.md` is read (see "Building an organized word file for a level").
- `-BankFile sample.json` and `-GlossaryFile glossary.json`: **replace** the real data. Use them only to test the script itself (or a sample bank for a new level); for drafts use `-Draft`.
- `-PlanDir` and `-WordsDir`: where the plan files and the word files are (default: the private `.gitignore/plans/` and `.gitignore/words/` drawers).
- `-Html`: the page to check (default: `game/index.html`, or `index.html` in the old layout). The real questions and the glossary are read from the `data/questions/` and `data/glossary/` files next to that page (joined in file name order); in the old layout they were the two JSON blocks inside the page, and the script still reads them when there are no data files. The `CONFIG` numbers and the topic names are read from the page and the `js/` files next to it, wherever they are written. A data file that is not valid JSON, or has no `Object.assign(GAME_DATA...)` call, is reported as an error.

**Exit code:** 0 = no errors, 1 = errors found. Warnings never change it.

#### Reading the report

- **ERROR** must be fixed. **warning** must be read as a teacher: fix it, or explain to the owner why it stays. Nothing is hidden: the summary line counts both.
- The first line is the summary: `Question check: 32 quizzes, 0 errors, 16 warnings`. When only some quizzes were checked it says so, for example `16 quizzes (of 32 in the bank; only keys that start with 'A1|vocabulary|1')`.
- Each finding is written `[check number] where - message`, under the quiz key it belongs to. A quiz from a draft is marked `[draft]` (also in the headers of the checks that compare quizzes, such as 26), so you can tell your draft from the version already in the bank.
- A draft run checks the **whole theme** the draft belongs to, so it also shows the theme's old known warnings (see "Known warnings"). Look first at the lines under a `[draft]` header, and at the line "Draft quizzes checked, no finding".
- The last lines are the **reminder**. They are always there. "0 errors" means only that the mechanical checks passed.

#### The checks

`-Checks` prints the live list; this is the same list with the reasons. 24 checks (numbered 1-26; checks 16 and 19 moved to the review, see below): **A. Structure** (1 valid key, 2 question count / plan's Matching count, 3 fields (a `target` must be a form of the answer), 4 shapes, 5 True or False 4/4, 6 explanation 1–3 sentences); **B. Word rules** (7 every word in the lists or a normal form or a name, unknown forms listed for a hand check, 8 tested words only from the quiz's category or Both, and never written in digits, 9 exception words only in their own grammar topic, 10 no British spellings, 24 an ordinal written in digits has the right ending: 1st, 2nd, 3rd, 4th, 11th-13th, 21st); **C. Plan match** (11 targets = the approved plan, 12 no target twice in a quiz and every planned word tested); **D. Never ambiguous** (13 Multiple Choice options share a word type with the answer, 14 no wrong Fill bank word within the spelling tolerance of the answer (error) or 2 letters or fewer away from it (warning; `$WARN_FILL_DISTANCE`), 15 the answer not already in the sentence, 17 no duplicate or near-duplicate questions); **E. Variety** (18 not more than 2 questions starting with the same two words, 20 a name or city in at most 2 questions per quiz (*Anna's* counts as *Anna*), 21 each A1 sentence at most about 12 words (a prompt may have several sentences), 22 no sentence reused in another quiz of the theme); **E2. Balance (owner's request, 2026-11-01)** (25 coverage: once all 4 quizzes of a difficulty exist, the most tested word is tested at most 1 time more than the least tested word; 26 options: in one Multiple Choice or Fill quiz no word is a wrong option in more than 3 questions, and no two questions have exactly the same options; both are warnings with the limits `$COVERAGE_MAX_GAP` and `$MAX_WRONG_PER_QUIZ` at the top of the script); **F. Glossary** (23 every tested word has a glossary entry with one sense per word type of its level, no other types; a word with several senses has `targetType` / pair `type` naming one of them; meanings use words of the level, American spelling, and don't contain the word itself).

- **Moved to the review:** check 16 (a Matching meaning contains one of its 4 words, except on purpose at Very Hard) and check 19 (the same sentence frame used again and again) are judged better by an AI reviewer than by a script, so they are in the Review checklist (sections 5 and 9), not in the script. The other check numbers did not change. The worksheet shows a Matching meaning that contains one of its words, as a help for the reader.
- **What no script can check** (the reader's job): that only one option is right, that the English is natural and at the level, that the content suits learners, the difficulty, whether an explanation teaches. `-Checks` lists this per section.
- **Inflected words:** a word is read both as written and as a form of another word (*thanks* = the noun / exclamation, or *thank* + s). Check 13 passes an option if any reading has the answer's word type. Curly and straight apostrophes are the same (*o’clock* = *o'clock*).
- A word written the same in two categories (*like*: "like (similar)" is Grammar, "like (find sb/sth pleasant)" is Both) counts as both, so check 8 accepts it in either.
- **Digits** (decided 2026-11-01, see "Rules for A1 questions"): a number written in digits is one word for the script (`12`, `3rd`, `10:30`, `1,000`, `555-0123`). It is never an "unknown word", it counts in the sentence length (check 21) and in the duplicate and pattern checks (so "Tom is 12" and "Tom is 13" are different questions), a hyphenated number (*twenty-one*) is split into its parts, and a times sign `x` between numbers is ignored. Digits in the tested part are an error (check 8), and a wrong ordinal ending (*2th*, *13rd*) is an error (check 24). The script cannot check arithmetic or whether a number fits the situation: that is for the review.
- Its name list, irregular forms and British spellings are lists at the top of the script; extend them when needed (e.g. add a missing irregular past form such as *broke = break*). The script is a checker, not an authority: when it flags something that is correct English, fix the script and tell the owner, as happened with *like* and with names such as *Lisa's*. **Never weaken a check just to make a question pass**; if a check finds a real mistake, fix the question.

#### Writing questions with it (the tools inside "Workflow: draft → review → write")

1. **Read a small working set**, not the whole README and word list. Writing questions is a **change task**, so also read "Confirmed decisions" and the "Change together" row of the map. Then: the theme's section of the approved plan (`.gitignore/plans/PLAN_<LEVEL>_<CATEGORY>.md`, for example `PLAN_A1_VOCABULARY.md`), its lines in `ORG_<LEVEL>_WORDS.md` (words, "goes well with", word types), the glossary entries that already exist (`-Worksheet -Only '<theme key>'` prints them for written quizzes), and the rules you need from "Question content method".
2. **Write the draft in a draft file** in the private folder `.gitignore/drafts/` (for example `A1_vocabulary_2_mc.json`), in the same shape as the bank: `{ "A1|vocabulary|2|mc|easy": [ ...8 questions... ], ... }`. New glossary meanings go in a second file (`{ "A1": { "word": ... } }`). Drafts are never committed, and nothing goes into the data files yet.
3. **Check the draft:** `-Draft <file> -DraftGlossary <file>`. Fix every error, read every warning. Repeat until clean.
4. **Show the owner a readable draft** (not JSON): each question, its options, the answer, the explanation and any new meanings. Remind the owner to ask for the review.
5. **Review by reading:** run `-Worksheet -Draft <file>` and go through the Review checklist, item by item. For every hard item, **quote the sentence or option you checked** in your report; a tick without a quote is not a review.6. **Only after the owner's go-ahead,** add the quizzes to the theme file in `game/data/questions/` (and the glossary meanings to the level file in `game/data/glossary/`) with small, exact edits (each question is one line; each quiz starts at its key line), then run the full check with no options, and play the quizzes in the browser.

#### What the script depends on

- **The bank:** the files of `game/data/questions/` (joined in file name order); each key `level|category|topicIndex|type|difficulty`; the glossary files of `game/data/glossary/`. With `-Html`, the data folder next to that page is read. Topic names come from the `TOPICS_BY_SECTION` lists in `game/js/topics.js`, found by searching for text like `'A1|vocabulary': [` with one quoted name per line ending in a comma. Do not write that text anywhere else in the game files. The `CONFIG` numbers it reads are in `game/js/config.js`.
- **`CONFIG` numbers it reads** (so the script and the game cannot silently disagree): `SPELL_EXACT_MAX_LENGTH`, `SPELL_SHORT_MAX_LENGTH`, `SPELL_MAX_EDITS_SHORT`, `SPELL_MAX_EDITS_LONG`, `QUESTIONS_PER_QUIZ`, `MC_OPTIONS`, `MATCH_PAIRS`, `MATCH_MIN_QUESTIONS`, `FILL_BANK_MIN`, `FILL_BANK_MAX`. If one of them is renamed or removed, the script falls back to its own default, so **change the script in the same change**.
- **The word files and the plans:** it reads the organized word files `ORG_<LEVEL>_WORDS.md` (the quiz's level and all lower levels) and the target-word plans `PLAN_<LEVEL>_<CATEGORY>.md` (or the folder given with `-PlanDir`); the headings and line formats are in "Building an organized word file for a level" and "Target-word plans".
- **Show how a word file is read:** `-ShowLevel A1` prints how the script reads `ORG_A1_WORDS.md` (word counts per category, the themes and topics with their word counts, the exception words) and stops with `Result: OK.` or a list of problems. A1 shows 899 rows for the 901 entries because the script counts unique words (*second* has two entries, *like* has two, and each counts once). Use it for every new organized word file.

#### Known warnings

- **Expected result now:** 0 errors and 16 warnings: 12 are check 26 in the finished Greetings and Feelings quizzes, and 4 are check 14 in the Numbers and Amounts Fill quizzes (*forty / fifty / sixty* are 2 letters apart on purpose). (Check 14 now warns only when a wrong bank word is 2 letters or fewer away from the answer, because a one-letter typo can reach it; farther pairs like *boring / bored* no longer warn, so the six old check 14 warnings are gone.) The 12 check 26 warnings are in Greetings and Feelings (for example *hello* and *please* are wrong options in 5 of 8 Easy Multiple Choice questions, and several Fill questions have identical banks). They were found when the check was added; the owner has not decided yet whether to change those questions. Any other warning or error after a change must be read and fixed or explained to the owner. When the owner decides, update this paragraph and the Testing section.

#### Changing the script (AGENTS.md rule 13)

1. **Save the current report first:** `... -All | Set-Content before.txt` in a scratch folder (not in the project).
2. **Make the change.** A new check takes the next free number (never 16 or 19, which stay with the reader). Add it to `$CHECK_NAMES` and to the right line of `$REVIEW_MAP` in the script, so `-Checks` stays true. Decide error or warning: an error is a rule that has no exceptions.
3. **Add a test** for it in `test_check_questions.ps1`: a copy of a real quiz, broken in one way, that must give the new check number.
4. **Compare the reports:** `... -All | Set-Content after.txt`. They must be the same except for what you meant to change. If the real bank's report changes, say exactly what and why.
5. **Run the self-tests:** `powershell -ExecutionPolicy Bypass -File .gitignore/tools/test_check_questions.ps1`. Every test must say PASS.
6. **Update this guide** (commands, the checks, the expected result), the script's header, "Testing", and the file map (rule 12), and tell the owner.

Rules for editing the file: keep it pure ASCII (Windows PowerShell 5.1 misreads non-ASCII characters in a script saved without a BOM, so "·", "—" and the curly quotes are written as character codes, `[char]0x00B7` and so on). A function that can return a single item must be called as `@(Get-Something)`; without `@()`, PowerShell turns a one-item list into the item itself, and the script then reads the first LETTER of a word (this once made *includes* look like the pronoun *I*, and silently skipped checks on forms like *laughs*).

#### Troubleshooting

- **"Variable reference is not valid" or similar parse errors:** in a double-quoted string write `"${name}:"`, not `"$name:"` (PowerShell reads `$name:` as a drive).
- **Odd matches of letters on this computer:** Windows here uses Turkish settings. A case-insensitive pattern (`-match`) can treat `i` and `I` specially, and a pattern like `[^\x00-\x7F]` can match ordinary letters. Use `-cmatch` or `ToLowerInvariant()` when letters matter.
- **A table with number keys gives wrong rows:** an ordered table with numbers as keys is read by position; use a list of pairs.
- **It is slow:** it takes about 9 seconds for 32 quizzes, so the whole bank would take minutes later. Use `-Only` with a theme.
- **"not valid JSON":** a missing comma or an unescaped quote in the bank or in a draft; the message shows where PowerShell stopped.
- **"no ORG_<LEVEL>_WORDS.md found: word checks skipped":** the word file for that level is missing or misnamed.

### A1 word lists

Both files are in the private `.gitignore/` folder, which is never uploaded to GitHub (see AGENTS.md rule 8). For A1 questions, read **only `ORG_A1_WORDS.md`**.

- **`.gitignore/words/A1_WORDS.md`**: the original list of every word considered A1 (901 entries), from a trusted source, with its A1 word types and its higher-level uses. **Never change this file.** `A1_WORDS.md` should be read only when you work on creating a file in the same format as `ORG_A1_WORDS.md` (for example for another level), just to understand how the original word file is turned into a useful file for AI, or when the owner asks you to. Everything in it is already in `ORG_A1_WORDS.md`.
- **`.gitignore/words/ORG_A1_WORDS.md`**: the file to use for all A1 work. It holds the full A1 list with word types ("A1 word types (full list)" at the end) and splits the words into three categories, each word in exactly one category (but possibly in several vocabulary themes or grammar topics inside it):
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
- **Then extend the script's lists** (at the top of `check_questions.ps1`) if the new level needs it: `$MAX_WORDS` (longest sentence; only A1 is decided, so ask the owner), `$NAMES`, `$BRITISH`, `$IRREGULAR` (add a missing irregular form instead of weakening a check). Add the level's theme and topic names to `TOPICS_BY_SECTION` in `game/js/topics.js`, because the script reads topic names from there. Target-word plans are read from `PLAN_<LEVEL>_<CATEGORY>.md`.
- **Test before real questions:** run the script on a small sample bank (`-BankFile sample.json`, which replaces the real bank, or `-Draft`) for the new level and read every warning, as was done for A1.

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
- **Roughly equal coverage** (owner's rule, 2026-11-01): once all four quizzes of a difficulty exist, the most tested word is tested at most **1 time more** than the least tested word (check 25). Count how often each word is tested **in the plan first**, then in the written questions.
- **Fair wrong options** (owner's rule, 2026-11-01): in one Multiple Choice or Fill quiz, no word is a wrong option in more than **3 questions**, and no two questions have exactly the same options (check 26). Otherwise a student can learn that a word is never right (in the first Numbers draft, *ten* was a wrong option in 6 of 8 Easy questions and never the answer). Spread the wrong options across the quiz's own words, and use a word as the answer in one quiz before using it often as a wrong option. A word that grammar rules out (for example *one* before a plural noun) cannot be a wrong option there.

### Target-word plans

A **target-word plan** is a planning sheet for one vocabulary theme, written **before** any of its questions: it decides which words each quiz tests, like a teacher's scheme of work for a unit. Questions are written only after the owner approves the theme's plan.

**File.** One file per level and category in the private `.gitignore/` folder (e.g. `.gitignore/plans/PLAN_A1_VOCABULARY.md`), never uploaded. It has one section per vocabulary theme, in the game's order. Plans are added theme by theme; a theme without a section has no plan yet.

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
- **Explanations** are in English and short: **one to three sentences**, only as long as needed to make the answer clear. Use only words of that level (and lower levels): the checklist item "Every word is in the level's list" covers explanations too.
  - **When a clear explanation seems to need a word above the level** (owner agreed, 2026-11-01): first rewrite it with simpler words or give a short example instead of a rule; then, at A2 and above, use words of lower levels; if it is still not possible, do not use the word quietly: ask the owner.
  - **Grammar words in explanations** (owner's direction, 2026-11-01, details to confirm when A2 starts): the main rule stays: explanations use the words of the level. Grammar words are a small exception, used rarely and only when an explanation really needs one, never as a habit or to make writing easier (owner, 2026-11-01). None at A1 (an absolute beginner may not know *noun* or *verb*); from A2 simple ones (*noun, verb, adjective*) can be used; harder ones later (suggested: B1). Quoted word endings such as "-teen" are fine at A1. The "Words in this game" pop-up keeps its small word type labels at every level, including A1 (owner's decision, 2026-11-01), because they show which meaning is used.
- **Names**: a small, international set of first names (e.g. Anna, Tom, Ali, Maria, Ken) and well-known cities (e.g. London, Paris, Tokyo, New York), so names never distract from the tested word.
- **Correct answer positions are balanced** (Multiple Choice): in each quiz, the correct answer is in each of the 4 positions **exactly twice**, and never in the same position more than **twice in a row**. The game does this when it shuffles the options; Retry shows the same order again.
- **Script check of every quiz** when questions are added (not by eye): the target words match the approved target-word plan; no answer word appears twice in the same quiz; no two questions are copies of each other; True or False has 4 true and 4 false; every word is allowed by the word-list rules.
- **One vocabulary theme at a time.** Start with a pilot theme (plan, then its 16 quizzes), let the owner try it in the game, adjust this method if needed, then continue theme by theme. The pilot (Greetings and Feelings, topic index 0) is done; continue with the next theme in the game's order (Numbers and Amounts, index 1).

### Next theme, step by step

1. **Read** AGENTS.md and the File map, then the sections it points to for question work (especially "Question content method" and the "Review checklist"); DESIGN.md only if visible text changes. Read the theme's **Words** and **Goes well with** lines and the word types of its words in `.gitignore/words/ORG_A1_WORDS.md` (only that theme's lines).
2. **Target-word plan** ("How to make a plan"): draft it, show it to the owner, change it on request, then save it in `.gitignore/plans/PLAN_A1_VOCABULARY.md` with "Status: approved by the owner (date)". Copy the format of the Greetings and Feelings section there. If the theme has a note in "Theme notes", copy it into the plan as a `Notes:` line.
3. **One question type at a time** (Multiple Choice, then Fill in the Blanks, True or False, Matching), each with all 4 difficulties, following "Workflow: draft → review → write": draft file in `.gitignore/drafts/` and the script on it → a readable draft in the chat → remind the owner to ask for a review → review with the worksheet and the checklist (quote evidence) → write only on the owner's go-ahead.
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

1. **Draft.** Write the quiz(zes) as a draft file in the private folder `.gitignore/drafts/` (never in the game files), with explanations, and any new glossary meanings in a glossary draft. Run the check script on it (`-Draft` and `-DraftGlossary`, see "Check script"), fix every error and read every warning, so that the owner is not shown mechanical mistakes. Do not change any project file.
2. **Show the owner a readable draft** in the chat (each question, its options, the answer, the explanation and the new meanings) and **remind the owner** to ask for a review before anything is written, for example: *"Before I add these, please ask me to review them against the review checklist."*
3. **Review** (a separate step, when the owner asks): run `-Worksheet -Draft <file>` and go through the "Review checklist" below, question by question, then the quiz as a whole. **Quote the sentence or option you checked for every hard item**; a script result is evidence, never approval. A cold reviewer (a second AI that has not seen the writing) is recommended for each theme. Report every change and why (a table of "problem → new version" works well), and list what was kept and why.
4. **Write** only when the owner says so, with small exact edits to the theme file in `game/data/questions/` (and, for the glossary, the level file in `game/data/glossary/`). Then run the check script with no options, fix what it finds (report each fix), and play the quizzes in the browser.

### Review checklist

Use this the way an experienced English teacher checks coursebook material, and the way an editor checks an AI writer. **Go through every item for every question; don't trust a first impression.** A question that seems fine at a glance is exactly where mistakes hide. It is built from the problems found while reviewing the pilot theme (Greetings and Feelings), and it adds the mistakes language models typically make.

**How to review**
- Review in a **separate step** from writing. Read every question **as a student of that level would**: someone who knows only the level's words, reads literally, and looks for another possible answer.
- Check **each question alone** first, then **the quiz as a whole**, then **the theme as a whole** (all question types and difficulties).
- **Look words up; never check from memory.** Every doubtful word goes against `ORG_<LEVEL>_WORDS.md` (word *and* word type). Models often "feel sure" a word is A1 when it isn't.
- **Fix by rewriting the context**, not by adding more words. A question that needs a long explanation to be fair is a bad question.
- **Use the worksheet, and show your evidence.** `-Worksheet` (see "Check script") prints each sentence with every option in the blank, each Matching meaning against all four words, and the word-list facts, so reading is easy. For every hard item write down the sentence or option you checked (for example: "Q3, option C in the blank: 'Anna feels tired' also fits"). A tick without a quote is not a review. **A script result (even "0 errors") is evidence, never approval**: the script cannot judge whether only one option is right, whether the English is natural, or the difficulty.

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
  - [ ] **Fair wrong options:** no word is a wrong option in more than 3 questions of the quiz, and no two questions have the same options. Count them; do not trust a first impression (check 26).
  - [ ] When the answer is not in its dictionary form (*laughs*, *Hello*), the question has `"target"` with the dictionary form, and `targetType` when the word has several types.
- **Fill in the Blanks (typed)**
  - [ ] The answer is **exactly a bank word** in the same form as the sentence needs (*happened* in the bank, not *happen*).
  - [ ] Bank: Easy / Medium 3 words, Hard / Very Hard 4 words; all the same word type and form; none fits the blank.
  - [ ] **No wrong bank word within 1–2 letters of the answer** (*hey / bye*, *angry / hungry*): a typo could land between them. Planned pairs at Very Hard (*boring / bored*) are fine.
  - [ ] Very short answers (1–3 letters: *hi, oh, one, six*) must be typed exactly, with no misspelling credit (decided 2026-11-01). It is fine to use them, but remember that a typo scores as wrong. Prefer a longer answer when you can choose.
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
- [ ] **Roughly equal coverage of the theme's words:** in each difficulty, every word is tested about equally often across the four question types (at most 1 time more than the least tested word), and every word appears in the pop-up list of at least one quiz. Compare with the plan's "Times tested" line (check 25).

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
- Then wait for the owner's go-ahead (see "Workflow" above). After writing: run the check script (no options) and read **every warning** as a teacher; play the quizzes in the browser.
- A review report lists, for each hard item, the checklist section, the **quoted** sentence or option, and what you found (fine, changed, or asked the owner).

### Open questions (ask the owner; do not decide)

1. **Grammar topics**: their content method is decided when grammar content starts.
2. **Spelling tolerance for very short answers: decided (owner, 2026-11-01).** Answers of 1 to 3 letters must be typed exactly (`SPELL_EXACT_MAX_LENGTH` = 3); longer answers keep the old rule (1 wrong letter up to 5 letters, 2 above). Seen in the pilot: typing *he* for *hey* got half points; this is now incorrect. The check script follows the same number.
3. **Matching meaning vs pop-up meaning:** the Review checklist asks for a Matching meaning that is not identical to the pop-up meaning, so Matching does not only test memory of the pop-up. The owner noted (2026-11-01) that seeing the same wording again can help students memorize, and chose to keep the rule as it is. The middle path discussed: the same wording is fine at Easy and Medium, a fresh wording is preferred at Hard and Very Hard. Revisit if the owner wants.

### Code changes for real questions: done

All built and tested with lorem questions (see the sections above for how each works):
1. Difficulty in the quiz key ("Content (questions)").
2. Variable-length Matching quizzes ("Question types" → "Matching").
3. Matching confetti at a final score ≥ 75 (`CONFETTI_MIN_MATCH_SCORE`).
4. Matching points with partial points and no penalty ("Scoring algorithm").
5. Typed Fill in the Blanks ("Typed Fill in the Blanks").
6. Balanced shuffling of Multiple Choice options ("Question types" → "Mindful shuffling").
7. Check script ("Content (questions)" → "Check script").

**Owner's test (done 2026-11-01):** the owner tried typed Fill in the Blanks at **Very Hard** (20 s per question). It was okay; nothing to change so far.

## Confirmed decisions

- 5 levels, 2 categories, topics per section (A1 Vocabulary: 15 vocabulary themes; A1 Grammar: 21 grammar topics; others: 10 placeholders), 4 question types, 4 difficulties, 8 questions per quiz (Matching: 2–4).
- Timers: 60/45/30/20 s; switch ON → 60 s for all.
- Next button after feedback; no auto-advance; skip only from the time-out modal.
- Fill in the blanks: 1 blank, 3–4 word bank above the sentence, the student **types** the word, Check button (half points and a spelling warning for a misspelling, no penalty).
- Matching: click left then right, 4 pairs, Check after all pairs. Variable length (2–4 questions at A1), points = 100 ÷ number of questions with partial points per correct pair and no penalty, extra time −10, confetti at a final score ≥ 75.
- Each difficulty has its own questions; Multiple Choice answer positions are balanced.
- Quiz Back = quit with confirmation.
- Menu buttons that lead to a part without real questions are grayed (with a "Not finished" tag) and ask "Go back / Go there" before they open it; only the first such button on a path is gray; Next exercise asks when it leads from a finished part into an unfinished one (owner, 2026-11-02).
- Credits on all screens except the quiz screen.
- Trick or Treat (owner, 2026-11-03): a Settings switch, off by default, that turns the whole game into a black and orange Halloween theme (AMOLED black, one orange, thin orange lines, a ghost in the top bar corner). It replaces Auto / Light / Dark while on (they are grayed out with a note). One orange for every level; no level colors in this theme. A hooded figure with a lantern walks across the bottom **once per visit** a few seconds after the page opens (or after Settings closes, when the switch was turned on there), drags a skeleton, stops to look back, and sinks into the ground if a quiz starts; it never repeats and never cuts or lags when menus change.
- Quizzes of a level may use the words of all lower levels (e.g. A2 quizzes may use A1 words).
- Questions follow the "Question content method" (never ambiguous; target words split by difficulty, at least 8 per difficulty; expected progression; wrong options of the same word type, more similar at higher levels and difficulties; variable-length Matching; planned, smooth overlap; approved target-word plan first).
- From the pilot (2026-10-31 / 11-01): difficulty split by "Frequency + teaching"; Fill banks of 3 (Easy, Medium) and 4 (Hard, Very Hard); synonyms never together; capitalized options when the blank starts a sentence; `target` for answers not in dictionary form; every question is drafted, reviewed with the "Review checklist" and written only on the owner's go-ahead (AGENTS.md rule 9).

## Testing

AGENTS.md rule 6 lists what to check before handing over. Practical notes from building the Settings menu, Next exercise and the menu tree:
- **Saved settings need a real web address.** A preview of the file (a `data:` address, or a file shown as a snapshot) blocks `localStorage`, so language, theme, sound, same-duration and SmartBoard mode cannot be tested there. Start the private test server with `powershell -ExecutionPolicy Bypass -File .gitignore/tools/serve_test.ps1` (it serves the game folder, `game/`, at `http://localhost:8766/`; the older `serve.ps1`, which served only an `index.html` in the project folder, is retired and kept in `.gitignore/archive/`), open that address, and stop the server when done (Ctrl+C, or end its PowerShell process). Clear the test storage afterwards (`localStorage.clear()` in the console). The server never serves a cached page, so a reload always shows the latest `index.html`. If it says the port is busy, an old server is still running: stop it (below) or start another with `-Port 8767` (then open that port). If it was started hidden (for example by an assistant), stop it with `Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Where-Object { $_.CommandLine -like '*serve_test.ps1*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }`. The tool is private (in `.gitignore/tools/`) and only for testing; players never need it.
- **Play-through test** (built 2026-11-02, step 0 of the folder split plan): `powershell -ExecutionPolicy Bypass -File .gitignore/tools/serve_test.ps1` serves the project folder (or another one with `-Root <folder>`) at `http://localhost:8766/` and, when the address ends in `?playtest`, adds the test (`.gitignore/tools/playthrough.js`) to the page; the files on disk are never changed. About 6 seconds after the page loads, `window.__playtest.summary` holds the result; the expected result today is **382 passed, 0 failed**, with no errors in the browser console. It plays Multiple Choice, True or False, typed and tapped Fill in the Blanks and Matching (right, wrong and misspelled answers) on real and placeholder quizzes, and checks the scores, the timer, time-out, extra time, game over, Quit, Next exercise, the language and theme switches, same duration, Settings, Credits, the menu tree and the menu buttons, the gray "not finished" buttons with their pop-up (in the menus and in Next exercise), and the Trick or Treat Halloween theme with its walker (switch, grayed Theme row, Turkish texts, one pass, menu changes, sinking when a quiz starts, no second pass). It uses only the game's global names, so it must work the same after the folder is split; run it before and after every split step. The test was checked on 2026-11-02 by breaking two things on purpose (a score and the extra-time penalty): it reported 10 failures. Stop the server like the first note above, with `'*serve_test.ps1*'` in the filter.
- **Checking a work folder** (a separate working copy of another branch; the split was made in `.gitignore/split-work/`, which is removed now): point the tools at it. `check_filemap.ps1 -Work <work>` (it finds the page, the css files and the notes there; the private files are still looked for in the main folder), `check_questions.ps1 -Html <work>\game\index.html`, and `serve_test.ps1 -Root <work>\game`. The self-tests (`test_check_questions.ps1`) always run from the main folder, because the private tools live only there.
- **Phone width:** use a 375px wide view (the preview's Mobile size) and reset it to desktop afterwards. Changing the size can reload the page, so set the state again.
- **Animations in previews:** the preview can run slower than a real browser, and a screenshot may catch a pop-up in the middle of its slide, so take a second screenshot before judging the final look. How smooth an animation feels can only be judged on a real device.
- **Reaching any screen quickly:** in the browser console, set `state.nav` and call `startQuiz()` or `showResults()` (with Trick or Treat on and the walker still on screen, `startQuiz()` first lets it sink and starts the quiz about 2.2 s later); the order of Next exercise can be tested with `getNextExercise(nav)` (all 1,856 quizzes are visited once, in order).
- Run the question check (`check_questions.ps1`) after any change to questions or to the script; the expected result is 0 errors and 16 known warnings (see "Check script", "Known warnings"). After changing the script itself, also run its self-tests (`test_check_questions.ps1`): every test must say PASS (see "Changing the script").
- Run the file map check (`check_filemap.ps1`) after any structural change (a banner, function, id, doc heading or file added, removed, renamed or moved); the expected result is 0 errors and 0 warnings (see "File map", F). It also reports function and constant names written in the docs that no longer exist in the code, so run it after editing docs that name code too. Its `-Lines` option prints the current line ranges.
- **Website check (every change must work in both ways: from the folder on a PC, offline, and on a website).** Before handing over any change to `game/`: (1) every link and path in the page and the files is relative and does not start with `/` (a site may live in a sub-address such as `ahmetkaans.github.io/my-game-project/`); (2) every file name in `game/` is lowercase and matches its script or link tag letter for letter (a PC ignores capital letters, a web server does not); (3) no `fetch`, no ES modules (`import`, `type="module"`), nothing that works only from a website or only from a folder; (4) no file or class names with `ad(s)`, `banner`, `sponsor`, `tracker` or `popup` (adblockers); (5) the only outside request is the Inter font; (6) the play-through test passes on the served folder (`serve_test.ps1`, a real web address) **and** the page opens by double-click from the folder (`file://`), with no console errors in either; (7) saved settings belong to the web address, so a new address starts fresh. **Publishing:** Cloudflare Pages: output folder `game`, no build command. GitHub Pages serves the repository root by default, so `game/` would need extra setup (a publish workflow or a different folder). `check_filemap.ps1` already checks lower case names of the code files and that the page loads every file; it does not check the other points, so read them yourself.

## Changelog

[CHANGELOG.md](CHANGELOG.md) lists every change in plain language, newest first, so friends and visitors can follow what was built. **With every commit, add one entry at the top:** its date, a short title and two or three simple sentences about what was added or changed (what a player or a reader would notice, not the code). Write the commit's short ID in brackets after the title; the commit that adds an entry cannot know its own ID, so the newest entry gets its ID in the next commit. Commit messages stay as they are (they list the details for developers).

## Roadmap

Planned work (not implemented yet). The owner rewrote this list on 2026-11-01. Ask the owner about every open question before building (AGENTS.md rules 1 and 4).

1. **Menu items and content.** The menu items are decided and filled with actual content one by one, over time (menus via `TOPICS_BY_SECTION`, questions via `QUESTION_BANK`, see "Content (questions)"). A1 Vocabulary and A1 Grammar menus are decided; the first filled theme is Greetings and Feelings. (The design is done: see [DESIGN.md](DESIGN.md), "Open design work".)
2. **AWL** (Academic Word List) will be a whole separate section of the game, apart from the levels (A1–C1). The levels' Vocabulary is not split; it keeps leading straight to its vocabulary themes.
3. **History** of the student's previous plays, with a summary of their performance.
4. **Overall performance.** The game calculates the student's overall performance from the played quizzes and shows a **comment** on it (several possible comments, one is chosen). It also gives **recommendations**: it analyses the scores to find the topics the student is good at and the ones they are weak at, and writes a short review of where they are strong and where they are weak.
5. **Reset button for history:** clears everything in the history except the performance calculation.
6. **Reset button for calculation:** clears everything in the calculation except the history.
7. **"Next exercise" button** (owner's request, 2026-11-01) on every results screen. **Built (2026-11-01)**, see "Screen flow".
8. **Credits:** Claude is on the Credits page, as the first name (built 2026-11-01).
9. **Settings button.** Everything that is a setting moves into one Settings menu. **Built (2026-11-01):** a pop-up opened by the gear button in the top corner (hidden on the quiz screen) with Theme (Auto / Light / Dark), Sound, the same-duration switch (also still on the Difficulty screen, synced and remembered) and a "Work in Progress" note, each with a short explanation. **Still to do:**
   - **SmartBoard mode.** Writing is hard on a smart board, so this setting replaces every activity that needs writing (today only typed Fill in the Blanks) with an easier **tap method**: the student taps a word in the bank and it goes into the blank straight away (one tap; first planned as tap-then-tap like Matching, changed by the owner on 2026-11-01 because there is only one blank); tapping the placed word takes it back out; then Check. Scoring has only correct or incorrect, because tapping has no "misspelled" case (decided by the owner, 2026-11-01). A short explanation of what it does is shown with the setting. (The earlier version of Fill in the Blanks was drag-and-drop, not tap-tap, and is gone from the code.) **Built (2026-11-01):** the switch is remembered (`lg-smartboard`) and turns Fill in the Blanks into the tap version (see "SmartBoard Fill in the Blanks"). The owner chose: one tap on a word puts it in the blank (first planned as tap word, then tap blank; changed 2026-11-01); same points as typed Fill (+12.5 / -6); the switch is locked during a quiz.
10. **Lesson-file maker (a separate project; not started).** An idea of the owner (rewritten 2026-11-03): a **compact, single HTML file** made from the pieces of this game, to adapt for **one lesson**. It has no levels, themes or menus; the question types are already written as code in it. A teacher gives the file and her lesson idea to any LLM, and the LLM turns the file into the activity she needs. It keeps the same look, with different code and logic than the game. A short note at the top of the file tells the LLM how to adapt it. AGENTS.md rule 2 (plain files in `game/`) covers the game; the new file is a whole separate thing, and its format and everything else are decided when it starts. With it come a small **README2.md** and **DESIGN2.md**, written as guides for people or LLMs to read before changing individual lesson files.
11. **Website** (owner's plan, 2026-11-01): publish the game online so anyone can play it from a link, on a computer or a phone, without downloading. Open questions: where to host it (for example GitHub Pages, which is free and works with this repository as it is, or the owner's own domain), the web address, and when (now, or after more content is ready). Saved progress (theme, sound, and later history and performance) is stored per website, so moving to another address later starts it fresh. Once it is online, put the link in the GitHub "About" section ("Website") and in "How to play".
   - **Direction (owner's view, 2026-11-01): web-first.** A link is easier for students than remembering where a downloaded file is saved, and an update reaches everyone at once; few people lack internet. The single-file download ended with the folder split (2026-11-02): the game is now several files in `game/` (see "How to play"), and the old single-file version is kept in the private archive drawer.
   - **How publishing would work:** GitHub Pages or Cloudflare Pages, connected to the GitHub repository. Each `push` publishes the update in a minute or two. The assistant never needs a password or token and must not hold one; the owner does the one-time account and connection setup. The assistant can open the public site in the built-in browser to test it after a push (it cannot see the host's dashboard or anything behind a login).
   - **Address formats:** GitHub Pages: `https://ahmetkaans.github.io/my-game-project/`. Cloudflare Pages: `https://<name>.pages.dev` (the owner chooses the name; it may be taken). Saved settings and the future history belong to the web address, so choose the address to keep before sharing it widely. A custom domain such as a `.com` costs about 10 to 15 dollars a year.
   - **Limits (written from memory on 2026-11-01; check the current numbers when setting up):** Cloudflare Pages free plan: about 20,000 files per site, 25 MiB per file, about 500 builds a month, unlimited traffic for static files. GitHub Pages: about 1 GB per site. A 25 MB single file is very unlikely for text only (the estimate for all five levels is 10 to 15 MB, see "Later, not planned yet: splitting the file").
   - **Public repository:** the free GitHub Pages plan needs a public repository (not yet checked for this one). Everything that is pushed becomes public, including README.md, DESIGN.md, AGENTS.md and CHANGELOG.md; the private `.gitignore/` folder is never pushed and stays private.
   - **Decision (owner, 2026-11-01): after the switch there will be no single-file download.** The game becomes several files on a website. **It starts only when we split the file** (until then `index.html` stays the one file and every rule stays as it is). **Update 2026-11-02: the split is done (see the status under "Later, not planned yet: splitting the file"); AGENTS.md rule 2 was reworded with the owner's permission, and "How to play" now says to download the ZIP and open `game/index.html`.** When we split, rewrite together: AGENTS.md rule 2 (only when the owner asks, as always), README "How to play" (from "download `index.html`" to "open the link", and install it once the installable app exists), the section "Later, not planned yet: splitting the file", and the note on item 10. Why: a link is easier than a saved file, updates reach everyone, a multi-file game cannot be opened from phone storage (reports: Android gives files `content://` addresses so relative links fail, iOS Files/Safari restricts local files; not tested; sources: community.particle.io thread 27128, a SitePoint forum thread, a MacRumors iPad thread), and a split lets the assistant open only the file it needs (smaller reads). The split waits for real numbers (the file passes about 1 MB, content grows, or loading feels slow) and needs a short file map in this README so a new session finds the right file.
   - **Offline use after the switch: an installable web app (PWA).** Possible on Cloudflare Pages and GitHub Pages (both give https). It needs a manifest, a service worker that saves the game, and app icons. When a new version is published, the saved copy must refresh (version number), or students keep an old one. On iPhone it is installed with Share > Add to Home Screen and has had more limits than on Android, so test on a real device. A browser's "Save page" can save a broken copy of a multi-file game, which is another reason to offer the install button instead. Not built, not planned yet.
   - **Keep the names clean for adblockers:** avoid class names and file names with `ad(s)`, `banner`, `sponsor`, `tracker` or `popup`. Words inside question text are never blocked. The only outside request is the Inter font; if a strict privacy tool blocks it, the game falls back to a normal font.
12. **Menu tree** (owner's request, 2026-11-01). **Built (2026-11-01)**, see "Screen flow": a button next to Settings opens a panel with the student's path through the menu; each chosen step is clickable.
13. **Turkish language switch** (owner's request, 2026-11-01): a toggle in Settings, English by default, that shows menus, buttons, pop-ups, feedback and results in Turkish. Questions and their options are never translated. **Both rounds built (2026-11-01)**: menus, pop-ups, Settings, quiz screen, feedback and results; see "Language (English / Turkish)". After that, as separate steps: the meanings in the "Words in this game" pop-up, then the answer explanations (Turkish kept in its own block per quiz key, so the later file split just moves it; add a check-script warning for an explanation without Turkish). Open: whether a Turkish explanation replaces or sits under the English one; whether the results note the language.
14. **Helper agents and a file map** (owner's request, 2026-11-01; **the file map is built; helper agents are NOT to be used any more: owner's decision, 2026-11-02, because they were very heavy on the owner's context window**). Why: the conversation fills up (about 40% of the window after the Turkish work); the README alone is about 40k tokens, and big reads of `index.html` and screenshots add to it. Plan, in order:
    - **a) File map in this README** (owner liked the idea). **Built (2026-11-02)**: see "File map" at the top; the private script `.gitignore/tools/check_filemap.ps1` checks it in both directions (AGENTS.md rule 12 makes keeping it true a rule; AGENTS.md's reading line now says "read the map first, then the sections it points to"). The original idea: a short table of which function, CSS block or data file lives where in `index.html` (and, after the split, which file), so a task can read only the lines it needs instead of broad chunks. Keep it in step with the code (AGENTS.md rule 11); the later file split reuses it.
    - **b) Helper agents for bulk, read-only jobs: dropped (owner, 2026-11-02).** Do not start a helper agent or sub-session for these jobs, and do not recommend one. Do the work in the main conversation with small, targeted reads (the file map and the script options are made for that). A six-helper test and a one-helper test were run on 2026-11-02: the answers were correct, but the cost to the owner's context was too high. The original idea, kept for history (a helper starts without our conversation, so the brief must be complete): (1) **review a whole theme's questions against the "Review checklist"**, as a second pair of eyes that did not write them, still followed by the owner's go-ahead (rule 9); (2) **scan `index.html` for leftover untranslated or hard-coded text** after a language or design change; (3) **broad searches across the files** before a big change. A helper returns a short report; the main conversation checks any finding before acting on it.
    - **c) Question tooling** (**built 2026-11-02**, see "Check script"): drafts are checked before the owner sees them (`-Draft`, in the private `.gitignore/drafts/` folder), the report is short (quiet by default, `-All` for the old list), a theme can be checked alone (`-Only`), `-Worksheet` prints pages for a reader (never a verdict), `-Checks` says what a reader must still do, the script reads its question numbers from `CONFIG`, and `test_check_questions.ps1` tests the script. AGENTS.md rules 9 and 13 cover the workflow and the upkeep. **Tested (2026-11-02):** a cold-start helper that had only the written instructions wrote a clean draft of one quiz, the script caught three real problems (a 14-word sentence, three words not in the lists, repeated options), and its reading-based review caught a hidden second right answer; its findings about the tools were fixed (the `[draft]` marker in check 26, the `*` for the used word type). **Ideas not built yet:** a `-Brief` working set for one theme, `-Find` (exact lines of a quiz), `-Content` (live status per topic), a question map with the topic numbers, a file of known warnings, and a safe add-quiz tool.
    - **Not for helpers:** small edits, writing or translating text, and anything that depends on the owner's decisions or exact wording; those stay in the main conversation. A helper never commits or changes files unless the owner says so.
    - **Other savings** (no change needed to rules): start a fresh session at natural breaks (the README, DESIGN.md and the notes carry the state); test with console scripts that read every text instead of screenshots; show only what changed when asking for approval. An idea still to decide with the owner: split this README into a short overview plus topic files (question method and checklist, Language, and so on), which needs new wording in AGENTS.md rule "read README.md and DESIGN.md in full" (AGENTS.md changes only when the owner asks).

15. **Browser back and forward buttons** (owner's question, 2026-11-03; **not decided, do not build without asking**). Today the game is one page with no history steps (`showScreen()` only hides and shows), so on a website the mouse back button leaves the game and a reload returns to the main menu (the reload notice explains it). The idea: each screen gets a history step with a `#` address (works from a folder too), back during a quiz opens the "Quit quiz?" pop-up, and every pop-up and the menu tree get their own step so back closes them first. Points found in the review: the quiz and results steps can't be restored (their data is gone), so forward onto them lands on the Difficulty screen and the quiz step becomes the results step when the quiz ends; the game's own Back buttons should walk back through the history; steps from before a reload are ignored; Safari may refuse the history call on a file, so it needs a try/catch. It touches `showScreen`, `openModal` / `closeModal`, the tree, the quit pop-up, results, `init.js` and the test.

16. **Antialiasing issue** (owner's note, 2026-11-03; **details to come from the owner, do not guess or fix anything yet**). The owner has seen an antialiasing problem (edges of text or drawings looking rough or jagged) and will say later where and how it shows. **First case found and fixed (2026-11-03):** the round Tree and Settings buttons looked rough in the Halloween theme with a 1px ring; all Halloween orange outlines are now 2px (token `--line` in `halloween.css`). The owner may still have other cases. When the owner explains more, ask for the screen, the browser and the theme, and test it in light, dark and Trick or Treat.

### Open questions (ask the owner before building)

- **History (3):** what one entry shows (date and time, level › category › topic › type › difficulty, score, correct / partly correct / wrong / skipped counts, used extra time?); whether the student can open an entry to see its answers; how many entries are kept; where it is opened (a button on the level screen, the top bar, the results screen).
- **Performance (4):** what is calculated (average score; per level, category, question type, difficulty or topic; best score; number of quizzes played; progress through the topics); whether only the latest try of each quiz counts or every try; whether the same-duration (60 s) switch, extra time or SmartBoard mode changes anything (tapping is easier than typing, so scores may not be comparable); how it is shown (numbers, bars, a chart). For the recommendations: what score counts as strong or weak, and how many plays of a topic are needed before judging it; only topics with real content count. The comments and recommendation texts need the owner's approval (AGENTS.md rule 9).
- **Resets (5, 6):** where the buttons are; a confirmation pop-up before clearing ("Are you sure?"), since a reset can't be undone.
- **Next exercise (7):** decided and built: the order above, the end-of-category choice, placeholder quizzes included, the Difficulty screen opens with the next quiz marked, and the button is hidden after the last quiz.
- **Credits (8):** done. The order is Claude first, then the two people's names.
- **Settings (9):** the pop-up, its place (top corner, not on the quiz screen) and the remembered duration switch are decided and built; the texts are in DESIGN.md. Still open: whether the results note that SmartBoard mode was on (SmartBoard mode is built).
- **Lesson-file maker (10):** decided later, when it starts: which features it keeps (timer, scoring, results, settings), what the teacher gives the LLM (the file only, or the file plus her lesson idea), the file name and where it lives in the repository, how its question types are kept in step with the game when they change (AGENTS.md rule 11 will need to say what covers it).
- **Storage (3–6):** everything is saved in the browser (`localStorage`), like the Settings choices (language, theme, sound, same duration, SmartBoard mode). So it belongs to one device and one browser, and clearing the browser's data deletes it. Ask whether that is enough, or whether students will need it on several devices (that would need accounts and a server, which goes against AGENTS.md rule 2: the game must work from the folder, offline).
- **Design (all):** new screens or pop-ups and their texts need the owner's approved names (DESIGN.md).

### Draft design: history, overall calculation, resets, recommendations (owner's ideas, 2026-11-01; NOT decided or built)

Saved at the owner's request as a reminder. **When the owner returns to this, ask the four questions at the end again, one by one, before building anything** (AGENTS.md rules 1, 4 and 9; the texts of comments and recommendations are drafted for review first). The build order agreed in principle: history, then the overall calculation and its comment, then the two reset buttons, then recommendations (last). Plan the shared data design together first, then build part by part.

**Wording.** *Play calculation* = the score on one results screen. *Overall calculation* = the long-term picture across all plays. Use these two terms from now on.

**1. History (owner's idea).** One record per finished play, saved in the browser (`localStorage`, not in the HTML file), shown like a browser history (a list, newest first, tap a record for details). A record holds the numbers of the results screen: date and time, level, category, topic, question type, difficulty, final score, counts of correct / partly correct / wrong / skipped answers, extra time used, whether same duration was on. Suggestion to confirm: also store whether SmartBoard mode was on (typed and tapped Fill are different tests). A record is about 250 bytes; the cap on the number of records goes in `CONFIG`.

**2. Export and import (owner's idea).** Easy to export (a small `.json` download) and import. The file carries a check number so the game can tell it is its own file: **1881** (the owner first said 1981 and corrected it), kept in `CONFIG`, together with the game name and a version. Honest note: it only catches wrong files by mistake; it is not protection, because anyone can read it in the page source.

**3. Overall calculation (owner's idea).** It considers the numbers of all plays together with their thematic or topical content and produces a comment that fits the situation. Not very complicated, but not so simple that it looks redundant; the comments should vary greatly across different combinations of numbers and plays (several variants, a rule against repeating the same one). Suggested design: store it separately from history as running totals per level, category, topic, question type and difficulty (number of plays, sum of scores), so each reset button works cleanly and capping history never changes it. The comment texts are drafted for the owner to review first (rule 3: lorem until named).

**4. Reset buttons (the owner left the method to me).** Suggested: two buttons, "Reset history" (clears the list, keeps the overall calculation) and "Reset overall calculation" (clears the totals, keeps the history), each with an "are you sure" pop-up that says what it deletes and what it keeps (same style as the Main menu pop-up).

**5. Recommendations (owner's idea).** A general recommendation covering every play so far, shown only after at least **7** plays (the number goes in `CONFIG`); before that, a message such as "You need to play at least 7 games to see a general recommendation" (where it is shown and the wording are not decided). The general screen is accompanied by game-specific recommendations; what they say and what triggers them are not decided.

**Things to settle before building (rule 10).** Roadmap item 3 has the open question "latest try only or every try"; lorem (placeholder) quizzes have no real content, so suggest not recording them; the results page may note whether SmartBoard mode was on.

**The four questions to ask the owner again (with my recommendation):**
1. When the same quiz is played more than once, how should the overall calculation count it? (Recommended: every play counts; the alternative is only the latest try of each quiz.)
2. What should the general recommendation (7 plays) read from? (Recommended: the overall calculation, so resetting it also restarts the 7-play count; the alternative is the history list.)
3. Which plays should be recorded? (Recommended: finished plays with real content only; the alternative also records plays the student quit.)
4. When someone imports a history file, what should happen to the history they already have? (Recommended: merge and skip plays already there; the alternative replaces the current history, and the calculation would be rebuilt from the file.)

### Later, not planned yet: splitting the file

**Status (2026-11-02): the split is done.** The game is now `game/index.html` (the screens and the list of files), `game/css/` (5 files at the time, 6 now), `game/js/` (22 code files at the time, 23 now, each with a Provides / Needs header that the map check verifies) and `game/data/` (the questions and word meanings, 4 files). It was made in small steps, each one proved by script (the joined new files equal the old text exactly) and tested with the play-through test; the steps and their results are in the private file `.gitignore/drafts/FOLDER_SPLIT_PLAN.md`. The old single-file version is kept in `.gitignore/archive/`. **Later, when many themes exist:** load a theme file only when its quiz starts (a manifest listing the real quizzes, and a loader); today all data files load when the page opens. **The text below is the old discussion from before the split (the bundler idea and the cautions), kept for history.**

**Update (owner's decision, 2026-11-01): there will be no single-file download after the switch (see Roadmap item 11), so the bundler idea below is no longer needed for downloads. The cautions about loading and testing still apply to a split. Nothing is decided or built.**

Discussed 2026-11-01; nothing is decided or built. `index.html` is about 120 KB today, and 76 KB of the question data is for one theme; a rough estimate is 2-3 MB for all of A1 and 10 MB or more for all five levels. If it grows too big, the idea is to keep separate source files (styles, code, one data file per theme or level) and join them into the single `index.html` that learners download, with a PowerShell bundling script. Learners would still download one file that works offline.
- **When to bring it up:** the file passes about 1 MB, A2 starts, the game feels slow to open, or edits to the big file start going wrong. Until then one file is fine; writing the question JSON without indentation comes first.
- **Cautions agreed with the owner:** ask the owner first (AGENTS.md rule 1; rule 2 was reworded on 2026-11-02, during the split, with the owner's permission; AGENTS.md changes only when the owner asks). Never edit the built `index.html` by hand once it is generated; rebuild after every change and check it in the browser. First test: split today's file, glue it back and compare it with the original; any difference is a bug in the bundler. The check script should warn when `index.html` is older than its sources, and the build should run the check script. Keep the bundler pure ASCII, write UTF-8 without BOM and LF line endings, wrap one-item results in `@()`, escape a stray `</script>` inside data, and use a `.ps1` file (Node and Python are not installed).
- A "load each level only when chosen" mode would work only on the website, not in the downloaded file.
- The lesson-file maker (item 10) would reuse the question types of the game as code, but in one compact file.
