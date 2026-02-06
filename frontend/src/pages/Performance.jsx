import { motion } from "framer-motion";
import { useState } from "react";

export default function Performance() {
  const [mode, setMode] = useState("quantum");

  const metrics = {
    classical: [
      {
        title: "Similarity Separability",
        value: 0.65,
        description:
          "Moderate separation between unique and duplicate videos in the encrypted similarity space.",
      },
      {
        title: "Decision Stability",
        value: 0.62,
        description:
          "Similarity decisions remain stable under encrypted computation but are sensitive to overlap.",
      },
      {
        title: "Noise Resilience",
        value: 0.58,
        description:
          "Limited tolerance to homomorphic approximation noise in compact feature space.",
      },
      {
        title: "Scalability Readiness",
        value: 0.60,
        description:
          "Decision confidence gradually degrades as the encrypted reference database grows.",
      },
    ],
    quantum: [
      {
        title: "Similarity Separability",
        value: 0.82,
        description:
          "Enhanced separation due to nonlinear quantum-inspired feature expansion.",
      },
      {
        title: "Decision Stability",
        value: 0.79,
        description:
          "More consistent encrypted similarity decisions with reduced ambiguity.",
      },
      {
        title: "Noise Resilience",
        value: 0.76,
        description:
          "Higher robustness against CKKS approximation noise after feature mapping.",
      },
      {
        title: "Scalability Readiness",
        value: 0.74,
        description:
          "Improved adaptability to increasing encrypted reference size.",
      },
    ],
  };

  const data = metrics[mode];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-10 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">System Performance Metrics</h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Visual interpretation of system behavior under encrypted similarity
          computation in classical and quantum-inspired feature spaces.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-12">
        {["classical", "quantum"].map((m) => (
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
            {m === "quantum" ? "Quantum-Inspired Mode" : "Classical Mode"}
          </button>
        ))}
      </div>

      {/* Feature Separability Visualization */}
      <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-14">
        <h2 className="text-lg font-semibold mb-2">
          Feature Separability Visualization
        </h2>
        <p className="text-xs text-slate-400 mb-6 max-w-2xl">
          Conceptual visualization of how video fingerprints distribute in the
          similarity space. Quantum-inspired mapping increases separability
          before encryption.
        </p>

        <div className="relative h-64 rounded-xl bg-black/60 border border-white/10 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0 ? "bg-red-400" : "bg-green-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                left:
                  mode === "quantum"
                    ? `${20 + Math.random() * 60}%`
                    : `${35 + Math.random() * 30}%`,
                top:
                  mode === "quantum"
                    ? `${20 + Math.random() * 60}%`
                    : `${35 + Math.random() * 30}%`,
              }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </div>

        <div className="flex justify-between text-xs text-slate-400 mt-3">
          <span>Overlapping Region</span>
          <span>Separated Region</span>
        </div>
      </div>

      {/* Metric Bars */}
      <div className="space-y-8">
        {data.map((metric, idx) => (
          <div
            key={idx}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{metric.title}</h3>
              <span className="text-sm text-slate-300">
                {(metric.value * 100).toFixed(0)}%
              </span>
            </div>

            <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={`h-full ${
                  mode === "quantum"
                    ? "bg-purple-400"
                    : "bg-blue-400"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${metric.value * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Lower</span>
              <span>Higher</span>
            </div>

            <p className="text-xs text-slate-400 mt-3 max-w-3xl">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
