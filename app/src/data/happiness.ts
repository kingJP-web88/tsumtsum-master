import type { Tsum } from "@/lib/types";

// ハピネスBOX 常駐14体 (SL3 max)
// data/ガチャデータ.xlsx の「ハピネスBOX」シートと同期。
// 全員 SL1→2=2, SL2→3=4 (合計7体でスキルマ)
// game8 と xn--bdka7fb の個別評価ページから一次確認済

export type HappinessVerificationState = "verified" | "partial";

export type HappinessTsum = Tsum & {
  skillUpCost: readonly [number, number];
  skillMaxTotal: number;
  sourceUrl: string;
  sourceUrlAlt?: string;
  verified: HappinessVerificationState;
};

type RawEntry = {
  id: string;
  name: string;
  sourceUrl: string;
  sourceUrlAlt?: string;
  verified: HappinessVerificationState;
  note?: string;
};

const RAW: RawEntry[] = [
  { id: "h-001", name: "ミッキー", sourceUrl: "https://game8.jp/tsumtsum/18404", sourceUrlAlt: "https://xn--bdka7fb.jp/2450.html", verified: "verified" },
  { id: "h-002", name: "ミニー", sourceUrl: "https://game8.jp/tsumtsum/18292", sourceUrlAlt: "https://xn--bdka7fb.jp/4118.html", verified: "verified" },
  { id: "h-003", name: "ドナルド", sourceUrl: "https://game8.jp/tsumtsum/18716", sourceUrlAlt: "https://xn--bdka7fb.jp/2637.html", verified: "verified" },
  { id: "h-004", name: "デイジー", sourceUrl: "https://game8.jp/tsumtsum/19294", sourceUrlAlt: "https://xn--bdka7fb.jp/4160.html", verified: "verified" },
  { id: "h-005", name: "グーフィー", sourceUrl: "https://game8.jp/tsumtsum/19380", sourceUrlAlt: "https://xn--bdka7fb.jp/4343.html", verified: "verified" },
  { id: "h-006", name: "プルート", sourceUrl: "https://game8.jp/tsumtsum/18405", sourceUrlAlt: "https://xn--bdka7fb.jp/4311.html", verified: "verified" },
  { id: "h-007", name: "チップ", sourceUrl: "https://game8.jp/tsumtsum/18263", sourceUrlAlt: "https://xn--bdka7fb.jp/3840.html", verified: "verified" },
  { id: "h-008", name: "デール", sourceUrl: "https://game8.jp/tsumtsum/26343", sourceUrlAlt: "https://xn--bdka7fb.jp/3856.html", verified: "verified" },
  { id: "h-009", name: "プー", sourceUrl: "https://game8.jp/tsumtsum/18403", sourceUrlAlt: "https://xn--bdka7fb.jp/4206.html", verified: "verified", note: "くまのプーさん" },
  { id: "h-010", name: "ピグレット", sourceUrl: "https://game8.jp/tsumtsum/18641", sourceUrlAlt: "https://xn--bdka7fb.jp/2079.html", verified: "verified" },
  { id: "h-011", name: "ティガー", sourceUrl: "https://game8.jp/tsumtsum/19412", sourceUrlAlt: "https://xn--bdka7fb.jp/4452.html", verified: "verified" },
  { id: "h-012", name: "イーヨー", sourceUrl: "https://game8.jp/tsumtsum/18237", sourceUrlAlt: "https://xn--bdka7fb.jp/3982.html", verified: "verified" },
  { id: "h-013", name: "クリストファーロビン", sourceUrl: "https://game8.jp/tsumtsum/19424", sourceUrlAlt: "https://xn--bdka7fb.jp/4838.html", verified: "verified" },
  { id: "h-014", name: "ルー", sourceUrl: "https://game8.jp/tsumtsum/19411", sourceUrlAlt: "https://xn--bdka7fb.jp/4730.html", verified: "verified" },
];

const SKILL_UP_COST = [2, 4] as const;

function expand(r: RawEntry): HappinessTsum {
  return {
    id: r.id,
    name: r.name,
    box: "happiness",
    maxSkillLevel: 3,
    skillUpCost: SKILL_UP_COST,
    skillMaxTotal: SKILL_UP_COST[0] + SKILL_UP_COST[1],
    sourceUrl: r.sourceUrl,
    sourceUrlAlt: r.sourceUrlAlt,
    verified: r.verified,
    note: r.note,
  };
}

export const happinessTsums: HappinessTsum[] = RAW.map(expand);
