// App.js
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import RecoilStateInitializer from "./components/RecoilStateInitializer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Signin";
import Home from "./pages/Home";

import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import Tasks from "./pages/Tasks";
import PendingTasks from "./pages/PendingTasks";
import CompletedTasks from "./pages/CompletedTasks";
import ImportantTasks from "./pages/ImportantTasks";

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
              path="/alltask"
              element={
                <ProtectedRoute>
                  <Tasks></Tasks>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pending"
              element={
                <ProtectedRoute>
                  <PendingTasks></PendingTasks>
                </ProtectedRoute>
              }
            />

            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <CompletedTasks></CompletedTasks>
                </ProtectedRoute>
              }
            />
            <Route
              path="/important"
              element={
                <ProtectedRoute>
                  <ImportantTasks></ImportantTasks>
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
