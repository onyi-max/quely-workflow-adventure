export type PathId = "design" | "engineering" | "product";

export const PATH_IDS: PathId[] = ["design", "engineering", "product"];

/** Order used to suggest the next workflow on a results page (same as the prototype). */
export const NEXT_ORDER: PathId[] = ["engineering", "product", "design"];

export const IMG = {
  logo: "/img/quely-logo.png",
  figma: "/img/figma.png",
  jira: "/img/jira.png",
  notion: "/img/notion.png",
  orbit: "/img/orbit.png",
  orbitHead: "/img/orbit-head.png",
};
