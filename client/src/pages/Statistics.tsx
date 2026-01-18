import { useCodemoteStore } from "../../store";
import { useMemo } from "react";

const Statistics = () => {
  const stats = useCodemoteStore((state) => state.getStats());
  const problems = useCodemoteStore((state) => state.problems);
  const dailyGoal = useCodemoteStore((state) => state.dailyGoal);
  const setDailyGoal = useCodemoteStore((state) => state.setDailyGoal);

  // Get top categories
  const topCategories = useMemo(() => {
    const categoryEntries = Object.entries(stats.byCategory)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    return categoryEntries;
  }, [stats.byCategory]);

  // Weekly breakdown (last 7 days)
  const weeklyData = useMemo(() => {
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const count = problems.filter((p) => p.date === dateStr).length;

      last7Days.push({
        date: dateStr,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      });
    }

    return last7Days;
  }, [problems]);

  const maxWeeklyCount = Math.max(...weeklyData.map((d) => d.count), 1);

  const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-500",
  };

  const totalByDifficulty =
    stats.byDifficulty.Easy +
    stats.byDifficulty.Medium +
    stats.byDifficulty.Hard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Statistics</h1>
        <p className="text-gray-400">Your coding journey at a glance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Solved</div>
          <div className="text-4xl font-bold text-white">
            {stats.totalSolved}
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Current Streak</div>
          <div className="text-4xl font-bold text-orange-500">
            {stats.currentStreak}
            <span className="text-xl ml-2">
              {stats.currentStreak === 1 ? "day" : "days"}
            </span>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="text-gray-400 text-sm mb-2">Longest Streak</div>
          <div className="text-4xl font-bold text-white">
            {stats.longestStreak}
            <span className="text-xl ml-2">
              {stats.longestStreak === 1 ? "day" : "days"}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Goal Setting */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Daily Goal</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dailyGoal.enabled}
              onChange={(e) =>
                setDailyGoal({ ...dailyGoal, enabled: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-gray-300">Enable daily goal</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Solve</span>
            <input
              type="number"
              min="1"
              max="20"
              value={dailyGoal.problemsPerDay}
              onChange={(e) =>
                setDailyGoal({
                  ...dailyGoal,
                  problemsPerDay: Number(e.target.value),
                })
              }
              className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-center focus:outline-none focus:border-orange-500"
              disabled={!dailyGoal.enabled}
            />
            <span className="text-gray-400">
              {dailyGoal.problemsPerDay === 1 ? "problem" : "problems"} per day
            </span>
          </div>
        </div>
      </div>

      {/* Last 7 Days Chart */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Last 7 Days</h2>
        <div className="flex items-end justify-between gap-2 h-48">
          {weeklyData.map((day, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="flex-1 flex items-end w-full">
                <div
                  className="w-full bg-orange-600 rounded-t transition-all hover:bg-orange-500"
                  style={{
                    height: `${(day.count / maxWeeklyCount) * 100}%`,
                    minHeight: day.count > 0 ? "8px" : "0px",
                  }}
                  title={`${day.count} problems`}
                />
              </div>
              <div className="text-xs text-gray-400">{day.day}</div>
              <div className="text-xs font-bold text-white">{day.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Problems by Difficulty
        </h2>
        <div className="space-y-4">
          {(["Easy", "Medium", "Hard"] as const).map((difficulty) => {
            const count = stats.byDifficulty[difficulty];
            const percentage =
              totalByDifficulty > 0 ? (count / totalByDifficulty) * 100 : 0;

            return (
              <div key={difficulty}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">
                    {difficulty}
                  </span>
                  <span className="text-gray-400">
                    {count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${difficultyColors[difficulty]} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Top Problem Categories
          </h2>
          <div className="space-y-3">
            {topCategories.map(([category, count], index) => (
              <div key={category} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300 font-medium">
                      {category}
                    </span>
                    <span className="text-gray-400">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-600"
                      style={{
                        width: `${(count / stats.totalSolved) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
