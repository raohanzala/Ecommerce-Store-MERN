import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const SearchSortBar = ({ placeholder, options, className}) => {
  const [sortBy, setSortBy] = useState("name");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={`w-full flex justify-between ${className}`} >
      <div className="flex items-center border border-gray-300 bg-white rounded-md overflow-hidden">
        <span className="flex items-center pl-3 text-[#5c5c5c]">
          <RiSearchLine />
        </span>
        <input
          className="py-[10px] px-2 text-sm w-64 focus:outline-none shadow-sm"
          type="text"
          placeholder={placeholder}
        />
      </div>

      <div className="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className=" border border-gray-300 py-[10px] px-2 pl-2 bg-white rounded-md shadow-sm focus:outline-none text-sm"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              Sort by {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSortBar;
