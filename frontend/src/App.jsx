import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Import your i18n configuration

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import Home from "./pages/Home";
import MoreServices from "./pages/MoreServices";
import ServiceDetail from "./pages/ServiceDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import BookingPage from "./pages/BookingPage";
import MyBookingHistory from "./pages/MyBookingHistory";
import Settings from "./pages/Settings";
import LogOut from "./pages/LogOut";
import TokenPayment from "./pages/TokenPayment";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleAuthComplete = (name, image, message) => {
    setUserName(name);
    setProfileImage(image);
    setIsLoggedIn(true);
    triggerPopup(message);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setProfileImage("");
    triggerPopup("You have been logged out!");
  };

  const handleEmergencyClick = () => {
    triggerPopup("🚨 Emergency service requested! We're on our way.");
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/signup" replace />;
    }
    return children;
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen font-sans transition-colors duration-300">
        <Router>
          <Navbar
            isLoggedIn={isLoggedIn}
            userName={userName}
            profileImage={profileImage}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
          />

          {showPopup && <Popup message={popupMessage} />}

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  darkMode={darkMode}
                  handleEmergencyClick={handleEmergencyClick}
                  userName={userName}
                  menuOpen={menuOpen}
                  toggleMenu={toggleMenu}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path="/signup" element={<SignUp onRegistrationComplete={handleAuthComplete} />} />
            <Route path="/login" element={<Login onLoginComplete={handleAuthComplete} />} />
            <Route path="/logout" element={<LogOut onLogout={handleLogout} />} />

            {/* Protected Routes */}
            <Route
              path="/moreservices"
              element={
                <ProtectedRoute>
                  <MoreServices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-history"
              element={
                <ProtectedRoute>
                  <MyBookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service/:serviceName"
              element={
                <ProtectedRoute>
                  <ServiceDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:serviceName"
              element={
                <ProtectedRoute>
                  <BookingPage darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <TokenPayment darkMode={darkMode} />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer darkMode={darkMode} />
        </Router>
      </div>
    </I18nextProvider>
  );
}