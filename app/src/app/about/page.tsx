import PageHeading from "@/components/PageHeading";

export const metadata = {
  title: "サイトについて",
  alternates: { canonical: "/about" },
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <article className="text-sm text-neutral-800 leading-relaxed space-y-4">
      <PageHeading>サイトについて</PageHeading>

      <p>
        「ツムツム完売マスター」は、LINE Disney
        ツムツムのハピネスBOX、プレミアムBOX、プレミアムBOX＋について、
        各BOXの完売（全ツムスキルMAX）までの進捗を管理するための非公式ツールです。
      </p>

      <section>
        <h2 className="font-semibold mt-4">特徴</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>所持ツムとスキルレベルを入力するだけで完売進捗を可視化</li>
          <li>データはブラウザのlocalStorageに保存され、外部送信なし</li>
          <li>登録不要・無料で利用可能</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mt-4">お問い合わせ</h2>
        <p>
          不具合の報告・データ追加要望などはお問い合わせフォームを準備中です。
          しばらくはGitHub Issues等の代替手段からご連絡ください。
        </p>
      </section>
    </article>
  );
}
