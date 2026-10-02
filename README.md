# How teams use Quely: workflow adventure

An interactive sales-enablement page. A visitor picks a workflow (design, engineering, product), plays through the old way of working and then the same moment in Quely, and ends on a results page.

Built with Next.js (App Router). The original prototype is kept at [`reference/prototype.html`](reference/prototype.html) and is the source of truth for layout, copy, interactions, and visual style.

## URLs

| Path | What it shows |
|---|---|
| `/` | The map |
| `/engineering` | AJ picks up a task |
| `/design` | Miracle hands off design to engineering |
| `/product` | Aditi keeps the team aligned |
| `/full-picture` | The finale. Always open; first-time visitors also get links to the three paths. |

Add `?company=Acme&rep=jordan` to any link and both values are attached to every tracking event for the rest of the browser session.

## Editing copy

All copy lives in `content/`, one file per area. Edit the strings; no component changes needed.

- `content/map.ts`: map page, workflow cards, page titles and link-preview text
- `content/engineering.ts`, `content/design.ts`, `content/product.ts`: every scene, message, Orbit answer, and the results page for each path
- `content/results.ts`: shared results copy, the finale, the questions pop-up, **the booking link** (`links.bookDemo`), and **where questions go** (`questionsForm`, see below)
- `content/shared.ts`: the header links and the fixed text inside the Quely mockup (sidebar, composer placeholder, etc.)

Inline styling inside copy uses a few tags: `<hl>…</hl>` purple highlight, `<b>…</b>` bold, `<mention>…</mention>` @mention chip, `<mark>…</mark>` yellow highlight.

## Questions form

"Ask a question" (header, results pages) and "Have more questions about Quely?" (finale) open a pop-up asking for a work email and a question. Where submissions go is one setting, `questionsForm.target` in `content/results.ts`:

- `""` (current): nothing is sent; the visitor still sees the thank-you
- `"hubspot:<portalId>/<formGuid>"`: a HubSpot form (set `fields` to the form's property names, e.g. `email` and `message`)
- a Google Form's `.../formResponse` URL (set `fields` to its `entry.123456` ids)
- any other URL, which receives a JSON POST of `{ email, question, page }`

## Tracking

No analytics tool is connected. The events below are wired up in `lib/analytics.ts` and only logged to the browser console in development; connect a tool by sending the payload from `track()`.

Events, each with `path` (plus `company`/`rep` when present):

- `path_started`
- `scene_viewed`: `scene` (1-based), `step` (step ID), once per scene number per run
- `step_back`: `from`, `to`, `scene`
- `path_completed`
- `cta_clicked`: `cta` = `book_demo` | `next_workflow` | `ask_question` (plus `from`: header, results or finale, where relevant)

## Structure

```
app/            routes, layout, fonts, Open Graph images
content/        all copy
components/
  map/          map intro, workflow map, unlock bar
  path/         PathRunner (step history + Back), StepFrame (header, stage, bottom bar),
                CoachMark, ContextCostMeter
  quely/        Quely UI mockup: app frame, sidebar, task card, threads, Orbit, Schedule Meeting,
                document section and doc view
  oldway/       Slack pile, ticket, tool tabs, banners, handoff package, X-ray slider,
                system map, standup call, DM windows
  results/      results page pieces, finale
scenes/<path>/  one component per step, plus the path's step list
lib/            progress (localStorage), analytics, motion helpers
styles/         the prototype's CSS, ported verbatim and split in order (don't reorder the imports)
```

Each step gets `saved`/`save`/`restored` from `PathRunner`, so Back restores the previous step exactly as the visitor left it, meter included. Progress is stored in `localStorage` under `quely-paths-v2`, the same key as the prototype.

Fonts (Inter Tight, Inter, Courier Prime, Caveat) are self-hosted via `next/font/local` from `app/fonts/`, using the same files Google Fonts serves for the prototype. Logos and the Orbit mascot are in `public/img/`. The favicon and home-screen icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) are the Quely mark cropped from the supplied logo.

## Develop

```bash
npm install
npm run dev
```

`npm run build` for a production build. Deploys on Vercel with no extra configuration.
