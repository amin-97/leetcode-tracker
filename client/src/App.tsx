import { useState } from "react";
import Sidebar from "./components/layouts/Sidebar";
import Calendar from "./components/Calendar";
import Statistics from "./pages/Statistics";
import Problems from "./pages/Problems";

type View = "calendar" | "statistics" | "problems";

function App() {
  const [currentView, setCurrentView] = useState<View>("calendar");

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {currentView === "calendar" && (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome to Codemote
                </h1>
                <p className="text-gray-400">
                  Track your daily Leetcode progress. Every tiny piece of code
                  counts.
                </p>
              </div>
              <Calendar />
            </>
          )}
          {currentView === "statistics" && <Statistics />}
          {currentView === "problems" && <Problems />}
        </div>
      </main>
    </div>
  );
}

export default App;
