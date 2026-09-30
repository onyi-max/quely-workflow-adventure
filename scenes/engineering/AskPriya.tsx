"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { Composer, Thread, ThreadsPanel, TypingDots } from "@/components/quely/ThreadsPanel";
import { quelyChrome } from "@/content/shared";
import { useScript } from "@/lib/motion";
import { E, people, TASK, THREADS } from "./common";

type Phase = "typing" | "ready" | "sent" | "priyaTyping" | "replied" | "done";

/** Scene 4: AJ asks Priya on the task; her reply stays with the work. */
export function AskPriya({ save, next, restored }: StepProps<{ phase: Phase }>) {
  const c = E.askPriya;
  const full = c.mention + c.message;
  const boldLen = c.mention.length + 1; // the prototype bolds "@Priya " while typing
  const [phase, setPhase] = useState<Phase>(restored ? "done" : "typing");
  const [typed, setTyped] = useState(0);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save({ phase }), [phase, save]);

  // Type the message out, character by character.
  useScript(async (wait) => {
    for (let i = 1; i <= full.length; i++) {
      setTyped(i);
      await wait(i < boldLen + 1 ? 45 : 28);
    }
    setPhase("ready");
  }, phase === "typing");

  // After sending: Priya types, replies, then the next step unlocks.
  // Keyed on `sent` (which stays true), not the phase, so the script isn't cancelled by its own updates.
  const [sent, setSent] = useState(false);
  useScript(async (wait) => {
    await wait(600);
    setPhase("priyaTyping");
    await wait(1500);
    setPhase("replied");
    await wait(500);
    setPhase("done");
  }, sent);

  useEffect(() => {
    const r = rightRef.current;
    if (r) r.scrollTop = r.scrollHeight;
  }, [phase]);

  const send = () => {
    if (phase !== "ready") return;
    setPhase("sent");
    setSent(true);
  };
  const sentOrLater = phase !== "typing" && phase !== "ready";

  let foot: Foot;
  if (phase === "typing") foot = { ask: c.typingAsk };
  else if (phase === "ready") foot = { ask: c.readyAsk, button: { label: c.readyButton, onClick: send } };
  else if (phase === "sent") foot = { ask: c.readyAsk, button: { label: c.readyButton, onClick: send, disabled: true } };
  else if (phase === "done") foot = { ask: c.doneAsk, button: { label: c.doneButton, onClick: next } };
  else foot = { ask: c.replyingAsk };

  const composer =
    phase === "typing" || phase === "ready" ? (
      <Composer
        typed={
          <>
            <b className="mention">{full.slice(0, Math.min(typed, boldLen))}</b>
            {full.slice(boldLen, typed)}
          </>
        }
        ready={phase === "ready"}
        onSend={send}
      />
    ) : (
      <Composer />
    );

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={
        phase === "ready"
          ? { target: ".qcompose .qsend", title: c.coach.title, text: c.coach.text, place: "above" }
          : null
      }
    >
      <QuelyApp
        task={TASK}
        rightRef={rightRef}
        right={
          <ThreadsPanel threads={THREADS} resolveLabel={E.threadActions.resolve} composer={composer}>
            {sentOrLater ? (
              <Thread
                m={{
                  person: people.aj,
                  time: quelyChrome.justNow,
                  text: `<mention>${c.mention}</mention>${c.message}`,
                  mine: true,
                }}
              />
            ) : null}
            {phase === "priyaTyping" ? <TypingDots person={people.priya} /> : null}
            {phase === "replied" || phase === "done" ? (
              <Thread m={{ person: people.priya, time: quelyChrome.justNow, text: c.reply }} />
            ) : null}
          </ThreadsPanel>
        }
      />
    </StepFrame>
  );
}
