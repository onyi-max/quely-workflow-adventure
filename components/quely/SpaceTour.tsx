"use client";

import { useContext, useEffect, useRef } from "react";
import { StageContext } from "@/components/path/StepFrame";

export type TourCallout = { n: string; title: string; text: string };

function build(cls: string, c: TourCallout) {
  const el = document.createElement("div");
  el.className = cls;
  const n = document.createElement("span");
  n.className = "tn";
  n.textContent = c.n;
  const body = document.createElement("div");
  const b = document.createElement("b");
  b.textContent = c.title;
  const s = document.createElement("small");
  s.textContent = c.text;
  body.append(b, s);
  el.append(n, body);
  return el;
}

/**
 * Numbered callouts introducing a Space, as in the prototype's tour():
 *  1. over the attachments list (positioned inside the stage),
 *  2. inside the threads panel, in its flow above the threads, so it never covers the composer.
 * Each highlighted area gets an outline. `shown` is how many callouts are visible.
 */
export function SpaceTour({ callouts, shown, instant }: { callouts: TourCallout[]; shown: number; instant?: boolean }) {
  const stageRef = useContext(StageContext);
  const made = useRef<{ el: HTMLElement; target: Element }[]>([]);

  useEffect(() => {
    const st = stageRef?.current;
    if (!st) return;
    for (let i = made.current.length; i < Math.min(shown, callouts.length); i++) {
      const c = callouts[i];
      if (i === 0) {
        const target = st.querySelector("#qatt");
        if (!target) continue;
        target.classList.add("tourhot");
        let el: HTMLElement;
        if (window.innerWidth < 900) {
          // On narrow screens the list fills the width, so a floating callout would hide the
          // attachment names. Put it in the flow just above the list instead.
          el = build("tourc inl", c);
          target.before(el);
        } else {
          el = build("tourc right", c);
          st.appendChild(el);
          const rr = target.getBoundingClientRect();
          const s = st.getBoundingClientRect();
          const cw = el.offsetWidth;
          const ch = el.offsetHeight;
          const x = rr.left - s.left + rr.width * 0.45;
          const y = rr.top - s.top + rr.height / 2 - ch / 2;
          el.style.left = Math.max(8, Math.min(x, s.width - cw - 8)) + "px";
          el.style.top = Math.max(8, y) + "px";
        }
        if (!instant) void el.offsetWidth;
        el.classList.add("show");
        made.current.push({ el, target });
      } else {
        const target = st.querySelector("#qright");
        if (!target) continue;
        target.classList.add("tourhot");
        const el = build("tourc inl", c);
        const anchor = target.querySelector(".qfilters") ?? target.querySelector(".qrhead");
        anchor?.after(el);
        if (!instant) void el.offsetWidth;
        el.classList.add("show");
        made.current.push({ el, target });
      }
    }
  }, [stageRef, callouts, shown, instant]);

  useEffect(
    () => () => {
      made.current.forEach(({ el, target }) => {
        el.remove();
        target.classList.remove("tourhot");
      });
      made.current = [];
    },
    [],
  );

  return null;
}
