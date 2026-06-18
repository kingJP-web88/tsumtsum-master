"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useOwnedMap } from "@/lib/storage";
import { computeStats } from "@/lib/stats";
import { computeSkillState } from "@/lib/skillProgress";
import type { SkillState, Tsum } from "@/lib/types";
import StatsPanel from "./StatsPanel";

type Props = {
  tsums: Tsum[];
  label: string;
  helpText?: string;
  noticeText?: string;
  costPerPull?: number;
  costUnit?: string;
  hideTotals?: boolean;
};

export default function BoxChecker({
  tsums,
  label,
  helpText,
  noticeText,
  costPerPull,
  costUnit = "コイン",
  hideTotals = false,
}: Props) {
  const { owned, setCount, resetAll, hydrated } = useOwnedMap();
  const [showResult, setShowResult] = useState(false);

  const stats = useMemo(() => computeStats(tsums, owned), [tsums, owned]);

  const remainingCopies = Math.max(
    0,
    stats.totalCopiesForCompletion - stats.totalCopiesObtained,
  );
  const totalCost =
    costPerPull != null ? remainingCopies * costPerPull : null;
  const isComplete = remainingCopies === 0 && stats.total > 0;

  const visible = tsums;

  return (
    <div className="space-y-4">
      <StatsPanel stats={stats} label={label} hideTotals={hideTotals} />

      {(helpText || noticeText) && (
        <div
          className="rounded-2xl bg-white px-4 py-3 space-y-1.5"
          style={{ textWrap: "pretty" }}
        >
          {helpText && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--tt-text-sub)" }}>
              {helpText}
            </p>
          )}
          {noticeText && (
            <p
              className="text-sm leading-relaxed font-semibold"
              style={{ color: "var(--tt-box-premium)" }}
            >
              {noticeText}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (confirm("入力をすべてリセットしますか？")) resetAll();
          }}
          className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "var(--tt-box-premium)",
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.45)",
              "inset 0 -2px 0 rgba(0,0,0,0.15)",
              "0 2px 0 rgba(0,0,0,0.12)",
              "0 4px 10px rgba(0,0,0,0.12)",
            ].join(","),
          }}
        >
          すべてリセット
        </button>
      </div>

      {!hydrated ? (
        <div className="text-sm py-8 text-center rounded-2xl bg-white" style={{ color: "var(--tt-text-mute)" }}>
          読み込み中…
        </div>
      ) : visible.length === 0 ? (
        <div className="text-sm py-8 text-center rounded-2xl bg-white" style={{ color: "var(--tt-text-mute)" }}>
          該当するツムがありません。
        </div>
      ) : (
        <ul
          className="rounded-2xl bg-white overflow-hidden"
        >
          {visible.map((t) => {
            const count = owned[t.id] ?? 0;
            const state = computeSkillState(count, t);
            return (
              <TsumRow
                key={t.id}
                tsum={t}
                state={state}
                onChange={(next) => setCount(t.id, next)}
              />
            );
          })}
        </ul>
      )}

      {hydrated && costPerPull != null && (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowResult((v) => !v)}
            className="w-full rounded-full text-white font-semibold py-3 text-base active:scale-[0.99] transition-transform"
            style={{ background: "var(--tt-pink)" }}
          >
            {showResult ? "閉じる" : "集計する"}
          </button>
          {showResult && (
            <CostResult
              remainingCopies={remainingCopies}
              costPerPull={costPerPull}
              costUnit={costUnit}
              totalCost={totalCost ?? 0}
              isComplete={isComplete}
            />
          )}
        </div>
      )}
    </div>
  );
}

function CostResult({
  remainingCopies,
  costPerPull,
  costUnit,
  totalCost,
  isComplete,
}: {
  remainingCopies: number;
  costPerPull: number;
  costUnit: string;
  totalCost: number;
  isComplete: boolean;
}) {
  if (isComplete) {
    return (
      <div
        className="rounded-2xl bg-white p-5 text-center space-y-2"
        style={{ color: "var(--tt-text)" }}
      >
        <div className="text-2xl">🎉</div>
        <div className="text-lg font-bold" style={{ color: "var(--tt-mint)" }}>
          完売達成済みです！
        </div>
        <div className="text-sm" style={{ color: "var(--tt-text-sub)" }}>
          全ツムがスキルMAX。お疲れさまでした。
        </div>
      </div>
    );
  }
  return (
    <div
      className="rounded-2xl bg-white p-5 space-y-3"
      style={{ color: "var(--tt-text)" }}
    >
      <div className="text-center">
        <div className="text-xs" style={{ color: "var(--tt-text-sub)" }}>
          完売まで必要な{costUnit}
        </div>
        <div className="text-3xl font-bold tabular-nums mt-1">
          {totalCost.toLocaleString()}
        </div>
        <div className="text-xs mt-1" style={{ color: "var(--tt-text-sub)" }}>
          {costUnit}
        </div>
      </div>
      <div
        className="border-t pt-3 text-xs space-y-1"
        style={{ borderColor: "var(--tt-divider)" }}
      >
        <div className="flex justify-between">
          <span style={{ color: "var(--tt-text-sub)" }}>残りガチャ回数</span>
          <span className="tabular-nums font-semibold">
            {remainingCopies.toLocaleString()} 回
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--tt-text-sub)" }}>1回の{costUnit}</span>
          <span className="tabular-nums font-semibold">
            {costPerPull.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--tt-text-sub)" }}>計算式</span>
          <span className="tabular-nums" style={{ color: "var(--tt-text-sub)" }}>
            {remainingCopies.toLocaleString()} × {costPerPull.toLocaleString()}
          </span>
        </div>
      </div>
      <Link
        href={`/efficiency?goal=${totalCost}&unit=${costUnit === "メダル" ? "medal" : "coin"}`}
        className="block text-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: "var(--tt-gold)",
          color: "var(--tt-gold-text)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.45)",
            "inset 0 -2px 0 rgba(0,0,0,0.15)",
            "0 2px 0 rgba(0,0,0,0.12)",
            "0 4px 10px rgba(0,0,0,0.12)",
          ].join(","),
        }}
      >
        {costUnit}稼ぎ効率を計算 →
      </Link>
    </div>
  );
}

type StateOption = { value: number; label: string };

function generateStates(tsum: Tsum): StateOption[] {
  const cost = tsum.skillUpCost;
  const maxLevel = tsum.maxSkillLevel;
  const opts: StateOption[] = [{ value: 0, label: "未所持" }];

  if (!cost || cost.length === 0) {
    for (let lvl = 1; lvl <= maxLevel; lvl++) {
      opts.push({
        value: lvl,
        label: lvl === maxLevel ? `SL${lvl} MAX` : `SL${lvl}`,
      });
    }
    return opts;
  }

  let totalCount = 1;
  for (let level = 1; level <= maxLevel; level++) {
    if (level === maxLevel) {
      opts.push({ value: totalCount, label: `SL${level} MAX` });
      break;
    }
    const nextCost = cost[level - 1];
    if (nextCost === undefined) {
      opts.push({ value: totalCount, label: `SL${level}` });
      break;
    }
    opts.push({ value: totalCount, label: `SL${level}` });
    for (let i = 1; i < nextCost; i++) {
      // ゲーム側は切り捨て表示 (例: 1/6=16.66…% → ゲーム上は 16%)
      const pct = Math.floor((i / nextCost) * 100);
      opts.push({
        value: totalCount + i,
        label: `SL${level} (${pct}%)`,
      });
    }
    totalCount += nextCost;
  }
  return opts;
}

function TsumRow({
  tsum,
  state,
  onChange,
}: {
  tsum: Tsum;
  state: SkillState;
  onChange: (next: number) => void;
}) {
  const options = useMemo(() => generateStates(tsum), [tsum]);
  const { skillLevel, copies, nextCost, isMaxed, totalCount } = state;

  const progressPct = isMaxed
    ? 100
    : nextCost && nextCost > 0
      ? Math.min(100, (copies / nextCost) * 100)
      : 0;

  // 行の背景: 限定はピンク、スキルマは薄ゴールド
  const rowBg = isMaxed
    ? "rgba(255, 180, 0, 0.08)"
    : tsum.limited
      ? "var(--tt-rose-bg)"
      : "transparent";

  const isUnowned = skillLevel === 0;

  // セレクトのスタイルは「現在状態」によって変える
  // 所持 → ゴールド塗り、未所持 → 薄背景
  const selectBg = isUnowned ? "var(--tt-row-mute)" : "var(--tt-gold)";
  const selectColor = isUnowned ? "var(--tt-text-mute)" : "var(--tt-gold-text)";
  const chevronHex = isUnowned ? "%233A5A7C" : "%234A2F00";
  const chevronUrl = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='${chevronHex}'%3E%3Cpath d='M5.25 7.5l4.75 5 4.75-5z'/%3E%3C/svg%3E")`;

  return (
    <li
      className="px-3 py-2.5 border-b last:border-b-0"
      style={{ background: rowBg, borderColor: "var(--tt-divider)" }}
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
          <span
            className="text-sm font-medium truncate"
            style={{ color: isUnowned ? "var(--tt-text-mute)" : "var(--tt-text)" }}
          >
            {tsum.name}
          </span>
          {tsum.limited && (
            <span
              className="text-[10px] font-semibold rounded-full px-2 py-0.5"
              style={{ background: "var(--tt-pink)", color: "var(--tt-pink-text)" }}
            >
              今月のツム
            </span>
          )}
          {isMaxed && (
            <span
              className="text-[10px] font-semibold rounded-full px-2 py-0.5"
              style={{ background: "var(--tt-gold)", color: "var(--tt-gold-text)" }}
            >
              スキルマ
            </span>
          )}
        </div>
        <select
          value={totalCount}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${tsum.name} の現在のスキル状態`}
          className="appearance-none text-sm rounded-full pl-3 py-1 font-semibold tabular-nums shrink-0 max-w-[140px] outline-none border-0 cursor-pointer"
          style={{
            backgroundColor: selectBg,
            backgroundImage: chevronUrl,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "12px 12px",
            color: selectColor,
            paddingRight: "26px",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {!isUnowned && (
        <div
          className="mt-1.5 h-1 rounded-full overflow-hidden"
          style={{ background: "var(--tt-divider)" }}
        >
          <div
            className="h-full transition-[width]"
            style={{
              width: `${progressPct}%`,
              background: isMaxed ? "var(--tt-mint)" : "var(--tt-pink)",
            }}
          />
        </div>
      )}
    </li>
  );
}
