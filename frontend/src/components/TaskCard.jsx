import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { markTaskAsDone } from "./TaskActions";

const TaskCard = ({
  task,
  onEditClick,
  onDeleteClick,
  calculateDaysRemaining,
  dateOfTask,
  setTasks,
  setErrorMessage,
  isCompletedPage, // New prop to indicate if this is the Completed Tasks page
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMarkAsDone = async () => {
    try {
      await markTaskAsDone(task._id, setTasks, setErrorMessage);
      if (setTasks) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === task._id ? { ...t, done: !t.done } : t
          )
        );
      }
      location.reload();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  return (
    <div className="w-96 p-4 bg-white border-2 border-gray-200 shadow-md rounded-lg hover:cursor-pointer hover:-translate-y-0.5 duration-300 hover:scale-105 relative">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <IoCalendarOutline size={20} />
              <p className="font-bold text-gray-500 text-sm">
                {dateOfTask(task.dueDate)}
              </p>
            </div>
            <p className="font-bold text-gray-500 text-sm">
              {calculateDaysRemaining(task.dueDate)}
            </p>
          </div>
          <div className="flex gap-5 mt-5">
            {isCompletedPage ? null : ( // Conditionally render completion circle if not on Completed Tasks page
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleMarkAsDone}
                className="inline-block"
              >
                {task.done || isHovered ? (
                  <FaCheckCircle size={20} color="green" />
                ) : (
                  <FaRegCircle size={20} />
                )}
              </div>
            )}
            <div onClick={() => onEditClick(task)}>
              <h3 className="truncate-multiline font-medium text-lg tracking-normal">
                {task.title}
              </h3>
              <p className="truncate-multiline text-sm mb-7">
                {task.description}
              </p>
            </div>
          </div>
        </div>
        {!isCompletedPage && ( // Render delete button if not on Completed Tasks page
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(task._id);
            }}
            className="absolute bottom-3 right-4 text-red-500 hover:text-red-600"
          >
            <MdDelete size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
