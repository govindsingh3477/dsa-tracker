"use client";

import WrapperCard from "./WrapperCard";
import TableHeader from "./TableHeader";
import ProblemRow from "./ProblemRow";
import { useEffect, useState } from "react";
import AddNewProblem from "./AddNewProblem";
import addProblem from "@/lib/actions/addProblem";
import getAdminProblems from "@/lib/actions/getAdminSideProblems";
import deleteProblemById from "@/lib/actions/deleteProblemById";
import updateProblem from "@/lib/actions/updateProblem";

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  platformName: string;
  link: string
}
interface newProblem {
  id: string;
  title: string;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  link: string;
  platformName: string;
}

export default function ManageProblems() {
  const [showAddProblem, setShowAddProblem] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);

  // Fetch problems on component mount
  useEffect(() => {
    fetchProblems();
  }, []);

  // Function to fetch problems
  const fetchProblems = async () => {
    try {
      const gotProblems = await getAdminProblems();
      setProblems(gotProblems);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    }
  };

  // Handle adding a new problem
  const handleAddProblem = async (newProblem: newProblem) => {
    try {
      await addProblem(newProblem);
      setShowAddProblem(false);
      // Refetch the problems after adding a new one
      await fetchProblems();
    } catch (error) {
      console.error("Failed to add problem:", error);
    }
  };

  const handleEdit = async(id: string,updatedProblem:Problem) => {
       await updateProblem(id,updatedProblem);
      setProblems((prevProblems) =>
        prevProblems.map((problem) =>
          problem.id === id ? updatedProblem : problem
        )
      );

  };

  const handleDelete = async (id: string) => {
    try {
      
      await deleteProblemById(id); // Perform the deletion on the server
      setProblems((prevProblems) => prevProblems.filter((problem) => problem.id !== id)); // Update state
    } catch (error) {
      console.error("Failed to delete problem:", error);
    }
  };
  

  return (
    <WrapperCard>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Manage Problems</h2>
        <button
          onClick={() => setShowAddProblem((prev) => !prev)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          {showAddProblem ? "Cancel" : "Add New Problem"}
        </button>
      </div>
      {showAddProblem && (
        <AddNewProblem
          onAdd={handleAddProblem}
        />
      )}
      <table className="w-full text-left border-collapse">
        <TableHeader />
        <tbody>
          {problems.map((problem) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </WrapperCard>
  );
}
