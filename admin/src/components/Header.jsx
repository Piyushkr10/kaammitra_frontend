import React from "react";
import { Bell, Moon, Sun, User } from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer text-gray-700 dark:text-gray-200" />
        {darkMode ? (
          <Sun
            onClick={() => setDarkMode(false)}
            className="cursor-pointer text-yellow-400"
          />
        ) : (
          <Moon
            onClick={() => setDarkMode(true)}
            className="cursor-pointer text-gray-700"
          />
        )}
        <User className="cursor-pointer text-blue-600" />
      </div>
    </header>
  );
};

export default Header;
