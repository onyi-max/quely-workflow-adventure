"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { OrbitAnswer, OrbitBackBar, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";
import { useScript } from "@/lib/motion";
import { E, TASK } from "./common";

type Phase = "home" | "asked" | "answered";

/** Scene 3, step 2: Aditi asks Orbit to check the standup updates for blockers. */
export function OrbitCheck({ save, next, restored }: StepProps<{ phase: Phase }>) {
  const c = E.orbitCheck;
  const [phase, setPhase] = useState<Phase>(restored ? "answered" : "home");
  const [asked, setAsked] = useState(false);

  useEffect(() => save({ phase }), [phase, save]);

  useScript(async (wait) => {
    await wait(900);
    setPhase("answered");
  }, asked);

  const ask = () => {
    if (phase !== "home") return;
    setPhase("asked");
    setAsked(true);
  };

  // While Orbit is answering, the prototype leaves the previous bar in place; clicks do nothing.
  const foot: Foot =
    phase === "answered"
      ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
      : { ask: c.ask, button: { label: c.button, onClick: ask } };

  const right =
    phase === "home" ? (
      <>
        <OrbitBackBar />
        <div className="orbhome">
          <img src={IMG.orbit} alt="Orbit" />
          <b>{quelyChrome.orbitHello}</b>
          <div className="sp">{quelyChrome.suggested}</div>
          {c.prompts.map((p, i) => (
            <button key={p} className="prompt" id={i === 0 ? "bq" : undefined} onClick={i === 0 ? ask : undefined}>
              {p}
            </button>
          ))}
        </div>
      </>
    ) : (
      <>
        <OrbitBackBar />
        <OrbitQuestion text={c.prompts[0]} meta={c.asker} />
        <div id="boa">{phase === "answered" ? <OrbitAnswer>{c.answer}</OrbitAnswer> : null}</div>
      </>
    );

  return (
    <StepFrame
      header={{ kicker: E.scene3Kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={phase === "home" ? { target: "#bq", title: c.coach.title, text: c.coach.text, place: "left", delay: 300 } : null}
    >
      <QuelyApp task={TASK} right={right} />
    </StepFrame>
  );
}
