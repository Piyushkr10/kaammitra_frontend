import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout function from App.jsx
    onLogout();

    // Redirect to login page after 1.5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [onLogout, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Logging you out...
        </h2>
        <p className="text-gray-500 mt-2">Please wait.</p>
      </div>
    </div>
  );
}
