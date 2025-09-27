import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle, FaHome, FaTools } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-gray-200 dark:bg-gray-900 shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-10 w-auto" src="logo.png" alt="Logo" />
          </div>

          {/* Middle Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-blue-800 dark:text-white hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <div className="relative group">
              <button className="text-blue-800 dark:text-white hover:text-blue-600 font-medium flex items-center">
                Services <span className="ml-1">▾</span>
              </button>
              {/* Dropdown with Icons */}
              <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg mt-2 rounded-md w-44">
                <a
                  href="/"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaHome className="mr-2 text-blue-600" />
                  Home Services
                </a>
                <a
                  href="/"
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaTools className="mr-2 text-blue-600" />
                  Repair Services
                </a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <select className="px-3 py-1 rounded-md border border-gray-300 bg-gray-700 text-white text-sm font-medium focus:outline-none">
              <option>English</option>
              <option>हिन्दी</option>
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full shadow hover:opacity-90 transition-colors duration-300 ${
                darkMode
                  ? "bg-blue-400 text-white"
                  : "bg-white text-blue-700"
              }`}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

           <Link to="/profile"> {/* Use Link instead of button */}
  <button className="p-2 rounded-full bg-white text-blue-700 shadow hover:bg-gray-100">
    <FaUserCircle size={20} />
  </button>
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
