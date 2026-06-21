import AdSlot from "@/components/AdSlot";
import PageHeading from "@/components/PageHeading";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata = {
  title: "意見箱",
  description:
    "ツムツム完売マスターへの意見・要望・バグ報告は X (旧Twitter) でお寄せください。",
  alternates: { canonical: "/feedback" },
  robots: { index: false, follow: true },
};

export default function FeedbackPage() {
  return (
    <div className="space-y-4">
      <PageHeading>意見箱</PageHeading>

      <AdSlot label="広告枠（記事中）" />

      <FeedbackForm />

      <AdSlot label="広告枠（下部）" />
    </div>
  );
}
