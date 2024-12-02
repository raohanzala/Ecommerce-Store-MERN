import React from "react";
import { IoShirtSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaChevronRight } from "react-icons/fa6";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function CategoryCard() {
  return (
    <Link>
      <div className="w-40 h-40 rounded-full overflow-hidden relative m-auto">

        <div className="relative w-full h-full hover:scale-110 duration-300">
          {/* <IoShirtSharp /> */}
          <LazyLoadImage effect="blur" src={assets.rolex_yatch_master_1} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent      opacity-70 transition-opacity duration-300"></div>
        </div>

        <div className="absolute flex items-center bottom-4 left-[50%] top-[75%] -translate-x-[50%] -translate-y-[50%] text-white">
          <div>
            <h2 className='lg:text-lg text-gray-50 font-medium uppercase'>Luxury</h2>
          </div>
          {/* <div className='text-sm text-gray-50 transform translate-x-10 opacity-0      transition-all             duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
            <FaChevronRight />
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
