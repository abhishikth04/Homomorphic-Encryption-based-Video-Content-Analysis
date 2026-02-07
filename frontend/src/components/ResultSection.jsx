import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResultSection({
  result,
  sectionRef,
  onReset,
  resetting,
}) {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);

  if (!result && !resetting) return null;

  const isUnique = result?.status?.toLowerCase() === "unique";
  const score = result?.score;
  const matched = result?.matched;
  const mode = result?.mode || "quantum";

  // UI-only threshold (backend decides real one)
  const threshold = 0.9;

  // Confidence explanation (UI logic only)
  let confidence = "Medium";
  if (score !== null) {
    if (!isUnique && score > threshold + 0.05) confidence = "High";
    else if (isUnique && score < threshold - 0.15) confidence = "High";
    else if (Math.abs(score - threshold) < 0.05) confidence = "Low";
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{
          opacity: resetting ? 0 : 1,
          y: resetting ? 40 : 0,
          scale: resetting ? 0.95 : 1,
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className={`rounded-2xl p-12 max-w-3xl w-full
          border backdrop-blur-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          ${
            isUnique
              ? "border-green-400/30 bg-green-500/10"
              : "border-red-400/30 bg-red-500/10"
          }`}
      >
        {/* =======================
            FINAL DECISION
        ======================= */}
        <h2
          className={`text-4xl font-bold mb-4 text-center ${
            isUnique ? "text-green-400" : "text-red-400"
          }`}
        >
          {isUnique ? "Unique Video Detected" : "Duplicate Video Detected"}
        </h2>

        <p className="text-center text-sm text-gray-400 mb-8">
          Analysis Mode:{" "}
          <span className="font-medium text-white">
            {mode === "quantum" ? "Quantum-Inspired" : "Classical"}
          </span>
        </p>

        {/* =======================
            METRICS
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Metric label="Decision" value={isUnique ? "Unique" : "Duplicate"} />
          <Metric label="Confidence" value={confidence} />
          <Metric
            label="Similarity Score"
            value={score !== null ? score.toFixed(4) : "—"}
          />
        </div>

        {/* =======================
            VIEW STATISTICS TOGGLE
        ======================= */}
        {!isUnique && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-6 py-2 rounded-xl border border-white/20
                         text-slate-200 hover:bg-white/10 transition font-medium"
            >
              {showStats ? "Hide Match Statistics" : "View Match Statistics"}
            </button>
          </div>
        )}

        {/* =======================
            MATCH STATISTICS PANEL
        ======================= */}
        {showStats && !isUnique && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-black/40 border border-white/10 p-6 mb-8"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">
              Encrypted Match Insights
            </h3>

            {/* Matched Video */}
            <p className="text-sm text-slate-300 mb-4">
              Matched Reference Video:
              <span className="block text-white font-medium mt-1">
                {matched}
              </span>
            </p>

            {/* Similarity Bar */}
            <div className="mb-4">
              <p className="text-xs text-slate-400 mb-2">
                Similarity Score vs Decision Threshold
              </p>

              <div className="relative h-3 rounded-full bg-white/10">
                <div
                  className="absolute h-full bg-red-400 rounded-full"
                  style={{ width: `${Math.min(score * 100, 100)}%` }}
                />

                {/* Threshold Marker */}
                <div
                  className="absolute top-0 h-full w-[2px] bg-yellow-400"
                  style={{ left: `${threshold * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>0.0</span>
                <span>Threshold</span>
                <span>1.0</span>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-sm text-slate-400 leading-relaxed">
              The uploaded video exceeds the similarity threshold when compared
              against encrypted reference fingerprints. The system therefore
              flags it as a duplicate without decrypting any stored data.
            </p>
          </motion.div>
        )}

        {/* =======================
            ACTIONS
        ======================= */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onReset}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Upload Another Video
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 rounded-xl border border-white/20 text-slate-200
                       hover:bg-white/10 hover:border-white/30 transition font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* -----------------------
   Small Metric Card
----------------------- */
function Metric({ label, value }) {
  return (
    <div className="rounded-xl bg-black/40 border border-white/10 p-4 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
