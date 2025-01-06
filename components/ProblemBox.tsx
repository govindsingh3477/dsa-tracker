
import SolveButton from "./SolveButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
type Difficulty= "EASY" |"MEDIUM" |"HARD";

interface ProblemBoxProps {
  problemId:string
  platform: string; // e.g., "LeetCode", "GeeksforGeeks"
  difficulty: Difficulty; // e.g., "Easy", "Medium", "Hard"
  title: string; // e.g., "Two Sum"
  points?: number; // e.g., 50
  link: string; // The external link to the problem, e.g., "https://otherplatform.com/problems/two-sum/"
}

async function ProblemBox({ platform, difficulty = "MEDIUM", title, points = 3, link ,problemId}:ProblemBoxProps){


const session=await getServerSession(authOptions)
 const userId = session?.user.id
  // Dynamic styling for difficulty
  const difficultyColor =
    difficulty === "EASY"
      ? "bg-green-100 text-green-600"
      : difficulty === "MEDIUM"
      ? "bg-yellow-100 text-yellow-600"
      :difficulty==="HARD"? "bg-red-100 text-red-600":"";
    const score = difficulty === "EASY"
    ? 3
    : difficulty === "MEDIUM"
    ? 5
    :difficulty==="HARD"? 7:0;
  return (
    <div className="p-3  rounded-md bg-white flex justify-between items-center space-x-4 ">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Platform: {platform}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-2 py-1 text-sm font-medium rounded ${difficultyColor}`}>
          {difficulty}
        </span>
        <span className="text-gray-600 text-sm font-medium">{score} Points</span>
      </div>
      <div className="flex items-center">
        <SolveButton problemId={problemId} userId={userId} score={score}></SolveButton>
      </div>

      {/* Use an <a> tag to open the external link */}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer hover:bg-gray-50 mt-3 p-2 text-center text-blue-500 underline">
            Go to Problem
          </div>
        </a>
      )}
    </div>
  );
};

export default ProblemBox;
