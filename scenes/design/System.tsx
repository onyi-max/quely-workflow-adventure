"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { SystemMap } from "@/components/oldway/SystemMap";
import { useScript } from "@/lib/motion";
import { E } from "./common";

type S = { nodes: number; note: boolean };

/** Scene 5: what the feature connects to, now and later. */
export function System({ save, next, restored }: StepProps<S>) {
  const c = E.system;
  const [st, setSt] = useState<S>(restored ? { nodes: c.nodes.length, note: true } : { nodes: 0, note: false });

  useEffect(() => save(st), [st, save]);

  useScript(async (wait) => {
    for (let i = 1; i <= c.nodes.length; i++) {
      await wait(450);
      setSt((s) => ({ ...s, nodes: i }));
    }
    await wait(500);
    setSt((s) => ({ ...s, note: true }));
  }, !restored);

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title }}
      foot={st.note ? { ask: c.doneAsk, button: { label: c.doneButton, onClick: next } } : { ask: c.mapping }}
    >
      <div className="dstage5">
        <SystemMap screen={c.screen} nodes={c.nodes} note={c.note} shownNodes={st.nodes} noteShown={st.note} />
        <div className="dside">
          <div className="kick">{c.side.kicker}</div>
          <p>{c.side.p1}</p>
          <p>{c.side.p2}</p>
        </div>
      </div>
    </StepFrame>
  );
}
