import React from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-lg mb-2 font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="fixed top-16 left-0 w-56 h-75 bg-white dark:bg-gray-800 shadow-lg p-4">
      
      <nav>
        <NavLink to="/profile" end className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/profile/notifications" className={linkClasses}>
          Notifications
        </NavLink>
        <NavLink to="/profile/jobs" className={linkClasses}>
          Jobs
        </NavLink>
        <NavLink to="/profile/earnings" className={linkClasses}>
          Earnings
        </NavLink>
        <NavLink to="/profile/profiledetails" className={linkClasses}>
          Profiles
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
