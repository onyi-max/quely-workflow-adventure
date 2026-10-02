"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import type { CoachSpec } from "@/components/path/CoachMark";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { OrbitBackBar, OrbitComposeBox, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { IMG } from "@/lib/paths";
import { useScript } from "@/lib/motion";
import { rich } from "@/components/ui/Rich";
import { E, PlaybookMain, RETRO_TASK, RetroDoc, SprintSummary } from "./common";

// In order. "summary" is the pause after Orbit's answer, before Aditi starts typing.
const PHASES = ["analyzing", "summary", "typing", "ready", "sent", "confirm", "adding", "added"] as const;
type Phase = (typeof PHASES)[number];
const at = (p: Phase, q: Phase) => PHASES.indexOf(p) >= PHASES.indexOf(q);

/** Scene 4, step 3: Orbit summarizes the sprint for Aditi, then adds it to the retro doc. */
export function RetroSummary({ save, next, restored }: StepProps<{ phase: Phase }>) {
  const r = E.retro;
  const c = r.summaryStep;
  const [phase, setPhase] = useState<Phase>(restored ? "added" : "analyzing");
  const [typed, setTyped] = useState(0);
  // Flags that start each timed sequence (kept separate from `phase` so a sequence doesn't cancel itself).
  const [sent, setSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save({ phase }), [phase, save]);

  useScript(async (wait) => {
    await wait(1100);
    setPhase("summary");
    await wait(700);
    setPhase("typing");
    for (let i = 1; i <= c.addRequest.length; i++) {
      setTyped(i);
      await wait(24);
    }
    setPhase("ready");
  }, !restored);

  useScript(async (wait) => {
    await wait(900);
    setPhase("confirm");
  }, sent);

  useScript(async (wait) => {
    await wait(1100);
    setPhase("added");
  }, confirmed);

  // Scroll Orbit's panel down only when a new message lands (as the prototype does).
  useEffect(() => {
    const el = rightRef.current;
    if (el && (phase === "sent" || phase === "confirm" || phase === "added")) el.scrollTop = el.scrollHeight;
  }, [phase]);

  const send = () => {
    if (phase !== "ready") return;
    setPhase("sent");
    setSent(true);
  };
  const confirm = () => {
    if (phase !== "confirm") return;
    setPhase("adding");
    setConfirmed(true);
  };

  let foot: Foot;
  if (phase === "analyzing" || phase === "summary") foot = { ask: c.analyzing };
  else if (phase === "typing") foot = { ask: c.typingAsk };
  else if (phase === "ready") foot = { ask: c.readyAsk, button: { label: c.readyButton, onClick: send } };
  else if (phase === "sent") foot = { ask: c.replyingAsk };
  else if (phase === "confirm" || phase === "adding") foot = { ask: c.confirmAsk, button: { label: c.confirmButton, onClick: confirm } };
  else foot = { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } };

  let coach: (CoachSpec & { key: string }) | null = null;
  if (phase === "ready") coach = { key: "send", target: "#osend", title: c.sendCoach.title, text: c.sendCoach.text, place: "above" };
  else if (phase === "confirm")
    coach = { key: "yes", target: "#oyes", title: c.confirmCoach.title, text: c.confirmCoach.text, place: "below", delay: 300 };

  const typing = phase === "typing" || phase === "ready";

  return (
    <StepFrame header={{ kicker: r.kicker, title: c.title, line: c.line }} foot={foot} coach={coach}>
      <QuelyApp
        task={RETRO_TASK}
        rightRef={rightRef}
        main={
          <PlaybookMain>
            <RetroDoc summary={phase === "added"} />
          </PlaybookMain>
        }
        right={
          <>
            <OrbitBackBar />
            <div id="ol">
              <OrbitQuestion text={c.request} meta={r.asker} />
              {at(phase, "summary") ? (
                <div className="orba">
                  <img src={IMG.orbitHead} alt="" />
                  <SprintSummary />
                  <span className="rm">{c.footnote}</span>
                </div>
              ) : null}
              {at(phase, "sent") ? <OrbitQuestion text={c.addRequest} meta={r.asker} /> : null}
              {at(phase, "confirm") ? (
                <div className="orba" id="conf">
                  <img src={IMG.orbitHead} alt="" />
                  <p>{c.confirm}</p>
                  <div className="obtns">
                    {phase === "confirm" ? (
                      <>
                        <button className="obtn yes" id="oyes" onClick={confirm}>
                          {c.confirmYes}
                        </button>
                        <button className="obtn">{c.confirmNo}</button>
                      </>
                    ) : (
                      <span className="mono" style={{ fontSize: 11, color: "#8C857E" }}>
                        {c.adding}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
              {phase === "added" ? (
                <div className="orba">
                  <img src={IMG.orbitHead} alt="" />
                  <p>{rich(c.added)}</p>
                </div>
              ) : null}
            </div>
            <OrbitComposeBox
              actions={r.actionsCount}
              typed={typing ? c.addRequest.slice(0, typed) : null}
              ready={phase === "ready"}
              onSend={send}
            />
          </>
        }
      />
    </StepFrame>
  );
}
