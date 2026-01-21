export default function SummaryCards({ data }) {
  if (!data) return null;

  const {
    totalVideos = 0,
    uniqueVideos = 0,
    duplicateVideos = 0,
    avgSimilarity = 0,
  } = data;

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <Card title="Total Videos" value={totalVideos} />
      <Card title="Unique Videos" value={uniqueVideos} color="green" />
      <Card title="Duplicate Videos" value={duplicateVideos} color="red" />
      <Card
        title="Avg Similarity"
        value={`${Number(avgSimilarity).toFixed(2)}`}
      />

    </section>
  );
}

function Card({ title, value, color }) {
  const colorMap = {
    green: "text-green-400 bg-green-500/10",
    red: "text-red-400 bg-red-500/10",
  };

  return (
    <div
      className={`rounded-2xl border border-white/10
                  bg-black/40 backdrop-blur-md
                  p-6 shadow-[0_20px_40px_rgba(0,0,0,0.45)]
                  ${color ? colorMap[color] : "text-white"}`}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
