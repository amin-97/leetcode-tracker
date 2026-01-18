import { useCodemoteStore } from "../../store";
import codemoteLogo from "../../assets/logo-dark.svg";

interface SidebarProps {
  currentView: "calendar" | "statistics" | "problems";
  onNavigate: (view: "calendar" | "statistics" | "problems") => void;
}

const Sidebar = ({ currentView, onNavigate }: SidebarProps) => {
  const stats = useCodemoteStore((state) => state.getStats());
  const currentStreak = stats.currentStreak;
  const totalSolved = stats.totalSolved;

  return (
    <div className="h-screen bg-gray-950 w-64 flex flex-col border-r border-gray-800">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800">
        <img src={codemoteLogo} alt="Codemote" className="w-full" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onNavigate("calendar")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === "calendar"
                  ? "text-white bg-orange-600"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate("statistics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === "statistics"
                  ? "text-white bg-orange-600"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Statistics
            </button>
          </li>
          <li>
            <button
              onClick={() => onNavigate("problems")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                currentView === "problems"
                  ? "text-white bg-orange-600"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Problems
            </button>
          </li>
        </ul>
      </nav>

      {/* Stats Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Current Streak</span>
            <span className="text-orange-500 font-bold text-lg">
              {currentStreak} {currentStreak === 1 ? "day" : "days"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Solved</span>
            <span className="text-white font-bold text-lg">{totalSolved}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
