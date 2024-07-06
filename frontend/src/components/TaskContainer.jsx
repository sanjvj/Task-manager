import React, { useState, useCallback } from "react";
import {
  fetchTasks as fetchTasksAction,
  handleDelete as handleDeleteAction,
  confirmDelete as confirmDeleteAction,
  handleEditSubmit as handleEditSubmitAction,
  handleAddTaskSubmit as handleAddTaskSubmitAction,
} from "./TaskActions";
import TaskList from "./TaskList";
import ConfirmationDialog from "./ConfirmationDialog";
import EditTaskModal from "./EditTaskModal";
import AddTaskModal from "./AddTaskModal";

const TaskContainer = ({ title, fetchUrl }) => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const fetchTasks = useCallback(() => {
    fetchTasksAction(fetchUrl, setTasks, setErrorMessage);
  }, [fetchUrl]);

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

  const handleEditSubmit = (e) =>
    handleEditSubmitAction(e, editingTask, setTasks, setEditingTask);

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleAddTaskSubmit = (taskData) =>
    handleAddTaskSubmitAction(
      taskData,
      fetchTasks,
      setShowAddTaskModal,
      setErrorMessage
    );

  const handleAddTaskCancel = () => {
    setShowAddTaskModal(false);
  };

  const confirmDelete = () =>
    confirmDeleteAction(
      taskToDelete,
      setTasks,
      setShowConfirmation,
      setTaskToDelete
    );

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowConfirmation(false);
  };

  return (
    <div className="flex flex-col p-4 mt-4">
      
      <div className="flex justify-between items-center mb-8 mr-10">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          className="bg-black hover:bg-gray-800 shadow-lg shadow-black text-white font-semibold px-4 py-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        onEditClick={handleEditClick}
        onDeleteClick={(id) =>
          handleDeleteAction(id, setTaskToDelete, setShowConfirmation)
        }
        calculateDaysRemaining={calculateDaysRemaining}
        dateOfTask={dateOfTask}
      />
      {showConfirmation && (
        <ConfirmationDialog onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
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

export default TaskContainer;
