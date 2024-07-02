import React from 'react';
import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import AllTask from '../components/AllTask';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex'>
      <Sidebar />
      <div className='ml-10 md:ml-64 flex flex-col gap-5 p-5 w-full'>
        <Heading />
        <AllTask />
      </div>
    </div>
  );
};

export default Home;
