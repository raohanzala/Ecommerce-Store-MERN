import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="w-64 bg-white p-5 h-screen" style={{boxShadow : '0px 0px 20px rgba(1, 41, 112, 0.1)'}}>
      <nav className="flex flex-col space-y-4 text-center">
        <NavLink to="addproduct" className="text-black py-3 bg-gray-100" activeClassName="font-bold">
          ADD PRODUCT
        </NavLink>
        <NavLink to="listproduct" className="text-black py-3  bg-gray-100 rounded" activeClassName="font-bold">
          LIST PRODUCT
        </NavLink>
        <NavLink to="orders" className="text-black py-3 bg-gray-100" activeClassName="font-bold">
          MY ORDERS
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
