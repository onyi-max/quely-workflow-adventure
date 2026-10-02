/**
 * Product path: Aditi keeps the team aligned.
 * Inline tags: <hl>…</hl> highlight, <b>…</b> bold, <em>…</em> italic, <mention>…</mention> @mention.
 *
 * Each step has a scene header (kicker, title, line) and a bottom bar (ask = the status
 * text on the left, button = the one primary button).
 */

export const people = {
  aditi: { initials: "AD", name: "Aditi", color: "#9FD8B4", role: "PM" },
  kofi: { initials: "KO", name: "Kofi", color: "#9585E6", role: "Engineer" },
  tobi: { initials: "TO", name: "Tobi", color: "#F4B942", role: "Designer" },
  sam: { initials: "SA", name: "Sam", color: "#9FD8B4", role: "Engineer" },
  rosa: { initials: "RO", name: "Rosa", color: "#9585E6", role: "QA" },
};

type P = keyof typeof people;

export const product = {
  id: "product" as const,
  totalScenes: 4,
  resultsTitle: "You explored how Aditi <hl>keeps the team aligned</hl> in Quely.",

  // ---- Scene 1: standup, the usual way
  standup: {
    kicker: "SCENE 1 · STANDUP, THE USUAL WAY",
    title: "The team uncovers a blocker during standup.",
    line: "You’re Aditi, the PM. Click through to see what it takes to resolve this blocker after standup.",
    running: "Standup is running…",
    oldTag: "THE USUAL WAY",
    callLabel: "STANDUP · 30 MIN · 5 PEOPLE",
    timer: "09:00",
    tiles: [
      { who: "aditi", label: "Aditi · PM" },
      { who: "kofi", label: "Kofi · Engineer" },
      { who: "tobi", label: "Tobi · Designer" },
      { who: "sam", label: "Sam · Engineer" },
      { who: "rosa", label: "Rosa · QA" },
    ] as { who: P; label: string }[],
    // speaker = tile index (-1: nobody); ms = how long the line stays before the next.
    captions: [
      { speaker: 1, text: "<b>Kofi:</b> API for the filters is done. I’m blocked on the empty state. I need a design decision.", ms: 1500 },
      { speaker: 0, text: "<b>Aditi:</b> Let’s take that offline. I’ll sort it out with Tobi after standup.", ms: 1300 },
      { speaker: -1, text: "<em>…and the standup moves on.</em>", ms: 500 },
    ],
    summary: "<b>The blocker was raised, but not resolved.</b> That work starts after standup, and it lands on Aditi.",
    doneAsk: "Now see the follow-up work.",
    doneButton: "See what happens after standup",
  },

  // ---- Scene 2: after standup, the usual way
  after: {
    kicker: "SCENE 2 · AFTER STANDUP, THE USUAL WAY",
    title: "After standup, the follow-up work begins.",
    line: "The issue needs the designer first, then the engineer. A call would mean finding time on two calendars for a quick decision, so Aditi does what most PMs do: she messages each of them.",
    oldTag: "THE USUAL WAY",
    label: "AFTER STANDUP",
    relay: "Aditi carries it over",
    dms: [
      {
        label: "1 · SLACK DM WITH TOBI, DESIGNER",
        title: "Tobi",
        messages: [
          { who: "aditi", time: "9:40", text: "Kofi’s blocked on the filters empty state. What should it show?" },
          { who: "tobi", time: "10:05", text: "A “No results” message with a Clear filters button. Keep it inline, not a modal." },
        ],
      },
      {
        label: "2 · SLACK DM WITH KOFI, ENGINEER",
        title: "Kofi",
        messages: [
          { who: "aditi", time: "10:12", text: "Talked to Tobi. Show “No results” with a Clear filters button." },
          { who: "kofi", time: "10:30", text: "Inline or a modal? And does it apply to saved filters too?" },
          { who: "aditi", time: "10:31", text: "Let me check with Tobi…" },
        ],
      },
    ] as { label: string; title: string; messages: { who: P; time: string; text: string }[] }[],
    consequences: [
      { title: "Aditi is the link", text: "She carries the outcome from one conversation into the next." },
      { title: "Kofi gets her summary, not the discussion", text: "So his new questions go back through her." },
      { title: "None of it is on the task", text: "The decision sits in two private DMs." },
    ],
    doneAsk: "That’s the usual way.",
    doneButton: "See how Aditi handles this in Quely",
  },

  // ---- Scene 3: the same blocker, in Quely
  task: {
    spaces: ["Product Sprint 4.4", "Activity feed", "Marketing Sprint 1.0"],
    activeSpace: 1,
    space: "Activity feed",
    id: "COL-52",
    title: "Add filters to the activity feed",
    summary: "Filter the feed by status, owner, and date. Updates, blockers, and decisions for this work are discussed on the task.",
    attachments: [
      { icon: "figma", title: "www.figma.com", note: "Feed filters · v2" },
      { icon: "doc", title: "docs.google.com", note: "Filters spec" },
      { icon: "rec", title: "Sprint planning · recorded", note: "42 min" },
    ] as { icon: "figma" | "doc" | "rec"; title: string; note: string }[],
  },
  inQuely: {
    kicker: "SCENE 3 · THE SAME BLOCKER, IN QUELY",
    title: "The update, the discussion, and the decision stay on the task.",
    line: "Kofi posts his standup update on the task. Aditi brings in the designer right there.",
    threadLabel: "ASYNC STANDUP UPDATES ON THIS TASK",
    update: { who: "kofi" as P, time: "9:05", text: "Update: API for the filters is done. Blocked on the empty state, need a design decision." },
    typingAsk: "Aditi is typing…",
    mention: "@Tobi",
    message: " can you weigh in on the empty state here?",
    sentTime: "9:20",
    readyAsk: "Message ready",
    readyButton: "Send it",
    coach: { title: "Send it", text: "Bring the designer into the task" },
    replyingAsk: "The team replies on the task…",
    // Each reply: who types, how long they type (ms), then the message.
    replies: [
      { who: "tobi", typing: 1200, time: "9:34", text: "A “No results” message with a Clear filters button. Keep it inline, not a modal." },
      { who: "kofi", typing: 1100, time: "9:41", text: "Got it. Does it apply to saved filters too?" },
      { who: "tobi", typing: 1000, time: "9:45", text: "Yes, same state for saved filters." },
    ] as { who: P; typing: number; time: string; text: string }[],
    note: { label: "ON THE TASK FOR EVERYONE", text: "Kofi read Tobi’s answer himself and asked her directly. Aditi didn’t relay anything." },
    doneAsk: "One thread, no relay.",
    doneButton: "Continue to the retro",
  },

  // ---- Scene 4: the retro, prepared in the Space
  retro: {
    kicker: "SCENE 4 · THE RETRO, PREPARED IN THE SPACE",
    title: "The team answers before the retro, and Orbit pulls the sprint together.",
    line: "So the retro starts with what happened, instead of the team trying to remember it.",
    space: "Product Sprint 4.4",
    sprint: "Sprint 3.6",
    sprintStatus: "Retro on Friday",
    ask: "Ask Orbit for a sprint summary",
    button: "Summarize the sprint",
    coach: { title: "Ask Orbit", text: "Get the sprint summary" },
    prompts: ["Summarize how this sprint went", "What slowed us down?"],
    docCard: {
      title: "Sprint 3.6 retro",
      words: "412 words",
      wordsAfter: "578 words",
      time: "2 days ago",
      timeAfter: "just now",
      by: "Aditi",
      byAfter: "Aditi, updated by Orbit",
    },
    newCard: { title: "New", meta: "Document" },
    asker: "Aditi · just now",
    summaryFootnote: "Drawn from the retro doc and 11 tasks in this Space",
    actionsCount: 3,
    summary: {
      intro: "<b>Sprint 3.6 summary</b>, from the retro answers and the work in this Space:",
      items: [
        "<b>Shipped:</b> 9 of 11 tasks. Saved views and CSV export moved to next sprint.",
        "<b>Slowed down:</b> filters waited two days on the empty-state design decision. QA test cases changed late on two tasks.",
        "<b>Went well:</b> decisions made on the task were faster than setting up a meeting, and people who missed standup could catch up on their own.",
        "<b>Worth discussing:</b> getting design input before implementation starts, and agreeing test cases earlier.",
      ],
    },
    addTitle: "Aditi asks Orbit to add the summary to the retro doc.",
    addLine: "So the team walks into the retro with the summary already in the doc they’ll use.",
    typingAsk: "Aditi is typing…",
    request: "Can you add this summary to the retro doc?",
    readyAsk: "Message ready",
    readyButton: "Send it",
    sendCoach: { title: "Send it", text: "Ask Orbit to add it to the doc" },
    replyingAsk: "Orbit is replying…",
    confirm: "I can draft this into the doc and add it as a new section. Want me to proceed?",
    confirmYes: "Yes, Continue",
    confirmNo: "Cancel",
    confirmAsk: "Confirm in Orbit’s panel",
    confirmButton: "Yes, continue",
    confirmCoach: { title: "Confirm", text: "Let Orbit add it to the doc" },
    adding: "Adding to the doc…",
    added: "Done. I added <b>Sprint 3.6 summary</b> as a new section in the <b>Sprint 3.6 retro</b> doc.",
    openDoc: "Open the doc",
    addedAsk: "The doc is updated",
    addedButton: "Open the retro doc",
    docCoach: { title: "Updated just now", text: "Open the retro doc" },
    doc: {
      title: "Sprint 3.6 retro",
      meta: "Aditi · answers added before the meeting",
      newSection: "NEW SECTION · ADDED BY ORBIT",
      sections: [
        { h: "What slowed us down?", p: "<b>Kofi:</b> Waited on the filters empty state. <b>Rosa:</b> Test cases changed late." },
        { h: "What went well?", p: "<b>Tobi:</b> Deciding on the task was faster than a meeting. <b>Sam:</b> Easy to catch up on what I missed." },
        { h: "What should we change?", p: "<b>Kofi:</b> Get design input before implementation starts." },
      ],
    },
    doneAsk: "The retro starts from what happened, with the summary already in the doc.",
    doneButton: "See your result",
  },

  // ---- Results
  results: {
    usual: "The usual way",
    ours: "Aditi’s way",
    rows: [
      { label: "Conversations Aditi carried between", usual: 2, ours: 0 },
      { label: "Questions routed back through Aditi", usual: 1, ours: 0 },
      { label: "Decision recorded on the task", usual: "No", ours: "Yes" },
      { label: "Retro starts with", usual: "Remembering", ours: "A summary" },
    ] as { label: string; usual: number | string; ours: number | string }[],
    note: "When the update, the discussion, and the decision stay on the same task, people get the context themselves instead of through the PM.",
    proof: [
      { big: "~2 hours", text: "Saved per sprint by moving standups async. Aditi’s estimate, from a team that used to meet for 30 minutes several times a week." },
    ],
    quote: {
      kicker: "HOW ADITI WORKS NOW",
      text: "Routine updates happen async on the work. When a blocker needs design and engineering, both conversations happen on the same task. Retros start from Orbit’s summary, and when a blocker needs a live conversation, she schedules it from the task.",
    },
  },
};
