import React from "react";
import { Link, useParams } from "react-router-dom";
import { Star, Clock, MapPin, PhoneCall, CheckCircle } from "lucide-react";

const ServiceDetail = ({ darkMode }) => {
  const { serviceName } = useParams();
  const decodedName = decodeURIComponent(serviceName);

  // Known services with detailed info
  const serviceDetails = {
    "Cleaning Services": {
      img: "https://placehold.co/800x400/525252/FFF?text=Cleaning+Services",
      description:
        "Our professional cleaning services ensure your space is spotless and hygienic. We offer deep cleaning, regular maintenance, and custom packages for homes and offices.",
      features: [
        "Experienced and verified professionals",
        "Eco-friendly cleaning products",
        "Flexible scheduling",
        "Satisfaction guarantee",
      ],
    },
    "Cooking Services": {
      img: "https://placehold.co/800x400/525252/FFF?text=Cooking+Services",
      description:
        "Hire a personal chef to prepare delicious and healthy meals tailored to your dietary needs. Perfect for busy individuals, families, or special occasions.",
      features: [
        "Customized meal plans",
        "Weekly or daily chef service",
        "Catering for small events",
        "Experienced and creative chefs",
      ],
    },
    "Beauty Services": {
      img: "https://placehold.co/800x400/525252/FFF?text=Beauty+Services",
      description:
        "Pamper yourself with our professional beauty services at home. From facials and hair styling to complete makeovers, we bring salon-quality service to you.",
      features: [
        "Trained beauticians",
        "Premium beauty products",
        "Home service convenience",
        "Affordable packages",
      ],
    },
    "Repairing Services": {
      img: "https://placehold.co/800x400/525252/FFF?text=Repairing+Services",
      description:
        "Quick and reliable repair services for all your household and office needs. From electrical fixes to furniture repair, our experts have you covered.",
      features: [
        "Skilled technicians",
        "On-time service",
        "Warranty on repairs",
        "24/7 availability",
      ],
    },
    Photography: {
      img: "https://placehold.co/800x400/525252/FFF?text=Photography",
      description:
        "Capture your special moments with our professional photography services. Perfect for weddings, parties, portraits, and commercial shoots.",
      features: [
        "Creative and skilled photographers",
        "High-quality cameras & equipment",
        "Customizable packages",
        "Photo & video editing included",
      ],
    },
    "Plumbing Services": {
      img: "https://placehold.co/800x400/525252/FFF?text=Plumbing+Services",
      description:
        "Expert plumbing services to fix leaks, install fixtures, and handle emergencies quickly and reliably.",
      features: [
        "Licensed plumbers",
        "Emergency support available",
        "Affordable pricing",
        "Guaranteed service quality",
      ],
    },
    "Electrical Repair": {
      img: "https://placehold.co/800x400/525252/FFF?text=Electrical+Repair",
      description:
        "Reliable electrical repair and installation services by certified experts.",
      features: [
        "Certified electricians",
        "Fast and safe repairs",
        "24/7 service available",
        "Transparent pricing",
      ],
    },
  };

  // Fallback service for dynamic routes
  const fallback = {
    img: `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(
      decodedName
    )}`,
    description: `Professional ${decodedName} service by verified experts. Book on-demand or schedule at your convenience. Transparent pricing and quality guaranteed.`,
    features: [
      "Verified and trained professionals",
      "Fast response and reliable support",
      "Flexible scheduling",
      "Transparent pricing",
    ],
  };

  const service = serviceDetails[decodedName] || fallback;

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      } min-h-screen font-sans`}
    >
      <div className="container mx-auto px-4 py-8">
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg overflow-hidden`}
        >
          {/* Banner Image with Overlay */}
          <div className="relative">
            <img
              src={service.img}
              alt={decodedName}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
                {decodedName}
              </h1>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            <p className="text-lg mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

            {/* Extra Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-500">
                <Star size={24} />
                <span>Average Rating: 4.8/5 (1,200+ reviews)</span>
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

            {/* Call To Action Button */}
            <div className="mt-8 text-center">
              <Link
                to={`/booking/${encodeURIComponent(decodedName)}`}
                className="flex items-center justify-center mx-auto gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <PhoneCall size={18} />
                Book This Service Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
