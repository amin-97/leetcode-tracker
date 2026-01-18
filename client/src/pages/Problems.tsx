import { useState, useMemo } from "react";
import { useCodemoteStore } from "../../store";
import { Problem, Difficulty, ProblemCategory } from "../../types";
import AddProblemModal from "../modals/AddProblemModal";

const Problems = () => {
  const problems = useCodemoteStore((state) => state.problems);
  const deleteProblem = useCodemoteStore((state) => state.deleteProblem);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | "All">(
    "All",
  );
  const [filterCategory, setFilterCategory] = useState<ProblemCategory | "All">(
    "All",
  );
  const [sortBy, setSortBy] = useState<"date" | "name" | "difficulty">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | undefined>();
  const [selectedDate, setSelectedDate] = useState("");

  // Get unique categories from problems
  const availableCategories = useMemo(() => {
    const categories = new Set<ProblemCategory>();
    problems.forEach((p) => p.categories.forEach((c) => categories.add(c)));
    return Array.from(categories).sort();
  }, [problems]);

  // Filtered and sorted problems
  const filteredProblems = useMemo(() => {
    let filtered = problems.filter((problem) => {
      const matchesSearch =
        problem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (problem.notes &&
          problem.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDifficulty =
        filterDifficulty === "All" || problem.difficulty === filterDifficulty;

      const matchesCategory =
        filterCategory === "All" || problem.categories.includes(filterCategory);

      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "difficulty") {
        const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
        comparison =
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [
    problems,
    searchTerm,
    filterDifficulty,
    filterCategory,
    sortBy,
    sortOrder,
  ]);

  const handleEdit = (problem: Problem) => {
    setEditingProblem(problem);
    setSelectedDate(problem.date);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this problem?")) {
      deleteProblem(id);
    }
  };

  const handleAddNew = () => {
    setEditingProblem(undefined);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setIsModalOpen(true);
  };

  const difficultyColors = {
    Easy: "bg-green-600",
    Medium: "bg-yellow-600",
    Hard: "bg-red-600",
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">All Problems</h1>
            <p className="text-gray-400">
              {filteredProblems.length} of {problems.length} problems
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Problem
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-xl p-6 space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search problems by name or notes..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) =>
                setFilterDifficulty(e.target.value as Difficulty | "All")
              }
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value as ProblemCategory | "All")
              }
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="All">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date" | "name" | "difficulty")
              }
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              {sortOrder === "desc" ? "↓" : "↑"}
              {sortOrder === "desc" ? "Descending" : "Ascending"}
            </button>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="bg-gray-900 rounded-xl p-12 text-center">
              <p className="text-gray-400 text-lg">
                {searchTerm ||
                filterDifficulty !== "All" ||
                filterCategory !== "All"
                  ? "No problems match your filters"
                  : "No problems yet. Start tracking your progress!"}
              </p>
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {problem.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold text-white ${
                          difficultyColors[problem.difficulty]
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm text-gray-400">
                        {new Date(problem.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {problem.timeSpent && (
                        <span className="text-sm text-gray-400">
                          • {problem.timeSpent} min
                        </span>
                      )}
                    </div>

                    {problem.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {problem.categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {problem.notes && (
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {problem.notes}
                      </p>
                    )}

                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:text-orange-400 mt-2 inline-flex items-center gap-1"
                      >
                        View on LeetCode
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(problem)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                      title="Edit"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(problem.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded transition-colors"
                      title="Delete"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProblem(undefined);
        }}
        selectedDate={selectedDate}
        editProblem={editingProblem}
      />
    </>
  );
};

export default Problems;
