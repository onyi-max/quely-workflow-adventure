import type { CSSProperties } from "react";

export type Person = { initials: string; name: string; color: string };

/** Round initials avatar used inside the product mockups (.qav). */
export function QAvatar({
  person,
  size,
  big,
  style,
}: {
  person: Pick<Person, "initials" | "color">;
  size?: number;
  big?: boolean;
  style?: CSSProperties;
}) {
  const s: CSSProperties = { background: person.color, ...style };
  if (size) Object.assign(s, { width: size, height: size, fontSize: Math.round(size / 2.75) });
  return (
    <span className={big ? "qav big" : "qav"} style={s}>
      {person.initials}
    </span>
  );
}

/** Larger outlined avatar used on the map cards (.av). */
export function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className="av" style={{ background: color }}>
      {initials}
    </span>
  );
}
