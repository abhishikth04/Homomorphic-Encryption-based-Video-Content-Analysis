import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import { useRef, useState } from "react";

export default function UploadCard({ onStart, onResult }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
  if (!file) return;

  onStart();

  const formData = new FormData();
  formData.append("video", file);

  try {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData,
    });

    // ✅ Explicit backend failure check
    if (!res.ok) {
      const text = await res.text();
      console.error("Backend response error:", text);
      throw new Error("Backend returned non-200");
    }

    const data = await res.json();

    // ✅ Normalize backend response (VERY IMPORTANT)
    const safeResult = {
      status: data.status,
      score: typeof data.score === "number" ? data.score : null,
      matched: data.matched ?? null,
    };

    console.log("✅ Backend result:", safeResult);
    onResult(safeResult);

  } catch (err) {
    console.error("❌ Upload failed:", err);
    alert("Backend error. Please try again.");
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-2xl w-[90%] rounded-2xl border border-white/20
                 bg-gray-900/60 backdrop-blur-md p-14 text-center
                 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
    >
      <FiUploadCloud className="mx-auto text-6xl text-blue-400 mb-6" />

      <h2 className="text-2xl font-semibold mb-3 text-slate-100">
        Upload your video securely
      </h2>

      <p className="text-gray-400 mb-10">
        Drag & drop or select a video file to begin analysis
      </p>

      {/* Hidden input */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* Choose File */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="mb-4 px-8 py-3 rounded-xl border border-white/20 text-slate-200
                   hover:bg-white/5 hover:border-white/30
                   hover:scale-[1.03] active:scale-[0.97]
                   transition-all duration-300 ease-out"
      >
        Choose Video
      </button>

      {/* File name (fixed height to avoid layout jump) */}
      <div className="h-6 mb-6">
        {file && (
          <p className="text-sm text-gray-300">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`px-10 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ease-out
          ${
            file
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.04] active:scale-[0.98] shadow-[0_10px_30px_rgba(37,99,235,0.35)]"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
      >
        Upload & Analyze
      </button>
    </motion.div>
  );
}
