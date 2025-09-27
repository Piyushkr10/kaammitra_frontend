import React, { useState, useEffect } from "react";
import { Upload, Pencil, Save } from "lucide-react";

const DataField = ({ label, value, isUpload, isTotalEarnings }) => (
  <div
    className={`flex justify-between items-center py-2 ${
      isTotalEarnings
        ? "border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
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
      className={`text-gray-900 dark:text-white ${
        isTotalEarnings ? "font-bold text-lg text-green-600" : ""
      } ${isUpload ? "flex items-center text-blue-600 font-semibold" : ""}`}
    >
      {isUpload && value?.toLowerCase() === "upload" ? (
        <>
          <Upload className="mr-1 w-4 h-4" /> {value}
        </>
      ) : (
        value
      )}
    </span>
  </div>
);

const ProfileImage = ({ src }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
      {src ? (
        <img
          src={src}
          alt="Profile"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Profile Image
        </span>
      )}
    </div>
  </div>
);

const ProfileDetailsPage = () => {
  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("providerData");
    if (saved) setProviderData(JSON.parse(saved));
  }, []);

  const defaults = {
    fullName: "Provider",
    gender: "Not Provided",
    dateOfBirth: "Not Provided",
    contactNumber: "Not Provided",
    emailId: "Not Provided",
    address: "Not Provided",
    serviceCategory: "Not Provided",
    skillsExpertise: "Not Provided",
    yearsOfExperience: "0",
    availability: "Not Provided",
    aadharNumber: "**********",
    panCard: "**********",
    idProof: "Upload",
    backgroundVerification: "Pending",
    bankAccountNumber: "**********",
    upiId: "Not Provided",
    preferredPayMode: "Not Provided",
    totalEarnings: "₹0",
    averageRating: "0",
    ongoingJobs: "0",
    cancelledJobs: "0",
    jobCompletionRate: "0%",
  };

  const data = providerData || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="md:col-span-2 space-y-6">
        {/* Basic Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Basic Information
          </h2>
          <DataField label="Full Name" value={data.fullName || defaults.fullName} />
          <DataField label="Gender" value={data.gender || defaults.gender} />
          <DataField label="Date of Birth" value={data.dateOfBirth || defaults.dateOfBirth} />
          <DataField label="Contact Number" value={data.phoneNumber || defaults.contactNumber} />
          <DataField label="E-mail ID" value={data.emailId || defaults.emailId} />
          <div className="flex justify-between items-start py-2">
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              Address
            </span>
            <p className="text-right text-gray-900 dark:text-white max-w-xs">
              {data.address || defaults.address}
            </p>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Professional Information
          </h2>
          <DataField label="Service Category" value={data.serviceCategory || defaults.serviceCategory} />
          <DataField label="Skills & Expertise" value={data.subService || defaults.skillsExpertise} />
          <DataField label="Years of Experience" value={data.experience || defaults.yearsOfExperience} />
          <DataField label="Skill Proof" value="Upload" isUpload />
          <DataField label="Availability" value={defaults.availability} />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex justify-center">
          <ProfileImage src={data.profilePhoto} />
        </div>

        {/* Verification */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Verification Information
          </h2>
          <DataField label="Aadhar Number" value={defaults.aadharNumber} />
          <DataField label="PAN Card" value={defaults.panCard} />
          <DataField label="ID Proof" value={defaults.idProof} isUpload />
          <DataField label="Background Verification" value={defaults.backgroundVerification} />
        </div>

        {/* Financial */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Financial Information
          </h2>
          <DataField label="Bank Account" value={data.bankAccountNumber || defaults.bankAccountNumber} />
          <DataField label="UPI ID" value={data.upiId || defaults.upiId} />
          <DataField label="Preferred Pay Mode" value={defaults.preferredPayMode} />
          <DataField label="Total Earnings" value={defaults.totalEarnings} isTotalEarnings />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
