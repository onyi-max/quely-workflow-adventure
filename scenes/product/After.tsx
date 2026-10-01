"use client";

import type { StepProps } from "@/components/path/PathRunner";
import { StepFrame } from "@/components/path/StepFrame";
import { DmWindows } from "@/components/oldway/DmWindows";
import { E, people } from "./common";

/** Scene 2: after standup, Aditi relays between the designer and the engineer in DMs. */
export function After({ next, restored }: StepProps) {
  const c = E.after;
  return (
    <StepFrame
      header={{ kicker: c.kicker, title: c.title, line: c.line }}
      foot={{ ask: c.doneAsk, strong: true, button: { label: c.doneButton, onClick: next } }}
    >
      <DmWindows
        oldTag={c.oldTag}
        label={c.label}
        relay={c.relay}
        dms={c.dms.map((d) => ({
          label: d.label,
          title: d.title,
          messages: d.messages.map((m) => ({ person: people[m.who], time: m.time, text: m.text })),
        }))}
        consequences={c.consequences}
        instant={restored}
      />
    </StepFrame>
  );
}
