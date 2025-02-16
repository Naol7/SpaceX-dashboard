import React from "react";

const SearchFilter = ({ search, setSearch, yearFilter, setYearFilter }) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by mission name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Filter by year (YYYY)"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
        className="w-40 p-2 text-gray-200 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchFilter;
