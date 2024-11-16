import React from 'react'
import { assets } from '../assets/assets'

const TestimonialCard = () => {
  return (
    <div className='relative w-full h-full max-h-80 overflow-hidden rounded-sm object-cover'>
      <img src={assets.feedback_1} className='w-full h-full' alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent      opacity-90"></div>

      <div className='absolute bottom-0 left-0'>
        asdfkj
      </div>
    </div>
  )
}

export default TestimonialCard