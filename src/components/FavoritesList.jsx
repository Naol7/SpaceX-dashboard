import React from "react";
import LaunchCard from "./LaunchCard";

const FavoritesList = ({ favorites, toggleFavorite, onCardClick }) => {
  return (
    <div className="mb-6">
      <h2 className="mb-4 text-2xl font-bold text-gray-300">Favorites</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((fav) => (
          <LaunchCard
            key={fav.id}
            launch={fav}
            toggleFavorite={toggleFavorite}
            isFavorite={true}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
