import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import {
  PublicRoutes,
  AdminRoutes,
  FooterRoutes,
  UserRoutes,
  RoomOwnerRoutes
} from "./routes/AppRoutes";
import Layout from "./layout/Layouts";
import Homepage from "./pages/commen-pages/HomePage";

function App() {
  const role = localStorage.getItem("role"); // ROLE_OWNER | ROLE_USER |  ROLE_ADMIN | null


  return (
    <Router>
      <WishlistProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={role === "ROLE_ADMIN" ? <Navigate to="/admin/dashboard" /> : <Homepage />} />
            {PublicRoutes}
            {role !== "ROLE_ADMIN" && FooterRoutes}
            {role === "ROLE_USER" && UserRoutes}
            {role === "ROLE_OWNER" && RoomOwnerRoutes}
            {role === "ROLE_ADMIN" && AdminRoutes}
          </Route>

        </Routes>
      </WishlistProvider>
    </Router>
  );
}

export default App;
