import React from 'react'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'

import { BsEnvelope } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";



const Logo = () => {
  return (
    <div className='flex items-center sm:justify-between justify-center p-2 px-5'>
      <div className='sm:flex hidden items-center'>

        <div className='text-2xl text-[#cba135] mr-2'>
          <IoCallOutline />
        </div>

        <div className='pl-2 border-l-2 '>
          <h2 className='text-sm'>HELPLINE :</h2>
          <p className='text-xs font-semibold'>+92-3249221933</p>
        </div>

      </div>

<Link to={'/'}>
     <img src={assets.logo} className=' md:w-[260px] md:h-[48px] w-[180px] h-[38px]' alt="" />
</Link>

      <div className='sm:flex hidden items-center '>

        <div className='text-2xl text-[#cba135] mr-2'>
          <BsEnvelope />
        </div>

        <div className='pl-2 border-l-2'>
          <h2 className='text-sm'>EMAIL US :</h2>
          <p className='text-xs font-semibold'>realtimewrist@gmail.com</p>
        </div>

      </div>
    </div>
  )
}

export default Logo