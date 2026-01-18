import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Problem,
  DailyGoal,
  Stats,
  Difficulty,
  ProblemCategory,
} from "../types";

interface CodemoteStore {
  problems: Problem[];
  dailyGoal: DailyGoal;

  // Actions
  addProblem: (problem: Omit<Problem, "id">) => void;
  updateProblem: (id: string, problem: Partial<Problem>) => void;
  deleteProblem: (id: string) => void;
  getProblemsByDate: (date: string) => Problem[];
  setDailyGoal: (goal: DailyGoal) => void;

  // Computed stats
  getStats: () => Stats;
  getCurrentStreak: () => number;
}

export const useCodemoteStore = create<CodemoteStore>()(
  persist(
    (set, get) => ({
      problems: [],
      dailyGoal: {
        problemsPerDay: 1,
        enabled: true,
      },

      addProblem: (problem) => {
        const newProblem: Problem = {
          ...problem,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        };
        set((state) => ({
          problems: [...state.problems, newProblem],
        }));
      },

      updateProblem: (id, updatedFields) => {
        set((state) => ({
          problems: state.problems.map((p) =>
            p.id === id ? { ...p, ...updatedFields } : p,
          ),
        }));
      },

      deleteProblem: (id) => {
        set((state) => ({
          problems: state.problems.filter((p) => p.id !== id),
        }));
      },

      getProblemsByDate: (date) => {
        return get().problems.filter((p) => p.date === date);
      },

      setDailyGoal: (goal) => {
        set({ dailyGoal: goal });
      },

      getStats: () => {
        const problems = get().problems;

        const byDifficulty = {
          Easy: 0,
          Medium: 0,
          Hard: 0,
        };

        const byCategory: Record<ProblemCategory, number> = {
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

        return {
          totalSolved: problems.length,
          currentStreak: get().getCurrentStreak(),
          longestStreak: calculateLongestStreak(problems),
          byDifficulty,
          byCategory,
        };
      },

      getCurrentStreak: () => {
        const problems = get().problems;
        if (problems.length === 0) return 0;

        const uniqueDates = Array.from(
          new Set(problems.map((p) => p.date)),
        ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < uniqueDates.length; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(checkDate.getDate() - i);
          const checkDateStr = checkDate.toISOString().split("T")[0];

          if (uniqueDates.includes(checkDateStr)) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },
    }),
    {
      name: "codemote-storage",
    },
  ),
);

function calculateLongestStreak(problems: Problem[]): number {
  if (problems.length === 0) return 0;

  const uniqueDates = Array.from(new Set(problems.map((p) => p.date))).sort();

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}
