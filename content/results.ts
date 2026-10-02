/**
 * Copy shared by every results page, the finale, the questions form, and the outbound links.
 * Inline tags: <hl>…</hl> highlight, <b>…</b> bold.
 */

export const links = {
  bookDemo:
    "https://meetings.hubspot.com/admin3094/quely?uuid=04dd54ad-5cba-4e7a-b8e7-b2bc892a0288&utm_source=website&utm_medium=howweusequelyinteractivepage",
};

/**
 * Where the "Have more questions?" form sends submissions. One setting:
 *   ""                                   nothing is sent; the visitor still sees the thank-you
 *   "hubspot:<portalId>/<formGuid>"      a HubSpot form (the likely choice)
 *   a Google Form's ".../formResponse" URL
 *   any other URL                        receives a JSON POST: { firstName, email, question, page }
 * `fields` are the field names the destination expects: HubSpot property names, or a
 * Google Form's "entry.123456" ids. A plain URL ignores them.
 */
export const questionsForm = {
  // Quely's HubSpot form (portal 23869879, region na1).
  target: "hubspot:23869879/305ac348-510b-44e7-830d-2502eb1c3fa1",
  // HubSpot property names. Check "message" matches the question field in the HubSpot form editor.
  fields: { firstName: "firstname", email: "email", question: "message" },
};

/** The "Have more questions?" pop-up. */
export const questions = {
  kicker: "ASK US ANYTHING",
  title: "Have more questions about Quely?",
  lead: "Send us your question and we’ll get back to you by email.",
  firstNameLabel: "First name",
  firstNamePlaceholder: "Your first name",
  emailLabel: "Work email",
  emailPlaceholder: "you@company.com",
  questionLabel: "Your question",
  questionPlaceholder: "What would you like to know?",
  missing: "Add your first name, email, and question so we can get back to you.",
  failed: "Something went wrong sending your question. Please try again.",
  send: "Send question",
  sending: "Sending…",
  doneKicker: "QUESTION SENT",
  doneTitle: (firstName: string) => `Thanks, ${firstName}. We’ve got your question.`,
  doneLead: "We’ll reply to your email within one business day.",
  keepExploring: "Keep exploring",
  close: "Close",
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
    line: "Book a 30-minute walkthrough with the Quely team, or send us your question.",
    button: "Book a demo",
    ask: "Ask a question",
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
  askQuestion: "Have more questions about Quely?",
  // Shown only to visitors who haven't explored all three workflows yet.
  explorePrompt: "Explore the workflows behind this",
};
