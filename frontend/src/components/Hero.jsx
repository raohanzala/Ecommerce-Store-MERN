import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="relative w-full h-96 md:h-[400px] lg:h-[500px] overflow-hidden"
    >
      <SwiperSlide className="relative">
        <img src={assets.hero_img} alt="Slide 1" className="w-full h-full object-cover" />
        <div className="absolute top-[50%] translate-y-[-50%] left-12   bg-black bg-opacity-30 text-white p-4 rounded-lg">
          {/* <h3 className='text-sm font-semibold italic mb-3'>NEW COLLECTION</h3> */}
          <h1 className=' text-6xl font-semibold'>SUMMER SALE</h1>
          <h2 className="text-xl font-semibold tracking-wider mb-7">Massive Discount</h2>
          <button className='text-lg py-2 px-5 bg-[red]'>Discover Now !</button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="relative">
        <img src={assets.hero_img2} alt="Slide 2" className="w-full h-full object-cover" />
        <div className="absolute top-[50%] translate-y-[-50%] left-12   bg-black bg-opacity-30 text-white p-4 rounded-lg">
          <h3 className='text-sm font-semibold italic mb-3'>NEW COLLECTION</h3>
          <h2 className="text-3xl font-semibold tracking-tight">upto 70% OFF</h2>
          <h1 className='tracking-wider text-6xl font-semibold mb-7'>BIGGEST SALE</h1>
          <button className='text-lg py-2 px-5 bg-[red]'>Discover Now !</button>
        </div>
      </SwiperSlide>
      {/* <SwiperSlide className="relative">
        <img src={assets.hublot_senna_1} alt="Slide 3" className="w-full h-full object-cover" />
        <div className="absolute top-[50%] translate-y-[-50%] left-10 bg-black bg-opacity-30 text-white p-4 rounded-sm">
          <h3 className='text-xs capitalize font-semibold'>NEW COLLECTION</h3>
          <h2 className="text-7xl">Big Sale</h2>
          <p className='border-h-[0.5px]'>Discover Now</p>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
};

export default Hero;
