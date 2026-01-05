import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./non-outlets/Navbar";
import Login from "./components/Login";
import { WishlistProvider } from "./context/WishlistContext";

// New Premium Pages
import PremiumPlans from "./pages/user-page/PremiumPlans";
import PremiumDocumentation from "./pages/user-page/PremiumDocumentation";
import AdminPremiumControl from "./pages/admin-page/AdminPremiumControl";

// Existing Imports...
import AddRoom from "./pages/room-owner-page/AddRoom";
import MyListings from "./pages/room-owner-page/MyListings";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import SearchRoom from "./pages/user-page/SearchRoom";
import Wishlist from "./pages/user-page/Wishlist";
import RoomDetailPage from "./pages/user-page/RoomDetailPage";
import AllUsers from "./pages/admin-page/AllUsers";
import AllRooms from "./pages/admin-page/AllRooms";
import AllOwner from "./pages/admin-page/AllOwners";
import PendingOwners from "./pages/admin-page/PendingOwners";
import PendingRooms from "./pages/admin-page/PendingRooms";

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
          {/* Public */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/premium" element={<PremiumPlans />} />
          <Route path="/premium-docs" element={<PremiumDocumentation />} />

          {/* Protected - Wishlist & Detail */}
          <Route
            path="/wishlist"
            element={isLoggedIn ? <Wishlist /> : <Navigate to="/login" />}
          />
          <Route path="/room/:roomId" element={<RoomDetailPage />} />

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

          {/* Owner */}
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

          {/* Admin */}
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
            path="/admin/premium-control"
            element={
              isLoggedIn && role === "ROLE_ADMIN" ? (
                <AdminPremiumControl />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* ... existing admin routes ... */}
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
          <Route
            path="/admin/pending-rooms"
            element={
              isLoggedIn && role === "ROLE_ADMIN" ? (
                <PendingRooms />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
          />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
