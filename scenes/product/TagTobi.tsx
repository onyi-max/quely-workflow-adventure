"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { Composer, DecisionNote, Thread, TypingDots } from "@/components/quely/ThreadsPanel";
import { useScript } from "@/lib/motion";
import { E, msg, people, TASK, UpdatesPanel } from "./common";

type Phase = "idle" | "typing" | "ready" | "replying" | "done";
type S = { phase: Phase; replies: number; typingWho: keyof typeof people | null };

/** Scene 3, step 3: Aditi tags Tobi on the unit; Tobi and Kofi sort it out in the thread. */
export function TagTobi({ save, next, restored }: StepProps<S>) {
  const c = E.tag;
  const full = c.mention + c.message;
  const boldLen = c.mention.length; // the prototype bolds "@Tobi" while typing
  const [st, setSt] = useState<S>(
    restored ? { phase: "done", replies: c.replies.length, typingWho: null } : { phase: "idle", replies: 0, typingWho: null },
  );
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save(st), [st, save]);

  // Aditi types her message.
  useScript(async (wait) => {
    await wait(500);
    setSt((s) => ({ ...s, phase: "typing" }));
    for (let i = 1; i <= full.length; i++) {
      setTyped(i);
      await wait(i < boldLen + 1 ? 45 : 24);
    }
    setSt((s) => ({ ...s, phase: "ready" }));
  }, !restored);

  // After sending: the designer and engineer reply on the task.
  useScript(async (wait) => {
    await wait(500);
    for (let i = 0; i < c.replies.length; i++) {
      setSt((s) => ({ ...s, typingWho: c.replies[i].who }));
      await wait(c.replies[i].typing);
      setSt((s) => ({ ...s, typingWho: null, replies: i + 1 }));
      await wait(500);
    }
    setSt((s) => ({ ...s, phase: "done" }));
  }, sent);

  useEffect(() => {
    const r = rightRef.current;
    if (r && (st.phase === "replying" || st.phase === "done")) r.scrollTop = r.scrollHeight;
  }, [st]);

  const send = () => {
    if (st.phase !== "ready") return;
    setSt((s) => ({ ...s, phase: "replying" }));
    setSent(true);
  };

  let foot: Foot;
  if (st.phase === "idle" || st.phase === "typing") foot = { ask: c.typingAsk };
  else if (st.phase === "ready") foot = { ask: c.readyAsk, button: { label: c.readyButton, onClick: send } };
  else if (st.phase === "replying") foot = { ask: c.replyingAsk };
  else foot = { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } };

  const typing = st.phase === "typing" || st.phase === "ready";
  const afterSend = st.phase === "replying" || st.phase === "done";

  return (
    <StepFrame
      header={{ kicker: E.scene3Kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={st.phase === "ready" ? { target: ".qcompose .qsend", title: c.coach.title, text: c.coach.text, place: "below" } : null}
    >
      <QuelyApp
        task={TASK}
        rightRef={rightRef}
        right={
          <UpdatesPanel
            composer={
              typing ? (
                <Composer
                  typed={
                    <>
                      <b className="mention">{full.slice(0, Math.min(typed, boldLen))}</b>
                      {full.slice(boldLen, typed)}
                    </>
                  }
                  ready={st.phase === "ready"}
                  onSend={send}
                />
              ) : (
                <Composer />
              )
            }
          >
            {afterSend ? <Thread m={msg("aditi", c.sentTime, `<mention>${c.mention}</mention>${c.message}`)} /> : null}
            {c.replies.slice(0, st.replies).map((r, i) => (
              <Thread key={i} m={msg(r.who, r.time, r.text)} />
            ))}
            {st.typingWho ? <TypingDots person={people[st.typingWho]} /> : null}
            {st.phase === "done" ? <DecisionNote label={c.note.label} text={c.note.text} instant={restored} /> : null}
          </UpdatesPanel>
        }
      />
    </StepFrame>
  );
}
