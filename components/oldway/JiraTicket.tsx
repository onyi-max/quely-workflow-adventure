import { IMG } from "@/lib/paths";

export type TicketCopy = { label: string; id: string; title: string; body: string; meta: string };

/** The thin ticket that "made it" out of the discussion. */
export function JiraTicket({ copy, fly }: { copy: TicketCopy; fly?: boolean }) {
  return (
    <div className="ticketwrap">
      <div className="plan mono">{copy.label}</div>
      <div className={"ticket" + (fly ? " fly" : "")} id="ticket">
        <div className="tk">
          <img src={IMG.jira} alt="Jira" />
          <span>{copy.id}</span>
        </div>
        <b>{copy.title}</b>
        <p>{copy.body}</p>
        <div className="tmeta">{copy.meta}</div>
      </div>
    </div>
  );
}
