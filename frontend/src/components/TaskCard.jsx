import React, { useState } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdClass, MdDelete } from 'react-icons/md';
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { markTaskAsDone } from './TaskActions'; // Ensure correct import

const TaskCard = ({ task, onEditClick, onDeleteClick, calculateDaysRemaining, dateOfTask, setTasks, setErrorMessage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMarkAsDone = async () => {
    try {
      await markTaskAsDone(task._id, setTasks, setErrorMessage);
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  return (
    <div
      className="w-96 p-4 bg-white border-2 border-gray-200 shadow-md rounded-lg hover:cursor-pointer hover:-translate-y-0.5 duration-300 hover:scale-105 relative"
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
          <div className='flex gap-5 mt-5'>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleMarkAsDone} // Ensure correct onClick handler
              className='inline-block'
            >
              {isHovered ? <FaCheckCircle size={20} color='green'></FaCheckCircle> : <FaRegCircle size={20}></FaRegCircle>}
            </div>
            <div onClick={() => onEditClick(task)}>
              <h3 className="truncate-multiline font-medium text-lg tracking-normal">{task.title}</h3>
              <p className="truncate-multiline text-sm mb-7">{task.description}</p>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent div
            onDeleteClick(task._id);
          }}
          className="absolute bottom-3 right-4 text-red-500 hover:text-red-600"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
