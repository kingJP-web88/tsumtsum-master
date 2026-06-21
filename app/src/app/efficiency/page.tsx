import { Suspense } from "react";
import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import EfficiencyCalculator from "@/components/EfficiencyCalculator";

export const metadata = {
  title: "コイン稼ぎ・メダル稼ぎ効率計算",
  description:
    "1プレイあたりの平均コインと1日のプレイ回数から、目標までの達成日数を逆算。プラスツム×ミッションのメダル稼ぎ効率もシミュレーション。",
  alternates: { canonical: "/efficiency" },
  robots: { index: false, follow: true },
};

export default function EfficiencyPage() {
  return (
    <div className="space-y-4">
      <PageHeading>コイン稼ぎ・メダル稼ぎ効率計算</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <Suspense fallback={<div className="rounded-2xl bg-white p-5 text-sm" style={{ color: "var(--tt-text-mute)" }}>読み込み中…</div>}>
        <EfficiencyCalculator />
      </Suspense>

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
