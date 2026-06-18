"use client";

import { useEffect, useRef } from "react";

type Props = {
  label?: string;
  slot?: string;
  className?: string;
  format?: string;
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

export default function AdSlot({
  label = "広告枠",
  slot,
  className = "",
  format = "auto",
}: Props) {
  const inited = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || inited.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      inited.current = true;
    } catch {
      // noop
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) {
    return (
      <div
        className={`my-4 rounded-2xl bg-white/70 text-sm text-center py-6 ${className}`}
        style={{ color: "var(--tt-text-mute)" }}
        aria-label={label}
      >
        {label}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block my-4 ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      aria-label={label}
    />
  );
}
