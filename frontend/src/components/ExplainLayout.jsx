export default function ExplainLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-10 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        <h1 className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>

        <div className="space-y-8">
          {children}
        </div>

      </div>
    </div>
  );
}
