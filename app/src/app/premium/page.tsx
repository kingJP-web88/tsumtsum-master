import BoxChecker from "@/components/BoxChecker";
import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import { premiumTsums } from "@/data/premium";

export const metadata = {
  title: "プレミアムBOX完売進捗",
  description:
    "プレミアムBOX常駐ツムのスキルレベルを記録して完売までの進捗を可視化。",
};

export default function PremiumPage() {
  return (
    <div className="space-y-4">
      <PageHeading>プレミアムBOX完売進捗</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <BoxChecker
        tsums={premiumTsums}
        label="プレミアムBOX進捗"
        helpText="ラインナップは毎月更新されます。2026年6月時点の150体に基づく進捗です。"
        noticeText="※「ならびかえ」で「リリース順」にしてから入力を進めていくのがおすすめ。「持っているツムだけ表示する」のチェックを外すと分かりやすいよ！"
        costPerPull={30000}
        costUnit="コイン"
        hideTotals
      />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
