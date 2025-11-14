// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import StepIndicator from "../components/registration/StepIndicator";
import Step1Personal from "../components/registration/Step1Personal";
import Step2OTP from "../components/registration/Step2OTP";
import Step3ServiceDetails from "../components/registration/Step3ServiceDetails";
import Step4Identity from "../components/registration/Step4Identity";
import Step5Payment from "../components/registration/Step5Payment";

const Register = ({ setIsAuthenticated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const totalSteps = 5;

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
  };

  // Final submit -> POST to backend with FormData if files exist
  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };

    try {
      // Check if any File objects exist
      const hasFile = Object.values(finalData).some((v) => v instanceof File);

      let res;
      if (hasFile) {
        // Send as FormData (multipart/form-data)
        const fd = new FormData();
        Object.entries(finalData).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          // If File object, append directly; otherwise stringify objects
          if (value instanceof File) {
            fd.append(key, value);
          } else if (typeof value === "object") {
            fd.append(key, JSON.stringify(value));
          } else {
            fd.append(key, value);
          }
        });

        console.log("Sending FormData with files");
        res = await axios.post("http://localhost:5000/api/providers/add", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Send as JSON
        console.log("Sending JSON (no files)");
        res = await axios.post("http://localhost:5000/api/providers/add", finalData);
      }

      const created = res.data;

      console.log("Register response:", created);
      if (!created || !created._id) {
        console.warn("Created provider missing _id");
      }

      localStorage.setItem("providerData", JSON.stringify(created));
      localStorage.setItem("providerId", created._id || created.id || "");

      setIsAuthenticated(true);
      navigate("/profile");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Personal nextStep={nextStep} data={formData} />;
      case 2:
        return <Step2OTP nextStep={nextStep} data={formData} />;
      case 3:
        return <Step3ServiceDetails nextStep={nextStep} data={formData} />;
      case 4:
        return <Step4Identity nextStep={nextStep} data={formData} />;
      case 5:
        return <Step5Payment handleSubmit={handleSubmit} data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-lg mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
          Provider Registration (5 Steps)
        </h1>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div className="mt-6">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Register;
