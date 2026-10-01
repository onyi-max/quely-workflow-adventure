"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { ThreadsPanel } from "@/components/quely/ThreadsPanel";
import { DocGrid, DocHeader, DocView } from "@/components/quely/DocumentSection";
import { DISCUSSION, E, TASK, TaskHeader } from "./common";

/** Miracle's decisions doc, opened. Also used by the next step. */
export function OpenDoc() {
  const v = E.doc.view;
  return <DocView title={v.title} meta={v.meta} sections={v.sections} closable />;
}

/** Scene 4: the engineer opens the doc Miracle wrote, in the Space. */
export function Doc({ saved, save, next }: StepProps<{ opened: boolean }>) {
  const c = E.doc;
  const [opened, setOpened] = useState(saved?.opened ?? false);

  useEffect(() => save({ opened }), [opened, save]);

  const open = () => setOpened(true);

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={
        opened
          ? { ask: c.openedAsk, strong: true, button: { label: c.openedButton, onClick: next } }
          : { ask: c.ask, button: { label: c.button, onClick: open } }
      }
      coach={opened ? null : { target: "#docCard", title: c.coach.title, text: c.coach.text, place: "below", delay: 400 }}
    >
      <QuelyApp
        task={TASK}
        carried={false}
        main={
          <>
            <TaskHeader />
            <div className="qdocsec">
              {opened ? (
                <OpenDoc />
              ) : (
                <>
                  <DocHeader />
                  <DocGrid cards={c.cards} newCard={c.newCard} onOpen={open} />
                </>
              )}
            </div>
          </>
        }
        right={<ThreadsPanel threads={DISCUSSION} pulse={false} label={E.discussion.label} listId="dth" />}
      />
    </StepFrame>
  );
}
