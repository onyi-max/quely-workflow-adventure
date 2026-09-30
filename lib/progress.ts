"use client";

import { useSyncExternalStore } from "react";
import { NEXT_ORDER, PATH_IDS, type PathId } from "./paths";

// Same key as the prototype, so existing progress carries over.
const KEY = "quely-paths-v2";

type Done = Partial<Record<PathId, boolean>>;

const EMPTY: Done = {};
let cache: Done | null = null;
const listeners = new Set<() => void>();

function read(): Done {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    cache = {};
  }
  return cache as Done;
}

function write(next: Done) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: progress lasts for this page view only */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  const done = useSyncExternalStore(subscribe, read, () => EMPTY);
  const count = PATH_IDS.filter((k) => done[k]).length;
  return { done, count };
}

export function markDone(id: PathId) {
  const d = read();
  if (!d[id]) write({ ...d, [id]: true });
}

export function resetProgress() {
  write({});
}

export function nextPath(done: Done, current: PathId | null): PathId {
  return NEXT_ORDER.find((k) => !done[k] && k !== current) || "design";
}
