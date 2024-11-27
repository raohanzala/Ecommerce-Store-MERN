import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 text-xs rounded ${
            i === currentPage
              // ? 'bg-green-500 text-white'
              // : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        Prev
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
