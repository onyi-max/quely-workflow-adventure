"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { StandupCall } from "@/components/oldway/StandupCall";
import { useScript } from "@/lib/motion";
import { E, people } from "./common";

type S = { captions: number; talking: number; summary: boolean };

/** Scene 1: the standup raises a blocker but doesn't resolve it. */
export function Standup({ save, next, restored }: StepProps<S>) {
  const c = E.standup;
  const [st, setSt] = useState<S>(
    restored ? { captions: c.captions.length, talking: -1, summary: true } : { captions: 0, talking: -1, summary: false },
  );

  useEffect(() => save(st), [st, save]);

  useScript(async (wait) => {
    await wait(500);
    for (let i = 0; i < c.captions.length; i++) {
      setSt((s) => ({ ...s, captions: i + 1, talking: c.captions[i].speaker }));
      await wait(c.captions[i].ms);
    }
    setSt((s) => ({ ...s, talking: -1, summary: true }));
  }, !restored);

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={
        st.summary
          ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
          : { ask: c.running }
      }
    >
      <StandupCall
        oldTag={c.oldTag}
        label={c.callLabel}
        timer={c.timer}
        tiles={c.tiles.map((t) => ({ person: people[t.who], label: t.label }))}
        talking={st.talking}
        captions={c.captions.slice(0, st.captions).map((x) => x.text)}
        summary={st.summary ? c.summary : null}
        instant={restored}
      />
    </StepFrame>
  );
}
