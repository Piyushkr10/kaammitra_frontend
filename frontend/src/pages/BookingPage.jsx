import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

const BookingPage = ({ darkMode }) => {
  const { serviceName } = useParams();
  const decodedService = decodeURIComponent(serviceName); // ✅ Decode URL param
  const navigate = useNavigate();

  // Get current date for min attribute on date input
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const dd = String(today.getDate()).padStart(2, '0');
  const currentDate = `${yyyy}-${mm}-${dd}`;

  const [formData, setFormData] = useState({
    service: "",
    serviceType: "",
    name: "",
    address: "",
    date: "",
    time: "",
    remarks: "",
  });

  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  // ✅ Pre-fill service name when page loads
  useEffect(() => {
    if (decodedService) {
      setFormData((prev) => ({ ...prev, service: decodedService }));
    }
  }, [decodedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // ✅ New function to handle date change and validate
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, date: selectedDate });
    // Reset time if a new date is selected
    if (selectedDate !== formData.date) {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };
  
  // ✅ New function to handle time change and validate
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const now = new Date();
    const selectedDateTime = new Date(`${formData.date}T${selectedTime}`);

    // If the selected date is today, check if the selected time is in the past
    if (formData.date === currentDate && selectedDateTime < now) {
      setPopup({
        show: true,
        type: "error",
        message: "🚫 Please select a time in the future.",
      });
      setFormData({ ...formData, time: "" }); // Clear the invalid time
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
    } else {
      setFormData({ ...formData, time: selectedTime });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const { serviceType, name, address, date, time, remarks } = formData;
    if (!serviceType || !name || !address || !date || !time || !remarks) {
      setPopup({
        show: true,
        type: "error",
        message: "⚠️ Please fill in all fields before submitting.",
      });
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
      return;
    }
    
    // ✅ Final validation to prevent past bookings
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDateTime < now) {
      setPopup({
        show: true,
        type: "error",
        message: "🚫 The date or time you selected is in the past. Please choose a future time.",
      });
      setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
      return;
    }

    console.log("Booking submitted:", formData);

    // ✅ Save the new booking to localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedBookings = [...storedBookings, formData];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Success popup
    setPopup({
      show: true,
      type: "success",
      message: "✅ Booking submitted successfully! Redirecting...",
    });

    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
      // ✅ Pass the formData object to the next page as state
      navigate("/payment", { state: { formData } });
    }, 2000);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-8 rounded-lg shadow-lg relative ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* ✅ Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          COMPLETE YOUR BOOKING
        </h2>

        {/* ✅ Popup Notification */}
        {popup.show && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg flex items-center gap-2 ${
              popup.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {popup.type === "error" ? (
              <AlertCircle size={20} />
            ) : (
              <CheckCircle2 size={20} />
            )}
            <span>{popup.message}</span>
          </div>
        )}

        {/* ✅ Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Name */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-200"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Service */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Service
            </label>
            <input
              type="text"
              name="service"
              value={formData.service}
              readOnly
              className="w-full border rounded-md p-2 bg-gray-200"
            />
          </div>

          {/* Service Type */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Service type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-200"
              placeholder="Enter service type"
              required
            />
          </div>

        
          {/* Address */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-200"
              placeholder="Enter address"
              required
            />
            <div className="flex justify-between text-sm mt-1">
              <button
                type="button"
                className="flex items-center gap-1 text-blue-600"
              >
                <MapPin size={16} /> Add new address
              </button>
              <button type="button" className="text-blue-600">
                change
              </button>
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1 ">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleDateChange} // Use new handler
                className="w-1/2 border rounded-md p-2 bg-gray-200"
                min={currentDate} // Restrict past dates
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleTimeChange} // Use new handler
                className="w-1/2 border rounded-md p-2 bg-gray-200"
                required
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-semibold text-blue-900 mb-1">
              Remarks <span className="text-red-500">*</span>
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border rounded-md p-2 bg-gray-200"
              placeholder="Any additional remarks"
              rows="3"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900"
          >
            SUBMIT & TOKEN PAYMENT
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;