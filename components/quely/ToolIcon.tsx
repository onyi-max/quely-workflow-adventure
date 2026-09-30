import { IMG } from "@/lib/paths";

export type ToolIconKind = "slack" | "doc" | "rec" | "figma" | "jira" | "pdf";

/** Small square tool glyph used on attachments and old-way tabs (.gi). Logos are the supplied images. */
export function ToolIcon({ kind }: { kind: ToolIconKind }) {
  switch (kind) {
    case "slack":
      return (
        <span className="gi" style={{ background: "#E9E3F0" }}>
          #
        </span>
      );
    case "doc":
      return (
        <span className="gi" style={{ background: "#E6F0FF" }}>
          Doc
        </span>
      );
    case "rec":
      return (
        <span className="gi" style={{ background: "#FFE9E4" }}>
          ▶
        </span>
      );
    case "pdf":
      return (
        <span className="gi" style={{ background: "#FDE3E1", color: "#C2413A", fontSize: 9 }}>
          PDF
        </span>
      );
    case "figma":
      return (
        <span className="gi">
          <img src={IMG.figma} alt="" />
        </span>
      );
    case "jira":
      return (
        <span className="gi">
          <img src={IMG.jira} alt="" style={{ width: 34, height: "auto" }} />
        </span>
      );
  }
}
