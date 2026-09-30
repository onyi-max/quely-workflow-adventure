/**
 * Fixed text inside the product mockups, shared by every path.
 */

export const quelyChrome = {
  org: "Quely",
  orgLabel: "Organization",
  search: "Search…",
  navTop: ["Home", "Spaces"],
  navBottom: ["Assign", "Calendar", "Recordings"],
  activeNav: "Spaces",
  crumbHome: "Home",
  timer: "00:00:00",
  descriptionLabel: "Description",
  summaryLabel: "Summary",
  tabs: ["Attachments", "Relationships", "Activity"],
  pager: "4 of 9",
  askOrbit: "Ask Orbit",
  filters: ["New first ▾", "All threads ▾"],
  composer: "What’s on your mind? Type / to reference a tool.",
  backToThreads: "« Threads",
  orbitHello: "What can I help you with?",
  suggested: "✦ SUGGESTED PROMPTS",
  actions: "Actions",
  beta: "BETA",
  addTool: "@ Add tool",
  lenses: "Lenses",
  askPlaceholder: "Ask a question about this Space",
  readMore: "⌄ Read more",
  justNow: "just now",
  typing: (name: string) => `${name} is typing`,
  askAnother: "Ask another question",
};

export const pathChrome = {
  backToMap: "Back to the map",
  back: "Back",
  scene: (i: number, total: number) => `Scene ${i} of ${total}`,
  complete: "Path complete",
};
