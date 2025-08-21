import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Moon, Sun, User, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

// Assuming these are the services you want to display
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
  menuOpen,
  toggleMenu,
}) {
  const { t, i18n } = useTranslation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Create refs for each dropdown
  const servicesRef = useRef(null);
  const langRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  const hideNavItems =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target)
      ) {
        setServicesOpen(false);
      }
      if (
        langRef.current &&
        !langRef.current.contains(event.target)
      ) {
        setLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleScrollClose() {
      if (servicesOpen || langOpen || profileOpen) {
        setServicesOpen(false);
        setLangOpen(false);
        setProfileOpen(false);
      }
    }

    // Add event listeners for both outside clicks and scrolling
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollClose);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollClose);
    };
  }, [servicesOpen, langOpen, profileOpen]); // Dependency array to re-run effect when state changes

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const getLanguageName = (code) => {
    switch (code) {
      case "en":
        return "English";
      case "hi":
        return "Hindi";
      case "bn":
        return "Bengali";
      default:
        return "Language";
    }
  };

  return (
    <header
      className="bg-gray-300 text-blue-700 dark:bg-gray-900 dark:text-white
                     shadow sticky top-0 z-50 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo and Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img
              src={darkMode ? "/logo2.png" : "/logo.png"}
              alt="KaamMitra"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {!hideNavItems && (
            <nav className="flex items-center gap-6 relative">
              <Link to="/" className="font-medium">
                {t("home")}
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  className="flex items-center gap-1 font-medium"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {t("services")} <ChevronDown size={16} />
                </button>
                {servicesOpen && (
                  <div
                    className="absolute top-full mt-1 rounded-md shadow-lg w-56 z-50
                                 bg-white dark:bg-gray-800"
                  >
                    {SERVICES.slice(0, 10).map((name) => (
                      <Link
                        key={name}
                        to={`/service/${encodeURIComponent(name)}`}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {name}
                      </Link>
                    ))}
                    <Link
                      to="/moreservices"
                      className="block px-4 py-2 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 border-t transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {t("see_more")}
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
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-200 dark:bg-gray-700">
                        <User size={18} className="text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                    <span className="font-medium">{userName}</span>
                    <ChevronDown size={16} />
                  </button>

                  {profileOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50
                                 bg-white dark:bg-gray-800"
                    >
                      <Link
                        to="/book-history"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("my_book_history")}
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("settings")}
                      </Link>
                      <Link
                        to="/logout"
                        className="block px-4 py-2 text-red-600 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        {t("logout")}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition-colors"
                >
                  {t("signup")}
                </Link>
              )}
            </nav>
          )}

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1 font-medium"
              onClick={() => setLangOpen(!langOpen)}
            >
              {getLanguageName(i18n.language)} <ChevronDown size={16} />
            </button>
            {langOpen && (
              <div
                className="absolute top-full mt-1 w-32 rounded-md shadow-lg z-50
                                 bg-white dark:bg-gray-800"
              >
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("hi")}
                >
                  Hindi
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => changeLanguage("bn")}
                >
                  Bengali
                </button>
              </div>
            )}
          </div>

          {/* Toggle Button (light/dark mode switch) */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:opacity-80 transition-colors
                                bg-gray-200 text-blue-700 dark:bg-gray-800 dark:text-white"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}