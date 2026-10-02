"use client";

import { PathRunner, type StepDef } from "@/components/path/PathRunner";
import { ComparisonTable, ProofCards, QuoteCard, ResultsPage } from "@/components/results/ResultsPage";
import { E } from "./common";
import { Standup } from "./Standup";
import { After } from "./After";
import { SpaceIntro } from "./SpaceIntro";
import { OrbitCheck } from "./OrbitCheck";
import { TagTobi } from "./TagTobi";
import { RetroAnswers } from "./RetroAnswers";
import { RetroFollowUps } from "./RetroFollowUps";
import { RetroSummary } from "./RetroSummary";

// Old way first (standup, after), then the same work in Quely.
const STEPS: StepDef[] = [
  { id: "standup", scene: 0, Component: Standup },
  { id: "after-standup", scene: 1, Component: After },
  { id: "space-intro", scene: 2, Component: SpaceIntro },
  { id: "orbit-blocker-check", scene: 2, Component: OrbitCheck },
  { id: "tag-tobi", scene: 2, Component: TagTobi },
  { id: "retro-answers", scene: 3, Component: RetroAnswers },
  { id: "retro-follow-ups", scene: 3, Component: RetroFollowUps },
  { id: "retro-summary", scene: 3, Component: RetroSummary },
];

function Results() {
  const r = E.results;
  return (
    <ResultsPage pathId="product" title={E.resultsTitle}>
      <div className="fgrid">
        {/* Every usual-way value is the worse one here, including the text rows. */}
        <ComparisonTable usual={r.usual} ours={r.ours} rows={r.rows.map((x) => ({ ...x, worse: true }))} note={r.note} />
        <div className="fside">
          <ProofCards items={r.proof} single />
          <QuoteCard initials="AD" color="#9FD8B4" kicker={r.quote.kicker} text={r.quote.text} />
        </div>
      </div>
    </ResultsPage>
  );
}

export function ProductPath() {
  return <PathRunner pathId="product" totalScenes={E.totalScenes} steps={STEPS} results={<Results />} />;
}
