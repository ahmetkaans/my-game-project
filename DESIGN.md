# DESIGN.md

## Status

The visual design has **not been decided yet**. The current styling in [index.html](index.html) is intentionally minimal and functional so the game logic can be built and tested first. All copy that the owner has not named explicitly is lorem ipsum.

Names that are fixed by the owner: A1, A2, B1, B2, C1, Vocabulary, Grammar, Multiple Choice, Fill in the Blanks, True or False, Matching, Easy, Medium, Hard, Very Hard, "Same duration per question across all difficulty settings", Credits, Back, Time out, Game over, Skip question, Retry.

## Current design language

- **Tone**: neutral, plain, no imagery or icons.
- **Font**: system UI font stack (`--font`).
- **Layout**: single centered column, `max-width: 720px`, 16px padding. Menus use a responsive grid (`.grid`, `minmax(150px, 1fr)`). Works down to phone width.
- **Colors**: defined as CSS variables on `:root` — change them there, not inline.

| Token | Use |
|---|---|
| `--bg`, `--surface`, `--fg`, `--muted`, `--border` | base surfaces and text |
| `--accent` / `--accent-fg` | primary buttons, selection, switch, timer bar |
| `--ok` / `--ok-bg` | correct answers |
| `--bad` / `--bad-bg` | incorrect answers, low-time timer bar |
| `--warn` | timer bar during the +10 s extension |
| `--radius`, `--gap` | corner radius and spacing |

## Components

- **Menu button** (`.menu-btn`): large grid button; optional `<small>` sub-label (used for seconds on difficulty buttons).
- **Primary button** (`button.primary`): Next, Check, Retry, main modal action.
- **Back button** (`.back-btn`): top-left of every screen except the level screen.
- **Switch** (`.switch-row` / `.switch`): checkbox styled as a toggle.
- **Quiz header**: progress, running score, timer text (`.quiz-meta`) and a timer bar (`.timer-bar`; red when < 25 % left, orange during extension).
- **Feedback box** (`.feedback.ok` / `.feedback.bad`).
- **Word bank + blank** (`.word-bank`, `.chip`, `.blank`, `.drag-ghost`): dashed bank area above the sentence; blank is an underlined drop zone highlighted while dragging over it.
- **Matching columns** (`.match-columns`, `.match-item`): two columns; selected item is outlined; paired items share a number badge.
- **Modal** (`.modal-overlay`, `.modal`): used for credits, quit confirm, time out and game over. Only the credits modal can be dismissed by clicking outside / Escape.
- **Results list** (`.results-list li.st-*`): one card per question with a colored left border by status.
- **Footer** (`#credits-footer`): Credits link; hidden on the quiz screen.

## Open design work

- Visual identity (colors, typography, illustrations).
- Real copy for headings, instructions, modals and credits.
- Dark mode.
- Animations / transitions for feedback and screen changes.
