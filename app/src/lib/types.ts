export type BoxKind = "happiness" | "premium" | "premium-plus";

export type Tsum = {
  id: string;
  name: string;
  box: BoxKind;
  maxSkillLevel: 3 | 6;
  // 各スキルレベル上昇に必要な被りツム数 [SL1→2, SL2→3, ...]
  // 長さは maxSkillLevel - 1。未定義なら簡易ステッパーUIにフォールバック
  skillUpCost?: readonly number[];
  limited?: boolean;
  note?: string;
};

// 値は「ガチャで獲得した累計ツム数」(初回 = SL1, 以降はスキル上げ消費)
export type OwnedMap = Record<string, number>;

export type SkillState = {
  skillLevel: number; // 0 = 未所持, 1..maxSkillLevel
  copies: number; // 次のSL上げに向けた手持ち
  nextCost: number | null; // null なら次がない (= 上限到達)
  isMaxed: boolean;
  totalCount: number;
  maxTotalCount: number; // スキルマまでの累計獲得数
};

export type BoxStats = {
  total: number;
  owned: number;
  maxed: number;
  completionPct: number;
  totalCopiesObtained: number;
  totalCopiesForCompletion: number;
};
