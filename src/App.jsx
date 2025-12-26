/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./non-outlets/Navbar";
import Login from "./components/Login";

import AddRoom from "./pages/room-owner-page/AddRoom";
import MyListings from "./pages/room-owner-page/MyListings";

import HomePage from "./pages/HomePage";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");  
    const savedRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email"); // Email bhi clear karein
    setIsLoggedIn(false);
    setRole(null);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setRole(localStorage.getItem("role"));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/home"
          element={

            <HomePage />
          }
        />

        {/* --- 2. Add Room Route (Only for OWNER) --- */}
        <Route
          path="/add-room"
          element={
            isLoggedIn && role === "ROLE_OWNER" ? (
              <AddRoom />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/my-listings"
          element={
            isLoggedIn && role === "ROLE_OWNER" ? (
              <MyListings />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/about" element={<h1>About Page</h1>} />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />



        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
