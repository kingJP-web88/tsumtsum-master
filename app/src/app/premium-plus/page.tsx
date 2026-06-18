import BoxChecker from "@/components/BoxChecker";
import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import { premiumPlusTsums } from "@/data/premium-plus";

export const metadata = {
  title: "プレミアムBOX＋完売進捗",
  description:
    "プレミアムBOX＋ 24体のスキルレベルを記録して、完売までの進捗とコインを可視化。",
};

export default function PremiumPlusPage() {
  return (
    <div className="space-y-4">
      <PageHeading>プレミアムBOX＋完売進捗</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <BoxChecker
        tsums={premiumPlusTsums}
        label="プレミアムBOX＋進捗"
        helpText="毎月更新。2026年6月時点の24体です。"
        noticeText="※「ならびかえ」→「リリース順」がおすすめ。"
        costPerPull={10000}
        costUnit="メダル"
        hideTotals
      />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
