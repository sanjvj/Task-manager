import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdDelete, MdCheckBoxOutlineBlank } from 'react-icons/md';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/task/alltask', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Not completed:</h2>
      {tasks.filter(task => !task.done).length === 0 ? (
        <div><h3>No tasks found</h3></div>
      ) : (
        <div className="flex flex-wrap gap-5">
          {tasks.filter(task => !task.done).map(task => (
            <div key={task._id} className="w-80 bg-gray-100 rounded p-4 shadow">
              <MdCheckBoxOutlineBlank className="text-yellow-300" />
              <h3 className="font-bold">{task.title}</h3>
              <p className="truncate">{task.description}</p>
              <MdDelete
                onClick={() => handleDelete(task._id)}
                className="cursor-pointer mt-2 text-red-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;
