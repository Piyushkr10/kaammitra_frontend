import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Step1Personal from "../components/registration/Step1Personal";
import Step2OTP from "../components/registration/Step2OTP";
import Step3ServiceDetails from "../components/registration/Step3ServiceDetails";
import Step4Identity from "../components/registration/Step4Identity";
import Step5Payment from "../components/registration/Step5Payment";
import StepIndicator from "../components/registration/StepIndicator";

const Register = ({ setIsAuthenticated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const totalSteps = 5;

  const nextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    localStorage.setItem("providerData", JSON.stringify(finalData));
    setIsAuthenticated(true);
    navigate("/profile");
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
        return <Navigate to="/" replace />;
    }
  };

  return (
    <div className="flex justify-center items-center py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-lg mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
          Provider Registration (5 Steps)
        </h1>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <div className="mt-8">{renderStep()}</div>
      </div>
    </div>
  );
};

export default Register;