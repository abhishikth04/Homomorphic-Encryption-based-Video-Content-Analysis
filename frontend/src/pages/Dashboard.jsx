import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashNavbar from "../components/DashNavbar";
import SummaryCards from "../components/SummaryCards";
import AnalysisTable from "../components/AnalysisTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("quantum");

  const [summary, setSummary] = useState({
    totalVideos: 0,
    uniqueVideos: 0,
    duplicateVideos: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/summary?mode=${mode}`)
      .then(res => res.json())
      .then(data => {
        setSummary({
          totalVideos: data.totalVideos ?? 0,
          uniqueVideos: data.uniqueVideos ?? 0,
          duplicateVideos: data.duplicateVideos ?? 0,
        });
      })
      .catch(err => console.error("Summary fetch failed", err));

    fetch(`http://localhost:5000/dashboard/recent?mode=${mode}`)
      .then(res => res.json())
      .then(data => setRecent(data))
      .catch(err => console.error("Recent fetch failed", err));
  }, [mode]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <DashNavbar />

      {/* MODE INDICATOR */}
      <div className="px-10 pt-6">
        <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Active Analysis Space</p>
            <p
              className={`text-sm font-semibold mt-1 ${
                mode === "quantum"
                  ? "text-purple-400"
                  : "text-blue-400"
              }`}
            >
              {mode === "quantum"
                ? "Quantum-Inspired Encrypted Similarity Space"
                : "Classical Encrypted Feature Space"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("classical")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  mode === "classical"
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
            >
              Classical
            </button>

            <button
              onClick={() => setMode("quantum")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  mode === "quantum"
                    ? "bg-purple-700 text-white shadow"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
            >
              Quantum-Inspired
            </button>
          </div>
        </div>
      </div>

      <main className="px-10 py-8 space-y-14">

        {/* SUMMARY */}
        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            System Snapshot
          </h2>
          <SummaryCards data={summary} />
        </section>

        {/* ANALYSIS LOG */}
        <section>
          <AnalysisTable data={recent} />
        </section>

        {/* EXPLORATION CARDS */}
        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">
            Explore the System
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Analysis */}
            <div
              onClick={() => navigate("/analysis")}
              className="cursor-pointer rounded-2xl border border-white/10
                         bg-black/40 backdrop-blur-md p-6
                         hover:bg-white/5 hover:scale-[1.02]
                         transition shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <h3 className="text-base font-semibold text-blue-400 mb-2">
                Encrypted Decision Analysis
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Visualize how encrypted fingerprints are compared,
                how thresholds adapt, and how decisions are formed
                without decryption.
              </p>
            </div>

            {/* Performance */}
            <div
              onClick={() => navigate("/performance")}
              className="cursor-pointer rounded-2xl border border-white/10
                         bg-black/40 backdrop-blur-md p-6
                         hover:bg-white/5 hover:scale-[1.02]
                         transition shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              <h3 className="text-base font-semibold text-purple-400 mb-2">
                System Performance Metrics
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Inspect similarity distributions, adaptive thresholds,
                and compare classical vs quantum-inspired behavior.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
