"use client";

import type { ReactNode } from "react";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";
import { rich } from "@/components/ui/Rich";
import { QAvatar, type Person } from "@/components/ui/Avatar";
import { useShow } from "@/lib/motion";

export type ThreadMsg = {
  person: Person;
  time: string;
  text: string;
  role?: string;
  votes?: number;
  replies?: number;
  mine?: boolean;
};

export function AskOrbitButton({ onClick, pulse = true }: { onClick?: () => void; pulse?: boolean }) {
  return (
    <button className="askorbit" id={pulse ? "askOrbit" : undefined} onClick={onClick}>
      <img src={IMG.orbitHead} alt="" />
      {quelyChrome.askOrbit}
    </button>
  );
}

export function Thread({ m, resolveLabel }: { m: ThreadMsg; resolveLabel?: string }) {
  return (
    <div className={m.mine ? "qthread mine" : "qthread"}>
      <div className="qwho">
        <QAvatar person={m.person} />
        <b>{m.person.name}</b>
        {m.role ? <em className="role">{m.role}</em> : null}
        <small>{m.time}</small>
      </div>
      <p>{rich(m.text)}</p>
      {m.votes !== undefined ? (
        <div className="qacts">
          <span>▲ {m.votes}</span>
          <span>{resolveLabel}</span>
          <span>💬 {m.replies ?? 0}</span>
        </div>
      ) : null}
    </div>
  );
}

export function TypingDots({ person }: { person: Person }) {
  return (
    <div className="typingdots">
      <QAvatar person={person} size={22} />
      {quelyChrome.typing(person.name)}
      <i />
      <i />
      <i />
    </div>
  );
}

/** Green "decision" note that lands in the thread (meeting notes, etc.). */
export function DecisionNote({ label, text, instant }: { label: string; text: string; instant?: boolean }) {
  const ref = useShow(instant);
  return (
    <div className="decision" ref={ref}>
      <b>{label}</b>
      {text}
    </div>
  );
}

/**
 * Composer. Idle shows the placeholder; while `typed` is set it shows the typed text with a
 * caret; `ready` lights the send button.
 */
export function Composer({
  typed,
  ready,
  onSend,
}: {
  typed?: ReactNode | null;
  ready?: boolean;
  onSend?: () => void;
}) {
  const typing = typed !== undefined && typed !== null;
  return (
    <div className={"qcompose" + (typing ? " typing" : "")}>
      <span className="qin">
        {typing ? (
          <>
            {typed}
            <i className="caret" />
          </>
        ) : (
          quelyChrome.composer
        )}
      </span>
      <button className={"qsend" + (ready ? " ready" : "")} aria-label="Send" onClick={ready ? onSend : undefined}>
        ➤
      </button>
    </div>
  );
}

/** The right-hand threads panel. `children` go after the threads, before the composer. */
export function ThreadsPanel({
  threads,
  resolveLabel,
  onAskOrbit,
  pulse,
  label,
  children,
  composer,
}: {
  threads: ThreadMsg[];
  resolveLabel?: string;
  onAskOrbit?: () => void;
  pulse?: boolean;
  /** Small mono label above the threads (e.g. "DESIGN DISCUSSION ON THIS TASK"). */
  label?: string;
  children?: ReactNode;
  composer?: ReactNode;
}) {
  return (
    <>
      <div className="qrhead">
        <AskOrbitButton onClick={onAskOrbit} pulse={pulse} />
      </div>
      <div className="qfilters">
        {quelyChrome.filters.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      {label ? <div className="mono dlbl">{label}</div> : null}
      {threads.map((m, i) => (
        <Thread key={i} m={m} resolveLabel={resolveLabel} />
      ))}
      {children}
      {composer ?? <Composer />}
    </>
  );
}
