import BoxChecker from "@/components/BoxChecker";
import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import { happinessTsums } from "@/data/happiness";

export const metadata = {
  title: "ハピネスBOX完売進捗",
  description:
    "ハピネスBOX 14体のツムのスキルレベルを記録して完売進捗を確認。",
  alternates: { canonical: "/happiness" },
};

export default function HappinessPage() {
  return (
    <div className="space-y-4">
      <PageHeading>ハピネスBOX完売進捗</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <BoxChecker
        tsums={happinessTsums}
        label="ハピネスBOX進捗"
        noticeText="※「ならびかえ」→「リリース順」がおすすめ。"
        costPerPull={10000}
        costUnit="コイン"
        hideTotals
      />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
