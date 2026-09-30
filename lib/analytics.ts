"use client";

/**
 * Tracking. Sends to Mixpanel when NEXT_PUBLIC_MIXPANEL_TOKEN is set; otherwise a no-op.
 * Every event carries `path`, plus `company` and `rep` when the visitor arrived with
 * ?company= / ?rep=. Those are kept in sessionStorage so they survive moving between pages.
 */

import type { OverridedMixpanel } from "mixpanel-browser";

export type EventName = "path_started" | "scene_viewed" | "step_back" | "path_completed" | "cta_clicked";

export type Cta = "book_demo" | "next_workflow" | "interactive_demo";

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
const ATTR_KEY = "quely-attribution";

let mp: Promise<OverridedMixpanel | null> | null = null;

function client() {
  if (!TOKEN || typeof window === "undefined") return null;
  if (!mp) {
    mp = import("mixpanel-browser")
      .then(({ default: m }) => {
        m.init(TOKEN, { track_pageview: false, persistence: "localStorage" });
        return m;
      })
      .catch(() => null);
  }
  return mp;
}

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
  const c = client();
  if (!c) {
    if (process.env.NODE_ENV === "development") console.debug("[track]", event, payload);
    return;
  }
  c.then((m) => m?.track(event, payload));
}
