import Link from "next/link";
import AdSlot from "@/components/AdSlot";

const cards = [
  {
    href: "/premium-plus",
    title: "プレミアムBOX＋",
    color: "var(--tt-box-premium-plus)",
    soft: "var(--tt-box-premium-plus-soft)",
    cta: "進む",
  },
  {
    href: "/premium",
    title: "プレミアムBOX",
    color: "var(--tt-box-premium)",
    soft: "var(--tt-box-premium-soft)",
    cta: "進む",
  },
  {
    href: "/happiness",
    title: "ハピネスBOX",
    color: "var(--tt-box-happiness)",
    soft: "var(--tt-box-happiness-soft)",
    cta: "進む",
  },
  {
    href: "/efficiency",
    title: "コイン稼ぎ・メダル稼ぎ効率計算",
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
          3BOXの
          <strong style={{ color: "var(--tt-text)" }}>
            <span className="whitespace-nowrap">完売進捗</span>と
            <span className="whitespace-nowrap">必要コイン/</span>
            <span className="whitespace-nowrap">メダル数</span>
          </strong>
          <span className="whitespace-nowrap">を算出。</span>
          データは
          <strong style={{ color: "var(--tt-text)" }}>
            <span className="whitespace-nowrap">ブラウザにのみ保存。</span>
          </strong>
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
              <h2
                className="text-[22px] sm:text-[26px] font-black tracking-tight leading-tight min-w-0"
                style={{
                  backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${c.color} 50%, white) 0%, ${c.color} 45%, color-mix(in srgb, ${c.color} 75%, black) 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  filter: [
                    `drop-shadow(0 1px 0 rgba(255,255,255,0.95))`,
                    `drop-shadow(0 2px 0 rgba(255,255,255,0.55))`,
                    `drop-shadow(0 3px 6px color-mix(in srgb, ${c.color} 45%, transparent))`,
                    `drop-shadow(0 10px 18px color-mix(in srgb, ${c.color} 28%, transparent))`,
                  ].join(" "),
                  letterSpacing: "-0.01em",
                  wordBreak: "keep-all",
                  overflowWrap: "anywhere",
                }}
              >
                {c.title}
              </h2>
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
    </div>
  );
}
