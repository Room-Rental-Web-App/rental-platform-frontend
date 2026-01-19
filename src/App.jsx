
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./non-outlets/Navbar";
import Footer from "./non-outlets/Footer";
import Login from "./components/Auth";
import { WishlistProvider } from "./context/WishlistContext";
// Legal Pages
import TermsAndService from "./pages/commen-pages/TermsAndService"; 
import PrivacyPolicy from "./pages/commen-pages/PrivacyPolicy";
import RefundPolicy from "./pages/commen-pages/RefundPolicy";
import About from "./pages/commen-pages/AboutUs"
import Contact from "./pages/commen-pages/Contact";
import HomePage from "./pages/commen-pages/HomePage";
import Profile from "./pages/commen-pages/Profile";
// import ContactUs from "./pages/ContactUs";

// Owner
import AddRoom from "./pages/room-owner-page/AddRoom";
import MyListings from "./pages/room-owner-page/MyListings";


// User
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
import Reports from "./pages/admin-page/Reports";

import Layout from "./layout/Layouts"
import AdminDashboard from "./pages/admin-page/AdminDashboard";
import PremiumPage from "./pages/commen-pages/PremiumPage";
import Auth from "./components/Auth";
import OtpVerify from "./components/OtpVerify";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* Public */}
            <Route path="/login" element={<Auth />} />
            <Route path="/verify-otp" element={<OtpVerify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />



            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchRoom />} />
            <Route path="/room/:roomId" element={<RoomDetailPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />

            {/* Footer & Support Pages */}
            <Route path="/terms" element={<TermsAndService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact/>} />

            {/* User */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Room-Owner */}
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/my-listings" element={<MyListings />} />

            <Route path="/premium" element={<PremiumPage />} />

            {/* Admin */}

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/all-users" element={<AllUsers />} />
            <Route path="/admin/all-rooms" element={<AllRooms />} />
            <Route path="/admin/all-owners" element={<AllOwner />} />
            <Route path="/admin/pending-users" element={<PendingUsers />} />
            <Route
              path="/admin/pending-approvals"
              element={<PendingOwners />}
            />
            <Route path="/admin/pending-rooms" element={<PendingRooms />} />
            <Route path="/admin/reports" element={<Reports />} />
            {/* Fallback */}
          </Route>

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
