"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { pathChrome } from "@/content/shared";
import { rich } from "@/components/ui/Rich";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { CoachMark, type CoachSpec } from "./CoachMark";

export const StageContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

/**
 * Provided by the path runner: whether this step shows Back, what Back does, and whether
 * the step is being restored by Back (its stage then renders settled, without entrance animations).
 */
export const StepNavContext = createContext<{ showBack: boolean; back: () => void; restored: boolean }>({
  showBack: false,
  back: () => {},
  restored: false,
});

export type Header = { kicker: string; title: string; line?: string };

export type Foot = {
  /** Status text on the left of the bottom bar. */
  ask: string;
  /** Show the status in full text colour (the prototype does this for "result" lines). */
  strong?: boolean;
  /** The one primary button. Omitted while something is animating. */
  button?: { label: string; onClick: () => void; disabled?: boolean };
};

/** Kicker, title and line above the stage. Re-keyed on each change so it swaps in. */
export function SceneHeader({ kicker, title, line }: Header) {
  return (
    <div className="ajtop">
      <div className="ajcopy swap" key={kicker + title}>
        <div className="kick">{kicker}</div>
        <h2 className="h2" style={{ marginTop: 10, fontSize: "clamp(26px,3.4vw,38px)" }}>
          {rich(title)}
        </h2>
        {line ? (
          <p className="lead" style={{ marginTop: 10 }}>
            {rich(line)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Bottom bar: Back text link (from step 2), status text, one primary button. */
export function BottomBar({ ask, strong, button }: Foot) {
  const { showBack, back } = useContext(StepNavContext);
  return (
    <div className="scene-foot" id="ajFoot">
      {showBack ? (
        <button className="backb" id="backStep" onClick={back}>
          <ArrowLeft size={18} />
          {pathChrome.back}
        </button>
      ) : null}
      <span className="ask" style={strong ? { color: "var(--text)" } : undefined}>
        {ask}
      </span>
      {button ? (
        <button className="btn" id="next" onClick={button.onClick} disabled={button.disabled}>
          {button.label} <ArrowRight />
        </button>
      ) : null}
    </div>
  );
}

/**
 * One step of a path: header, optional meter, stage, bottom bar.
 * Rendered inside the path's persistent `.aj` wrapper.
 */
export function StepFrame({
  header,
  meter,
  foot,
  coach,
  stageClassName,
  children,
}: {
  header: Header;
  meter?: ReactNode;
  foot: Foot;
  coach?: (CoachSpec & { key?: string }) | null;
  stageClassName?: string;
  children: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { restored } = useContext(StepNavContext);
  const { key: coachKey, ...coachSpec } = coach ?? { target: "", title: "" };
  const stageCls = ["ajstage", restored ? "settled" : "", stageClassName ?? ""].filter(Boolean).join(" ");
  return (
    <StageContext.Provider value={stageRef}>
      <SceneHeader {...header} />
      {meter}
      <div className={stageCls} id="ajStage" ref={stageRef}>
        {children}
        {coach ? <CoachMark key={coachKey ?? coachSpec.target} {...coachSpec} /> : null}
      </div>
      <BottomBar {...foot} />
    </StageContext.Provider>
  );
}
