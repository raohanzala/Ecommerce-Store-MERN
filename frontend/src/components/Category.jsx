import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CategoryItem from './CategoryItem'

const Category = () => {

  const {category} = useContext(ShopContext)
  console.log(category)
  return (
    <div className='grid grid-cols-2 max-w-[1280px] mx-auto sm:grid-cols-3 md:grid-cols-4 gap-2 gap-y-6 mt-6'>

        {category.map((item, index) => (
          <CategoryItem key={index} category={category[index]} />
        ))}
      </div>
  )
}

export default Category