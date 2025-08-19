import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLoginComplete }) {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

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

  const handleVerifyOtp = () => {
    if (otp.join("").length === 4) {
      onLoginComplete();
      navigate("/");
    } else {
      alert("Please enter the complete 4-digit OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-gray-400 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {!otpSent ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white mt-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
