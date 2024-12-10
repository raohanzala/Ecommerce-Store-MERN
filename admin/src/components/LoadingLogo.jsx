import React from 'react';
import { assets } from '../../../frontend/src/assets/assets';

const LoadingLogo = () => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <div className="relative w-72 h-72">
        <img
          src={assets.hero_img}
          alt="Logo"
          className="w-full h-full object-contain animate-fade-in "
        />
      </div>
    </div>
  );
};

export default LoadingLogo;
