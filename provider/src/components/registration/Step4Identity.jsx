import React, { useState, useRef } from "react";
import { Upload, Check } from "lucide-react";

const Step4Identity = ({ nextStep, data }) => {
  const [profilePhoto, setProfilePhoto] = useState(data.profilePhoto || "");
  const [governmentIDProof, setGovernmentIDProof] = useState(data.governmentIDProof || "");
  const [addressProof, setAddressProof] = useState(data.addressProof || "");
  const [skillCertificate, setSkillCertificate] = useState(data.skillCertificate || "");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  // Refs for file inputs
  const profilePhotoRef = useRef();
  const governmentIDProofRef = useRef();
  const addressProofRef = useRef();
  const skillCertificateRef = useRef();

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file.name);
    }
  };

  const getButtonClass = (value) =>
    value
      ? "bg-green-500 hover:bg-green-600"
      : "bg-gray-400 hover:bg-gray-500";

  const isAllUploaded = profilePhoto && governmentIDProof && addressProof && skillCertificate;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isAllUploaded) {
      setError("Please ensure all required documents are marked as uploaded.");
      return;
    }

    if (!agreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    nextStep({
      profilePhoto,
      governmentIDProof,
      addressProof,
      skillCertificate,
    });
  };

  // UploadField now triggers file input
  const UploadField = ({ label, value, setter, inputRef }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700/50">
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </span>
      <div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept="image/*,.pdf"
          onChange={(e) => handleFileUpload(e, setter)}
        />
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className={`flex items-center text-sm font-medium text-white px-3 py-1 rounded-md transition-colors duration-200 ${getButtonClass(value)}`}
        >
          {value ? <Check className="w-4 h-4 mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
          {value ? "Uploaded" : "Upload"}
        </button>
        {value && (
          <span className="ml-2 text-xs text-green-700">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center">
        Step 4: Identity & Verification
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadField
          label="Profile Photo"
          value={profilePhoto}
          setter={setProfilePhoto}
          inputRef={profilePhotoRef}
        />
        <UploadField
          label="Government ID Proof (Aadhar/Voter ID)"
          value={governmentIDProof}
          setter={setGovernmentIDProof}
          inputRef={governmentIDProofRef}
        />
        <UploadField
          label="Address Proof (Electricity Bill/Rental Agmt)"
          value={addressProof}
          setter={setAddressProof}
          inputRef={addressProofRef}
        />
        <UploadField
          label="Skill Certificate (Optional but Recommended)"
          value={skillCertificate}
          setter={setSkillCertificate}
          inputRef={skillCertificateRef}
        />

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <div className="flex items-start pt-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            I agree that my details are accurate and comply with all terms & conditions.
          </label>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${isAllUploaded && agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!isAllUploaded || !agreed}
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default Step4Identity;