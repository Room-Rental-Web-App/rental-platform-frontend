import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import {
  PublicRoutes,
  AdminRoutes,
  FooterRoutes,
  UserRoutes,
  RoomOwnerRoutes
} from "./routs/AppRoutes";
import Layout from "./layout/Layouts";

function App() {
  const role = localStorage.getItem("role"); // ROLE_OWNER | ROLE_USER |  ROLE_ADMIN | null


  return (
    <Router>
      <WishlistProvider>
        <Routes>
          <Route element={<Layout />}>
            {PublicRoutes}
            {FooterRoutes}
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
