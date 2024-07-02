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
    <div className="text-gray-800 min-h-screen">
      <h2 className="max-w-4xl ml-6 mt-6 text-start font-normal text-2xl  text-black mb-2 md:text-xl lg:text-2xl">Your Tasks</h2>
      {tasks.filter(task => !task.done).length === 0 ? (
        <div><h3>No tasks found</h3></div>
      ) : (
        <div className="flex flex-wrap gap-5 mt-2 ml-6">
          {tasks.filter(task => !task.done).map(task => (
            <div key={task._id} className="w-80 p-4 bg-white border-2 border-gray-200 shadow-md rounded-md">
             <div className='flex justify-between'>
             <div> 
              <h3 className="font-medium text-lg tracking-normal">{task.title}</h3>
              <p className="truncate font-light text-sm">{task.description}</p>
              </div>
              <MdDelete
                onClick={() => handleDelete(task._id)}
                className="cursor-pointer mt-2 text-red-500"
              />
             </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;
