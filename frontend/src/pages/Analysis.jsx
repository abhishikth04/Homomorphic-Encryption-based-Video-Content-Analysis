import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Analysis() {
  const [mode, setMode] = useState("quantum");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/dashboard/summary?mode=${mode}`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(() => setSummary(null));
  }, [mode]);

  const config = {
    classical: {
      dimension: 512,
      threshold: 0.92,
      color: "blue",
      explanation:
        "Classical deep fingerprints operate in a compact linear feature space, which may cause semantically similar videos to cluster closer together.",
    },
    quantum: {
      dimension: 1024,
      threshold: 0.95,
      color: "purple",
      explanation:
        "Quantum-inspired nonlinear mapping expands the feature space, improving separability under encrypted similarity computation.",
    },
  };

  const avgSimilarity =
    summary && summary.totalVideos > 0
      ? summary.avgSimilarity ?? 0.0
      : 0.0;

  const data = config[mode];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-10 py-10">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Encrypted Decision Analysis
        </h1>
        <p className="text-slate-400 mt-2 max-w-3xl">
          This page explains how similarity decisions are formed inside the
          encrypted analysis pipeline.
        </p>
      </div>

      {/* ================= MODE TOGGLE ================= */}
      <div className="flex gap-4 mb-12">
        {["classical", "quantum"].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-6 py-2 rounded-xl font-medium transition
              ${
                mode === m
                  ? m === "quantum"
                    ? "bg-purple-600 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
          >
            {m === "quantum"
              ? "Quantum-Inspired Space"
              : "Classical Space"}
          </button>
        ))}
      </div>

      {/* ================= METRICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
        <Metric title="Feature Dimension" value={`${data.dimension}-D`} />
        <Metric title="Decision Threshold" value={data.threshold} />
        <Metric
          title="Average Similarity"
          value={(avgSimilarity * 100).toFixed(2) + "%"}
        />
        <Metric
          title="Encrypted Records"
          value={summary ? summary.totalVideos : "—"}
        />
      </div>

      {/* ================= SIMILARITY BAR ================= */}
      <div className="bg-black/40 rounded-2xl p-8 border border-white/10 mb-14">
        <h2 className="text-lg font-semibold mb-4">
          Observed Similarity Distribution
        </h2>

        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
          {/* Average Similarity */}
          <motion.div
            className={`h-full ${
              mode === "quantum"
                ? "bg-purple-400"
                : "bg-blue-400"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(avgSimilarity * 100, 100)}%` }}
            transition={{ duration: 0.8 }}
          />

          {/* Threshold Marker */}
          <div
            className="absolute top-0 h-full w-[2px] bg-yellow-400"
            style={{ left: `${data.threshold * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>0.0</span>
          <span>Threshold ({data.threshold})</span>
          <span>1.0</span>
        </div>

        <p className="text-sm text-slate-400 mt-4 max-w-3xl">
          The bar shows the average encrypted similarity observed across recent
          analyses. Videos exceeding the threshold are flagged as duplicates.
        </p>
      </div>

      {/* ================= EXPLANATION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard
          title="How to Interpret This"
          text="Average similarity reflects the typical closeness between query videos and stored encrypted references. It is an aggregate metric, not a prediction."
        />
        <InfoCard
          title="Why Modes Behave Differently"
          text={data.explanation}
        />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ title, value }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-xl font-semibold mt-2">{value}</h3>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-slate-400 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
