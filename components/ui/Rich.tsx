import { Fragment, type ReactNode } from "react";

/**
 * Renders copy with a small set of inline tags, so content files never hold HTML:
 *   <hl>…</hl>           purple highlight
 *   <b>…</b>             bold
 *   <mention>…</mention> @mention chip
 *   <em>…</em>           italic
 * Tags don't nest.
 */
const TAG = /<(hl|b|mention|em)>([\s\S]*?)<\/\1>/g;

export function rich(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TAG)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    const inner = m[2];
    const key = k++;
    if (m[1] === "hl") out.push(<span key={key} className="hl">{inner}</span>);
    else if (m[1] === "b") out.push(<b key={key}>{inner}</b>);
    else if (m[1] === "mention") out.push(<b key={key} className="mention">{inner}</b>);
    else out.push(<em key={key}>{inner}</em>);
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : <Fragment>{out}</Fragment>;
}

export function Rich({ text }: { text: string }) {
  return <>{rich(text)}</>;
}
