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

      {/* ============================
          SYSTEM STATE HEADER
      ============================ */}
      <div className="px-10 pt-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Mode Description */}
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Active Similarity Space
            </p>
            <p
              className={`text-sm font-semibold mt-1 ${
                mode === "quantum"
                  ? "text-purple-400"
                  : "text-blue-400"
              }`}
            >
              {mode === "quantum"
                ? "Quantum-Inspired Encrypted Feature Space"
                : "Classical Deep Feature Space"}
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              All similarity decisions, statistics, and logs below are derived
              from this analysis space.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setMode("classical")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  mode === "classical"
                    ? "bg-blue-600 text-white"
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
                    ? "bg-purple-700 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
            >
              Quantum-Inspired
            </button>
          </div>
        </div>
      </div>

      {/* ============================
          MAIN CONTENT
      ============================ */}
      <main className="px-10 py-10 space-y-14">

        {/* SYSTEM OVERVIEW */}
        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-1">
            System Overview
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Aggregate statistics derived from encrypted similarity decisions.
          </p>
          <SummaryCards data={summary} />
        </section>

        {/* RECENT ANALYSIS LOG */}
        <section>
          <h2 className="text-lg font-semibold text-slate-200 mb-1">
            Encrypted Analysis Log
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Most recent video comparisons performed by the system.
          </p>
          <AnalysisTable data={recent} />
        </section>

        {/* NAVIGATION ACTIONS */}
        <section className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/analysis")}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Explore Encrypted Decision Analysis
          </button>

          <button
            onClick={() => navigate("/performance")}
            className="px-6 py-3 rounded-xl border border-white/20 text-slate-200
                       hover:bg-white/10 hover:border-white/30 transition font-medium"
          >
            View System Performance Metrics
          </button>
        </section>
      </main>
    </div>
  );
}
