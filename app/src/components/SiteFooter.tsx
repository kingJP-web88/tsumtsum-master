import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-12 py-6 text-sm bg-white/80 backdrop-blur-sm border-t border-white/60" style={{ color: "var(--tt-text-sub)" }}>
      <div className="mx-auto max-w-3xl px-4 flex flex-wrap gap-4 items-center">
        <span>© ツムツム完売マスター</span>
        <span className="ml-auto flex gap-3 items-center flex-wrap">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-bold transition-transform hover:-translate-y-0.5"
            style={{
              background: "var(--tt-gold)",
              color: "var(--tt-gold-text)",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
            }}
          >
            📮 意見箱
          </Link>
          <Link href="/about" className="hover:underline" style={{ color: "var(--tt-text)" }}>サイトについて</Link>
          <Link href="/privacy" className="hover:underline" style={{ color: "var(--tt-text)" }}>プライバシー</Link>
          <Link href="/terms" className="hover:underline" style={{ color: "var(--tt-text)" }}>利用規約</Link>
        </span>
      </div>
      <div className="mx-auto max-w-3xl px-4 mt-2 leading-relaxed">
        本サイトは個人運営の非公式ツールです。LINE Disney
        ツムツムおよび関連する商標・コンテンツの権利は各権利者に帰属します。
      </div>
    </footer>
  );
}
