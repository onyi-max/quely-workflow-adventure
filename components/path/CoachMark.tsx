"use client";

import { useContext, useEffect, useRef } from "react";
import { motionDelay } from "@/lib/motion";
import { StageContext } from "./StepFrame";

export type CoachSpec = {
  /** CSS selector, resolved inside the stage. */
  target: string;
  title: string;
  text?: string;
  place?: "left" | "below" | "above";
  /** ms before it appears. */
  delay?: number;
};

/**
 * The purple "Click here" tooltip. Highlights its target with .hot2 and positions itself
 * next to it inside the stage, exactly like the prototype's coach() helper.
 * Render with a `key` that changes when the target changes.
 */
export function CoachMark({ target, title, text, place = "left", delay = 0 }: CoachSpec) {
  const stageRef = useContext(StageContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let el: Element | null = null;
    const t = setTimeout(() => {
      const st = stageRef?.current;
      const c = ref.current;
      el = st?.querySelector(target) ?? null;
      if (!st || !c || !el) return;
      el.classList.add("hot2");
      const r = el.getBoundingClientRect();
      const s = st.getBoundingClientRect();
      let cls = place;
      c.className = "coach " + cls;
      c.style.visibility = "visible";
      const cw = c.offsetWidth;
      const ch = c.offsetHeight;
      let x: number;
      let y: number;
      if (place === "left") {
        x = r.left - s.left - cw - 16;
        y = r.top - s.top + r.height / 2 - ch / 2;
      } else if (place === "below") {
        x = r.left - s.left + r.width / 2 - cw / 2;
        y = r.bottom - s.top + 14;
      } else {
        x = r.left - s.left + r.width / 2 - cw / 2;
        y = r.top - s.top - ch - 14;
      }
      x = Math.max(8, Math.min(x, s.width - cw - 8));
      y = Math.max(8, y);
      if (window.innerWidth < 900) {
        cls = "below";
        c.className = "coach below";
        x = Math.max(8, Math.min(r.left - s.left, s.width - cw - 8));
        y = r.bottom - s.top + 12;
      }
      c.style.left = x + "px";
      c.style.top = y + "px";
      void c.offsetWidth;
      c.classList.add("show");
    }, motionDelay(delay));
    return () => {
      clearTimeout(t);
      el?.classList.remove("hot2");
    };
  }, [stageRef, target, place, delay]);

  return (
    <div ref={ref} className={"coach " + place} style={{ visibility: "hidden" }} role="status">
      <b>{title}</b>
      {text}
    </div>
  );
}
