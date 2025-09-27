import React from "react";
import HomeServices from "../components/HomeServices";
import HeroSection from "../components/HeroSection";
import SearchCard from "../components/SearchCard";

const Home = ({ homeServices }) => {
  const initialRepairServices = [
    { name: "Vehicle Inspector", img: "https://i.ibb.co/GtGV9sh/vehicle.jpg" },
    { name: "Motorbike Mechanic", img: "https://i.ibb.co/DQ1m7MS/motorbike.jpg" },
    { name: "Electrical Technician", img: "https://i.ibb.co/gt2ngLx/electrical.jpg" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <SearchCard />

      <div className="container mx-auto px-6">
        <HeroSection />

        {homeServices.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Home Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {homeServices.map((service, index) => (
                <HomeServices key={index} {...service} />
              ))}
            </div>
          </>
        )}

        {initialRepairServices.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Repair Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {initialRepairServices.map((service, index) => (
                <HomeServices key={index} {...service} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
