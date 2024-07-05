import React from 'react';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const TaskCard = ({ task, onEditClick, onDeleteClick, calculateDaysRemaining, dateOfTask }) => {
  return (
    <div
      onClick={() => onEditClick(task)}
      className="w-96 p-4 bg-white border-2 border-gray-200 shadow-md rounded-md hover:cursor-pointer hover:-translate-y-0.5 duration-300 hover:scale-105 relative"
    >
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <IoCalendarOutline size={20} />
              <p className="font-bold text-gray-500 text-sm">{dateOfTask(task.dueDate)}</p>
            </div>
            <p className="font-bold text-gray-500 text-sm">{calculateDaysRemaining(task.dueDate)}</p>
          </div>
          <h3 className="truncate-multiline font-medium text-lg tracking-normal mt-2">{task.title}</h3>
          <p className="truncate-multiline text-sm">{task.description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent div
            onDeleteClick(task._id);
          }}
          className="absolute bottom-2 right-4 text-red-500 hover:text-red-600"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
