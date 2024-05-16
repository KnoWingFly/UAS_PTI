import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DataAPI from "./DataAPI";
import Popup from "./Popup";

const CategoryCard = ({ searchTerm, language }) => {
  const [places, setPlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  // Initialize selectedCategory with "All" using useEffect
  useEffect(() => {
    setSelectedCategory("All");
  }, []);

  const handleClick = (place) => {
    setIsOpen(true);
    setSelectedPlace(place);
    setCurrentPage(0);
  };

  const handleNext = () => {
    const totalPages = 3;
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DataAPI language={language}>
      {(places) => {
        // Extract categories from API response
        const categories = ["All", ...new Set(places.map((place) => place.category))];

        return (
          <div className="mt-5" id="categoryBody">
            {/* Display selected category on a strip */}
            <div className="flex justify-center flex-wrap mb-4 mt-8 gap-2 md:gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 md:px-4 md:py-2 rounded-md ${selectedCategory === category
                      ? "bg-green-600 text-white border border-gray-200 hover:bg-green-700 hover:text-white"
                      : "bg-gray-200 text-gray-800 border border-gray-200 hover:bg-green-700 hover:text-white"
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-10 mx-10 md:mx-20 lg:mx-30 row-start-6">
              {/* Display places based on the selected category and search term */}
              {places
                .filter(
                  (place) =>
                    selectedCategory === "All" || place.category === selectedCategory
                )
                .filter((place) =>
                  place.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((place, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative w-50 h-50 md:h-60 lg:h-70 rounded-lg shadow-lg m-2 overflow-hidden group bg-black"
                    onClick={() => handleClick(place)}
                  >
                    <img
                      className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out aspect-video"
                      src={place.imageData}
                      alt={place.name}
                    />

                    <div className="absolute inset-x-0 top-0 flex justify-center items-center cursor-pointer group">
                      <div className="group-hover:bg-gradient-to-t from-transparent to-black h-full w-full object-cover absolute transition-all duration-300 ease-in-out"></div>
                      <p className="opacity-0 group-hover:opacity-100 duration-300 text-white font-semibold p-5 text-center z-10">
                        {place.shortDesc}
                      </p>
                    </div>
                    <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">
                      {place.name}
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Render the popup component when isOpen is true */}
            <AnimatePresence>
              {isOpen && (
                <Popup
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  selectedPlace={selectedPlace}
                  currentPage={currentPage}
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                />
              )}
            </AnimatePresence>
          </div>
        );
      }}
    </DataAPI>
  );
};

export default CategoryCard;
