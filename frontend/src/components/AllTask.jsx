import React, { useState, useEffect } from "react";
import axios from "axios";

import TaskCard from "./TaskCard";
import ConfirmationDialog from "./ConfirmationDialog";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false); // State for AddTask modal
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    fetchTasks();
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
    setTaskToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/task/delete/${taskToDelete}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskToDelete)
      );
      setShowConfirmation(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const cancelDelete = () => {
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

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/v1/task/edit/${editingTask._id}`,
        editingTask,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? editingTask : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleAddTaskSubmit = async (taskData) => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/task/newtask',
        taskData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
      fetchTasks(); // Refresh tasks after adding
      setShowAddTaskModal(false);
    } catch (error) {
      console.error("Error adding Task", error.response ? error.response.data : error.message);
      // Set the error message to display to the user
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  };

  const handleAddTaskCancel = () => {
    setShowAddTaskModal(false);
  };

  return (
    <div className="flex flex-col p-4 mt-4">
      <div className="flex justify-between items-center mb-8 mr-10">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <button
          className="bg-black hover:bg-gray-800 shadow-lg shadow-black text-white font-semibold px-4 py-2 rounded"
          onClick={handleAddTask} // Open AddTask modal
        >
          Add Task
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-start">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEditClick={handleEditClick}
            onDeleteClick={handleDelete}
            calculateDaysRemaining={calculateDaysRemaining}
            dateOfTask={dateOfTask}
          />
        ))}
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
        />
      )}
      {showAddTaskModal && (
        <AddTaskModal
          onSubmit={handleAddTaskSubmit}
          onCancel={handleAddTaskCancel}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default AllTask;
