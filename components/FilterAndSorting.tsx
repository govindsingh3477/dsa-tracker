"use client";
import { useState } from "react";
import getFilteredProblemList from "@/lib/actions/getFilteredProblemList"; // Assuming this function is imported

type Difficulty = "EASY" | "MEDIUM" | "HARD" | undefined;
type Status = "Pending" | "Completed" | undefined;

export default function FiltersAndSorting({ setProblems }: { setProblems: any }) {
  const [difficulty, setDifficulty] = useState<Difficulty>(undefined);
  const [status, setStatus] = useState<Status>(undefined);

  const handleClick = async () => {
    try {
      // Fetch filtered problems from the server
      console.log("Filters:", { difficulty, status });

      const filteredProblems = await getFilteredProblemList({ difficulty, status });
      // console.log(filteredProblems);

      setProblems(filteredProblems);
    } catch (error) {
      console.error("Error fetching filtered problems:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters & Sorting</h3>

      {/* Difficulty Filter */}
      <div className="mb-4">
        <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
          Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty ?? ""}
          onChange={(e) => setDifficulty(e.target.value ? (e.target.value as Difficulty) : undefined)} // Set to undefined if empty
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-500"
        >
          <option value="">All</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium mb-1">
          Status:
        </label>
        <select
          id="status"
          value={status ?? ""}
          onChange={(e) => setStatus(e.target.value ? (e.target.value as Status) : undefined)} // Set to undefined if empty
          className="w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-500"
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Apply Button */}
      <button
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        onClick={handleClick}
      >
        Apply
      </button>
    </div>
  );
}
