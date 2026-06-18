"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BackToHome() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      aria-label="ホームに戻る"
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner"
      style={{
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
      }}
    >
      <span aria-hidden>←</span>
      <span>戻る</span>
    </Link>
  );
}
