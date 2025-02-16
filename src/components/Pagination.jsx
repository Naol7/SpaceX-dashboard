import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Helper function to generate the pagination range
  const getPaginationRange = () => {
    const range = [];
    // If there are 7 or fewer pages, return all of them
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // When near the beginning: show first 7 pages, then ellipsis, then last page
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPages);
      }
      // When near the end: show first page, ellipsis, then the last 7 pages
      else if (currentPage >= totalPages - 3) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 6; i <= totalPages; i++) {
          range.push(i);
        }
      }
      // When in the middle: show first page, ellipsis, 5 pages around current, ellipsis, then last page
      else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          range.push(i);
        }
        range.push("...");
        range.push(totalPages);
      }
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md bg-gray-700 text-gray-200 transition-colors ${
          currentPage === 1
            ? "opacity-80 cursor-not-allowed"
            : "hover:bg-gray-600"
        }`}
      >
        Previous
      </button>
      {paginationRange.map((item, index) =>
        typeof item === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(item)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === item
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="px-4 py-2 text-gray-400">
            {item}
          </span>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md bg-gray-700 text-gray-200 transition-colors ${
          currentPage === totalPages
            ? "opacity-80 cursor-not-allowed"
            : "hover:bg-gray-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
