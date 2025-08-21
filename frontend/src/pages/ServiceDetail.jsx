import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  PhoneCall,
  CheckCircle,
  Tag,
  Hammer,
  Palette,
  Droplet,
  Zap,
  Brush,
  Utensils,
  Camera,
  HeartHandshake,
  Wrench,
  SprayCan,
  Building,
  Car,
  Computer,
  Sprout,
  HardHat,
} from "lucide-react";

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const decodedName = decodeURIComponent(serviceName);

  const allServices = [
    {
      name: "Cleaning Services",
      description: "Keep your space sparkling clean with our professional cleaning services for homes and offices.",
      img: "/repairing1.png", // Correct path for public folder image
      icon: <Brush className="h-10 w-10 text-blue-500" />,
      rating: 4.8,
      price: "$75 - $250",
      features: [
        "Experienced and verified professionals",
        "Eco-friendly cleaning products",
        "Flexible scheduling",
        "Satisfaction guarantee",
      ],
    },
    {
      name: "Photography",
      description: "Capture your special moments with our professional photography services. Perfect for weddings, parties, and portraits.",
      img: "/repairing2.png", // Correct path for public folder image
      icon: <Camera className="h-10 w-10 text-blue-500" />,
      rating: 4.9,
      price: "$200 - $1000+",
      features: [
        "Creative and skilled photographers",
        "High-quality cameras & equipment",
        "Customizable packages",
        "Photo & video editing included",
      ],
    },
    // ... rest of your services array with updated paths ...
    {
      name: "Cooking",
      description: "Hire a personal chef to prepare delicious and healthy meals tailored to your dietary needs.",
      img: "/cooking.png",
      icon: <Utensils className="h-10 w-10 text-blue-500" />,
      rating: 4.7,
      price: "$100 - $500",
      features: [
        "Customized meal plans",
        "Weekly or daily chef service",
        "Catering for small events",
        "Experienced and creative chefs",
      ],
    },
    {
      name: "Plumbing Services",
      description: "Expert plumbing services to fix leaks, install fixtures, and handle emergencies quickly and reliably.",
      img: "/plumbing.png",
      icon: <Droplet className="h-10 w-10 text-blue-500" />,
      rating: 4.6,
      price: "$50 - $300",
      features: [
        "Licensed plumbers",
        "Emergency support available",
        "Affordable pricing",
        "Guaranteed service quality",
      ],
    },
    {
      name: "Electrician Services",
      description: "Reliable electrical repair and installation services by certified experts. We handle everything from wiring to fixtures.",
      img: "/electrician.png",
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      rating: 4.8,
      price: "$45 - $250",
      features: [
        "Certified electricians",
        "Fast and safe repairs",
        "24/7 service available",
        "Transparent pricing",
      ],
    },
    {
      name: "Beauty Services",
      description: "Pamper yourself with our professional beauty services at home. From facials to complete makeovers.",
      img: "/beauty.png",
      icon: <Palette className="h-10 w-10 text-blue-500" />,
      rating: 5.0,
      price: "$50 - $300",
      features: [
        "Trained beauticians",
        "Premium beauty products",
        "Home service convenience",
        "Affordable packages",
      ],
    },
    {
      name: "Repairing Services",
      description: "Quick and reliable repair services for all your household and office needs. From electrical to furniture.",
      img: "/repairing_services.png",
      icon: <Wrench className="h-10 w-10 text-blue-500" />,
      rating: 4.5,
      price: "$40 - $200",
      features: [
        "Skilled technicians",
        "On-time service",
        "Warranty on repairs",
        "24/7 availability",
      ],
    },
    {
      name: "Event Planning",
      description: "Organize the perfect event with our professional planning services, from corporate gatherings to private parties.",
      img: "/event_planning.png",
      icon: <Building className="h-10 w-10 text-blue-500" />,
      rating: 4.9,
      price: "$500 - $5000+",
      features: [
        "Customized event concepts",
        "Vendor management",
        "On-site coordination",
        "Budget planning",
      ],
    },
    {
      name: "Painting",
      description: "Transform your home with our professional painting services. High-quality work for both interior and exterior.",
      img: "/painting.png",
      icon: <HardHat className="h-10 w-10 text-blue-500" />,
      rating: 4.7,
      price: "$300 - $1500+",
      features: [
        "Experienced painters",
        "Quality paints and materials",
        "Preparation and cleanup included",
        "Affordable packages",
      ],
    },
    {
      name: "Carpentry Services",
      description: "Expert carpentry services for custom furniture, repairs, and installations. Crafting quality with every cut.",
      img: "/carpentry.png",
      icon: <Hammer className="h-10 w-10 text-blue-500" />,
      rating: 4.6,
      price: "$60 - $400",
      features: [
        "Skilled craftsmen",
        "Custom designs",
        "Furniture assembly and repair",
        "On-site consultations",
      ],
    },
    {
      name: "Gardening",
      description: "Professional gardening and landscaping services to keep your garden beautiful and healthy all year round.",
      img: "/gardening.png",
      icon: <Sprout className="h-10 w-10 text-blue-500" />,
      rating: 4.8,
      price: "$50 - $250",
      features: [
        "Experienced gardeners",
        "Lawn mowing and maintenance",
        "Planting and weeding",
        "Landscaping design",
      ],
    },
    {
      name: "Home Shifting",
      description: "Stress-free home shifting services. We handle packing, loading, transportation, and unloading with care and efficiency.",
      img: "/home_shifting.png",
      icon: <HeartHandshake className="h-10 w-10 text-blue-500" />,
      rating: 4.7,
      price: "$500 - $2000+",
      features: [
        "Professional packers and movers",
        "Secure and insured transportation",
        "Quick and timely relocation",
        "Affordable packages",
      ],
    },
    {
      name: "AC Repair",
      description: "Fast and reliable AC repair and maintenance services to keep you cool during the summer.",
      img: "/ac_repair.png",
      icon: <Car className="h-10 w-10 text-blue-500" />,
      rating: 4.6,
      price: "$80 - $350",
      features: [
        "Certified technicians",
        "Service for all major brands",
        "Quick diagnosis and repair",
        "Warranty on parts",
      ],
    },
    {
      name: "Car Wash",
      description: "Convenient at-home car wash services. We leave your vehicle sparkling clean inside and out.",
      img: "/car_wash.png",
      icon: <Car className="h-10 w-10 text-blue-500" />,
      rating: 4.5,
      price: "$30 - $100",
      features: [
        "Eco-friendly washing products",
        "Interior and exterior cleaning",
        "Flexible scheduling",
        "Detailing services available",
      ],
    },
    {
      name: "IT Support",
      description: "Expert IT support for all your tech needs, from software issues to hardware repairs.",
      img: "/it_support.png",
      icon: <Computer className="h-10 w-10 text-blue-500" />,
      rating: 4.9,
      price: "$50 - $200",
      features: [
        "Remote and on-site support",
        "Virus removal and data recovery",
        "Network setup and troubleshooting",
        "Software installation",
      ],
    },
  ];

  const service = allServices.find((s) => s.name === decodedName) || {
    name: decodedName,
    description: `Professional ${decodedName} service by verified experts. Book on-demand or schedule at your convenience. Transparent pricing and quality guaranteed.`,
    img: `https://placehold.co/800x400/525252/FFF?text=${encodeURIComponent(decodedName)}`,
    icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
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
                    <span>Average Rating: {service.rating}/5 (1,200+ reviews)</span>
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
            {allServices
              .filter((s) => s.name !== decodedName)
              .map((s) => (
                <div
                  key={s.name}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
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