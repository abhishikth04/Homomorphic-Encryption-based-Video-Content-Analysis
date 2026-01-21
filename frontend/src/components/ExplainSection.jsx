export default function ExplainSection({ heading, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/40
                        backdrop-blur-md p-6 space-y-4
                        shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      
      <h2 className="text-xl font-semibold text-blue-400">
        {heading}
      </h2>

      <div className="text-slate-300 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}
