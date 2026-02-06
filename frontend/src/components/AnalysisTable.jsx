export default function AnalysisTable({ data = [] }) {
  return (
    <section
      className="rounded-2xl border border-white/10
                 bg-black/40 backdrop-blur-md
                 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">
          Recent Video Analysis Log
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Secure similarity decisions performed on encrypted fingerprints
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="px-6 py-10 text-center text-slate-400 text-sm">
          No analysis records available yet.
        </div>
      )}

      {/* Table */}
      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left w-[5%]">#</th>
                <th className="px-6 py-4 text-left w-[30%]">Video Name</th>
                <th className="px-6 py-4 text-center w-[20%]">Decision</th>
                <th className="px-6 py-4 text-center w-[25%]">Confidence</th>
                <th className="px-6 py-4 text-center w-[20%]">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => {
                const isDuplicate = row.status === "Similar";
                const score =
                  typeof row.score === "number" ? row.score : null;

                const confidenceLabel =
                  score !== null
                    ? score > 0.95
                      ? "High"
                      : "Moderate"
                    : null;

                return (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* Index */}
                    <td className="px-6 py-4 text-slate-500">
                      {index + 1}
                    </td>

                    {/* Video Name */}
                    <td className="px-6 py-4 text-slate-200 font-medium truncate">
                      {row.name}
                    </td>

                    {/* Decision */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                            ${
                              isDuplicate
                                ? "bg-red-500/15 text-red-400"
                                : "bg-green-500/15 text-green-400"
                            }`}
                        >
                          {isDuplicate
                            ? "Flagged as Duplicate"
                            : "Accepted as Unique"}
                        </span>

                        <span
                          className={`text-[11px] font-medium
                            ${
                              row.mode === "quantum"
                                ? "text-purple-400"
                                : "text-blue-400"
                            }`}
                        >
                          {row.mode === "quantum"
                            ? "Quantum-Inspired"
                            : "Classical"}
                        </span>
                      </div>
                    </td>

                    {/* Confidence */}
                    <td className="px-6 py-4 text-center">
                      {score !== null ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs text-slate-300">
                            {(score * 100).toFixed(2)}% ({confidenceLabel})
                          </span>

                          <div className="w-28 h-1.5 rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full transition-all
                                ${
                                  isDuplicate
                                    ? "bg-red-400"
                                    : "bg-green-400"
                                }`}
                              style={{
                                width: `${Math.min(score * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">–</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-center text-slate-400 text-xs">
                      {row.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
