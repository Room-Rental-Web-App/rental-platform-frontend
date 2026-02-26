import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import React from "react";
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

function AppContent() {
  const location = useLocation();
  const [role, setRole] = React.useState(localStorage.getItem("role"));

  React.useEffect(() => {
    const currentRole = localStorage.getItem("role");
    if (currentRole !== role) {
      setRole(currentRole);
    }
  }, [location]); // re-check role when route changes

  return (
    <WishlistProvider>
      <ScrollToTop />
      <Routes location={location} key={location.key}>
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;