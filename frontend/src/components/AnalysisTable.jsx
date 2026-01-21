export default function AnalysisTable({ data = [] }) {
  return (
    <section
      className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md
                 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
    >
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">
          Recent Video Analysis
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-slate-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-4">Video Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Similarity</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const isNumber =
                typeof row.score === "number" && !isNaN(row.score);

              return (
                <tr
                  key={row.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 text-slate-200">
                    {row.name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          row.status === "Unique"
                            ? "bg-green-500/15 text-green-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {isNumber ? row.score.toFixed(2) : "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {row.date}
                  </td>

                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 transition text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
