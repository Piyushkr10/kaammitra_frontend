import React, { useState, useEffect, useRef } from "react";
import { Upload, Pencil, CheckCircle } from "lucide-react";

// Helper component for displaying data
const DataField = ({ label, value, isUpload, isTotalEarnings }) => (
  <div
    className={`flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700/50 ${
      isTotalEarnings
        ? "mt-4 pt-4 border-t-2"
        : ""
    }`}
  >
    <span
      className={`text-gray-500 dark:text-gray-400 ${
        isTotalEarnings ? "font-bold" : "font-medium"
      }`}
    >
      {label}
    </span>
    <span
      className={`text-gray-900 dark:text-white text-right ${
        isTotalEarnings ? "font-bold text-lg text-green-600" : ""
      } ${isUpload ? "flex items-center font-semibold" : ""}`}
    >
      {isUpload && value ? (
        <>
          <CheckCircle className="mr-1 w-4 h-4 text-green-500" />
          <span className="text-blue-600">{value}</span>
        </>
      ) : isUpload ? (
        <span className="text-red-500 flex items-center"><Upload className="mr-1 w-4 h-4" /> Required</span>
      ) : (
        value
      )}
    </span>
  </div>
);

// Helper component for Profile Image
const ProfileImage = ({ src, onEdit }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border-4 border-blue-500/50">
      {src ? (
        <span className="text-sm text-gray-600 dark:text-gray-300 p-2 text-center break-all">
          {src}
        </span>
      ) : (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          No Profile Photo
        </span>
      )}
    </div>
    <button
      className="mt-2 text-blue-500 hover:text-blue-600 font-semibold flex items-center"
      onClick={onEdit}
      type="button"
    >
      <Pencil className="w-4 h-4 mr-1" /> Edit Profile Photo
    </button>
  </div>
);

const maskAccountNumber = (accountNumber) => {
    if (!accountNumber || accountNumber.length < 4) return "**********";
    // Show only the last 4 digits
    return "*".repeat(accountNumber.length - 4) + accountNumber.slice(-4);
};

const ProfileDetailsPage = () => {
  const [providerData, setProviderData] = useState(null);
  const profilePhotoInputRef = useRef();

  useEffect(() => {
    // Fetch data from localStorage which was set during registration
    const saved = localStorage.getItem("providerData");
    if (saved) {
      setProviderData(JSON.parse(saved));
    } else {
      setProviderData({});
    }
  }, []);

  // Static/Placeholder data for fields not collected during the 5 steps or for masking
  const defaults = {
    // Basic Info defaults 
    fullName: "N/A (Please Register)",
    phoneNumber: "N/A",
    // Professional defaults
    serviceCategory: "N/A",
    subService: "N/A",
    experience: "0",
    serviceArea: "Not set",
    pinCode: "N/A",
    languageSpoken: "N/A",
    availability: "Full-Time", // Static
    // Verification defaults
    profilePhoto: "", // empty means 'required' status
    governmentIDProof: "",
    addressProof: "",
    skillCertificate: "",
    backgroundVerification: "Pending", // Mock static
    // Financial defaults
    bankAccountNumber: "**********", // Mock static (masked)
    ifscCode: "N/A",
    accountHolderName: "N/A",
    upiId: "N/A",
    // Performance Metrics (Static for initial profile)
    totalEarnings: "₹0",
    averageRating: "0/5",
    ongoingJobs: "0",
    jobCompletionRate: "0%",
  };

  const data = providerData || {};
  const mergedData = { ...defaults, ...data }; // Use registered data, fallback to defaults

  if (!providerData) {
    return <div className="p-6 text-center text-xl font-semibold text-gray-600 dark:text-gray-400">Loading Profile Data...</div>;
  }

  // Handle profile photo edit/upload
  const handleProfilePhotoEdit = () => {
    profilePhotoInputRef.current.click();
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedData = { ...providerData, profilePhoto: file.name };
      setProviderData(updatedData);
      localStorage.setItem("providerData", JSON.stringify(updatedData));
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">Provider Profile Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Basic Information
            </h2>
            <DataField label="Full Name" value={mergedData.fullName} />
            <DataField label="Contact Number" value={mergedData.phoneNumber} />
            <div className="flex justify-between items-start py-2 border-t border-gray-100 dark:border-gray-700/50 mt-2 pt-2">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                Service Location
              </span>
              <p className="text-right text-gray-900 dark:text-white max-w-xs">
                {mergedData.serviceArea || defaults.serviceArea} ({mergedData.pinCode || defaults.pinCode})
              </p>
            </div>
            <DataField label="Language Spoken" value={mergedData.languageSpoken} />
          </div>

          {/* Professional Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Professional Information
            </h2>
            <DataField label="Service Category" value={mergedData.serviceCategory} />
            <DataField label="Sub-Service/Expertise" value={mergedData.subService} />
            <DataField label="Years of Experience" value={mergedData.experience + " years"} />
            <DataField label="Skill Certificate" value={mergedData.skillCertificate} isUpload />
            <DataField label="Availability" value={defaults.availability} />
          </div>

          {/* Verification Documents */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Verification Status
            </h2>
            <DataField label="Profile Photo" value={mergedData.profilePhoto} isUpload />
            <DataField label="Govt. ID Proof" value={mergedData.governmentIDProof} isUpload />
            <DataField label="Address Proof" value={mergedData.addressProof} isUpload />
            <DataField label="Background Check" value={defaults.backgroundVerification} />
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex justify-center flex-col items-center">
            <ProfileImage src={mergedData.profilePhoto} onEdit={handleProfilePhotoEdit} />
            <input
              type="file"
              ref={profilePhotoInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfilePhotoUpload}
            />
          </div>

          {/* Financial */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Financial Information
            </h2>
            <DataField label="Account Holder" value={mergedData.accountHolderName} />
            <DataField
              label="Bank Account No."
              value={mergedData.bankAccountNumber ? maskAccountNumber(mergedData.bankAccountNumber) : defaults.bankAccountNumber}
            />
            <DataField label="IFSC Code" value={mergedData.ifscCode} />
            <DataField label="UPI ID" value={mergedData.upiId} />
            <DataField label="Total Earnings" value={defaults.totalEarnings} isTotalEarnings />
          </div>

          {/* Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Performance Metrics
            </h2>
            <DataField label="Average Rating" value={defaults.averageRating} />
            <DataField label="Ongoing Jobs" value={defaults.ongoingJobs} />
            <DataField label="Completion Rate" value={defaults.jobCompletionRate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;