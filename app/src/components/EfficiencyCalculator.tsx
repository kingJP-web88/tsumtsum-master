"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Mode = "coin" | "medal";

const MEDAL_CAP = 500_000;
const RECORDS_KEY = "tsumtsum-master::efficiency-records::v1";

type CoinItem = { key: string; label: string; cost: number };
const COIN_ITEMS: CoinItem[] = [
  { key: "five-to-four", label: "5→4", cost: 1_800 },
  { key: "time", label: "+Time", cost: 1_000 },
  { key: "score", label: "+Score", cost: 500 },
  { key: "bomb", label: "+Bomb", cost: 1_500 },
  { key: "exp", label: "+Exp", cost: 500 },
  { key: "combo", label: "+Combo", cost: 1_200 },
];

type EfficiencyRecord = {
  id: string;
  characterName: string;
  mode: Mode;
  perMin: number;
  savedAt: number;
};

const numberFmt = (n: number) => n.toLocaleString();
const dateFmt = (ts: number) => {
  const d = new Date(ts);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
};

export default function EfficiencyCalculator() {
  const searchParams = useSearchParams();
  const initialMode: Mode =
    searchParams.get("unit") === "medal" ? "medal" : "coin";
  const initialGoal = (() => {
    const raw = searchParams.get("goal");
    const n = raw ? Number(raw) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  })();

  const [mode, setMode] = useState<Mode>(initialMode);

  // Input mode (shared)
  const [coinInputMode, setCoinInputMode] = useState<"stopwatch" | "manual">("stopwatch");

  // Coin
  const [coinElapsedMs, setCoinElapsedMs] = useState(0);
  const [coinRunning, setCoinRunning] = useState(false);
  const [coinManualMin, setCoinManualMin] = useState(1);
  const [coinManualSec, setCoinManualSec] = useState(0);
  const [earnedCoin, setEarnedCoin] = useState(0);
  const [activeItems, setActiveItems] = useState<Set<string>>(new Set());
  const [goalCoin, setGoalCoin] = useState(
    initialMode === "coin" && initialGoal ? initialGoal : 0,
  );

  const itemCost = COIN_ITEMS.reduce(
    (sum, it) => (activeItems.has(it.key) ? sum + it.cost : sum),
    0,
  );

  const toggleItem = (key: string) => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Medal (independent stopwatch / manual playtime)
  const [medalElapsedMs, setMedalElapsedMs] = useState(0);
  const [medalRunning, setMedalRunning] = useState(false);
  const [medalManualMin, setMedalManualMin] = useState(1);
  const [medalManualSec, setMedalManualSec] = useState(0);
  const [earnedMedal, setEarnedMedal] = useState(0);
  const [goalMedal, setGoalMedal] = useState(
    initialMode === "medal" && initialGoal ? initialGoal : 0,
  );

  // Daily playtime (shared)
  const [dailyHours, setDailyHours] = useState(1);
  const [dailyExtraMin, setDailyExtraMin] = useState(0);

  // Character name + saved records (localStorage)
  const [characterName, setCharacterName] = useState("");
  const [records, setRecords] = useState<EfficiencyRecord[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(RECORDS_KEY);
      if (raw) setRecords(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);
  const persistRecords = (next: EfficiencyRecord[]) => {
    setRecords(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(RECORDS_KEY, JSON.stringify(next));
      } catch {}
    }
  };
  const saveCurrentRecord = (perMin: number) => {
    const name = characterName.trim();
    if (!name || perMin <= 0) return;
    const newRec: EfficiencyRecord = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
      characterName: name,
      mode,
      perMin: Math.round(perMin),
      savedAt: Date.now(),
    };
    persistRecords([...records, newRec]);
    setCharacterName("");
  };
  const deleteRecord = (id: string) => {
    persistRecords(records.filter((r) => r.id !== id));
  };

  const dailyMinutes = dailyHours * 60 + dailyExtraMin;

  useEffect(() => {
    if (!coinRunning) return;
    const start = Date.now();
    const base = coinElapsedMs;
    const id = setInterval(() => {
      setCoinElapsedMs(base + (Date.now() - start));
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinRunning]);

  useEffect(() => {
    if (!medalRunning) return;
    const start = Date.now();
    const base = medalElapsedMs;
    const id = setInterval(() => {
      setMedalElapsedMs(base + (Date.now() - start));
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medalRunning]);

  const coin = useMemo(() => {
    const minutes =
      coinInputMode === "stopwatch"
        ? coinElapsedMs / 60_000
        : coinManualMin + coinManualSec / 60;
    const netCoin = Math.max(0, earnedCoin - itemCost);
    const coinPerMin =
      minutes > 0 && netCoin > 0 ? netCoin / minutes : 0;
    const dailyCoin = coinPerMin * dailyMinutes;
    const days = dailyCoin > 0 && goalCoin > 0 ? Math.ceil(goalCoin / dailyCoin) : null;
    return { coinPerMin, dailyCoin, days, netCoin };
  }, [coinInputMode, coinElapsedMs, earnedCoin, itemCost, coinManualMin, coinManualSec, dailyMinutes, goalCoin]);

  const medal = useMemo(() => {
    const minutes =
      coinInputMode === "stopwatch"
        ? medalElapsedMs / 60_000
        : medalManualMin + medalManualSec / 60;
    const medalPerMin =
      minutes > 0 && earnedMedal > 0 ? earnedMedal / minutes : 0;
    const dailyMedal = medalPerMin * dailyMinutes;
    const days = dailyMedal > 0 && goalMedal > 0 ? Math.ceil(goalMedal / dailyMedal) : null;
    return { medalPerMin, dailyMedal, days };
  }, [coinInputMode, medalElapsedMs, earnedMedal, medalManualMin, medalManualSec, dailyMinutes, goalMedal]);

  const overCap = mode === "medal" && goalMedal > MEDAL_CAP;

  const currentPerMin = mode === "coin" ? coin.coinPerMin : medal.medalPerMin;
  const visibleRecords = records
    .filter((r) => r.mode === mode)
    .sort((a, b) => b.perMin - a.perMin);

  return (
    <section
      className="rounded-2xl bg-white p-5 space-y-4"
      style={{ color: "var(--tt-text)" }}
    >
      <details className="rounded-xl" style={{ background: "var(--tt-row-mute)" }}>
        <summary
          className="cursor-pointer text-sm font-semibold px-3 py-2 select-none"
          style={{ color: "var(--tt-text)" }}
        >
          📖 使い方を見る
        </summary>
        <ol
          className="px-5 py-3 text-sm space-y-1.5 list-decimal leading-relaxed"
          style={{ color: "var(--tt-text-sub)" }}
        >
          <li>「コイン」か「メダル」のタブを選ぶ</li>
          <li>キャラ名を入力 (例: ガストン)</li>
          <li>計測する場合は ⏱「スタート」を押して1プレイ開始 → 終わったら「ストップ」。手動入力なら ✎ にしてプレイ時間を直接入力</li>
          <li>そのプレイで獲得したコイン (またはメダル) を入力</li>
          <li>使ったアイテムがあればタップで選択</li>
          <li>「コイン/分」が自動算出される</li>
          <li>「+ 保存する」を押すと キャラ名・効率を記録。下に保存リストが出てキャラ同士で比較できる</li>
        </ol>
      </details>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-bold">効率計算</h2>
        <div role="tablist" className="inline-flex rounded-full p-0.5" style={{ background: "var(--tt-row-mute)" }}>
          <ModeTab active={mode === "coin"} onClick={() => setMode("coin")} color="var(--tt-gold)" text="var(--tt-gold-text)">
            コイン
          </ModeTab>
          <ModeTab active={mode === "medal"} onClick={() => setMode("medal")} color="var(--tt-box-premium-plus)" text="#fff">
            メダル
          </ModeTab>
        </div>
      </div>

      {mode === "coin" ? (
        <>
          <div role="tablist" className="inline-flex rounded-full p-0.5 self-start" style={{ background: "var(--tt-row-mute)" }}>
            <SubTab active={coinInputMode === "stopwatch"} onClick={() => setCoinInputMode("stopwatch")}>
              ⏱ 計測する
            </SubTab>
            <SubTab active={coinInputMode === "manual"} onClick={() => setCoinInputMode("manual")}>
              ✎ 手動入力
            </SubTab>
          </div>

          <Field label="キャラ名">
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="例: ガストン"
              className="w-full rounded-xl px-3 py-2 text-base outline-none"
              style={{ background: "var(--tt-row-mute)", color: "var(--tt-text)" }}
            />
          </Field>

          {coinInputMode === "stopwatch" ? (
            <Stopwatch
              elapsedMs={coinElapsedMs}
              running={coinRunning}
              onToggle={() => setCoinRunning((v) => !v)}
              onReset={() => {
                setCoinRunning(false);
                setCoinElapsedMs(0);
              }}
            />
          ) : (
            <Field label="プレイ時間">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <NumberInput value={coinManualMin} onChange={setCoinManualMin} step={1} min={0} align="right" />
                </div>
                <span className="text-sm font-semibold">分</span>
                <div className="flex-1">
                  <NumberInput value={coinManualSec} onChange={setCoinManualSec} step={1} min={0} align="right" />
                </div>
                <span className="text-sm font-semibold">秒</span>
              </div>
            </Field>
          )}
          <Field label="獲得コイン数" suffix="コイン">
            <NumberInput value={earnedCoin} onChange={setEarnedCoin} step={1_000} min={0} />
          </Field>
          <p
            className="text-sm font-semibold leading-relaxed"
            style={{ color: "var(--tt-box-premium)" }}
          >
            ※ 正確に効率を測るときは <strong>+Coin (コインアップ)</strong> は外して計測を推奨します。<br />
            <span className="font-medium" style={{ color: "var(--tt-text)" }}>
              (実プレイでは +Coin を使うと獲得コイン数が増えるので、コイン稼ぎ効率は実際にはこれより高くなります)
            </span>
          </p>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">使用したアイテム</span>
              {itemCost > 0 && (
                <span className="text-sm font-semibold" style={{ color: "var(--tt-text)" }}>
                  合計 −{numberFmt(itemCost)} コイン (純利益 {numberFmt(coin.netCoin)})
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {/* note: +Coin (コインアップ) は除外。実効率を測りたいときは使わず、純粋なツムスキルだけで計測するのが正確 */}
              {COIN_ITEMS.map((it) => {
                const active = activeItems.has(it.key);
                return (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => toggleItem(it.key)}
                    aria-pressed={active}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-150 hover:-translate-y-0.5"
                    style={
                      active
                        ? {
                            background: "var(--tt-gold)",
                            color: "var(--tt-gold-text)",
                            border: "1px solid rgba(0,0,0,0.10)",
                            boxShadow: [
                              "inset 0 1px 0 rgba(255,255,255,0.45)",
                              "inset 0 -2px 0 rgba(0,0,0,0.15)",
                              "0 2px 0 rgba(0,0,0,0.08)",
                            ].join(","),
                          }
                        : {
                            background: "var(--tt-row-mute)",
                            color: "var(--tt-text-sub)",
                            border: "1px solid var(--tt-divider)",
                          }
                    }
                  >
                    <span>{it.label}</span>
                    <span className="tabular-nums opacity-80">−{numberFmt(it.cost)}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <MetricStrip
            label="コイン / 分 (1分あたりの効率)"
            value={Math.round(coin.coinPerMin)}
            unit="コイン/分"
            hint={
              coinInputMode === "stopwatch"
                ? "ストップウォッチで時間を計り、獲得コインを入力すると算出されます"
                : "プレイ時間と獲得コインを入力すると算出されます"
            }
          />

          <Field label="1日のプレイ時間">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <NumberInput value={dailyHours} onChange={setDailyHours} step={1} min={0} align="right" />
              </div>
              <span className="text-sm font-semibold">時間</span>
              <div className="flex-1">
                <NumberInput value={dailyExtraMin} onChange={setDailyExtraMin} step={5} min={0} align="right" />
              </div>
              <span className="text-sm font-semibold">分</span>
            </div>
          </Field>
          <Field label="目標コイン" suffix="コイン">
            <NumberInput value={goalCoin} onChange={setGoalCoin} step={100_000} min={0} />
          </Field>
          <Result
            heading="コイン稼ぎ"
            dailyLabel="1日あたりの収入"
            daily={Math.round(coin.dailyCoin)}
            dailyUnit="コイン"
            days={coin.days}
            extra={
              coin.coinPerMin > 0
                ? `${numberFmt(Math.round(coin.coinPerMin))} コイン/分 × ${numberFmt(dailyMinutes)} 分 = ${numberFmt(Math.round(coin.dailyCoin))} コイン/日`
                : null
            }
          />
        </>
      ) : (
        <>
          <div role="tablist" className="inline-flex rounded-full p-0.5 self-start" style={{ background: "var(--tt-row-mute)" }}>
            <SubTab active={coinInputMode === "stopwatch"} onClick={() => setCoinInputMode("stopwatch")}>
              ⏱ 計測する
            </SubTab>
            <SubTab active={coinInputMode === "manual"} onClick={() => setCoinInputMode("manual")}>
              ✎ 手動入力
            </SubTab>
          </div>

          <Field label="キャラ名">
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="例: シンバ＋"
              className="w-full rounded-xl px-3 py-2 text-base outline-none"
              style={{ background: "var(--tt-row-mute)", color: "var(--tt-text)" }}
            />
          </Field>

          {coinInputMode === "stopwatch" ? (
            <Stopwatch
              elapsedMs={medalElapsedMs}
              running={medalRunning}
              onToggle={() => setMedalRunning((v) => !v)}
              onReset={() => {
                setMedalRunning(false);
                setMedalElapsedMs(0);
              }}
            />
          ) : (
            <Field label="プレイ時間">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <NumberInput value={medalManualMin} onChange={setMedalManualMin} step={1} min={0} align="right" />
                </div>
                <span className="text-sm font-semibold">分</span>
                <div className="flex-1">
                  <NumberInput value={medalManualSec} onChange={setMedalManualSec} step={1} min={0} align="right" />
                </div>
                <span className="text-sm font-semibold">秒</span>
              </div>
            </Field>
          )}
          <Field label="獲得メダル数" suffix="メダル">
            <NumberInput value={earnedMedal} onChange={setEarnedMedal} step={100} min={0} />
          </Field>
          <MetricStrip
            label="メダル / 分 (1分あたりの効率)"
            value={Math.round(medal.medalPerMin)}
            unit="メダル/分"
            hint={
              coinInputMode === "stopwatch"
                ? "ストップウォッチで時間を計り、獲得メダルを入力すると算出されます"
                : "プレイ時間と獲得メダルを入力すると算出されます"
            }
          />

          <Field label="1日のプレイ時間">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <NumberInput value={dailyHours} onChange={setDailyHours} step={1} min={0} align="right" />
              </div>
              <span className="text-sm font-semibold">時間</span>
              <div className="flex-1">
                <NumberInput value={dailyExtraMin} onChange={setDailyExtraMin} step={5} min={0} align="right" />
              </div>
              <span className="text-sm font-semibold">分</span>
            </div>
          </Field>
          <Field label="目標メダル" suffix="メダル">
            <NumberInput value={goalMedal} onChange={setGoalMedal} step={10_000} min={0} />
          </Field>
          {overCap && (
            <p className="text-sm font-semibold leading-relaxed" style={{ color: "var(--tt-box-premium)" }}>
              ※ メダル所持上限は {numberFmt(MEDAL_CAP)} 枚なので、実際は何回かに分けて消費する必要があります。
              <span className="font-medium" style={{ color: "var(--tt-text)" }}> (計算自体は目標値で行います)</span>
            </p>
          )}
          <Result
            heading="メダル稼ぎ"
            dailyLabel="1日あたりの収入"
            daily={Math.round(medal.dailyMedal)}
            dailyUnit="メダル"
            days={medal.days}
            extra={
              medal.medalPerMin > 0
                ? `${numberFmt(Math.round(medal.medalPerMin))} メダル/分 × ${numberFmt(dailyMinutes)} 分 = ${numberFmt(Math.round(medal.dailyMedal))} メダル/日`
                : null
            }
          />
        </>
      )}

      {/* Save & compare characters */}
      <SaveAndCompare
        mode={mode}
        characterName={characterName}
        currentPerMin={currentPerMin}
        records={visibleRecords}
        hydrated={hydrated}
        onSave={() => saveCurrentRecord(currentPerMin)}
        onDelete={deleteRecord}
      />
    </section>
  );
}

function SaveAndCompare({
  mode,
  characterName,
  currentPerMin,
  records,
  hydrated,
  onSave,
  onDelete,
}: {
  mode: Mode;
  characterName: string;
  currentPerMin: number;
  records: EfficiencyRecord[];
  hydrated: boolean;
  onSave: () => void;
  onDelete: (id: string) => void;
}) {
  const unit = mode === "coin" ? "コイン" : "メダル";
  const canSave = characterName.trim().length > 0 && currentPerMin > 0;

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{ background: "var(--tt-row-mute)" }}
    >
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <h3 className="text-sm font-bold" style={{ color: "var(--tt-text)" }}>
          保存して比べる
        </h3>
        <span className="text-sm font-medium" style={{ color: "var(--tt-text-sub)" }}>
          ブラウザに保存 (同じ端末でのみ表示)
        </span>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className="w-full rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        style={{
          background: canSave ? "var(--tt-mint)" : "var(--tt-divider)",
          color: canSave ? "#fff" : "var(--tt-text-sub)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: canSave
            ? [
                "inset 0 1px 0 rgba(255,255,255,0.45)",
                "inset 0 -2px 0 rgba(0,0,0,0.15)",
                "0 2px 0 rgba(0,0,0,0.10)",
              ].join(",")
            : "none",
        }}
      >
        + 現在の効率を保存
      </button>
      {!canSave && hydrated && (
        <p className="text-sm font-medium" style={{ color: "var(--tt-text-sub)" }}>
          {!characterName.trim()
            ? "キャラ名を入力してください"
            : `${unit}/分 が算出されてから保存できます`}
        </p>
      )}

      {records.length > 0 && (
        <ul className="space-y-2">
          {records.map((r, idx) => (
            <li
              key={r.id}
              className="flex items-center gap-2 rounded-xl bg-white px-3 py-2"
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0"
                style={{
                  background: idx === 0 ? "var(--tt-gold)" : "var(--tt-divider)",
                  color: idx === 0 ? "var(--tt-gold-text)" : "var(--tt-text-sub)",
                }}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "var(--tt-text)" }}>
                  {r.characterName}
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--tt-text-sub)" }}>
                  {dateFmt(r.savedAt)}
                </div>
              </div>
              <div className="text-right tabular-nums shrink-0">
                <div className="text-base font-bold" style={{ color: "var(--tt-text)" }}>
                  {numberFmt(r.perMin)}
                </div>
                <div className="text-[10px]" style={{ color: "var(--tt-text-sub)" }}>
                  {unit}/分
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDelete(r.id)}
                aria-label={`${r.characterName} を削除`}
                className="text-xs px-2 py-1 rounded-full shrink-0"
                style={{ color: "var(--tt-text-sub)" }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="rounded-full px-3 py-1 text-xs font-semibold transition-all"
      style={
        active
          ? {
              background: "#fff",
              color: "var(--tt-text)",
              boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
            }
          : { background: "transparent", color: "var(--tt-text-sub)" }
      }
    >
      {children}
    </button>
  );
}

function Stopwatch({
  elapsedMs,
  running,
  onToggle,
  onReset,
}: {
  elapsedMs: number;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
}) {
  const totalSec = Math.floor(elapsedMs / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const ms10 = Math.floor((elapsedMs % 1000) / 100);
  const display = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${ms10}`;

  return (
    <div
      className="rounded-2xl p-3 flex items-center gap-3"
      style={{ background: "var(--tt-row-mute)" }}
    >
      <div
        className="flex-1 text-center tabular-nums font-black text-3xl tracking-tight"
        style={{ color: "var(--tt-text)" }}
        aria-live="polite"
      >
        {display}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="rounded-full px-4 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: running ? "var(--tt-box-premium)" : "var(--tt-mint)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.45)",
            "inset 0 -2px 0 rgba(0,0,0,0.15)",
            "0 2px 0 rgba(0,0,0,0.12)",
            "0 4px 10px rgba(0,0,0,0.12)",
          ].join(","),
        }}
      >
        {running ? "ストップ" : "スタート"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
        style={{
          background: "transparent",
          color: "var(--tt-text-sub)",
          border: "1px solid var(--tt-divider)",
        }}
      >
        リセット
      </button>
    </div>
  );
}

function MetricStrip({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: number;
  unit: string;
  hint?: string | null;
}) {
  return (
    <div
      className="rounded-xl px-4 py-3 flex items-baseline justify-between gap-2"
      style={{ background: "var(--tt-rose-bg)" }}
    >
      <span className="text-sm font-semibold" style={{ color: "var(--tt-text)" }}>
        {label}
      </span>
      {value > 0 ? (
        <span className="tabular-nums">
          <span className="text-2xl font-bold" style={{ color: "var(--tt-pink)" }}>
            {numberFmt(value)}
          </span>
          <span className="text-xs ml-1" style={{ color: "var(--tt-text-sub)" }}>
            {unit}
          </span>
        </span>
      ) : (
        <span className="text-sm font-medium" style={{ color: "var(--tt-text-sub)" }}>
          {hint ?? "入力待ち"}
        </span>
      )}
    </div>
  );
}

function ModeTab({
  active,
  onClick,
  color,
  text,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="rounded-full px-4 py-1 text-sm font-semibold transition-all"
      style={
        active
          ? {
              background: color,
              color: text,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 0 rgba(0,0,0,0.10)",
            }
          : { background: "transparent", color: "var(--tt-text-sub)" }
      }
    >
      {children}
    </button>
  );
}

function Field({
  label,
  suffix,
  children,
}: {
  label: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold">{label}</span>
        {suffix && (
          <span className="text-xs" style={{ color: "var(--tt-text-sub)" }}>
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  step = 1,
  min = 0,
  align = "left",
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  align?: "left" | "right" | "center";
}) {
  const [text, setText] = useState<string>(String(value));

  // Re-sync from external value when not focused
  useEffect(() => {
    if (Number(text) !== value) {
      setText(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        // Allow only digits while typing (also empty)
        if (raw === "" || /^\d+$/.test(raw)) {
          setText(raw);
          const v = raw === "" ? min : Number(raw);
          if (Number.isFinite(v) && v >= min) onChange(v);
        }
      }}
      onBlur={() => {
        if (text === "") {
          setText(String(min));
          onChange(min);
        }
      }}
      onFocus={(e) => e.target.select()}
      step={step}
      className="w-full rounded-xl px-3 py-2 text-base tabular-nums font-semibold outline-none"
      style={{
        background: "var(--tt-row-mute)",
        color: "var(--tt-text)",
        textAlign: align,
      }}
    />
  );
}

function Toggle({
  label,
  sub,
  checked,
  onChange,
}: {
  label: string;
  sub?: string;
  checked: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-start gap-3 text-left rounded-xl px-3 py-2.5 transition-colors"
      style={{ background: "var(--tt-row-mute)" }}
    >
      <span
        aria-hidden
        className="mt-0.5 inline-flex items-center w-10 h-6 rounded-full transition-colors shrink-0"
        style={{
          background: checked ? "var(--tt-mint)" : "rgba(0,0,0,0.15)",
        }}
      >
        <span
          className="inline-block w-5 h-5 rounded-full bg-white shadow transition-transform"
          style={{
            transform: checked ? "translateX(18px)" : "translateX(2px)",
          }}
        />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        {sub && (
          <span className="block text-xs font-medium mt-0.5" style={{ color: "var(--tt-text-sub)" }}>
            {sub}
          </span>
        )}
      </span>
    </button>
  );
}

function Result({
  heading,
  dailyLabel,
  daily,
  dailyUnit,
  days,
  extra,
}: {
  heading: string;
  dailyLabel: string;
  daily: number;
  dailyUnit: string;
  days: number | null;
  extra?: string | null;
}) {
  return (
    <div
      className="rounded-2xl p-4 space-y-2"
      style={{ background: "var(--tt-row-mute)" }}
    >
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold" style={{ color: "var(--tt-text-sub)" }}>
          {heading}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm" style={{ color: "var(--tt-text-sub)" }}>{dailyLabel}</span>
        <span className="tabular-nums">
          <span className="text-2xl font-bold">{numberFmt(daily)}</span>
          <span className="text-xs ml-1" style={{ color: "var(--tt-text-sub)" }}>{dailyUnit}/日</span>
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm" style={{ color: "var(--tt-text-sub)" }}>達成日数</span>
        <span className="tabular-nums">
          {days === null ? (
            <span className="text-base font-semibold" style={{ color: "var(--tt-box-premium)" }}>
              未入力項目があるため算出不可
            </span>
          ) : (
            <>
              <span className="text-xs mr-1" style={{ color: "var(--tt-text-sub)" }}>約</span>
              <span className="text-2xl font-bold">{numberFmt(days)}</span>
              <span className="text-xs ml-1" style={{ color: "var(--tt-text-sub)" }}>日</span>
            </>
          )}
        </span>
      </div>
      {extra && (
        <p className="text-sm pt-1 border-t leading-relaxed font-medium" style={{ color: "var(--tt-text-sub)", borderColor: "var(--tt-divider)" }}>
          {extra}
        </p>
      )}
    </div>
  );
}
