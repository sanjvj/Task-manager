import React from 'react';
import { useRecoilValue } from "recoil";
import { firstNameState } from "../store/atoms/state";
import Overview from './Overview';

const Heading = () => {
  const firstName = useRecoilValue(firstNameState);
  function greeting(){
    const hour = new Date().getHours();
    if(hour>=3&&hour<12){
      return "Good Morning";
    }if(hour>12&&hour<18){
      return "Good Afternoon";
    }else{
      return "Good Evening";
    }
  }

  function currentDate(){
    const date = new Date();
    const options = { weekday: 'long' };
    const weekday = date.toLocaleDateString(undefined, options);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  }
  return (
    <div>
    
      <h1 className='max-w-4xl ml-6 mt-6 text-start font-normal text-2xl  text-black mb-2 md:text-xl lg:text-2xl'>{greeting()}, {firstName}!</h1>
      <p className='ml-7 text-start font-normal text-gray-600 mb-5'>It's {currentDate()}</p>
      <Overview></Overview>
      </div>
    
  );
};

export default Heading;
