import React, { useContext, useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationsPopup from './NotificationsPopup';
import adminPhoto from '../assets/admin-photo.jpeg'
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack} from 'react-icons/md';
import { IoLogOutOutline } from "react-icons/io5";




function Header({ setToken }) {

  const [hasNotification, setHasNotification] = useState(false)
  const navigate = useNavigate()
  const {pageTitle} = useContext(ShopContext)

  console.log(pageTitle, "Title Orders")

  const handleNotification = () => {
    setHasNotification((hasNotification) => !hasNotification)
  }
  return (
    <div className='flex w-full items-center justify-between px-5 py-3 border-b bg-white border-[#F1F1F2]'>
      <div className='flex items-center gap-2 text-[#919191]'>
        <div className='cursor-pointer' onClick={()=>navigate(-1)}><MdArrowBack/></div>
        
      <h1 className='text-lg  '>{pageTitle}</h1>
      </div>

      <div className='flex items-center'>

        {/* <button className='py-2 px-3 text-sm border-0 ' onClick={() => setToken('')}>Logout</button> */}

        <div className="relative cursor-pointer">
          {/* Notification Icon */}
          <div
            onClick={handleNotification}
            className="bg-primary text-slate-50 text-2xl p-3 rounded-md"
          >
            <IoMdNotificationsOutline />
          </div>

          {/* Red Badge */}
          {hasNotification && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 px-3">
          <div className="w-12 h-12 overflow-hidden rounded-md">
            <img src={adminPhoto} className="w-full rounded-full h-full object-cover" alt="" />
          </div>
          <div>
            <h2 className="font-semibold text-[#333] text-sm">Rao Hanzala</h2>
            <p className="text-[#919191] text-xs">Owner of RTW</p>
          </div>
        </div>

        <div className='text-3xl font-extralight text-[#919191] cursor-pointer' >
        <IoLogOutOutline onClick={()=>{ localStorage.removeItem('token'); window.location.replace('/')}} />
        </div>

      </div>

      {hasNotification && <NotificationsPopup />}
    </div>
  )
}

export default Header