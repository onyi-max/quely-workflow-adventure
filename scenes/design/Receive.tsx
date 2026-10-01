"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { HandoffPackage, QuestionCard } from "@/components/oldway/Handoff";
import { useScript } from "@/lib/motion";
import { E, people } from "./common";

const TILTS = ["-1.5deg", "1deg", "-1deg", "1.5deg"];

type S = { items: number; looks: boolean; questions: number; call: boolean; done: boolean };
const ALL: S = { items: 3, looks: true, questions: 4, call: true, done: true };

/** Scene 2: the handoff looks complete, then Devon's questions pile up. */
export function Receive({ save, next, restored }: StepProps<S>) {
  const c = E.receive;
  const [st, setSt] = useState<S>(restored ? ALL : { items: 0, looks: false, questions: 0, call: false, done: false });

  useEffect(() => save(st), [st, save]);

  useScript(async (wait) => {
    for (let i = 1; i <= c.items.length; i++) {
      await wait(300);
      setSt((s) => ({ ...s, items: i }));
    }
    await wait(300);
    setSt((s) => ({ ...s, looks: true }));
    for (let i = 0; i < E.questions.length; i++) {
      await wait(i ? 700 : 900);
      setSt((s) => ({ ...s, questions: i + 1 }));
    }
    await wait(800);
    setSt((s) => ({ ...s, call: true }));
    await wait(400);
    setSt((s) => ({ ...s, done: true }));
  }, !restored);

  const d = people.devon;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={
        st.done
          ? { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }
          : { ask: c.building }
      }
    >
      <div className="dstage2">
        <HandoffPackage label={c.packageLabel} items={c.items} looks={c.looks} shownItems={st.items} looksShown={st.looks} />
        <div className="qs" id="qs">
          <div className="mono qsl">{c.dmLabel}</div>
          {E.questions.slice(0, st.questions).map((q, i) => (
            <QuestionCard key={i} initials={d.initials} color={d.color} name={d.name} text={q.q} tilt={TILTS[i]} instant={restored} />
          ))}
          {st.call ? (
            <QuestionCard initials={d.initials} color={d.color} name={d.name} text={c.callAsk} tilt="0deg" call instant={restored} />
          ) : null}
        </div>
      </div>
    </StepFrame>
  );
}
