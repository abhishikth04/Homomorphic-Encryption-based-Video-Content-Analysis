import { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar";
import SummaryCards from "../components/SummaryCards";
import AnalysisTable from "../components/AnalysisTable";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalVideos: 0,
    uniqueVideos: 0,
    duplicateVideos: 0,
  });

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dashboard/summary")
      .then(res => res.json())
      .then(data => {
        console.log("📊 Summary API data:", data);
        setSummary({
          totalVideos: data.totalVideos ?? 0,
          uniqueVideos: data.uniqueVideos ?? 0,
          duplicateVideos: data.duplicateVideos ?? 0,
        });
      })
      .catch(err => console.error("Summary fetch failed", err));

    fetch("http://localhost:5000/dashboard/recent")
      .then(res => res.json())
      .then(data => setRecent(data))
      .catch(err => console.error("Recent fetch failed", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <DashNavbar />

      <main className="px-10 py-8 space-y-10">
        <SummaryCards data={summary} />
        <AnalysisTable data={recent} />
      </main>
    </div>
  );
}
