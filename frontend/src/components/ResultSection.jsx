import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ResultSection({
  result,
  sectionRef,
  onReset,
  resetting,
}) {
  const navigate = useNavigate();

  // keep component mounted during reset fade
  if (!result && !resetting) return null;

  const isUnique = result?.status?.toLowerCase() === "unique";

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
        className={`rounded-2xl p-12 max-w-xl text-center
          border backdrop-blur-lg shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          ${
            isUnique
              ? "border-green-400/30 bg-green-500/10"
              : "border-red-400/30 bg-red-500/10"
          }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 ${
            isUnique ? "text-green-400" : "text-red-400"
          }`}
        >
          {isUnique
            ? "Unique Video Detected"
            : "Similar Video Detected"}
        </h2>

        {!isUnique && (
          <>
            <p className="text-xl text-gray-200 mb-2">
              Similarity Score:{" "}
              <span className="font-semibold">
                {result?.score?.toFixed(4)}
              </span>
            </p>

            {result?.matched && (
              <p className="text-gray-300 mb-4">
                Matched with:{" "}
                <span className="font-medium">{result.matched}</span>
              </p>
            )}
          </>
        )}

        {isUnique && (
          <p className="text-gray-300 mb-6">
            The video has been securely processed and stored
            using encrypted fingerprints.
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">
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
