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
  const threshold = 0.9; // UI-only reference
  const mode = result?.mode || "quantum";

  /* ----------------------------
     Confidence Estimation (UI)
  ---------------------------- */
  let confidence = "Medium";
  if (score !== null) {
    if (isUnique && score < threshold - 0.15) confidence = "High";
    else if (!isUnique && score > threshold + 0.05) confidence = "High";
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
        className={`rounded-2xl p-12 max-w-2xl w-full
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
            DECISION METRICS
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Metric label="Decision" value={isUnique ? "Unique" : "Duplicate"} />
          <Metric label="Confidence" value={confidence} />
          <Metric
            label="Similarity Score"
            value={score !== null ? score.toFixed(4) : "—"}
          />
        </div>

        {/* =======================
            SIMILARITY BAR
        ======================= */}
        {score !== null && (
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-2">
              Similarity vs Adaptive Threshold
            </p>

            <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`absolute h-full ${
                  isUnique ? "bg-green-400" : "bg-red-400"
                }`}
                style={{ width: `${Math.min(score * 100, 100)}%` }}
              />

              {/* Threshold Marker */}
              <div
                className="absolute top-0 h-full w-[2px] bg-yellow-400"
                style={{ left: `${threshold * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0.0</span>
              <span>Threshold ({threshold})</span>
              <span>1.0</span>
            </div>
          </div>
        )}

        {/* =======================
            EXPLANATION
        ======================= */}
        <div className="text-sm text-gray-300 mb-8 leading-relaxed">
          {mode === "quantum" ? (
            <p>
              Quantum-inspired feature mapping expands the video fingerprint
              before encryption, improving separability during encrypted
              similarity computation.
            </p>
          ) : (
            <p>
              Classical deep fingerprints are compared directly using cosine
              similarity under adaptive thresholding.
            </p>
          )}
        </div>

        {/* =======================
            ACTION BUTTONS
        ======================= */}
        <div className="flex flex-wrap justify-center gap-4">
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

          <button
            onClick={() => setShowStats(!showStats)}
            className="px-8 py-3 rounded-xl border border-yellow-400/30 text-yellow-300
                       hover:bg-yellow-400/10 transition font-medium"
          >
            {showStats ? "Hide Match Statistics" : "View Match Statistics"}
          </button>
        </div>

        {/* =======================
            EXPANDED STATISTICS
        ======================= */}
        {showStats && score !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 p-8 rounded-2xl bg-black/40 border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-6">
              Similarity Match Analysis
            </h3>

            {/* MATCHED VIDEO */}
            {result.matched && (
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-1">
                  Matched Reference Video
                </p>
                <p className="text-lg font-medium text-white">
                  {result.matched}
                </p>
              </div>
            )}

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatBox
                label="Similarity Score"
                value={score.toFixed(4)}
              />
              <StatBox
                label="Threshold Margin"
                value={`${((score - threshold) * 100).toFixed(2)}%`}
                highlight
              />
              <StatBox
                label="Decision Confidence"
                value={confidence}
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              The decision margin indicates how far the similarity score lies
              from the adaptive threshold. Larger margins imply stronger
              confidence in the system’s encrypted similarity decision.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

/* -----------------------
   Metric Card
----------------------- */
function Metric({ label, value }) {
  return (
    <div className="rounded-xl bg-black/40 border border-white/10 p-4 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

/* -----------------------
   Statistics Box
----------------------- */
function StatBox({ label, value, highlight }) {
  return (
    <div
      className={`rounded-xl border border-white/10 p-4 text-center
        ${highlight ? "bg-yellow-500/10" : "bg-black/40"}`}
    >
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p
        className={`text-lg font-semibold ${
          highlight ? "text-yellow-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
