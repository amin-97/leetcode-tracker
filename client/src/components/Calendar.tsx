import { useState } from "react";
import { useCodemoteStore } from "../../store";
import AddProblemModal from "../modals/AddProblemModal";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const problems = useCodemoteStore((state) => state.problems);
  const dailyGoal = useCodemoteStore((state) => state.dailyGoal);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDayClick = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateStr = date.toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setIsModalOpen(true);
  };

  const getProblemCountForDay = (day: number): number => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const dateStr = date.toISOString().split("T")[0];
    return problems.filter((p) => p.date === dateStr).length;
  };

  const getIntensityClass = (count: number): string => {
    if (count === 0) return "bg-gray-800";
    if (count === 1) return "bg-orange-900";
    if (count === 2) return "bg-orange-700";
    if (count >= 3) return "bg-orange-500";
    return "bg-gray-800";
  };

  const isGoalMet = (count: number): boolean => {
    return dailyGoal.enabled && count >= dailyGoal.problemsPerDay;
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <>
      <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-gray-500 font-medium text-sm py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const problemCount = day ? getProblemCountForDay(day) : 0;
            const goalMet = day ? isGoalMet(problemCount) : false;

            return (
              <div
                key={index}
                onClick={() => day && handleDayClick(day)}
                className={`
                  aspect-square flex items-center justify-center rounded-lg relative
                  ${day ? `${getIntensityClass(problemCount)} hover:opacity-80 cursor-pointer transition-all` : ""}
                `}
              >
                {day && (
                  <>
                    <span className="text-white font-medium">{day}</span>
                    {problemCount > 0 && (
                      <div className="absolute top-1 right-1 bg-white text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {problemCount}
                      </div>
                    )}
                    {goalMet && (
                      <div className="absolute bottom-1 left-1">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800 rounded"></div>
              <span className="text-gray-400">No problems</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-900 rounded"></div>
              <span className="text-gray-400">1 problem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-700 rounded"></div>
              <span className="text-gray-400">2 problems</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-gray-400">3+ problems</span>
            </div>
          </div>
          {dailyGoal.enabled && (
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-400">
                Daily goal met ({dailyGoal.problemsPerDay}{" "}
                {dailyGoal.problemsPerDay === 1 ? "problem" : "problems"})
              </span>
            </div>
          )}
        </div>
      </div>

      <AddProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default Calendar;
