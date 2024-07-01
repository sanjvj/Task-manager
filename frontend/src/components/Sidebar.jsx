// components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token from localStorage (or wherever it's stored)
    localStorage.removeItem("token");
    // Redirect to login page or homepage
    navigate("/");
  };
  return (
    <div className="h-screen flex flex-col justify-between p-4 bg-gray-800 rounded-md text-white">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-yellow-300 text-black w-10 h-10 flex items-center justify-center">
          S
        </div>
        <h1>Sanjay Surya</h1>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <button onClick={() => navigate("/home")}>All Tasks</button>
        <button onClick={() => navigate("/completed")}>Completed</button>
        <button onClick={() => navigate("/important")}>Important</button>
      </div>
      <button
        className="self-center"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
