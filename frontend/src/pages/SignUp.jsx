import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

// OTP Component
const OtpVerification = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    // In a real app, you would verify the OTP here
    onVerify();
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        Verify Your Phone
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Enter the OTP sent on {phoneNumber}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="tel"
              maxLength="1"
              className="w-12 h-12 text-center text-2xl font-bold border rounded-md focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive code?{" "}
            <button
              type="button"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              Resend OTP
            </button>
          </p>
        </div>
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="py-2 px-8 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
          >
            VERIFY OTP
          </button>
        </div>
      </form>
    </div>
  );
};

// Address Form
const AddressForm = ({ onAddressSubmit, onBack }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddressSubmit({ address, city, state });
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Address Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="address"
            className="block mb-1 font-medium text-gray-800 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-1 font-medium text-gray-800 dark:text-white">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-1 font-medium text-gray-800 dark:text-white">
            State
          </label>
          <input
            type="text"
            id="state"
            className="w-full rounded-md border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
            placeholder="Enter your state "
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="py-2 px-8 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Main SignUp
export default function SignUp({ onRegistrationComplete }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (fullName.trim() === "" || phoneNumber.trim().length !== 10) {
      setMessage("Please enter a valid full name and 10-digit phone number.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  const handleVerificationSuccess = () => {
    setStep(3);
  };

  const handleAddressSubmit = (addressData) => {
    // In a real app, this data would be sent to a backend
    onRegistrationComplete(fullName);
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center p-4">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Customer Registration</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between w-full max-w-sm mb-12">
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 1
              ? "bg-blue-600 text-white"
              : "border border-gray-400 dark:border-gray-500 text-gray-500 dark:text-gray-400"
          } flex items-center justify-center transition-colors duration-300`}
        >
          1
        </div>
        <div className={`flex-1 h-1 ${step > 1 ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"} transition-colors duration-300`}></div>
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 2
              ? "bg-blue-600 text-white"
              : "border border-gray-400 dark:border-gray-500 text-gray-500 dark:text-gray-400"
          } flex items-center justify-center transition-colors duration-300`}
        >
          2
        </div>
        <div className={`flex-1 h-1 ${step > 2 ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"} transition-colors duration-300`}></div>
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 3
              ? "bg-blue-600 text-white"
              : "border border-gray-400 dark:border-gray-500 text-gray-500 dark:text-gray-400"
          } flex items-center justify-center transition-colors duration-300`}
        >
          3
        </div>
      </div>
      
      {/* Message Box for alerts */}
      {message && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900 transition-colors duration-300 w-full max-w-md">
          <XCircle size={20} />
          <span>{message}</span>
        </div>
      )}

      {step === 1 && (
        <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 transition-colors duration-300">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Personal Information
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-800 dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700"
                placeholder="+91 xxxxx-xxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                SEND OTP
              </button>
              <div className="pt-4 text-center">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <OtpVerification
          phoneNumber={phoneNumber}
          onVerify={handleVerificationSuccess}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <AddressForm
          onAddressSubmit={handleAddressSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}
