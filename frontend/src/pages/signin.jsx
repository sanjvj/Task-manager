import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { firstNameState, lastNameState } from "../store/atoms/state";

const SignInForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);

  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token); // Store JWT token
      setFirstName(response.data.firstName); // Set first name in Recoil state
      setLastName(response.data.lastName); // Set last name in Recoil state

      // Store first name and last name in local storage
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("lastName", response.data.lastName);

      navigate("/home");
    } catch (error) {
      console.error("There was an error signing in!", error.response ? error.response.data : error.message);
      // Set the error message to display to the user
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Partition (Form) */}
        <div className="w-full md:w-1/2 bg-white">
          <div className="px-8 py-12">
            <h2 className="text-3xl font-bold mb-16 text-gray-800">Sign In</h2>
            {errorMessage && (
              <div className="mb-4 text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSignin}>
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
                type="submit"
                className="w-full rounded-lg p-4 before:ease relative overflow-hidden border border-black bg-black text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black hover:before:-translate-x-40"
              >
                Sign In
              </button>
            </form>
            <p className="md:hidden text-gray-600 text-sm mt-8">
              New Here?{" "}
              <span className="text-blue-500 hover:cursor-pointer" onClick={()=>{
                navigate("/signup")
              }}>
                Sign up
              </span>
            </p>
          </div>
        </div>
        {/* Right Partition (Welcome Text) */}
        <div className="hidden md:block w-1/2 rounded-tl-large rounded-br-large bg-black my-8 mr-8 ml-16 px-8 py-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Welcome back!</h2>
          <p className="text-white font-normal text-lg mb-10">
            Log in to access your tasks, track progress, and stay productive
          </p>
          <p className="text-white font-normal text-lg mb-10">
            Join hundreds of users who rely on our intuitive interface and
            powerful features to manage their projects with ease.
          </p>
          <p className="text-white font-bold text-lg mb-6">
            Joining us for the first time?
          </p>
          <button
            type="button"
            className="w-1/2 rounded-lg py-3 px-4 before:ease relative overflow-hidden border border-white bg-white text-black shadow-lg transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-black before:opacity-20 before:duration-700 hover:shadow-white hover:before:-translate-x-40"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
