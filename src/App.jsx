import Login from "./components/Login";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Users from "./components/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<SignUp />} />
        <Route path="/orders" element={<SignUp />} />
        <Route path="/logout" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
