"""Generate app/src/data/happiness.ts from gen_gacha_data_xlsx.HAPPINESS_TSUMS.

順序は HAPPINESS_TSUMS の宣言順 (Excel指定のユーザー順)。
"""

import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import importlib.util

spec = importlib.util.spec_from_file_location("xl", os.path.join(HERE, "gen_gacha_data_xlsx.py"))
xl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(xl)

HAPPINESS_TSUMS = xl.HAPPINESS_TSUMS
HAPPINESS_GROWTH = xl.HAPPINESS_GROWTH  # (SL1→2, SL2→3)

OUT = r"C:\Users\kingu\OneDrive\デスクトップ\ツムツムマスター\app\src\data\happiness.ts"


def main():
    sl12, sl23 = HAPPINESS_GROWTH
    lines = []
    lines.append('import type { Tsum } from "@/lib/types";')
    lines.append("")
    lines.append("// ハピネスBOX 常駐14体 (SL3 max)")
    lines.append("// data/ガチャデータ.xlsx の「ハピネスBOX」シートと同期。")
    lines.append("// 全員 SL1→2=2, SL2→3=4 (合計7体でスキルマ)")
    lines.append("// game8 と xn--bdka7fb の個別評価ページから一次確認済")
    lines.append("")
    lines.append('export type HappinessVerificationState = "verified" | "partial";')
    lines.append("")
    lines.append("export type HappinessTsum = Tsum & {")
    lines.append("  skillUpCost: readonly [number, number];")
    lines.append("  skillMaxTotal: number;")
    lines.append("  sourceUrl: string;")
    lines.append("  sourceUrlAlt?: string;")
    lines.append("  verified: HappinessVerificationState;")
    lines.append("};")
    lines.append("")
    lines.append("type RawEntry = {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  sourceUrl: string;")
    lines.append("  sourceUrlAlt?: string;")
    lines.append('  verified: HappinessVerificationState;')
    lines.append("  note?: string;")
    lines.append("};")
    lines.append("")
    lines.append("const RAW: RawEntry[] = [")
    for i, (name, _yomi, game8_url, bdka_url, verified, note) in enumerate(HAPPINESS_TSUMS, start=1):
        tid = f"h-{i:03d}"
        primary = game8_url or bdka_url
        alt = bdka_url if game8_url else None
        parts = [
            f'id: "{tid}"',
            f'name: "{name}"',
            f'sourceUrl: "{primary}"',
        ]
        if alt:
            parts.append(f'sourceUrlAlt: "{alt}"')
        v_str = "verified" if verified == "VERIFIED" else "partial"
        parts.append(f'verified: "{v_str}"')
        if note:
            parts.append(f'note: "{note}"')
        lines.append("  { " + ", ".join(parts) + " },")
    lines.append("];")
    lines.append("")
    lines.append(f"const SKILL_UP_COST = [{sl12}, {sl23}] as const;")
    lines.append("")
    lines.append("function expand(r: RawEntry): HappinessTsum {")
    lines.append("  return {")
    lines.append("    id: r.id,")
    lines.append("    name: r.name,")
    lines.append('    box: "happiness",')
    lines.append("    maxSkillLevel: 3,")
    lines.append("    skillUpCost: SKILL_UP_COST,")
    lines.append("    skillMaxTotal: SKILL_UP_COST[0] + SKILL_UP_COST[1],")
    lines.append("    sourceUrl: r.sourceUrl,")
    lines.append("    sourceUrlAlt: r.sourceUrlAlt,")
    lines.append("    verified: r.verified,")
    lines.append("    note: r.note,")
    lines.append("  };")
    lines.append("}")
    lines.append("")
    lines.append("export const happinessTsums: HappinessTsum[] = RAW.map(expand);")
    lines.append("")

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    print(f"Wrote {OUT}")
    print(f"Entries: {len(HAPPINESS_TSUMS)}")


if __name__ == "__main__":
    main()
