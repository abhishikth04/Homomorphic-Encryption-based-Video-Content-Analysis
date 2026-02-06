import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function DashboardActions() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* ANALYSIS INSIGHTS */}
      <div
        onClick={() => navigate("/analysis")}
        className="group cursor-pointer rounded-2xl border border-white/10
                   bg-gradient-to-br from-purple-600/20 to-purple-800/10
                   p-6 transition-all duration-300
                   hover:scale-[1.03] hover:border-purple-400/40
                   shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Explore Analysis Insights
          </h3>

          <FiArrowRight
            className="text-purple-300 opacity-0 -translate-x-2
                       group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300"
          />
        </div>

        <p className="text-sm text-slate-300 mt-2">
          Visualize similarity behavior and encrypted decision flow
        </p>
      </div>

      {/* SYSTEM PERFORMANCE */}
      <div
        onClick={() => navigate("/performance")}
        className="group cursor-pointer rounded-2xl border border-white/10
                   bg-gradient-to-br from-blue-600/20 to-blue-800/10
                   p-6 transition-all duration-300
                   hover:scale-[1.03] hover:border-blue-400/40
                   shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            View System Performance
          </h3>

          <FiArrowRight
            className="text-blue-300 opacity-0 -translate-x-2
                       group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300"
          />
        </div>

        <p className="text-sm text-slate-300 mt-2">
          Compare modes, scalability, and encryption impact
        </p>
      </div>

    </section>
  );
}
