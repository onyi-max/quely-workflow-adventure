"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia(QUERY).matches;
}

class Cancelled extends Error {}

export type Wait = (ms: number) => Promise<void>;

/**
 * Runs an async script (a timed sequence of state changes) while `active` is true.
 * `wait(ms)` resolves after ms (0 under reduced motion) and throws if the component
 * unmounts, `active` turns false, or `key` changes, so nothing runs against a stale step.
 * Don't derive `active` from state the script itself changes, or it will cancel itself.
 */
export function useScript(script: (wait: Wait) => Promise<void>, active: boolean, key: unknown = 0) {
  const ref = useRef(script);
  ref.current = script;
  useEffect(() => {
    if (!active) return;
    let alive = true;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const reduce = prefersReducedMotion();
    const wait: Wait = (ms) =>
      new Promise((resolve, reject) => {
        const t = setTimeout(
          () => {
            timers.delete(t);
            if (alive) resolve();
            else reject(new Cancelled());
          },
          reduce ? 0 : ms,
        );
        timers.add(t);
      });
    ref.current(wait).catch((e) => {
      if (!(e instanceof Cancelled)) throw e;
    });
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [active, key]);
}

/**
 * Returns a ref; the element gets the `show` class right after it's first laid out, so its
 * CSS transition plays (the prototype's show() helper). With `instant`, it starts shown.
 * Uses a forced reflow rather than animation frames so it also works in background tabs.
 */
export function useShow<T extends HTMLElement = HTMLDivElement>(instant = false) {
  const ref = useRef<T | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!instant) void el.offsetWidth;
    el.classList.add("show");
  }, [instant]);
  return ref;
}

/**
 * False on the first render, then true before the first paint (after a forced reflow),
 * so a class keyed on it transitions in. `skip` starts it true.
 */
export function useEntered(skip = false) {
  const [entered, setEntered] = useState(skip);
  useLayoutEffect(() => {
    if (entered) return;
    void document.body.offsetWidth;
    setEntered(true);
  }, [entered]);
  return entered;
}

/** Delay helper for one-off timeouts that respects reduced motion. */
export function motionDelay(ms: number) {
  return prefersReducedMotion() ? 0 : ms;
}
