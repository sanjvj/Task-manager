import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { firstNameState, lastNameState } from "../store/atoms/state";

const Sidebar = () => {
  const navigate = useNavigate();
  const firstName = useRecoilValue(firstNameState);
  const lastName = useRecoilValue(lastNameState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="hidden md:flex flex-col justify-around h-screen sticky rounded-r-large p-10 bg-black text-white top-0 left-0 z-50 min-w-72">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-yellow-300 text-black w-10 h-10 flex items-center justify-center text-2xl font-bold">
          {firstName.charAt(0)}
        </div>
        <h1 className="text-lg font-bold">{firstName} {lastName}</h1>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center text-center mt-4">
        <button onClick={() => navigate("/home")} className="text-white hover:bg-gray-900 hover:text-yellow-300 py-2 px-4 rounded-lg transition duration-300">
          All Tasks
        </button>
        <button onClick={() => navigate("/home")} className="text-white hover:bg-gray-900 hover:text-yellow-300 py-2 px-4 rounded-lg transition duration-300">
          Completed
        </button>
        <button onClick={() => navigate("/home")} className="text-white hover:bg-gray-900 hover:text-yellow-300 py-2 px-4 rounded-lg transition duration-300">
          Important
        </button>
        {/* Add other buttons as needed */}
      </div>
      <button
        className="self-center bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 transition duration-300 mt-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
