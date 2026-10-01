"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { Thread, ThreadsPanel, TypingDots } from "@/components/quely/ThreadsPanel";
import { useScript } from "@/lib/motion";
import { DISCUSSION, E, TASK } from "./common";

type S = { shown: number; typing: number | null; done: boolean };

/** Scene 4: the same handoff in Quely; the team talks through the trade-offs on the task. */
export function Space({ save, next, restored }: StepProps<S>) {
  const c = E.space;
  const total = DISCUSSION.length;
  const [st, setSt] = useState<S>(
    restored ? { shown: total, typing: null, done: true } : { shown: E.discussion.shownAtStart, typing: null, done: false },
  );
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save(st), [st, save]);

  useScript(async (wait) => {
    for (let i = E.discussion.shownAtStart; i < total; i++) {
      await wait(700);
      setSt((s) => ({ ...s, typing: i }));
      await wait(1200);
      setSt((s) => ({ ...s, typing: null, shown: i + 1 }));
    }
    await wait(500);
    setSt((s) => ({ ...s, done: true }));
  }, !restored);

  useEffect(() => {
    const r = rightRef.current;
    if (r) r.scrollTop = r.scrollHeight;
  }, [st.shown, st.typing]);

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={
        st.done
          ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
          : { ask: c.discussing }
      }
    >
      <QuelyApp
        task={TASK}
        enter={!restored}
        rightRef={rightRef}
        right={
          <ThreadsPanel threads={[]} pulse={false} label={E.discussion.label} listId="dth">
            {DISCUSSION.slice(0, st.shown).map((m, i) => (
              <Thread key={i} m={m} />
            ))}
            {st.typing !== null ? <TypingDots person={DISCUSSION[st.typing].person} /> : null}
          </ThreadsPanel>
        }
      />
    </StepFrame>
  );
}
