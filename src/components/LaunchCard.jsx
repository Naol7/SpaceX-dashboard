import React from "react";
import { motion } from "framer-motion";

const LaunchCard = ({ launch, isFavorite, toggleFavorite, onCardClick }) => {
  return (
    <motion.div
      className="relative p-4 text-gray-200 border border-gray-600 rounded-lg shadow-md cursor-pointer bg-gradient-to-br from-gray-800 to-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={() => onCardClick(launch)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(launch);
        }}
        className="absolute text-xl top-2 right-2"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <h2 className="mb-2 text-2xl font-bold">{launch.name}</h2>
      <p className="mb-3">Date: {new Date(launch.date_utc).toDateString()}</p>
      {launch.links && launch.links.webcast && (
        <a
          href={launch.links.webcast}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block px-4 py-2 transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Watch Launch
        </a>
      )}
    </motion.div>
  );
};

export default LaunchCard;
