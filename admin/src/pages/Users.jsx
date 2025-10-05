import React, { useState } from "react";
import { Bell, Moon, User, Search } from "lucide-react";

const Users = () => {
  const [filter, setFilter] = useState("Active Jobs");
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "Meera", phone: "98657896", status: "Activate", date: "01/8/2025", actions: 12, image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Asha", phone: "87654679", status: "Activate", date: "01/8/2025", actions: 6, image: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Neha", phone: "77654688", status: "Suspended", date: "02/8/2025", actions: 9, image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "Priya", phone: "67864378", status: "Activate", date: "03/8/2025", actions: 15, image: "https://randomuser.me/api/portraits/women/4.jpg" },
  ];

  const stats = [
    { title: "Total Users", value: "1,868" },
    { title: "Active Users", value: "678" },
    { title: "Suspended Users", value: "56" },
    { title: "New Signups", value: "67" },
  ];

  const filters = ["Active Jobs", "Suspended", "New", "High Rating", "Low Rating"];

  // ✅ Filter users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Users</h1>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 cursor-pointer" />
          <Moon className="w-5 h-5 cursor-pointer" />
          <User className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
        <Search className="w-5 h-5 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search by name, ID, phone, or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-transparent outline-none ml-2"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center"
          >
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </h3>
            <p className="text-xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Reg Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        user.status === "Activate"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{user.date}</td>
                  <td className="px-4 py-3">{user.actions}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No users found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
