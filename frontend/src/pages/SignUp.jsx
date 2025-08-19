import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// OTP Component
const OtpVerification = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("Verifying OTP:", enteredOtp);
    onVerify();
  };

  return (
    <div className=" p-8 rounded-xl shadow-lg w-full max-w-md bg-gray-400 relative">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 text-white hover:text-gray-200"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center text-white">
        Verify Your Phone
      </h2>
      <p className="text-gray-600 text-center mb-6 text-white">
        Enter the OTP sent on {phoneNumber}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="tel"
              maxLength="1"
              className="w-12 h-12 text-center text-2xl font-bold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-black"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="text-center mt-4 ">
          <p className="text-sm text-gray-600">
            Didn't receive code?{" "}
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Resend OTP
            </button>
          </p>
        </div>
        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            className="w-center-3xl py-2 px-4 rounded-2xl text-white bg-blue-600 hover:bg-blue-500"
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
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-gray-400 relative">
      {/* Back Arrow */}
      <button
        type="button"
        onClick={onBack}
        className="absolute top-4 left-4 text-white hover:text-gray-200"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-white mb-6 text-center">
        Address Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="address"
            className="block mb-1 font-medium text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-black"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-1 font-medium text-white">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-black"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-1 font-medium text-white">
            State
          </label>
          <input
            type="text"
            id="state"
            className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-black"
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
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log("Sending OTP to:", phoneNumber);
    setStep(2);
  };

  const handleVerificationSuccess = () => {
    console.log("OTP verification successful.");
    setStep(3);
  };

  const handleAddressSubmit = (addressData) => {
    console.log("Final registration data:", {
      fullName,
      phoneNumber,
      ...addressData,
    });
    onRegistrationComplete(fullName);
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-semibold mb-8">Customer Registration</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between w-full max-w-sm mb-12">
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 1
              ? "bg-blue-600 text-white"
              : "border border-gray-400 text-gray-500"
          } flex items-center justify-center`}
        >
          1
        </div>
        <div
          className={`flex-1 h-1 ${step > 1 ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 2
              ? "bg-blue-600 text-white"
              : "border border-gray-400 text-gray-500"
          } flex items-center justify-center`}
        >
          2
        </div>
        <div
          className={`flex-1 h-1 ${step > 2 ? "bg-blue-600" : "bg-gray-300"}`}
        ></div>
        <div
          className={`w-10 h-10 rounded-full ${
            step >= 3
              ? "bg-blue-600 text-white"
              : "border border-gray-400 text-gray-500"
          } flex items-center justify-center`}
        >
          3
        </div>
      </div>

      {step === 1 && (
        <div className="bg-gray-400 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-6 text-center text-white">
            Personal Information
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium text-white">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-white">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full rounded-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 text-black"
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
                <p className="text-sm text-gray-700">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
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
