"use client";

import type { ReactNode } from "react";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";

export function OrbitBackBar({ label = quelyChrome.backToThreads, onClick }: { label?: string; onClick?: () => void }) {
  return (
    <div className="qrhead">
      <span className="qback" onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
        {label}
      </span>
    </div>
  );
}

export function OrbitActions({ count }: { count: number }) {
  return (
    <div className="qactions">
      ✦ <b>{quelyChrome.actions}</b> <i>{count}</i> <u>{quelyChrome.beta}</u>
    </div>
  );
}

export function OrbitAskBox() {
  const c = quelyChrome;
  return (
    <div className="qask">
      <span>{c.addTool}</span>
      <span>{c.lenses}</span>
      <small>{c.askPlaceholder}</small>
    </div>
  );
}

/**
 * Orbit's Actions bar plus a question box with a send button. While `typed` is set, the
 * box shows the text being typed with a caret; `ready` lights the send button.
 */
export function OrbitComposeBox({
  actions,
  typed,
  ready,
  onSend,
}: {
  actions: number;
  typed?: string | null;
  ready?: boolean;
  onSend?: () => void;
}) {
  const typing = typed !== undefined && typed !== null;
  return (
    <>
      <OrbitActions count={actions} />
      <div className={"qask" + (typing ? " typing" : "")} id="oask">
        <span>{quelyChrome.addTool}</span>
        <small id="oin">
          {typing ? (
            <>
              {typed}
              <i className="caret" />
            </>
          ) : (
            quelyChrome.askPlaceholder
          )}
        </small>
        <button className={"qsend" + (ready ? " ready" : "")} id="osend" aria-label="Send" onClick={ready ? onSend : undefined}>
          ➤
        </button>
      </div>
    </>
  );
}

export type Prompt = { label: string; done?: boolean; id?: string };

/** Orbit home: mascot, greeting, a list of prompt buttons. */
export function OrbitHome({
  prompts,
  onPick,
  sectionLabel = quelyChrome.suggested,
  actions,
  askBox = true,
}: {
  prompts: Prompt[];
  onPick: (i: number) => void;
  sectionLabel?: string;
  /** Number shown on the Actions bar; omit to hide the bar. */
  actions?: number;
  askBox?: boolean;
}) {
  return (
    <>
      <OrbitBackBar />
      <div className="orbhome">
        <img src={IMG.orbit} alt="Orbit" />
        <b>{quelyChrome.orbitHello}</b>
        <div className="sp">{sectionLabel}</div>
        {prompts.map((p, i) => (
          <button
            key={i}
            className={"prompt" + (p.done ? " done" : "")}
            data-q={i}
            id={p.id}
            onClick={() => onPick(i)}
          >
            {p.done ? "✓ " : ""}
            {p.label}
          </button>
        ))}
      </div>
      {actions !== undefined ? <OrbitActions count={actions} /> : null}
      {askBox ? <OrbitAskBox /> : null}
    </>
  );
}

/** A question the visitor asked, right-aligned, with its timestamp line. */
export function OrbitQuestion({ text, meta }: { text: string; meta: string }) {
  return (
    <>
      <div className="orbq">{text}</div>
      <div className="orbt">{meta}</div>
    </>
  );
}

/** Orbit's answer card. */
export function OrbitAnswer({ children, footnote }: { children: ReactNode; footnote?: string }) {
  return (
    <div className="orba">
      <img src={IMG.orbitHead} alt="" />
      {typeof children === "string" ? <p>{children}</p> : children}
      {footnote ? <span className="rm">{footnote}</span> : null}
    </div>
  );
}
