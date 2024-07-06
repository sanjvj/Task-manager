import React from 'react';
import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import AllTask from '../components/AllTask';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-5'>
      <Sidebar />
      <div className='flex flex-col gap-5 p-5 w-full'>
        <Heading />
      </div>
    </div>
  );
};

export default Home;
