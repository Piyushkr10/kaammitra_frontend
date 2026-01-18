// src/components/ProfileJobs.jsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("providerToken") || localStorage.getItem("token");

// Create socket with token auth if available. Note: we pass a function to read token so if token changes on page load we reconnect.
const socket = io(SOCKET_URL, {
  withCredentials: true,
  auth: { token: getToken() },
});

const JobCard = ({ booking, onClick }) => {
  const customer = booking.userId || {};
  const service = booking.service || {};
  return (
    <div
      onClick={() => onClick(booking)}
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition bg-white dark:bg-gray-800"
    >
      <h3 className="font-semibold text-lg">{service.serviceName || booking.serviceType}</h3>
      <p className="text-sm text-gray-500">{booking.address}</p>
      <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">
        Rs {booking.price?.toLocaleString() ?? (service.price ? service.price.toLocaleString() : "N/A")}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{booking.city}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Customer: {customer.fullName || customer.name || "—"}
      </p>
    </div>
  );
};

const JobDetailsModal = ({ booking, onClose, onAction }) => {
  if (!booking) return null;
  const customer = booking.userId || {};
  const service = booking.service || {};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>

        <div className="space-y-3">
          <p><strong>Service:</strong> {service.serviceName || booking.serviceType}</p>
          <p><strong>Customer:</strong> {customer.fullName || "—"}</p>
          <p><strong>Phone:</strong> {customer.phoneNumber || customer.phone || "—"}</p>
          <p><strong>Address:</strong> {booking.address}</p>
          <p><strong>City:</strong> {booking.city}</p>
          <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Remarks:</strong> {booking.remarks || "—"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-semibold ${
              booking.status === "pending" ? "text-yellow-600" :
              booking.status === "accepted" || booking.status === "in-progress" ? "text-green-600" :
              booking.status === "completed" ? "text-blue-600" : "text-red-600"
            }`}>
              {booking.status}
            </span>
          </p>
          <p><strong>Price:</strong> Rs {booking.price ?? (service.price ?? "N/A")}</p>
        </div>

        <div className="mt-6 flex gap-2">
          {booking.status === "pending" && (
            <>
              <button onClick={() => onAction(booking, "accepted")} className="flex-1 bg-green-600 text-white py-2 rounded-lg">Accept</button>
              <button onClick={() => onAction(booking, "cancelled")} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Decline</button>
            </>
          )}

          {(booking.status === "accepted" || booking.status === "in-progress") && (
            <button onClick={() => onAction(booking, "completed")} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Mark Completed</button>
          )}
        </div>

        <button onClick={onClose} className="mt-4 w-full bg-gray-300 py-2 rounded-lg dark:bg-gray-700">Close</button>
      </div>
    </div>
  );
};

const ProfileJobs = ({ defaultTab = "Pending", onBack, onCountsUpdate }) => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const res = await axios.get(`${API_BASE}/jobs`);
      let arr = res.data?.bookings || [];

      // read provider stored data (set at login/registration)
      let providerData = null;
      try {
        providerData = JSON.parse(localStorage.getItem("providerData") || "null");
      } catch (e) {
        providerData = null;
      }

      const serviceArea = providerData?.serviceArea ? String(providerData.serviceArea).trim().toLowerCase() : null;

      // Only show bookings when provider.serviceArea matches booking.city (case-insensitive).
      // If provider has no serviceArea set, show zero bookings (per your request).
      if (serviceArea) {
        arr = arr.filter((b) => {
          const city = (b.city || "").toString().trim().toLowerCase();
          return city === serviceArea;
        });
      } else {
        arr = []; // provider has no serviceArea -> show 0 bookings
      }

      setBookings(arr);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // socket listeners
    socket.on("bookingAdded", (n) => {
      setBookings((prev) => [n, ...prev]);
    });
    socket.on("bookingUpdated", (u) => {
      setBookings((prev) => prev.map((b) => (b._id === u._id ? u : b)));
    });

    socket.on("connect_error", (e) => {
      console.warn("Socket connect error:", e);
    });

    return () => {
      socket.off("bookingAdded");
      socket.off("bookingUpdated");
      socket.off("connect_error");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onCountsUpdate) {
      const counts = {
        active: bookings.filter((b) => ["accepted", "in-progress"].includes(b.status)).length,
        pending: bookings.filter((b) => b.status === "pending").length,
        completed: bookings.filter((b) => b.status === "completed").length,
      };
      onCountsUpdate(counts);
    }
  }, [bookings, onCountsUpdate]);

  const filtered = bookings.filter((b) => {
    if (activeTab === "Pending") return b.status === "pending";
    if (activeTab === "Active") return ["accepted", "in-progress"].includes(b.status);
    if (activeTab === "Completed") return b.status === "completed";
    if (activeTab === "Cancelled") return b.status === "cancelled";
    return true;
  });

  const handleAction = async (booking, newStatus) => {
    try {
      const statusParam = String(newStatus).toLowerCase();
      await axios.patch(`${API_BASE}/jobs/${booking._id}/status`, { status: statusParam });
      // re-fetch to keep data consistent
      fetchBookings();
      setSelected(null);
    } catch (err) {
      console.error("Action error:", err);
      alert("Failed to update booking status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {onBack && (
        <button onClick={onBack} className="mb-6 bg-gray-200 dark:bg-gray-700 py-2 px-4 rounded">← Back</button>
      )}

      <div className="flex space-x-3 mb-6 overflow-x-auto">
        {["Pending", "Active", "Completed", "Cancelled"].map((t) => (
          <button key={t} onClick={() => setActiveTab(t)} className={`py-2 px-4 rounded-lg ${activeTab === t ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}>
            {t}
          </button>
        ))}
      </div>

      <div>
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => <JobCard key={b._id} booking={b} onClick={setSelected} />)}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500">No {activeTab.toLowerCase()} bookings found.</p>
        )}
      </div>

      {selected && <JobDetailsModal booking={selected} onClose={() => setSelected(null)} onAction={handleAction} />}
    </div>
  );
};

export default ProfileJobs;
