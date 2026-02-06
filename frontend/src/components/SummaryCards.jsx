export default function SummaryCards({ data }) {
  if (!data) return null;

  const {
    totalVideos = 0,
    uniqueVideos = 0,
    duplicateVideos = 0,
  } = data;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Videos"
        value={totalVideos}
        subtitle="Encrypted reference fingerprints"
        accent="blue"
      />

      <StatCard
        title="Unique Videos"
        value={uniqueVideos}
        subtitle="Original content detected"
        accent="green"
      />

      <StatCard
        title="Duplicate Videos"
        value={duplicateVideos}
        subtitle="Similarity matches found"
        accent="red"
      />
    </section>
  );
}

function StatCard({ title, value, subtitle, accent }) {
  const accentMap = {
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]",
    },
    green: {
      text: "text-green-400",
      bg: "bg-green-500/10",
      glow: "hover:shadow-[0_0_40px_rgba(34,197,94,0.25)]",
    },
    red: {
      text: "text-red-400",
      bg: "bg-red-500/10",
      glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.25)]",
    },
  };

  const style = accentMap[accent];

  return (
    <div
      className={`relative rounded-2xl border border-white/10
                  backdrop-blur-md p-6
                  transition-all duration-300
                  hover:-translate-y-1
                  ${style.bg} ${style.glow}`}
    >
      {/* Title */}
      <p className="text-sm text-slate-400 mb-1">
        {title}
      </p>

      {/* Main Value */}
      <h2 className={`text-4xl font-bold ${style.text}`}>
        {value}
      </h2>

      {/* Subtitle */}
      <p className="text-xs text-slate-400 mt-2">
        {subtitle}
      </p>
    </div>
  );
}
