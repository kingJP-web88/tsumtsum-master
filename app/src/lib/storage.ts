"use client";

import { useCallback, useEffect, useState } from "react";
import type { OwnedMap } from "./types";

// v2: 値の意味が「スキルレベル」から「累計獲得ツム数」に変わったため key bump
const KEY = "tsumtsum-master::owned::v2";

function safeRead(): OwnedMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as OwnedMap;
  } catch {
    return {};
  }
}

function safeWrite(value: OwnedMap) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // quota/permission errors are non-fatal
  }
}

export function useOwnedMap() {
  const [owned, setOwned] = useState<OwnedMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOwned(safeRead());
    setHydrated(true);
  }, []);

  const setCount = useCallback((id: string, count: number) => {
    setOwned((prev) => {
      const next = { ...prev };
      if (count <= 0) delete next[id];
      else next[id] = count;
      safeWrite(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOwned({});
    safeWrite({});
  }, []);

  return { owned, setCount, resetAll, hydrated };
}
