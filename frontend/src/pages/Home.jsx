import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Category from '../components/Category'

const Home = () => {

  return (
    <div>

      <Hero/>
    <div className='max-w-[1280px] mx-auto px-5'>
      <Category/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
    </div>
  )
}

export default Home