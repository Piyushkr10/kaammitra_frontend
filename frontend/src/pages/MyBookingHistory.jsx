import React, { useState, useEffect } from "react";
import { ArrowUp } from 'lucide-react';

const BookHistory = ({ darkMode }) => {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(2);

  useEffect(() => {
    // Get the bookings from local storage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Sort the bookings by date and time in descending order (most recent first)
    const sortedBookings = storedBookings.sort((a, b) => {
      // Use the new transactionDate for a more precise sort
      const dateA = new Date(a.transactionDate);
      const dateB = new Date(b.transactionDate);
      // Sort in descending order (b - a)
      return dateB - dateA;
    });

    setBookings(sortedBookings);
  }, []);

  const handleViewMore = () => {
    setVisibleBookings(bookings.length);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">My Booking History</h1>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.slice(0, visibleBookings).map((booking, index) => (
            <div key={index} className={`p-4 rounded-xl shadow-md transition-colors ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{booking.service}</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Service Type:</strong> {booking.serviceType}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Remarks:</strong> {booking.remarks || 'No remarks provided.'}</p>
                <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                <p><strong>Total Amount Paid:</strong> ₹{booking.totalAmount}</p>
              </div>
            </div>
          ))}
          {bookings.length > visibleBookings && (
            <div className="text-center mt-4">
              <button
                onClick={handleViewMore}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all"
              >
                Show All Past Bookings
              </button>
            </div>
          )}
          {bookings.length > 2 && visibleBookings === bookings.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleScrollToTop}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition-all flex items-center mx-auto"
              >
                <ArrowUp size={20} className="mr-2" />
                Back to Top
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center">You have no past bookings.</p>
      )}
    </div>
  );
};

export default BookHistory;