import Problem from "../models/Problem.js";
import DailyGoal from "../models/DailyGoal.js";

// Get user statistics
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const problems = await Problem.find({ userId });

    const byDifficulty = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    const byCategory = {
      Array: 0,
      String: 0,
      "Hash Table": 0,
      "Dynamic Programming": 0,
      Math: 0,
      Sorting: 0,
      Greedy: 0,
      "Depth-First Search": 0,
      "Binary Search": 0,
      Database: 0,
      "Breadth-First Search": 0,
      Tree: 0,
      Matrix: 0,
      "Two Pointers": 0,
      "Bit Manipulation": 0,
      Stack: 0,
      Design: 0,
      Heap: 0,
      Graph: 0,
      Simulation: 0,
      Backtracking: 0,
      "Sliding Window": 0,
      "Linked List": 0,
      "Union Find": 0,
      Trie: 0,
      "Divide and Conquer": 0,
      Queue: 0,
      Recursion: 0,
      Other: 0,
    };

    problems.forEach((problem) => {
      byDifficulty[problem.difficulty]++;
      problem.categories.forEach((cat) => {
        byCategory[cat]++;
      });
    });

    // Calculate current streak
    const uniqueDates = Array.from(new Set(problems.map((p) => p.date))).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const checkDateStr = checkDate.toISOString().split("T")[0];

      if (uniqueDates.includes(checkDateStr)) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    let maxStreak = 1;
    let tempStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      const diffDays = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    const longestStreak = uniqueDates.length === 0 ? 0 : maxStreak;

    const stats = {
      totalSolved: problems.length,
      currentStreak,
      longestStreak,
      byDifficulty,
      byCategory,
    };

    res.json(stats);
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get daily goal
export const getDailyGoal = async (req, res) => {
  try {
    const userId = req.user.id;

    let dailyGoal = await DailyGoal.findOne({ userId });

    if (!dailyGoal) {
      // Create default goal if not exists
      dailyGoal = await DailyGoal.create({
        userId,
        problemsPerDay: 1,
        enabled: true,
      });
    }

    res.json(dailyGoal);
  } catch (error) {
    console.error("Get daily goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update daily goal
export const updateDailyGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problemsPerDay, enabled } = req.body;

    let dailyGoal = await DailyGoal.findOne({ userId });

    if (!dailyGoal) {
      // Create if doesn't exist
      dailyGoal = await DailyGoal.create({
        userId,
        problemsPerDay: problemsPerDay || 1,
        enabled: enabled !== undefined ? enabled : true,
      });
    } else {
      // Update
      if (problemsPerDay !== undefined)
        dailyGoal.problemsPerDay = problemsPerDay;
      if (enabled !== undefined) dailyGoal.enabled = enabled;
      await dailyGoal.save();
    }

    res.json(dailyGoal);
  } catch (error) {
    console.error("Update daily goal error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
