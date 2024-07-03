import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCalendarOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null); // Track task to delete
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks(); // Initial fetch when component mounts
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/task/alltask",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Set the task to delete and show confirmation modal
      setTaskToDelete(id);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error preparing to delete task:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      // Perform delete operation
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${taskToDelete}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Update tasks state to reflect the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete));

      // Close confirmation modal
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const cancelDelete = () => {
    // Reset state and close confirmation modal
    setTaskToDelete(null);
    setShowConfirmation(false);
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const timeDiff = new Date(dueDate).getTime() - today.getTime();
    const value = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (value > 1) {
      return `Due in ${value} days`;
    } else if (value === 1) {
      return `Due in ${value} day`;
    } else if (value === 0) {
      return "Due Today";
    } else {
      return "Past Due";
    }
  };

  const dateOfTask = (dueDate) => {
    const due = new Date(dueDate);
    const date = due.getDate();
    const month = due.toLocaleDateString("default", { month: "long" });
    return `${month} ${date}`;
  };

  const navigateToEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="text-gray-800 min-h-screen">
      <h2 className="max-w-4xl ml-6 mt-6 text-start font-normal text-2xl text-black mb-2 md:text-xl lg:text-2xl">
        Your Tasks
      </h2>
      {tasks.filter((task) => !task.done).length === 0 ? (
        <div>
          <h3 className="ml-6 mt-20">No tasks found</h3>
        </div>
      ) : (
        <div key={tasks.length} className="flex flex-wrap gap-5 mt-2 ml-6">
          {tasks
            .filter((task) => !task.done)
            .map((task) => (
              <div
                key={task._id}
                onClick={() => navigateToEdit(task._id)}
                className="w-96 p-4 bg-white border-2 border-gray-200 shadow-md rounded-md hover:cursor-pointer hover:-translate-y-0.5 duration-300 hover:scale-105 relative"
              >
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
                    <h3 className="truncate-multiline font-medium text-lg tracking-normal mt-2">
                      {task.title}
                    </h3>
                    <p className="truncate-multiline text-sm">
                      {task.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from propagating to parent div
                      handleDelete(task._id);
                    }}
                    className="absolute bottom-2 right-4 text-red-500 hover:text-red-600"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Confirm Deletion</p>
            <p className="text-gray-700 mt-2">Are you sure you want to delete this task?</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
