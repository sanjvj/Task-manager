import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firstNameState, lastNameState } from "../store/atoms/state";
import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
const Sidebar = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="hidden md:flex flex-col h-screen rounded-r-lg w-[35vh] py-5 px-4 bg-black text-white top-0 left-0 z-50">
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
        <button onClick={() => navigate("/completed")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-4 rounded-md transition duration-500">
          <><SiTicktick stroke="1" className="mt-1"/> Completed</>
        </button>
        <button onClick={() => navigate("/pending")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-3 rounded-md transition duration-500">
          <><MdOutlinePendingActions size="20" className="mt-1"/> Pending</>
        </button>
        <button onClick={() => navigate("/important")} className="flex gap-3 text-start text-zinc-200 hover:bg-neutral-500 py-2 px-3 rounded-md transition duration-500">
          <><MdOutlineNotificationImportant size='18' className="mt-1"/> Important</>
        </button>

       
      </div>
     
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
