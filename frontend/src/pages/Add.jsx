import React from 'react';
import AddTask from '../components/AddTask';
import Sidebar from '../components/Sidebar';

const Add = () => {
  return (
    <div className='bg-white text-gray-800 min-h-screen'>
      <Sidebar></Sidebar>
      <AddTask />
    </div>
  );
};

export default Add;
