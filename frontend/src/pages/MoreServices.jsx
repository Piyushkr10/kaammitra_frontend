import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MoreServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8; // Show 8 cards per page

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data.services); // Accessing the 'services' array from the JSON
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-800 dark:text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(services.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  return (
    <div
      className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white
                 min-h-screen font-sans py-10 transition-colors duration-300"
    >
      <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
        Explore More Services
      </h1>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 container mx-auto">
        {currentServices.map((service) => (
          <Link
            to={`/service/${encodeURIComponent(service.name)}`}
            key={service.name}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer block
                        border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center font-medium">{service.name}</div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-lg border transition-colors duration-300
                         ${
                           currentPage === index + 1
                             ? "bg-blue-600 text-white"
                             : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                         }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}