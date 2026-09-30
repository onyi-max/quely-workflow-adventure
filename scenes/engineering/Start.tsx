"use client";

import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { E, TicketScene } from "./common";

/** Scene 1: AJ picks up a thin ticket; the context is buried in Slack. */
export function Start({ next, restored }: StepProps) {
  const c = E.start;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={{ ask: c.ask, button: { label: c.button, onClick: next } }}
    >
      <TicketScene instant={restored} />
    </StepFrame>
  );
}
