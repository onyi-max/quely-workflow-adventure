"use client";

import { engineering as E, people } from "@/content/engineering";
import type { TaskConfig } from "@/components/quely/QuelyApp";
import type { ThreadMsg } from "@/components/quely/ThreadsPanel";
import { SlackPile, Funnel } from "@/components/oldway/SlackPile";
import { JiraTicket } from "@/components/oldway/JiraTicket";

export { E, people };

export const TASK: TaskConfig = E.task;

export const THREADS: ThreadMsg[] = E.threads.map((t) => ({
  person: people[t.who],
  time: t.time,
  text: t.text,
  votes: t.votes,
  replies: t.replies,
}));

const PILE = E.slack.messages.map((m) => ({ person: people[m.who], text: m.text, time: m.time }));

/**
 * Scene 1's picture: the Slack pile, the funnel, and the thin ticket.
 * `leaving` renders it for the tab hunt: messages hidden, fading out (`gone`).
 */
export function TicketScene({ gone, leaving, instant }: { gone?: boolean; leaving?: boolean; instant?: boolean }) {
  return (
    <div className={"s1" + (gone ? " gone" : "")} id="s1">
      <SlackPile label={E.slack.label} messages={PILE} more={E.slack.more} instant={instant} quiet={leaving} />
      <Funnel note={E.slack.funnel} />
      <JiraTicket copy={E.ticket} />
    </div>
  );
}
