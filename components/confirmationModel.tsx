"use client";

import { useState } from "react";

export default function Modal({
  isOpen,
  onConfirm,
  onCancel,
  text,
}: {
  isOpen: boolean;
  onConfirm: () => Promise<void>; // Make onConfirm async if it involves async logic
  onCancel: () => void;
  text: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false); // Manage submitting state

  const handleConfirm = async () => {
    setIsSubmitting(true); // Disable the button
    try {
      await onConfirm(); // Wait for the confirmation logic
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">{text}</h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onCancel}
            disabled={isSubmitting} // Disable Cancel button while submitting if needed
            className={`px-4 py-2 rounded-md ${
              isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting} // Disable Confirm button while submitting
            className={`px-4 py-2 text-white rounded-md ${
              isSubmitting
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Confirm"} {/* Change button text */}
          </button>
        </div>
      </div>
    </div>
  );
}
