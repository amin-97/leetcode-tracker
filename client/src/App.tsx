import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import AuthCallback from "./components/AuthCallback";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing token
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Token invalid, clear it
        localStorage.removeItem("token");
        setToken(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleAuthSuccess = (authToken: string) => {
    setToken(authToken);
    fetchUser(authToken);
  };

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navbar */}
        <nav className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-orange-500">Codemote</h1>
            <div className="flex gap-4">
              {!token ? (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-gray-300">
                    Welcome, {user?.name || "User"}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto p-4">
                <h2 className="text-4xl font-bold mb-4">
                  Track Your LeetCode Progress
                </h2>
                <p className="text-gray-400">
                  {token
                    ? "You're logged in! Start tracking your problems."
                    : "Sign in to get started"}
                </p>
              </main>
            }
          />
          <Route
            path="/auth/callback"
            element={<AuthCallback onSuccess={handleAuthSuccess} />}
          />
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
