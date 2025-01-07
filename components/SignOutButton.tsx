"use client"

import { signOut } from "next-auth/react";
import { useState } from "react";
import Modal from "./confirmationModel";
 // Import the Modal component

export default function SignOutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the confirmation modal
  const handleClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal without signing out
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Proceed with sign out
  const handleConfirm = async() => {
    signOut();
    setIsModalOpen(false); // Close the modal after sign-out
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="mt-4 px-6 py-2 w-full cursor-pointer text-white bg-red-500 rounded-full hover:bg-red-600 transition"
      >
        LogOut
      </button>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        text="Are you sure you want to log out?"
      />
    </>
  );
}
