import type { Tsum } from "@/lib/types";

// プレミアムBOX常駐ツム一覧 (ゲーム内インフォメーション + 攻略サイト個別ページ調査, 2026-06)
// 全150体、5並列調査エージェントで個別ページから一次確認済
// 表示順はユーザー指定のカスタム順、ID (p-001..p-150) はゲーム内インフォメーション順を保持
// skillUpCost: スキルレベル上昇に必要な被りツム数 [SL1→2, SL2→3, SL3→4, SL4→5, SL5→6]
// data/ガチャデータ.xlsx と同期する (プレミアムBOXシート)。
export type GrowthPattern = "P1" | "P2" | "P3" | "PS";

export const PATTERN_BASES: Record<GrowthPattern, [number, number, number, number]> = {
  P1: [2, 3, 4, 6], // 2015年3月以前の常駐
  P2: [1, 2, 4, 7], // 中堅〜21型
  P3: [1, 2, 4, 8], // 晩成型・近年の重め成長
  PS: [1, 2, 2, 3], // 特殊。ハム専用
};

export type SkillUpCost = [number, number, number, number, number];
export type VerificationState = "verified" | "partial";

export type PremiumTsum = Tsum & {
  pattern: GrowthPattern;
  sl5to6: number;
  skillUpCost: SkillUpCost;
  skillMaxTotal: number;
  sourceUrl: string;
  verified: VerificationState;
  limited?: boolean; // 今月の期間限定キャラなら true
};

type RawEntry = {
  id: string;
  name: string;
  pattern: GrowthPattern;
  sl5to6: number;
  sourceUrl: string;
  limited?: boolean;
};

// 順序はユーザー指定のカスタム順 (data/custom_order.json)。IDはゲーム内順を保持。
const RAW: RawEntry[] = [
  { id: "p-009", name: "スティッチ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18227" },
  { id: "p-010", name: "スクランプ", pattern: "P1", sl5to6: 12, sourceUrl: "https://game8.jp/tsumtsum/18634" },
  { id: "p-011", name: "マリー", pattern: "P1", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/18309" },
  { id: "p-012", name: "レディ", pattern: "P1", sl5to6: 12, sourceUrl: "https://game8.jp/tsumtsum/18294" },
  { id: "p-013", name: "ウッディ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18210" },
  { id: "p-014", name: "バズ・ライトイヤー", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/18613" },
  { id: "p-023", name: "ジェシー", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18539" },
  { id: "p-024", name: "ロッツォ", pattern: "P1", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/18548" },
  { id: "p-015", name: "マイク", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18974" },
  { id: "p-016", name: "サリー(モンスターズ・インク)", pattern: "P1", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/18243" },
  { id: "p-007", name: "ダンボ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18557" },
  { id: "p-004", name: "アリス", pattern: "P1", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/18344" },
  { id: "p-005", name: "白うさぎ", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/18924" },
  { id: "p-006", name: "チェシャ猫", pattern: "P1", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/26341" },
  { id: "p-003", name: "ヤングオイスター", pattern: "P1", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/18333" },
  { id: "p-008", name: "ティンカー・ベル", pattern: "P1", sl5to6: 19, sourceUrl: "https://game8.jp/tsumtsum/18212" },
  { id: "p-035", name: "バンビ", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/18614" },
  { id: "p-036", name: "とんすけ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18463" },
  { id: "p-001", name: "ミス・バニー", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18973" },
  { id: "p-032", name: "エルサ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/17883" },
  { id: "p-033", name: "アナ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18332" },
  { id: "p-002", name: "オラフ", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/18253" },
  { id: "p-026", name: "スヴェン", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/26344" },
  { id: "p-034", name: "マレフィセント", pattern: "P1", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/26671" },
  { id: "p-029", name: "アリエル", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/17963" },
  { id: "p-030", name: "フランダー", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/19279" },
  { id: "p-031", name: "セバスチャン", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/18246" },
  { id: "p-027", name: "ラプンツェル", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/17910" },
  { id: "p-028", name: "パスカル", pattern: "P1", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/26342" },
  { id: "p-025", name: "ベイマックス", pattern: "P1", sl5to6: 18, sourceUrl: "https://game8.jp/tsumtsum/17414" },
  { id: "p-021", name: "ベル", pattern: "P2", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/21989" },
  { id: "p-022", name: "野獣", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/22013" },
  { id: "p-019", name: "サプライズエルサ", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/25696" },
  { id: "p-020", name: "バースデーアナ", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/25695" },
  { id: "p-018", name: "エンジェル", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/27064" },
  { id: "p-054", name: "マックィーン", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/28207" },
  { id: "p-055", name: "メーター", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/28208" },
  { id: "p-056", name: "レックス", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/28205" },
  { id: "p-017", name: "ランドール", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/28206" },
  { id: "p-053", name: "トリトン王", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/29901" },
  { id: "p-051", name: "アラジン", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/31861" },
  { id: "p-052", name: "ジャスミン", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/31862" },
  { id: "p-050", name: "ジーニー", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/32294" },
  { id: "p-049", name: "ピノキオ", pattern: "P2", sl5to6: 21, sourceUrl: "https://game8.jp/tsumtsum/36875" },
  { id: "p-047", name: "白雪姫", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/12459.html" },
  { id: "p-048", name: "オーロラ姫", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/12461.html" },
  { id: "p-045", name: "シンバ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/47413" },
  { id: "p-046", name: "ナラ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/47415" },
  { id: "p-044", name: "スカー", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/13401.html" },
  { id: "p-041", name: "アースラ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/14460.html" },
  { id: "p-042", name: "女王", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/122379.html" },
  { id: "p-043", name: "マレフィセントドラゴン", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/14462.html" },
  { id: "p-038", name: "ジュディ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/60755" },
  { id: "p-039", name: "ニック", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/60753" },
  { id: "p-040", name: "フィニック", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/60754" },
  { id: "p-076", name: "シンデレラ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/16567.html" },
  { id: "p-037", name: "フェアリー・ゴッドマザー", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/63342" },
  { id: "p-074", name: "ハートの女王", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/74380" },
  { id: "p-075", name: "マッドハッター", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/72384" },
  { id: "p-072", name: "ニモ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/79396" },
  { id: "p-073", name: "ドリー", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/79395" },
  { id: "p-071", name: "クラッシュ", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/79981" },
  { id: "p-068", name: "フック船長", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/21902.html" },
  { id: "p-069", name: "クルエラ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/21899.html" },
  { id: "p-070", name: "ジャファー", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/21883.html" },
  { id: "p-066", name: "モアナ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/32297.html" },
  { id: "p-067", name: "マウイ", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/133253" },
  { id: "p-064", name: "ヘラクレス", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/137579" },
  { id: "p-063", name: "ハデス", pattern: "P3", sl5to6: 20, sourceUrl: "https://game8.jp/tsumtsum/137582" },
  { id: "p-065", name: "フィリップ王子", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/32701.html" },
  { id: "p-061", name: "ガストン", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/34054.html" },
  { id: "p-062", name: "ルミエール", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/34056.html" },
  { id: "p-059", name: "フリン・ライダー", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/150245" },
  { id: "p-060", name: "マキシマス", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/150246" },
  { id: "p-057", name: "ムーラン", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/151680" },
  { id: "p-058", name: "ポカホンタス", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/151681" },
  { id: "p-096", name: "クルーズ・ラミレス", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/42015.html" },
  { id: "p-093", name: "ピーター・パン", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/44870.html" },
  { id: "p-094", name: "パッチ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/44880.html" },
  { id: "p-095", name: "ティモシー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/44876.html" },
  { id: "p-092", name: "ブルー・フェアリー", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/148430.html" },
  { id: "p-091", name: "トランプ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/44874.html" },
  { id: "p-090", name: "王子", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/187409" },
  { id: "p-089", name: "ブー", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/231285" },
  { id: "p-088", name: "フラワー", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/259942" },
  { id: "p-086", name: "ダッチェス", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/260306" },
  { id: "p-087", name: "ロビン・フッド", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/85120.html" },
  { id: "p-085", name: "ゴーテル", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/263751" },
  { id: "p-084", name: "ハム", pattern: "PS", sl5to6: 3, sourceUrl: "https://xn--bdka7fb.jp/90948.html" },
  { id: "p-082", name: "ティモン", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/93126.html" },
  { id: "p-083", name: "ラフィキ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/93124.html" },
  { id: "p-081", name: "クリストフ", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/307032" },
  { id: "p-080", name: "ラジャー", pattern: "P2", sl5to6: 14, sourceUrl: "https://game8.jp/tsumtsum/320812" },
  { id: "p-079", name: "レミー", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/323464" },
  { id: "p-078", name: "フリック", pattern: "P3", sl5to6: 16, sourceUrl: "https://game8.jp/tsumtsum/324404" },
  { id: "p-077", name: "ガントゥ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/108693.html" },
  { id: "p-115", name: "ワート", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/109311.html" },
  { id: "p-116", name: "マーリン", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/109313.html" },
  { id: "p-114", name: "ダンテ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/110332.html" },
  { id: "p-112", name: "ウェンディ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/111838.html" },
  { id: "p-113", name: "ジョン", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/111841.html" },
  { id: "p-111", name: "フロロー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/113375.html" },
  { id: "p-110", name: "エリオット", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/115994.html" },
  { id: "p-108", name: "ジョー", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/117259.html" },
  { id: "p-109", name: "22番", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/117261.html" },
  { id: "p-106", name: "ルシファー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/120722.html" },
  { id: "p-107", name: "オリバー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/120724.html" },
  { id: "p-105", name: "イズマ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/122161.html" },
  { id: "p-104", name: "トレメイン夫人", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/122883.html" },
  { id: "p-102", name: "ラーヤ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/123956.html" },
  { id: "p-103", name: "シスー", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/123958.html" },
  { id: "p-101", name: "ハンク", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/125525.html" },
  { id: "p-099", name: "ヨロコビ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/125527.html" },
  { id: "p-100", name: "カナシミ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/125529.html" },
  { id: "p-098", name: "シア・カーン", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/134650.html" },
  { id: "p-097", name: "タマトア", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/136126.html" },
  { id: "p-136", name: "ロズ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/137143.html" },
  { id: "p-135", name: "モンストロ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/140042.html" },
  { id: "p-134", name: "ソックス", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/141795.html" },
  { id: "p-132", name: "ルカ・パグーロ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/142185.html" },
  { id: "p-133", name: "メイリン・リー", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/142187.html" },
  { id: "p-130", name: "ミラベル", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/143266.html" },
  { id: "p-131", name: "イサベラ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/143268.html" },
  { id: "p-128", name: "正直ジョン", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/145379.html" },
  { id: "p-129", name: "ギデオン", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/145382.html" },
  { id: "p-127", name: "カジモド", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/146337.html" },
  { id: "p-126", name: "ヴァネッサ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/151489.html" },
  { id: "p-125", name: "トランプ兵", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/152054.html" },
  { id: "p-123", name: "エンバー", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/159056.html" },
  { id: "p-124", name: "ウェイド", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/159058.html" },
  { id: "p-122", name: "アーシャ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/159947.html" },
  { id: "p-121", name: "ムーシュー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/160879.html" },
  { id: "p-119", name: "ハンス王子", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/162450.html" },
  { id: "p-120", name: "マシュマロウ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/162452.html" },
  { id: "p-118", name: "チーズ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/169005.html" },
  { id: "p-150", name: "エルネスト・デラクルス", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/170651.html" },
  { id: "p-117", name: "キャンディ大王", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/170655.html" },
  { id: "p-149", name: "ベルウェザー副市長", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/171043.html" },
  { id: "p-148", name: "カー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/172869.html" },
  { id: "p-147", name: "魔法の洞窟", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/173877.html" },
  { id: "p-146", name: "イアーゴ", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/174305.html" },
  { id: "p-145", name: "スミー", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/175171.html" },
  { id: "p-144", name: "コトゥ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/177882.html" },
  { id: "p-142", name: "イイナー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/178197.html" },
  { id: "p-143", name: "シンパイ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/178195.html" },
  { id: "p-141", name: "ゲイリー", pattern: "P2", sl5to6: 14, sourceUrl: "https://xn--bdka7fb.jp/184389.html" },
  { id: "p-139", name: "ヒーロースタイルスティッチ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/202429.html", limited: true },
  { id: "p-140", name: "ダグ", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/202431.html", limited: true },
  { id: "p-137", name: "変身の達人マウイ", pattern: "P3", sl5to6: 20, sourceUrl: "https://xn--bdka7fb.jp/202710.html", limited: true },
  { id: "p-138", name: "ジム・ホーキンス", pattern: "P3", sl5to6: 16, sourceUrl: "https://xn--bdka7fb.jp/202713.html", limited: true },
];

function expand(r: RawEntry): PremiumTsum {
  const base = PATTERN_BASES[r.pattern];
  const skillUpCost: SkillUpCost = [base[0], base[1], base[2], base[3], r.sl5to6];
  return {
    id: r.id,
    name: r.name,
    box: "premium",
    maxSkillLevel: 6,
    pattern: r.pattern,
    sl5to6: r.sl5to6,
    skillUpCost,
    skillMaxTotal: skillUpCost.reduce((a, b) => a + b, 0),
    sourceUrl: r.sourceUrl,
    verified: "verified",
    limited: r.limited,
  };
}

export const premiumTsums: PremiumTsum[] = RAW.map(expand);
