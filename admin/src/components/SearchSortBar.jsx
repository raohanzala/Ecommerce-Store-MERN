import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const SearchSortBar = ({ placeholder, options }) => {
  const [sortBy, setSortBy] = useState("name");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="w-full flex justify-between mb-12">
      <div className="flex items-center border border-gray-300 bg-white rounded-md overflow-hidden focus-within:shadow-md transition-shadow duration-300 ">
        <span className="flex items-center pl-3">
          <RiSearchLine />
        </span>
        <input
          className="py-3 px-2 text-sm w-64 focus:outline-none shadow-sm"
          type="text"
          placeholder={placeholder + "..."}
        />
      </div>

      <div className="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className=" border border-gray-300 py-3 px-2 pl-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
        >
          {options.map((option) => (
            <option value={option}>
              Sort by {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSortBar;
