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
        helpText="ラインナップは毎月更新されます。2026年6月時点の24体に基づく進捗です。"
        noticeText="※「ならびかえ」で「リリース順」にしてから入力を進めていくのがおすすめ。「持っているツムだけ表示する」のチェックを外すと分かりやすいよ！"
        costPerPull={10000}
        costUnit="メダル"
        hideTotals
      />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
