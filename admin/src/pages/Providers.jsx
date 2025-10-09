import React, { useState } from "react";
import { Search, Eye, CheckCircle, X } from "lucide-react";

const Providers = () => {
  // --- Sample Data ---
  const providersData = [
    {
      id: "#tf9086",
      name: "Meera",
      category: "Cleaning",
      phone: "98657896",
      email: "meera.cleaning@example.com",
      status: "Active",
      jobs: 124,
      rating: 5,
      address: "123 Street, Delhi",
      joined: "10/09/2024",
      verified: true,
    },
    {
      id: "#tf9087",
      name: "Meera",
      category: "Repair",
      phone: "87654679",
      email: "meera.repair@example.com",
      status: "Pending",
      jobs: 56,
      rating: 4.5,
      address: "456 Avenue, Mumbai",
      joined: "22/07/2024",
      verified: false,
    },
    {
      id: "#tf9088",
      name: "Meera",
      category: "Gardening",
      phone: "77654688",
      email: "meera.garden@example.com",
      status: "Active",
      jobs: 98,
      rating: 4.9,
      address: "789 Park Road, Bangalore",
      joined: "03/06/2024",
      verified: true,
    },
    {
      id: "#tf9090",
      name: "Ravi",
      category: "Electrician",
      phone: "96547832",
      email: "ravi.elec@example.com",
      status: "Suspended",
      jobs: 43,
      rating: 4.2,
      address: "12 South Street, Pune",
      joined: "15/03/2024",
      verified: false,
    },
  ];

  // --- States ---
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState(null);

  // --- Filtering Logic (Dynamic Search + Status) ---
  const filteredProviders = providersData.filter((p) => {
    const matchesFilter = filter === "All" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // --- Status Color Function ---
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "Suspended":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-4">
        Service Providers
      </h2>

      {/* Search */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md p-2 mb-4 w-full sm:w-1/2 shadow-sm">
        <Search className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search by Name, ID, Phone, Email, or Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-gray-200"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Active", "Pending", "Suspended"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
              filter === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3 text-left">Provider ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Jobs Completed</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProviders.length > 0 ? (
              filteredProviders.map((p, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3">{p.id}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.phone}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3">{p.jobs}</td>
                  <td className="p-3">{p.rating}</td>
                  <td className="p-3">
                    {p.status === "Pending" ? (
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200 flex items-center gap-1">
                        <CheckCircle size={14} /> verify
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedProvider(p)}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 flex items-center gap-1"
                      >
                        <Eye size={14} /> view
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No providers found for your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View Details */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full sm:w-[450px] p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-4">
              Provider Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Provider ID:</span> {selectedProvider.id}</p>
              <p><span className="font-semibold">Name:</span> {selectedProvider.name}</p>
              <p><span className="font-semibold">Category:</span> {selectedProvider.category}</p>
              <p><span className="font-semibold">Phone:</span> {selectedProvider.phone}</p>
              <p><span className="font-semibold">Email:</span> {selectedProvider.email}</p>
              <p><span className="font-semibold">Address:</span> {selectedProvider.address}</p>
              <p><span className="font-semibold">Joined:</span> {selectedProvider.joined}</p>
              <p><span className="font-semibold">Jobs Completed:</span> {selectedProvider.jobs}</p>
              <p><span className="font-semibold">Rating:</span> ⭐ {selectedProvider.rating}</p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                    selectedProvider.status
                  )}`}
                >
                  {selectedProvider.status}
                </span>
              </p>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedProvider(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;
