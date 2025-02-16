import React from "react";
import { motion } from "framer-motion";

const LaunchModal = ({ launch, onClose }) => {
  if (!launch) return null;
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg p-6 bg-gray-800 rounded-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute text-gray-400 top-2 right-2 hover:text-gray-200"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="mb-4 text-2xl font-bold">{launch.name}</h2>
        <p className="mb-4 text-gray-300">
          Date: {new Date(launch.date_utc).toDateString()}
        </p>
        {launch.details ? (
          <p className="mb-4 text-gray-400">{launch.details}</p>
        ) : (
          <p className="mb-4 text-gray-400">No additional details available.</p>
        )}
        {launch.links && launch.links.wikipedia && (
          <a
            href={launch.links.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Read More
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LaunchModal;
