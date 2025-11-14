import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = ({ setIsAuthenticated }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setStep(2);
  };

  const handleOtpChange = (value, idx) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    // Move focus to next input if filled
    if (value && idx < 3) {
      otpRefs[idx + 1].current.focus();
    }
    // Move focus to previous input if deleted
    if (!value && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length !== 4 || otpValue !== "1234") {
      setError("Please enter the correct 4-digit OTP (demo: 1234)");
      return;
    }
    const providerData = { phone };
    localStorage.setItem("providerData", JSON.stringify(providerData));
    setIsAuthenticated(true);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md mx-4 relative">
        {/* Left Arrow Icon */}
        <button
          className="absolute left-4 top-4 text-blue-700 hover:text-blue-900"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <FaArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
          Provider Login
        </h1>
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                placeholder="Enter your phone number"
                maxLength={10}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Enter 4-digit OTP
            </label>
            <div className="flex space-x-4 justify-center mb-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-12 h-12 text-center text-xl border rounded-md focus:outline-none"
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium"
            >
              Verify & Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;