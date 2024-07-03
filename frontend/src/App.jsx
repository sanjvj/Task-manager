// App.js
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import RecoilStateInitializer from "./components/RecoilStateInitializer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Home from "./pages/Home";
import Add from "./pages/Add";
import ProtectedRoute from "./ProtectedRoute";
import './App.css'
import EditTask from "./components/EditTask";

const App = () => {
  return (
    <RecoilRoot>
      <RecoilStateInitializer>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task"
              element={
                <ProtectedRoute>
                  <Add></Add>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditTask></EditTask>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </RecoilStateInitializer>
    </RecoilRoot>
  );
};

export default App;
