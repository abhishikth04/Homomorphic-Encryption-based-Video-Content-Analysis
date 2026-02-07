import { useState } from "react";
import { motion } from "framer-motion";

export default function Performance() {
  const [mode, setMode] = useState("quantum");

  const metrics = {
    classical: {
      separability: 0.65,
      stability: 0.62,
      noise: 0.58,
      scalability: 0.60,
    },
    quantum: {
      separability: 0.82,
      stability: 0.79,
      noise: 0.76,
      scalability: 0.74,
    },
  };

  const classical = metrics.classical;
  const quantum = metrics.quantum;

  const sections = [
    {
      title: "Feature-Space Behavior",
      description:
        "How effectively the encrypted feature space separates and preserves semantic information.",
      items: [
        {
          key: "separability",
          label: "Similarity Separability",
          explanation:
            "Ability of the feature space to distinguish unique and duplicate videos under encryption.",
        },
        {
          key: "noise",
          label: "Noise Resilience",
          explanation:
            "Robustness against approximation noise introduced by CKKS encryption.",
        },
      ],
    },
    {
      title: "Decision Reliability",
      description:
        "Stability and consistency of similarity decisions across encrypted comparisons.",
      items: [
        {
          key: "stability",
          label: "Decision Stability",
          explanation:
            "Consistency of similarity outcomes across repeated encrypted evaluations.",
        },
      ],
    },
    {
      title: "System Adaptability",
      description:
        "Behavior of the system as the encrypted reference database grows.",
      items: [
        {
          key: "scalability",
          label: "Scalability Readiness",
          explanation:
            "Ability to maintain decision quality as reference fingerprints increase.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-10 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">System Performance Characteristics</h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          High-level characterization of encrypted similarity behavior under
          classical and quantum-inspired feature spaces.
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

      {/* Sections */}
      <div className="space-y-14">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              {section.description}
            </p>

            <div className="space-y-6">
              {section.items.map((item) => {
                const cVal = classical[item.key];
                const qVal = quantum[item.key];
                const activeVal = mode === "quantum" ? qVal : cVal;
                const delta = ((qVal - cVal) * 100).toFixed(0);

                return (
                  <div
                    key={item.key}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{item.label}</h3>
                      <span className="text-sm text-slate-300">
                        {(activeVal * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          mode === "quantum"
                            ? "bg-purple-400"
                            : "bg-blue-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${activeVal * 100}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>

                    {/* Delta */}
                    <div className="mt-2 text-xs text-slate-400">
                      Quantum improvement:{" "}
                      <span className="text-purple-400 font-medium">
                        +{delta}%
                      </span>
                    </div>

                    {/* Explanation */}
                    <p className="text-xs text-slate-400 mt-3 max-w-3xl">
                      {item.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Confidence Spectrum */}
      <div className="mt-16 bg-black/40 border border-white/10 rounded-2xl p-8">
        <h2 className="text-lg font-semibold mb-4">
          Decision Confidence Spectrum
        </h2>

        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-green-500/20" />
          <div className="absolute left-1/3 top-0 h-full w-1/3 bg-yellow-500/20" />
          <div className="absolute left-2/3 top-0 h-full w-1/3 bg-red-500/20" />

          <div
            className={`absolute top-0 h-full w-[3px] ${
              mode === "quantum" ? "bg-purple-400" : "bg-blue-400"
            }`}
            style={{
              left: mode === "quantum" ? "75%" : "55%",
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>Low Confidence</span>
          <span>Moderate</span>
          <span>High Confidence</span>
        </div>

        <p className="text-sm text-slate-400 mt-4 max-w-3xl">
          The indicator shows the typical operating region of similarity
          decisions. Quantum-inspired mapping shifts decisions toward higher
          confidence by improving feature separability prior to encryption.
        </p>
      </div>
    </div>
  );
}
