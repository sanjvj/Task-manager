import React from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold">Confirm Deletion</p>
        <p className="text-gray-700 mt-2">
          Are you sure you want to delete this task?
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-4 rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
