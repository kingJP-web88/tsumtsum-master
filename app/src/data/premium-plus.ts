import type { Tsum } from "@/lib/types";

// プレミアムBOX＋ 2026-06 ラインナップ (24体)
// data/ガチャデータ.xlsx の「プレミアムBOX＋」シートと同期。
// 表示順はユーザー指定 (Excel の備考列番号)、ID (pp-001..pp-024) は表示順と一致。
// skillUpCost: スキルレベル上昇に必要な被りツム数 [SL1→2, SL2→3, SL3→4, SL4→5, SL5→6]
export type PremiumPlusGrowthPattern = "P1" | "P2" | "P3" | "PS";

export const PREMIUM_PLUS_PATTERN_BASES: Record<PremiumPlusGrowthPattern, [number, number, number, number]> = {
  P1: [2, 3, 4, 6],
  P2: [1, 2, 4, 7],
  P3: [1, 2, 4, 8],
  PS: [1, 2, 2, 3],
};

export type PremiumPlusSkillUpCost = [number, number, number, number, number];
export type PremiumPlusVerificationState = "verified" | "partial";

export type PremiumPlusTsum = Tsum & {
  pattern: PremiumPlusGrowthPattern;
  sl5to6: number;
  skillUpCost: PremiumPlusSkillUpCost;
  skillMaxTotal: number;
  sourceUrl: string;
  sourceUrlAlt?: string;
  verified: PremiumPlusVerificationState;
};

type RawEntry = {
  id: string;
  name: string;
  pattern: PremiumPlusGrowthPattern;
  sl5to6: number;
  sourceUrl: string;
  sourceUrlAlt?: string;
  verified: PremiumPlusVerificationState;
  limited?: boolean;
  note?: string;
};

const RAW: RawEntry[] = [
  { id: "pp-001", name: "ミッキー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/676184", sourceUrlAlt: "https://xn--bdka7fb.jp/175393.html", verified: "verified" },
  { id: "pp-002", name: "ドナルド＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/676185", sourceUrlAlt: "https://xn--bdka7fb.jp/175397.html", verified: "verified" },
  { id: "pp-003", name: "アリス＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/682167", sourceUrlAlt: "https://xn--bdka7fb.jp/176331.html", verified: "verified" },
  { id: "pp-004", name: "ストームトルーパー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/687550", sourceUrlAlt: "https://xn--bdka7fb.jp/177400.html", verified: "verified" },
  { id: "pp-005", name: "ライトニング・マックィーン＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/696763", sourceUrlAlt: "https://xn--bdka7fb.jp/178482.html", verified: "verified" },
  { id: "pp-006", name: "プルート＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/705898", sourceUrlAlt: "https://xn--bdka7fb.jp/179461.html", verified: "verified" },
  { id: "pp-007", name: "アリエル＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/710186", sourceUrlAlt: "https://xn--bdka7fb.jp/180672.html", verified: "verified" },
  { id: "pp-008", name: "シンバ＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/720585", sourceUrlAlt: "https://xn--bdka7fb.jp/181703.html", verified: "verified" },
  { id: "pp-009", name: "クルエラ＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/729252", sourceUrlAlt: "https://xn--bdka7fb.jp/182881.html", verified: "verified" },
  { id: "pp-010", name: "トレメイン夫人＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/729253", sourceUrlAlt: "https://xn--bdka7fb.jp/182884.html", verified: "verified" },
  { id: "pp-011", name: "グーフィー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/737659", sourceUrlAlt: "https://xn--bdka7fb.jp/183974.html", verified: "verified" },
  { id: "pp-012", name: "ウッディ＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/748450", sourceUrlAlt: "https://xn--bdka7fb.jp/184763.html", verified: "verified" },
  { id: "pp-013", name: "バズ・ライトイヤー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/748451", sourceUrlAlt: "https://xn--bdka7fb.jp/184767.html", verified: "verified" },
  { id: "pp-014", name: "ラプンツェル＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/755657", sourceUrlAlt: "https://xn--bdka7fb.jp/198086.html", verified: "verified" },
  { id: "pp-015", name: "デイジー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/755656", sourceUrlAlt: "https://xn--bdka7fb.jp/198090.html", verified: "verified" },
  { id: "pp-016", name: "ソラ＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/761270", sourceUrlAlt: "https://xn--bdka7fb.jp/199152.html", verified: "verified" },
  { id: "pp-017", name: "メイベル＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/779470", sourceUrlAlt: "https://xn--bdka7fb.jp/201122.html", verified: "verified" },
  { id: "pp-018", name: "マンダロリアン＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/785069", sourceUrlAlt: "https://xn--bdka7fb.jp/202198.html", verified: "verified" },
  { id: "pp-019", name: "グローグー＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/785070", sourceUrlAlt: "https://xn--bdka7fb.jp/202201.html", verified: "verified" },
  { id: "pp-020", name: "ヒーロースタイルスティッチ", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/786554", sourceUrlAlt: "https://xn--bdka7fb.jp/202429.html", verified: "verified", limited: true, note: "変身ツム" },
  { id: "pp-021", name: "ダグ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/786555", sourceUrlAlt: "https://xn--bdka7fb.jp/202431.html", verified: "verified" },
  { id: "pp-022", name: "変身の達人マウイ", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/787752", sourceUrlAlt: "https://xn--bdka7fb.jp/202710.html", verified: "verified", limited: true, note: "変身ツム" },
  { id: "pp-023", name: "ジム・ホーキンス", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/787753", sourceUrlAlt: "https://xn--bdka7fb.jp/202713.html", verified: "verified", limited: true, note: "2026-06新ツム" },
  { id: "pp-024", name: "ラーヤ＋", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/789307", sourceUrlAlt: "https://xn--bdka7fb.jp/202925.html", verified: "verified" },
];

function expand(r: RawEntry): PremiumPlusTsum {
  const base = PREMIUM_PLUS_PATTERN_BASES[r.pattern];
  const skillUpCost: PremiumPlusSkillUpCost = [base[0], base[1], base[2], base[3], r.sl5to6];
  return {
    id: r.id,
    name: r.name,
    box: "premium-plus",
    maxSkillLevel: 6,
    pattern: r.pattern,
    sl5to6: r.sl5to6,
    skillUpCost,
    skillMaxTotal: skillUpCost.reduce((a, b) => a + b, 0),
    sourceUrl: r.sourceUrl,
    sourceUrlAlt: r.sourceUrlAlt,
    verified: r.verified,
    limited: r.limited,
    note: r.note,
  };
}

export const premiumPlusTsums: PremiumPlusTsum[] = RAW.map(expand);
