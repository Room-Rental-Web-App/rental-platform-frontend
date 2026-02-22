import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
window.useState = React.useState;
window.useEffect = React.useEffect;
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
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Role ko state mein rakho taaki login ke baad React ko pata chale
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Ye effect check karega ki role update hua ya nahi
  useEffect(() => {
    const currentRole = localStorage.getItem("role");
    if (currentRole !== role) {
      setRole(currentRole);
    }
  }, []);
  return (
    <Router>
      <WishlistProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                role === "ROLE_ADMIN" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Homepage />
                )
              }
            />
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
