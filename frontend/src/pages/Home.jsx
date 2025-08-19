import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Star,
  ShieldCheck,
  Clock,
  CreditCard,
  PhoneCall,
  HeartHandshake,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home({
  darkMode,
  handleEmergencyClick,
  userName,
  menuOpen,
  toggleMenu,
}) {
  const [city, setCity] = useState("Patna");
  const scrollRef = useRef(null);

  // Using placeholder images with different aspect ratios for demonstration
  const services = [
    {
      name: "Cleaning Services",
      img: "repairing1.png",
      rating: 4.8,
      price: 299,
    },
    {
      name: "Photography",
      img: "repairing2.png",
      rating: 4.9,
      price: 2999,
    },
    {
      name: "Cooking Services",
      img: "https://placehold.co/300x400/525252/FFF?text=Cooking+Services",
      rating: 4.7,
      price: 599,
    },
  ];

  const providers = [
    { name: "Rohit Kumar", img: "https://placehold.co/400x400/000/FFF?text=Rohit+Kumar", rating: 5 },
    { name: "Suman Sharma", img: "https://placehold.co/300x300/000/FFF?text=Suman+Sharma", rating: 5 },
    { name: "Rahul Singh", img: "https://placehold.co/500x500/000/FFF?text=Rahul+Singh", rating: 5 },
    { name: "Anjali Gupta", img: "https://placehold.co/450x450/000/FFF?text=Anjali+Gupta", rating: 5 },
    { name: "Priya Das", img: "https://placehold.co/350x350/000/FFF?text=Priya+Das", rating: 5 },
    { name: "Vikram Yadav", img: "https://placehold.co/550x550/000/FFF?text=Vikram+Yadav", rating: 5 },
    { name: "Neha Verma", img: "https://placehold.co/250x250/000/FFF?text=Neha+Verma", rating: 5 },
  ];

  const Feature = ({ icon, text }) => (
    <div className="flex items-center gap-2">
      <span className="text-blue-700 text-xl">{icon}</span>
      <span className="text-blue-700">{text}</span>
    </div>
  );

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-gray-800"
      } min-h-screen font-sans relative`}
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="p-2 m-4 bg-blue-500 text-white rounded-lg md:hidden fixed top-4 left-4 z-50"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-2/3 h-screen bg-blue-100 shadow-lg p-6 z-40 md:hidden">
          <nav className="flex flex-col space-y-4 text-blue-700 font-medium">
            <Link to="/" onClick={toggleMenu} className="hover:underline">
              Home
            </Link>
            <Link
              to="/moreservices"
              onClick={toggleMenu}
              className="hover:underline"
            >
              More Services
            </Link>
            <Link
              to="/book-history"
              onClick={toggleMenu}
              className="hover:underline"
            >
              Booking History
            </Link>
            <Link
              to="/settings"
              onClick={toggleMenu}
              className="hover:underline"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-full w-full rounded-b-3xl overflow-hidden">
        <img
          src="hero2.png"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          {userName && (
            <h1 className="text-4xl font-bold mb-4">Welcome, {userName}!</h1>
          )}
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <div className="flex bg-white rounded-3xl overflow-hidden shadow-md">
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
                placeholder="Search for the service"
                className="px-3 py-2 text-black outline-none w-full md:w-auto"
              />
              <button className="px-2 text-gray-400 transition-colors hover:bg-blue-800 rounded-r-lg">
                <Search />
              </button>
            </div>
          </div>
          <Link
            to="/moreservices"
            className="bg-blue-700 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-800 transition-colors shadow-lg"
          >
            BOOK NOW
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 text-center container mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Why Choose Kaammitra?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-blue-700">
          <Feature icon={<ShieldCheck />} text="Skill Verified Profiles" />
          <Feature icon={<MapPin />} text="Urban & Rural Workforce" />
          <Feature icon={<Clock />} text="Smart Job Allocation" />
          <Feature icon={<Star />} text="Feedback & Ratings" />
          <Feature icon={<Clock />} text="Emergency Dispatch" />
          <Feature icon={<CreditCard />} text="Secure Payments" />
        </div>
      </section>

      {/* Our Services */}
      <section
        className={`${
          darkMode ? "bg-gray-900" : "bg-white"
        } py-10 rounded-t-3xl shadow-inner`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-yellow-300 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
            >
              {/* Image with Rating */}
              <div className="relative">
                {/* * The object-cover class ensures the image covers the container
                  * while maintaining its aspect ratio. 
                  * The fixed height (h-48) ensures consistent card size.
                  * w-full ensures it stretches to the full width of the container.
                */}
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" fill="gold" />
                  <span className="font-semibold text-sm">
                    {service.rating}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {service.name}
                </h3>

                {/* Price & Button */}
                <div className="mt-auto flex justify-between items-center">
                  <p className="font-bold text-lg text-gray-900">
                    Starting ₹{service.price}
                  </p>
                  <Link
                    to="/moreservices"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 text-sm"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More Services Button */}
      <div className="flex justify-center py-6">
        <Link
          to="/moreservices"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <HeartHandshake size={24} /> More Services
        </Link>
      </div>

      {/* Emergency Section */}
      <section
        className={`${
          darkMode ? "bg-red-900" : "bg-red-100"
        } py-10 text-center mt-10`}
      >
        <h2 className="text-3xl font-bold text-red-700 mb-4">
          Emergency Help Available 24/7
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-700">
          Need urgent assistance? Our team is ready to respond to your needs at
          any hour. From plumbing issues to electrical faults, we’ve got you
          covered.
        </p>
        <button
          onClick={handleEmergencyClick}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full mx-auto hover:bg-red-700 transition-colors"
        >
          <PhoneCall /> Request Now
        </button>
      </section>

      {/* Our Top Providers Section */}
      <section className="py-10 text-center container mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Our Top Providers
        </h2>
        <div className="relative">
          <button
            onClick={() => scroll(-200)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-md z-10 hover:bg-gray-300"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 scroll-smooth scrollbar-hide"
          >
            {providers.map((provider, index) => (
              <div
                key={index}
                className="flex-none w-48 text-center p-4 bg-gray-100 rounded-lg shadow-md"
              >
                {/* * The object-cover class ensures the image covers the container
                  * while maintaining its aspect ratio. 
                  * The fixed height (h-48) ensures consistent card size.
                */}
                <img
                  src={provider.img}
                  alt={provider.name}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <div className="flex justify-center mt-1">
                  {[...Array(provider.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="gold" stroke="gold" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll(200)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-md z-10 hover:bg-gray-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
