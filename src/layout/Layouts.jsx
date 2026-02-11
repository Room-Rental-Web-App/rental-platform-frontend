import { Outlet } from "react-router-dom";
import Navbar from "../non-outlets/Navbar";
import Footer from "../non-outlets/Footer";
import AdminSidebar from "../non-outlets/AdminSidebar";
import { useEffect, useState } from "react";
import "../css/layout.css";

export default function UserLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  // 1. Naya state premium status ke liye
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    // 2. LocalStorage se premium check karo
    const premiumStatus = localStorage.getItem("isPremium") === "true";

    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole);
      setIsPremium(premiumStatus);
    }
  }, []);

  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setIsPremium(false); // Reset on logout
    window.location.href = "/home";
  };

  // Admin Layout
  if (role === "ROLE_ADMIN") {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    );
  }

  // User & Owner Layout
  return (
    <>
      {/* 3. Navbar ko isPremium prop pass kiya */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        isPremiumUser={isPremium}
      />
      <main className="page-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
