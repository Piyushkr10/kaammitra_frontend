import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";

export default function Login({ onLoginComplete, registeredUsers }) { // Add registeredUsers prop
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Handle sending OTP, validates mobile number and checks for registration
  const handleSendOtp = () => {
    if (mobile.length === 10) {
      // Check if the mobile number is registered
      const isRegistered = registeredUsers.some(user => user.mobile === mobile);
      if (isRegistered) {
        setOtpSent(true);
        setMessage("");
      } else {
        setMessage("This mobile number is not registered. Please sign up first.");
      }
    } else {
      setMessage("Please enter a valid 10-digit mobile number.");
    }
  };

  // Handle OTP digit changes, auto-focuses on next input
  const handleChangeOtp = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handles OTP verification, navigates on success
  const handleVerifyOtp = () => {
    if (otp.join("").length === 4) {
      setMessage("");
      const user = registeredUsers.find(user => user.mobile === mobile);
      if (user) {
        // In a real app, you would verify the OTP here with an API call
        onLoginComplete(user.name, user.mobile); // Update the global state
        navigate("/"); // Redirect to the home page
      } else {
        setMessage("Verification failed. Please try again.");
      }
    } else {
      setMessage("Please enter the complete 4-digit OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow-md w-full max-w-md transition-colors duration-300 relative">
        <Link to="/" className="absolute top-4 left-4 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        {/* Message Box for alerts */}
        {message && (
          <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900 transition-colors duration-300">
            <XCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        {!otpSent ? (
          <>
            <label className="block text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white mt-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
            <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              New to our app? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up here</Link>
            </p>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">
              Enter OTP
            </label>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}