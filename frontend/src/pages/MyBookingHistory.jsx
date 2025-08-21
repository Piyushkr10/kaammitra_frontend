import React, { useState, useEffect } from "react";

const BookHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [visibleBookings, setVisibleBookings] = useState(2);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Sort the bookings by date and time in descending order (most recent first)
    const sortedBookings = storedBookings.sort((a, b) => {
      // Combine date and time to create a comparable string
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      // Sort in descending order (b - a)
      return dateB - dateA;
    });

    setBookings(sortedBookings);
  }, []);

  const handleViewMore = () => {
    setVisibleBookings(bookings.length);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Booking History</h1>
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.slice(0, visibleBookings).map((booking, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{booking.service}</h2>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Service Type:</strong> {booking.serviceType}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Remarks:</strong> {booking.remarks}</p>
            </div>
          ))}
          {bookings.length > visibleBookings && (
            <div className="text-center mt-4">
              <button
                onClick={handleViewMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                View More
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