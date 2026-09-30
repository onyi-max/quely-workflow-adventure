"use client";

import { useEffect, useRef } from "react";

export type MeterCopy = {
  title: string;
  max: number;
  maxLabel: string;
  unit: string;
  label: string;
  tabs: string;
  pings: string;
  over: string;
};

/**
 * The context-cost meter (AJ's tab hunt only). The gauge is scaled to `max` minutes;
 * past it the bar goes striped red, shakes, bursts, and stamps "Over the limit".
 * `settled` shows the current values without the entrance/overflow animations (used on Back).
 */
export function ContextCostMeter({
  copy,
  minutes,
  tabs,
  pings,
  settled,
}: {
  copy: MeterCopy;
  minutes: number;
  tabs: number;
  pings: number;
  settled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(minutes);

  const raw = minutes / copy.max;
  const p = Math.max(0, Math.min(1, raw));
  const level = p < 0.34 ? "lo" : p < 0.67 ? "mid" : "hi";
  const maxed = raw >= 1;

  // Flash the meter whenever the numbers go up, like the prototype's meter().
  useEffect(() => {
    const el = ref.current;
    if (el && minutes > prev.current) {
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    }
    prev.current = minutes;
  }, [minutes]);

  const cls = ["meter", "strip", settled ? "settled" : "appear", maxed ? "maxed" : ""].filter(Boolean).join(" ");

  return (
    <div className={cls} id="meter" aria-live="polite" ref={ref}>
      <div className="mhead">
        <span className="kick">{copy.title}</span>
        <b className="gnum">
          {minutes}
          {copy.unit}
        </b>
        <span className="glab">{copy.label}</span>
        {maxed ? <span className="overtag">{copy.over}</span> : null}
      </div>
      <div className="gauge">
        <i id="gfill" className={minutes > 0 ? level : undefined} style={{ width: p * 100 + "%" }} />
        <span className="gmax mono">{copy.maxLabel}</span>
        {maxed && !settled ? (
          <span className="burst" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : null}
      </div>
      <div className="mstats">
        <span className="mrow">
          <span>{copy.tabs}</span>
          <b>{tabs}</b>
        </span>
        <span className="mrow">
          <span>{copy.pings}</span>
          <b>{pings}</b>
        </span>
      </div>
    </div>
  );
}
