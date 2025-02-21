import Login from "./components/Login";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import requireAuth from "./helpers/ProtectedRoute";
import ProtectedRoute from "./helpers/ProtectedRoute";
const titles = {
  "/": "Login | Metrix",
  "/dashboard": "Dashboard | Metrix",
  "/signup": "Sign Up | Metrix",
  "/users": "Users | Metrix",
  "/products": "Products | Metrix",
  "/orders": "Orders | Metrix",
};
const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "Metrix";
  }, [location]);

  return null;
};
function App() {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<Users />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/orders" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
