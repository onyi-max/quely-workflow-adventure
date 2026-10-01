"use client";

import { QAvatar, type Person } from "@/components/ui/Avatar";
import { rich } from "@/components/ui/Rich";
import { useShow } from "@/lib/motion";

function Caption({ text, instant }: { text: string; instant?: boolean }) {
  const ref = useShow(instant);
  return (
    <div className="cap" ref={ref}>
      {rich(text)}
    </div>
  );
}

function Summary({ text, instant }: { text: string; instant?: boolean }) {
  const ref = useShow(instant);
  return (
    <div className="csum" ref={ref}>
      {rich(text)}
    </div>
  );
}

/** A dark video-call grid with live captions, for the old-way standup. */
export function StandupCall({
  oldTag,
  label,
  timer,
  tiles,
  talking,
  captions,
  summary,
  instant,
}: {
  oldTag: string;
  label: string;
  timer: string;
  tiles: { person: Person; label: string }[];
  /** Index of the tile currently speaking, or -1. */
  talking: number;
  captions: string[];
  /** Shown once the standup has moved on. */
  summary?: string | null;
  instant?: boolean;
}) {
  return (
    <div className="callgrid show pcall">
      <div className="chead">
        <span className="oldtag">{oldTag}</span>
        <span className="kick" style={{ color: "#fff" }}>
          {label}
        </span>
        <span className="ctimer mono" id="ctimer">
          {timer}
        </span>
      </div>
      <div className="tiles">
        {tiles.map((t, i) => (
          <div key={t.label} className={"tile" + (i === talking ? " talk" : "")} data-i={i}>
            <QAvatar person={t.person} />
            <span className="tname">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="caps" id="caps">
        {captions.map((c, i) => (
          <Caption key={i} text={c} instant={instant} />
        ))}
      </div>
      {summary ? <Summary text={summary} instant={instant} /> : null}
    </div>
  );
}
