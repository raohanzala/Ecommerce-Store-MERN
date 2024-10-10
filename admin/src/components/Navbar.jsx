import React from 'react';
import { assets } from '../../../frontend/src/assets/assets';

const NavBar = () => {
  return (
    <div className="w-full flex justify-center bg-white text-white py-3 px-8" style={{boxShadow : '0px 2px 20px rgba(1, 41, 112, 0.1)'}}>
      <img src={assets.logo} className='w-64 h-12' alt="" />
    </div>
  );
};

export default NavBar;
