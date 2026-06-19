const X_HANDLE = "engine_buun";
const X_URL = `https://x.com/${X_HANDLE}`;
const X_INTENT_URL = `https://x.com/intent/tweet?text=${encodeURIComponent(`@${X_HANDLE} 【ツムツム完売マスター】\n`)}`;

export default function FeedbackForm() {
  return (
    <section
      className="rounded-2xl bg-white p-5 space-y-4"
      style={{ color: "var(--tt-text)" }}
    >
      <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--tt-text)" }}>
        ご意見・ご要望・バグ報告などありましたら、X (旧 Twitter) からお気軽にお寄せください。
      </p>

      <div className="space-y-3">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center rounded-full px-4 py-3 text-base font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "#000000",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.20)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.18)",
              "0 2px 0 rgba(0,0,0,0.20)",
              "0 4px 10px rgba(0,0,0,0.18)",
            ].join(","),
          }}
        >
          𝕏 @{X_HANDLE} を開く (DMはこちらから)
        </a>

        <a
          href={X_INTENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "rgba(0,0,0,0.04)",
            color: "var(--tt-text)",
            border: "1px solid var(--tt-divider)",
          }}
        >
          ポスト (ツイート) で送る場合はこちら
        </a>
      </div>

      <details className="rounded-xl" style={{ background: "var(--tt-row-mute)" }}>
        <summary
          className="cursor-pointer text-sm font-semibold px-3 py-2 select-none"
          style={{ color: "var(--tt-text)" }}
        >
          📨 DMの送り方
        </summary>
        <ol
          className="px-5 py-3 text-sm space-y-1.5 list-decimal leading-relaxed font-medium"
          style={{ color: "var(--tt-text-sub)" }}
        >
          <li>「𝕏 @{X_HANDLE} を開く」をタップ</li>
          <li>X のプロフィール画面が開きます</li>
          <li>右上の封筒アイコン (DMボタン) からメッセージを送信</li>
        </ol>
        <p
          className="px-5 pb-3 text-xs font-medium leading-relaxed"
          style={{ color: "var(--tt-text-mute)" }}
        >
          ※ DMが開放されているアカウントなので、フォローしていなくても送信できます。<br />
          ※ DM が使えない場合は、ポストに <strong>@{X_HANDLE}</strong> を付けてご投稿ください。
        </p>
      </details>
    </section>
  );
}
