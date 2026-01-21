import { useRef, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import UploadCard from "./components/UploadCard";
import ProcessingSteps from "./components/ProcessingSteps";
import ResultSection from "./components/ResultSection";
import HeroSection from "./components/HeroSection";

import Dashboard from "./pages/Dashboard";
import ExplainSystem from "./pages/ExplainSystem";

/* ============================= */
/* UPLOAD + ANALYSIS FLOW */
/* ============================= */
function UploadFlow() {
  const uploadRef = useRef(null);
  const resultRef = useRef(null);

  const [showUpload, setShowUpload] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [bgState, setBgState] = useState("normal");
  const [resetting, setResetting] = useState(false);

  /* ---------- HERO → UPLOAD ---------- */
  const handleUploadClick = () => {
    setShowUpload(true);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  /* ---------- PROCESSING ---------- */
  const startProcessing = () => {
    setProcessing(true);
    setActiveStep(0);
  };

  /* ---------- STEP PROGRESSION ---------- */
  useEffect(() => {
    if (!processing) return;

    const delays = [1000, 1200, 1200, 1200, 1200, 800];
    let total = 0;
    const timers = [];

    delays.forEach((d, i) => {
      total += d;
      timers.push(setTimeout(() => setActiveStep(i), total));
    });

    return () => timers.forEach(clearTimeout);
  }, [processing]);

  /* ---------- RESULT ---------- */
  const handleResult = (data) => {
    setProcessing(false);
    setResult(data);

    setTimeout(() => {
      setBgState(
        data.status?.toLowerCase() === "unique" ? "green" : "red"
      );
    }, 300);
  };

  /* ---------- SCROLL TO RESULT ---------- */
  useEffect(() => {
    if (!result || !resultRef.current) return;

    resultRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [result]);

  /* ---------- RESET ---------- */
  const resetAll = () => {
    setResetting(true);
    setBgState("normal");

    setTimeout(() => {
      setResult(null);
      setResetting(false);
      setProcessing(false);
      setActiveStep(-1);
      setShowUpload(false);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 950);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white">

      {/* ===== BASE BACKGROUND ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[#0b0f19]" />

      {/* ===== COLOR VEIL ===== */}
      <div
        className={`pointer-events-none fixed inset-0 z-0
          transition-opacity duration-[2200ms] ease-in-out
          ${
            bgState === "green"
              ? "bg-green-950/70 opacity-100"
              : bgState === "red"
              ? "bg-red-950/70 opacity-100"
              : "opacity-0"
          }`}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="h-screen flex items-center justify-center">
          <HeroSection
            onUploadClick={handleUploadClick}
            onDashboardClick={() => window.location.assign("/dashboard")}
          />
        </section>

        {/* UPLOAD */}
        {showUpload && (
          <section
            ref={uploadRef}
            className="h-screen flex items-center justify-center gap-12 px-12"
          >
            <UploadCard
              onStart={startProcessing}
              onResult={handleResult}
            />

            {processing && (
              <ProcessingSteps activeStep={activeStep} />
            )}
          </section>
        )}

        {/* RESULT */}
        {(result || resetting) && (
          <ResultSection
            result={result}
            sectionRef={resultRef}
            onReset={resetAll}
            resetting={resetting}
          />
        )}
      </div>
    </div>
  );
}

/* ============================= */
/* ROUTER */
/* ============================= */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadFlow />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/explain" element={<ExplainSystem />} />
    </Routes>
  );
}












// import { useRef, useState, useEffect } from "react";
// import UploadCard from "./components/UploadCard";
// import ProcessingSteps from "./components/ProcessingSteps";
// import ResultSection from "./components/ResultSection";
// import HeroSection from "./components/HeroSection";

// function App() {
//   const uploadRef = useRef(null);
//   const resultRef = useRef(null);

//   const [showUpload, setShowUpload] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [activeStep, setActiveStep] = useState(-1);
//   const [result, setResult] = useState(null);
//   const [bgState, setBgState] = useState("normal");
//   const [resetting, setResetting] = useState(false);

//   /* ---------- HERO → UPLOAD ---------- */
//   const handleUploadClick = () => {
//     setShowUpload(true);
//     setTimeout(() => {
//       uploadRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 120);
//   };

//   /* ---------- PROCESSING ---------- */
//   const startProcessing = () => {
//     setProcessing(true);
//     setActiveStep(0);
//   };

//   /* ---------- STEP PROGRESSION ---------- */
//   useEffect(() => {
//     if (!processing) return;

//     const delays = [1000, 1200, 1200, 1200, 1200, 800];
//     let total = 0;
//     const timers = [];

//     delays.forEach((d, i) => {
//       total += d;
//       timers.push(setTimeout(() => setActiveStep(i), total));
//     });

//     return () => timers.forEach(clearTimeout);
//   }, [processing]);

//   /* ---------- RESULT ---------- */
//   const handleResult = (data) => {
//     setProcessing(false);
//     setResult(data);

//     // let result appear first, then world reacts
//     setTimeout(() => {
//       setBgState(
//         data.status?.toLowerCase() === "unique" ? "green" : "red"
//       );
//     }, 300);
//   };

//   /* ---------- SCROLL TO RESULT (SMOOTH & NATURAL) ---------- */
//   useEffect(() => {
//     if (!result || !resultRef.current) return;

//     resultRef.current.scrollIntoView({
//       behavior: "smooth",
//       block: "center",
//     });
//   }, [result]);

//   /* ---------- RESET (BUTTER SMOOTH) ---------- */
//   const resetAll = () => {
//     setResetting(true);
//     setBgState("normal");

//     setTimeout(() => {
//       setResult(null);
//       setResetting(false);
//       setProcessing(false);
//       setActiveStep(-1);
//       setShowUpload(false);

//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 950);
//   };

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden text-white">

//       {/* ===== BASE BACKGROUND ===== */}
//       <div className="pointer-events-none fixed inset-0 z-0 bg-[#0b0f19]" />

//       {/* ===== COLOR VEIL (SLOW & CINEMATIC) ===== */}
//       <div
//         className={`pointer-events-none fixed inset-0 z-0
//           transition-opacity duration-[2200ms] ease-in-out
//           ${
//             bgState === "green"
//               ? "bg-green-950/70 opacity-100"
//               : bgState === "red"
//               ? "bg-red-950/70 opacity-100"
//               : "opacity-0"
//           }`}
//       />

//       {/* ===== CONTENT ===== */}
//       <div className="relative z-10">

//         {/* HERO */}
//         <section className="h-screen flex items-center justify-center">
//           <HeroSection
//             onUploadClick={handleUploadClick}
//             onDashboardClick={() => alert("Dashboard coming soon 🙂")}
//           />
//         </section>

//         {/* UPLOAD */}
//         {showUpload && (
//           <section
//             ref={uploadRef}
//             className="h-screen flex items-center justify-center gap-12 px-12"
//           >
//             <UploadCard
//               onStart={startProcessing}
//               onResult={handleResult}
//             />

//             {processing && (
//               <ProcessingSteps activeStep={activeStep} />
//             )}
//           </section>
//         )}

//         {/* RESULT */}
//         {(result || resetting) && (
//           <ResultSection
//             result={result}
//             sectionRef={resultRef}
//             onReset={resetAll}
//             resetting={resetting}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
