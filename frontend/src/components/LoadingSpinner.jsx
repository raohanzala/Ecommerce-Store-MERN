import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="absolute w-full  flex translate-y-[50%] items-center justify-center">
      <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-gold"></div>
      <p className='absolute text-xs text-center'>Unable to fetch <br /> products.</p>
    </div>
  )
}

export default LoadingSpinner
