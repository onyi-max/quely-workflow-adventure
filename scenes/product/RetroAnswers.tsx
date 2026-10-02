"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { QuelyApp } from "@/components/quely/QuelyApp";
import { ThreadsPanel } from "@/components/quely/ThreadsPanel";
import { BigDocGrid, DocHeader } from "@/components/quely/DocumentSection";
import { E, people, PlaybookMain, RETRO_TASK, RetroDoc } from "./common";

/** Scene 4, step 1: the team's retro answers are already in a doc in the sprint playbook. */
export function RetroAnswers({ saved, save, next }: StepProps<{ opened: boolean }>) {
  const r = E.retro;
  const c = r.answers;
  const [opened, setOpened] = useState(saved?.opened ?? false);

  useEffect(() => save({ opened }), [opened, save]);

  const open = () => setOpened(true);
  const d = r.docCard;

  return (
    <StepFrame
      header={{ kicker: r.kicker, title: c.title, line: c.line }}
      foot={
        opened
          ? { ask: c.openedAsk, strong: true, button: { label: c.openedButton, onClick: next } }
          : { ask: c.ask, button: { label: c.button, onClick: open } }
      }
      coach={opened ? null : { target: "#rdoc", title: c.coach.title, text: c.coach.text, place: "below", delay: 400 }}
    >
      <QuelyApp
        task={RETRO_TASK}
        carried={false}
        main={
          <PlaybookMain>
            {opened ? (
              <RetroDoc />
            ) : (
              <>
                <DocHeader />
                <BigDocGrid
                  card={{ title: d.title, words: d.words, time: d.time, by: d.by, author: people.aditi }}
                  newCard={r.newCard}
                  onOpen={open}
                />
              </>
            )}
          </PlaybookMain>
        }
        right={<ThreadsPanel threads={[]} pulse={false} label={r.threadsLabel} />}
      />
    </StepFrame>
  );
}
