// pages/Home.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import AllTask from '../components/AllTask';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex bg-black text-white min-h-screen'>
      <Sidebar />
      <div className='flex-grow p-6'>
        <Heading />
        <AllTask />
        <div className='mt-4'>
          <button 
            className='bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400' 
            onClick={() => navigate('/task')}
          >
            New task in your mind?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
