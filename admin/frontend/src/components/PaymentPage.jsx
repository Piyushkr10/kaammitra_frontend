import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

// This modal component is used by the PaymentPage to display a success message
// instead of using a standard browser alert, which can be blocked or cause UI issues.
const SuccessModal = ({ message, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
);

// This function will dynamically get the price for a service.
// In a real application, this would likely come from an API or a database.
const getServicePrice = (serviceName) => {
  switch (serviceName) {
    case "Cleaning Services":
      return 600;
    case "Photography":
      return 1200;
    case "Cooking":
      return 800;
    case "Plumbing Services":
      return 500;
    case "Electrician Services":
      return 450;
    case "Beauty Services":
      return 700;
    case "Repairing Services":
      return 400;
    case "Event Planning":
      return 5000;
    case "Painting":
      return 1000;
    case "Carpentry Services":
      return 600;
    case "Gardening":
      return 550;
    case "Home Shifting":
      return 1500;
    case "AC Repair":
      return 750;
    case "Car Wash":
      return 350;
    case "IT Support":
      return 450;
    default:
      return 500; // Default price for any other service
  }
};

const PaymentPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit card');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Calculate dynamic payment amounts
  const basePrice = getServicePrice(formData?.service);
  const taxRate = 0.18; // 18% tax
  const discountRate = 0.20; // 20% discount on base price
  const tax = basePrice * taxRate;
  const discount = basePrice * discountRate;
  const subtotal = basePrice;
  const totalAmount = (subtotal + tax - discount).toFixed(2);

  // Effect to validate the form and enable the button
  useEffect(() => {
    const isValid = cardDetails.cardNumber.length === 16 &&
      cardDetails.expiryDate.length === 5 &&
      cardDetails.cvv.length === 3 &&
      cardDetails.cardholderName.trim() !== '';
    setIsFormValid(isValid);
  }, [cardDetails]);

  if (!formData || !formData.service) {
    return (
      <div className={`text-center p-8 rounded-xl ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
      }`}>
        <h2 className="text-2xl font-bold mb-4 text-red-600">No Booking Data Found</h2>
        <p className="mb-4">Please go back to the home page and select a service to book.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl transition-all duration-300 hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handlePayNow = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      
      // Create a new booking object with dynamic total amount and a real-time timestamp
      const newBooking = {
        ...formData,
        totalAmount, // Add the dynamically calculated total amount
        paymentMethod,
        transactionDate: new Date().toISOString() // Add a real-time ISO timestamp
      };

      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/book-history');
      }, 2000);
    } else {
      alert("Please fill in all card details correctly.");
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const renderPaymentForm = () => {
    const inputStyle = `w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors ${
      darkMode ? "bg-gray-600 text-white placeholder-gray-300" : "bg-gray-100 text-gray-800 placeholder-gray-400"
    }`;

    switch (paymentMethod) {
      case 'Credit/Debit card':
        return (
          <form className="space-y-4" onSubmit={handlePayNow}>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card number"
              value={cardDetails.cardNumber}
              onChange={handleCardInputChange}
              className={inputStyle}
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                className={inputStyle}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                className={inputStyle}
                required
              />
            </div>
            <input
              type="text"
              name="cardholderName"
              placeholder="Cardholder name"
              value={cardDetails.cardholderName}
              onChange={handleCardInputChange}
              className={inputStyle}
              required
            />
            {/* The form's submit button will trigger handlePayNow */}
            <button
              type="submit"
              className={`w-full text-white py-4 rounded-xl font-bold text-lg mt-4 transition-all duration-300 shadow-lg hover:shadow-xl
                ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              
            >
              PAY NOW
            </button>
          </form>
        );
      case 'UPI payment':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., user@bank)"
              className={inputStyle}
              required
            />
          </div>
        );
      case 'Net banking':
        return (
          <div className="space-y-4">
            <select className={inputStyle} required>
              <option>Select your bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Punjab National Bank</option>
            </select>
          </div>
        );
      case 'Wallets':
        return (
          <div className="space-y-4">
            <select className={inputStyle} required>
              <option>Select a wallet</option>
              <option>Paytm</option>
              <option>Google Pay</option>
              <option>PhonePe</option>
              <option>Mobikwik</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans ${
      darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
    }`}>
      <div className={`w-full max-w-xl md:max-w-2xl lg:max-w-3xl p-6 rounded-xl shadow-2xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6 transition-colors hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <h1 className={`text-3xl font-extrabold text-center mb-8 ${
          darkMode ? "text-blue-400" : "text-gray-800"
        }`}>
          BOOKING SUMMARY
        </h1>

        <div className={`p-6 rounded-xl mb-8 shadow-inner ${
          darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
        }`}>
          <div className="flex justify-between items-center pb-4 border-b border-gray-300">
            <span className="text-lg font-bold">Service Name</span>
            <span className="text-lg font-extrabold text-blue-600">
              {formData?.service || 'N/A'}
            </span>
          </div>
          <div className="space-y-3 pt-4">
            <div className="flex justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Subtotal</span>
              <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Tax</span>
              <span className="font-semibold">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Discount</span>
              <span className="font-semibold text-red-500">-₹{discount.toFixed(2)}</span>
            </div>
          </div>
          <hr className="my-4 border-t border-dashed border-gray-500" />
          <div className="flex justify-between font-bold text-xl">
            <span>Total amount</span>
            <span className={`text-2xl font-extrabold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}>
              ₹{totalAmount}
            </span>
          </div>
        </div>

        <h2 className={`text-2xl font-bold text-center mb-6 ${
          darkMode ? "text-blue-400" : "text-gray-800"
        }`}>
          PAYMENT METHOD
        </h2>

        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-1 rounded-xl ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
          {['Credit/Debit card', 'UPI payment', 'Net banking', 'Wallets'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 text-center
                ${paymentMethod === method
                  ? 'bg-blue-600 text-white shadow-md'
                  : `bg-transparent ${darkMode ? "text-gray-400 hover:bg-gray-600" : "text-gray-600 hover:bg-gray-300"}`
                }`}
            >
              {method}
            </button>
          ))}
        </div>

        <div className={`p-6 rounded-xl shadow-inner ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={paymentMethod}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderPaymentForm()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            message={`Your payment of ₹${totalAmount} for ${formData?.service} was successful!`}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;