import { Fragment, type ReactNode } from "react";
import { quelyChrome } from "@/content/shared";
import { QAvatar, type Person } from "@/components/ui/Avatar";
import { rich } from "@/components/ui/Rich";

/** Collapsed task/sprint header shown above a document section. */
export function CollapsedTask({ title, status }: { title: string; status: string }) {
  return (
    <div className="qcollapse">
      <span className="chev">›</span>
      <span className="tic">▣</span>
      <b>{title}</b>
      <span className="stat">{status}</span>
    </div>
  );
}

/** Document section header: title and toolbar. */
export function DocHeader() {
  const d = quelyChrome.docs;
  return (
    <>
      <div className="qdh">
        <span className="chev">⌄</span>
        <span className="tic">▤</span>
        <b>{d.heading}</b>
      </div>
      <div className="qdtools">
        <span>{d.lastEdited}</span>
        <span className="qds">{d.search}</span>
        <span className="qimp">{d.import}</span>
        <span className="qnew">{d.new}</span>
      </div>
    </>
  );
}

export type DocCard = { title: string; meta: string; isNew?: boolean };

/** Small document cards (design path). The first card with `onOpen` is clickable. */
export function DocGrid({
  cards,
  newCard,
  onOpen,
}: {
  cards: DocCard[];
  newCard: { title: string; meta: string };
  onOpen?: () => void;
}) {
  return (
    <div className="qdgrid" id="qdgrid">
      {cards.map((c, i) =>
        i === 0 && onOpen ? (
          <button key={c.title} className={"qdcard" + (c.isNew ? " new2" : "")} id="docCard" onClick={onOpen}>
            <span className="qdi">▤</span>
            <b>{c.title}</b>
            <small>{c.meta}</small>
          </button>
        ) : (
          <div key={c.title} className={"qdcard" + (c.isNew ? " new2" : "")}>
            <span className="qdi">▤</span>
            <b>{c.title}</b>
            <small>{c.meta}</small>
          </div>
        ),
      )}
      <div className="qdcard ghost">
        <span className="qdi">+</span>
        <b>{newCard.title}</b>
        <small>{newCard.meta}</small>
      </div>
    </div>
  );
}

/** Large document cards with a preview area (product path). */
export function BigDocGrid({
  card,
  newCard,
  onOpen,
}: {
  card: { title: string; words: string; time: string; by: string; author: Person; isNew?: boolean };
  newCard: { title: string; meta: string };
  onOpen?: () => void;
}) {
  return (
    <div className="qdgrid big2">
      <button className={"qdcard dcard" + (card.isNew ? " new2" : "")} id="rdoc" onClick={onOpen}>
        <span className="dico">▤</span>
        <span className="dmeta">
          <b>{card.title}</b>
          <span>
            {card.words}
            <em>{card.time}</em>
          </span>
        </span>
        <span className="dfoot">
          <QAvatar person={card.author} size={22} />
          {card.by}
        </span>
      </button>
      <div className="qdcard ghost dcard">
        <span className="dico plus">+</span>
        <span className="dmeta">
          <b>{newCard.title}</b>
          <span>{newCard.meta}</span>
        </span>
      </div>
    </div>
  );
}

/** An opened document. `insert` goes right after the header (e.g. a section Orbit added). */
export function DocView({
  title,
  meta,
  sections,
  closable,
  insert,
}: {
  title: string;
  meta: string;
  sections: { h: string; p: string }[];
  closable?: boolean;
  insert?: ReactNode;
}) {
  return (
    <div className="qdoc">
      <div className="qdoch">
        <span className="tic">▤</span>
        <div>
          <b>{title}</b>
          <small>{meta}</small>
        </div>
        {closable ? <span className="qclose">✕</span> : null}
      </div>
      {insert}
      {sections.map((s) => (
        <Fragment key={s.h}>
          <h4>{s.h}</h4>
          <p>{rich(s.p)}</p>
        </Fragment>
      ))}
    </div>
  );
}
