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
    doneButton: "See what it takes",
  },

  // ---- Scene 2: after standup, the usual way
  after: {
    kicker: "SCENE 2 · AFTER STANDUP, THE USUAL WAY",
    title: "After standup, the follow-up work begins.",
    line: "The issue needs the designer first, then the engineer. A call would mean finding time on two calendars for a quick decision, so Aditi does what most PMs do: she messages each of them.",
    oldTag: "THE USUAL WAY",
    relay: "Aditi carries it over",
    // <mark> highlights what gets lost between the two conversations.
    dms: [
      {
        label: "1 · SLACK DM WITH TOBI, DESIGNER",
        title: "Tobi",
        messages: [
          { who: "aditi", time: "9:40", text: "Kofi’s blocked on the filters empty state. What should it show?" },
          { who: "tobi", time: "10:05", text: "A “No results” message with a Clear filters button. <mark>Keep it inline, not a modal.</mark>" },
        ],
      },
      {
        label: "2 · SLACK DM WITH KOFI, ENGINEER",
        title: "Kofi",
        messages: [
          { who: "aditi", time: "10:12", text: "Talked to Tobi. Show “No results” with a Clear filters button." },
          { who: "kofi", time: "10:30", text: "<mark>Inline or a modal?</mark> And does it apply to saved filters too?" },
          { who: "aditi", time: "10:31", text: "Let me check with Tobi…" },
        ],
      },
    ] as { label: string; title: string; messages: { who: P; time: string; text: string }[] }[],
    consequences: [
      { title: "Aditi carries the answer between them", text: "She has to pass on everything Tobi says, and check back when Kofi asks more." },
      { title: "Kofi gets her summary, not the discussion", text: "Tobi already said inline. It didn’t make it into Aditi’s message." },
      { title: "None of it is on the task", text: "The decision is in two different DMs." },
    ],
    doneAsk: "Kofi is still blocked, waiting on Aditi.",
    doneButton: "See how Aditi handles this in Quely",
  },

  // ---- Scene 3: the same blocker, in Quely (three steps)
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
  scene3Kicker: "SCENE 3 · THE SAME BLOCKER, IN QUELY",
  threadLabel: "ASYNC STANDUP UPDATES ON THIS TASK",
  update: { who: "kofi" as P, time: "9:05", text: "Update: API for the filters is done. Blocked on the empty state, need a design decision." },

  // Step 1: what a Space is, with two numbered callouts.
  spaceIntro: {
    title: "Aditi creates a Space.",
    line: "A Space is a collection of tasks. Each work item has its own home, called a unit. The unit has threads for every conversation about the work, so conversations and supporting assets like designs, docs, and links are in one place. Everyone on the team shares their updates there, where they’re visible to everyone.",
    callouts: [
      { n: "1", title: "Supporting assets", text: "Designs, docs, and links for this work" },
      { n: "2", title: "Threads", text: "Conversations about this work" },
    ],
    ask: "This is a Space in Quely",
    button: "Got it",
  },

  // Step 2: Orbit checks the updates for blockers.
  orbitCheck: {
    title: "Aditi asks Orbit if anyone needs help.",
    line: "Instead of reading every standup update, Aditi asks Orbit to check them for blockers.",
    prompts: ["Is there any blocker, or anything I need to help the team with?", "What changed since yesterday?"],
    ask: "Ask Orbit about the standup updates",
    button: "Ask Orbit",
    coach: { title: "Ask Orbit", text: "Check the updates for blockers" },
    asker: "Aditi · just now",
    answer: "One blocker. Kofi is blocked on the filters empty state and needs a design decision before he can continue. Everything else in this sprint is on track.",
    doneAsk: "Orbit found the blocker.",
    doneButton: "Bring in the designer",
  },

  // Step 3: Aditi tags Tobi; the designer and engineer sort it out in the thread.
  tag: {
    title: "Aditi tags Tobi on the unit.",
    line: "Tobi is already part of this Space, so Tobi sees the tag and answers in the thread. Kofi follows up with Tobi directly.",
    typingAsk: "Aditi is typing…",
    mention: "@Tobi",
    message: " can you weigh in on the empty state here?",
    sentTime: "9:20",
    readyAsk: "Message ready",
    readyButton: "Send it",
    coach: { title: "Send it", text: "Tag Tobi in the thread" },
    replyingAsk: "The team replies on the task…",
    // Each reply: who types, how long they type (ms), then the message.
    replies: [
      { who: "tobi", typing: 1200, time: "9:34", text: "A “No results” message with a Clear filters button. Keep it inline, not a modal." },
      { who: "kofi", typing: 1100, time: "9:41", text: "Got it. Does it apply to saved filters too?" },
      { who: "tobi", typing: 1000, time: "9:45", text: "Yes, same state for saved filters." },
    ] as { who: P; typing: number; time: string; text: string }[],
    note: { label: "VISIBLE TO EVERYONE ON THIS UNIT", text: "Kofi read Tobi’s answer and asked his follow-up directly. Aditi didn’t need to play middle man." },
    doneAsk: "One thread, no relay.",
    doneButton: "Continue to the retro",
  },

  // ---- Scene 4: the retro (three steps)
  retro: {
    kicker: "SCENE 4 · THE RETRO",
    space: "Sprint 3.6 playbook",
    spaces: ["Sprint 3.6 playbook", "Sprint 3.7 playbook", "Marketing Sprint 1.0"],
    sprintStatus: "Retro on Friday",
    threadsLabel: "RETRO THREADS",
    asker: "Aditi · just now",
    actionsCount: 3,
    docCard: { title: "Sprint 3.6 retro", words: "412 words", time: "2 days ago", by: "Aditi" },
    newCard: { title: "New", meta: "Document" },
    doc: {
      title: "Sprint 3.6 retro",
      meta: "Aditi · the team added answers before the meeting",
      newSection: "NEW SECTION · ADDED BY ORBIT",
      sections: [
        { h: "What went well?", p: "<b>Tobi:</b> Deciding on the task was faster than a meeting. <b>Sam:</b> Easy to catch up on what I missed." },
        { h: "What didn’t go well?", p: "<b>Kofi:</b> Waited on the filters empty state. <b>Rosa:</b> Test cases changed late." },
        { h: "What should we change?", p: "<b>Kofi:</b> Get design input before implementation starts." },
        { h: "What will we commit to next sprint?", p: "<b>Rosa:</b> Agree test cases before a task moves to development." },
      ],
    },

    // Step 1: the answers are already in the doc.
    answers: {
      title: "The team answers the retro questions before the meeting.",
      line: "Aditi adds the four standard retro questions to a doc in the sprint’s playbook. Everyone writes their answers there ahead of time, instead of in a meeting.",
      ask: "The team has answered",
      button: "Open the retro doc",
      coach: { title: "The retro doc", text: "Click to open it" },
      openedAsk: "Some answers are short. Orbit can dig into them.",
      openedButton: "Ask Orbit to follow up",
    },

    // Step 2: Orbit asks follow-up questions in the threads.
    followUps: {
      title: "Orbit asks follow-up questions.",
      line: "Some answers say what happened, but not why. Orbit asks each person a follow-up question in the threads.",
      request: "Can you follow up on the team’s answers?",
      reading: "Orbit is reading the answers…",
      intro: "A few answers could go deeper. I’ll ask:",
      questions: [
        { who: "@Tobi", text: "You said deciding on the task was faster than a meeting. What made it faster this time?" },
        { who: "@Rosa", text: "What caused the test cases to change late, and when did you find out?" },
        { who: "@Kofi", text: "When would design input have saved you the wait on the empty state?" },
      ],
      send: "Ask the team",
      edit: "Edit",
      ask: "Send Orbit’s questions to the team",
      button: "Ask the team",
      coach: { title: "Ask the team", text: "Post the follow-ups in the threads" },
      orbitName: "Orbit",
      orbitRole: "AI",
      replyingAsk: "The team replies…",
      reply: { who: "tobi" as P, text: "Kofi’s update and the Figma file were on the same unit, so I could answer without asking for context first." },
      doneAsk: "Now the retro has the why, not just the what.",
      doneButton: "Ask Orbit about the sprint",
    },

    // Step 3: Orbit summarizes the sprint, then adds it to the doc.
    summaryStep: {
      title: "Orbit summarizes the sprint for Aditi.",
      line: "Aditi asks how the sprint went, where the team lagged, and how she can help. Orbit answers from everything in the playbook.",
      request: "How did this sprint go? Where did we lag, and what could I do better to help the team?",
      analyzing: "Orbit is analyzing the sprint…",
      footnote: "Drawn from the retro doc, the threads, and 11 tasks in this playbook",
      typingAsk: "Aditi is typing…",
      addRequest: "Can you add this summary to the retro doc?",
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
      doneAsk: "With the answers and the summary in the doc, the team may not need a retro meeting at all.",
      doneButton: "See your result",
    },
    summary: {
      intro: "<b>Sprint 3.6 summary</b>, from the retro answers and the work in this playbook:",
      items: [
        "<b>Progress:</b> 9 of 11 tasks shipped. Saved views and CSV export moved to next sprint.",
        "<b>Where we lagged:</b> filters waited two days on the empty-state design decision. QA test cases changed late on two tasks.",
        "<b>What you could do to help:</b> bring design in as soon as a blocker needs a design decision, and agree test cases before work moves to development.",
      ],
    },
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
