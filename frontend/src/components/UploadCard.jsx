import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";
import { useRef, useState } from "react";

export default function UploadCard({ onStart, onResult }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("quantum");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file || uploading) return;

    setUploading(true);
    onStart();

    const formData = new FormData();
    formData.append("video", file);
    formData.append("mode", mode);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend response error:", text);
        throw new Error("Backend returned non-200");
      }

      const data = await res.json();

      const safeResult = {
        status: data.status,
        score: typeof data.score === "number" ? data.score : null,
        matched: data.matched ?? null,
        mode,
      };

      onResult(safeResult);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Backend error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
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

      {/* 🔹 MODE TOGGLE (NEW DESIGN) */}
      {/* 🔹 ANALYSIS MODE TOGGLE — FINAL FIX */}
            <div className="mb-8 flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400">Analysis Mode</span>

              <div className="relative flex w-56 h-11 rounded-full bg-gray-800 p-1">
                
                {/* Classical */}
                <button
                  type="button"
                  onClick={() => setMode("classical")}
                  className="relative z-10 flex-1 text-sm font-medium"
                >
                  {mode === "classical" && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-blue-600"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className={`relative ${mode === "classical" ? "text-white" : "text-gray-400"}`}>
                    Classical
                  </span>
                </button>

                {/* Quantum */}
                <button
                  type="button"
                  onClick={() => setMode("quantum")}
                  className="relative z-10 flex-1 text-sm font-medium"
                >
                  {mode === "quantum" && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-purple-700"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className={`relative ${mode === "quantum" ? "text-white" : "text-gray-400"}`}>
                    Quantum
                  </span>
                </button>

              </div>
            </div>


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

      <div className="h-6 mb-6">
        {file && (
          <p className="text-sm text-gray-300">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`px-10 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ease-out
          ${
            file && !uploading
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.04]"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
      >
        {uploading ? "Analyzing..." : "Upload & Analyze"}
      </button>
    </motion.div>
  );
}
