import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Search,
  Star,
  HeartHandshake,
} from "lucide-react";

export default function Home({
  darkMode,
  handleEmergencyClick,
  userName,
  menuOpen,
  toggleMenu,
  isLoggedIn,
}) {
  const { t } = useTranslation();
  const [city, setCity] = useState("Patna");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: t("service_names.cleaning"),
      img: "repairing1.png",
      rating: 4.8,
      price: 299,
    },
    {
      id: 2,
      name: t("service_names.photography"),
      img: "repairing2.png",
      rating: 4.9,
      price: 2999,
    },
    {
      id: 3,
      name: t("service_names.cooking"),
      img: "https://placehold.co/300x400/525252/FFF?text=Cooking+Services",
      rating: 4.7,
      price: 599,
    },
    {
      id: 4,
      name: t("service_names.plumbing"),
      img: "https://placehold.co/300x200/4287f5/FFF?text=Plumbing",
      rating: 4.6,
      price: 399,
    },
    {
      id: 5,
      name: t("service_names.electrical"),
      img: "https://placehold.co/300x200/f54291/FFF?text=Electrical",
      rating: 4.8,
      price: 499,
    },
    {
      id: 6,
      name: t("service_names.beauty"),
      img: "https://placehold.co/300x200/42f55a/FFF?text=Beauty+Services",
      rating: 5.0,
      price: 999,
    },
  ];

  const handleBookNowClick = (serviceName) => {
    if (isLoggedIn) {
      navigate(`/service/${encodeURIComponent(serviceName)}`);
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white
                 min-h-screen font-sans relative overflow-hidden transition-colors duration-300"
    >
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-full w-full rounded-b-3xl overflow-hidden">
          <img
            src={isLoggedIn ? "customer_landing.png" : "hero2.png"}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
            {userName && (
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {t("welcome_user", { userName })}
              </h1>
            )}
            <div className="flex flex-col md:flex-row gap-2 mb-4 w-full max-w-xl">
              <div className="flex bg-white rounded-3xl overflow-hidden shadow-md w-full">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-yellow-300 rounded-md p-2 text-black shadow-md">
                  <MapPin size={20} className="text-blue-700" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent outline-none border-none pr-4"
                  >
                    <option>Patna</option>
                    <option>Delhi</option>
                    <option>Mumbai</option>
                    <option>Kolkata</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="px-3 py-2 text-black outline-none flex-grow"
                />
                <button className="px-2 text-gray-400 transition-colors hover:bg-blue-800 rounded-r-lg">
                  <Search />
                </button>
              </div>
            </div>
            <button
              onClick={() => handleBookNowClick("Cleaning Services")}
              className="bg-blue-700 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-800 transition-colors shadow-lg"
            >
              {t("book_now")}
            </button>
          </div>
        </section>

        {/* Our Services */}
        <section
          className="bg-gray-100 dark:bg-gray-900
                     py-10 rounded-t-3xl shadow-inner transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-500 mb-6">
            {t("our_services")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800
                             rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" fill="gold" />
                    <span className="font-semibold text-sm">
                      {service.rating}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                    {service.name}
                  </h3>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {t("starting_from")} ₹{service.price}
                    </p>
                    <button
                      onClick={() => handleBookNowClick(service.name)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 text-sm transition-colors"
                    >
                      {t("book_now")} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* More Services */}
        <div className="flex justify-center py-6">
          <Link
            to={isLoggedIn ? "/moreservices" : "/signup"}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <HeartHandshake size={24} /> {t("more_services")}
          </Link>
        </div>
      </div>
    </div>
  );
}