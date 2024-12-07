import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white z-50">
      <div className="w-8 h-8 border-4 border-[#e2c765] border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}

export default Loader;
