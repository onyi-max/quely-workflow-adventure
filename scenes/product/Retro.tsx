"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import type { CoachSpec } from "@/components/path/CoachMark";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { AskOrbitButton } from "@/components/quely/ThreadsPanel";
import { OrbitActions, OrbitBackBar, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { BigDocGrid, CollapsedTask, DocHeader, DocView } from "@/components/quely/DocumentSection";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";
import { useScript } from "@/lib/motion";
import { rich } from "@/components/ui/Rich";
import { E, people, TASK } from "./common";

// In order. "summary" is the short pause after asking, before Aditi starts typing.
const PHASES = ["start", "summary", "typing", "ready", "sent", "confirm", "adding", "added", "open"] as const;
type Phase = (typeof PHASES)[number];
const at = (p: Phase, q: Phase) => PHASES.indexOf(p) >= PHASES.indexOf(q);

function Summary() {
  const s = E.retro.summary;
  return (
    <>
      <p>{rich(s.intro)}</p>
      <ul className="osum">
        {s.items.map((it) => (
          <li key={it}>{rich(it)}</li>
        ))}
      </ul>
    </>
  );
}

/** Scene 4: Orbit summarizes the sprint and adds it to the retro doc. */
export function Retro({ save, next, restored }: StepProps<{ phase: Phase }>) {
  const c = E.retro;
  const [phase, setPhase] = useState<Phase>(restored ? "open" : "start");
  const [typed, setTyped] = useState(restored ? c.request.length : 0);
  // Flags that start each timed sequence (kept separate from `phase` so a sequence doesn't cancel itself).
  const [asked, setAsked] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save({ phase }), [phase, save]);

  useScript(async (wait) => {
    await wait(900);
    setPhase("typing");
    for (let i = 1; i <= c.request.length; i++) {
      setTyped(i);
      await wait(24);
    }
    setPhase("ready");
  }, asked);

  useScript(async (wait) => {
    await wait(900);
    setPhase("confirm");
  }, sent);

  useScript(async (wait) => {
    await wait(1100);
    setPhase("added");
  }, confirmed);

  // Scroll Orbit's panel down only when a new message lands (as the prototype does),
  // so the summary is read from the top.
  useEffect(() => {
    const r = rightRef.current;
    if (r && (phase === "sent" || phase === "confirm" || phase === "added")) r.scrollTop = r.scrollHeight;
  }, [phase]);

  const ask = () => {
    if (phase !== "start") return;
    setPhase("summary");
    setAsked(true);
  };
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
  const openDoc = () => {
    if (phase === "added") setPhase("open");
  };

  // Header and bottom bar. While a step's follow-up is pending, the prototype leaves the
  // previous bar (and button) in place; here those clicks simply do nothing.
  const header = at(phase, "typing")
    ? { kicker: c.kicker, title: c.addTitle, line: c.addLine }
    : { kicker: c.kicker, title: c.title, line: c.line };

  let foot: Foot;
  if (phase === "start" || phase === "summary") foot = { ask: c.ask, button: { label: c.button, onClick: ask } };
  else if (phase === "typing") foot = { ask: c.typingAsk };
  else if (phase === "ready") foot = { ask: c.readyAsk, button: { label: c.readyButton, onClick: send } };
  else if (phase === "sent") foot = { ask: c.replyingAsk };
  else if (phase === "confirm" || phase === "adding") foot = { ask: c.confirmAsk, button: { label: c.confirmButton, onClick: confirm } };
  else if (phase === "added") foot = { ask: c.addedAsk, button: { label: c.addedButton, onClick: openDoc } };
  else foot = { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } };

  let coach: CoachSpec | null = null;
  if (phase === "start") coach = { target: "#sumq", title: c.coach.title, text: c.coach.text, place: "left", delay: 400 };
  else if (phase === "ready") coach = { target: "#osend", title: c.sendCoach.title, text: c.sendCoach.text, place: "above" };
  else if (phase === "confirm") coach = { target: "#oyes", title: c.confirmCoach.title, text: c.confirmCoach.text, place: "left", delay: 300 };
  else if (phase === "added") coach = { target: "#rdoc", title: c.docCoach.title, text: c.docCoach.text, place: "below", delay: 300 };

  const updated = at(phase, "added");
  const d = c.docCard;
  const typing = phase === "typing" || phase === "ready";

  const right =
    phase === "start" ? (
      <>
        <div className="qrhead">
          <AskOrbitButton />
        </div>
        <div className="orbhome">
          <img src={IMG.orbit} alt="Orbit" />
          <b>{quelyChrome.orbitHello}</b>
          <div className="sp">{quelyChrome.suggested}</div>
          {c.prompts.map((p, i) => (
            <button key={p} className="prompt" id={i === 0 ? "sumq" : undefined} onClick={i === 0 ? ask : undefined}>
              {p}
            </button>
          ))}
        </div>
      </>
    ) : (
      <>
        <OrbitBackBar />
        <div id="ol">
          <OrbitQuestion text={c.prompts[0]} meta={c.asker} />
          <div className="orba">
            <img src={IMG.orbitHead} alt="" />
            <Summary />
            <span className="rm">{c.summaryFootnote}</span>
          </div>
          {at(phase, "sent") ? <OrbitQuestion text={c.request} meta={c.asker} /> : null}
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
          {updated ? (
            <div className="orba">
              <img src={IMG.orbitHead} alt="" />
              <p>{rich(c.added)}</p>
              <button className="askmore" id="odoc" onClick={openDoc}>
                {c.openDoc}
              </button>
            </div>
          ) : null}
        </div>
        <OrbitActions count={c.actionsCount} />
        <div className={"qask" + (typing ? " typing" : "")} id="oask">
          <span>{quelyChrome.addTool}</span>
          <small id="oin">
            {typing ? (
              <>
                {c.request.slice(0, typed)}
                <i className="caret" />
              </>
            ) : (
              quelyChrome.askPlaceholder
            )}
          </small>
          <button className={"qsend" + (phase === "ready" ? " ready" : "")} id="osend" aria-label="Send" onClick={send}>
            ➤
          </button>
        </div>
      </>
    );

  const main = (
    <>
      <CollapsedTask title={c.sprint} status={c.sprintStatus} />
      <div className="qdocsec">
        {phase === "open" ? (
          <DocView
            title={c.doc.title}
            meta={c.doc.meta}
            sections={c.doc.sections}
            insert={
              <div className="added">
                <div className="mono addedl">{c.doc.newSection}</div>
                <Summary />
              </div>
            }
          />
        ) : (
          <>
            <DocHeader />
            <BigDocGrid
              card={{
                title: d.title,
                words: updated ? d.wordsAfter : d.words,
                time: updated ? d.timeAfter : d.time,
                by: updated ? d.byAfter : d.by,
                author: people.aditi,
                isNew: updated,
              }}
              newCard={c.newCard}
              onOpen={updated ? openDoc : undefined}
            />
          </>
        )}
      </div>
    </>
  );

  return (
    <StepFrame header={header} foot={foot} coach={coach ? { ...coach, key: phase } : null}>
      <QuelyApp task={{ ...TASK, space: c.space }} main={main} right={right} rightRef={rightRef} carried={false} />
    </StepFrame>
  );
}
