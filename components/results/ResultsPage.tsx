"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { links, results } from "@/content/results";
import { workflows } from "@/content/map";
import { track } from "@/lib/analytics";
import { nextPath, useProgress } from "@/lib/progress";
import { PATH_IDS, type PathId } from "@/lib/paths";
import { rich } from "@/components/ui/Rich";
import { ArrowRight, MedalIcon } from "@/components/ui/icons";
import { QAvatar } from "@/components/ui/Avatar";

export type Row = { label: string; usual: number | string; ours: number | string; worse?: boolean };

/** "The usual way" vs "X's way" table. The usual-way value is red when it's worse. */
export function ComparisonTable({
  usual,
  ours,
  rows,
  note,
}: {
  usual: string;
  ours: string;
  rows: Row[];
  note: string;
}) {
  return (
    <div className="card resultbox">
      <div className="cmp head">
        <span />
        <b>{usual}</b>
        <b>{ours}</b>
      </div>
      {rows.map((r) => {
        const worse = r.worse ?? (typeof r.usual === "number" && typeof r.ours === "number" && r.usual > r.ours);
        return (
          <div className="cmp" key={r.label}>
            <span>{r.label}</span>
            <b className={worse ? "worse" : ""}>{r.usual}</b>
            <b>{r.ours}</b>
          </div>
        );
      })}
      <p className="rnote">{note}</p>
    </div>
  );
}

export function ProofCards({ items, single }: { items: { big: string; text: string }[]; single?: boolean }) {
  return (
    <div className="proof" style={single ? { gridTemplateColumns: "1fr" } : undefined}>
      {items.map((p) => (
        <div className="card" key={p.big}>
          <div className="big">{p.big}</div>
          <small>{p.text}</small>
        </div>
      ))}
    </div>
  );
}

export function QuoteCard({
  initials,
  color,
  kicker,
  text,
}: {
  initials: string;
  color?: string;
  kicker: string;
  text: string;
}) {
  return (
    <div className="card ajq">
      <QAvatar person={{ initials, color: color ?? "var(--purple)" }} big />
      <div>
        <div className="kick" style={{ marginBottom: 6 }}>
          {kicker}
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}

/** Keep exploring + Talk to us. */
export function CtaCards({ pathId, count, nextId }: { pathId: PathId; count: number; nextId: PathId }) {
  const all = count === 3;
  const n = results.next;
  return (
    <div className="ctarow">
      <div className="card ctacard">
        <div className="kick">{all ? n.kickerAll : n.kickerMore}</div>
        <b>{all ? n.titleAll : workflows[nextId].teaser}</b>
        <span>{all ? n.lineAll : n.lineMore(3 - count)}</span>
        <Link
          className="btn"
          id="cont"
          href={all ? "/full-picture" : `/${nextId}`}
          onClick={() => track("cta_clicked", pathId, { cta: "next_workflow", to: all ? "full-picture" : nextId })}
        >
          {all ? n.buttonAll : n.buttonMore} <ArrowRight />
        </Link>
      </div>
      <div className="card ctacard alt">
        <div className="kick">{results.talk.kicker}</div>
        <b>{results.talk.title}</b>
        <span>{results.talk.line}</span>
        <a
          className="btn ghost"
          id="book"
          href={links.bookDemo}
          target="_blank"
          rel="noopener"
          onClick={() => track("cta_clicked", pathId, { cta: "book_demo" })}
        >
          {results.talk.button} <ArrowRight />
        </a>
      </div>
    </div>
  );
}

/** Path complete: title, badge, the path's own body, then the two CTA cards. */
export function ResultsPage({ pathId, title, children }: { pathId: PathId; title: string; children: ReactNode }) {
  const { done } = useProgress();
  // Count this path as done straight away (it's saved in an effect).
  const withThis = { ...done, [pathId]: true };
  const count = PATH_IDS.filter((k) => withThis[k]).length;
  return (
    <div className="finish">
      <div className="fhead">
        <div>
          <div className="kick">{results.complete}</div>
          <h2 className="h2" style={{ marginTop: 12 }}>
            {rich(title)}
          </h2>
        </div>
        <div className="card badge">
          <span className="medal">
            <MedalIcon />
          </span>
          <div>
            <div className="kick">{results.explored(count)}</div>
            <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 22, letterSpacing: "-.02em" }}>
              {workflows[pathId].label}
            </div>
          </div>
        </div>
      </div>
      <div className="fbody">{children}</div>
      <CtaCards pathId={pathId} count={count} nextId={nextPath(withThis, pathId)} />
    </div>
  );
}
