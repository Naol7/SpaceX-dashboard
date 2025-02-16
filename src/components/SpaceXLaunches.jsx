import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchFilter from "./SearchFilter";
import LaunchCard from "./LaunchCard";
import FavoritesList from "./FavoritesList";
import LaunchModal from "./LaunchModal";
import Pagination from "./Pagination";
import "tailwindcss/tailwind.css";

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Modal state for selected launch details
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  // Favorites state (saved to local storage)
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteLaunches");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Update local storage when favorites change
  useEffect(() => {
    localStorage.setItem("favoriteLaunches", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch data from the SpaceX API on mount
  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches")
      .then((response) => response.json())
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch launch data");
        setLoading(false);
      });
  }, []);

  // Filter launches based on search and year filter
  const filteredLaunches = launches.filter(
    (launch) =>
      launch.name.toLowerCase().includes(search.toLowerCase()) &&
      (yearFilter ? launch.date_utc.startsWith(yearFilter) : true)
  );

  // Reset to the first page when the search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, yearFilter]);

  // Calculate total pages and slice filtered launches for the current page
  const totalPages = Math.ceil(filteredLaunches.length / pageSize);
  const paginatedLaunches = filteredLaunches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Toggle favorite status for a launch
  const toggleFavorite = (launch) => {
    if (favorites.find((fav) => fav.id === launch.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== launch.id));
    } else {
      setFavorites([...favorites, launch]);
    }
  };

  // Handler for closing the modal
  const closeModal = () => {
    setSelectedLaunch(null);
  };

  return (
    <div className="container min-h-screen p-4 mx-auto bg-gray-900">
      <h1 className="mb-6 text-4xl font-extrabold text-center text-gray-300">
        SpaceX Launch Explorer
      </h1>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
      />
      {/* Favorites Section */}
      {favorites.length > 0 && (
        <FavoritesList
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onCardClick={(launch) => setSelectedLaunch(launch)}
        />
      )}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {filteredLaunches.length === 0 ? (
            <p className="text-center text-gray-300">
              No launches match your search/filter.
            </p>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <AnimatePresence>
                  {paginatedLaunches.map((launch) => (
                    <LaunchCard
                      key={launch.id}
                      launch={launch}
                      toggleFavorite={toggleFavorite}
                      isFavorite={
                        !!favorites.find((fav) => fav.id === launch.id)
                      }
                      onCardClick={(launch) => setSelectedLaunch(launch)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}
      <AnimatePresence>
        {selectedLaunch && (
          <LaunchModal launch={selectedLaunch} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpaceXLaunches;
