// frontend/src/pages/ProfileDetailsPage.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Upload, Pencil, CheckCircle } from "lucide-react";

const DataField = ({ label, value, isUpload, isTotalEarnings }) => (
  <div className={`flex justify-between items-center py-2 border-t ${isTotalEarnings ? "mt-4 pt-4 border-t-2" : ""}`}>
    <span className={`text-gray-500 ${isTotalEarnings ? "font-bold" : "font-medium"}`}>{label}</span>
    <span className={`text-right ${isUpload ? "flex items-center font-semibold" : ""}`}>
      {isUpload && value ? (
        <>
          <CheckCircle className="mr-1 w-4 h-4 text-green-500" />
          <span className="text-blue-600">{value}</span>
        </>
      ) : isUpload ? (
        <span className="text-red-500 flex items-center"><Upload className="mr-1 w-4 h-4" /> Required</span>
      ) : (
        value || "N/A"
      )}
    </span>
  </div>
);

const ProfileImage = ({ src, onEdit }) => (
  <div className="w-full flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border-4 border-blue-500/50">
      {src ? <img src={src} alt="profile" className="object-cover w-full h-full" /> : <span className="text-gray-500">No Profile Photo</span>}
    </div>
    <button className="mt-2 text-blue-500 hover:text-blue-600 font-semibold flex items-center" onClick={onEdit} type="button">
      <Pencil className="w-4 h-4 mr-1" /> Edit Profile Photo
    </button>
  </div>
);

const maskAccountNumber = (accountNumber) => {
  if (!accountNumber || accountNumber.length < 4) return "**********";
  return "*".repeat(accountNumber.length - 4) + accountNumber.slice(-4);
};

const ProfileDetailsPage = () => {
  const [providerData, setProviderData] = useState(null);
  const profilePhotoInputRef = useRef();

  useEffect(() => {
    const loadProvider = async () => {
      const providerId = localStorage.getItem("providerId");
      const saved = localStorage.getItem("providerData");

      console.log("ProfileDetails: providerId from localStorage:", providerId);

      if (!providerId || providerId === "undefined" || providerId === "null") {
        console.warn("Invalid providerId — using localStorage providerData if available");
        if (saved) setProviderData(JSON.parse(saved));
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/providers/${providerId}`);
        console.log("Fetched provider from API:", res.data);
        setProviderData(res.data);
        localStorage.setItem("providerData", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching provider:", err.response?.status, err.response?.data || err.message);
        if (err.response && err.response.status === 404) {
          console.warn("Provider not found on server (404). Falling back to localStorage if available.");
          if (saved) setProviderData(JSON.parse(saved));
        } else {
          if (saved) setProviderData(JSON.parse(saved));
        }
      }
    };

    loadProvider();
  }, []);

  const defaults = {
    fullName: "N/A",
    phoneNumber: "N/A",
    serviceCategory: "N/A",
    subService: "N/A",
    experience: "0",
    serviceArea: "Not set",
    pinCode: "N/A",
    languageSpoken: "N/A",
    profilePhoto: "",
    governmentIDProof: "",
    addressProof: "",
    skillCertificate: "",
    backgroundVerification: "Pending",
    bankAccountNumber: "**********",
    ifscCode: "N/A",
    accountHolderName: "N/A",
    upiId: "N/A",
    totalEarnings: "₹0",
    averageRating: "0/5",
    ongoingJobs: "0",
    jobCompletionRate: "0%",
  };

  const mergedData = { ...defaults, ...(providerData || {}) };

  if (providerData === null) {
    return <div className="p-6 text-center">Loading Profile...</div>;
  }

  const handleProfilePhotoEdit = () => profilePhotoInputRef.current.click();

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For simplicity, we only set filename. If backend supports uploads, you'd upload file here.
    const updated = { ...mergedData, profilePhoto: file.name };
    setProviderData(updated);

    // Optionally update backend (if you want to persist file name)
    const providerId = localStorage.getItem("providerId");
    if (providerId) {
      try {
        await axios.put(`http://localhost:5000/api/providers/${providerId}`, { profilePhoto: file.name });
      } catch (err) {
        console.error("Error updating profile photo:", err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Provider Profile Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Basic Information</h2>
            <DataField label="Full Name" value={mergedData.fullName} />
            <DataField label="Contact Number" value={mergedData.phoneNumber} />
            <div className="flex justify-between items-start py-2 border-t mt-2">
              <span className="text-gray-500 font-medium">Service Location</span>
              <p className="text-right">{mergedData.serviceArea} ({mergedData.pinCode})</p>
            </div>
            <DataField label="Language Spoken" value={mergedData.languageSpoken} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Professional Information</h2>
            <DataField label="Service Category" value={mergedData.serviceCategory} />
            <DataField label="Sub-Service/Expertise" value={mergedData.subService} />
            <DataField label="Years of Experience" value={`${mergedData.experience} years`} />
            <DataField label="Skill Certificate" value={mergedData.skillCertificate} isUpload />
            <DataField label="Availability" value={"Full-Time"} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Verification Status</h2>
            <DataField label="Profile Photo" value={mergedData.profilePhoto} isUpload />
            <DataField label="Govt. ID Proof" value={mergedData.governmentIDProof} isUpload />
            <DataField label="Address Proof" value={mergedData.addressProof} isUpload />
            <DataField label="Background Check" value={mergedData.backgroundVerification} />
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <ProfileImage src={mergedData.profilePhoto} onEdit={handleProfilePhotoEdit} />
            <input type="file" ref={profilePhotoInputRef} style={{ display: "none" }} accept="image/*" onChange={handleProfilePhotoUpload} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Financial Information</h2>
            <DataField label="Account Holder" value={mergedData.accountHolderName} />
            <DataField label="Bank Account No." value={maskAccountNumber(mergedData.bankAccountNumber)} />
            <DataField label="IFSC Code" value={mergedData.ifscCode} />
            <DataField label="UPI ID" value={mergedData.upiId} />
            <DataField label="Total Earnings" value={mergedData.totalEarnings} isTotalEarnings />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Performance Metrics</h2>
            <DataField label="Average Rating" value={mergedData.rating ? `${mergedData.rating}/5` : "0/5"} />
            <DataField label="Ongoing Jobs" value={mergedData.jobs || 0} />
            <DataField label="Completion Rate" value={mergedData.jobCompletionRate || "0%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
