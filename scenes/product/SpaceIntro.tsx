"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { SpaceTour } from "@/components/quely/SpaceTour";
import { useScript } from "@/lib/motion";
import { E, TASK, UpdatesPanel } from "./common";

/** Scene 3, step 1: what a Space is, with numbered callouts on the assets and the threads. */
export function SpaceIntro({ save, next, restored }: StepProps<{ shown: number }>) {
  const c = E.spaceIntro;
  const total = c.callouts.length;
  const [shown, setShown] = useState(restored ? total : 0);

  useEffect(() => save({ shown }), [shown, save]);

  useScript(async (wait) => {
    await wait(450);
    for (let i = 1; i <= total; i++) {
      setShown(i);
      await wait(650);
    }
    setShown(total + 1); // all callouts shown: unlock the button
  }, !restored);

  const done = shown > total || restored;
  return (
    <StepFrame
      header={{ kicker: E.scene3Kicker, title: c.title, line: c.line }}
      // While the callouts appear, the bar shows the status alone; the button follows.
      foot={done ? { ask: c.ask, button: { label: c.button, onClick: next } } : { ask: c.ask }}
    >
      <QuelyApp task={TASK} enter={!restored} right={<UpdatesPanel />} />
      <SpaceTour callouts={c.callouts} shown={shown} instant={restored} />
    </StepFrame>
  );
}
