"use client";

import { useEffect, useState } from "react";
import { QAvatar, type Person } from "@/components/ui/Avatar";
import { motionDelay } from "@/lib/motion";

export type PileMsg = { person: Person; text: string; time: string };

/**
 * A faded pile of old Slack-style messages (a neutral stand-in, not Slack's own UI).
 * Messages drift in one by one unless `instant`.
 */
export function SlackPile({
  label,
  messages,
  more,
  instant,
  quiet,
}: {
  label: string;
  messages: PileMsg[];
  more: string;
  instant?: boolean;
  /** Render the messages hidden, without animating them in (the pile is on its way out). */
  quiet?: boolean;
}) {
  const [shown, setShown] = useState(instant && !quiet ? messages.length : 0);
  useEffect(() => {
    if (instant || quiet) return;
    const timers = messages.map((_, i) => setTimeout(() => setShown((n) => Math.max(n, i + 1)), motionDelay(80 * i)));
    return () => timers.forEach(clearTimeout);
  }, [instant, quiet, messages]);

  return (
    <div className="slackpile">
      <div className="pilelbl mono">{label}</div>
      <div className="pile">
        {messages.map((m, i) => (
          <div key={i} className={"smsg" + (i < shown ? " show" : "")} style={{ ["--i" as string]: i }}>
            <QAvatar person={m.person} />
            <div>
              <b>
                {m.person.name} <small>{m.time}</small>
              </b>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pilenote">{more}</div>
    </div>
  );
}

/** Dashed funnel arrow with a handwritten note, between the pile and the ticket. */
export function Funnel({ note }: { note: string }) {
  return (
    <div className="funnel" aria-hidden="true">
      <svg viewBox="0 0 120 80" preserveAspectRatio="none">
        <path
          d="M4 8 C 60 8, 60 40, 112 40 M4 72 C 60 72, 60 40, 112 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path d="M104 32 L114 40 L104 48" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="hand">{note}</span>
    </div>
  );
}
