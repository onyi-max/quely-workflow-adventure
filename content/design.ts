/**
 * Design path: Miracle hands off design to engineering.
 * Inline tags: <hl>…</hl> highlight, <b>…</b> bold, <mention>…</mention> @mention.
 *
 * Each step has a scene header (kicker, title, line) and a bottom bar (ask = the status
 * text on the left, button = the one primary button).
 */

export const people = {
  miracle: { initials: "MI", name: "Miracle", color: "#F4B942", role: "Designer" },
  nadia: { initials: "NA", name: "Nadia", color: "#9FD8B4", role: "PM" },
  lena: { initials: "LE", name: "Lena", color: "#9585E6", role: "Designer" },
  devon: { initials: "DV", name: "Devon", color: "var(--purple)" },
};

type P = keyof typeof people;

/** The screen being designed: step 2 of a made-up product's onboarding. */
export const northwind = {
  url: "app.northwind.co/onboarding",
  brandInitial: "N",
  brand: "Northwind",
  step: "Step 2 of 3",
  title: "Invite your team",
  intro: "Teammates get an email invite. You can add more later.",
  emailsLabel: "Email addresses",
  emails: [
    { initials: "MA", color: "#F4B942", email: "maya@northwind.co" },
    { initials: "DV", color: "#9585E6", email: "devon@northwind.co" },
  ],
  roleLabel: "Role",
  role: "Member",
  roleNote: "Can view and edit projects",
  skip: "Skip for now",
  send: "Send 2 invites",
};

export const design = {
  id: "design" as const,
  totalScenes: 5,
  resultsTitle: "You explored how Miracle <hl>hands off design</hl> in Quely.",

  // ---- Scene 1: the design is ready
  start: {
    kicker: "SCENE 1 · THE DESIGN IS READY",
    title: "Design is ready. Hand it over to engineering for implementation.",
    line: "You’re Miracle, the product designer. Send the design to engineering the usual way.",
    ask: "The usual handoff",
    button: "Send it to engineering",
    figmaChip: "Invite your team · final design",
  },

  // ---- Scene 2: engineering starts building
  receive: {
    kicker: "SCENE 2 · ENGINEERING STARTS BUILDING",
    title: "Everything looks complete. Then the questions start.",
    line: "Devon has the file, the ticket, and the specs. Watch what he still has to ask.",
    building: "Devon is building…",
    packageLabel: "HANDOFF RECEIVED BY DEVON, ENGINEER",
    items: [
      { logo: "figma", label: "Figma file" },
      { logo: "jira", label: "ticket" },
      { logo: "notion", label: "Specs" },
    ] as { logo: "figma" | "jira" | "notion"; label: string }[],
    looks: "looks complete...",
    dmLabel: "DEVON’S DMS TO MIRACLE",
    callAsk: "Can we get on a call so you can walk me through the design?",
    doneAsk: "Miracle knows the answers to these questions.",
    doneButton: "See what Miracle knew that wasn’t in the handoff",
  },
  // Devon's questions, and Orbit's answers to them in scene 4.
  questions: [
    {
      q: "Why can people skip inviting teammates?",
      a: "From the design discussion on this task: most admins set up alone first, so the team made invites optional. That’s why “Skip for now” is there.",
    },
    {
      q: "Why isn’t there a CSV upload?",
      a: "From the discussion and the decisions doc: Miracle tried CSV upload in v1 and dropped it. It was too heavy for step 2 of onboarding.",
    },
    {
      q: "Does this depend on anything?",
      a: "From the decisions doc: bulk invites wait on the Invites API v2. Until then, invites go one email at a time.",
    },
    {
      q: "Is anything planned for later?",
      a: "From the decisions doc: an Admin role for larger teams, and suggesting teammates from connected tools. That’s why Role is a list, not a toggle.",
    },
  ],

  // ---- Scene 3: what the screens don't show
  xray: {
    kicker: "SCENE 3 · WHAT THE SCREENS DON’T SHOW",
    title: "Behind every screen are calls Miracle made while designing.",
    line: "Drag the handle to see the thoughts and decisions that never made it into the handoff.",
    count: (n: number) => `${n} of 5 decisions revealed`,
    button: "Reveal it for me",
    coach: { title: "Drag me", text: "Pull the handle to the left" },
    handleLabel: "Reveal the history behind the screen",
    doneAsk: "None of this made it into the handoff.",
    doneButton: "See how this handoff works in Quely",
    // `at`: how far the handle has to travel (from the right) before the note appears.
    pins: [
      { tag: "DECIDED", text: "Made invites optional. Most admins set up alone first.", at: 0.78, left: "55%", top: "5%", tilt: "-2deg" },
      { tag: "DROPPED", text: "Tried CSV upload. Too heavy for step 2, so it’s out.", at: 0.62, left: "55%", top: "40%", tilt: "1.5deg" },
      { tag: "ASSUMING", text: "Most teams start with just a few people.", at: 0.42, left: "55%", top: "72%", tilt: "-1deg" },
      { tag: "DEPENDS ON", text: "Bulk invites have to wait for the Invites API v2.", at: 0.3, left: "6%", top: "16%", tilt: "1deg" },
      { tag: "LATER", text: "Keeping Role as a list so an Admin role fits later.", at: 0.14, left: "6%", top: "54%", tilt: "-2deg" },
    ],
  },

  // ---- Scene 4: the same handoff, in Quely
  task: {
    spaces: ["Product Sprint 4.4", "Onboarding", "Marketing Sprint 1.0"],
    activeSpace: 1,
    space: "Onboarding",
    id: "COL-44",
    title: "Build the “Invite your team” step",
    summary: "Step 2 of onboarding. Admins can invite teammates now or skip and invite later. The design discussion is on this task.",
    attachments: [
      { icon: "figma", title: "www.figma.com", note: "Invite your team · final design" },
      { icon: "pdf", title: "Invite step interaction specs.pdf", note: "States, spacing, and copy for step 2" },
    ] as { icon: "figma" | "pdf"; title: string; note: string }[],
  },
  discussion: {
    label: "DESIGN DISCUSSION ON THIS TASK",
    time: "2 days ago",
    // The first `shownAtStart` messages are already there; the rest are typed in.
    shownAtStart: 2,
    messages: [
      { who: "miracle", text: "Should inviting teammates be required before setup? I have both versions in Figma." },
      { who: "nadia", text: "Most admins set up alone first and invite people later." },
      { who: "lena", text: "Then let’s make it optional, with a clear “Skip for now” and a way to invite later from Settings." },
      { who: "miracle", text: "Agreed. I tried CSV upload in v1. It’s too heavy for step 2, so I’m dropping it." },
      { who: "nadia", text: "Bulk invites can come back once the Invites API v2 ships." },
      { who: "miracle", text: "I’m keeping Role as a list, not a toggle, so an Admin role fits in later." },
    ] as { who: P; text: string }[],
  },
  space: {
    kicker: "SCENE 4 · THE SAME HANDOFF, IN QUELY",
    title: "In Quely, the design alongside the discussion and supporting assets are in a Space.",
    line: "The Figma file and specs are attached. Watch the team work through the trade-offs in the thread beside them.",
    discussing: "The design team is discussing…",
    doneAsk: "Miracle also wrote up the decisions in a Quely doc. Now see it from the engineer’s perspective.",
    doneButton: "See the engineer open the doc",
  },
  doc: {
    kicker: "SCENE 4 · THE ENGINEER PICKS UP THE TASK",
    title: "The engineer opens the doc Miracle wrote, right in the Space.",
    line: "Quely has a lightweight doc feature. Additional context goes here, right next to the existing conversation.",
    ask: "Open the doc as the engineer",
    button: "Open it",
    coach: { title: "Miracle’s doc", text: "Click to open it" },
    openedAsk: "The engineer still has four questions. See him try to get the answers himself before reaching out to Miracle.",
    openedButton: "See the engineer ask Orbit",
    taskStatus: "In progress",
    cards: [
      { title: "Invite step: decisions and trade-offs", meta: "Miracle · 412 words · edited 2d ago", isNew: true },
      { title: "Onboarding research notes", meta: "1,180 words · edited 2w ago" },
    ],
    newCard: { title: "New document", meta: "Blank" },
    // The opened doc.
    view: {
      title: "Invite step: decisions and trade-offs",
      meta: "Miracle · 412 words · edited 2 days ago",
      sections: [
        { h: "Decision", p: "Invites are optional. Admins can skip and invite later from Settings › Members." },
        { h: "Options we considered", p: "<b>Required invites:</b> rejected. It adds friction before the admin has seen the product. <b>Optional invites:</b> chosen." },
        { h: "Rejected: CSV upload (v1)", p: "Too heavy for a first-run step. Most teams start with a few people." },
        { h: "Depends on", p: "Invites API v2 for bulk invites." },
        { h: "Later", p: "Admin role for larger teams. Suggest teammates from connected tools. Role stays a list so both fit without a rebuild." },
      ],
    },
  },
  ask: {
    kicker: "SCENE 4 · THE ENGINEER ASKS ORBIT, NOT MIRACLE",
    title: "The engineer still has four questions. The Space has the answers.",
    line: "Ask Orbit each question. It answers from the design discussion and the doc on the task.",
    promptsLabel: "✦ THE ENGINEER’S QUESTIONS",
    backToQuestions: "« Questions",
    asker: "Engineer · just now",
    footnote: "Answered from this Space · no meeting with Miracle",
    coach: { title: "Ask Orbit", text: "Click a question" },
    count: (n: number) => `${n} of 4 questions answered`,
    button: "Ask the next question",
    doneAsk: "Orbit answered all the questions. There was no need to reach out to the designer.",
    doneButton: "See the bigger picture",
  },

  // ---- Scene 5: the bigger picture
  system: {
    kicker: "SCENE 5 · THE BIGGER PICTURE",
    title: "The engineer sees what to build today and what it may need to support later.",
    mapping: "Mapping the system…",
    doneAsk: "That’s Miracle’s handoff.",
    doneButton: "See your result",
    screen: { label: "CURRENT SCREEN", title: "Invite your team", role: "Role: Member", send: "Send invites" },
    nodes: [
      { tag: "FUTURE STATE", title: "Suggest teammates", note: "v2, from connected tools", color: "#D8703A" },
      { tag: "DEPENDENCY", title: "Invites API v2", note: "Needed for bulk invites", color: "#6E4FC0" },
      { tag: "PLANNED", title: "Admin role", note: "For larger teams", color: "#2E8A55" },
      { tag: "ADJACENT FLOW", title: "Settings › Members", note: "Invite people later", color: "#3C7BC0" },
    ],
    note: { label: "WHY IT MATTERS NOW", text: "Role is a list, not a toggle, so an Admin role can be added later without a rebuild." },
    side: {
      kicker: "WHAT THE ENGINEER CAN SEE NOW",
      p1: "What to build today, and what the feature may need to support later. Knowing the Admin role is coming changes how he builds the Role field now.",
      p2: "And he gets all of it without a design walkthrough meeting or scrolling back through old Slack threads. The discussion, the doc, and the design are on the task.",
    },
  },

  // ---- Results
  results: {
    usual: "Screens only",
    ours: "Miracle’s way",
    rows: [
      { label: "Questions the engineer had to ask", usual: 4, ours: 0 },
      { label: "Meetings with the designer", usual: 1, ours: 0 },
      { label: "Details left out of the handoff", usual: 5, ours: 0 },
    ],
    note: "With the discussion, rejected option, assumption, dependency, and future ideas on the task, the engineer found his answers without a meeting with Miracle.",
    quote: {
      kicker: "HOW MIRACLE PUTS IT",
      text: "“I try to give engineers enough of the thinking around a feature to see what they’re building now and where it may need to go next.”",
      by: "Miracle, product designer",
    },
  },
};
