import { motion } from "framer-motion";
import {
  FiUpload,
  FiGrid,
  FiHash,
  FiLock,
  FiShuffle,
  FiCheckCircle,
} from "react-icons/fi";

const steps = [
  { label: "Video Uploaded", icon: FiUpload },
  { label: "Frame Extraction", icon: FiGrid },
  { label: "Fingerprint Generation", icon: FiHash },
  { label: "Fingerprint Encryption", icon: FiLock },
  { label: "Secure Similarity Comparison", icon: FiShuffle },
  { label: "Result Generated", icon: FiCheckCircle },
];

/* Container animation: slides in ONCE */
const containerVariants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

/* Each step animation */
const stepVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export default function ProcessingSteps({ activeStep = 0 }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-[320px] rounded-2xl border border-white/15
                 bg-black/40 backdrop-blur-md p-6
                 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <h2 className="text-lg font-semibold mb-6 text-blue-300">
        Processing Pipeline
      </h2>

      <ul className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isDone = index < activeStep;

          return (
            <motion.li
              key={step.label}
              variants={stepVariants}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`flex items-center gap-3 p-3 rounded-xl
                ${
                  isActive
                    ? "bg-blue-500/15 text-blue-300"
                    : isDone
                    ? "bg-green-500/10 text-green-300"
                    : "text-gray-400"
                }`}
            >
              <Icon
                className={`text-lg transition-colors duration-300
                  ${
                    isActive
                      ? "text-blue-400 animate-pulse"
                      : isDone
                      ? "text-green-400"
                      : ""
                  }`}
              />
              <span className="text-sm font-medium">{step.label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
