"use client";

import Link from "next/link";
import { useState } from "react";
import { finale, links } from "@/content/results";
import { workflows } from "@/content/map";
import { track } from "@/lib/analytics";
import { useScript } from "@/lib/motion";
import { useProgress } from "@/lib/progress";
import { IMG, PATH_IDS } from "@/lib/paths";
import { rich } from "@/components/ui/Rich";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { useQuestions } from "@/components/QuestionsModal";

const PIECES = 6; // three cards, the connector, the hub, the copy block

/** The full picture: the three workflows converging on one Space. Always open. */
export function Finale() {
  const { count } = useProgress();
  const { open: openQuestions } = useQuestions();
  const [shown, setShown] = useState(0);

  useScript(async (wait) => {
    for (let i = 1; i <= PIECES; i++) {
      await wait(420);
      setShown(i);
    }
  }, true);

  const cv = (i: number) => "cv" + (shown > i ? " show" : "");

  return (
    <section id="finale">
      <div className="pathbar">
        <Link className="back" id="finBack" href="/">
          <ArrowLeft />
          {finale.backToMap}
        </Link>
        <span className="kick">{finale.explored(count)}</span>
      </div>
      <div className="conv">
        {finale.cards.map((c, i) => (
          <div key={c.title} className={"card cvn " + cv(i)} style={{ ["--r" as string]: c.tilt }}>
            <div className="kick">{c.kicker}</div>
            <b>{c.title}</b>
          </div>
        ))}
        <svg className={"cvl " + cv(3)} viewBox="0 0 900 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M150 0 C 150 70, 450 50, 450 120 M450 0 V120 M750 0 C 750 70, 450 50, 450 120" />
        </svg>
        <div className={"card hub2 " + cv(4)}>
          <img src={IMG.logo} alt="Quely" />
          <div className="mono">{finale.hubLine}</div>
        </div>
      </div>
      <div className={cv(5)} style={{ maxWidth: 780, marginTop: 34 }}>
        <h2 className="h1" style={{ fontSize: "clamp(32px,4.6vw,52px)" }}>
          {rich(finale.title)}
        </h2>
        <p className="lead">{finale.lead}</p>
        <div className="scene-foot" style={{ justifyContent: "flex-start", marginTop: 30 }}>
          <a
            className="btn ghost"
            id="book2"
            href={links.bookDemo}
            target="_blank"
            rel="noopener"
            onClick={() => track("cta_clicked", "full-picture", { cta: "book_demo" })}
          >
            {finale.bookDemo}
          </a>
          <button
            className="btn"
            id="demo"
            type="button"
            onClick={() => {
              track("cta_clicked", "full-picture", { cta: "ask_question", from: "finale" });
              openQuestions();
            }}
          >
            {finale.askQuestion} <ArrowRight />
          </button>
        </div>
      </div>
      {count < 3 ? (
        <div className="finlinks">
          <b>{finale.explorePrompt}</b>
          {PATH_IDS.map((id) => (
            <Link key={id} className="btn ghost" href={"/" + id}>
              {workflows[id].label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
