/**
 * Map page copy. Inline tags: <hl>…</hl> highlight, <b>…</b> bold.
 */
import type { PathId } from "@/lib/paths";

export const map = {
  title: "See how product and engineering teams use Quely in their <hl>day-to-day work.</hl>",
  lead: "Pick a workflow to see how a designer, engineer, and product manager use Quely in their work.",
  progress: (n: number) => `${n} of 3 workflows explored`,
  startOver: "Start over",
  hubLine: "One place for every task and everything tied to it",
  state: {
    start: "START HERE",
    explore: "EXPLORE",
    explored: "EXPLORED ✓",
  },
  unlock: {
    locked: "Explore all three to get the full picture",
    open: "All three explored. See the full picture",
    line: "See how they each use Quely to drive alignment and preserve context.",
    button: "See the full picture",
  },
};

/**
 * Page titles and link-preview text (browser tab, Slack/LinkedIn/email previews).
 * `og` is what's drawn on the preview image: a kicker and a title with one highlighted phrase.
 */
export const meta = {
  siteName: "Quely",
  home: {
    title: "How teams use Quely: pick a workflow",
    description: "Pick a workflow to see how a designer, engineer, and product manager use Quely in their work.",
    og: { kicker: "HOW TEAMS USE QUELY", title: "See how product and engineering teams use Quely in their", highlight: "day-to-day work." },
  },
  design: {
    title: "Handing design to engineering · How teams use Quely",
    description: "See how Miracle, a product designer, hands off design to engineering in Quely.",
    og: { kicker: "DESIGN · MIRACLE", title: "Handing design to", highlight: "engineering." },
  },
  engineering: {
    title: "Picking up a task · How teams use Quely",
    description: "See how AJ, an engineer, picks up a task in Quely.",
    og: { kicker: "ENGINEERING · AJ", title: "Picking up", highlight: "a task." },
  },
  product: {
    title: "Keeping the team aligned · How teams use Quely",
    description: "See how Aditi, a product manager, keeps the team aligned in Quely.",
    og: { kicker: "PRODUCT · ADITI", title: "Keeping the team", highlight: "aligned." },
  },
  fullPicture: {
    title: "The full picture · How teams use Quely",
    description:
      "The information people need to do the work is usually created across conversations, meetings, documents, and tools. Quely keeps it connected to the work it explains.",
    og: { kicker: "THE FULL PICTURE", title: "All three workflows come back to", highlight: "the same problem." },
  },
};

/**
 * The three workflow cards. `label` is also used on the results badge; `teaser` is the
 * "Keep exploring" line shown on another path's results page when this one is next.
 */
export const workflows: Record<
  PathId,
  { role: string; label: string; who: string; avatar: { initials: string; color: string }; teaser: string }
> = {
  design: {
    role: "DESIGN",
    label: "Handing design to engineering",
    who: "Miracle, product designer",
    avatar: { initials: "M", color: "var(--amber)" },
    teaser: "See how a designer hands off work",
  },
  engineering: {
    role: "ENGINEERING",
    label: "Picking up a task",
    who: "AJ, engineer",
    avatar: { initials: "AJ", color: "var(--purple)" },
    teaser: "See how an engineer picks up a task",
  },
  product: {
    role: "PRODUCT",
    label: "Keeping the team aligned",
    who: "Aditi, product manager",
    avatar: { initials: "AD", color: "#9FD8B4" },
    teaser: "See how a product manager keeps the team aligned",
  },
};
