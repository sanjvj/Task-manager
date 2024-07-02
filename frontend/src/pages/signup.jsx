// pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { firstNameState, lastNameState } from "../store/atoms/state";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const setFirstNameState = useSetRecoilState(firstNameState);
  const setLastNameState = useSetRecoilState(lastNameState);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      
      setFirstNameState(firstName); // Update Recoil state
      setLastNameState(lastName); // Update Recoil state
      localStorage.setItem("firstName",firstName);
      localStorage.setItem("lastName",lastName);
      navigate("/home");
    } catch (error) {
      console.error("There was an error signing up!", error.response ? error.response.data : error.message);
      // Set the error message to display to the user
      const message = error.response ? error.response.data.msg : error.message;
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Partition (Form) */}
        <div className="w-full md:w-1/2 bg-white">
          <div className="px-8 py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>
            {errorMessage && (
              <div className="mb-4 text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  name="username"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm"
                  required
                />
              </div>
              <br />
              <button
                type="button"
                onClick={handleSignup}
                className="w-full rounded-lg p-4 before:ease relative overflow-hidden border border-black bg-black text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black hover:before:-translate-x-40"
              >
                Sign Up
              </button>
            </form>
            <p className="md:hidden text-gray-600 text-sm mt-8">
              Already have an account?{" "}
              <span className="text-blue-500 hover:cursor-pointer" onClick={()=>{
                navigate("/")
              }}>
                Login
              </span>
            </p>
          </div>
        </div>
        {/* Right Partition (Welcome Text) */}
        <div className="hidden md:block w-1/2 rounded-tl-large rounded-br-large bg-black my-8 mr-8 ml-16 px-8 py-12">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Welcome to TaskSwift
          </h2>
          <p className="text-white font-normal text-lg mb-10">
            Sign up today to streamline your workflow, organize tasks
            efficiently, and collaborate seamlessly with your team.
          </p>
          <p className="text-white font-bold text-lg mb-6">
            Already part of the crew?
          </p>
          <button
            type="button"
            className="w-1/2 rounded-lg py-3 px-4 before:ease relative overflow-hidden border border-white bg-white text-black shadow-lg transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-black before:opacity-20 before:duration-700 hover:shadow-white hover:before:-translate-x-40"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
