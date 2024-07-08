// App.js
import React from 'react';
import { RecoilRoot } from 'recoil';
import RecoilStateInitializer from './components/RecoilStateInitializer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Signin';
import Home from './pages/Home';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Tasks from './pages/Tasks';

import CompletedTasks from './pages/CompletedTasks';
import ImportantTasks from './pages/ImportantTasks';
import ProgressBar from './components/ProgressBar'; // Import ProgressBar component

const App = () => {
  return (
    <RecoilRoot>
      <RecoilStateInitializer>
        <Router>
          <ProgressBar /> {/* Render progress bar component */}
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
                  <Tasks />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/completed"
              element={
                <ProtectedRoute>
                  <CompletedTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/important"
              element={
                <ProtectedRoute>
                  <ImportantTasks />
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
