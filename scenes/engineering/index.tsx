"use client";

import { PathRunner, type StepDef } from "@/components/path/PathRunner";
import { ComparisonTable, ProofCards, QuoteCard, ResultsPage } from "@/components/results/ResultsPage";
import { E } from "./common";
import { Start } from "./Start";
import { Hunt, huntCost } from "./Hunt";
import { InQuely } from "./InQuely";
import { AskOrbit } from "./AskOrbit";
import { Blocker } from "./Blocker";
import { OrbitMiss } from "./OrbitMiss";
import { AskPriya } from "./AskPriya";
import { Schedule } from "./Schedule";

// Old way first (start, hunt), then the same work in Quely.
const STEPS: StepDef[] = [
  { id: "start", scene: 0, Component: Start },
  { id: "hunt", scene: 1, Component: Hunt },
  { id: "in-quely", scene: 1, Component: InQuely },
  { id: "ask-orbit", scene: 2, Component: AskOrbit },
  { id: "blocker", scene: 3, Component: Blocker },
  { id: "orbit-miss", scene: 3, Component: OrbitMiss },
  { id: "ask-priya", scene: 3, Component: AskPriya },
  { id: "schedule", scene: 3, Component: Schedule },
];

function Results() {
  const r = E.results;
  // The usual-way numbers are what the tab hunt costs once every tab is read.
  const usual = huntCost(E.tabs.map((_, i) => i));
  return (
    <ResultsPage pathId="engineering" title={E.resultsTitle}>
      <div className="fgrid">
        <ComparisonTable
          usual={r.usual}
          ours={r.ours}
          note={r.note}
          rows={[
            { label: r.rows.minutes.label, usual: usual.minutes, ours: r.rows.minutes.ours },
            { label: r.rows.tabs.label, usual: usual.tabs, ours: r.rows.tabs.ours },
            { label: r.rows.pings.label, usual: usual.pings, ours: r.rows.pings.ours },
          ]}
        />
        <div className="fside">
          <ProofCards items={r.proof} />
          <QuoteCard initials="AJ" kicker={r.quote.kicker} text={r.quote.text} />
        </div>
      </div>
    </ResultsPage>
  );
}

export function EngineeringPath() {
  return <PathRunner pathId="engineering" totalScenes={E.totalScenes} steps={STEPS} results={<Results />} />;
}
