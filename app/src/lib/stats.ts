import { computeSkillState, totalCopiesForMax } from "./skillProgress";
import type { BoxStats, OwnedMap, Tsum } from "./types";

export function computeStats(tsums: Tsum[], owned: OwnedMap): BoxStats {
  const total = tsums.length;
  let ownedCount = 0;
  let maxed = 0;
  let totalCopiesObtained = 0;
  let totalCopiesForCompletion = 0;

  for (const t of tsums) {
    const count = owned[t.id] ?? 0;
    const state = computeSkillState(count, t);
    if (state.skillLevel > 0) ownedCount++;
    if (state.isMaxed) maxed++;
    totalCopiesObtained += count;
    totalCopiesForCompletion += totalCopiesForMax(t);
  }

  const pctRaw =
    totalCopiesForCompletion === 0
      ? 0
      : Math.min(1, totalCopiesObtained / totalCopiesForCompletion) * 100;
  return {
    total,
    owned: ownedCount,
    maxed,
    completionPct: Math.round(pctRaw * 10) / 10,
    totalCopiesObtained,
    totalCopiesForCompletion,
  };
}
