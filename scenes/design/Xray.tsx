"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { XrayReveal, pinsUncovered } from "@/components/oldway/XrayReveal";
import { useScript } from "@/lib/motion";
import { E, people } from "./common";

type S = { reveal: number; shown: number[] };

/** Scene 3: drag the handle to reveal the decisions behind the screen. */
export function Xray({ saved, save, next }: StepProps<S>) {
  const c = E.xray;
  const [st, setSt] = useState<S>(saved ?? { reveal: 0, shown: [] });
  const [autoRuns, setAutoRuns] = useState(0);

  useEffect(() => save(st), [st, save]);

  // `f` can be a position or a function of the latest position (so quick key presses add up).
  const setReveal = (f: number | ((prev: number) => number)) =>
    setSt((s) => {
      const v = Math.max(0, Math.min(1, typeof f === "function" ? f(s.reveal) : f));
      const add = pinsUncovered(c.pins, v).filter((i) => !s.shown.includes(i));
      return { reveal: v, shown: add.length ? [...s.shown, ...add] : s.shown };
    });

  // "Reveal it for me": sweep the handle all the way across.
  useScript(
    async (wait) => {
      for (let f = 0; f <= 1.001; f += 0.05) {
        setReveal(f);
        await wait(40);
      }
    },
    autoRuns > 0,
    autoRuns,
  );

  const all = st.shown.length === c.pins.length;
  const foot: Foot = all
    ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
    : { ask: c.count(st.shown.length), button: { label: c.button, onClick: () => setAutoRuns((n) => n + 1) } };

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={
        st.shown.length === 0 && autoRuns === 0
          ? { target: "#hd", title: c.coach.title, text: c.coach.text, place: "left", delay: 500 }
          : null
      }
    >
      <div className="dstage3">
        <XrayReveal
          pins={c.pins}
          shown={st.shown}
          reveal={st.reveal}
          onReveal={setReveal}
          onNudge={(d) => setReveal((p) => p + d)}
          initials={people.miracle.initials}
          handleLabel={c.handleLabel}
        />
      </div>
    </StepFrame>
  );
}
