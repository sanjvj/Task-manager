// components/AddTask.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className='max-w-md mx-auto bg-gray-800 text-white p-8 rounded shadow mt-10'>
      <h2 className='text-2xl font-bold mb-6'>Add New Task</h2>
      <div className='mb-4'>
        <label className='block mb-2'>Title</label>
        <input 
          className='w-full p-2 border border-gray-600 rounded bg-gray-700' 
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>Description</label>
        <textarea 
          className='w-full p-2 border border-gray-600 rounded bg-gray-700' 
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button 
        className='bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400' 
        onClick={async () => {
          await axios.post("http://localhost:3000/api/v1/task/newtask", { title, description },{
            headers:{
              Authorization: "Bearer "+localStorage.getItem("token")
            }
          });
          navigate('/home');
        }}
      >
        Add new task
      </button>
    </div>
  );
};

export default AddTask;
