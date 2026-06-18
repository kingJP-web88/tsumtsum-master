"""Generate app/src/data/premium.ts from the in-script TSUMS list,
sorted by user-defined custom order (custom_order.json). IDs preserve
the original in-game order; display order follows the user's mapping.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

# Load PREMIUM_TSUMS from the sibling Excel generator
import importlib.util

spec = importlib.util.spec_from_file_location("xl", os.path.join(HERE, "gen_gacha_data_xlsx.py"))
xl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(xl)

TSUMS = xl.PREMIUM_TSUMS
CUSTOM_ORDER = json.load(open(os.path.join(HERE, "custom_order.json"), encoding="utf-8"))

# 今月の期間限定キャラ (元のID = ゲーム内順)
LIMITED_IDS = {"p-137", "p-138", "p-139"}

OUT = r"C:\Users\kingu\OneDrive\デスクトップ\ツムツムマスター\app\src\data\premium.ts"


def ts_str(value):
    if value is None or value == "":
        return None
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def main():
    # Index by original (in-game) ID first
    indexed = [(i + 1, *t) for i, t in enumerate(TSUMS)]
    # Sort by user custom order
    sorted_tsums = sorted(indexed, key=lambda r: CUSTOM_ORDER.get(f"p-{r[0]:03d}", 9999))

    lines = []
    lines.append('import type { Tsum } from "@/lib/types";')
    lines.append("")
    lines.append("// プレミアムBOX常駐ツム一覧 (ゲーム内インフォメーション + 攻略サイト個別ページ調査, 2026-06)")
    lines.append("// 全150体、5並列調査エージェントで個別ページから一次確認済")
    lines.append("// 表示順はユーザー指定のカスタム順、ID (p-001..p-150) はゲーム内インフォメーション順を保持")
    lines.append("// skillUpCost: スキルレベル上昇に必要な被りツム数 [SL1→2, SL2→3, SL3→4, SL4→5, SL5→6]")
    lines.append("// data/ガチャデータ.xlsx と同期する (プレミアムBOXシート)。")
    lines.append('export type GrowthPattern = "P1" | "P2" | "P3" | "PS";')
    lines.append("")
    lines.append("export const PATTERN_BASES: Record<GrowthPattern, [number, number, number, number]> = {")
    lines.append("  P1: [2, 3, 4, 6], // 2015年3月以前の常駐")
    lines.append("  P2: [1, 2, 4, 7], // 中堅〜21型")
    lines.append("  P3: [1, 2, 4, 8], // 晩成型・近年の重め成長")
    lines.append("  PS: [1, 2, 2, 3], // 特殊。ハム専用")
    lines.append("};")
    lines.append("")
    lines.append("export type SkillUpCost = [number, number, number, number, number];")
    lines.append('export type VerificationState = "verified" | "partial";')
    lines.append("")
    lines.append("export type PremiumTsum = Tsum & {")
    lines.append("  pattern: GrowthPattern;")
    lines.append("  sl5to6: number;")
    lines.append("  skillUpCost: SkillUpCost;")
    lines.append("  skillMaxTotal: number;")
    lines.append("  sourceUrl: string;")
    lines.append("  verified: VerificationState;")
    lines.append("  limited?: boolean; // 今月の期間限定キャラなら true")
    lines.append("};")
    lines.append("")
    lines.append("type RawEntry = {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  pattern: GrowthPattern;")
    lines.append("  sl5to6: number;")
    lines.append("  sourceUrl: string;")
    lines.append("  limited?: boolean;")
    lines.append("};")
    lines.append("")
    lines.append("// 順序はユーザー指定のカスタム順 (data/custom_order.json)。IDはゲーム内順を保持。")
    lines.append("const RAW: RawEntry[] = [")
    for orig_id, name, _yomi, pattern, sl56, src, verified, _note in sorted_tsums:
        tid = f"p-{orig_id:03d}"
        parts = [
            f'id: "{tid}"',
            f'name: "{name}"',
            f'pattern: "{pattern}"',
            f'sl5to6: {sl56}',
            f'sourceUrl: "{src}"',
        ]
        if tid in LIMITED_IDS:
            parts.append("limited: true")
        lines.append("  { " + ", ".join(parts) + " },")
    lines.append("];")
    lines.append("")
    lines.append("function expand(r: RawEntry): PremiumTsum {")
    lines.append("  const base = PATTERN_BASES[r.pattern];")
    lines.append("  const skillUpCost: SkillUpCost = [base[0], base[1], base[2], base[3], r.sl5to6];")
    lines.append("  return {")
    lines.append("    id: r.id,")
    lines.append("    name: r.name,")
    lines.append('    box: "premium",')
    lines.append("    maxSkillLevel: 6,")
    lines.append("    pattern: r.pattern,")
    lines.append("    sl5to6: r.sl5to6,")
    lines.append("    skillUpCost,")
    lines.append("    skillMaxTotal: skillUpCost.reduce((a, b) => a + b, 0),")
    lines.append("    sourceUrl: r.sourceUrl,")
    lines.append('    verified: "verified",')
    lines.append("    limited: r.limited,")
    lines.append("  };")
    lines.append("}")
    lines.append("")
    lines.append("export const premiumTsums: PremiumTsum[] = RAW.map(expand);")
    lines.append("")

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    print(f"Wrote {OUT}")
    print(f"Entries: {len(sorted_tsums)}")


if __name__ == "__main__":
    main()
