import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddServices = ({ addService }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    otp: "",
    serviceCategory: "",
    serviceArea: "",
    subService: "",
    pinCode: "",
    experience: "",
    languageSpoken: "",
    profilePhoto: null,
    governmentIdProof: null,
    addressProof: null,
    skillCertificate: null,
    bankAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    upiId: "",
    confirmVerification: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.phoneNumber;
      case 2:
        return formData.otp;
      case 3:
        return (
          formData.serviceCategory &&
          formData.serviceArea &&
          formData.subService &&
          formData.pinCode &&
          formData.experience &&
          formData.languageSpoken
        );
      case 4:
        return (
          formData.profilePhoto &&
          formData.governmentIdProof &&
          formData.addressProof &&
          formData.skillCertificate &&
          formData.confirmVerification
        );
      case 5:
        return (
          formData.bankAccountNumber &&
          formData.ifscCode &&
          formData.accountHolderName &&
          formData.upiId
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => Math.min(prev + 1, 5));
    else alert("Please fill all required fields.");
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    if (validateStep()) {
      // Save data in localStorage
      localStorage.setItem("providerData", JSON.stringify(formData));

      // Add to services list dynamically
      addService({
        name: formData.serviceCategory,
        img: formData.profilePhoto || "https://i.ibb.co/placeholder.jpg",
      });

      alert("🎉 Service added successfully!");
      navigate("/"); // Redirect to home
    } else alert("Please fill all required fields.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl bg-gray-100 rounded-xl p-6 shadow-md">
        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${
                step >= i ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {i}
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex justify-between mb-4">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            &#8592; Back
          </button>
          <button
            onClick={nextStep}
            className="px-3 py-2 bg-blue-700 text-white rounded-md"
          >
            Next &#8594;
          </button>
        </div>

        {/* Step Content */}
        <div className="space-y-3">
          {step === 1 && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
            </>
          )}
          {step === 2 && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-gray-200"
            />
          )}
          {step === 3 && (
            <>
              <input
                type="text"
                name="serviceCategory"
                placeholder="Service Category"
                value={formData.serviceCategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="serviceArea"
                placeholder="Service Area"
                value={formData.serviceArea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="subService"
                placeholder="Sub Service"
                value={formData.subService}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="languageSpoken"
                placeholder="Languages Spoken"
                value={formData.languageSpoken}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
            </>
          )}
          {step === 4 && (
            <>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="file"
                name="governmentIdProof"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="file"
                name="addressProof"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="file"
                name="skillCertificate"
                onChange={handleFileChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={formData.confirmVerification}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmVerification: e.target.checked,
                    }))
                  }
                />
                <span className="ml-2">Confirm uploaded documents</span>
              </div>
            </>
          )}
          {step === 5 && (
            <>
              <input
                type="text"
                name="bankAccountNumber"
                placeholder="Bank Account Number"
                value={formData.bankAccountNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
              <input
                type="text"
                name="upiId"
                placeholder="UPI ID"
                value={formData.upiId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-gray-200"
              />
            </>
          )}
        </div>

        {/* Bottom Action Button */}
        <div className="mt-4">
          {step < 5 && (
            <button
              onClick={nextStep}
              className="w-full px-4 py-2 bg-blue-700 text-white rounded-md"
            >
              {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Submit"}
            </button>
          )}
          {step === 5 && (
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Submit & Add Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddServices;
