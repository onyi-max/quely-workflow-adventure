"use client";

import { QAvatar, type Person } from "@/components/ui/Avatar";
import { useShow } from "@/lib/motion";

/** Amber quote strip under the tabs (".ajquote"). */
export function HuntQuote({ person, quote, note, instant }: { person: Person; quote: string; note: string; instant?: boolean }) {
  const ref = useShow(instant);
  return (
    <div className="ajquote" ref={ref}>
      <QAvatar person={{ initials: person.initials, color: "var(--purple)" }} big />
      <div>
        <p>{quote}</p>
        <small>{note}</small>
      </div>
    </div>
  );
}

/** Amber banner above the stage for a question that comes up mid-task (".qbanner"). */
export function QuestionBanner({
  person,
  kicker,
  question,
  note,
  instant,
}: {
  person: Person;
  kicker: string;
  question: string;
  note: string;
  instant?: boolean;
}) {
  const ref = useShow(instant);
  return (
    <div className="qbanner" ref={ref}>
      <QAvatar person={{ initials: person.initials, color: "var(--purple)" }} big />
      <div>
        <div className="kick">{kicker}</div>
        <p>{question}</p>
        <small>{note}</small>
      </div>
    </div>
  );
}
