import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

export default function ResultSection({
  result,
  sectionRef,
  onReset,
  resetting,
}) {
  const navigate = useNavigate();

  if (!result && !resetting) return null;

  const isUnique = result?.status?.toLowerCase() === "unique";
  const isQuantum = result?.mode === "quantum";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{
          opacity: resetting ? 0 : 1,
          y: resetting ? 40 : 0,
          scale: resetting ? 0.95 : 1,
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="max-w-2xl w-full rounded-2xl
                   border border-white/15
                   bg-black/50 backdrop-blur-xl
                   shadow-[0_40px_100px_rgba(0,0,0,0.7)]
                   p-10"
      >
        {/* ========================= */}
        {/* 1️⃣ DECISION PANEL */}
        {/* ========================= */}
        <div className="flex flex-col items-center text-center mb-8">
          {isUnique ? (
            <FiCheckCircle className="text-6xl text-green-400 mb-4" />
          ) : (
            <FiAlertTriangle className="text-6xl text-red-400 mb-4" />
          )}

          <h2
            className={`text-3xl font-bold ${
              isUnique ? "text-green-400" : "text-red-400"
            }`}
          >
            {isUnique ? "Unique Video Detected" : "Duplicate Video Detected"}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Secure similarity analysis completed successfully
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* ========================= */}
        {/* 2️⃣ ANALYSIS CONTEXT */}
        {/* ========================= */}
        <div className="space-y-3 text-sm text-gray-300 mb-6">
          <div className="flex justify-between">
            <span>Analysis Mode</span>
            <span
              className={`font-medium ${
                isQuantum ? "text-purple-400" : "text-blue-400"
              }`}
            >
              {isQuantum ? "Quantum-Inspired" : "Classical"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Fingerprint Type</span>
            <span className="text-slate-200">
              Deep Visual Fingerprint
            </span>
          </div>

          <div className="flex justify-between">
            <span>Feature Space</span>
            <span className="text-slate-200">
              {isQuantum ? "1024-Dimensional (Mapped)" : "512-Dimensional"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Comparison Method</span>
            <span className="text-slate-200">
              Encrypted Cosine Similarity
            </span>
          </div>
        </div>

        {/* ========================= */}
        {/* 3️⃣ COMPARISON DETAILS */}
        {/* ========================= */}
        {!isUnique && (
          <>
            <div className="h-px bg-white/10 my-6" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Similarity Score</span>
                <span className="font-semibold text-white">
                  {(result?.score * 100).toFixed(2)}%
                </span>
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-red-400 rounded-full"
                  style={{ width: `${Math.min(result.score * 100, 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Adaptive Threshold</span>
                <span className="text-gray-200">System-Defined</span>
              </div>

              {result?.matched && (
                <div className="text-sm text-gray-300">
                  Matched With:{" "}
                  <span className="font-medium text-white">
                    {result.matched}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        {/* ========================= */}
        {/* ACTION BUTTONS */}
        {/* ========================= */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={onReset}
            className="px-8 py-3 rounded-xl
                       bg-blue-600 hover:bg-blue-700
                       transition font-medium"
          >
            Upload Another Video
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 rounded-xl
                       border border-white/20 text-slate-200
                       hover:bg-white/10 hover:border-white/30
                       transition font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </section>
  );
}
