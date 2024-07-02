import React from 'react';
import { useRecoilValue } from "recoil";
import { firstNameState } from "../store/atoms/state";

const Heading = () => {
  const firstName = useRecoilValue(firstNameState);
  
  return (
    <div>
    
      <h1 className='flex justify-center pt-10 font-bold text-4xl text-yellow-300'>Hey {firstName}!</h1>
     
      </div>
    
  );
};

export default Heading;
