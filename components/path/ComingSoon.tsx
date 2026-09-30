import Link from "next/link";
import { workflows } from "@/content/map";
import { pathChrome } from "@/content/shared";
import type { PathId } from "@/lib/paths";
import { ArrowLeft } from "@/components/ui/icons";

/** Temporary stand-in while this path is being rebuilt. Remove once the path ships. */
export function ComingSoon({ id }: { id: PathId }) {
  const w = workflows[id];
  return (
    <section id="path">
      <div className="pathbar">
        <Link className="back" href="/">
          <ArrowLeft />
          {pathChrome.backToMap}
        </Link>
      </div>
      <div className="card soon">
        <div className="kick">{w.role}</div>
        <h2 className="h2" style={{ marginTop: 12 }}>
          {w.label}
        </h2>
        <p>This workflow is on its way. Try the engineering workflow in the meantime.</p>
        <Link className="btn" href="/engineering">
          {workflows.engineering.label}
        </Link>
      </div>
    </section>
  );
}
