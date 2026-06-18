import PageHeading from "@/components/PageHeading";

export const metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <article className="text-sm text-neutral-800 leading-relaxed space-y-4">
      <PageHeading>利用規約</PageHeading>

      <section>
        <h2 className="font-semibold mt-4">第1条（適用）</h2>
        <p>
          本規約は、本サイト「ツムツム完売マスター」（以下「当サイト」）の利用に関する条件を定めるものです。
        </p>
      </section>

      <section>
        <h2 className="font-semibold mt-4">第2条（提供する内容）</h2>
        <p>
          当サイトは、LINE Disney ツムツムのBOX完売進捗を管理する非公式ツールです。
          掲載情報の正確性・完全性については保証しません。
        </p>
      </section>

      <section>
        <h2 className="font-semibold mt-4">第3条（免責事項）</h2>
        <p>
          当サイトの利用により生じたいかなる損害についても、運営者は責任を負いません。
          ゲーム内の挙動・コイン消費・確率等についても保証しません。
        </p>
      </section>

      <section>
        <h2 className="font-semibold mt-4">第4条（権利関係）</h2>
        <p>
          「LINE: ディズニー ツムツム」および関連する商標・キャラクター等の権利は、
          LINE株式会社、ザ・ウォルト・ディズニー・カンパニーおよび各権利者に帰属します。
          当サイトはこれらの権利者とは一切関係のない非公式の個人運営サイトです。
        </p>
      </section>

      <section>
        <h2 className="font-semibold mt-4">第5条（規約の変更）</h2>
        <p>
          運営者は予告なく本規約を変更することができるものとします。
        </p>
      </section>

      <p className="text-xs text-neutral-500 mt-6">最終更新日: 2026年6月</p>
    </article>
  );
}
