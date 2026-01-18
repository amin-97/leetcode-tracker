import { useState, useEffect } from "react";
import { useCodemoteStore } from "../../store";
import { Difficulty, ProblemCategory, Problem } from "../../types";

interface AddProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  editProblem?: Problem;
}

const CATEGORIES: ProblemCategory[] = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Database",
  "Breadth-First Search",
  "Tree",
  "Matrix",
  "Two Pointers",
  "Bit Manipulation",
  "Stack",
  "Design",
  "Heap",
  "Graph",
  "Simulation",
  "Backtracking",
  "Sliding Window",
  "Linked List",
  "Union Find",
  "Trie",
  "Divide and Conquer",
  "Queue",
  "Recursion",
  "Other",
];

const AddProblemModal = ({
  isOpen,
  onClose,
  selectedDate,
  editProblem,
}: AddProblemModalProps) => {
  const addProblem = useCodemoteStore((state) => state.addProblem);
  const updateProblem = useCodemoteStore((state) => state.updateProblem);

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [categories, setCategories] = useState<ProblemCategory[]>([]);
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [timeSpent, setTimeSpent] = useState<number | "">("");

  useEffect(() => {
    if (editProblem) {
      setName(editProblem.name);
      setDifficulty(editProblem.difficulty);
      setCategories(editProblem.categories);
      setLink(editProblem.link || "");
      setNotes(editProblem.notes || "");
      setTimeSpent(editProblem.timeSpent || "");
    } else {
      resetForm();
    }
  }, [editProblem, isOpen]);

  const resetForm = () => {
    setName("");
    setDifficulty("Medium");
    setCategories([]);
    setLink("");
    setNotes("");
    setTimeSpent("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const problemData = {
      name: name.trim(),
      difficulty,
      categories,
      link: link.trim() || undefined,
      notes: notes.trim() || undefined,
      timeSpent: timeSpent !== "" ? Number(timeSpent) : undefined,
      date: selectedDate,
    };

    if (editProblem) {
      updateProblem(editProblem.id, problemData);
    } else {
      addProblem(problemData);
    }

    resetForm();
    onClose();
  };

  const toggleCategory = (category: ProblemCategory) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900">
          <h2 className="text-2xl font-bold text-white">
            {editProblem ? "Edit Problem" : "Add Problem"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Problem Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Problem Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="e.g., Two Sum"
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty *
            </label>
            <div className="flex gap-3">
              {(["Easy", "Medium", "Hard"] as Difficulty[]).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    difficulty === diff
                      ? diff === "Easy"
                        ? "bg-green-600 text-white"
                        : diff === "Medium"
                          ? "bg-yellow-600 text-white"
                          : "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categories (select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 bg-gray-800 rounded-lg">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    categories.includes(category)
                      ? "bg-orange-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              LeetCode Link (optional)
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="https://leetcode.com/problems/..."
            />
          </div>

          {/* Time Spent */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Spent (minutes)
            </label>
            <input
              type="number"
              value={timeSpent}
              onChange={(e) =>
                setTimeSpent(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
              placeholder="30"
              min="0"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500 h-24 resize-none"
              placeholder="Key insights, approaches used, things to remember..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              {editProblem ? "Update" : "Add"} Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProblemModal;
