"use client";

import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { ThreadsPanel } from "@/components/quely/ThreadsPanel";
import { QuestionBanner } from "@/components/oldway/QuoteBanner";
import { E, people, TASK, THREADS } from "./common";

export function BlockerBanner({ instant }: { instant?: boolean }) {
  const b = E.blocker.banner;
  return <QuestionBanner person={people.aj} kicker={b.kicker} question={b.question} note={b.note} instant={instant} />;
}

/** Scene 4: while building, AJ hits a question. */
export function Blocker({ next, restored }: StepProps) {
  const c = E.blocker;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={{ ask: c.ask, button: { label: c.button, onClick: next } }}
      coach={{ target: "#askOrbit", title: c.coach.title, text: c.coach.text, place: "left", delay: 600 }}
    >
      <BlockerBanner instant={restored} />
      <QuelyApp
        task={TASK}
        right={<ThreadsPanel threads={THREADS} resolveLabel={E.threadActions.resolve} onAskOrbit={next} />}
      />
    </StepFrame>
  );
}
