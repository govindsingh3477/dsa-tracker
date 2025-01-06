"use client";
import { useState } from "react";

interface Problem {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  platformName: string;
  link: string;
}

interface ProblemRowProps {
  problem: Problem;
  onEdit: (id: string, updatedProblem:Problem) => void;
  onDelete: (id: string) => void;
}

export default function ProblemRow({
  problem,
  onEdit,
  onDelete,
}: ProblemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProblem, setEditedProblem] = useState<Problem>({
    ...problem,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProblem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProblem({ ...problem }); // Reset to original values
  };

  const handleSubmit = () => {
    onEdit(problem.id, editedProblem); // Pass updated problem to parent
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border-b border-gray-200 p-3">{problem.id}</td>
      <td className="border-b border-gray-200 p-3">
        {isEditing ? (
          <input
            name="title"
            value={editedProblem.title}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          problem.title
        )}
      </td>
      <td className="border-b border-gray-200 p-3">
        {isEditing ? (
          <select
          name="difficulty"
          value={editedProblem.difficulty}
          onChange={handleInputChange}
          className="border rounded p-1 w-full"
        >
          <option value="EASY">EASY</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </select>
        ) : (
          problem.difficulty
        )}
      </td>
      <td className="border-b border-gray-200 p-3">
        {isEditing ? (
          <input
            name="platformName"
            value={editedProblem.platformName}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          problem.platformName
        )}
      </td>
      <td className="border-b border-gray-200 p-3">
        {isEditing ? (
          <input
            name="link"
            value={editedProblem.link}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
          />
        ) : (
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {problem.link}
          </a>
        )}
      </td>
      <td className="border-b border-gray-200 p-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(problem.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
