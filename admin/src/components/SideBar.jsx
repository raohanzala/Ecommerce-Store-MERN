import React from "react";
import Logo from "./Logo";
import SideBarItem from "./SideBarItem";
// import { MdOutlineSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdOutlineSettings } from "react-icons/md";
import adminPhoto from '../assets/admin-photo.jpeg'

function SideBar() {
  return (
    <div
      className="flex flex-col w-[90px] scrollbar-hide md:w-[285px] h-screen overflow-y-scroll transition-all duration-200 bg-[#232323] border-r"
      style={{ boxShadow: "4px 0 8px rgba(0, 0, 0, 0.2)" }}
    >
      {/* Logo Section */}
      <div className="md:flex text-xl font-semibold text-white uppercase justify-center w-full p-4 py-5 hidden">
        <Logo />
      </div>

      {/* Sidebar Items */}
      <div className="p-3 mt-6">
        <ul className="flex flex-col gap-3">
          <SideBarItem />
        </ul>
      </div>

      {/* Settings Link */}
      {/* <div className="py-4 px-3 mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-sm w-full capitalize shadow-sm 
            ${isActive
              ? "bg-[#4f4f4f] text-primary" // Deeper Gold for active state
              : " text-[#797979] hover:text-[primary]" // Neutral gray for inactive state
            }`
          }
        >
          <span className="text-2xl">
            {" "}
            <MdOutlineSettings />
          </span>
          <span className="text-base hidden md:inline">Settings</span>
        </NavLink>
      </div> */}
    </div>
  );
}

export default SideBar;
