import React from "react";
import { Users, Briefcase, DollarSign, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Customers", value: "1,868", icon: Users },
    { title: "Total Providers", value: "1,868", icon: CheckCircle },
    { title: "Active Jobs", value: "566", icon: Briefcase },
    { title: "Monthly Revenue", value: "Rs 2,76,567", icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4"
            >
              <Icon className="text-blue-600" size={30} />
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {item.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section (Placeholder) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Revenue Growth</h2>
        <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500">
          [Graph Placeholder]
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Recent Activity</h2>
          <p>Harsh signed up a new account</p>
          <p>Seema booked a new job</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add Service
            </button>
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Approve Provider
            </button>
            <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Resolve Complaint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
