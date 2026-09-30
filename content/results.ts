/**
 * Copy shared by every results page, the finale, and the outbound links.
 * Inline tags: <hl>…</hl> highlight, <b>…</b> bold.
 */

export const links = {
  // TODO: replace with the real booking link.
  bookDemo: "#book-a-demo",
  // TODO: replace with the interactive demo link.
  interactiveDemo: "#demo",
};

export const results = {
  complete: "PATH COMPLETE",
  explored: (n: number) => `${n} OF 3 WORKFLOWS EXPLORED`,
  next: {
    kickerMore: "KEEP EXPLORING",
    kickerAll: "YOU’VE SEEN ALL THREE",
    titleAll: "See how the three workflows connect",
    lineMore: (left: number) => `${left} of 3 workflows left. Each takes about 2 minutes.`,
    lineAll: "Engineering, product, and design, all working from one Space.",
    buttonMore: "Explore the next workflow",
    buttonAll: "See the full picture",
  },
  talk: {
    kicker: "TALK TO US",
    title: "Want to see this with your own team’s work?",
    line: "Book a 30-minute walkthrough with the Quely team.",
    button: "Book a demo",
  },
};

export const finale = {
  backToMap: "Back to the map",
  explored: (n: number) => `${n} OF 3 WORKFLOWS EXPLORED`,
  cards: [
    { kicker: "ENGINEERING · AJ", title: "Execution", tilt: "-2deg" },
    { kicker: "PRODUCT · ADITI", title: "Coordination", tilt: "1deg" },
    { kicker: "DESIGN · MIRACLE", title: "Handoff", tilt: "-1deg" },
  ],
  hubLine: "One place for every task and everything tied to it",
  title: "All three workflows come back to <hl>the same problem.</hl>",
  lead: "The information people need to do the work is usually created across conversations, meetings, documents, and tools. Quely keeps it connected to the work it explains.",
  bookDemo: "Book a demo",
  interactiveDemo: "See what all three workflows look like inside Quely",
  // Shown only to visitors who haven't explored all three workflows yet.
  explorePrompt: "Explore the workflows behind this",
};
