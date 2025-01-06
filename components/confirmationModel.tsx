"use client"

import { useState } from "react";

export default function Modal({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  text 
}:{
    isOpen:boolean,
    onConfirm:()=>void,
    onCancel:()=>void,
    text:string
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">{text}</h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
