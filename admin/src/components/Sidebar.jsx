import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Briefcase,
  DollarSign,
  Bell,
  LifeBuoy,
  Settings,
  UserCog,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Users", path: "/users", icon: Users },
    { name: "Providers", path: "/providers", icon: UserCog },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Finance", path: "/finance", icon: DollarSign },
    { name: "Notification", path: "/notification", icon: Bell },
    { name: "Support", path: "/support", icon: LifeBuoy },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
      <h2 className="text-xl font-bold text-blue-700 mb-8 text-center">
        Kaam Mitra
      </h2>
      <nav className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
