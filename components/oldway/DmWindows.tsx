"use client";

import { useLayoutEffect, useRef } from "react";
import { QAvatar, type Person } from "@/components/ui/Avatar";
import { prefersReducedMotion } from "@/lib/motion";

export type DmMessage = { person: Person; time: string; text: string };

/** A plain chat window (a neutral stand-in, not Slack's own UI). */
export function ChatWindow({ title, messages }: { title: string; messages: DmMessage[] }) {
  return (
    <div className="chat solo">
      <div className="chmain">
        <div className="chhead">
          <b>{title}</b>
        </div>
        <div className="chmsgs">
          {messages.map((m, i) => (
            <div className="chmsg" key={i}>
              <QAvatar person={m.person} />
              <div>
                <b>{m.person.name}</b> <small>{m.time}</small>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConsequenceCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="conseq row3">
      {items.map((c, i) => (
        <div className="cq" key={c.title}>
          <span className="cn">{i + 1}</span>
          <div>
            <b>{c.title}</b>
            <small>{c.text}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Two DM conversations with the PM carrying the answer between them, and what that costs.
 * Messages and cards fade in one after another unless `instant`.
 */
export function DmWindows({
  oldTag,
  label,
  relay,
  dms,
  consequences,
  instant,
}: {
  oldTag: string;
  label: string;
  relay: string;
  dms: { label: string; title: string; messages: DmMessage[] }[];
  consequences: { title: string; text: string }[];
  instant?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Stagger: each message and card gets an increasing transition delay, then `show`.
  useLayoutEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(".pafter .chmsg, .pafter .cq") ?? [];
    const reduce = prefersReducedMotion() || instant;
    els.forEach((e, i) => {
      e.style.transitionDelay = (reduce ? 0 : i * 0.16) + "s";
    });
    if (!instant) void ref.current?.offsetWidth;
    els.forEach((e) => e.classList.add("show"));
  }, [instant]);

  return (
    <div className="dmwin show" ref={ref}>
      <div className="chead">
        <span className="oldtag">{oldTag}</span>
        <span className="kick">{label}</span>
      </div>
      <div className="pafter">
        <div className="convos">
          <div>
            <div className="plab mono">{dms[0].label}</div>
            <ChatWindow title={dms[0].title} messages={dms[0].messages} />
          </div>
          <div className="relayarrow" aria-hidden="true">
            <span className="hand">{relay}</span>
            <svg viewBox="0 0 60 30" width="60" height="30">
              <path d="M4 15h48M42 6l10 9-10 9" fill="none" stroke="#5B2BB5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="plab mono">{dms[1].label}</div>
            <ChatWindow title={dms[1].title} messages={dms[1].messages} />
          </div>
        </div>
        <ConsequenceCards items={consequences} />
      </div>
    </div>
  );
}
