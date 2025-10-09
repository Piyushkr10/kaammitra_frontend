import React, { useState } from "react";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  const jobsData = [
    { id: "#tf9086", customer: "Meera", provider: "Sam", category: "Cleaning", status: "Active", date: "01/10/2025" },
    { id: "#tf9087", customer: "Meera", provider: "Sam", category: "Repair", status: "Pending", date: "01/10/2025" },
    { id: "#tf9088", customer: "Meera", provider: "Sam", category: "Gardening", status: "Completed", date: "10/10/2025" },
  ];

  const filteredJobs = jobsData.filter((j) => {
    const matchesSearch =
      j.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || j.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Jobs / Bookings</h2>
      <input
        type="text"
        placeholder="Search by Job ID, customer or provider"
        className="w-full md:w-1/2 p-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-gray-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {["All", "Active", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-2">Job ID</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((j, index) => (
              <tr key={index} className="border-t dark:border-gray-600">
                <td className="p-2">{j.id}</td>
                <td className="p-2">{j.customer}</td>
                <td className="p-2">{j.provider}</td>
                <td className="p-2">{j.category}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      j.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : j.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {j.status}
                  </span>
                </td>
                <td className="p-2">{j.date}</td>
                <td className="p-2">
                  <button
                    onClick={() => setSelectedJob(j)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96 relative">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Job Details</h3>
            <p><strong>ID:</strong> {selectedJob.id}</p>
            <p><strong>Customer:</strong> {selectedJob.customer}</p>
            <p><strong>Provider:</strong> {selectedJob.provider}</p>
            <p><strong>Category:</strong> {selectedJob.category}</p>
            <p><strong>Status:</strong> {selectedJob.status}</p>
            <p><strong>Date:</strong> {selectedJob.date}</p>
            <button
              onClick={() => setSelectedJob(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
