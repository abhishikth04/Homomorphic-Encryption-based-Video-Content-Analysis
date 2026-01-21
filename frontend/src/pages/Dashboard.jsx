import DashNavbar from "../components/DashNavbar";
import SummaryCards from "../components/SummaryCards";
import AnalysisTable from "../components/AnalysisTable";

export default function Dashboard() {
  const summary = {
    totalVideos: 42,
    uniqueVideos: 31,
    duplicateVideos: 11,
    avgSimilarity: 0.68,
  };

  const recent = [
    {
      id: 1,
      name: "lecture_recording.mp4",
      status: "Unique",
      score: "-",
      date: "2024-03-18",
    },
    {
      id: 2,
      name: "movie_clip.mp4",
      status: "Duplicate",
      score: "0.91",
      date: "2024-03-17",
    },
    {
      id: 3,
      name: "conference_talk.mp4",
      status: "Unique",
      score: "-",
      date: "2024-03-16",
    },
  ];

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
