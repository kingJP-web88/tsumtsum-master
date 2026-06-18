import BackToHome from "./BackToHome";

export default function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <BackToHome />
      <h1 className="text-xl font-bold" style={{ color: "var(--tt-text)" }}>
        {children}
      </h1>
    </div>
  );
}
