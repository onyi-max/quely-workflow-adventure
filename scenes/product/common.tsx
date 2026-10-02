"use client";

import type { ReactNode } from "react";
import { product as E, people } from "@/content/product";
import type { TaskConfig } from "@/components/quely/QuelyApp";
import { ThreadsPanel, type ThreadMsg } from "@/components/quely/ThreadsPanel";
import { CollapsedTask, DocView } from "@/components/quely/DocumentSection";
import { IMG } from "@/lib/paths";
import { quelyChrome } from "@/content/shared";
import { rich } from "@/components/ui/Rich";

export { E, people };

export const TASK: TaskConfig = E.task;

/** The sprint playbook Space used in scene 4. */
export const RETRO_TASK: TaskConfig = { ...E.task, space: E.retro.space, spaces: E.retro.spaces, activeSpace: 0 };

export function msg(who: keyof typeof people, time: string, text: string): ThreadMsg {
  const p = people[who];
  return { person: p, role: p.role, time, text };
}

/** Scene 3's threads panel: Kofi's standup update on the task, plus anything passed in. */
export function UpdatesPanel({ children, composer }: { children?: ReactNode; composer?: ReactNode }) {
  return (
    <ThreadsPanel
      threads={[msg(E.update.who, E.update.time, E.update.text)]}
      pulse={false}
      label={E.threadLabel}
      listId="pth"
      composer={composer}
    >
      {children}
    </ThreadsPanel>
  );
}

/** Orbit's sprint summary (in the Orbit panel and, later, in the doc). */
export function SprintSummary() {
  const s = E.retro.summary;
  return (
    <>
      <p>{rich(s.intro)}</p>
      <ul className="osum">
        {s.items.map((it) => (
          <li key={it}>{rich(it)}</li>
        ))}
      </ul>
    </>
  );
}

/** Scene 4's main column: the playbook header and the document section (`inner`). */
export function PlaybookMain({ children }: { children: ReactNode }) {
  return (
    <>
      <CollapsedTask title={E.retro.space} status={E.retro.sprintStatus} />
      <div className="qdocsec" id="rsec">
        {children}
      </div>
    </>
  );
}

/** The opened retro doc. With `summary`, Orbit's summary appears as a new section at the top. */
export function RetroDoc({ summary }: { summary?: boolean }) {
  const d = E.retro.doc;
  return (
    <DocView
      title={d.title}
      meta={d.meta}
      sections={d.sections}
      insert={
        summary ? (
          <div id="rsum" className="added">
            <div className="mono addedl">{d.newSection}</div>
            <SprintSummary />
          </div>
        ) : (
          <div id="rsum" />
        )
      }
    />
  );
}

/** A message from Orbit in the threads. */
export function OrbitThread({ who, text }: { who: string; text: string }) {
  const f = E.retro.followUps;
  return (
    <div className="qthread">
      <div className="qwho">
        <img src={IMG.orbitHead} alt="" style={{ width: 26 }} />
        <b>{f.orbitName}</b>
        <em className="role">{f.orbitRole}</em>
        <small>{quelyChrome.justNow}</small>
      </div>
      <p>
        <b className="mention">{who}</b> {text}
      </p>
    </div>
  );
}
