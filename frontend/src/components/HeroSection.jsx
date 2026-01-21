import { motion } from "framer-motion";

export default function HeroSection({ onUploadClick, onDashboardClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full h-full flex flex-col items-center justify-center text-center px-6"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight
                   text-slate-100 drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      >
        <span className="text-blue-500">Homomorphic&nbsp;Encryption</span>
        <span className="text-slate-300">–Based</span>
        <br />
        Secure Video Content Analysis
      </motion.h1>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.0, ease: "easeOut" }}
        className="mb-14 mt-14 max-w-2xl text-base md:text-lg text-slate-300"
      >
        Privacy-preserving detection of duplicate and similar videos in cloud
        environments using deep learning and encrypted computation.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center justify-center gap-5"
      >
        <button
          onClick={onUploadClick}
          className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-medium
                     shadow-[0_6px_10px_rgba(37,99,235,0.35)]
                     hover:bg-blue-700 hover:shadow-[0_8px_15px_rgba(37,99,235,0.45)]
                     hover:scale-[1.04] active:scale-[0.98]
                     transition-all duration-300 ease-out"
        >
          Upload Video
        </button>

        <button
          onClick={onDashboardClick}
          className="px-10 py-4 rounded-2xl border border-white/20 text-slate-200
                     hover:bg-white/5 hover:border-white/30
                     hover:scale-[1.04] active:scale-[0.98]
                     transition-all duration-300 ease-out"
        >
          View Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
}
