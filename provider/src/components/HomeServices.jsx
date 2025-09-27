import React from "react";

function HomeServices({ name, img }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center">
      <img src={img} alt={name} className="h-40 w-full object-cover rounded-md mb-3" />
      <h3 className="font-semibold text-blue-700">{name}</h3>
    </div>
  );
}

export default HomeServices;
