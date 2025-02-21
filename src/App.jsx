import Login from "./components/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import requireAuth from "./helpers/ProtectedRoute";
import ProtectedRoute from "./helpers/ProtectedRoute";

function App() {
  return (
    <Router>
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
