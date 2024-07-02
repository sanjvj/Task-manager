import React from 'react';
import Sidebar from '../components/Sidebar';
import Heading from '../components/Heading';
import AllTask from '../components/AllTask';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex gap-5'>
    <Sidebar></Sidebar>
    <>
    <Heading />
    <AllTask />
    </> 
    </div>
  );
};

export default Home;
