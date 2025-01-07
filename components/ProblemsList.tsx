import React from "react";
import getProblemList from "@/lib/actions/getProblemList";
import SolveButton from "./SolveButton"; // Import the SolveButton component
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  platformName: string;
  link: string;
  createdAt: Date;
}

export default async function ProblemList() {
  const session = await getServerSession(authOptions)
  const ProblemList = await getProblemList(1);
  const userId = session.user.id

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
          {problem.link}
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
