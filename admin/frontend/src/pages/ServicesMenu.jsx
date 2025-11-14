import React from 'react';

const ServicesMenu = ({ activeCategory, onCategoryClick }) => {
  const categories = [
    "All Services", // Added a new category to show all services
    "Home Services",
    "Professional Works",
    "Digital Works",
    "Emergency service",
    "Per day Services",
    "Medical Helpers",
  ];

  const categoryImages = {
    "All Services": "https://placehold.co/40x40/94a3b8/fff?text=All",
    "Home Services": "https://placehold.co/40x40/f54291/fff?text=Home",
    "Professional Works": "https://placehold.co/40x40/4287f5/fff?text=Pro",
    "Digital Works": "https://placehold.co/40x40/42f55a/fff?text=Dig",
    "Emergency service": "https://placehold.co/40x40/e63946/fff?text=Emerg",
    "Per day Services": "https://placehold.co/40x40/ffc300/fff?text=Day",
    "Medical Helpers": "https://placehold.co/40x40/00bbf9/fff?text=Med",
  };

  return (
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 py-4 px-4 bg-gray-100 dark:bg-gray-900 rounded-xl max-w-6xl mx-auto shadow-md">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ease-in-out
            ${
              activeCategory === category
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
        >
          {/* You can replace these with actual icon components if you have them */}
          <img
            src={categoryImages[category]}
            alt={category}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm sm:text-base whitespace-nowrap">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default ServicesMenu;