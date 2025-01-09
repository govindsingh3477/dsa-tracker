import React from "react";

import SolveButton from "./SolveButton"; // Import the SolveButton component


interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  platformName: string;
  link: string;
  createdAt: Date;
}

export default  function ProblemList({ProblemList,userId}:{ProblemList:Problem[],userId:string}) {

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Problems</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Problem ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {ProblemList.map((problem:any) => (
              <Content key={problem.id} problem={problem} userId={userId} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Content({
  problem,
  userId,
}: {
  problem: Problem;
  userId: string;
}) {
  const difficultyColor =
    problem.difficulty === "EASY"
      ? "bg-green-100 text-green-600"
      : problem.difficulty === "MEDIUM"
      ? "bg-yellow-100 text-yellow-600"
      : problem.difficulty === "HARD"
      ? "bg-red-100 text-red-600"
      : "";

      const score = problem.difficulty === "EASY"
      ? 3
      : problem.difficulty === "MEDIUM"
      ? 5
      :problem.difficulty==="HARD"? 7:0;

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">{problem.createdAt.toLocaleDateString()}</td>
      <td className="px-4 py-2">{problem.id}</td>
      <td className="px-4 py-2">{problem.title}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 text-sm font-medium rounded ${difficultyColor}`}>
          {problem.difficulty}
        </span>
      </td>
      <td className="px-4 py-2">{problem.platformName}</td>
      <td className="px-4 py-2 text-blue-700">
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
         { <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>}
        </a>
      </td>
      <td className="px-4 py-2">
        <SolveButton
          userId={userId}
          problemId={problem.id}
          score={score} // Example score value
          // onSolved={handleSolved}
        />
      </td>
    </tr>
  );
}
