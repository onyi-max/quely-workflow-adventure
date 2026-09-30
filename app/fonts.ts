import type { CSSProperties } from "react";
import localFont from "next/font/local";

/*
 * The four fonts, self-hosted through next/font. The files in app/fonts/ are the exact latin
 * files Google Fonts serves Chrome for the prototype's stylesheet (next/font/google fetches a
 * slightly different build whose line metrics differ by up to 1px). Faces are declared the
 * same way Google declares them: one variable file listed once per weight.
 * Fonts are under the SIL Open Font License.
 */

export const interTight = localFont({
  src: [
    { path: "./fonts/inter-tight-latin.woff2", weight: "600" },
    { path: "./fonts/inter-tight-latin.woff2", weight: "700" },
    { path: "./fonts/inter-tight-latin.woff2", weight: "800" },
  ],
  variable: "--font-inter-tight",
  display: "swap",
});

export const inter = localFont({
  src: [
    { path: "./fonts/inter-latin.woff2", weight: "400" },
    { path: "./fonts/inter-latin.woff2", weight: "500" },
    { path: "./fonts/inter-latin.woff2", weight: "600" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const courierPrime = localFont({
  src: [
    { path: "./fonts/courier-prime-400-latin.woff2", weight: "400" },
    { path: "./fonts/courier-prime-700-latin.woff2", weight: "700" },
  ],
  variable: "--font-courier-prime",
  display: "swap",
});

export const caveat = localFont({
  src: [{ path: "./fonts/caveat-700-latin.woff2", weight: "700" }],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = [interTight, inter, courierPrime, caveat].map((f) => f.variable).join(" ");

/**
 * next/font adds a size-adjusted "… Fallback" face (scaled Arial covering every character)
 * to its variables. Glyphs a font lacks (←, ✓, ▾) would then render in scaled Arial instead
 * of the prototype's system fonts. So the variables are set to just the loaded family, and
 * styles/1-base.css supplies the prototype's fallback chain after it. Applied as an inline
 * style on <html>, which wins over the class.
 */
const primary = (f: { style: { fontFamily: string } }) => f.style.fontFamily.split(",")[0].trim();

export const fontFamilyVars = {
  "--font-inter-tight": primary(interTight),
  "--font-inter": primary(inter),
  "--font-courier-prime": primary(courierPrime),
  "--font-caveat": primary(caveat),
} as CSSProperties;
