"use client";

import { useEffect, useRef, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { AskOrbitButton, Composer, Thread, TypingDots } from "@/components/quely/ThreadsPanel";
import { OrbitBackBar, OrbitComposeBox, OrbitQuestion } from "@/components/quely/OrbitPanel";
import { quelyChrome } from "@/content/shared";
import { IMG } from "@/lib/paths";
import { useScript } from "@/lib/motion";
import { E, msg, OrbitThread, people, PlaybookMain, RETRO_TASK, RetroDoc } from "./common";

type Phase = "reading" | "drafted" | "posting" | "done";
type S = { phase: Phase; posted: number; typing: boolean; replied: boolean };

/** Scene 4, step 2: Orbit drafts follow-up questions and posts them to the team in the threads. */
export function RetroFollowUps({ save, next, restored }: StepProps<S>) {
  const r = E.retro;
  const c = r.followUps;
  const n = c.questions.length;
  const [st, setSt] = useState<S>(
    restored ? { phase: "done", posted: n, typing: false, replied: true } : { phase: "reading", posted: 0, typing: false, replied: false },
  );
  const [posting, setPosting] = useState(false);
  const rightRef = useRef<HTMLElement>(null);

  useEffect(() => save(st), [st, save]);

  useScript(async (wait) => {
    await wait(1000);
    setSt((s) => ({ ...s, phase: "drafted" }));
  }, !restored);

  // "Ask the team": post each question in the threads, then Tobi replies.
  useScript(async (wait) => {
    for (let i = 1; i <= n; i++) {
      setSt((s) => ({ ...s, posted: i }));
      if (i < n) await wait(300);
    }
    await wait(700);
    setSt((s) => ({ ...s, typing: true }));
    await wait(1300);
    setSt((s) => ({ ...s, typing: false, replied: true }));
    await wait(500);
    setSt((s) => ({ ...s, phase: "done" }));
  }, posting);

  useEffect(() => {
    const el = rightRef.current;
    if (el && (st.phase === "posting" || st.phase === "done")) el.scrollTop = el.scrollHeight;
  }, [st]);

  const askTeam = () => {
    if (st.phase !== "drafted") return;
    setSt((s) => ({ ...s, phase: "posting" }));
    setPosting(true);
  };

  let foot: Foot;
  if (st.phase === "reading") foot = { ask: c.reading };
  // The bar stays until all the questions are posted (repeat clicks do nothing).
  else if (st.phase === "drafted" || st.posted < n) foot = { ask: c.ask, button: { label: c.button, onClick: askTeam } };
  else if (st.phase === "posting") foot = { ask: c.replyingAsk };
  else foot = { ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } };

  const right =
    st.phase === "reading" || st.phase === "drafted" ? (
      <>
        <OrbitBackBar />
        <div id="ol">
          <OrbitQuestion text={c.request} meta={r.asker} />
          {st.phase === "drafted" ? (
            <div className="orba">
              <img src={IMG.orbitHead} alt="" />
              <p>{c.intro}</p>
              <ul className="osum">
                {c.questions.map((q) => (
                  <li key={q.who}>
                    <b>{q.who}</b> {q.text}
                  </li>
                ))}
              </ul>
              <div className="obtns">
                <button className="obtn yes" id="oask2" onClick={askTeam}>
                  {c.send}
                </button>
                <button className="obtn">{c.edit}</button>
              </div>
            </div>
          ) : null}
        </div>
        <OrbitComposeBox actions={r.actionsCount} />
      </>
    ) : (
      <>
        <div className="qrhead">
          <AskOrbitButton pulse={false} />
        </div>
        <div className="mono dlbl">{r.threadsLabel}</div>
        <div id="rth">
          {c.questions.slice(0, st.posted).map((q) => (
            <OrbitThread key={q.who} who={q.who} text={q.text} />
          ))}
          {st.typing ? <TypingDots person={people[c.reply.who]} /> : null}
          {st.replied ? <Thread m={msg(c.reply.who, quelyChrome.justNow, c.reply.text)} /> : null}
        </div>
        <Composer />
      </>
    );

  return (
    <StepFrame
      header={{ kicker: r.kicker, title: c.title, line: c.line }}
      foot={foot}
      coach={st.phase === "drafted" ? { target: "#oask2", title: c.coach.title, text: c.coach.text, place: "below", delay: 300 } : null}
    >
      <QuelyApp
        task={RETRO_TASK}
        rightRef={rightRef}
        main={
          <PlaybookMain>
            <RetroDoc />
          </PlaybookMain>
        }
        right={right}
      />
    </StepFrame>
  );
}
