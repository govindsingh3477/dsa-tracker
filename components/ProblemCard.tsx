import React from "react";
import { OuterBox } from "./OuterBox";
import ProblemBox from "./ProblemBox";
import getTodaysProblems from "@/lib/actions/getTodoysProblems";


interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  platformName: string;
  link: string;
}

export default async function ProblemCard({ title }: { title: string }) {
  const problems: Problem[] = await getTodaysProblems();

  return (
    <OuterBox bgColor="bg-white-100" className="flex-1" title={title}>
      {/* Render each problem dynamically */}
      {problems.map((problem) => (
        <ProblemBox
          key={problem.id} // Use `id` as a unique key
          platform={problem.platformName}
          title={problem.title}
          link={problem.link}
          difficulty={problem.difficulty}
          problemId={problem.id}

        />
      ))}
    </OuterBox>
  );
}
