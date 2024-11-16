import React, { useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationsPopup from './NotificationsPopup';


function Header({ setToken, title }) {

  const [hasNotification, setHasNotification] = useState(false)

  const handleNotfication = () => {
    setHasNotification((hasNotification) => !hasNotification)
  }
  return (
    <div className='flex w-full items-center justify-between px-5 py-3 border-b bg-white border-[#F1F1F2] shadow-xl'>
      <h1 className='text-xl font-semibold text-[#333]'>{title}</h1>

      <div className='flex gap-5'>

        <button className='py-2 px-3 text-sm border-0 ' onClick={() => setToken('')}>Logout</button>
        <div className='cursor-pointer'>
          <div onClick={handleNotfication} className='bg-[#6ae1b7ea] text-slate-50 text-2xl p-3 rounded-md'>
            <IoMdNotificationsOutline /> 
          </div>
        </div>

      </div>

      {hasNotification && <NotificationsPopup />}
    </div>
  )
}

export default Header