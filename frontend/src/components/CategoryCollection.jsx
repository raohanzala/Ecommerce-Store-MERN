import React from 'react'
import { assets } from '../assets/assets'
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaChevronRight } from 'react-icons/fa6';


const CategoryCollection = () => {
  return (
    <div className=''>

      <div className='grid grid-cols-3'>


        <div className="overflow-hidden relative group h-96 max-h-96">
          <Link>

            <div className="relative w-full h-full transform group-hover:scale-110 duration-300">
              {/* <IoShirtSharp /> */}
              <img src={assets.rolex_yatch_master_1} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent      opacity-90"></div>
            </div>

            <div className="absolute flex flex-col items-center justify-center bottom-4 left-[50%] top-[80%] -translate-x-[50%] -translate-y-[50%] text-white w-full ">
              <div className='flex items-center mb-4'>

              <div>
                <h2 className='lg:text-xl text-gray-50 font-medium tracking-widest uppercase'>Men's Collection</h2>
              </div>
              <div className='text-lg text-gray-50 transform translate-x-10 opacity-0 transition-all  duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                <FaChevronRight /> 
              </div>
              </div>
              <button className='border py-1 px-3 border-white'>Explore more</button>
            </div>
          </Link>
        </div>
        <div className="overflow-hidden relative group h-96 max-h-96">
          <Link>

            <div className="relative w-full h-full transform group-hover:scale-110 duration-300">
              {/* <IoShirtSharp /> */}
              <img src={assets.rolex_yatch_master_1} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent      opacity-90"></div>
            </div>

            <div className="absolute flex flex-col items-center justify-center bottom-4 left-[50%] top-[80%] -translate-x-[50%] -translate-y-[50%] text-white w-full ">
              <div className='flex items-center mb-4'>

              <div>
                <h2 className='lg:text-xl text-gray-50 font-medium tracking-widest uppercase'>Men's Collection</h2>
              </div>
              <div className='text-lg text-gray-50 transform translate-x-10 opacity-0 transition-all  duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                <FaChevronRight /> 
              </div>
              </div>
              <button className='border py-1 px-3 border-white'>Explore more</button>
            </div>
          </Link>
        </div>
        <div className="overflow-hidden relative group h-96 max-h-96">
          <Link>

            <div className="relative w-full h-full transform group-hover:scale-110 duration-300">
              {/* <IoShirtSharp /> */}
              <img src={assets.rolex_yatch_master_1} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent      opacity-90"></div>
            </div>

            <div className="absolute flex flex-col items-center justify-center bottom-4 left-[50%] top-[80%] -translate-x-[50%] -translate-y-[50%] text-white w-full ">
              <div className='flex items-center mb-4'>

              <div>
                <h2 className='lg:text-xl text-gray-50 font-medium tracking-widest uppercase'>Men's Collection</h2>
              </div>
              <div className='text-lg text-gray-50 transform translate-x-10 opacity-0 transition-all  duration-500 group-hover:translate-x-0 group-hover:opacity-100'>
                <FaChevronRight /> 
              </div>
              </div>
              <button className='border py-1 px-3 border-white'>Explore more</button>
            </div>
          </Link>
        </div>

        

        
















      </div>

    </div>
  )
}

export default CategoryCollection