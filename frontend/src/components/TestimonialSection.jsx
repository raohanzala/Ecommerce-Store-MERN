import React from 'react'
import Title from './Title'
import { SwiperSlide, Swiper } from 'swiper/react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Navigation, Autoplay } from "swiper/modules";
import TestimonialCard from './TestimonialCard';

const TestimonialSection = () => {
  return (
    <div className='py-10'>
      <div className="text-center text-3xl  py-2 px-8" >
        <Title text1={'CUSTOMERS'} text2={'FEEDBACK'} />

        <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={6}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 1500 }}
        >
          {[...Array(8)].map((_, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard/>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
        </Swiper>
        <div className="custom-prev custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30 text-[#cba135]  p-1 rounded-full -left-2 top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" custom-next custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <button className="absolute text-2xl z-30  p-1 rounded-full -right-2 text-[#cba135] top-1/2 transform -translate-y-1/2 ">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default TestimonialSection