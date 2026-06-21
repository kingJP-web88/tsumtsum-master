import PageHeading from "@/components/PageHeading";

export const metadata = {
  title: "プライバシーポリシー",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-sm max-w-none text-neutral-800 leading-relaxed space-y-4">
      <PageHeading>プライバシーポリシー</PageHeading>

      <h2 className="font-semibold mt-4">1. 収集する情報</h2>
      <p>
        本サイトでは、ユーザーが入力した所持ツム・スキルレベル情報をお使いのブラウザの
        localStorageに保存します。これらの情報は当サイトのサーバーには一切送信されません。
      </p>

      <h2 className="font-semibold mt-4">2. アクセス解析</h2>
      <p>
        本サイトはサイト改善のため、Google Analytics 等のアクセス解析ツールを利用する場合があります。
        これらのツールはCookieを使用しますが、個人を特定する情報は収集しません。
        Cookieの使用はブラウザの設定で無効化できます。
      </p>

      <h2 className="font-semibold mt-4">3. 広告について</h2>
      <p>
        本サイトはGoogle AdSense等の第三者配信の広告サービスを利用することがあります。
        広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
        Cookieを無効にする方法やGoogle AdSenseに関する詳細は
        <a href="https://policies.google.com/technologies/ads" className="text-sky-600 underline" target="_blank" rel="noopener noreferrer">
          Googleの広告ポリシー
        </a>
        をご確認ください。
      </p>

      <h2 className="font-semibold mt-4">4. お問い合わせ</h2>
      <p>本ポリシーに関するお問い合わせは、サイトについてのページからご連絡ください。</p>

      <p className="text-xs text-neutral-500 mt-6">最終更新日: 2026年6月</p>
    </article>
  );
}
