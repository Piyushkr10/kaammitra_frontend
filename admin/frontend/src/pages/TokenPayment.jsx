import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, User, ChevronDown } from "lucide-react";

// Assuming the logo is an image file in the assets folder
// import logo from "./assets/logo.png"; // You would import your actual logo file here

const TokenPayment = ({ darkMode }) => {
  // ✅ Use useLocation hook to access the state passed from the previous page
  const location = useLocation();
  const bookingData = location.state?.formData;

  // Handle case where bookingData is not available (e.g., direct navigation)
  if (!bookingData) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
        <div className={`p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <h2 className="text-2xl font-bold mb-4">No Booking Details Found</h2>
          <p>Please go back to the <Link to="/" className="text-blue-600 hover:underline">home page</Link> to make a booking first.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
     

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-8 mt-4">
          TOKEN PAYMENT
        </h1>
        
        {/* Main Content Container with Horizontal Alignment */}
        <div className={`w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-end p-6 rounded-lg shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
            {/* Logo Section */}
           

            {/* Payment Details Card */}
            <div className="w-full md:w-1/2 p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">customer name</span>
                    <span className="font-bold">{bookingData.name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        customer address
                    </span>
                    <span className="text-right">{bookingData.address}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        service needed
                    </span>
                    <span className="font-bold">{bookingData.service}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        service type
                    </span>
                    <span className="font-bold">{bookingData.serviceType}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        date
                    </span>
                    <span className="font-bold">{bookingData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        time
                    </span>
                    <span className="font-bold">{bookingData.time}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        remarks
                    </span>
                    <span className="font-bold">{bookingData.remarks}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">
                        token payment paid
                    </span>
                    <span className="font-bold">₹200</span>
                </div>
                
            </div>
             <div className="flex items-center justify-end w-full mb-4 md:mb-0 md:w-1/2">
                <div className="flex flex-col items-end text-right gap-2">
                    <div className="h-32 w-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        <span className="text-5xl">K</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-800">Kaam Mitra</span>
                    <span className="text-sm font-light text-gray-500">
                        Kaam Ka Yaar, Har Waqt Tayyar
                    </span>
                </div>
            </div>
        </div>
        


        {/* Action Buttons */}
        <div className="w-full max-w-lg mt-8 flex flex-col gap-4">
          <button className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900 transition-colors">
            COMPLETE REST PAYMENT
          </button>
          <button className="w-full border border-gray-300 text-blue-600 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            VIEW INVOICE
          </button>
          <button className="w-full border border-gray-300 text-blue-600 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            DOWNLOAD INVOICE
          </button>
        </div>
      </main>
    </div>
  );
};

export default TokenPayment;
