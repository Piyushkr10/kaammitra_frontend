import React, { useState, useEffect } from "react";

// Avatar Placeholder
const AvatarPlaceholder = ({ name }) => (
  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 text-lg font-semibold border-2 border-gray-300">
    {name ? name[0] : "U"}
  </div>
);

// Job Card Component
const JobCard = ({ job, onClick }) => {
  let buttonText;
  let buttonColorClass;

  switch (job.status) {
    case "Active Job":
      buttonText = "Active Job";
      buttonColorClass = "bg-blue-600 hover:bg-blue-700";
      break;
    case "Decline":
      buttonText = "Decline";
      buttonColorClass = "bg-red-600 hover:bg-red-700";
      break;
    case "Completed":
      buttonText = "Completed";
      buttonColorClass = "bg-green-600 hover:bg-green-700";
      break;
    case "Pending Job":
      buttonText = "Pending Job";
      buttonColorClass = "bg-yellow-600 hover:bg-yellow-700";
      break;
    case "Accepted":
      buttonText = "Accepted";
      buttonColorClass = "bg-purple-600 hover:bg-purple-700";
      break;
    default:
      buttonText = "View";
      buttonColorClass = "bg-gray-500 hover:bg-gray-600";
  }

  return (
    <div
      onClick={() => onClick(job)}
      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition"
    >
      {/* Avatar */}
      <div className="flex items-center w-64 min-w-0">
        <AvatarPlaceholder name={job.userName} />
        <div className="ml-4 truncate">
          <p className="font-semibold text-gray-900 dark:text-white truncate">{job.userName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{job.location}</p>
        </div>
      </div>

      {/* Service and Date */}
      <div className="flex-1 min-w-0 px-4">
        <p className="font-medium text-gray-900 dark:text-white truncate">{job.service}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{job.dateTime}</p>
      </div>

      {/* Prices */}
      <div className="w-20 text-center px-2">
        <p className="font-semibold text-gray-700 dark:text-gray-300">{job.price1}</p>
      </div>
      <div className="w-20 text-center px-2">
        <p className="font-semibold text-gray-700 dark:text-gray-300">{job.price2}</p>
      </div>

      {/* Button */}
      <div className="w-32 ml-4">
        <button
          className={`w-full text-white font-medium py-2 px-3 rounded-md text-sm transition duration-150 ${buttonColorClass}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Modal Component for Job Details
const JobDetailsModal = ({ job, onClose, onAction }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          ✖
        </button>

        {/* Job Details */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Job Details
        </h2>
        <p><strong>Name:</strong> {job.userName}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Service:</strong> {job.service}</p>
        <p><strong>Date & Time:</strong> {job.dateTime}</p>
        <p><strong>Price Range:</strong> {job.price1} - {job.price2}</p>
        <p><strong>Status:</strong> {job.status}</p>

        {/* Actions */}
        <div className="mt-4 space-y-2">
          {job.status === "Active Job" && (
            <button
              onClick={() => onAction(job, "Accepted")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              Accept Job
            </button>
          )}
          {job.status === "Pending Job" && (
            <div className="flex gap-2">
              <button
                onClick={() => onAction(job, "Accepted")}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => onAction(job, "Decline")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
              >
                Decline
              </button>
            </div>
          )}
          {job.status === "Completed" && (
            <p className="text-green-600 font-medium">✅ This job is completed.</p>
          )}
          {job.status === "Decline" && (
            <p className="text-red-600 font-medium">❌ This job was declined.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const ProfileJobs = ({ defaultTab = "Active Jobs", onBack, onCountsUpdate }) => {
  const [jobList, setJobList] = useState([
    { userName: "Meera", location: "Delhi", service: "AC Repair", dateTime: "10 Nov, 2025 - 10:00 am", price1: 300, price2: 1200, status: "Active Job" },
    { userName: "Raj", location: "Delhi", service: "Fridge Repair", dateTime: "11 Nov, 2025 - 2:00 pm", price1: 400, price2: 1500, status: "Pending Job" },
    { userName: "Aman", location: "Delhi", service: "Washing Machine", dateTime: "12 Nov, 2025 - 4:00 pm", price1: 500, price2: 1800, status: "Completed" },
  ]);

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedJob, setSelectedJob] = useState(null);

  const tabs = ["Active Jobs", "Pending Requests", "Completed Jobs", "Cancelled Jobs"];
  const tabStatusMap = {
    "Active Jobs": "Active Job",
    "Pending Requests": "Pending Job",
    "Completed Jobs": "Completed",
    "Cancelled Jobs": "Decline",
  };

  const filteredJobs = jobList.filter((job) => job.status === tabStatusMap[activeTab]);

  // Update counts in dashboard
  useEffect(() => {
    if (onCountsUpdate) {
      onCountsUpdate({
        active: jobList.filter((j) => j.status === "Active Job").length,
        pending: jobList.filter((j) => j.status === "Pending Job").length,
      });
    }
  }, [jobList, onCountsUpdate]);

  const handleJobAction = (jobToUpdate, newStatus) => {
    setJobList((prev) =>
      prev.map((job) =>
        job === jobToUpdate ? { ...job, status: newStatus } : job
      )
    );
    setSelectedJob(null);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded"
        >
          ← Back to Dashboard
        </button>
      )}

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-lg font-medium text-sm transition duration-150 ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, i) => (
            <JobCard key={i} job={job} onClick={setSelectedJob} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No jobs found for {activeTab}
          </p>
        )}
      </div>

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onAction={handleJobAction}
        />
      )}
    </div>
  );
};

export default ProfileJobs;
