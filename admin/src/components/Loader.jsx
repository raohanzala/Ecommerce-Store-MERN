import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default Loader;
