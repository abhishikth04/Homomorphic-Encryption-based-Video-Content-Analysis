import { motion } from "framer-motion";

export default function ResultCard({ result }) {
  if (!result) return null;

  const isUnique = result.status === "Unique";
  const scoreText =
    result.score === null ? "—" : result.score.toFixed(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 border ${
        isUnique
          ? "bg-green-900/30 border-green-600"
          : "bg-yellow-900/30 border-yellow-500"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-2 ${
          isUnique ? "text-green-400" : "text-yellow-400"
        }`}
      >
        Analysis Result
      </h2>

      <p className="text-2xl font-bold mb-1">
        Similarity Score: {scoreText}
      </p>

      <p className={isUnique ? "text-green-300" : "text-yellow-300"}>
        Status: {isUnique ? "Unique Video" : "Similar Video Detected"}
      </p>

      {!isUnique && result.matched && (
        <p className="mt-2 text-sm text-gray-300">
          Matched with: <span className="font-medium">{result.matched}</span>
        </p>
      )}
    </motion.div>
  );
}
