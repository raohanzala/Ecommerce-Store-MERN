import React from 'react'
import { assets } from '../../../frontend/src/assets/assets'
import {Link} from 'react-router-dom'

// import { BsEnvelope } from "react-icons/bs";
// import { IoCallOutline } from "react-icons/io5";



const Logo = () => {
  return (
    <div className=''>

<Link to={'/'}>
     <img src={assets.logo} className=' md:w-[190px] md:h-[40px] w-[180px] h-[38px]' alt="" />
</Link>

      
    </div>
  )
}

export default Logo