export type SystemNode = { tag: string; title: string; note: string; color: string };

// Node positions and connector paths, in the order of `nodes` (top-left, top-right, bottom-left, bottom-right).
const POS = [
  { left: 0, top: 40 },
  { right: 0, top: 40 },
  { left: 0, top: 300 },
  { right: 0, top: 300 },
];
const PATHS = [
  "M175 160 C 190 170, 200 180, 210 190",
  "M425 160 C 410 170, 400 180, 390 190",
  "M175 330 C 190 320, 200 310, 210 300",
  "M425 330 C 410 320, 400 310, 390 300",
];

/** The current screen in the middle, with what it connects to around it. */
export function SystemMap({
  screen,
  nodes,
  note,
  shownNodes,
  noteShown,
}: {
  screen: { label: string; title: string; role: string; send: string };
  nodes: SystemNode[];
  note: { label: string; text: string };
  shownNodes: number;
  noteShown: boolean;
}) {
  return (
    <div className="sys" id="sys">
      <svg viewBox="0 0 600 470" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((n, i) => (
          <path key={i} d={PATHS[i]} stroke={n.color} className={i < shownNodes ? "show" : undefined} />
        ))}
      </svg>
      <div className="center">
        <div className="app" style={{ boxShadow: "6px 6px 0 var(--ink)" }}>
          <div className="bar">
            <i style={{ background: "#FF5F57" }} />
            <i style={{ background: "#FEBC2E" }} />
            <i style={{ background: "#28C840" }} />
          </div>
          <div style={{ padding: "14px 16px 16px" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", color: "#5B2BB5", fontWeight: 700 }}>
              {screen.label}
            </div>
            <div style={{ fontWeight: 600, fontSize: 18, margin: "6px 0 10px" }}>{screen.title}</div>
            <div style={{ height: 26, border: "1.5px solid #D9D3E0", borderRadius: 6 }} />
            <div
              style={{
                height: 30,
                border: "1.5px solid #D9D3E0",
                borderRadius: 6,
                marginTop: 8,
                outline: "3px solid #F4B942",
                outlineOffset: 2,
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
              }}
            >
              {screen.role}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <span style={{ background: "#5B2BB5", color: "#fff", borderRadius: 6, padding: "6px 10px", fontSize: 11, fontWeight: 600 }}>
                {screen.send}
              </span>
            </div>
          </div>
        </div>
      </div>
      {nodes.map((n, i) => (
        <div
          key={n.tag}
          className={"sn" + (i < shownNodes ? " show" : "")}
          style={{ ["--c" as string]: n.color, ...POS[i] }}
        >
          <div className="tg">{n.tag}</div>
          <div>
            {n.title}
            <small>{n.note}</small>
          </div>
        </div>
      ))}
      <div className={"note" + (noteShown ? " show" : "")}>
        <b>{note.label}</b>
        {note.text}
      </div>
    </div>
  );
}
