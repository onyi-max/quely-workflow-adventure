"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { map, workflows } from "@/content/map";
import { resetProgress, useProgress } from "@/lib/progress";
import { IMG, type PathId } from "@/lib/paths";
import { prefersReducedMotion } from "@/lib/motion";
import { rich } from "@/components/ui/Rich";
import { Avatar } from "@/components/ui/Avatar";
import { LockIcon } from "@/components/ui/icons";

/** Purple box that grows from the clicked card to fill the screen, then fades (prototype's zoomFrom). */
function zoomFrom(el: HTMLElement, cb: () => void) {
  if (prefersReducedMotion()) {
    cb();
    return;
  }
  const r = el.getBoundingClientRect();
  const z = document.createElement("div");
  z.className = "zoom";
  z.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
  document.body.appendChild(z);
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      z.style.cssText = "left:0;top:0;width:100vw;height:100vh";
    }),
  );
  setTimeout(() => {
    cb();
    z.style.opacity = "0";
    setTimeout(() => z.remove(), 450);
  }, 460);
}

export function ProgressBar({ count, onReset }: { count: number; onReset: () => void }) {
  return (
    <div className="progress">
      <div className="pbar">
        {[0, 1, 2].map((i) => (
          <i key={i} className={i < count ? "on" : ""} />
        ))}
      </div>
      <span id="ptext">{map.progress(count)}</span>
      <button className={"reset" + (count === 0 ? " hidden" : "")} id="reset" onClick={onReset}>
        {map.startOver}
      </button>
    </div>
  );
}

export function MapIntro({ count, onReset }: { count: number; onReset: () => void }) {
  return (
    <div className="intro">
      <h1 className="h1">{rich(map.title)}</h1>
      <p className="lead">{map.lead}</p>
      <ProgressBar count={count} onReset={onReset} />
    </div>
  );
}

const NODES: { id: PathId; node: string; link: string; d: string }[] = [
  { id: "design", node: "n-des", link: "l-des", d: "M536 250 C 536 210, 536 190, 536 150" },
  { id: "engineering", node: "n-eng", link: "l-eng", d: "M440 330 C 330 360, 250 360, 150 390" },
  { id: "product", node: "n-pm", link: "l-pm", d: "M632 330 C 742 360, 822 360, 922 390" },
];

export function WorkflowMap({ done, count }: { done: Partial<Record<PathId, boolean>>; count: number }) {
  const router = useRouter();
  const [hover, setHover] = useState<PathId | null>(null);

  useEffect(() => {
    NODES.forEach((n) => router.prefetch("/" + n.id));
  }, [router]);

  return (
    <div className="mapbox">
      <svg className="links" viewBox="0 0 1072 620" preserveAspectRatio="none" aria-hidden="true">
        {NODES.map((n) => (
          <path
            key={n.id}
            id={n.link}
            className={"link" + (done[n.id] ? " lit" : "") + (hover === n.id ? " hover" : "")}
            d={n.d}
          />
        ))}
      </svg>
      <div className="card hub">
        <div className="ring" />
        <img src={IMG.logo} alt="" className="hublogo" />
        <div className="mono">{map.hubLine}</div>
      </div>
      {NODES.map((n) => {
        const w = workflows[n.id];
        const state = done[n.id]
          ? map.state.explored
          : count === 0 && n.id === "design"
            ? map.state.start
            : map.state.explore;
        return (
          <button
            key={n.id}
            className={"card node" + (done[n.id] ? " done" : "")}
            id={n.node}
            data-path={n.id}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            onClick={(e) => zoomFrom(e.currentTarget, () => router.push("/" + n.id))}
          >
            <span className="state">{state}</span>
            <div className="role">{w.role}</div>
            <div className="t">{w.label}</div>
            <div className="who">
              <Avatar initials={w.avatar.initials} color={w.avatar.color} />
              {w.who}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function UnlockBar({ count }: { count: number }) {
  const open = count === 3;
  return (
    <div className={"unlock" + (open ? " open" : "")} id="unlock">
      <span className="lock">
        <LockIcon />
      </span>
      <div style={{ flex: 1, minWidth: 220 }}>
        <b id="unlockT">{open ? map.unlock.open : map.unlock.locked}</b>
        <div style={{ color: "var(--body)", fontSize: 15, marginTop: 2 }}>{map.unlock.line}</div>
      </div>
      {open ? (
        <Link className="btn" id="unlockB" href="/full-picture">
          {map.unlock.button}
        </Link>
      ) : null}
    </div>
  );
}

export function MapView() {
  const { done, count } = useProgress();
  return (
    <section id="map">
      <MapIntro count={count} onReset={resetProgress} />
      <WorkflowMap done={done} count={count} />
      <UnlockBar count={count} />
    </section>
  );
}
