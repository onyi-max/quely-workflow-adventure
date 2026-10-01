"use client";

import type { ReactNode, Ref } from "react";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";
import { useEntered } from "@/lib/motion";
import { ToolIcon, type ToolIconKind } from "./ToolIcon";

export type Attachment = { icon: ToolIconKind; title: string; note: string };

export type TaskConfig = {
  spaces: string[];
  activeSpace: number;
  space: string;
  id: string;
  title: string;
  summary: string;
  attachments: Attachment[];
  tab?: string;
};

export function Sidebar({ spaces, active }: { spaces: string[]; active: number }) {
  const c = quelyChrome;
  return (
    <aside className="qside">
      <img src={IMG.logo} alt="Quely" className="qlogo" />
      <div className="qorg">
        <span className="qorgdot" />
        <div>
          <b>{c.org}</b>
          <small>{c.orgLabel}</small>
        </div>
      </div>
      <div className="qsearch">{c.search}</div>
      {c.navTop.map((n) => (
        <div key={n} className={n === c.activeNav ? "qnav on" : "qnav"}>
          {n}
        </div>
      ))}
      {spaces.map((s, i) => (
        <div key={s} className={i === active ? "qsub on" : "qsub"}>
          {s}
        </div>
      ))}
      {c.navBottom.map((n) => (
        <div key={n} className="qnav">
          {n}
        </div>
      ))}
    </aside>
  );
}

export function Attachments({ rows }: { rows: Attachment[] }) {
  return (
    <div className="qatt" id="qatt">
      {rows.map((r) => (
        <div className="qrow" key={r.title + r.note}>
          <ToolIcon kind={r.icon} />
          <div>
            <b>{r.title}</b>
            <small>{r.note}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Task card: id + title, description, tabs, attachments. */
export function TaskCard({ task }: { task: TaskConfig }) {
  const c = quelyChrome;
  const tab = task.tab ?? c.tabs[0];
  return (
    <>
      <div className="qtask">
        <span className="qid">{task.id}</span>
        <b>{task.title}</b>
      </div>
      <div className="qdesc">
        <small>{c.descriptionLabel}</small>
        <b>{c.summaryLabel}</b>
        <p>{task.summary}</p>
      </div>
      <div className="qtabs">
        {c.tabs.map((x) => (
          <span key={x} className={x === tab ? "on" : ""}>
            {x}
            {x === c.tabs[0] ? (
              <>
                {" "}
                <i id="attN">{task.attachments.length}</i>
              </>
            ) : null}
          </span>
        ))}
      </div>
      <Attachments rows={task.attachments} />
    </>
  );
}

/**
 * The Quely app frame: sidebar, main column, right panel.
 * `enter` plays the scale-in (when Quely first appears in a step, as the prototype does).
 * `carried` means it stayed on screen from the previous step, so attachments don't pop in
 * again; it defaults to `!enter`.
 */
export function QuelyApp({
  task,
  main,
  right,
  enter = false,
  carried = !enter,
  rightRef,
  rightClassName,
}: {
  task: TaskConfig;
  /** Replaces the task card (e.g. a document section). */
  main?: ReactNode;
  right: ReactNode;
  enter?: boolean;
  carried?: boolean;
  rightRef?: Ref<HTMLElement>;
  rightClassName?: string;
}) {
  const shown = useEntered(!enter);
  const c = quelyChrome;
  return (
    <div className={"qapp" + (shown ? " in" : "") + (carried ? " carried" : "")} id="qapp">
      <Sidebar spaces={task.spaces} active={task.activeSpace} />
      <main className="qmain">
        <div className="qtop">
          <span className="qcrumb">
            {c.crumbHome} <i>/</i> {task.space}
          </span>
          <span className="qtimer">{c.timer}</span>
        </div>
        {main ?? <TaskCard task={task} />}
        <div className="qnavbar">
          <span>←</span>
          <b>{c.pager}</b>
          <span>→</span>
          <em>{task.title}</em>
        </div>
      </main>
      <section className={"qright" + (rightClassName ? " " + rightClassName : "")} id="qright" ref={rightRef}>
        {right}
      </section>
    </div>
  );
}
