import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/task/newtask", { title, description }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      navigate('/home');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    
    <div className='max-w-md mx-auto bg-white text-gray-800 p-8 rounded shadow mt-10'>
      <h2 className='text-2xl font-bold mb-6'>Add New Task</h2>
      <div className='mb-4'>
        <label htmlFor='title' className='block text-sm font-medium'>Title</label>
        <input
          id='title'
          type='text'
          className='w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='description' className='block text-sm font-medium'>Description</label>
        <textarea
          id='description'
          rows='4'
          className='w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        className='w-full bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300'
        onClick={handleSubmit}
      >
        Add new task
      </button>
    </div>
  );
};

export default AddTask;
