"use client";

import { useContext, useEffect } from "react";
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

function build(cls: string, title: string, text?: string) {
  const c = document.createElement("div");
  c.className = cls;
  c.setAttribute("role", "status");
  const b = document.createElement("b");
  b.textContent = title;
  c.appendChild(b);
  if (text) c.appendChild(document.createTextNode(text));
  return c;
}

/**
 * The purple "Click here" tooltip, like the prototype's coach() helper. Highlights its
 * target with .hot2.
 * - Target inside the threads/Orbit panel: the tooltip goes in the panel's flow, right
 *   after the target (or its prompt/composer/buttons row), and the panel scrolls it into
 *   view, so it never covers panel content.
 * - Anywhere else: positioned next to the target inside the stage.
 * Render with a `key` that changes when the target changes.
 */
export function CoachMark({ target, title, text, place = "left", delay = 0 }: CoachSpec) {
  const stageRef = useContext(StageContext);

  useEffect(() => {
    let el: Element | null = null;
    let c: HTMLDivElement | null = null;
    let scrollT: ReturnType<typeof setTimeout> | undefined;
    const t = setTimeout(() => {
      const st = stageRef?.current;
      el = st?.querySelector(target) ?? null;
      if (!st || !el) return;
      el.classList.add("hot2");

      const panel = el.closest("#qright") as HTMLElement | null;
      if (panel) {
        c = build("coach inline", title, text);
        const anchor = el.closest(".obtns,.qask,.qcompose,.prompt") ?? el;
        anchor.after(c);
        void c.offsetWidth;
        c.classList.add("show");
        const cc = c;
        scrollT = setTimeout(() => {
          const pr = panel.getBoundingClientRect();
          const cr = cc.getBoundingClientRect();
          if (cr.bottom > pr.bottom || cr.top < pr.top) panel.scrollTop += cr.bottom - pr.bottom + 12;
        }, 60);
        return;
      }

      c = build("coach " + place, title, text);
      st.appendChild(c);
      const r = el.getBoundingClientRect();
      const s = st.getBoundingClientRect();
      const cw = c.offsetWidth;
      const ch = c.offsetHeight;
      let x: number;
      let y: number;
      if (place === "left") {
        x = r.left - s.left - cw - 16;
        y = r.top - s.top + r.height / 2 - ch / 2;
      } else if (place === "below") {
        x = r.left - s.left;
        y = r.bottom - s.top + 14;
      } else {
        x = r.left - s.left + r.width / 2 - cw / 2;
        y = r.top - s.top - ch - 14;
      }
      x = Math.max(8, Math.min(x, s.width - cw - 8));
      y = Math.max(8, y);
      if (window.innerWidth < 900) {
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
      clearTimeout(scrollT);
      el?.classList.remove("hot2");
      c?.remove();
    };
  }, [stageRef, target, title, text, place, delay]);

  return null;
}
