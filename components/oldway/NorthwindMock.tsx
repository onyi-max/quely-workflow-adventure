import { northwind as n } from "@/content/design";

/** The screen being designed in the design path: a made-up product's onboarding step. */
export function NorthwindMock() {
  return (
    <div className="app">
      <div className="bar">
        <i style={{ background: "#FF5F57" }} />
        <i style={{ background: "#FEBC2E" }} />
        <i style={{ background: "#28C840" }} />
        <span>{n.url}</span>
      </div>
      <div className="body">
        <div className="row1">
          <div className="brand">
            <b>{n.brandInitial}</b>
            {n.brand}
          </div>
          <div className="stp">
            {n.step}
            <em>
              <u />
              <u />
              <u className="off" />
            </em>
          </div>
        </div>
        <h3>{n.title}</h3>
        <p>{n.intro}</p>
        <label>{n.emailsLabel}</label>
        <div className="in">
          {n.emails.map((e) => (
            <span className="tok" key={e.email}>
              <i style={{ background: e.color }}>{e.initials}</i>
              {e.email}
            </span>
          ))}
        </div>
        <label>{n.roleLabel}</label>
        <div className="sel">
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>{n.role}</div>
            <small>{n.roleNote}</small>
          </div>
          <svg className="i" viewBox="0 0 24 24" width="16" height="16" style={{ color: "#7A7383" }} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="foot">
        <span className="s">{n.skip}</span>
        <span className="p">{n.send}</span>
      </div>
    </div>
  );
}
