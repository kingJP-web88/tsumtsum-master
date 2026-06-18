import Link from "next/link";
import AdSlot from "@/components/AdSlot";

const cards = [
  {
    href: "/premium-plus",
    title: "プレミアムBOX＋",
    desc: "24体のスキルレベルを記録して、完売までの進捗、必要メダル数をチェック。",
    color: "var(--tt-box-premium-plus)",
    soft: "var(--tt-box-premium-plus-soft)",
    cta: "進む",
  },
  {
    href: "/premium",
    title: "プレミアムBOX",
    desc: "常駐150体のスキルレベルを記録して、完売までの進捗、必要コイン数をチェック。",
    color: "var(--tt-box-premium)",
    soft: "var(--tt-box-premium-soft)",
    cta: "進む",
  },
  {
    href: "/happiness",
    title: "ハピネスBOX",
    desc: "14体のツムのスキルレベルを記録して、完売までの進捗、必要コイン数をチェック。",
    color: "var(--tt-box-happiness)",
    soft: "var(--tt-box-happiness-soft)",
    cta: "進む",
  },
  {
    href: "/efficiency",
    title: "コイン稼ぎ・メダル稼ぎ効率計算",
    desc: "コイン・メダルの1分あたりの効率と、目標達成までの日数を計算。",
    color: "var(--tt-gold)",
    soft: "#FFF1CC",
    cta: "進む",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-5" style={{ color: "var(--tt-text)" }}>
        <h1 className="text-xl font-bold">ツムツム完売マスター</h1>
        <p
          className="mt-2 text-[15px] leading-relaxed"
          style={{ color: "var(--tt-text-sub)", textWrap: "pretty" }}
        >
          <span className="whitespace-nowrap">プレミアムBOX＋</span>・
          <span className="whitespace-nowrap">プレミアムBOX</span>・
          <span className="whitespace-nowrap">ハピネスBOX</span>の
          <strong style={{ color: "var(--tt-text)" }}>完売進捗、必要コインorメダル数</strong>
          を、所持ツムとスキルレベルから自動で算出します。データは
          <strong style={{ color: "var(--tt-text)" }}>お使いのブラウザにのみ</strong>
          保存され、外部に送信されません。
        </p>
      </section>

      <AdSlot label="広告枠（上部）" />

      <section className="grid gap-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative block overflow-hidden rounded-2xl bg-white p-4 pl-5 hover:bg-white/95 transition-colors"
            style={{ color: "var(--tt-text)" }}
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1.5"
              style={{ backgroundColor: c.color }}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="flex items-center gap-2 font-semibold">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span style={{ color: c.color }}>{c.title}</span>
                </h2>
                <p className="text-[15px] mt-1 leading-relaxed" style={{ color: "var(--tt-text-sub)" }}>
                  {c.desc}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-center gap-1 transition-transform group-hover:translate-x-1">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white whitespace-nowrap"
                  style={{
                    backgroundColor: c.color,
                    boxShadow: "0 2px 0 rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  {c.cta}
                </span>
                <span
                  aria-hidden
                  className="text-3xl leading-none font-black"
                  style={{
                    color: c.color,
                    WebkitTextStroke: `1.5px ${c.color}`,
                  }}
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <AdSlot label="広告枠（下部）" />

      <section className="text-sm leading-relaxed rounded-2xl bg-white/80 p-4" style={{ color: "var(--tt-text-sub)" }}>
        <h3 className="font-semibold mb-1 text-base" style={{ color: "var(--tt-text)" }}>完売とは？</h3>
        <p>
          ツムツムでは、スキルレベルがMAXになったツムはガチャから排出されなくなります。
          そのため対象BOXの全ツムをスキルMAXにすると、それ以上引ける対象がなくなり、
          ガチャが「完売」した状態になります。本サイトはその進捗、必要コインorメダル数を可視化するツールです。
        </p>
      </section>
    </div>
  );
}
