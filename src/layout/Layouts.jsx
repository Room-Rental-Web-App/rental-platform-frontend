import { Outlet } from "react-router-dom";
import Navbar from "../non-outlets/Navbar";
import Footer from "../non-outlets/Footer";
import AdminSidebar from "../non-outlets/AdminSidebar";
import { useEffect, useState } from "react";
import "../CSS/layout.css";

export default function UserLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const premiumStatus =
      localStorage.getItem("isPremium") === "true";

    if (token) {
      setIsLoggedIn(true);
      setRole(savedRole);
      setIsPremium(premiumStatus);
    }
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?"))
      return;

    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setIsPremium(false);
    window.location.href = "/";
  };

  

  /* =============================
     ADMIN LAYOUT
  ============================== */

  if (role === "ROLE_ADMIN") {
    return (
      <div className="admin-layout">
        <AdminSidebar onLogout={handleLogout} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    );
  }

  /* =============================
     USER / OWNER LAYOUT
  ============================== */

  return (
    <>
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
