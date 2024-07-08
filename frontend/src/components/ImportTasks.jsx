import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const ImportantTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const [pendingResponse, completedResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/v1/task/pending", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
        axios.get("http://localhost:3000/api/v1/task/completed", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      ]);
      setPendingTasks(pendingResponse.data);
      setCompletedTasks(completedResponse.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const dateOfTask = (dueDate) => {
    const due = new Date(dueDate);
    const date = due.getDate();
    const month = due.toLocaleDateString("default", { month: "long" });
    return `${month} ${date}`;
  };

  const handleMarkAsDone = async (taskId) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/task/mark-done/${taskId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${taskId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Important Tasks</h2>
      <div className="w-full max-w-3xl">
        {/* Render Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div>
            <h3 className="text-xl font-medium mb-2">Not Completed Tasks</h3>
            <ul className="divide-y divide-gray-200">
              {pendingTasks.map((task) => (
                <li key={task._id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaRegCircle
                        className="text-gray-500 mr-4 cursor-pointer"
                        size={24}
                        onClick={() => handleMarkAsDone(task._id)}
                      />
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
          </div>
        )}

        {/* Render Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-2">Completed Tasks</h3>
            <ul className="divide-y divide-gray-200">
              {completedTasks.map((task) => (
                <li key={task._id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaCheckCircle
                        className="text-green-500 mr-4 cursor-pointer"
                        size={24}
                        onClick={() => handleMarkAsDone(task._id)}
                      />
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
          </div>
        )}

        {/* Render a message if no tasks */}
        {pendingTasks.length === 0 && completedTasks.length === 0 && (
          <p className="text-gray-500 mt-4">No important tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default ImportantTasks;
