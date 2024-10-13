import React from 'react';
import { assets } from '../../../frontend/src/assets/assets';

const NavBar = ({setToken}) => {
  return (
    <div className="w-full flex  justify-between bg-white text-white py-3 px-8" style={{boxShadow : '0px 2px 20px rgba(1, 41, 112, 0.1)'}}>
      <img src={assets.logo} className='w-64 h-12' alt="" />
      <button onClick={()=> setToken('')}>Logout</button>
    </div>
  );
};

export default NavBar;
