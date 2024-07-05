import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firstNameState, lastNameState } from "../store/atoms/state";
import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";
import {  CgAdd, CgAddR } from "react-icons/cg";
import { SiTicktick } from "react-icons/si";
const Sidebar = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="hidden md:fixed md:flex flex-col h-[98vh] rounded-lg m-1 w-[35vh] py-5 px-4 bg-black text-white top-0 left-0 z-50">
    <div>
      
    </div>
      <div className="flex items-center gap-2">
      <img src="Logo.jpeg" className="w-12 h-12 rounded-md"></img>
        <div><h1 className="text-lg font-normal">TASKSWIFT</h1>
        <p className="font-light text-zinc-400 text-sm">Company</p></div>
      </div>
      <div className="flex flex-col mt-16 gap-2">
        <button onClick={() => navigate("/home")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-4 rounded-md transition duration-500">
          <><RxDashboard className="mt-1"/> Dashboard</>
        </button>
        <button onClick={() => navigate("/alltask")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-4 rounded-md transition duration-500">
          <><FaTasks className="mt-1"/> Tasks</>
        </button>
        <button onClick={() => navigate("/important")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-4 rounded-md transition duration-500">
          <><SiTicktick stroke="1" className="mt-1"/> Completed</>
        </button>
        <button onClick={() => navigate("/analytics")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-4 rounded-md transition duration-500">
          <><MdOutlineNotificationImportant className="mt-1"/> Important</>
        </button>

       
      </div>
      <button
            type="button"
            className="flex gap-8 mt-auto font-semibold w-full rounded-lg py-3 px-7 before:ease relative overflow-hidden border border-white bg-white text-black shadow-lg transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-black before:opacity-20 before:duration-700 hover:shadow-white hover:before:-translate-x-40"
            onClick={() => {
              navigate("/task");
            }}
          >Add New Task <CgAdd size={30} className="pb-1"/></button>
      <button
        className="self-center font-semibold bg-red-600 text-white py-2 px-10 rounded hover:bg-red-700 transition duration-300 mt-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
