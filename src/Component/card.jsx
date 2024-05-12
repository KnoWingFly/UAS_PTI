import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApi } from "./API.jsx";
import Popup from "./Popup.jsx";
import { places } from "./DataPlace.js";

const Card = ({ searchTerm }) => {
  const { data } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

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

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center mt-20 mx-10 md:mx-20 lg:mx-40">
      {filteredPlaces.map((place, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="relative w-50 h-50 md:h-60 lg:h-70 rounded shadow-lg m-2 overflow-hidden group bg-black"
          onClick={() => handleClick(place)}
        >
          <img
            className="w-full h-full object-cover rounded transition duration-300 group-hover:opacity-50 scale-100 group-hover:scale-110 ease-in-out"
            src={place.image}
            alt={place.name}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center items-center">
            <p className="opacity-0 group-hover:opacity-100 duration-300 text-white font-semibold bg-gradient-to-t from-transparent to-black">
              {place.shortDesc}
            </p>
          </div>
          <div className="font-bold text-xs text-white ms-2 mb-1 absolute bottom-0 left-0 bg-black opacity-80 rounded-full px-3">
            {place.name}
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {isOpen && (
          <Popup
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedPlace={selectedPlace}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            data={data}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card;
