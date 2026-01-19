interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const LandingPage = ({ onLogin, onSignUp }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-gray-950 to-gray-950"></div>

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-32">
          {/* Main Hero Content */}
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Track Your{" "}
              <span className="text-orange-500">LeetCode Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Visualize your progress, maintain your streak, and crush your
              coding interview prep with Codemote
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={onSignUp}
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                Start Tracking Free
              </button>
              <button
                onClick={onLogin}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg text-lg transition-colors border border-gray-700"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                365+
              </div>
              <div className="text-gray-400">Days Tracked</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                1000+
              </div>
              <div className="text-gray-400">Problems Solved</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                100%
              </div>
              <div className="text-gray-400">Free Forever</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Everything You Need to Stay Consistent
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Visual Calendar
            </h3>
            <p className="text-gray-400">
              See your entire year at a glance. Track daily progress with an
              intuitive heatmap that shows your consistency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Streak Tracking
            </h3>
            <p className="text-gray-400">
              Build momentum with streak tracking. Watch your current and best
              streaks grow as you stay consistent.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Detailed Stats
            </h3>
            <p className="text-gray-400">
              Analyze your progress with comprehensive statistics. Break down by
              difficulty, categories, and time spent.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Problem Categories
            </h3>
            <p className="text-gray-400">
              Organize problems by categories like Arrays, DP, Trees, and more.
              Track which patterns you've mastered.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Notes & Links
            </h3>
            <p className="text-gray-400">
              Add notes to problems for future reference. Store LeetCode links
              for quick access to your solved problems.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-orange-500/50 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Daily Goals
            </h3>
            <p className="text-gray-400">
              Set custom daily targets. Stay motivated by hitting your goals and
              building a sustainable practice routine.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-linear-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Interview Prep?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join developers tracking their progress and landing their dream jobs
          </p>
          <button
            onClick={onSignUp}
            className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20"
          >
            Get Started Now - It's Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2025 Codemote. Track every mote of progress.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
