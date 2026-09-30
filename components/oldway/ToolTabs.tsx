"use client";

import type { ReactNode } from "react";
import { ToolIcon, type ToolIconKind } from "@/components/quely/ToolIcon";
import { useEntered } from "@/lib/motion";

export type ToolTab = { icon: ToolIconKind; title: string; body: string };

const TILT = [-1.5, 1, -1, 1.5, -1];

/**
 * The scattered tool tabs AJ has to open one by one. Unread tabs blur their text;
 * `hot` is the tab just opened.
 */
export function ToolTabs({
  tabs,
  read,
  hot,
  onOpen,
  hint,
  openLabel,
  readLabel,
  fly,
  instant,
}: {
  tabs: ToolTab[];
  read: number[];
  hot: number | null;
  onOpen: (i: number) => void;
  hint: ReactNode;
  openLabel: string;
  readLabel: string;
  fly?: boolean;
  instant?: boolean;
}) {
  const open = useEntered(!!instant);

  return (
    <div id="tabs" className={"tabs" + (open ? " open" : "") + (fly ? " fly" : "")}>
      <div className="tabhint mono">
        <span className="dotp" />
        {hint}
      </div>
      {tabs.map((t, i) => {
        const isRead = read.includes(i);
        return (
          <button
            key={i}
            className={"tab" + (isRead ? " read" : "") + (hot === i ? " hot" : "")}
            data-i={i}
            style={{ ["--d" as string]: `${i * 90}ms`, ["--r" as string]: `${TILT[i % TILT.length]}deg` }}
            onClick={() => onOpen(i)}
          >
            <span className="thead">
              <ToolIcon kind={t.icon} />
              <b>{t.title}</b>
              <span className="open">{isRead ? readLabel : openLabel}</span>
            </span>
            <em>{t.body}</em>
          </button>
        );
      })}
    </div>
  );
}
