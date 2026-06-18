"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    href: "/happiness",
    label: "ハピネスBOX",
    color: "var(--tt-box-happiness)",
    soft: "var(--tt-box-happiness-soft)",
  },
  {
    href: "/premium",
    label: "プレミアムBOX",
    color: "var(--tt-box-premium)",
    soft: "var(--tt-box-premium-soft)",
  },
  {
    href: "/premium-plus",
    label: "プレミアムBOX＋",
    color: "var(--tt-box-premium-plus)",
    soft: "var(--tt-box-premium-plus-soft)",
  },
  {
    href: "/efficiency",
    label: "効率計算",
    color: "var(--tt-gold)",
    soft: "#FFF1CC",
  },
];

const logoSegments = [
  { c: "ツ", color: "#FF2D8A" },
  { c: "ム", color: "#FFB400" },
  { c: "ツ", color: "#2BB673" },
  { c: "ム", color: "#4FB6E6" },
  { c: "完売", color: "#E63946" },
  { c: "マスター", color: "#003B6F" },
];

const logoStyle: React.CSSProperties = {
  fontFamily: "var(--font-rounded), var(--font-sans)",
  textShadow: [
    "-1.5px -1.5px 0 #fff",
    "1.5px -1.5px 0 #fff",
    "-1.5px 1.5px 0 #fff",
    "1.5px 1.5px 0 #fff",
    "0 3px 0 rgba(0,0,0,0.12)",
  ].join(","),
  letterSpacing: "-0.01em",
};

function linkStyle(active: boolean, color: string, soft: string): React.CSSProperties {
  return active
    ? {
        background: `linear-gradient(180deg, ${color} 0%, ${color} 60%, rgba(0,0,0,0.08) 100%), ${color}`,
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.45)",
          "inset 0 -2px 0 rgba(0,0,0,0.15)",
          "0 2px 0 rgba(0,0,0,0.12)",
          "0 4px 10px rgba(0,0,0,0.12)",
        ].join(","),
      }
    : {
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color,
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.7)",
          "inset 0 -1px 0 rgba(0,0,0,0.04)",
          "0 1px 0 rgba(0,0,0,0.05)",
          "0 3px 8px rgba(0,0,0,0.08)",
        ].join(","),
      };
  void soft;
}

function linkDot(active: boolean, color: string, soft: string): React.CSSProperties {
  return {
    backgroundColor: active ? "#fff" : color,
    boxShadow: active
      ? "0 0 0 2px rgba(255,255,255,0.35)"
      : `0 0 0 2px ${soft}`,
  };
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const headerStyle: React.CSSProperties = {
    background:
      "linear-gradient(90deg, #FFD5E5 0%, #FFE9C2 25%, #FFF6B3 50%, #C7F0DA 75%, #C5E8F8 100%)",
    boxShadow: "0 8px 14px -10px rgba(60, 60, 100, 0.30)",
  };

  const burgerStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    color: "var(--tt-text)",
    border: "1px solid rgba(255,255,255,0.85)",
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,0.7)",
      "inset 0 -1px 0 rgba(0,0,0,0.04)",
      "0 1px 0 rgba(0,0,0,0.05)",
      "0 3px 8px rgba(0,0,0,0.08)",
    ].join(","),
  };

  return (
    <header className="sticky top-0 z-10 relative" style={headerStyle}>
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3 flex-wrap">
        <Link
          href="/"
          className="font-black text-2xl sm:text-3xl inline-flex items-baseline shrink-0"
          style={logoStyle}
        >
          {logoSegments.map((s, i) => (
            <span key={i} style={{ color: s.color }}>
              {s.c}
            </span>
          ))}
        </Link>

        {/* デスクトップ: 横並びナビ */}
        <nav className="hidden sm:flex gap-2 text-sm ml-auto flex-wrap">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner"
                style={linkStyle(active, l.color, l.soft)}
              >
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={linkDot(active, l.color, l.soft)}
                />
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* モバイル: ハンバーガーボタン */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="sm:hidden ml-auto inline-flex items-center justify-center h-10 w-10 rounded-full transition-transform active:scale-95"
          style={burgerStyle}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* モバイル: ドロップダウンメニュー */}
      {open && (
        <nav
          id="mobile-nav"
          className="sm:hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.6)" }}
        >
          <ul className="mx-auto max-w-3xl px-4 py-3 flex flex-col gap-2 text-sm">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold w-full"
                    style={linkStyle(active, l.color, l.soft)}
                  >
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-full"
                      style={linkDot(active, l.color, l.soft)}
                    />
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div
        aria-hidden
        className="h-[4px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #FF2D8A 0%, #FFB400 25%, #2BB673 50%, #4FB6E6 75%, #E63946 100%)",
        }}
      />
    </header>
  );
}
