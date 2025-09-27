import React from "react";
import { StarFill } from 'react-bootstrap-icons'; // Assuming you have an icon library like 'react-bootstrap-icons' or 'react-icons' for the star

// A simple component for the stat cards
const StatCard = ({ title, value, isCurrency = false }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    {isCurrency ? (
      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Rs {value.toLocaleString('en-IN')}
      </p>
    ) : (
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
    )}
  </div>
);

// Placeholder component for the Earnings Graph - In a real app, this would use a charting library like Chart.js or Recharts
const EarningsGraph = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 col-span-2">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Earnings</h3>
    {/* Simple line graph representation - replace with a charting library component in a real app */}
    <div className="h-64 flex flex-col justify-end relative">
      <svg className="w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="none">
        {/* Y-axis labels and lines */}
        {[10, 20, 30, 40].map((level, index) => (
          <g key={level}>
            <text x="0" y={230 - (level * 5)} className="text-xs fill-gray-500 dark:fill-gray-400">{level}</text>
            <line x1="20" y1={230 - (level * 5)} x2="500" y2={230 - (level * 5)} stroke="#e5e7eb" strokeDasharray="5,5" />
          </g>
        ))}
        {/* X-axis labels (Placeholder for Items 1-5) */}
        {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((label, index) => (
            <text key={label} x={30 + (index * 100)} y="245" className="text-xs fill-gray-500 dark:fill-gray-400 text-center">{label}</text>
        ))}
        
        {/* Data points and line (Values approximate from image: 18, 27, 23, 35, 37) */}
        <polyline
          fill="none"
          stroke="#3b82f6" // blue-500
          strokeWidth="3"
          points="20,140 120,105 220,125 320,65 420,55" // Approximate coordinates based on the 10-40 scale.
          transform="translate(0, -20)" // Shift up slightly to fit better
        />
        {/* Circles for data points */}
        <circle cx="20" cy="140" r="4" fill="#3b82f6" transform="translate(0, -20)" />
        <circle cx="120" cy="105" r="4" fill="#3b82f6" transform="translate(0, -20)" />
        <circle cx="220" cy="125" r="4" fill="#3b82f6" transform="translate(0, -20)" />
        <circle cx="320" cy="65" r="4" fill="#3b82f6" transform="translate(0, -20)" />
        <circle cx="420" cy="55" r="4" fill="#3b82f6" transform="translate(0, -20)" />
        
      </svg>
    </div>
  </div>
);

// Component for Overall Ratings
const OverallRatings = ({ rating }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center h-full">
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Overall Ratings</p>
    <div className="flex items-center space-x-2">
      <StarFill className="text-4xl text-yellow-500" /> {/* Icon */}
      <p className="text-5xl font-bold text-gray-900 dark:text-white">{rating}</p>
    </div>
  </div>
);

// Component for Quick Actions
const QuickActions = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col space-y-3 h-full">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Quick actions</h3>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-150 ease-in-out">
      Accept new job
    </button>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-150 ease-in-out">
      Add services
    </button>
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-150 ease-in-out">
      Withdraw Earnings
    </button>
  </div>
);

// Main Dashboard Component
const ProfileDashboard = () => {
  return (
    // Main content area wrapper, adjusting for a typical dashboard layout
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      
      {/* Provider Name and Profile Status - Top Bar Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Provider name</h2>
          <span className="text-green-500">✓</span> {/* Checkmark */}
          <span className="bg-gray-300 dark:bg-gray-600 text-xs text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full font-medium">
            complete profile
          </span>
        </div>
        
        {/* Icons (Bell for notifications, Moon/Sun for theme, User) - Placeholder icons used */}
        <div className="flex space-x-4 items-center">
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
           
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Row 1: Stat Cards */}
        <StatCard title="Pending Requests" value={8} />
        <StatCard title="Active jobs" value={3} />
        <StatCard title="Total Income" value={1589} isCurrency={true} />
        
        {/* Row 2: Earnings Graph and Ratings/Quick Actions */}
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {/* Earnings Graph takes 2/3 width */}
          <EarningsGraph />
          
          {/* Ratings and Quick Actions take 1/3 width, stacked vertically */}
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