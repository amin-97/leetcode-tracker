import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import AuthCallback from "./pages/AuthCallback";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/layouts/Sidebar";
import Calendar from "./components/Calendar";
import Statistics from "./pages/Statistics";
import Problems from "./pages/Problems";
import { authAPI } from "./api/api";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<
    "calendar" | "statistics" | "problems"
  >("calendar");

  const fetchUser = async () => {
    try {
      const res = await authAPI.getCurrentUser();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAuthSuccess = () => {
    fetchUser();
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderDashboardContent = () => {
    switch (currentView) {
      case "calendar":
        return <Calendar />;
      case "statistics":
        return <Statistics />;
      case "problems":
        return <Problems />;
      default:
        return <Calendar />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                // Dashboard with Sidebar when logged in
                <div className="flex h-screen">
                  <Sidebar
                    currentView={currentView}
                    onNavigate={setCurrentView}
                  />
                  <div className="flex-1 flex flex-col">
                    {/* Top navbar for user info and logout */}
                    <nav className="p-4 border-b border-gray-800">
                      <div className="flex items-center justify-end gap-4">
                        <span className="text-gray-300">
                          {user.name || "User"}
                        </span>
                        <button
                          onClick={handleLogout}
                          className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </nav>
                    {/* Main content area */}
                    <main className="flex-1 overflow-y-auto p-8">
                      {renderDashboardContent()}
                    </main>
                  </div>
                </div>
              ) : (
                // Landing page when not logged in
                <LandingPage
                  onLogin={() => setIsLoginOpen(true)}
                  onSignUp={() => setIsRegisterOpen(true)}
                />
              )
            }
          />
          <Route
            path="/auth/callback"
            element={<AuthCallback onSuccess={handleAuthSuccess} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Modals */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
