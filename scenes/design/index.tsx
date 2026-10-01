"use client";

import { PathRunner, type StepDef } from "@/components/path/PathRunner";
import { ComparisonTable, ResultsPage } from "@/components/results/ResultsPage";
import { E } from "./common";
import { Start } from "./Start";
import { Receive } from "./Receive";
import { Xray } from "./Xray";
import { Space } from "./Space";
import { Doc } from "./Doc";
import { AskOrbit } from "./AskOrbit";
import { System } from "./System";

// Old way first (start, receive, xray), then the same handoff in Quely.
const STEPS: StepDef[] = [
  { id: "start", scene: 0, Component: Start },
  { id: "receive", scene: 1, Component: Receive },
  { id: "xray", scene: 2, Component: Xray },
  { id: "space", scene: 3, Component: Space },
  { id: "doc", scene: 3, Component: Doc },
  { id: "ask-orbit", scene: 3, Component: AskOrbit },
  { id: "system", scene: 4, Component: System },
];

function Results() {
  const r = E.results;
  return (
    <ResultsPage pathId="design" title={E.resultsTitle}>
      <div className="fgrid">
        <ComparisonTable usual={r.usual} ours={r.ours} rows={r.rows} note={r.note} />
        <div className="fside">
          <div className="card" style={{ padding: "22px 26px", background: "var(--amber2)", flex: 1 }}>
            <div className="kick" style={{ color: "#B7791F" }}>
              {r.quote.kicker}
            </div>
            <div
              style={{
                fontFamily: "var(--head)",
                fontWeight: 700,
                fontSize: "clamp(20px,2.2vw,26px)",
                letterSpacing: "-.02em",
                lineHeight: 1.25,
                marginTop: 10,
              }}
            >
              {r.quote.text}
            </div>
            <div className="mono" style={{ fontSize: 15, color: "var(--muted)", marginTop: 12 }}>
              {r.quote.by}
            </div>
          </div>
        </div>
      </div>
    </ResultsPage>
  );
}

export function DesignPath() {
  return <PathRunner pathId="design" totalScenes={E.totalScenes} steps={STEPS} results={<Results />} />;
}
