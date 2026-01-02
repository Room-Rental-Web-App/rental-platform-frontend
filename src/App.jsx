import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./non-outlets/Navbar";
import Footer from "./non-outlets/Footer";    
import Login from "./components/Auth";
import { WishlistProvider } from "./context/WishlistContext";

// Owner
import AddRoom from "./pages/room-owner-page/AddRoom";
import MyListings from "./pages/room-owner-page/MyListings";
import About from "./pages/About"

// User
import HomePage from "./pages/HomePage";
import SearchRoom from "./pages/user-page/SearchRoom";
import Wishlist from "./pages/user-page/Wishlist";
import RoomDetailPage from "./pages/user-page/RoomDetailPage";

// Admin
import AllUsers from "./pages/admin-page/AllUsers";
import AllRooms from "./pages/admin-page/AllRooms";
import AllOwner from "./pages/admin-page/AllOwners";
import PendingOwners from "./pages/admin-page/PendingOwners";
import PendingRooms from "./pages/admin-page/PendingRooms";
import PendingUsers from "./pages/admin-page/PendingUsers";

function App() {
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
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    window.location.reload();
    window.location.href = "/home";
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setRole(localStorage.getItem("role"));
  };

  return (
    <WishlistProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Public */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/room/:roomId" element={<RoomDetailPage />} />

          {/* Owner */}
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/my-listings" element={<MyListings />} />

          {/* Admin */}
          <Route path="/admin/all-users" element={<AllUsers />} />
          <Route path="/admin/all-rooms" element={<AllRooms />} />
          <Route path="/admin/all-owners" element={<AllOwner />} />
          <Route path="/admin/pending-users" element={<PendingUsers />} />
          <Route path="/admin/pending-approvals" element={<PendingOwners />} />
          <Route path="/admin/pending-rooms" element={<PendingRooms />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>

        <Footer />
      </Router>
    </WishlistProvider>
  );
}

export default App;
