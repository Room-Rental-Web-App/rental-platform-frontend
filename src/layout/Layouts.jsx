import { Outlet } from "react-router-dom";
import Navbar from "../non-outlets/Navbar";
import Footer from "../non-outlets/Footer";
import AdminSidebar from "../pages/admin-page/AdminSidebar"
import { useEffect, useState } from "react";
import "../css/layout.css";
export default function UserLayout() {
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
        if (!confirm("Are you sure you want to logout?")) {
            return;
        }
        localStorage.clear();
        setIsLoggedIn(false);
        setRole(null);
        window.location.reload();
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
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main className="page-container">
                <Outlet />
            </main>
            <Footer />
        </>
    );

}
