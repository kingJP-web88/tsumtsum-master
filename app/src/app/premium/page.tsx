import BoxChecker from "@/components/BoxChecker";
import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import { premiumTsums } from "@/data/premium";

export const metadata = {
  title: "プレミアムBOX完売進捗",
  description:
    "プレミアムBOX常駐ツムのスキルレベルを記録して完売までの進捗を可視化。",
  alternates: { canonical: "/premium" },
  robots: { index: false, follow: true },
};

export default function PremiumPage() {
  return (
    <div className="space-y-4">
      <PageHeading>プレミアムBOX完売進捗</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <BoxChecker
        tsums={premiumTsums}
        label="プレミアムBOX進捗"
        helpText="毎月更新。2026年6月時点の150体です。"
        noticeText="※「ならびかえ」→「リリース順」がおすすめ。"
        costPerPull={30000}
        costUnit="コイン"
        hideTotals
      />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
