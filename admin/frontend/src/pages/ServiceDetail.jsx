import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle,
  Tag,
} from "lucide-react";

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const decodedName = decodeURIComponent(serviceName);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const service = services.find((s) => s.name === decodedName) || {
    name: decodedName,
    description: `Professional ${decodedName} service by verified experts. Book on-demand or schedule at your convenience. Transparent pricing and quality guaranteed.`,
    img: `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(decodedName)}`,
    icon: "❓",
    iconColor: "gray-500",
    rating: "4.5",
    price: "Price varies",
    features: [
      "Verified and trained professionals",
      "Fast response and reliable support",
      "Flexible scheduling",
      "Transparent pricing",
    ],
  };

  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
          <div className="flex flex-col md:flex-row">
            {/* Image Section - Left Side */}
            <div className="md:w-1/2 relative">
              <img
                src={service.img}
                alt={service.name}
                className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
                  {service.name}
                </h1>
              </div>
            </div>

            {/* Details Section - Right Side */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-lg mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Price and Features */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 text-2xl font-bold mb-4">
                    <Tag size={28} className="text-blue-500" />
                    <span>{service.price}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle
                          size={24}
                          className="text-blue-500 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-500">
                    <Star size={24} />
                    <span>
                      Average Rating: {service.rating}/5 (1,200+ reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-blue-500" />
                    <span>Available 24/7 for urgent requests</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={24} className="text-blue-500" />
                    <span>Serving your local area</span>
                  </div>
                </div>
              </div>

              {/* Call To Action Button */}
              <div className="mt-8 text-center md:text-left">
                <Link
                  to={`/booking/${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md w-full md:w-auto"
                >
                  <PhoneCall size={18} />
                  Book This Service Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* More Services Section */}
        <div className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Explore More Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.name !== decodedName)
              .map((s) => (
                <div
                  key={s.name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`text-4xl mb-4 text-${s.iconColor}`}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {s.description}
                  </p>
                  <Link
                    to={`/service/${encodeURIComponent(s.name)}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;