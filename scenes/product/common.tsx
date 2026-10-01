"use client";

import { product as E, people } from "@/content/product";
import type { TaskConfig } from "@/components/quely/QuelyApp";
import type { ThreadMsg } from "@/components/quely/ThreadsPanel";

export { E, people };

export const TASK: TaskConfig = E.task;

export function msg(who: keyof typeof people, time: string, text: string): ThreadMsg {
  const p = people[who];
  return { person: p, role: p.role, time, text };
}
