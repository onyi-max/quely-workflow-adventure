"use client";

import { design as E, people } from "@/content/design";
import type { TaskConfig } from "@/components/quely/QuelyApp";
import type { ThreadMsg } from "@/components/quely/ThreadsPanel";
import { CollapsedTask } from "@/components/quely/DocumentSection";

export { E, people };

export const TASK: TaskConfig = E.task;

/** The design discussion as thread messages. */
export const DISCUSSION: ThreadMsg[] = E.discussion.messages.map((m) => {
  const p = people[m.who];
  return { person: p, role: "role" in p ? p.role : undefined, time: E.discussion.time, text: m.text };
});

/** The task header that sits above the document section in scene 4. */
export function TaskHeader() {
  return <CollapsedTask title={E.task.title} status={E.doc.taskStatus} />;
}
