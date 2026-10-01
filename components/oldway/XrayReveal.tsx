"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import { NorthwindMock } from "./NorthwindMock";

export type Pin = { tag: string; text: string; at: number; left: string; top: string; tilt: string };

/**
 * The screen with a draggable handle: pulling it left wipes in a wireframe and reveals
 * the designer's notes behind the screen. `reveal` is 0 (closed) to 1 (fully open).
 */
export function XrayReveal({
  pins,
  shown,
  reveal,
  onReveal,
  onNudge,
  initials,
  handleLabel,
}: {
  pins: Pin[];
  /** Indexes of pins already revealed (they stay revealed). */
  shown: number[];
  reveal: number;
  onReveal: (f: number) => void;
  /** Move the handle by a step relative to its latest position (arrow keys). */
  onNudge: (delta: number) => void;
  initials: string;
  handleLabel: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const cut = (1 - reveal) * 100 + "%";

  const pos = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    return 1 - (clientX - r.left) / r.width;
  };

  const onHandleDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onHandleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current) onReveal(pos(e.clientX));
  };
  const onBoxDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".handle")) return;
    onReveal(pos(e.clientX));
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      onNudge(0.1);
      e.preventDefault();
    }
    if (e.key === "ArrowRight") {
      onNudge(-0.1);
      e.preventDefault();
    }
  };

  return (
    <div
      className="xray"
      id="xr"
      ref={box}
      style={{ ["--cut" as string]: cut, ["--cutpx" as string]: cut }}
      onPointerDown={onBoxDown}
    >
      <NorthwindMock />
      <div className="wire">
        <NorthwindMock />
      </div>
      <div className="pins">
        {pins.map((p, i) => (
          <div
            key={p.tag}
            className={"pin thought" + (shown.includes(i) ? " show" : "")}
            data-at={p.at}
            style={{ left: p.left, top: p.top, ["--r" as string]: p.tilt }}
          >
            <span className="tav">{initials}</span>
            <div className="ttag">{p.tag}</div>
            <div className="ttx">{p.text}</div>
          </div>
        ))}
      </div>
      <div
        className="handle"
        id="hd"
        role="slider"
        tabIndex={0}
        aria-label={handleLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(reveal * 100)}
        onPointerDown={onHandleDown}
        onPointerMove={onHandleMove}
        onPointerUp={() => (drag.current = false)}
        onKeyDown={onKey}
      >
        <span>
          <svg className="i" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/** Which pins a given reveal position uncovers (same rule as the prototype). */
export function pinsUncovered(pins: Pin[], f: number) {
  return pins.map((p, i) => (f >= 1 - p.at + 0.02 ? i : -1)).filter((i) => i >= 0);
}
