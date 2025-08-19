import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
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

  // ✅ Protected Route → redirects to signup if not logged in
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/signup" replace />;
    }
    return children;
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-black text-white min-h-screen"
          : "bg-white text-blue-700 min-h-screen"
      } font-sans`}
    >
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
  );
}
