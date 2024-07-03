import React,{useState,useEffect} from "react";
import { PiLineVerticalBold } from "react-icons/pi";
import axios from "axios";


const Overview = () => {
  const [count,setCount] = useState(0);
  const [completedtaskcount,setCompletedTaskCount] = useState(0);
  useEffect(()=>{
    fetchTasks();
  },[])
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/task/numberoftasks', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
      setCount(response.data.totaltask);
      setCompletedTaskCount(response.data.completedtask);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  return (
    
    <div>
      <h1 className="max-w-4xl ml-6 mt-6 text-start font-normal text-2xl  text-black mb-2 md:text-xl lg:text-2xl">
        Overview
      </h1>
      <div className="ml-6 flex flex-col flex-wrap justify-between lg:flex-row gap-5 lg:gap-20 bg-white border-2 shadow-md border-gray-200 py-4 px-4 pr-32 rounded-lg ">
        <div className="flex">
          <PiLineVerticalBold size={50} color="purple"></PiLineVerticalBold>
          <div className="flex flex-col gep-0 p-0 m-0">
            <h1 className="text-md font-medium">Total project</h1>
            <p className=" text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{count}</h1>
          </div>
        </div>
        <div className="flex">
          <PiLineVerticalBold size={50} color="green"></PiLineVerticalBold>
          <div className="flex flex-col gep-0 p-0 m-0">
            <h1 className="text-md font-medium">Completed</h1>
            <p className=" text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{completedtaskcount}</h1>
          </div>
        </div>
        <div className="flex">
          <PiLineVerticalBold size={50} color="blue"></PiLineVerticalBold>
          <div className="flex flex-col gep-0 p-0 m-0">
            <h1 className="text-md font-medium">Not Completed</h1>
            <p className=" text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">{count-completedtaskcount}</h1>
          </div>
        </div>
        <div className="flex">
          <PiLineVerticalBold size={50} color="red"></PiLineVerticalBold>
          <div className="flex flex-col gep-0 p-0 m-0">
            <h1 className="text-md font-medium">Important</h1>
            <p className=" text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">5</h1>
          </div>
        </div>
        <div className="flex">
          <PiLineVerticalBold size={50} color="orange"></PiLineVerticalBold>
          <div className="flex flex-col gep-0 p-0 m-0">
            <h1 className="text-md font-medium">Overdue</h1>
            <p className=" text-sm font-normal text-zinc-800">All</p>
            <h1 className="text-4xl font-medium mt-3">1</h1>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Overview;
