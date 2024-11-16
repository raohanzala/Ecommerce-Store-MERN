import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard, MdPersonOutline, MdOutlineShoppingCart, MdOutlinePostAdd, MdOutlineAdUnits } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";


function SideBarItem() {  
  const sideBarItems = [
    { name: 'dashboard',
       icon: <MdOutlineDashboard />,
        route: '/' },
    { name: 'add Product', icon: <MdPersonOutline />, route: '/add' },
    { name: 'list Product', icon: <LuUsers2 /> , route: '/list' },
    { name: 'orders', icon: <MdOutlineShoppingCart />, route: '/orders' },
    { name: 'settings', icon: <MdOutlinePostAdd />, route: '/settings' },
  ];

  return (
    <div className="space-y-2">
      {sideBarItems.map((item) => (
        <NavLink 
          key={item.name} 
          to={item.route} 
          className={({ isActive }) => 
            `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-md w-full capitalize shadow-sm 
            ${isActive ? 'bg-[#e6bf5d] text-white' : ' text-[#797979] shadow-none hover:text-white hover:bg-[#c59f3e]'}`
          }
        >
          <span className="text-2xl w-fit">{item.icon}</span>
          <span className="text-base font-medium hidden md:inline">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default SideBarItem;
