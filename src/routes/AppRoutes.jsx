import { Navigate, Route } from "react-router-dom";

import Auth from "../components/Auth";
import OtpVerify from "../components/OtpVerify";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import SearchRoom from "../pages/user-page/SearchRoom";
import RoomDetailPage from "../pages/user-page/RoomDetailPage";
import Profile from "../pages/commen-pages/Profile";
import TermsAndService from "../pages/commen-pages/TermsAndService";
import PrivacyPolicy from "../pages/commen-pages/PrivacyPolicy";
import RefundPolicy from "../pages/commen-pages/RefundPolicy";
import HomePage from "../pages/commen-pages/HomePage"
import About from "../pages/commen-pages/AboutUs"
import Reports from "../pages/admin-page/Reports"
import BlogPage from "../pages/commen-pages/BlogPage";
import CareerPage from "../pages/commen-pages/CareerPage";
import Faqs from "../pages/commen-pages/Faqs";
import PremiumPage from "../pages/commen-pages/PremiumPage";
import HighInterestRooms from "../pages/admin-page/HighInterestRooms";
import AdminSupport from "../pages/admin-page/AdminSupport";
import RevenueReport from "../pages/admin-page/RevenueReport";
import AdminDashboard from "../pages/admin-page/AdminDashboard";
import OwnerUsersPage from "../pages/room-owner-page/OwnerUsersPage";
import MyListings from "../pages/room-owner-page/MyListings";
import AddRoom from "../pages/room-owner-page/AddRoom";
import NotifyRoom from "../pages/user-page/NotifyRoom";
import Wishlist from "../pages/user-page/Wishlist";

import Contact from "../pages/commen-pages/Contact"
import QuickSearchPage from "../pages/commen-pages/QuickSearchPage";
import AdminUsers from "../pages/admin-page/AdminUsers";
{/* Public */ }
const PublicRoutes = [
  <Route path="/" element={<HomePage />} />,
  <Route path="/home" element={<HomePage />} />,
  <Route path="/auth" element={<Auth />} />, // Yahan /login ko /auth kar de
  <Route path="/login" element={<Auth />} />,
  <Route path="/verify-otp" element={<OtpVerify />} />,
  <Route path="/forgot-password" element={<ForgotPassword />} />,
  <Route path="/reset-password" element={<ResetPassword />} />,
  <Route path="/search" element={<SearchRoom approved={true} />} />,
  <Route path="/room/:roomId" element={<RoomDetailPage />} />,
  <Route path="/quick-search/:searchInput" element={<QuickSearchPage />} />,

  <Route path="/about" element={<About />} />,
  <Route path="/profile" element={<Profile />} />,
  <Route path="/premium" element={<PremiumPage />} />,
];

{/* Footer & Support Pages */ }
const FooterRoutes = [<Route path="/terms" element={<TermsAndService />} />,
<Route path="/privacy" element={<PrivacyPolicy />} />,
<Route path="/refund" element={<RefundPolicy />} />,
<Route path="/contact" element={<Contact />} />,
<Route path="/blogs" element={<BlogPage />} />,
<Route path="/career" element={<CareerPage />} />,
<Route path="/faq" element={<Faqs />} />
]

{/* User */ }
const UserRoutes = [
  <Route path="/wishlist" element={<Wishlist />} />,
  <Route path="/notify_rooms" element={<NotifyRoom />} />,
  <Route path="*" element={<Navigate to="/home" />} />,
]


{/* Room-Owner */ }
const RoomOwnerRoutes = [
  <Route path="/add-room" element={<AddRoom />} />,
  <Route path="/my-listings" element={<MyListings />} />,
  <Route path="/owner/users" element={<OwnerUsersPage />} />,
  <Route path="*" element={<Navigate to="/home" />} />,
]


{/* Admin */ }
const AdminRoutes = [
  <Route path="/admin/dashboard" element={<AdminDashboard />} />,


  <Route path="/admin/pending-rooms" element={<SearchRoom approved={false} />} />,
  <Route path="/admin/search" element={<SearchRoom />} />,

  <Route path="/admin/all-users" element={<AdminUsers endPoint="allUsers" role="ROLE_USER" />} />,
  <Route path="/admin/all-owners" element={<AdminUsers endPoint="allUsers" role="ROLE_OWNER" />} />,
  <Route path="/admin/pending-users" element={<AdminUsers endPoint="pending" role="ROLE_USER" />} />,
  <Route path="/admin/pending-owners" element={<AdminUsers endPoint="pending" role="ROLE_OWNER" />} />,


  <Route path="/admin/reports" element={<Reports />} />,
  <Route path="/admin/revenue-report" element={<RevenueReport />} />,
  <Route path="/admin/support" element={<AdminSupport />} />,
  <Route path="/admin/high-interest" element={<HighInterestRooms />} />,
  <Route path="*" element={<Navigate to="/admin/dashboard" />} />,
]

export { PublicRoutes, AdminRoutes, FooterRoutes, UserRoutes, RoomOwnerRoutes };