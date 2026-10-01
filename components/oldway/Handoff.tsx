"use client";

import type { CSSProperties } from "react";
import { IMG } from "@/lib/paths";
import { useShow } from "@/lib/motion";

const LOGO: Record<"figma" | "jira" | "notion", { src: string; alt: string; style?: CSSProperties }> = {
  figma: { src: IMG.figma, alt: "" },
  jira: { src: IMG.jira, alt: "Jira", style: { height: 18 } },
  notion: { src: IMG.notion, alt: "" },
};

/** The handoff as the engineer receives it: file, ticket, specs, all ticked. */
export function HandoffPackage({
  label,
  items,
  looks,
  shownItems,
  looksShown,
}: {
  label: string;
  items: { logo: "figma" | "jira" | "notion"; label: string }[];
  looks: string;
  /** How many items have appeared so far. */
  shownItems: number;
  looksShown: boolean;
}) {
  return (
    <div className="card pkg">
      <div className="lbl">{label}</div>
      <ul>
        {items.map((it, i) => {
          const l = LOGO[it.logo];
          return (
            <li key={it.label} className={i < shownItems ? "show" : undefined}>
              <img src={l.src} alt={l.alt} style={l.style} />
              {it.label}
              <span className="ok">✓</span>
            </li>
          );
        })}
      </ul>
      <div className={"looks" + (looksShown ? " show" : "")}>{looks}</div>
    </div>
  );
}

/** One of Devon's DMs, slightly tilted, sliding in. */
export function QuestionCard({
  initials,
  color,
  name,
  text,
  tilt,
  call,
  instant,
}: {
  initials: string;
  color: string;
  name: string;
  text: string;
  tilt: string;
  call?: boolean;
  instant?: boolean;
}) {
  const ref = useShow(instant);
  return (
    <div className={"card q" + (call ? " callask" : "")} style={{ ["--r" as string]: tilt }} ref={ref}>
      <span className="av" style={{ background: color, width: 32, height: 32, fontSize: 12 }}>
        {initials}
      </span>
      <div>
        <b>{name}</b>
        <span>{text}</span>
      </div>
    </div>
  );
}
