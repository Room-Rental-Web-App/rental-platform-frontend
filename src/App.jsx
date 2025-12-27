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

// Admin Pages
import AllUsers from "./pages/admin-page/AllUsers";
import AllRooms from "./pages/admin-page/AllRooms";
import AllOwner from "./pages/admin-page/AllOwners";
import PendingOwners from "./pages/admin-page/PendingOwners"; // IMPORT NEW PAGE

import Wishlist from "./pages/user-page/Wishlist";
import SearchRoom from "./pages/user-page/SearchRoom";

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
    localStorage.removeItem("email");
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
        {/* 1. Public Routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchRoom />} />

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

        {/* 2. Owner Routes */}
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

        {/* 3. Admin Routes */}
        <Route
          path="/admin/all-users"
          element={
            isLoggedIn && role === "ROLE_ADMIN" ? (
              <AllUsers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/all-rooms"
          element={
            isLoggedIn && role === "ROLE_ADMIN" ? (
              <AllRooms />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/all-owners"
          element={
            isLoggedIn && role === "ROLE_ADMIN" ? (
              <AllOwner />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* NEW: Admin Approval Route */}
        <Route
          path="/admin/pending-approvals"
          element={
            isLoggedIn && role === "ROLE_ADMIN" ? (
              <PendingOwners />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 4. Wildcard Route */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
