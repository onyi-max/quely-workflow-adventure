"use client";

import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { NorthwindMock } from "@/components/oldway/NorthwindMock";
import { IMG } from "@/lib/paths";
import { E } from "./common";

/** Scene 1: the design is ready to hand over. */
export function Start({ next }: StepProps) {
  const c = E.start;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={{ ask: c.ask, button: { label: c.button, onClick: next } }}
    >
      <div className="dstage1">
        <div>
          <NorthwindMock />
        </div>
        <div className="chip" style={{ gap: 8, marginTop: 22 }}>
          <img src={IMG.figma} style={{ height: 18 }} alt="" />
          {c.figmaChip}
        </div>
      </div>
    </StepFrame>
  );
}
