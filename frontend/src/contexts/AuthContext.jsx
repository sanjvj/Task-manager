import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is authenticated (e.g., by checking localStorage)
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Update isLoggedIn state based on token presence
    }, []);

    const login = () => {
        // Implement login functionality if needed
        setIsLoggedIn(true);
    };

    const logout = () => {
        // Implement logout functionality
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update isLoggedIn state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
