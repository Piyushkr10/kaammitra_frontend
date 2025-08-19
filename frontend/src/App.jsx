import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import TokenPayment from "./pages/TokenPayment"; // ✅ Import the new component

export default function App() {
  // Application-wide state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ toggle state

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Toggle navbar/home menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Popup helper
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  // Handles successful login/signup
  const handleAuthComplete = (name, image, message) => {
    setUserName(name);
    setProfileImage(image);
    setIsLoggedIn(true);
    triggerPopup(message);
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setProfileImage("");
    triggerPopup("You have been logged out!");
  };

  // Emergency button click
  const handleEmergencyClick = () => {
    triggerPopup("🚨 Emergency service requested! We're on our way.");
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
          toggleMenu={toggleMenu} // ✅ pass toggle state
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
                toggleMenu={toggleMenu} // ✅ pass toggle state
              />
            }
          />
          <Route path="/moreservices" element={<MoreServices />} />
          <Route path="/book-history" element={<MyBookingHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/service/:serviceName" element={<ServiceDetail />} />
          <Route
            path="/signup"
            element={
              <SignUp
                onRegistrationComplete={(name, image) =>
                  handleAuthComplete(name, image, "Registration Completed!")
                }
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onLoginComplete={(name, image) =>
                  handleAuthComplete(name, image, "Login Successful!")
                }
              />
            }
          />
          <Route path="/booking/:serviceName" element={<BookingPage darkMode={darkMode} />} /> {/* ✅ Pass darkMode prop */}
          <Route path="/logout" element={<LogOut onLogout={handleLogout} />} />
          {/* ✅ Add the new route for TokenPayment */}
          <Route path="/payment" element={<TokenPayment darkMode={darkMode} />} />
        </Routes>
        <Footer darkMode={darkMode} />
      </Router>
    </div>
  );
}