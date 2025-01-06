import { useState } from "react";
import WrapperCard from "./WrapperCard";
interface Problem {
    id: string;
    title: string;
    description?: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    link: string;
    platformName: string;
  }
export default function AddNewProblem({ onAdd }: { onAdd: (problem: Problem) => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [link, setLink] = useState("");
    const [platformName, setPlatformName] = useState("");
  
    const handleSubmit = () => {
      const newProblem: Problem = {
        id: `#${Math.random().toString(36).substr(2, 5)}`, // Random unique ID
        title,
        description,
        difficulty: difficulty as "EASY" | "MEDIUM" | "HARD",
        link,
        platformName,
      };
      onAdd(newProblem);
    };
  
    return (
      <WrapperCard>
        <h3 className="text-md font-semibold mb-4">Add New Problem</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Platform Name"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleSubmit}
          >
            Add Problem
          </button>
        </div>
      </WrapperCard>
    );
  }