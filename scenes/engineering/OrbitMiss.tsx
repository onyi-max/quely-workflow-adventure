"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { OrbitAnswer, OrbitBackBar, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { useScript } from "@/lib/motion";
import { E, TASK } from "./common";
import { BlockerBanner } from "./Blocker";

type Phase = "checking" | "answered" | "done";

/** Scene 4: Orbit checks the Space and says the answer isn't there yet. */
export function OrbitMiss({ save, next, restored }: StepProps<{ phase: Phase }>) {
  const b = E.blocker;
  const c = E.orbitMiss;
  const [phase, setPhase] = useState<Phase>(restored ? "done" : "checking");

  useEffect(() => save({ phase }), [phase, save]);

  useScript(async (wait) => {
    await wait(1100);
    setPhase("answered");
    await wait(500);
    setPhase("done");
  }, !restored);

  const done = phase === "done";
  return (
    <StepFrame
      header={done ? { kicker: b.kicker, title: c.doneTitle } : { kicker: b.kicker, title: b.title, line: b.line }}
      foot={
        done
          ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
          : { ask: c.checking }
      }
    >
      <BlockerBanner instant />
      <QuelyApp
        task={TASK}
        right={
          <>
            <OrbitBackBar />
            <OrbitQuestion text={c.question} meta={c.asker} />
            <div id="oa">{phase !== "checking" ? <OrbitAnswer>{c.answer}</OrbitAnswer> : null}</div>
          </>
        }
      />
    </StepFrame>
  );
}
