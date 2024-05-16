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

  // Inisialisasi selectedCategory dengan "All" menggunakan useEffect
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
        // Ambil kategori dari API
        const categories = ["All", ...new Set(places.map((place) => place.category))];

        return (
          <div className="mt-5" id="categoryBody">
            {/* Tampilkan tombol kategori */}
            <div className="relative inline-block text-left mb-4 mt-2 z-10">
              <button
                className="px-4 py-2 flex ms-6 rounded-md bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowCategories(!showCategories)}
              >
                Category
              </button>
              {showCategories && (
                <div className="origin-top-right rounded-md absolute left-0 mt-2 w-48 ms-6 shadow-lg bg-black/55 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none z-[15]">
                  <div
                    className="py-0"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className={`block rounded-md px-2 py-2 text-sm text-white hover:bg-green-700 hover:rounded-md w-full text-left ${
                          selectedCategory === category ? "bg-green-600 text-white" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategories(false);
                        }}
                        role="menuitem"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-20 mx-10 md:mx-20 lg:mx-30 row-start-6">
              {/* Tampilkan tempat sesuai kategori yang dipilih */}
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
