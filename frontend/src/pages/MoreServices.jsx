import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MoreServices() {
  // Full service list
  const allServices = [
    { name: "Cleaning Services", img: "https://placehold.co/400x200/525252/FFF?text=Cleaning+Services" },
    { name: "Photography", img: "https://placehold.co/400x200/525252/FFF?text=Photography" },
    { name: "Cooking", img: "https://placehold.co/400x200/525252/FFF?text=Cooking" },
    { name: "Repairing Services", img: "https://placehold.co/400x200/525252/FFF?text=Repairing+Services" },
    { name: "Beauty Services", img: "https://placehold.co/400x200/525252/FFF?text=Beauty+Services" },
    { name: "Event Planning", img: "https://placehold.co/400x200/525252/FFF?text=Event+Planning" },
    { name: "Painting", img: "https://placehold.co/400x200/525252/FFF?text=Painting" },
    { name: "Electrician Services", img: "https://placehold.co/400x200/525252/FFF?text=Electrician+Services" },
    { name: "Plumbing Services", img: "https://placehold.co/400x200/525252/FFF?text=Plumbing+Services" },
    { name: "Carpentry Services", img: "https://placehold.co/400x200/525252/FFF?text=Carpentry+Services" },
    { name: "Gardening", img: "https://placehold.co/400x200/525252/FFF?text=Gardening" },
    { name: "Home Shifting", img: "https://placehold.co/400x200/525252/FFF?text=Home+Shifting" },
    { name: "AC Repair", img: "https://placehold.co/400x200/525252/FFF?text=AC+Repair" },
    { name: "Car Wash", img: "https://placehold.co/400x200/525252/FFF?text=Car+Wash" },
    { name: "IT Support", img: "https://placehold.co/400x200/525252/FFF?text=IT+Support" },
    // 👉 Add more services as needed
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8; // Show 8 cards per page

  // Pagination logic
  const totalPages = Math.ceil(allServices.length / servicesPerPage);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = allServices.slice(indexOfFirstService, indexOfLastService);

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
