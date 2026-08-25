# The Recruiting Bullpen

A functional prototype of the daily landing page for a Robert Half recruiter —
**Charlotte · TDC desk, D. Sheehan**. One screen that pulls together the day's
calendar, the hot requisitions to work, the EQC check-ins due with talent on
assignment, and the MPC profiles being taken to market.

Built from the `Recruiting Bullpen v2` design handoff: React + TypeScript +
Vite, plain CSS, no component library. Every element is a div, table or button.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the built output
```

Fonts (Barlow, Barlow Condensed) load from Google Fonts, as the design system's
token stylesheet does.

## Layout

Fixed 1440px canvas with a 1200px floor, per the handoff — there are no
responsive breakpoints and no mobile design.

**One deliberate departure from the handoff:** the page ground is a soft teal
gradient (`--gradient-page`, built from `--color-teal-100…300` in
`src/index.css`) rather than the specified flat `--color-bg`, so the white
cards lift off the page. The handoff calls for no gradients and carries no teal
in its ramps; this was requested. Reverting is two lines — drop
`background-image` and `background-attachment` from `body`.

```
src/
  index.css              tokens ported from industry-tokens.css, then the
                         base component classes and this design's overrides
  data/types.ts          record shapes
  data/seed.ts           all dummy data (see below)
  lib/calendar.ts        hour → pixel geometry for the day calendar
  lib/format.ts          derived label helpers
  state/useBullpen.ts    every piece of prototype state and the writes
  components/            nav, day sheet, hot jobs, EQC table, MPCs, calendar
  components/overlays/   req drawer, EQC check-in, MPC profile, activity
                         dialog, "Start calling" queue
```

## Data

Everything lives behind `src/data/seed.ts` so it can be swapped for an API
without touching a component. `EVENTS`, `EVENT_TYPES` and the first records of
`JOBS`, `EQC_CALLS` and `MPCS` are copied verbatim from the design; the rest
extend the same shapes to a full day:

- **24 requisitions** — the four flagged `hot: true` fill the 2×2 grid; all 24
  sit behind the "All 24 reqs" link.
- **22 EQC calls** — one per person on assignment, with week number and due
  state (overdue, first call, today, tomorrow, this week).
- **8 MPCs** with marketing logs — the top three are the cards in section 03.

## Interactions

| Surface | Behaviour |
|---|---|
| Calendar block | Selects the event (default `e4`), outlines it, re-renders the detail footer. |
| Legend | `Tint` / `Solid` switches every block between the two fills. |
| Open record | Opens the record the event was booked against, when it has one. |
| Work the req | Req drawer: description, must-haves, client contact, submittals. |
| All 24 reqs | The Requisitions route — the full desk, each row opening the drawer. |
| EQC row | Check-in drawer: assignment detail, notes, **Log check-in** marks it complete and drops it out of the due list (re-openable). |
| MPC card | Candidate profile with the pitch and the marketing log expanded. |
| Start calling | Walks the day's call list one record at a time — every EQC check-in still due, then the live MPCs — logging or skipping each. |
| Log activity | Records a call / email / submittal / meeting against today. |
| Week, Reschedule, Submit candidate, Pipeline, Candidates | Stubbed, as specified. |

State is client-side only; reloading resets to the seed.

## Deployment

Pushes to `main` build and publish to GitHub Pages via
`.github/workflows/deploy.yml`.

`npm run build` finishes by running `scripts/inline-assets.mjs`, which folds
the built JS and CSS into `index.html` and deletes `dist/assets`. The published
page is therefore a single self-contained file: nothing to fetch beyond the
document, so a cached HTML naming a stale bundle, or a CDN edge serving new
HTML ahead of new assets, cannot leave a blank page. `index.html` also carries
a small fallback that explains itself if the page somehow fails to mount.

For local `npm run dev` this is irrelevant — Vite serves modules directly. Development happens on
`claude/confident-hawking-5gea11`, which carries the same tree; `main` is the
branch the `github-pages` environment permits deployments from. The build uses a relative `base`, so it works
from a project subpath as well as the domain root.
