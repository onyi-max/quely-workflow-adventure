"use client";

import { useEffect, useState } from "react";
import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame, type Foot } from "@/components/path/StepFrame";
import { ContextCostMeter } from "@/components/path/ContextCostMeter";
import { ToolTabs } from "@/components/oldway/ToolTabs";
import { HuntQuote } from "@/components/oldway/QuoteBanner";
import { motionDelay, useEntered } from "@/lib/motion";
import { E, people, TicketScene } from "./common";

type S = { read: number[]; hot: number | null; quote: boolean };

/** What the tab hunt costs, from the tabs read so far. Also used on the results page. */
export function huntCost(read: number[]) {
  return {
    minutes: read.reduce((a, i) => a + E.tabs[i].minutes, 0),
    tabs: read.length,
    pings: read.filter((i) => E.tabs[i].dm).length,
  };
}

/** Scene 2: open each tool tab while the context-cost meter climbs past 15 minutes. */
export function Hunt({ saved, save, next, restored }: StepProps<S>) {
  const c = E.hunt;
  const [read, setRead] = useState<number[]>(saved?.read ?? []);
  const [hot, setHot] = useState<number | null>(saved?.hot ?? null);
  const [quote, setQuote] = useState(saved?.quote ?? false);
  const [leaving, setLeaving] = useState(false);
  // Scene 1's picture fades out as the tabs come in.
  const s1Gone = useEntered(restored);

  useEffect(() => save({ read, hot, quote }), [read, hot, quote, save]);

  const total = E.tabs.length;
  const allRead = read.length === total;
  const cost = huntCost(read);

  // Once every tab is read, AJ's quote slides in.
  useEffect(() => {
    if (!allRead || quote) return;
    const t = setTimeout(() => setQuote(true), motionDelay(300));
    return () => clearTimeout(t);
  }, [allRead, quote]);

  // Leaving: the tabs and ticket fly off, then the Quely screen takes over.
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(next, motionDelay(600));
    return () => clearTimeout(t);
  }, [leaving, next]);

  const open = (i: number) => {
    if (leaving || read.includes(i)) return;
    setRead((r) => [...r, i]);
    setHot(i);
  };
  const nextUnread = () => E.tabs.findIndex((_, i) => !read.includes(i));

  let foot: Foot;
  if (quote) {
    foot = {
      ask: c.doneAsk(cost.minutes),
      strong: true,
      // Stays enabled while the tabs fly off, as in the prototype; repeat clicks do nothing.
      button: { label: c.doneButton, onClick: () => setLeaving(true) },
    };
  } else if (allRead) {
    foot = { ask: c.ask(read.length) };
  } else {
    foot = { ask: c.ask(read.length), button: { label: c.button, onClick: () => open(nextUnread()) } };
  }

  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      meter={
        leaving ? null : (
          <ContextCostMeter copy={E.meter} minutes={cost.minutes} tabs={cost.tabs} pings={cost.pings} settled={restored} />
        )
      }
      foot={foot}
    >
      <TicketScene gone={s1Gone} leaving />
      <ToolTabs
        tabs={E.tabs}
        read={read}
        hot={hot}
        onOpen={open}
        openLabel={c.open}
        readLabel={c.read}
        fly={leaving}
        instant={restored}
        hint={
          <>
            {c.hint}
            <b id="readN">{c.readOf(read.length)}</b>
            {c.hintSuffix}
          </>
        }
      />
      {quote && !leaving ? (
        <HuntQuote person={people.aj} quote={E.huntQuote.quote} note={E.huntQuote.note} instant={restored} />
      ) : null}
    </StepFrame>
  );
}
