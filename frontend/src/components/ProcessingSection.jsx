import { motion } from "framer-motion";

const steps = [
  "Video received",
  "Extracting frames",
  "Generating deep fingerprints",
  "Applying homomorphic encryption",
  "Secure similarity comparison",
  "Final decision generated",
];

export default function ProcessingSection({ active, sectionRef }) {
  if (!active) return null;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-black"
    >
      <div className="max-w-2xl w-full px-6">
        <h2 className="text-3xl font-bold text-blue-400 mb-10 text-center">
          Processing Securely
        </h2>

        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.4 }}
              className="flex items-center gap-4 bg-gray-900 border border-gray-700 rounded-xl p-4"
            >
              <span className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></span>
              <p className="text-gray-200">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
