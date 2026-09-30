"use client";

import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { ThreadsPanel } from "@/components/quely/ThreadsPanel";
import { E, TASK, THREADS } from "./common";

/** Scene 2, Quely side: the same ticket, with everything already attached. */
export function InQuely({ next, restored }: StepProps) {
  const c = E.inQuely;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={{ ask: c.ask, button: { label: c.button, onClick: next } }}
      coach={{ target: "#askOrbit", title: c.coach.title, text: c.coach.text, place: "left", delay: 700 }}
    >
      <QuelyApp
        task={TASK}
        enter={!restored}
        right={<ThreadsPanel threads={THREADS} resolveLabel={E.threadActions.resolve} onAskOrbit={next} />}
      />
    </StepFrame>
  );
}
