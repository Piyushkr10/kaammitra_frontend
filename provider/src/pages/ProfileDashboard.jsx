import React, { useState } from "react";
import { StarFill } from "react-bootstrap-icons";
import ProfileJobs from "./Profilejobs"; // Import the jobs component

// ---- Stat Card ----
const StatCard = ({ title, value, isCurrency = false, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition"
  >
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    {isCurrency ? (
      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Rs {value.toLocaleString("en-IN")}
      </p>
    ) : (
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
    )}
  </div>
);

// ---- Earnings Graph (Placeholder) ----
const EarningsGraph = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 col-span-2">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Earnings</h3>
    <div className="h-64 flex flex-col justify-end relative">
      <svg className="w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="none">
        {[10, 20, 30, 40].map((level) => (
          <g key={level}>
            <text x="0" y={230 - level * 5} className="text-xs fill-gray-500 dark:fill-gray-400">
              {level}
            </text>
            <line x1="20" y1={230 - level * 5} x2="500" y2={230 - level * 5} stroke="#e5e7eb" strokeDasharray="5,5" />
          </g>
        ))}
        <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points="20,140 120,105 220,125 320,65 420,55" transform="translate(0, -20)" />
      </svg>
    </div>
  </div>
);

// ---- Overall Ratings ----
const OverallRatings = ({ rating }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center h-full">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Overall Ratings</p>
    <div className="flex items-center space-x-2">
      <StarFill className="text-4xl text-yellow-500" />
      <p className="text-5xl font-bold text-gray-900 dark:text-white">{rating}</p>
    </div>
  </div>
);

// ---- Quick Actions ----
const QuickActions = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col space-y-3 h-full">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Quick actions</h3>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition">Accept new job</button>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition">Add services</button>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition">Withdraw Earnings</button>
  </div>
);

// ---- Main Dashboard ----
const ProfileDashboard = () => {
  const [showJobs, setShowJobs] = useState(null); // "Active Jobs" or "Pending Requests"
  const [counts, setCounts] = useState({ active: 0, pending: 0 }); // Dynamic counts

  if (showJobs) {
    return (
      <ProfileJobs
        defaultTab={showJobs}
        onBack={() => setShowJobs(null)}
        onCountsUpdate={setCounts} // Update counts dynamically
      />
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Provider name</h2>
          <span className="text-green-500">✓</span>
          <span className="bg-gray-300 dark:bg-gray-600 text-xs text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full font-medium">
            complete profile
          </span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Stat Cards */}
        <StatCard title="Pending Requests" value={counts.pending} onClick={() => setShowJobs("Pending Requests")} />
        <StatCard title="Active jobs" value={counts.active} onClick={() => setShowJobs("Active Jobs")} />
        <StatCard title="Total Income" value={1589} isCurrency={true} />

        {/* Earnings + Right Column */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          <EarningsGraph />
          <div className="col-span-1 flex flex-col space-y-6">
            <OverallRatings rating={3} />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
