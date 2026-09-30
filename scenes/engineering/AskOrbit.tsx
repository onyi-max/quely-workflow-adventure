"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { OrbitActions, OrbitAnswer, OrbitBackBar, OrbitHome, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { quelyChrome } from "@/content/shared";
import { motionDelay } from "@/lib/motion";
import { E, TASK } from "./common";

type S = { view: "home" | "answer"; q: number; answered: boolean };

/** Scene 3: ask Orbit what the team already worked out. */
export function AskOrbit({ saved, save, next, restored }: StepProps<S>) {
  const c = E.orbit;
  const [st, setSt] = useState<S>(saved ?? { view: "home", q: 0, answered: false });
  // "Ask another question" and the footer change land a moment after the answer.
  const [more, setMore] = useState(restored && st.view === "answer");
  const [homeVisits, setHomeVisits] = useState(0);
  const [swap, setSwap] = useState(!restored);

  useEffect(() => save(st), [st, save]);

  useEffect(() => {
    if (!swap) return;
    const t = setTimeout(() => setSwap(false), motionDelay(400));
    return () => clearTimeout(t);
  }, [swap]);

  useEffect(() => {
    if (st.view !== "answer" || more) return;
    const t = setTimeout(() => {
      setMore(true);
      setSt((s) => (s.answered ? s : { ...s, answered: true }));
    }, motionDelay(200));
    return () => clearTimeout(t);
  }, [st.view, more]);

  const pick = (i: number) => {
    setMore(false);
    setSt((s) => ({ ...s, view: "answer", q: i }));
  };
  const askAnother = () => {
    setHomeVisits((n) => n + 1);
    setSt((s) => ({ ...s, view: "home" }));
  };

  const foot: Foot = st.answered
    ? { ask: c.answeredAsk, button: { label: c.answeredButton, onClick: next } }
    : { ask: c.ask, button: { label: c.button, onClick: () => pick(0) } };

  const qa = c.qa[st.q];
  const right =
    st.view === "home" ? (
      <OrbitHome prompts={c.qa.map((x) => ({ label: x.q }))} onPick={pick} actions={c.actionsCount} />
    ) : (
      <>
        <OrbitBackBar />
        <OrbitQuestion text={qa.q} meta={quelyChrome.justNow} />
        <OrbitAnswer footnote={quelyChrome.readMore}>{qa.a}</OrbitAnswer>
        <OrbitActions count={c.actionsCount} />
        {more ? (
          <button className="askmore" id="more" onClick={askAnother}>
            {quelyChrome.askAnother}
          </button>
        ) : null}
      </>
    );

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={foot}
      stageClassName={restored ? "settled" : undefined}
      coach={
        st.view === "home"
          ? {
              key: "home" + homeVisits,
              target: ".orbhome .prompt",
              title: c.coach.title,
              text: c.coach.text,
              place: "left",
              delay: homeVisits ? 300 : 450,
            }
          : null
      }
    >
      <QuelyApp task={TASK} right={right} rightClassName={swap ? "swap2" : undefined} />
    </StepFrame>
  );
}
