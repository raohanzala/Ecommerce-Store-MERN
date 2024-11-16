import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CategoryItemRound from './CategoryItem-round'

const Category = () => {

  const {category} = useContext(ShopContext)
  console.log(category)
  return (
    // <div className='grid grid-cols-2 max-w-screen-lg mx-auto sm:grid-cols-3 md:grid-cols-4 gap-5 gap-y-6 mt-6'>
<div>
        {/* {category.map((item, index) => ( */}
          <CategoryItemRound />
        {/* ))} */}
      </div>
  )
}

export default Category