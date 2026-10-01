"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { prefersReducedMotion } from "@/lib/motion";
import { markDone } from "@/lib/progress";
import type { PathId } from "@/lib/paths";
import { pathChrome } from "@/content/shared";
import { ArrowLeft } from "@/components/ui/icons";
import { StepNavContext } from "./StepFrame";

/**
 * What every step component receives.
 * - `saved`: the state the step was in when the visitor left it, when they come back with Back.
 * - `save`: call with the step's current state whenever it changes.
 * - `restored`: true when the step is being shown again via Back; render the saved state
 *   without replaying its animations.
 */
export type StepProps<S = unknown> = {
  saved?: S;
  save: (s: S) => void;
  next: () => void;
  restored: boolean;
};

export type StepDef = {
  id: string;
  /** 0-based scene number shown in the header bars. Several steps can share one. */
  scene: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<StepProps<any>>;
};

type Nav = { idx: number; n: number; restored: boolean };

/**
 * Runs one path: the top bar (Back to the map, scene bars), the current step, and the
 * results page once the last step calls next(). Keeps the per-step history that Back uses.
 */
export function PathRunner({
  pathId,
  totalScenes,
  steps,
  results,
}: {
  pathId: PathId;
  totalScenes: number;
  steps: StepDef[];
  results: ReactNode;
}) {
  const [nav, setNav] = useState<Nav>({ idx: 0, n: 0, restored: false });
  const saved = useRef<Record<number, unknown>>({});
  const viewedScenes = useRef(new Set<number>());
  const started = useRef(false);

  const { idx } = nav;
  const done = idx >= steps.length;
  const step = done ? null : steps[idx];

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track("path_started", pathId);
    window.scrollTo({ top: 0 });
  }, [pathId]);

  useEffect(() => {
    if (!step || viewedScenes.current.has(step.scene)) return;
    viewedScenes.current.add(step.scene);
    track("scene_viewed", pathId, { scene: step.scene + 1, step: step.id });
  }, [step, pathId]);

  useEffect(() => {
    if (!done) return;
    markDone(pathId);
    track("path_completed", pathId);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [done, pathId]);

  const next = useCallback(() => {
    setNav((s) => ({ idx: s.idx + 1, n: s.n + 1, restored: false }));
  }, []);

  // Read the current position from a ref so tracking stays out of the state updater
  // (React may run updaters twice).
  const navRef = useRef(nav);
  navRef.current = nav;

  const back = useCallback(() => {
    const s = navRef.current;
    if (s.idx === 0 || s.idx >= steps.length) return;
    delete saved.current[s.idx];
    track("step_back", pathId, {
      from: steps[s.idx].id,
      to: steps[s.idx - 1].id,
      scene: steps[s.idx - 1].scene + 1,
    });
    setNav({ idx: s.idx - 1, n: s.n + 1, restored: true });
  }, [pathId, steps]);

  const save = useCallback(
    (s: unknown) => {
      saved.current[idx] = s;
    },
    [idx],
  );

  const current = done ? totalScenes - 1 : step!.scene;
  const Comp = step?.Component;

  return (
    <section id="path" aria-live="polite">
      <div className="pathbar">
        <Link className="back" id="toMap" href="/">
          <ArrowLeft />
          {pathChrome.backToMap}
        </Link>
        <div className="steps">
          <span id="stepLabel">{done ? pathChrome.complete : pathChrome.scene(current + 1, totalScenes)}</span>
          <span id="stepBars" style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {Array.from({ length: totalScenes }, (_, k) => (
              <i
                key={k}
                style={{
                  width: 30,
                  height: 8,
                  border: "2px solid var(--ink)",
                  display: "block",
                  background: k <= current ? "var(--purple)" : "var(--surface)",
                }}
              />
            ))}
          </span>
        </div>
      </div>
      <div id="sceneHost">
        {done || !Comp ? (
          results
        ) : (
          <div className="aj">
            <StepNavContext.Provider value={{ showBack: idx > 0, back, restored: nav.restored }}>
              <Comp
                key={nav.n}
                saved={nav.restored ? saved.current[idx] : undefined}
                save={save}
                next={next}
                restored={nav.restored}
              />
            </StepNavContext.Provider>
          </div>
        )}
      </div>
    </section>
  );
}
