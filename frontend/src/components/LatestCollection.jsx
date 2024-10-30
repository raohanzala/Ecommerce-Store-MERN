import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { assets } from '../assets/assets'

const LatestCollection = ({}) => {

  const { products } = useContext(ShopContext)
  console.log(products)

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])


  return (
    <div className='my-10'>
      <div className='text-center pb-8 text-3xl '>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, voluptates!</p>
      </div>

      {/* Rendering Products */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

        {/* {latestProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} description={item.description} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
        ))} */}

        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
        <ProductItem id={888998} description={'All functions working, Stainless Steel Chain, Master Lock, Chronograph working'} image={assets.omega_speedmaster} name={'Omega Speedmaster'} new_price={4500} old_price={3500}/>
      </div>

    </div>
  )
}

export default LatestCollection