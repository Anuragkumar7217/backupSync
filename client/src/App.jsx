import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Calendar from "./components/Calendar.jsx";

export default function App() {
  // You can dynamically get userRole later from context or localStorage
  const userRole = "admin"; // Change to "user" if needed
  
  // const currentPath = window.location.pathname;
  // const showHeader = currentPath !== "/" && currentPath !== "/register";

  return (
    <Router>
      {/* {showHeader && <Header />} */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/calendar" element={<Calendar userRole={userRole} />} />
        </Routes>
    </Router>
  );
}
