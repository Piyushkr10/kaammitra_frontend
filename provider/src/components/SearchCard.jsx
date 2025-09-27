import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ addService }) => {
  const [selectedLocation, setSelectedLocation] = useState("Patna");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const cities = ["Patna", "Delhi", "Mumbai", "Kolkata"];

  const handleLocationClick = (city) => {
    setSelectedLocation(city);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "70vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="flex flex-col items-center space-y-4 max-w-2xl w-full px-4">
        {/* Search Bar */}
        <div className="relative flex items-center rounded-full shadow-2xl bg-white bg-opacity-80 backdrop-blur-md w-full h-16">
          <div className="relative h-full z-10">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-full px-6 py-2 bg-gradient-to-r from-[#98d7ff] to-[#a284e3] text-white text-lg font-medium outline-none border-r-2 border-gray-100/20 rounded-full flex items-center justify-between space-x-2 pr-10"
            >
              <span>{selectedLocation}</span>
              <span className={`transform ${isDropdownOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg bg-white overflow-hidden text-gray-800">
                {cities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleLocationClick(city)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="Search for the service"
            className="flex-grow px-4 py-2 text-gray-800 outline-none bg-transparent placeholder-gray-400 text-lg"
          />

          <button className="h-full w-16 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            🔍
          </button>
        </div>

        {/* Add Services Button */}
        <button
          onClick={() => navigate("/addservice")}
          className="px-12 py-3 bg-blue-900 text-white rounded-full font-bold shadow-2xl hover:bg-blue-800 transition-all transform hover:scale-105 text-sm md:text-lg"
        >
          Add Services
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
