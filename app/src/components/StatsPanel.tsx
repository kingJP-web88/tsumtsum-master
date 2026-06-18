import type { BoxStats } from "@/lib/types";

type Props = {
  stats: BoxStats;
  label: string;
  hideTotals?: boolean;
};

export default function StatsPanel({ stats, label, hideTotals = false }: Props) {
  const { total, owned, maxed, completionPct, totalCopiesObtained, totalCopiesForCompletion } = stats;
  const sold = maxed === total && total > 0;
  const copiesPct =
    totalCopiesForCompletion === 0
      ? 0
      : Math.round((totalCopiesObtained / totalCopiesForCompletion) * 1000) / 10;
  const remainingCopies = Math.max(0, totalCopiesForCompletion - totalCopiesObtained);

  return (
    <div
      className="rounded-2xl bg-white p-4"
      style={{ color: "var(--tt-text)" }}
    >
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h2 className="text-base font-semibold">{label}</h2>
        {sold ? (
          <span className="text-sm font-bold" style={{ color: "var(--tt-mint)" }}>
            完売！🎉
          </span>
        ) : hideTotals ? null : (
          <span className="text-sm" style={{ color: "var(--tt-text-sub)" }}>
            完売まで残り <strong style={{ color: "var(--tt-text)" }}>{total - maxed}</strong> 体
          </span>
        )}
      </div>
      <div
        className="mt-3 h-2 rounded-full overflow-hidden"
        style={{ background: "var(--tt-divider)" }}
      >
        <div
          className="h-full transition-[width]"
          style={{
            width: `${completionPct}%`,
            background: sold ? "var(--tt-mint)" : "var(--tt-gold)",
          }}
        />
      </div>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <dt className="text-xs" style={{ color: "var(--tt-text-sub)" }}>所持</dt>
          <dd className="font-semibold tabular-nums">{owned}/{total}</dd>
        </div>
        <div>
          <dt className="text-xs" style={{ color: "var(--tt-text-sub)" }}>スキルマ</dt>
          <dd className="font-semibold tabular-nums">{maxed}/{total}</dd>
        </div>
        <div>
          <dt className="text-xs" style={{ color: "var(--tt-text-sub)" }}>完売進捗</dt>
          <dd className="font-semibold tabular-nums">{completionPct}%</dd>
        </div>
      </dl>
      {!hideTotals && (
        <div
          className="mt-3 pt-3 border-t text-xs flex justify-between gap-2 flex-wrap"
          style={{ borderColor: "var(--tt-divider)", color: "var(--tt-text-sub)" }}
        >
          <span>
            累計獲得:{" "}
            <strong className="tabular-nums" style={{ color: "var(--tt-text)" }}>
              {totalCopiesObtained}
            </strong>
            {" / "}
            <span className="tabular-nums">{totalCopiesForCompletion}</span>
            <span className="ml-1">({copiesPct}%)</span>
          </span>
          <span>
            残り <strong className="tabular-nums" style={{ color: "var(--tt-text)" }}>{remainingCopies}</strong> 体
          </span>
        </div>
      )}
    </div>
  );
}
