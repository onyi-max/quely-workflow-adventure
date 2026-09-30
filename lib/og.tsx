import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Fetch a Google font as TTF for the OG renderer. Returns null if offline. */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * Link-preview image in the site's style: lilac dotted background, a white card with the
 * heavy ink border and offset shadow, the Quely logo, a mono kicker, and a headline with
 * one purple-highlighted phrase.
 */
export async function renderOg({ kicker, title, highlight }: { kicker: string; title: string; highlight: string }) {
  const logo = await readFile(join(process.cwd(), "public/img/quely-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const allText = kicker + title + highlight;
  const [head, mono] = await Promise.all([
    googleFont("Inter Tight", 700, allText),
    googleFont("Courier Prime", 700, kicker),
  ]);
  const fonts = [
    ...(head ? [{ name: "Inter Tight", data: head, weight: 700 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "Courier Prime", data: mono, weight: 700 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E9E3F0",
          backgroundImage: "radial-gradient(rgba(28,24,20,.13) 2px, transparent 2.4px)",
          backgroundSize: "36px 36px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1040,
            padding: "52px 60px",
            background: "#FFFFFF",
            border: "5px solid #1C1814",
            boxShadow: "14px 14px 0 #1C1814",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <img src={logoSrc} height={52} width={189} alt="" />
            <div
              style={{
                fontFamily: "Courier Prime",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#5B2BB5",
              }}
            >
              {kicker}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 44,
              fontFamily: "Inter Tight",
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#1C1814",
            }}
          >
            {title.split(" ").map((w, i) => (
              <span key={i} style={{ marginRight: 20 }}>
                {w}
              </span>
            ))}
            <span style={{ background: "#9585E6", padding: "0 8px" }}>{highlight}</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
