import type { SkillState, Tsum } from "./types";

// 累計獲得数 → スキル状態
// totalCount=0: 未所持
// totalCount>=1: 1個目で SL1、以降は skillUpCost に従って消費
export function computeSkillState(totalCount: number, tsum: Tsum): SkillState {
  const cost = tsum.skillUpCost ?? [];
  const maxLevel = tsum.maxSkillLevel;
  const maxTotalCount = totalCopiesForMax(tsum);

  if (totalCount <= 0) {
    return {
      skillLevel: 0,
      copies: 0,
      nextCost: cost[0] ?? null,
      isMaxed: false,
      totalCount: 0,
      maxTotalCount,
    };
  }

  let remaining = totalCount - 1;
  let level = 1;
  for (const c of cost) {
    if (remaining < c) {
      return {
        skillLevel: level,
        copies: remaining,
        nextCost: c,
        isMaxed: false,
        totalCount,
        maxTotalCount,
      };
    }
    remaining -= c;
    level++;
  }
  return {
    skillLevel: maxLevel,
    copies: 0,
    nextCost: null,
    isMaxed: true,
    totalCount,
    maxTotalCount,
  };
}

// スキルマに必要な累計獲得ツム数 = 1 (初回) + sum(skillUpCost)
export function totalCopiesForMax(tsum: Tsum): number {
  const cost = tsum.skillUpCost ?? [];
  return 1 + cost.reduce((a, b) => a + b, 0);
}

// 「+1」操作: 上限を超えない範囲で累計を+1
export function incrementCount(totalCount: number, tsum: Tsum): number {
  return Math.min(totalCount + 1, totalCopiesForMax(tsum));
}

// 「-1」操作: 0未満にしない
export function decrementCount(totalCount: number): number {
  return Math.max(0, totalCount - 1);
}
