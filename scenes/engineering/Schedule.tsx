"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { DecisionNote, Thread, ThreadsPanel } from "@/components/quely/ThreadsPanel";
import { ScheduleMeeting } from "@/components/quely/ScheduleMeeting";
import { motionDelay } from "@/lib/motion";
import { E, people, TASK, THREADS } from "./common";

type S = { slot: string | null; scheduled: boolean; done: boolean };

/** Scene 4: book 15 minutes with Priya from the task; Orbit's notes come back to the Space. */
export function Schedule({ saved, save, next, restored }: StepProps<S>) {
  const c = E.schedule;
  const [st, setSt] = useState<S>(saved ?? { slot: null, scheduled: false, done: false });

  useEffect(() => save(st), [st, save]);

  useEffect(() => {
    if (!st.scheduled || st.done) return;
    const t = setTimeout(() => setSt((s) => ({ ...s, done: true })), motionDelay(500));
    return () => clearTimeout(t);
  }, [st.scheduled, st.done]);

  const pick = (slot: string) => setSt((s) => (s.scheduled ? s : { ...s, slot }));
  const schedule = () => setSt((s) => (s.slot && !s.scheduled ? { ...s, scheduled: true } : s));

  let foot: Foot;
  if (st.done) foot = { ask: c.doneAsk, button: { label: c.doneButton, onClick: next } };
  else
    foot = {
      ask: c.ask,
      button: {
        label: st.slot ? c.buttonWithTime(st.slot) : c.button,
        // Stays enabled (as in the prototype) during the short pause after scheduling; repeat clicks do nothing.
        onClick: schedule,
        disabled: !st.slot,
      },
    };

  const coach = st.scheduled
    ? null
    : st.slot
      ? { key: "go", target: "#schedGo", title: c.coachGo.title, place: "left" as const }
      : { target: ".slots2", title: c.coach.title, text: c.coach.text, place: "left" as const, delay: 350 };

  return (
    <StepFrame header={{ kicker: c.kicker, title: c.title, line: c.line }} foot={foot} coach={coach}>
      <QuelyApp
        task={TASK}
        right={
          st.scheduled ? (
            <ThreadsPanel threads={THREADS} resolveLabel={E.threadActions.resolve}>
              {c.afterThreads.map((m, i) => (
                <Thread key={i} m={{ person: people[m.who], time: m.time, text: m.text }} />
              ))}
              <DecisionNote label={c.notes.label} text={c.notes.text} instant={restored} />
            </ThreadsPanel>
          ) : (
            <ScheduleMeeting
              copy={c.panel}
              participant={people[c.panel.participant]}
              slot={st.slot}
              onPick={pick}
              onSchedule={schedule}
            />
          )
        }
      />
    </StepFrame>
  );
}
