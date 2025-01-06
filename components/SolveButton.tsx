"use client"; // Client-side component

import React, { useEffect, useState } from "react";
import checkisSolved from "@/lib/actions/checkisSolved";
import markProblemSolved from "@/lib/actions/markProblemSolved";
import Modal from "./confirmationModel";
 // Import Modal component

interface SolveButtonProps {
  problemId: string;
  userId: string; // Passed as a prop
  score: number;
}

const SolveButton: React.FC<SolveButtonProps> = ({ problemId, userId, score }) => {
  const [isSolved, setIsSolved] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const checkStatus = async () => {
      const res = await checkisSolved(userId, problemId);
      setIsSolved(res);
      setLoading(false); // Set loading to false after the async call
    };
    checkStatus();
  }, [userId, problemId]); // Re-run when userId or problemId changes

  // Function to handle confirmation
  const handleConfirm = async () => {
    await markProblemSolved(userId, problemId, score);
    setIsSolved(true); // Mark as solved
    setIsModalOpen(false); // Close the modal after confirming
  };

  // Function to toggle solved state
  const toggleSolved = () => {
    setIsModalOpen(true); // Open the modal for confirmation
  };

  // Function to cancel the action
  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without marking the problem as solved
  };

  return (
    <div className="flex items-center">
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation for button click
          if (!loading && !isSolved) {
            toggleSolved(); // Open modal to confirm
          }
        }}
        className={`px-4 py-1 text-sm font-medium rounded-md ml-4 ${
        loading? "bg-slate-50" :isSolved  ? "bg-gray-400 text-white" : "bg-blue-500 text-white"
        }`}
        disabled={loading || isSolved} // Disable if loading or already solved
      >
        {loading ? (
          <span className="loader">...</span> // Display loading state (you can use a spinner or text)
        ) : isSolved ? (
          "Solved"
        ) : (
          "Mark !"
        )}
      </button>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        text="Are you sure you want to mark this problem as solved? This action cannot be undone."
      />
    </div>
  );
};

export default SolveButton;
