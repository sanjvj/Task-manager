import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/task/completed", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCompletedTasks(response.data); // Assuming response.data is an array of completed tasks
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const dateOfTask = (dueDate) => {
    const due = new Date(dueDate);
    const date = due.getDate();
    const month = due.toLocaleDateString("default", { month: "long" });
    return `${month} ${date}`;
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${taskId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // Remove the deleted task from the state
      setCompletedTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
      <div className="w-full max-w-3xl">
        {completedTasks.length === 0 ? (
          <p className="text-gray-500">No completed tasks found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {completedTasks.map((task) => (
              <li key={task._id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                   
                    <div>
                      <h3 className="text-lg font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoCalendarOutline className="text-gray-500 mr-2" size={18} />
                    <p className="text-sm text-gray-500">{dateOfTask(task.dueDate)}</p>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
