// components/AllTask.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdDelete, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import '../App.css'
const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/v1/task/alltask',
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem("token")
      }
    };
    
    axios.request(config)
    .then((response) => {
      const tasks = response.data;
      setTasks(tasks);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/delete/${id}`,{
        headers:{
          Authorization: "Bearer "+localStorage.getItem("token") 
        }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleDone = async (id, done) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/task/update/${id}`, { done: !done },{
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
        }
      });
      const updatedTasks = tasks.map(task => {
        if (task._id === id) {
          return { ...task, done: !done };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <div>
        <h2 className='text-xl font-bold mb-4'>Not completed:</h2>
        {tasks.filter(task => !task.done).length === 0 ? (
          <div><h3>No tasks found</h3></div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {tasks.filter(task => !task.done).map(task => (
              <div key={task._id} className='bg-gray-700 text-white p-4 rounded shadow'>
                <MdCheckBoxOutlineBlank 
                  onClick={() => handleToggleDone(task._id, task.done)} 
                  className='cursor-pointer text-yellow-300'
                />
                <h3 className='font-bold'>{task.title}</h3>
                <p className='truncate-multiline'>{task.description}</p>
                <MdDelete 
                  onClick={() => handleDelete(task._id)} 
                  className='cursor-pointer mt-2 text-red-500'
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Completed:</h2>
        {tasks.filter(task => task.done).length === 0 ? (
          <div><h3>No completed tasks found</h3></div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {tasks.filter(task => task.done).map(task => (
              <div key={task._id} className='bg-gray-700 text-white p-4 rounded shadow'>
                <MdCheckBox 
                  onClick={() => handleToggleDone(task._id, task.done)} 
                  className='cursor-pointer text-yellow-300'
                />
                <h3 className='font-bold'>{task.title}</h3>
                <p className='truncate-multiline'>{task.description}</p>
                <MdDelete 
                  onClick={() => handleDelete(task._id)} 
                  className='cursor-pointer mt-2 text-red-500'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTask;
