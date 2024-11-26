// components/ui/Modal.tsx

import React from "react";

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded-md text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
