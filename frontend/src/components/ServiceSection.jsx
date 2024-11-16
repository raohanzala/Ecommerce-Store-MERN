import React from 'react'
// import SeactionHeading from './SeactionHeading'
import { FaShippingFast } from 'react-icons/fa'
import { Ri24HoursLine } from 'react-icons/ri'
import { MdPayments } from 'react-icons/md'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'

function ServiceSection() {
  return (
    <div className='py-10 '>
        {/* <SeactionHeading heading='Our Services'/> */}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
            <div className='flex flex-col gap-2 items-center'>
                <div className='text-5xl text-[#cba035b3]'>
                <FaShippingFast/>
                </div>
                <h4 className='text-2xl text-[#333]'>Fast Shipping</h4>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='text-5xl text-[#cba035b3]'>
                <Ri24HoursLine  />
                </div>
                <h4 className='text-2xl text-[#333]'>24/7 Support</h4>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='text-5xl text-[#cba035b3]'>
                <MdPayments />
                </div>
                <h4 className='text-2xl text-[#333]'>COD payment</h4>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='text-5xl text-[#cba035b3]'>
                <AiOutlineSafetyCertificate/>
                </div>
                <h4 className='text-2xl text-[#333]'>100% Safe</h4>
            </div>
        </div>
    </div>
  )
}

export default ServiceSection