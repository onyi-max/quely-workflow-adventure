# How teams use Quely: workflow adventure

An interactive sales-enablement page. A visitor picks a workflow (design, engineering, product), plays through the old way of working and then the same moment in Quely, and ends on a results page.

Built with Next.js (App Router). The original prototype is kept at [`reference/prototype.html`](reference/prototype.html) and is the source of truth for layout, copy, interactions, and visual style.

## URLs

| Path | What it shows |
|---|---|
| `/` | The map |
| `/engineering` | AJ picks up a task |
| `/design` | Miracle hands off design *(coming next)* |
| `/product` | Aditi keeps the team aligned *(coming next)* |
| `/full-picture` | The finale. Always open; first-time visitors also get links to the three paths. |

Add `?company=Acme&rep=jordan` to any link and both values are attached to every tracking event for the rest of the browser session.

## Editing copy

All copy lives in `content/`, one file per area. Edit the strings; no component changes needed.

- `content/map.ts`: map page, workflow cards, page titles and link-preview text
- `content/engineering.ts`: every scene, message, tab, Orbit answer, and the results page for the engineering path
- `content/results.ts`: shared results copy, the finale, and **the outbound links** (`links.bookDemo`, `links.interactiveDemo`, currently placeholders)
- `content/shared.ts`: fixed text inside the Quely mockup (sidebar, composer placeholder, etc.)

Inline styling inside copy uses a few tags: `<hl>…</hl>` purple highlight, `<b>…</b>` bold, `<mention>…</mention>` @mention chip.

## Tracking

Set `NEXT_PUBLIC_MIXPANEL_TOKEN` (see `.env.example`) in Vercel's project settings. Until it's set, tracking is a no-op (events are logged to the browser console in development).

Events, each with `path` (plus `company`/`rep` when present):

- `path_started`
- `scene_viewed`: `scene` (1-based), `step` (step ID), once per scene number per run
- `step_back`: `from`, `to`, `scene`
- `path_completed`
- `cta_clicked`: `cta` = `book_demo` | `next_workflow` | `interactive_demo`

## Structure

```
app/            routes, layout, fonts, Open Graph images
content/        all copy
components/
  map/          map intro, workflow map, unlock bar
  path/         PathRunner (step history + Back), StepFrame (header, stage, bottom bar),
                CoachMark, ContextCostMeter
  quely/        Quely UI mockup: app frame, sidebar, task card, threads, Orbit, Schedule Meeting
  oldway/       Slack pile, ticket, tool tabs, banners
  results/      results page pieces, finale
scenes/<path>/  one component per step, plus the path's step list
lib/            progress (localStorage), analytics, motion helpers
styles/         the prototype's CSS, ported verbatim and split in order (don't reorder the imports)
```

Each step gets `saved`/`save`/`restored` from `PathRunner`, so Back restores the previous step exactly as the visitor left it, meter included. Progress is stored in `localStorage` under `quely-paths-v2`, the same key as the prototype.

Fonts (Inter Tight, Inter, Courier Prime, Caveat) are self-hosted via `next/font/local` from `app/fonts/`, using the same files Google Fonts serves for the prototype. Logos and the Orbit mascot are in `public/img/`.

## Develop

```bash
npm install
npm run dev
```

`npm run build` for a production build. Deploys on Vercel with no extra configuration.
