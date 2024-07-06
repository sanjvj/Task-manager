import axios from "axios";
import { sortTaskbyDate } from "./sortTask";
export const fetchTasks = async (url, setTasks, setErrorMessage) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const sortedTasks =  sortTaskbyDate(response.data,"asc");
    setTasks(sortedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    if (setErrorMessage) {
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  }
};

export const handleDelete = async (id, setTaskToDelete, setShowConfirmation) => {
  setTaskToDelete(id);
  setShowConfirmation(true);
};

export const confirmDelete = async (taskToDelete, setTasks, setShowConfirmation, setTaskToDelete) => {
  try {
    await axios.delete(`http://localhost:3000/api/v1/task/delete/${taskToDelete}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskToDelete));
    setShowConfirmation(false);
    setTaskToDelete(null);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const markTaskAsDone = async (taskId, setTasks, setErrorMessage) => {
  try {
    await axios.patch(`http://localhost:3000/api/v1/task/mark-done/${taskId}`, null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    // Assuming setTasks is defined and passed correctly
    if (setTasks) {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    }

  } catch (error) {
    console.error("Error marking task as done:", error);
    if (setErrorMessage) {
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  }
};

export const handleEditSubmit = async (e, editingTask, setTasks, setEditingTask) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:3000/api/v1/task/edit/${editingTask._id}`, editingTask, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === editingTask._id ? editingTask : task)));
    setEditingTask(null);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const handleAddTaskSubmit = async (taskData, fetchTasks, setShowAddTaskModal, setErrorMessage) => {
  try {
    await axios.post("http://localhost:3000/api/v1/task/newtask", taskData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    fetchTasks();
    setShowAddTaskModal(false);
  } catch (error) {
    console.error("Error adding Task", error.response ? error.response.data : error.message);
    if (setErrorMessage) {
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  }
};
