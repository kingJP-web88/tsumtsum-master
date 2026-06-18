"""Generate app/src/data/premium-plus.ts from gen_gacha_data_xlsx.PLUS_TSUMS.

順序は PLUS_TSUMS の宣言順 (Excel の備考列で指定したユーザー順)。
"""

import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import importlib.util

spec = importlib.util.spec_from_file_location("xl", os.path.join(HERE, "gen_gacha_data_xlsx.py"))
xl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(xl)

PLUS_TSUMS = xl.PLUS_TSUMS
PATTERN_BASES = xl.PATTERN_BASES
LIMITED_NAMES = xl.LIMITED_NAMES

OUT = r"C:\Users\kingu\OneDrive\デスクトップ\ツムツムマスター\app\src\data\premium-plus.ts"


def main():
    lines = []
    lines.append('import type { Tsum } from "@/lib/types";')
    lines.append("")
    lines.append("// プレミアムBOX＋ 2026-06 ラインナップ (24体)")
    lines.append("// data/ガチャデータ.xlsx の「プレミアムBOX＋」シートと同期。")
    lines.append("// 表示順はユーザー指定 (Excel の備考列番号)、ID (pp-001..pp-024) は表示順と一致。")
    lines.append("// skillUpCost: スキルレベル上昇に必要な被りツム数 [SL1→2, SL2→3, SL3→4, SL4→5, SL5→6]")
    lines.append('export type PremiumPlusGrowthPattern = "P1" | "P2" | "P3" | "PS";')
    lines.append("")
    lines.append("export const PREMIUM_PLUS_PATTERN_BASES: Record<PremiumPlusGrowthPattern, [number, number, number, number]> = {")
    lines.append("  P1: [2, 3, 4, 6],")
    lines.append("  P2: [1, 2, 4, 7],")
    lines.append("  P3: [1, 2, 4, 8],")
    lines.append("  PS: [1, 2, 2, 3],")
    lines.append("};")
    lines.append("")
    lines.append("export type PremiumPlusSkillUpCost = [number, number, number, number, number];")
    lines.append('export type PremiumPlusVerificationState = "verified" | "partial";')
    lines.append("")
    lines.append("export type PremiumPlusTsum = Tsum & {")
    lines.append("  pattern: PremiumPlusGrowthPattern;")
    lines.append("  sl5to6: number;")
    lines.append("  skillUpCost: PremiumPlusSkillUpCost;")
    lines.append("  skillMaxTotal: number;")
    lines.append("  sourceUrl: string;")
    lines.append("  sourceUrlAlt?: string;")
    lines.append("  verified: PremiumPlusVerificationState;")
    lines.append("};")
    lines.append("")
    lines.append("type RawEntry = {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  pattern: PremiumPlusGrowthPattern;")
    lines.append("  sl5to6: number;")
    lines.append("  sourceUrl: string;")
    lines.append("  sourceUrlAlt?: string;")
    lines.append('  verified: PremiumPlusVerificationState;')
    lines.append("  limited?: boolean;")
    lines.append("  note?: string;")
    lines.append("};")
    lines.append("")
    lines.append("const RAW: RawEntry[] = [")
    for i, (name, _yomi, pattern, sl56, game8_url, bdka_url, verified, note) in enumerate(PLUS_TSUMS, start=1):
        tid = f"pp-{i:03d}"
        # primary URL: game8 if present, else bdka
        primary = game8_url or bdka_url
        alt = bdka_url if game8_url else None
        parts = [
            f'id: "{tid}"',
            f'name: "{name}"',
            f'pattern: "{pattern}"',
            f'sl5to6: {sl56}',
            f'sourceUrl: "{primary}"',
        ]
        if alt:
            parts.append(f'sourceUrlAlt: "{alt}"')
        v_str = "verified" if verified == "VERIFIED" else "partial"
        parts.append(f'verified: "{v_str}"')
        if name in LIMITED_NAMES:
            parts.append("limited: true")
        if note:
            parts.append(f'note: "{note}"')
        lines.append("  { " + ", ".join(parts) + " },")
    lines.append("];")
    lines.append("")
    lines.append("function expand(r: RawEntry): PremiumPlusTsum {")
    lines.append("  const base = PREMIUM_PLUS_PATTERN_BASES[r.pattern];")
    lines.append("  const skillUpCost: PremiumPlusSkillUpCost = [base[0], base[1], base[2], base[3], r.sl5to6];")
    lines.append("  return {")
    lines.append("    id: r.id,")
    lines.append("    name: r.name,")
    lines.append('    box: "premium-plus",')
    lines.append("    maxSkillLevel: 6,")
    lines.append("    pattern: r.pattern,")
    lines.append("    sl5to6: r.sl5to6,")
    lines.append("    skillUpCost,")
    lines.append("    skillMaxTotal: skillUpCost.reduce((a, b) => a + b, 0),")
    lines.append("    sourceUrl: r.sourceUrl,")
    lines.append("    sourceUrlAlt: r.sourceUrlAlt,")
    lines.append("    verified: r.verified,")
    lines.append("    limited: r.limited,")
    lines.append("    note: r.note,")
    lines.append("  };")
    lines.append("}")
    lines.append("")
    lines.append("export const premiumPlusTsums: PremiumPlusTsum[] = RAW.map(expand);")
    lines.append("")

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    print(f"Wrote {OUT}")
    print(f"Entries: {len(PLUS_TSUMS)}")


if __name__ == "__main__":
    main()
