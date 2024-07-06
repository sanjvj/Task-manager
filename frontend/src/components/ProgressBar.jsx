// ProgressBar.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Show progress bar on route change

    const timeout = setTimeout(() => {
      setLoading(false); // Hide progress bar after some time (simulating loading completion)
    }, 1000); // Adjust duration as needed

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [location.pathname]); // Listen for changes in pathname

  return (
    loading && (
      <div className="progress-bar">
        <div className="progress" />
      </div>
    )
  );
};

export default ProgressBar;
