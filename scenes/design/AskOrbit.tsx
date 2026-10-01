"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { OrbitAnswer, OrbitBackBar, OrbitHome, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { E, TASK, TaskHeader } from "./common";
import { OpenDoc } from "./Doc";

type S = { answered: number[]; view: "home" | number };

/** Scene 4: the engineer asks Orbit Devon's four questions instead of Miracle. */
export function AskOrbit({ saved, save, next }: StepProps<S>) {
  const c = E.ask;
  const qs = E.questions;
  const [st, setSt] = useState<S>(saved ?? { answered: [], view: "home" });

  useEffect(() => save(st), [st, save]);

  const nextQ = qs.findIndex((_, i) => !st.answered.includes(i));
  const answer = (i: number) =>
    setSt((s) => ({ answered: s.answered.includes(i) ? s.answered : [...s.answered, i], view: i }));
  const home = () => setSt((s) => ({ ...s, view: "home" }));

  const foot: Foot =
    st.answered.length === qs.length
      ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
      : { ask: c.count(st.answered.length), button: { label: c.button, onClick: () => answer(nextQ) } };

  const right =
    st.view === "home" ? (
      <OrbitHome
        prompts={qs.map((q, i) => ({ label: q.q, done: st.answered.includes(i) }))}
        onPick={answer}
        sectionLabel={c.promptsLabel}
      />
    ) : (
      <>
        <OrbitBackBar label={c.backToQuestions} onClick={home} />
        <OrbitQuestion text={qs[st.view].q} meta={c.asker} />
        <OrbitAnswer footnote={c.footnote}>{qs[st.view].a}</OrbitAnswer>
      </>
    );

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={
        st.view === "home" && nextQ >= 0
          ? { key: "q" + nextQ, target: `.prompt[data-q="${nextQ}"]`, title: c.coach.title, text: c.coach.text, place: "left", delay: 250 }
          : null
      }
    >
      <QuelyApp
        task={TASK}
        main={
          <>
            <TaskHeader />
            <div className="qdocsec">
              <OpenDoc />
            </div>
          </>
        }
        right={right}
      />
    </StepFrame>
  );
}
