export type Difficulty = "Easy" | "Medium" | "Hard";

export type ProblemCategory =
  | "Array"
  | "String"
  | "Hash Table"
  | "Dynamic Programming"
  | "Math"
  | "Sorting"
  | "Greedy"
  | "Depth-First Search"
  | "Binary Search"
  | "Database"
  | "Breadth-First Search"
  | "Tree"
  | "Matrix"
  | "Two Pointers"
  | "Bit Manipulation"
  | "Stack"
  | "Design"
  | "Heap"
  | "Graph"
  | "Simulation"
  | "Backtracking"
  | "Sliding Window"
  | "Linked List"
  | "Union Find"
  | "Trie"
  | "Divide and Conquer"
  | "Queue"
  | "Recursion"
  | "Other";

export interface Problem {
  id: string;
  name: string;
  difficulty: Difficulty;
  categories: ProblemCategory[];
  link?: string;
  notes?: string;
  date: string; // ISO date string
  timeSpent?: number; // minutes
}

export interface DailyGoal {
  problemsPerDay: number;
  enabled: boolean;
}

export interface Stats {
  totalSolved: number;
  currentStreak: number;
  longestStreak: number;
  byDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  byCategory: Record<ProblemCategory, number>;
}
