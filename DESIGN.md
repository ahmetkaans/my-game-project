# DESIGN.md

## Status

The visual design is **decided** and applied in [index.html](index.html) (all CSS lives in its `<style>` block). Copy that the owner has not named explicitly is still lorem ipsum.

Names that are fixed by the owner: A1, A2, B1, B2, C1, Vocabulary, Grammar, Multiple Choice, Fill in the Blanks, True or False, Matching, Easy, Medium, Hard, Very Hard, "Same duration per question across all difficulty settings", Credits, Back, Time out, Game over, Skip question, Retry.

Student-facing text approved in real short English (not lorem): "Words in this game" and "Start" (pop-up), "Almost!", "Check your spelling: …", "Partly correct.", "… of 4 pairs are correct.".

A1 Vocabulary themes (15, in this order; stored in `TOPICS_BY_SECTION['A1|vocabulary']`): Greetings and Feelings; Numbers and Amounts; People and Family; School and Classroom; Time and Dates; Home and Daily Routine; Food and Drink; Clothes and Colors; Town and Shopping; Free Time and Sports; Body and Health; Nature and Animals; Travel and the World; Jobs and Technology; Learning and Ideas.

A1 Grammar topics (21, in this order; stored in `TOPICS_BY_SECTION['A1|grammar']`): To be (am / is / are); A / an / the; Present simple; Present continuous; Past simple of "to be" (was / were); Past simple; Going to; Imperatives; Can / can't / could / couldn't; Questions (yes/no and wh-); There is / there are; How much / how many (countable and uncountable); Personal pronouns; Possessives (my, mine, 's); This / that / these / those; Adjectives with very / really; Comparatives and superlatives; Adverbs of frequency; Prepositions of place; Prepositions of time (in / on / at); Like / love / hate + -ing and I'd like.

## Style: "clean study app"

- Calm, focused and minimal, but not boring. For adults, teens and kids.
- Neutral surfaces everywhere; color comes only from the **level accent** and from the **correct / wrong** states.
- Soft white cards (`.card`, menu buttons) on a page background lightly tinted with the level color. Rounded corners (14px cards, 10px controls), very soft shadows, no hard lines.
- Works on phones and computers: single centered column (`max-width: 760px`, 16px side gutter), all tap targets at least 44–48px tall, menu grids are 2 columns on phones and auto-fill on wider screens, primary actions are full width on phones.

## Level colors

Each level's color is the accent (`--accent`) on **every screen inside that level** (category, topic, type, difficulty, quiz, results). It is set by `document.body.dataset.level`, which `showScreen()` updates.

| Level | Light mode | Dark mode |
|---|---|---|
| A1 teal | `#0F7A6C` | `#5CC9B8` |
| A2 blue | `#2F6FB8` | `#7DB1EC` |
| B1 violet | `#6B4FC0` | `#A894EE` |
| B2 rose | `#A8436F` | `#E89BBB` |
| C1 gold | `#A0670B` | `#E7B54F` |

- **Level selection screen** (no level chosen yet): neutral slate accent (`--neutral-accent`: `#44505C` / `#B4BEC9`). Each level button is tinted in its own level color as a preview (`.level-btn`, `--chip`).
- **Backgrounds** use tints of the accent made with `color-mix()`: `--page-bg` (page, ~7% light / ~10% dark), `--accent-soft` (hover, selection, word bank; ~12% / ~18%). In dark mode the same mix produces dark tints automatically.
- Text on accent-colored buttons: white in light mode, near-black in dark mode (`--on-accent`), because the dark-mode level colors are light.

## Other colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ok` | `#1E7B3C` | `#6CCB8A` | correct answers only |
| `--bad` | `#B3261E` | `#F08A80` | wrong answers only |
| `--extra` | `#C2410C` | `#FB923C` | timer during the +10 s extra time |
| `--bg` / `--surface` | `#F6F6F3` / `#FFFFFF` | `#121417` / `#1A1D21` | page base / cards |
| `--fg` / `--muted` / `--border` | `#1D2125` / `#5F6670` / `#E3E3DE` | `#E6E8EB` / `#9AA1AA` / `#2C3137` | text / secondary text / lines |

- Green and red are used **only** for correct and wrong answers (buttons, feedback box, results cards). Partly right answers use the level color.
- **Timer**: normal and low time use the level accent. Low time (< 25%) is shown with a gentle pulse and the ticking sound, not with red. Extra time uses deep orange **plus a diagonal stripe pattern** and an "Extra time" label, so it is clearly different from C1 gold (also in dark mode).

## Light and dark mode

- Follows the device setting by default (`prefers-color-scheme`).
- Theme button (top-right) cycles **Auto → Light → Dark → Auto**. The choice is remembered in `localStorage` (`lg-theme`); a tiny script in `<head>` applies it before the first paint to avoid a flash.
- Tokens are defined on `:root` (light), redefined under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and under `:root[data-theme="dark"]`. Only token values change between modes; layout, spacing and motion stay the same so the calm feel is identical.

## Typography

- **Inter** from Google Fonts, weights **400 (regular)** and **500 (medium)** only, `display=swap`.
- Fallback: the device's system font (`system-ui, -apple-system, "Segoe UI", Roboto, …`) — used automatically when offline or while Inter loads.
- Headings and buttons use 500; body text uses 400. No bold (600/700) weights. Numbers in the timer and score use tabular figures.

## Motion

All motion is short (≤ 350ms, confetti ~2.8s) and soft (ease-out, tiny distances).

- Screens and the feedback box fade/rise in by 4–6px.
- **Correct answer**: the correct element(s) do a gentle "pop" (scale to 1.035 and back, 320ms).
- Buttons press down slightly (`scale(.98)`).
- Low-time timer bar pulses softly.
- **Confetti** on the results screen for a high score: final score **≥ 80** (Multiple Choice, Fill in the Blanks, True or False) or **≥ 75** (Matching, which has partial points). Drawn on a temporary `<canvas>` in the five level colors, removed when done or when leaving the screen.
- **Reduce motion**: when the device has "reduce motion" on, all CSS animations/transitions are disabled and confetti is skipped.

## Sound

Generated with the Web Audio API inside `index.html` (no audio files):

- **Correct**: soft two-note sine chime (E5 → B5).
- **Partly right**: one soft sine note (D5), between the chime and the low tone.
- **Wrong**: gentle low triangle tone gliding down (A3 → F3).
- **Tick**: very quiet short sine blip once per second in the last 5 seconds of the normal timer and of the extra time.
- Sound is **on by default**. The mute button (top-right) remembers the choice in `localStorage` (`lg-muted`).

## Controls placement

- Top bar (`.topbar`, right-aligned): **theme** and **mute** round icon buttons (inline SVG icons). Shown on every screen **except the quiz screen**, to keep the quiz focused.
- Back button: top-left text button on every screen except the level screen.
- Footer: Credits link on every screen except the quiz screen.

## Components

- **Menu button** (`.menu-btn`): white card button in a grid; optional `<small>` sub-label (seconds on difficulty buttons).
- **Level button** (`.level-btn`): bigger, tinted in its own level color.
- **Primary button** (`button.primary`): accent background; Next, Check, Retry, main modal action.
- **Icon button** (`.icon-btn`): 44px round, theme and mute.
- **Switch** (`.switch-row` / `.switch`): card row with a toggle in the accent color.
- **Quiz header**: progress, running score, timer text (`.quiz-meta`) and a rounded timer bar (`.timer-bar`, states `.is-low`, `.is-extension`).
- **Question card** (`#quiz-question.card`): options are full-width 56px buttons; True/False are side by side.
- **Feedback box** (`.feedback.ok` / `.feedback.bad`): green or red tint.
- **Word bank + typed blank** (`.word-bank`, `.chip`, `.blank-input`): dashed accent-tinted bank with pill chips (display only) above the sentence; the blank is a text input inside the sentence with a light accent tint and an accent underline, fixed width (9.5em, never hints at the word's length), focus ring in the accent color. After Check it turns green (correct), red (wrong) or level-color tint (misspelled).
- **Partly right** (misspelled Fill answer, Matching question with 1–3 correct pairs): uses the **level color**, never green or red. Feedback box `.feedback.partial` (accent-soft background, accent heading "Almost!" / "Partly correct."), result card `st-partial` (accent left border).
- **Matching** (`.match-columns`, `.match-item`): two columns; selected item gets accent outline + tint; paired items share a round number badge.
- **Modal** (`.modal-overlay`, `.modal`): card with soft shadow over a dimmed, slightly blurred page.
- **"Words in this game" pop-up** (`.word-list`): a modal before every quiz (and Retry). One soft accent-tinted row per tested word: the word (medium weight), then one line per word type it has at that level: the type (small, muted, italic) and its meaning. **The type used in that game is underlined** in the level color and shown in the normal text color. One button, **Start** (primary); the list scrolls inside the modal when it is long (Matching: up to 16 words).
- **Results**: hero card with big score in the accent color, summary, actions; then one card per question with a colored left border (green / red / grey).

## Open design work

- Real copy for headings, instructions, modals and credits.
- Illustrations or icons for topics / question types (if wanted).
