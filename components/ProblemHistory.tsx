import getUserProblemHistory from "@/lib/actions/getSolvedHistory";
import React from "react";

interface Problem {
    problemId: string;
    title: string;
    difficulty: "EASY"|"MEDIUM"|"HARD";
    platform: string;
    link: string;
    solvedAt: Date;
}

// const problem:Problem={
//   id:'123',
//   title:"my naw",
//   difficulty:"EASY",
//   platformName:"leet",
//   link:"https://leetcode.com/",
//   date: "govind"
// }
export default async function ProblemHistory({userId}:{userId:string}) {
  const {problemHistory,}=await getUserProblemHistory(userId);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Challenge History</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Problem ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
           {problemHistory.map((problem:any)=><Content key={problem.problemId} problem={problem}></Content>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Content({problem}:{problem:Problem}){
  const difficultyColor =
    problem.difficulty === "EASY"
      ? "bg-green-100 text-green-600"
      : problem.difficulty === "MEDIUM"
      ? "bg-yellow-100 text-yellow-600"
      :problem.difficulty==="HARD"? "bg-red-100 text-red-600":"";
  return (<tr className="border-b border-gray-200">
    <td className="px-4 py-2">{problem.solvedAt.toLocaleDateString()}</td>
    <td className="px-4 py-2">{problem.problemId}</td>
    <td className="px-4 py-2">{problem.title}</td>
    <td className={` px-4 py-2 `}><span className={`px-2 py-1 text-sm font-medium rounded ${difficultyColor}`}>
          {problem.difficulty}
        </span></td>
    <td className="px-4 py-2">{problem.platform}</td>
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
  </tr>)
}