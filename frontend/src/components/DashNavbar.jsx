import { NavLink } from "react-router-dom";

export default function DashNavbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition
     ${
       isActive
         ? "text-blue-400 border-b-2 border-blue-400"
         : "text-slate-300 hover:text-white"
     }`;

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-10 h-16">

        {/* Project Title */}
        <div className="text-lg font-semibold tracking-wide text-white">
          Secure Video Analysis
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/explain" className={linkClass}>
            Explain System
          </NavLink>

          <NavLink to="/methodology" className={linkClass}>
            Methodology
          </NavLink>

          <NavLink to="/security" className={linkClass}>
            Security
          </NavLink>

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
