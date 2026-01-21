import { motion } from "framer-motion";

export default function ResultSection({
  result,
  sectionRef,
  onReset,
  resetting,
}) {
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
            isUnique ? "text-green-700" : "text-red-800"
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

        <button
          onClick={onReset}
          className="mt-6 px-8 py-3 rounded-xl
                     bg-blue-600 hover:bg-blue-700 font-medium"
        >
          Upload Another Video
        </button>
      </motion.div>
    </section>
  );
}
