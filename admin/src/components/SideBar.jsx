import React from "react";
import Logo from "./Logo";
import SideBarItem from "./SideBarItem";
// import { MdOutlineSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="flex flex-col w-[90px] md:w-[285px] bg-gradient-to-r border-r bg-white z-9999 h-screen transition-all duration-200"
      style={{ boxShadow: "box-shadow: 4px 0 8px rgba(0, 0, 0, 1)" }}
    >
      <div className="md:flex text-3xl font-semibold uppercase justify-center w-full p-4 py-5 hidden">
        <Logo />
        {/* RealTimeWrist */}
      </div>

      <div className="p-3 mt-2">
        <ul className="flex flex-col gap-3">
          <SideBarItem />
        </ul>
      </div>

      <div className="py-4 px-3 mt-auto">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-0 md:gap-3 px-3 py-4 rounded-md w-full capitalize shadow-sm 
            ${
              isActive
                ? "bg-[#6AE1B7] text-white"
                : " text-[#797979] shadow-none"
            }`
          }
        >
          <span className="text-2xl">
            {" "}
            {/* <MdOutlineSettings /> */}
          </span>
          <span className="text-base hidden md:inline">Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
