import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, User } from "lucide-react";

const SERVICES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Cleaning",
  "Painting",
  "Gardening",
  "AC Repair",
  "Cooking",
  "Photography",
  "Beauty Services",
  "More...",
];

export default function Navbar({
  isLoggedIn,
  userName,
  profileImage,
  darkMode,
  toggleDarkMode,
}) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  // Hide navbar links on login/signup pages
  const hideNavItems = location.pathname === "/login" || location.pathname === "/signup";

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-300 text-blue-700"
      } shadow sticky top-0 z-50`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="KaamMitra" className="h-10 w-20" />
        </Link>

        {/* Right Side (Nav Links + Language + Dark Mode) */}
        <div className="flex items-center gap-6">
          {!hideNavItems && (
            <nav className="flex items-center gap-6 relative">
              <Link to="/" className="font-medium">
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 font-medium">
                  Services <ChevronDown size={16} />
                </button>
                {servicesOpen && (
                  <div
                    className={`absolute top-full mt-1 rounded-md shadow-lg w-56 z-50 ${
                      darkMode ? "bg-gray-900 text-white" : "bg-white"
                    }`}
                  >
                    {SERVICES.slice(0, 10).map((name) => (
                      <Link
                        key={name}
                        to={`/service/${encodeURIComponent(name)}`}
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setServicesOpen(false)}
                      >
                        {name}
                      </Link>
                    ))}
                    <Link
                      to="/moreservices"
                      className="block px-4 py-2 font-semibold hover:bg-gray-200 border-t"
                      onClick={() => setServicesOpen(false)}
                    >
                      See more →
                    </Link>
                  </div>
                )}
              </div>

              {/* Conditional Profile / Signup */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200">
                        <User size={18} className="text-gray-600" />
                      </div>
                    )}
                    <span className="font-medium">{userName}</span>
                    <ChevronDown size={16} />
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                        darkMode ? "bg-gray-900 text-white" : "bg-white"
                      }`}
                    >
                      <Link
                        to="/book-history"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Book History
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-red-600 font-medium hover:bg-gray-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        LogOut
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                >
                  Sign Up
                </Link>
              )}
            </nav>
          )}

          {/* Language Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1 font-medium">
              English <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div
                className={`absolute top-full mt-1 w-32 rounded-md shadow-lg z-50 ${
                  darkMode ? "bg-gray-900 text-white" : "bg-white"
                }`}
              >
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Hindi
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Bengali
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-blue-700"
            } p-2 rounded-full hover:opacity-80`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
