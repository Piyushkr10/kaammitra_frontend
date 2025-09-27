import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Star,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// Import the new ServicesMenu component
import ServicesMenu from "./ServicesMenu";

export default function Home({
  darkMode,
  handleEmergencyClick,
  userName,
  menuOpen,
  toggleMenu,
  isLoggedIn,
}) {
  const [city, setCity] = useState("Patna");
  // State for the active category
  const [activeCategory, setActiveCategory] = useState("All Services");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Define services with a category property
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Cleaning Services",
      img: "repairing1.png",
      rating: 4.8,
      price: 299,
      category: "Home Services"
    },
    {
      id: 2,
      name: "Photography",
      img: "repairing2.png",
      rating: 4.9,
      price: 2999,
      category: "Professional Works"
    },
    {
      id: 3,
      name: "Cooking",
      img: "https://placehold.co/300x400/525252/FFF?text=Cooking+Services",
      rating: 4.7,
      price: 599,
      category: "Home Services"
    },
    {
      id: 4,
      name: "Plumbing",
      img: "https://placehold.co/300x200/4287f5/FFF?text=Plumbing",
      rating: 4.6,
      price: 399,
      category: "Home Services"
    },
    {
      id: 5,
      name: "Electrical",
      img: "https://placehold.co/300x200/f54291/FFF?text=Electrical",
      rating: 4.8,
      price: 499,
      category: "Home Services"
    },
    {
      id: 6,
      name: "Beauty Services",
      img: "https://placehold.co/300x200/42f55a/FFF?text=Beauty+Services",
      rating: 5.0,
      price: 999,
      category: "Per day Services"
    },
    {
      id: 7,
      name: "Web Development",
      img: "https://placehold.co/300x200/525252/FFF?text=Web+Dev",
      rating: 4.9,
      price: 5000,
      category: "Digital Works"
    },
    {
      id: 8,
      name: "SEO Services",
      img: "https://placehold.co/300x200/4287f5/FFF?text=SEO",
      rating: 4.7,
      price: 2500,
      category: "Digital Works"
    },
    {
      id: 9,
      name: "Medical Emergency",
      img: "https://placehold.co/300x200/e63946/FFF?text=Medical+Emergency",
      rating: 5.0,
      price: 1500,
      category: "Emergency service"
    },
  ]);

  // Mock data for top providers
  const topProviders = [
    { id: 1, name: "Rohit Kumar", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
    { id: 2, name: "Anjali Sharma", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
    { id: 3, name: "Suresh Gupta", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
    { id: 4, name: "Priya Singh", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
    { id: 5, name: "Rahul Verma", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
    { id: 6, name: "Sneha Reddy", rating: 5, img: "https://placehold.co/150x150/94A3B8/FFF?text=Provider" },
  ];

  const handleBookNowClick = (serviceName) => {
    if (isLoggedIn) {
      navigate(`/service/${encodeURIComponent(serviceName)}`);
    } else {
      navigate("/login"); // Redirect to login page
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Filter services based on the active category
  const filteredServices = activeCategory === "All Services"
    ? services
    : services.filter(service => service.category === activeCategory);

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
        <section className="relative h-full w-full overflow-hidden">
          <img
            src={isLoggedIn ? "customer_landing.png" : "hero2.png"}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
            {userName && (
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {`Welcome, ${userName}!`}
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
                  placeholder="Search for services..."
                  className="px-3 py-2 text-black outline-none flex-grow"
                />
                <button className="px-2 text-gray-400 transition-colors hover:bg-blue-800 rounded-r-lg">
                  <Search />
                </button>
              </div>
            </div>
            {/*
              * The `onClick` handler for this button has been updated.
              * It now checks the `isLoggedIn` prop and navigates directly
              * to the "/moreservices" or "/login" routes, as requested.
              */}
            <button
              onClick={() => isLoggedIn ? navigate("/moreservices") : navigate("/login")}
              className="bg-blue-700 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-800 transition-colors shadow-lg"
            >
              Book Now
            </button>
          </div>
        </section>

        {/* Our Services */}
        <section
          className="bg-gray-100 dark:bg-gray-900
                      py-10 shadow-inner transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-500 mb-6">
            Our Services
          </h2>

          {/* New Services Menu component */}
          <div className="mb-6">
            <ServicesMenu
              activeCategory={activeCategory}
              onCategoryClick={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {/* Use the filteredServices array */}
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
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
                        {`Starting from ₹${service.price}`}
                      </p>
                      <button
                        onClick={() => handleBookNowClick(service.name)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 text-sm transition-colors"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
                No services found for this category.
              </p>
            )}
          </div>
        </section>

        {/* More Services Link */}
        <div className="flex justify-center py-6">
          <button
            onClick={() => isLoggedIn ? navigate("/moreservices") : navigate("/login")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <HeartHandshake size={24} /> More Services
          </button>
        </div>

        {/* Emergency Services */}
        <div className="bg-red-600 rounded-3xl mx-4 my-8 p-6 flex flex-col sm:flex-row justify-between items-center text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Emergency Services
            </h3>
          </div>
          <button
            onClick={handleEmergencyClick}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-md w-full sm:w-auto text-center"
          >
            Request Now
          </button>
        </div>

        {/* Our Top Providers */}
        <section className="py-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 dark:text-blue-500 mb-6">
            Our Top Providers
          </h2>
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg z-10 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto no-scrollbar py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox and IE
            >
              {topProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center p-4 text-center"
                >
                  <img
                    src={provider.img}
                    alt={provider.name}
                    className="w-32 h-32 rounded-full object-cover mb-4 shadow"
                  />
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {provider.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(provider.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500" fill="gold" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg z-10 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}