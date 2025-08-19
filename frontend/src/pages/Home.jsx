import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  isLoggedIn,
}) {
  const [city, setCity] = useState("Patna");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Cleaning Services",
      img: "repairing1.png",
      rating: 4.8,
      price: 299,
    },
    {
      id: 2,
      name: "Photography",
      img: "repairing2.png",
      rating: 4.9,
      price: 2999,
    },
    {
      id: 3,
      name: "Cooking Services",
      img: "https://placehold.co/300x400/525252/FFF?text=Cooking+Services",
      rating: 4.7,
      price: 599,
    },
    {
      id: 4,
      name: "Plumbing Services",
      img: "https://placehold.co/300x200/4287f5/FFF?text=Plumbing",
      rating: 4.6,
      price: 399,
    },
    {
      id: 5,
      name: "Electrical Repair",
      img: "https://placehold.co/300x200/f54291/FFF?text=Electrical",
      rating: 4.8,
      price: 499,
    },
    {
      id: 6,
      name: "Beauty Services",
      img: "https://placehold.co/300x200/42f55a/FFF?text=Beauty+Services",
      rating: 5.0,
      price: 999,
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

  // ✅ Book Now click → Service Details
  const handleBookNowClick = (serviceName) => {
    if (isLoggedIn) {
      navigate(`/service/${encodeURIComponent(serviceName)}`);
    } else {
      navigate("/signup"); // 🚀 Always signup first if not logged in
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

      {/* Hero Section */}
      <section className="relative h-full w-full rounded-b-3xl overflow-hidden">
        <img
          src={isLoggedIn ? "customer_landing.png" : "hero2.png"} // ✅ Dynamic image based on login
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
          {/* ✅ Book Now button */}
          <button
            onClick={() => handleBookNowClick("Cleaning Services")}
            className="bg-blue-700 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-800 transition-colors shadow-lg"
          >
            BOOK NOW
          </button>
        </div>
      </section>

      {/* Our Services */}
      <section
        className={`${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        } py-10 rounded-t-3xl shadow-inner`}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col"
            >
              <div className="relative">
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
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {service.name}
                </h3>
                <div className="mt-auto flex justify-between items-center">
                  <p className="font-bold text-lg text-gray-900">
                    Starting ₹{service.price}
                  </p>
                  <button
                    onClick={() => handleBookNowClick(service.name)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 text-sm"
                  >
                    Book Now →
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
          <HeartHandshake size={24} /> More Services
        </Link>
      </div>
    </div>
  );
}
