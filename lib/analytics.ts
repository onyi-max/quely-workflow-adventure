"use client";

/**
 * Tracking hook point. No analytics tool is connected: events are only logged to the
 * browser console in development. To connect one, send `payload` from track().
 * Every event carries `path`, plus `company` and `rep` when the visitor arrived with
 * ?company= / ?rep=. Those are kept in sessionStorage so they survive moving between pages.
 */

export type EventName = "path_started" | "scene_viewed" | "step_back" | "path_completed" | "cta_clicked";

export type Cta = "book_demo" | "next_workflow" | "ask_question";

const ATTR_KEY = "quely-attribution";

type Attribution = { company?: string; rep?: string };

function attribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

/** Read ?company= and ?rep= from the current URL and remember them for this browser session. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const q = new URLSearchParams(window.location.search);
  const company = q.get("company")?.trim();
  const rep = q.get("rep")?.trim();
  if (!company && !rep) return;
  const next: Attribution = { ...attribution(), ...(company ? { company } : {}), ...(rep ? { rep } : {}) };
  try {
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function track(event: EventName, path: string, props: Record<string, unknown> = {}) {
  // Picks up ?company= / ?rep= on whichever page the visitor landed, before the first event.
  captureAttribution();
  const payload = { path, ...attribution(), ...props };
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, payload);
}
