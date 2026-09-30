/**
 * Engineering path: AJ picks up a task.
 * Inline tags: <hl>…</hl> highlight, <b>…</b> bold, <mention>…</mention> @mention.
 *
 * Each step has a scene header (kicker, title, line) and a bottom bar (ask = the status
 * text on the left, button = the one primary button).
 */

export const people = {
  aj: { initials: "AJ", name: "AJ", color: "#9585E6" },
  priya: { initials: "PR", name: "Priya", color: "#F4B942" },
  marcus: { initials: "MK", name: "Marcus", color: "#9585E6" },
  sam: { initials: "SL", name: "Sam", color: "#9FD8B4" },
  dana: { initials: "DN", name: "Dana", color: "#F4B942" },
};

type P = keyof typeof people;

export const engineering = {
  id: "engineering" as const,
  totalScenes: 4,
  resultsTitle: "You explored how AJ <hl>picks up a task</hl> in Quely.",

  meter: {
    title: "CONTEXT COST",
    max: 15,
    maxLabel: "15 min",
    unit: " min",
    label: "spent before you can start",
    tabs: "Tabs opened",
    pings: "People interrupted",
    over: "Over the limit",
  },

  // ---- Scene 1: the ticket and the Slack thread behind it
  start: {
    kicker: "SCENE 1 · YOU PICK UP A TICKET",
    title: "You’ve picked up the ticket, but most of the context is buried in a Slack thread.",
    line: "You are AJ, an engineer assigned a ticket. The team had already discussed the issue, ruled out a few options, and agreed on an approach before you joined. Now you have to reconstruct that before you can start.",
    ask: "Where would you normally start?",
    button: "Hunt for the context",
  },
  slack: {
    label: "SLACK · #MOBILE-BUGS · 2 WEEKS AGO",
    messages: [
      { who: "priya", text: "Seeing double pushes on Android again. Anyone else?", time: "9:02" },
      { who: "marcus", text: "Same on iOS. Only when the app is in the background.", time: "9:05" },
      { who: "sam", text: "Could it be the notification provider?", time: "9:11" },
      { who: "marcus", text: "Checked the provider logs. Clean, so it’s not them.", time: "10:40" },
      { who: "priya", text: "Repro: background the app, weak network, send a mention.", time: "11:15" },
      { who: "dana", text: "Settings screen from the v3 design isn’t involved, tested it.", time: "13:02" },
      { who: "priya", text: "Pretty sure the client retry fires after the server already sent it.", time: "14:20" },
      { who: "marcus", text: "Agreed. Let’s dedupe on the server by notification ID.", time: "14:31" },
      { who: "sam", text: "Can someone make a ticket for this?", time: "14:33" },
    ] as { who: P; text: string; time: string }[],
    more: "+ 51 more messages, a design review, and a standup",
    funnel: "most of the context isn’t in the ticket",
  },
  ticket: {
    label: "WHAT MADE IT INTO THE TICKET",
    id: "COL-31",
    title: "Fix duplicate push notifications on mobile",
    body: "Some users get the same notification twice. See Slack.",
    meta: "Assigned to you · picked up 2 weeks later",
  },

  // ---- Scene 2: the tab hunt (the only step with the meter)
  hunt: {
    kicker: "SCENE 2 · THE WORK BEFORE THE WORK",
    title: "The context you need to execute is in multiple tools. Open each of them and try to piece together the context you need.",
    line: "Doing this costs you time. Keep an eye on the meter below to see how much.",
    hint: "Click each tab to read it · ",
    readOf: (n: number) => `${n} of 5`,
    hintSuffix: " read",
    open: "Click to open",
    read: "Read ✓",
    ask: (n: number) => `${n} of 5 tabs read`,
    button: "Open the next tab",
    doneAsk: (min: number) => `${min} minutes in, and you still don’t know what was decided.`,
    doneButton: "Now see the same ticket in Quely",
  },
  // icon: slack | figma | jira | doc. minutes = cost added to the meter. dm = interrupts someone.
  tabs: [
    { icon: "slack", title: "Slack · #mobile-bugs", body: "60 messages. Someone mentions the retry logic. Was it decided?", minutes: 4 },
    { icon: "figma", title: "Figma · Notification settings", body: "Is v3 the current version? Nothing says.", minutes: 3 },
    { icon: "jira", title: "Jira · COL-31 comments", body: "One comment: “see Slack.”", minutes: 2 },
    { icon: "doc", title: "Docs · Investigation notes", body: "Some checks listed. No conclusion written down.", minutes: 4 },
    { icon: "slack", title: "Slack · DM to Priya", body: "“Hey, quick one about the notification bug…”", minutes: 3, dm: true },
  ] as { icon: "slack" | "figma" | "jira" | "doc"; title: string; body: string; minutes: number; dm?: boolean }[],
  huntQuote: {
    quote: "“Context hunting between Slack, Figma, and other apps.”",
    note: "AJ estimates this took him 15 to 20 minutes per task, before he could start the work.",
  },

  // ---- The same ticket in Quely
  task: {
    spaces: ["Mobile Sprint 2.3", "Notifications", "Web Sprint 4.1"],
    activeSpace: 1,
    space: "Notifications",
    id: "COL-31",
    title: "Fix duplicate push notifications on mobile",
    summary: "Some users get the same push notification twice. The team discussed the cause in Slack and looked at it in last week’s standup.",
    attachments: [
      { icon: "slack", title: "Slack thread · #mobile-bugs", note: "Where the bug was first discussed" },
      { icon: "figma", title: "www.figma.com", note: "Notification settings, v3" },
      { icon: "doc", title: "docs.google.com", note: "Investigation notes" },
      { icon: "rec", title: "Standup recording · 12 min", note: "Retry logic discussion" },
    ] as { icon: "slack" | "figma" | "doc" | "rec"; title: string; note: string }[],
  },
  threads: [
    { who: "priya", time: "2 weeks ago", text: "Pretty sure it’s the client retry firing after the server already sent it.", votes: 2, replies: 4 },
    { who: "marcus", time: "1 week ago", text: "Adding the investigation doc and the standup recording here.", votes: 1, replies: 0 },
  ] as { who: P; time: string; text: string; votes: number; replies: number }[],
  threadActions: { resolve: "✓ Resolve ▾" },

  inQuely: {
    kicker: "SCENE 2 · THE SAME TICKET, IN QUELY",
    title: "The Slack thread, design, notes, and recording <hl>are already on the task.</hl>",
    line: "Nothing to hunt for. The next question is what it all means. Try asking Orbit.",
    ask: "Next: ask Orbit what was decided",
    button: "Ask Orbit",
    coach: { title: "Start here", text: "Click Ask Orbit to get a summary of the work" },
  },

  // ---- Scene 3: ask Orbit
  orbit: {
    kicker: "SCENE 3 · FINDING IT ISN’T KNOWING IT",
    title: "Ask Orbit what the team already worked out.",
    line: "Orbit answers from the discussions, meetings, and files in this Space. Pick a question.",
    ask: "Pick any question in Orbit’s panel",
    button: "Ask: what did we decide?",
    coach: { title: "Pick a question", text: "Any of these works" },
    answeredAsk: "Got the answer",
    answeredButton: "Keep going",
    actionsCount: 4,
    qa: [
      {
        q: "What did we decide about the fix?",
        a: "From the Slack thread and the standup recording, the team agreed to deduplicate on the server using the notification ID. The client retry stays as it is.",
      },
      {
        q: "What has already been ruled out?",
        a: "From the investigation notes: it isn’t the notification provider, and it isn’t the settings screen in the v3 design. Both were checked last week.",
      },
      {
        q: "What are the steps to reproduce it?",
        a: "From the Slack thread: put the app in the background, switch to a weak network, then trigger a mention. The retry fires before the first delivery is confirmed.",
      },
    ],
  },

  // ---- Scene 4: a question comes up
  blocker: {
    kicker: "SCENE 4 · A QUESTION COMES UP",
    title: "While building, AJ hits a snag. He needs an answer before he can proceed.",
    line: "He starts where he’s been getting answers: Orbit.",
    ask: "Ask Orbit first",
    button: "Ask Orbit",
    coach: { title: "Ask Orbit", text: "See if the answer is already in the Space" },
    banner: {
      kicker: "WHILE BUILDING, AJ HITS A QUESTION",
      question: "“Does the fix need to cover web notifications too?”",
      note: "The answer changes the scope of the fix.",
    },
  },
  orbitMiss: {
    question: "Does the fix need to cover web notifications too?",
    asker: "AJ · just now",
    checking: "Orbit is checking the Space…",
    answer: "I couldn’t find anything about web notifications in this Space. The discussions and files only cover mobile.",
    doneTitle: "The answer isn’t in the Space yet, so Orbit says so.",
    doneAsk: "No one has answered this yet.",
    doneButton: "Ask Priya on the task",
  },
  askPriya: {
    kicker: "SCENE 4 · ASK ON THE TASK",
    title: "AJ asks Priya right on the task.",
    line: "Her answer stays with the work, so Orbit and the next engineer can find it too.",
    typingAsk: "AJ is typing…",
    mention: "@Priya",
    message: " Does the fix need to cover web notifications too?",
    readyAsk: "Message ready",
    readyButton: "Send it",
    coach: { title: "Send it", text: "Post the question on the task" },
    replyingAsk: "Priya is replying…",
    reply: "Mobile only for now. Web uses a different service. Happy to walk through the retry code if useful.",
    doneAsk: "This one is worth a quick call.",
    doneButton: "Schedule 15 min with Priya",
  },
  schedule: {
    kicker: "SCENE 4 · MEET WHEN IT’S WORTH IT",
    title: "Book the call from the task.",
    line: "Pick a time. Orbit records it, and the notes come back to the Space.",
    ask: "Pick a time in the panel",
    button: "Schedule",
    buttonWithTime: (t: string) => `Schedule for ${t}`,
    coach: { title: "Pick a time", text: "Then hit Schedule" },
    coachGo: { title: "Now schedule it", text: "" },
    panel: {
      heading: "Schedule Meeting",
      titleLabel: "Title",
      title: "Web and mobile scope",
      where: "Google Meet ▾",
      length: "15 minutes ▾",
      participantsLabel: "Participants",
      participant: "priya" as P,
      dateLabel: "Date",
      days: [
        { day: "Mon", date: "28" },
        { day: "Tue", date: "29" },
      ],
      allParticipants: "● All participants",
      timeLabel: "Select time (Sep 28)",
      slots: ["9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"],
      recording: "Orbit Recording",
      submit: "Schedule",
    },
    afterThreads: [
      { who: "aj" as P, time: "today", text: "<mention>@Priya</mention> Does the fix need to cover web notifications too?" },
      { who: "priya" as P, time: "today", text: "Mobile only for now. Web uses a different service." },
    ],
    notes: {
      label: "MEETING NOTES · ORBIT",
      text: "Scope confirmed: mobile only. Deduplicate on the server by notification ID.",
    },
    doneAsk: "Everything you learned stays with the task.",
    doneButton: "See your result",
  },

  // ---- Results
  results: {
    usual: "The usual way",
    ours: "AJ’s way",
    // "usual" values come from the tab hunt: minutes and tabs from the tabs above, DMs as interruptions.
    rows: {
      minutes: { label: "Minutes spent finding context", ours: 3 },
      tabs: { label: "Tabs opened", ours: 0 },
      pings: { label: "People interrupted", ours: 0 },
    },
    note: "The extra minutes, tabs, and interruptions came from hunting across tools for context the team had already worked out.",
    proof: [
      { big: "15–20 min", text: "AJ’s estimate of the context hunting per task before Quely" },
      { big: "~80%", text: "AJ’s estimate of how many fewer meetings he attends now" },
    ],
    quote: {
      kicker: "HOW AJ WORKS NOW",
      text: "Standups are async, parts of sprint planning happen without a call, and retros are recorded in Quely. When a blocker needs a real conversation, he schedules time with the right person.",
    },
  },
};

export type EngineeringContent = typeof engineering;
