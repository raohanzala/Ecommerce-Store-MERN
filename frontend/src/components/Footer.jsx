import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'

const Footer = () => {

  const currentYear =  new Date().getFullYear()

  return (

      <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm p-5 py-10 bg-[#232323]'>

        <div>
          <img src={assets.logo4} className='mb-5 w-52 h-12' alt="" />
          <p className='w-full md:w-2/3 text-[#969696]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, officia dolores labore enim dicta eveniet!</p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-[#969696]'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-[#969696]'>
            <li>+92-3278272361</li>
            <li>realtimewrist@gmail.com</li>
          </ul>
        </div>

      </div>
      <div className='bg-[#cba135]'>
        {/* <hr /> */}
        <p className='py-3 text-sm text-center text-white'>Copyright {currentYear}@ <Link to={'/'}> realtimewrist.pk </Link> - All Right Reserved.</p>
      </div>  
    </div>
  )
}

export default Footer